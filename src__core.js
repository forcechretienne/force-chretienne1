/* ===== Socle : Preact, Supabase, cache de données, icônes, composants partagés ===== */
const { h, render } = preact;
const { useState, useEffect, useRef } = preactHooks;
const html = htm.bind(h);
const sb = supabase.createClient(window.FC_CONFIG.supabaseUrl, window.FC_CONFIG.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });

/* Photos libres de droits (Unsplash, licence gratuite) pour les bannières et univers de Joyau */
const UNSPLASH = { attieke: "photo-1665332195309-9d75071138f0", robe: "photo-1709809081557-78f803ce93a0", sac: "photo-1605733513597-a8f8341084e6", collier: "photo-1783541507490-edb026e2a961", telephone: "photo-1511707171634-5f897ff02aa9", blender: "photo-1622818426197-d54f85b88690", parfum: "photo-1587017539504-67cfbddac569", immo: "photo-1580587771525-78b9dba3b914", hotel: "photo-1611892440504-42a792e24d32", menuiserie: "photo-1561297331-a9c00b9c2c44", outils: "photo-1581783898377-1c85bf937427", voiture: "photo-1550355291-bbee04a92027", ordinateur: "photo-1541807084-5c52b6b3adef" };
for (const k in UNSPLASH) IMG[k] = "https://images.unsplash.com/" + UNSPLASH[k] + "?w=640&q=70&auto=format&fit=crop";
const CATS = ["Tout", "Immobilier", "Services", "Gastronomie", "Mode", "Téléphones", "Bijoux & Montres", "Beauté", "Électroménager", "Maison", "Informatique", "Auto & Moto", "Bébé"];
const PROFILE_COLS = "id,nom,prenoms,profession,entreprise,photo_url,eglise,assemblee,ville,status,role";

