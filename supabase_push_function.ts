// Supabase Edge Function « push » : envoie les notifications sur les téléphones (Web Push).
// Les clés VAPID sont créées automatiquement au premier appel et gardées dans la table privée push_secrets.
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
const enc = new TextEncoder();
function b64u(buf) {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = ""; for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function unb64u(str) {
  const s = str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4);
  const bin = atob(s); const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function concat(...arrs) { const n = arrs.reduce((a, x) => a + x.length, 0); const o = new Uint8Array(n); let p = 0; for (const x of arrs) { o.set(x, p); p += x.length; } return o; }
async function hmac(key, data) {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, data));
}

async function generateVapidKeys() {
  const kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
  const pub = new Uint8Array(await crypto.subtle.exportKey("raw", kp.publicKey));
  const jwk = await crypto.subtle.exportKey("jwk", kp.privateKey);
  return { publicKey: b64u(pub), privateJwk: jwk };
}

async function vapidHeader(endpoint, keys, subject) {
  const aud = new URL(endpoint).origin;
  const header = b64u(enc.encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const payload = b64u(enc.encode(JSON.stringify({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: subject })));
  const key = await crypto.subtle.importKey("jwk", keys.privateJwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, enc.encode(header + "." + payload)));
  return "vapid t=" + header + "." + payload + "." + b64u(sig) + ", k=" + keys.publicKey;
}

async function encryptPayload(p256dh, authSecret, plaintext) {
  const uaPublic = unb64u(p256dh), auth = unb64u(authSecret);
  const as = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
  const asPublic = new Uint8Array(await crypto.subtle.exportKey("raw", as.publicKey));
  const uaKey = await crypto.subtle.importKey("raw", uaPublic, { name: "ECDH", namedCurve: "P-256" }, false, []);
  const shared = new Uint8Array(await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, as.privateKey, 256));
  const prkKey = await hmac(auth, shared);
  const ikm = (await hmac(prkKey, concat(enc.encode("WebPush: info\0"), uaPublic, asPublic, new Uint8Array([1])))).slice(0, 32);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const prk = await hmac(salt, ikm);
  const cek = (await hmac(prk, concat(enc.encode("Content-Encoding: aes128gcm\0"), new Uint8Array([1])))).slice(0, 16);
  const nonce = (await hmac(prk, concat(enc.encode("Content-Encoding: nonce\0"), new Uint8Array([1])))).slice(0, 12);
  const key = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
  const data = concat(typeof plaintext === "string" ? enc.encode(plaintext) : plaintext, new Uint8Array([2]));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, key, data));
  const rs = new Uint8Array([0, 0, 16, 0]); // 4096
  return concat(salt, rs, new Uint8Array([asPublic.length]), asPublic, ct);
}

async function sendPush(sub, payload, keys, subject) {
  const body = await encryptPayload(sub.p256dh, sub.auth, JSON.stringify(payload));
  const res = await fetch(sub.endpoint, {
    method: "POST",
    headers: { TTL: "86400", Urgency: "high", "Content-Encoding": "aes128gcm", "Content-Type": "application/octet-stream", Authorization: await vapidHeader(sub.endpoint, keys, subject) },
    body
  });
  return res.status;
}

const SUBJECT = "mailto:direction@zematechnologies.com";
function serverKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const k = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return k.default || Object.values(k)[0]; } catch (_e) { return ""; }
}
const db = createClient(Deno.env.get("SUPABASE_URL")!, serverKey() as string, { auth: { persistSession: false } });
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const json = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });

let KEYS: { publicKey: string; privateJwk: JsonWebKey } | null = null;
async function getKeys() {
  if (KEYS) return KEYS;
  let { data, error } = await db.from("push_secrets").select("public_key, private_jwk").eq("id", 1).maybeSingle();
  if (error) throw new Error("lecture push_secrets : " + error.message);
  if (!data) {
    const k = await generateVapidKeys();
    const up = await db.from("push_secrets").upsert({ id: 1, public_key: k.publicKey, private_jwk: k.privateJwk }, { onConflict: "id", ignoreDuplicates: true });
    if (up.error) throw new Error("écriture push_secrets : " + up.error.message);
    ({ data, error } = await db.from("push_secrets").select("public_key, private_jwk").eq("id", 1).maybeSingle());
    if (error || !data) throw new Error("clés introuvables");
  }
  KEYS = { publicKey: data!.public_key, privateJwk: data!.private_jwk };
  return KEYS;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const body = await req.json().catch(() => ({}));
    const keys = await getKeys();
    if (body.action === "key") return json({ publicKey: keys.publicKey });
    if (!body.id) return json({ error: "id manquant" }, 400);
    // On ne traite qu'une notification réelle, une seule fois (protection contre les appels abusifs)
    const { data: rows } = await db.from("push_queue").update({ sent_at: new Date().toISOString() }).eq("id", body.id).is("sent_at", null).select();
    const item = rows && rows[0];
    if (!item) return json({ skipped: true });
    const { data: subs } = await db.from("push_subscriptions").select("*").eq("user_id", item.user_id);
    let sent = 0;
    for (const s of subs || []) {
      try {
        const st = await sendPush(s, { title: item.title, body: item.body, url: item.url, tag: item.tag }, keys, SUBJECT);
        if (st === 404 || st === 410) await db.from("push_subscriptions").delete().eq("id", s.id);
        else if (st < 300) sent++;
      } catch (_e) { /* abonnement invalide : on continue */ }
    }
    return json({ sent });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