/* Mode « Joyau seul » : ouvert par le lien /joyau (application Joyau installée à part) */
const JOYAU_MODE = window.FC_MODE === "joyau";
function goFC(start) { location.href = "/" + (start ? "?start=" + start : ""); }
async function shareLink(title, text, url) {
  try { if (navigator.share) { await navigator.share({ title, text, url }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
  try { await navigator.clipboard.writeText(url); toast("Lien copié : collez-le dans WhatsApp ou vos réseaux."); }
  catch (e) { openSheet("copy", { url }); }
}

/* État global de l'interface */
const S = { session: null, me: null, booted: false, guest: false, recovery: false };
const UI = { tab: "home", stack: [], sheet: null, toast: "", toastT: 0, start: "" };
let REV = 0;
let rerender = () => {};
function refresh() { REV++; rerender(); }
function go(tab) { UI.tab = tab; UI.stack = []; UI.sheet = null; rerender(); try { window.scrollTo(0, 0); } catch (e) {} }
function push(type, data) { UI.stack.push(Object.assign({ type }, data || {})); UI.sheet = null; rerender(); }
function back() { UI.stack.pop(); rerender(); }
function openSheet(type, data) { UI.sheet = Object.assign({ type }, data || {}); rerender(); }
function closeSheet() { UI.sheet = null; rerender(); }
function toast(msg) { UI.toast = msg; clearTimeout(UI.toastT); UI.toastT = setTimeout(() => { UI.toast = ""; rerender(); }, 3000); rerender(); }
function isMember() { return !!(S.me && S.me.status === "active"); }
function isAdmin() { return !!(S.me && S.me.role === "admin"); }
function uid() { return S.session ? S.session.user.id : null; }

/* Messages d'erreur compréhensibles */
function errText(e) {
  const m = (e && (e.message || e.error_description || String(e))) || "";
  if (/Invalid login credentials/i.test(m)) return "E-mail ou mot de passe incorrect.";
  if (/Email not confirmed/i.test(m)) return "Confirmez d'abord votre adresse e-mail grâce au lien reçu, puis reconnectez-vous.";
  if (/User already registered|already been registered/i.test(m)) return "Un compte existe déjà avec cet e-mail. Connectez-vous.";
  if (/Password should be at least|weak/i.test(m)) return "Mot de passe trop faible : 8 caractères minimum, avec des lettres et des chiffres.";
  if (/rate limit|too many/i.test(m)) return "Trop de tentatives. Patientez quelques minutes puis réessayez.";
  if (/Failed to fetch|NetworkError|network/i.test(m)) return "Connexion internet indisponible. Vérifiez votre réseau et réessayez.";
  if (/row-level security|permission denied/i.test(m)) return "Action non autorisée pour votre compte.";
  if (/duplicate key/i.test(m)) return "C'est déjà fait.";
  if (/payload too large|exceeded the maximum/i.test(m)) return "Fichier trop lourd. Choisissez une image plus légère.";
  return "Une erreur est survenue. Réessayez dans un instant.";
}
function fail(e) { console.error(e); toast(errText(e)); }
async function q(promise) { const r = await promise; if (r.error) throw r.error; return r.data; }

/* Lecture de données avec cache : relue automatiquement après chaque modification (refresh) */
const CACHE = {};
function useData(key, fetcher, deps) {
  const [st, setSt] = useState(() => (key in CACHE ? { data: CACHE[key], loading: false } : { data: null, loading: true }));
  useEffect(() => {
    let on = true;
    if (!(key in CACHE)) setSt({ data: null, loading: true });
    fetcher().then(d => { CACHE[key] = d; if (on) setSt({ data: d, loading: false }); })
      .catch(e => { console.error(key, e); if (on) setSt(s => ({ data: s.data, loading: false, error: e })); });
    return () => { on = false; };
  }, [key, REV].concat(deps || []));
  return st;
}

/* Fichiers : compression puis envoi dans Supabase Storage */
function compress(file, max) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? resolve(b) : reject(new Error("Image illisible")), "image/jpeg", 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image illisible")); };
    img.src = url;
  });
}
async function uploadFile(bucket, blob, name) {
  const path = uid() + "/" + name + "-" + Date.now() + ".jpg";
  await q(sb.storage.from(bucket).upload(path, blob, { contentType: "image/jpeg", upsert: true }));
  return path;
}
async function uploadRaw(bucket, file, name, ext, type) {
  const path = uid() + "/" + name + "-" + Date.now() + "." + ext;
  await q(sb.storage.from(bucket).upload(path, file, { contentType: type, upsert: true }));
  return path;
}
function publicUrl(bucket, path) { return sb.storage.from(bucket).getPublicUrl(path).data.publicUrl; }
async function signedUrl(bucket, path) { const d = await q(sb.storage.from(bucket).createSignedUrl(path, 600)); return d.signedUrl; }

/* Formats */
function fmt(n) { return String(Math.round(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA"; }
function ago(d) {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 60) return "à l'instant";
  if (s < 3600) return "il y a " + Math.floor(s / 60) + " min";
  if (s < 86400) return "il y a " + Math.floor(s / 3600) + " h";
  if (s < 172800) return "hier";
  if (s < 604800) return "il y a " + Math.floor(s / 86400) + " j";
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
function hhmm(d) { const x = new Date(d); return String(x.getHours()).padStart(2, "0") + ":" + String(x.getMinutes()).padStart(2, "0"); }
function fullName(p) { return p ? (p.prenoms + " " + p.nom) : "Membre"; }
function jobLine(p) { return p ? (p.profession + (p.entreprise ? " · " + p.entreprise : "")) : ""; }
function initials(name) { return String(name || "?").replace(/[^A-Za-zÀ-ÿ' -]/g, "").split(/[\s-]+/).filter(w => w.length > 1).slice(0, 2).map(w => w[0].toUpperCase()).join("") || "?"; }
const AV_COLORS = [["#F3E7C6", "#5B4612"], ["#23262D", "#F6DC8A"], ["#E9E9EE", "#23262D"], ["#DCD3BD", "#3A3220"], ["#3A3D45", "#FFFFFF"], ["#F7EED6", "#8E6A1C"]];
function avColor(id) { let n = 0; for (const c of String(id)) n += c.charCodeAt(0); return AV_COLORS[n % AV_COLORS.length]; }
function waNumber(p) { const d = String(p || "").replace(/\D/g, ""); if (!d) return ""; if (d.length === 10) return "225" + d; return d; }

/* ===== Notifications sur le téléphone (Web Push) ===== */
const PUSH_URL = window.FC_CONFIG.supabaseUrl + "/functions/v1/push";
function isIOS() { return /iPhone|iPad|iPod/.test(navigator.userAgent); }
function isStandalone() { try { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch (e) { return false; } }
function pushSupported() { return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window; }
function b64ToU8(s) { const p = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4); const b = atob(p); const u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
async function pushState() {
  if (!pushSupported()) return isIOS() && !isStandalone() ? "ios-install" : "unsupported";
  if (Notification.permission === "denied") return "denied";
  try { const reg = await navigator.serviceWorker.getRegistration(); const s = reg && await reg.pushManager.getSubscription(); return s && Notification.permission === "granted" ? "on" : "off"; } catch (e) { return "off"; }
}
async function enablePush() {
  const st = await pushState();
  if (st === "ios-install") throw new Error("IOS_INSTALL");
  if (st === "unsupported") throw new Error("UNSUPPORTED");
  const perm = await Notification.requestPermission();
  if (perm !== "granted") throw new Error("DENIED");
  if (!navigator.serviceWorker.controller) { try { await navigator.serviceWorker.register("/sw.js"); } catch (e) {} }
  const reg = await navigator.serviceWorker.ready;
  const r = await fetch(PUSH_URL, { method: "POST", headers: { "Content-Type": "application/json", apikey: window.FC_CONFIG.supabaseKey }, body: JSON.stringify({ action: "key" }) });
  const { publicKey } = await r.json();
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(publicKey) });
  const j = sub.toJSON();
  await q(sb.rpc("save_push_subscription", { p_endpoint: j.endpoint, p_p256dh: j.keys.p256dh, p_auth: j.keys.auth }));
}
async function disablePush() {
  const reg = await navigator.serviceWorker.getRegistration(); const s = reg && await reg.pushManager.getSubscription();
  if (s) { try { await sb.from("push_subscriptions").delete().eq("endpoint", s.endpoint); } catch (e) {} await s.unsubscribe(); }
}
function pushError(e) {
  const m = e && e.message;
  if (m === "IOS_INSTALL") return "Sur iPhone, ajoutez d'abord l'application à l'écran d'accueil (Partager → Sur l'écran d'accueil), puis activez les notifications depuis l'icône.";
  if (m === "DENIED") return "Les notifications sont bloquées. Autorisez-les dans les réglages du navigateur pour ce site, puis réessayez.";
  if (m === "UNSUPPORTED") return "Ce navigateur ne gère pas les notifications. Utilisez Chrome sur Android, ou l'application installée sur iPhone.";
  return errText(e);
}
/* Carte « Activer les notifications » (inscription, accueil, profil) */
function PushCard({ title, text, compact, onDone }) {
  const [st, setSt] = useState("…");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => { pushState().then(setSt); }, []);
  const on = async () => { setBusy(true); setMsg(""); try { await enablePush(); setSt("on"); toast("Notifications activées sur ce téléphone."); onDone && onDone(); } catch (e) { setMsg(pushError(e)); pushState().then(setSt); } setBusy(false); };
  if (st === "…" || (compact && st === "unsupported")) return null;
  if (st === "on") return compact ? null : html`<div class="feature" style="background:var(--ok-soft)"><span class="ic"><${Icon} n="bell" c="#15803D" /></span><span><b style="color:#15803D">Notifications activées</b><br /><span class="small muted">Vous serez prévenu sur ce téléphone, même application fermée.</span></span></div>`;
  return html`<div class="card col" style="gap:10px;border-color:var(--gold-line);background:#FFFCF4">
    <span class="row" style="align-items:flex-start"><span class="icon-btn" style="background:var(--gold-soft);flex:none"><${Icon} n="bell" s=${21} c="#8E6A1C" /></span><span class="grow"><b>${title || "Activez les notifications"}</b><br /><span class="small muted" style="line-height:1.45">${text || "Messages, invitations, candidatures, validation de votre adhésion : soyez prévenu sur ce téléphone, même application fermée."}</span></span></span>
    ${st === "ios-install" ? html`<span class="small" style="line-height:1.5;color:#5B4612">Sur iPhone : touchez <b>Partager</b> puis <b>Sur l'écran d'accueil</b>, ouvrez l'application depuis son icône, puis revenez ici.</span>`
      : st === "denied" ? html`<span class="small" style="line-height:1.5;color:var(--danger)">Les notifications sont bloquées pour ce site. Autorisez-les dans les réglages du navigateur (icône à gauche de l'adresse → Notifications → Autoriser).</span>`
      : st === "unsupported" ? html`<span class="small muted">Ce navigateur ne gère pas les notifications.</span>`
      : html`<${Busy} on=${busy} cls="btn btn-gold btn-block" onClick=${on}><${Icon} n="bell" s=${18} />Activer les notifications<//>`}
    ${msg && html`<span class="small" style="color:var(--danger);line-height:1.45">${msg}</span>`}
  </div>`;
}

/* Favoris Joyau : gardés sur l'appareil */
function getFavs() { try { return JSON.parse(localStorage.getItem("fc-favs") || "[]"); } catch (e) { return []; } }
function toggleFav(id) { const f = getFavs(); const i = f.indexOf(id); if (i >= 0) f.splice(i, 1); else { f.push(id); toast("Ajouté à vos favoris."); } try { localStorage.setItem("fc-favs", JSON.stringify(f)); } catch (e) {} rerender(); }

/* ===== Icônes ===== */
const ICONS = {
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6 6 0 0 1 3.5 6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2"/><path d="M3 13h18"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  back: '<path d="M15 5l-7 7 7 7"/>', close: '<path d="M6 6l12 12M18 6L6 18"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  like: '<path d="M7 11v9H4v-9z"/><path d="M7 11l4-7a2 2 0 0 1 3 2l-1 5h6a2 2 0 0 1 2 2.3l-1.2 5A2 2 0 0 1 17.8 20H7"/>',
  comment: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  share: '<path d="M4 12v7h16v-7"/><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/>',
  send: '<path d="M4 12l16-8-6 16-2-7z"/>',
  photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-8 7"/>',
  camera: '<path d="M4 7h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13" r="3.5"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  church: '<path d="M12 2v6M9 5h6"/><path d="M5 22V12l7-4 7 4v10"/><path d="M10 22v-5h4v5"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16a3 3 0 0 1 6 0M14 10h4M14 13h3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  logout: '<path d="M10 4H5v16h5"/><path d="M14 8l4 4-4 4M18 12H9"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 19h16"/>',
  store: '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v2a3 3 0 0 1-5 2 3 3 0 0 1-6 0 3 3 0 0 1-5-2z"/><path d="M5 13v7h14v-7"/>',
  wa: '<path d="M3 21l1.65-4.5A9 9 0 1 1 8 20.3L3 21z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/>',
  tool: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3z"/><path d="M14.5 6.5L17 4l3 3-2.5 2.5"/>',
  building: '<path d="M4 21V5l8-3v19"/><path d="M12 9h8v12"/><path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.5 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
};
function Icon({ n, s = 22, c = "currentColor", w = 2, fill = "none" }) {
  return html`<svg width=${s} height=${s} viewBox="0 0 24 24" fill=${fill} stroke=${c} stroke-width=${w} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" dangerouslySetInnerHTML=${{ __html: ICONS[n] || "" }}></svg>`;
}

/* ===== Logos ===== */
function Shield({ s = 38 }) {
  return html`<svg width=${s} height=${s} viewBox="0 0 100 100" aria-hidden="true" style="flex:none"><path d="M50 6 L86 18 V46 C86 70 70 86 50 94 C30 86 14 70 14 46 V18 Z" fill="url(#fcGold)"></path><path d="M50 13 L79 23 V46 C79 66 66 79 50 86 C34 79 21 66 21 46 V23 Z" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.85"></path><rect x="45" y="26" width="10" height="48" rx="2" fill="#23262D"></rect><rect x="32" y="39" width="36" height="10" rx="2" fill="#23262D"></rect></svg>`;
}
function Bag({ s = 30, handle = "#1F3FC4" }) {
  return html`<svg width=${s} height=${s} viewBox="0 0 100 100" aria-hidden="true" style="flex:none"><path d="M34 34 C34 13 46 13 46 34 M54 34 C54 13 66 13 66 34" fill="none" stroke=${handle} stroke-width="6" stroke-linecap="round"></path><path d="M22 33 H78 L83 82 Q83.6 88 77.5 88 H22.5 Q16.4 88 17 82 Z" fill="#D62839"></path><path d="M22 33 H78 L78.9 41 H21.1 Z" fill="#B51F2E"></path><polygon points="37,57 43.5,49 56.5,49 63,57 50,74" fill="#1F3FC4" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"></polygon><polygon points="43.5,49 50,57 56.5,49" fill="#5B7BFF"></polygon></svg>`;
}
function JoyauLogo({ slogan = true }) {
  return html`<span class="j-logo"><span class="sq"><${Bag} s=${28} /></span><span><b>joyau</b>${slogan && html`<small>ICI, ON VEND TOUT</small>`}</span></span>`;
}
function Wordmark() {
  const ch = "CHRÉTIENNE".split(""), sl = "RAYONNER ENSEMBLE".split("");
  return html`<span class="wordmark"><span class="force">FORCE</span><span class="bar"></span>
    <span class="just ch">${ch.map((c, i) => html`<span key=${i}>${c}</span>`)}</span>
    <span class="just sl">${sl.map((c, i) => html`<span key=${i}>${c === " " ? " " : c}</span>`)}</span></span>`;
}

/* ===== Composants partagés ===== */
function Avatar({ p, size = 44 }) {
  const id = p ? p.id : "x";
  const [bg, fg] = avColor(id);
  return html`<span class="av" style=${`width:${size}px;height:${size}px;background:${bg};color:${fg};font-size:${Math.round(size / 2.7)}px`}>${p && p.photo_url ? html`<img src=${p.photo_url} alt="" loading="lazy" />` : initials(fullName(p))}</span>`;
}
function Verified({ s = 15 }) {
  return html`<span class="verified" title="Membre vérifié"><svg width=${s} height=${s} viewBox="0 0 24 24" aria-label="Membre vérifié" role="img"><path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9L3.2 15.8l1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z" fill="url(#fcGold)"></path><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="#23262D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>`;
}
function OvHead({ title, right, onBack }) {
  return html`<div class="ov-head"><button class="icon-btn" onClick=${onBack || back} aria-label="Retour"><${Icon} n="back" /></button><h1>${title}</h1>${right || ""}</div>`;
}
function Field({ label, req, hint, err, children }) {
  return html`<div class="field"><label>${label}${req && html` <span class="req">*</span>`}</label>${children}${hint && html`<span class="hint">${hint}</span>`}${err && html`<span class="err-msg">${err}</span>`}</div>`;
}
/* Sélection d'image : garde le fichier compressé (Blob) et un aperçu local */
function Upload({ id, label, sub, preview, onFile, max = 1200, icon = "camera", done }) {
  const [busy, setBusy] = useState(false);
  return html`<label class="upload" for=${id}>
    <span class="thumb">${preview ? html`<img src=${preview} alt="" />` : html`<${Icon} n=${icon} s=${26} c="#8E6A1C" />`}</span>
    <span class="grow col" style="gap:3px"><b style="font-size:14.5px">${busy ? "Préparation…" : preview ? (done || "Image ajoutée · changer") : label}</b><span class="small muted">${sub}</span></span>
    <input id=${id} type="file" accept="image/*" onChange=${async e => { const f = e.target.files[0]; if (!f) return; setBusy(true); try { const b = await compress(f, max); onFile(b, URL.createObjectURL(b)); } catch (x) { toast("Impossible de lire cette image. Essayez une photo JPG ou PNG."); } setBusy(false); }} />
  </label>`;
}
/* Sélection d'un fichier PDF (6 Mo maximum) */
function PdfUpload({ id, label, sub, file, onFile }) {
  return html`<label class="upload" for=${id}>
    <span class="thumb">${file ? html`<span style="font:800 13px var(--f-head);color:#B91C1C">PDF</span>` : html`<${Icon} n="file" s=${26} c="#8E6A1C" />`}</span>
    <span class="grow col" style="gap:3px;min-width:0"><b style="font-size:14.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${file ? file.name : label}</b><span class="small muted">${file ? "Fichier ajouté · changer" : sub}</span></span>
    <input id=${id} type="file" accept="application/pdf,.pdf" onChange=${e => { const f = e.target.files[0]; if (!f) return; if (!/pdf$/i.test(f.type) && !/\.pdf$/i.test(f.name)) { toast("Choisissez un fichier PDF."); return; } if (f.size > 6 * 1024 * 1024) { toast("Fichier trop lourd : 6 Mo maximum."); return; } onFile(f); }} />
  </label>`;
}
function Empty({ icon = "info", title, text, children }) {
  return html`<div class="empty"><span class="icon-btn" style="width:56px;height:56px;border-radius:18px"><${Icon} n=${icon} s=${26} /></span><b style="color:var(--ink);font-size:16px">${title}</b>${text && html`<span class="small" style="max-width:320px;line-height:1.5">${text}</span>`}${children}</div>`;
}
function Loading({ label }) { return html`<div class="empty"><span class="spin"></span><span class="small">${label || "Chargement…"}</span></div>`; }
function Sheet({ children, onClose }) {
  return html`<div class="sheet-bg" onClick=${e => { if (e.target === e.currentTarget) (onClose || closeSheet)(); }}><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${children}</div></div>`;
}
function Busy({ on, children, cls = "btn btn-gold btn-block", onClick, type, style, disabled }) {
  return html`<button class=${cls} type=${type || "button"} style=${style || ""} disabled=${on || disabled} onClick=${onClick}>${on ? html`<span class="spin sm"></span>Patientez…` : children}</button>`;
}
function JoinPrompt({ what }) {
  return html`<${Sheet}>
    <div class="col center" style="align-items:center;gap:12px;padding:6px 4px 4px">
      <${Shield} s=${58} />
      <h2 style="font-size:21px">Réservé aux membres</h2>
      <p class="muted" style="line-height:1.55"><b style="color:var(--ink)">${what || "Cette fonctionnalité"}</b> : accès réservé aux membres validés de Force Chrétienne. Vous pouvez continuer à acheter sur Joyau sans compte.</p>
      <button class="btn btn-gold btn-block" onClick=${() => { if (JOYAU_MODE) { goFC(S.session ? "" : "signup"); return; } S.guest = false; UI.sheet = null; UI.stack = []; UI.start = S.session ? "" : "signup"; rerender(); }}>${S.session ? "Voir mon adhésion" : "Rejoindre Force Chrétienne"}</button>
      ${!S.session && html`<button class="btn btn-line btn-block" onClick=${() => { if (JOYAU_MODE) { goFC("login"); return; } S.guest = false; UI.sheet = null; UI.stack = []; UI.start = "login"; rerender(); }}>J'ai déjà un compte</button>`}
      <button class="btn btn-ghost btn-block" onClick=${closeSheet}>Continuer sur Joyau</button>
    </div>
  <//>`;
}
