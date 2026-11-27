/* ===== Profil, installation, administration, navigation ===== */
function MyProfile() {
  const me = S.me;
  const stats = useData("my-stats", async () => {
    const [c, p, pr] = await Promise.all([
      sb.from("connections").select("id", { count: "exact", head: true }).eq("status", "accepted").or("requester.eq." + uid() + ",addressee.eq." + uid()),
      sb.from("posts").select("id", { count: "exact", head: true }).eq("author", uid()),
      sb.from("products").select("id", { count: "exact", head: true }).eq("owner", uid())
    ]);
    return { conns: c.count || 0, posts: p.count || 0, prods: pr.count || 0 };
  });
  const posts = useData("posts-of:" + uid(), () => q(sb.from("posts").select(POST_SEL).eq("author", uid()).order("created_at", { ascending: false }).limit(20)));
  const st = stats.data || { conns: 0, posts: 0, prods: 0 };
  const [busy, setBusy] = useState(false);
  const changePhoto = async e => {
    const f = e.target.files[0]; if (!f) return;
    setBusy(true);
    try { const b = await compress(f, 500); const url = publicUrl("avatars", await uploadFile("avatars", b, "photo")); await q(sb.from("profiles").update({ photo_url: url }).eq("id", uid())); await loadMe(); refresh(); toast("Photo de profil mise à jour."); }
    catch (x) { fail(x); }
    setBusy(false);
  };
  const age = me.naissance ? Math.floor((Date.now() - new Date(me.naissance).getTime()) / 31557600000) : null;
  return html`<div class="overlay">
    <${OvHead} title="Mon profil" />
    <div class="cover"></div>
    <div style="padding:0 16px;margin-top:-50px;position:relative" class="col">
      <label for="me-photo" style="position:relative;align-self:flex-start;cursor:pointer;border:4px solid #fff;border-radius:999px" aria-label="Changer ma photo">
        <${Avatar} p=${me} size=${96} />
        <span style="position:absolute;right:-2px;bottom:-2px;width:34px;height:34px;border-radius:999px;background:var(--ink);border:3px solid #fff;display:flex;align-items:center;justify-content:center">${busy ? html`<span class="spin sm" style="border-color:#fff;border-top-color:transparent"></span>` : html`<${Icon} n="camera" s=${16} c="#fff" />`}</span>
        <input id="me-photo" type="file" accept="image/*" class="sr" onChange=${changePhoto} />
      </label>
      <h2 style="font-size:24px">${fullName(me)}<${Verified} s=${18} />${isAdmin() && html` <span class="pill pill-gold" style="vertical-align:4px">Admin</span>`}</h2>
      <p class="muted">${jobLine(me)}</p>
      ${me.bio && html`<p style="line-height:1.55;font-size:14.5px">${me.bio}</p>`}
      <div class="col small" style="gap:7px;margin-top:2px">
        <span class="row" style="gap:8px"><${Icon} n="church" s=${17} c="#8E6A1C" />${me.eglise}, ${me.assemblee}</span>
        ${me.ville && html`<span class="row" style="gap:8px"><${Icon} n="pin" s=${17} c="#8E6A1C" />${me.ville}</span>`}
        ${(me.whatsapp || me.tel) && html`<span class="row" style="gap:8px"><${Icon} n="phone" s=${17} c="#8E6A1C" />${me.whatsapp || me.tel}</span>`}
        <span class="row" style="gap:8px"><${Icon} n="mail" s=${17} c="#8E6A1C" />${S.session.user.email}</span>
        ${age && html`<span class="row" style="gap:8px"><${Icon} n="calendar" s=${17} c="#8E6A1C" />${age} ans</span>`}
      </div>
      <div class="row" style="gap:8px;margin-top:10px"><div class="stat"><b>${st.conns}</b><span>relations</span></div><div class="stat"><b>${st.posts}</b><span>publications</span></div><div class="stat"><b>${st.prods}</b><span>annonces Joyau</span></div></div>
      <button class="btn btn-ink btn-block" style="margin-top:6px" onClick=${() => push("editProfile")}><${Icon} n="edit" s=${18} />Modifier mon profil</button>
    </div>
    <div class="ov-body" style="padding-top:12px">
      <button class="menu-row" onClick=${openShop}><span class="ic" style="background:#FFC93C"><${Bag} s=${24} /></span><span class="grow">Ma boutique Joyau<br /><span class="tiny muted" style="font-weight:500">Vendre aux acheteurs de Joyau</span></span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      <button class="menu-row" onClick=${() => push("favs")}><span class="ic"><${Icon} n="heart" s=${19} /></span><span class="grow">Mes favoris Joyau</span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      <button class="menu-row" onClick=${() => push("pushSettings")}><span class="ic"><${Icon} n="bell" s=${19} /></span><span class="grow">Notifications sur ce téléphone</span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      <button class="menu-row" onClick=${() => push("install")}><span class="ic"><${Icon} n="download" s=${19} /></span><span class="grow">Installer l'application</span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      ${isAdmin() && html`<button class="menu-row" onClick=${() => push("admin")}><span class="ic" style="background:var(--gold-soft)"><${Icon} n="shield" s=${19} c="#8E6A1C" /></span><span class="grow">Espace administrateur<br /><span class="tiny muted" style="font-weight:500">Adhésions, offres d'emploi, annonces</span></span><${Icon} n="arrow" s=${18} c="#63666F" /></button>`}
      <button class="menu-row" onClick=${() => push("password")}><span class="ic"><${Icon} n="lock" s=${19} /></span><span class="grow">Changer mon mot de passe</span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      <button class="menu-row" onClick=${signOut}><span class="ic"><${Icon} n="logout" s=${19} /></span><span class="grow">Se déconnecter</span></button>
      <button class="menu-row" style="color:#B91C1C" onClick=${() => openSheet("confirm", { title: "Supprimer votre compte ?", text: "Votre profil, vos publications, vos messages et votre boutique Joyau seront effacés. Cette action est définitive.", ok: "Supprimer mon compte", fn: async () => { await q(sb.rpc("delete_my_account")); await signOut(); toast("Votre compte a été supprimé."); } })}><span class="ic" style="background:var(--danger-soft)"><${Icon} n="trash" s=${19} c="#B91C1C" /></span><span class="grow">Supprimer mon compte</span></button>
      ${(posts.data || []).length > 0 && html`<div class="section-title"><h2>Mes publications</h2></div>${posts.data.map(p => html`<${PostCard} key=${p.id} p=${p} />`)}`}
    </div>
  </div>`;
}

function EditProfile() {
  const me = S.me;
  const [f, setF] = useState({ nom: me.nom, prenoms: me.prenoms, profession: me.profession, entreprise: me.entreprise || "", bio: me.bio || "", eglise: me.eglise, assemblee: me.assemblee, ville: me.ville || "", tel: me.tel || "", whatsapp: me.whatsapp || "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const saveP = async () => {
    if (!f.nom.trim() || !f.prenoms.trim() || !f.profession.trim() || !f.eglise.trim() || !f.assemblee.trim() || !f.tel.trim()) { setErr("Nom, prénoms, profession, église, assemblée et téléphone sont obligatoires."); return; }
    if (f.tel.replace(/\D/g, "").length < 8) { setErr("Numéro de téléphone incomplet."); return; }
    setBusy(true);
    try { const row = {}; for (const k in f) row[k] = f[k].trim(); row.nom = row.nom.toUpperCase(); await q(sb.from("profiles").update(row).eq("id", uid())); await loadMe(); back(); refresh(); toast("Profil enregistré."); }
    catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay"><${OvHead} title="Modifier mon profil" />
    <div class="ov-body col" style="gap:14px">
      <div class="row" style="gap:10px;align-items:flex-start"><div class="grow"><${Field} label="Nom" req><input id="ep-nom" class="input" value=${f.nom} onInput=${set("nom")} /><//></div><div class="grow"><${Field} label="Prénoms" req><input id="ep-prenoms" class="input" value=${f.prenoms} onInput=${set("prenoms")} /><//></div></div>
      <${Field} label="Profession" req><input id="ep-prof" class="input" value=${f.profession} onInput=${set("profession")} /><//>
      <${Field} label="Entreprise / Administration"><input id="ep-ent" class="input" value=${f.entreprise} onInput=${set("entreprise")} /><//>
      <${Field} label="Présentation"><textarea id="ep-bio" class="input" value=${f.bio} onInput=${set("bio")} placeholder="Quelques mots sur vous et votre métier"></textarea><//>
      <${Field} label="Église" req><input id="ep-eglise" class="input" value=${f.eglise} onInput=${set("eglise")} /><//>
      <${Field} label="Assemblée" req><input id="ep-ass" class="input" value=${f.assemblee} onInput=${set("assemblee")} /><//>
      <${Field} label="Ville"><input id="ep-ville" class="input" value=${f.ville} onInput=${set("ville")} /><//>
      <${Field} label="Téléphone" req><input id="ep-tel" class="input" inputmode="tel" value=${f.tel} onInput=${set("tel")} /><//>
      <${Field} label="WhatsApp" hint="Visible par vos relations uniquement."><input id="ep-wa" class="input" inputmode="tel" value=${f.whatsapp} onInput=${set("whatsapp")} /><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} onClick=${saveP}>Enregistrer<//>
    </div></div>`;
}
function ChangePassword() {
  const [pw, setPw] = useState(""); const [pw2, setPw2] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (pw.length < 8) { setErr("8 caractères minimum."); return; }
    if (pw !== pw2) { setErr("Les deux mots de passe ne correspondent pas."); return; }
    setBusy(true);
    try { await q(sb.auth.updateUser({ password: pw })); back(); toast("Mot de passe modifié."); } catch (e) { setErr(errText(e)); }
    setBusy(false);
  };
  return html`<div class="overlay"><${OvHead} title="Changer mon mot de passe" /><div class="ov-body col" style="gap:14px">
    <${Field} label="Nouveau mot de passe" hint="8 caractères minimum"><input id="cp-1" class="input" type="password" autocomplete="new-password" value=${pw} onInput=${e => setPw(e.target.value)} /><//>
    <${Field} label="Confirmer"><input id="cp-2" class="input" type="password" autocomplete="new-password" value=${pw2} onInput=${e => setPw2(e.target.value)} /><//>
    ${err && html`<span class="err-msg">${err}</span>`}
    <${Busy} on=${busy} onClick=${submit}>Enregistrer<//>
  </div></div>`;
}

function PushSettings() {
  const [st, setSt] = useState("…"); const [busy, setBusy] = useState(false);
  const reload = () => pushState().then(setSt);
  useEffect(() => { reload(); }, []);
  const off = async () => { setBusy(true); try { await disablePush(); toast("Notifications désactivées sur ce téléphone."); } catch (e) { fail(e); } setBusy(false); reload(); };
  const test = async () => { try { const reg = await navigator.serviceWorker.ready; await reg.showNotification("Force Chrétienne", { body: "Les notifications fonctionnent sur ce téléphone.", icon: "/icon-192.png" }); } catch (e) { toast("Impossible d'afficher la notification de test."); } };
  return html`<div class="overlay"><${OvHead} title="Notifications" />
    <div class="ov-body col" style="gap:14px">
      <p class="muted" style="line-height:1.55">Vous êtes prévenu sur ce téléphone pour : les nouveaux messages, les invitations et nouvelles relations, les commentaires et j'aime sur vos publications, les candidatures à vos offres, la validation de vos offres et de votre adhésion${isAdmin() ? ", et (administrateur) les adhésions et offres à valider" : ""}.</p>
      ${st === "on" ? html`<div class="feature" style="background:var(--ok-soft)"><span class="ic"><${Icon} n="check" c="#15803D" /></span><span><b style="color:#15803D">Activées sur ce téléphone</b><br /><span class="small muted">Chaque appareil s'active séparément.</span></span></div>
        <button class="btn btn-line btn-block" onClick=${test}>Envoyer une notification de test</button>
        <${Busy} on=${busy} cls="btn btn-ghost btn-block" onClick=${off}>Désactiver sur ce téléphone<//>`
        : html`<${PushCard} onDone=${reload} />`}
    </div></div>`;
}

/* ---------- Installation (PWA) ---------- */
let INSTALL_EVT = null;
addEventListener("beforeinstallprompt", e => { e.preventDefault(); INSTALL_EVT = e; rerender(); });
function Install() {
  const [os, setOs] = useState(/iPhone|iPad|iPod/.test(navigator.userAgent) ? "ios" : "android");
  const step = (n, t) => html`<div class="row" style="align-items:flex-start;gap:12px"><span class="logo-sq" style="width:34px;height:34px;border-radius:11px;background:var(--gold);color:var(--ink);font-size:15px">${n}</span><span style="line-height:1.5;padding-top:6px">${t}</span></div>`;
  const host = location.host;
  return html`<div class="overlay"><${OvHead} title="Installer l'application" />
    <div class="ov-body col" style="gap:16px">
      <div class="row card" style="background:var(--soft);border:0"><span style="width:64px;height:64px;border-radius:18px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(35,38,45,.1)"><${Shield} s=${46} /></span><span class="grow"><b style="font-family:var(--f-brand);letter-spacing:1px">FORCE CHRÉTIENNE</b><br /><span class="small muted">Gratuite · s'installe en 10 secondes, sans passer par un store</span></span></div>
      ${isStandalone() ? html`<div class="demo-note" style="background:var(--ok-soft);color:var(--ok)"><b>L'application est déjà installée</b> sur cet appareil.</div>`
        : INSTALL_EVT && html`<button class="btn btn-gold btn-block" style="height:54px" onClick=${async () => { INSTALL_EVT.prompt(); try { await INSTALL_EVT.userChoice; } catch (e) {} INSTALL_EVT = null; rerender(); }}><${Icon} n="download" s=${20} />Installer maintenant</button>`}
      <div class="seg"><button class=${os === "android" ? "on" : ""} onClick=${() => setOs("android")}>Android</button><button class=${os === "ios" ? "on" : ""} onClick=${() => setOs("ios")}>iPhone</button></div>
      ${os === "android" ? html`<div class="col" style="gap:14px">${step(1, html`Ouvrez <b>${host}</b> dans <b>Chrome</b>.`)}${step(2, html`Touchez <b>Installer</b> en bas de l'écran, ou le menu <b>⋮</b> puis <b>Installer l'application</b>.`)}${step(3, html`L'icône Force Chrétienne apparaît sur votre écran d'accueil.`)}</div>`
        : html`<div class="col" style="gap:14px">${step(1, html`Ouvrez <b>${host}</b> dans <b>Safari</b>.`)}${step(2, html`Touchez le bouton <b>Partager</b> (le carré avec une flèche vers le haut).`)}${step(3, html`Choisissez <b>Sur l'écran d'accueil</b>, puis <b>Ajouter</b>.`)}${step(4, html`Ouvrez ensuite l'application depuis son icône.`)}</div>`}
    </div></div>`;
}

/* ---------- Administration ---------- */
function Admin() {
  const [t, setT] = useState("members");
  const stats = useData("admin-stats", () => q(sb.rpc("admin_stats")));
  const st = stats.data || {};
  return html`<div class="overlay"><${OvHead} title="Espace administrateur" />
    <div class="ov-body col" style="gap:14px">
      <div class="row" style="gap:8px"><div class="stat"><b>${st.members || 0}</b><span>membres</span></div><div class="stat"><b>${st.pending || 0}</b><span>adhésions</span></div><div class="stat"><b>${st.jobs_pending || 0}</b><span>offres à valider</span></div></div>
      <div class="row" style="gap:8px"><div class="stat"><b>${st.shops || 0}</b><span>boutiques</span></div><div class="stat"><b>${st.products || 0}</b><span>annonces Joyau</span></div></div>
      <div class="seg"><button class=${t === "members" ? "on" : ""} onClick=${() => setT("members")}>Adhésions</button><button class=${t === "jobs" ? "on" : ""} onClick=${() => setT("jobs")}>Emplois</button><button class=${t === "joyau" ? "on" : ""} onClick=${() => setT("joyau")}>Joyau</button><button class=${t === "all" ? "on" : ""} onClick=${() => setT("all")}>Membres</button></div>
      ${t === "members" ? html`<${AdminMembers} />` : t === "jobs" ? html`<${AdminJobs} />` : t === "joyau" ? html`<${AdminJoyau} />` : html`<${AdminAll} />`}
    </div></div>`;
}
function Candidate({ k }) {
  const [carte, setCarte] = useState(null); const [busy, setBusy] = useState("");
  const isPdf = /\.pdf$/i.test(k.carte_path || "");
  const view = async () => {
    if (carte) { setCarte(null); return; }
    if (!k.carte_path) { toast("Aucune carte envoyée."); return; }
    try { setCarte({ recto: await signedUrl("cards", k.carte_path), verso: k.carte_verso_path ? await signedUrl("cards", k.carte_verso_path) : "" }); } catch (e) { fail(e); }
  };
  const decide = async st => { setBusy(st); try { await q(sb.from("profiles").update({ status: st }).eq("id", k.id)); toast(st === "active" ? fullName(k) + " est maintenant membre." : "Adhésion refusée. Le demandeur est prévenu."); refresh(); } catch (e) { fail(e); } setBusy(""); };
  return html`<div class="card col" style="gap:10px">
    <span class="row"><${Avatar} p=${k} size=${48} /><span class="grow"><b>${fullName(k)}</b><br /><span class="small muted">${jobLine(k)}${k.ville ? " · " + k.ville : ""}</span></span><span class="tiny muted">${ago(k.created_at)}</span></span>
    <span class="small" style="line-height:1.6"><b>Église :</b> ${k.eglise}<br /><b>Assemblée :</b> ${k.assemblee}${k.naissance ? html`<br /><b>Né(e) le :</b> ${k.naissance.split("-").reverse().join("/")}` : ""}<br /><b>E-mail :</b> ${k.mail}${k.whatsapp ? html`<br /><b>WhatsApp :</b> ${k.whatsapp}` : ""}</span>
    <button class="btn btn-line btn-sm" onClick=${view}><${Icon} n=${isPdf ? "file" : "card"} s=${17} />${carte ? "Masquer" : "Voir"} la carte de membre${isPdf ? " (PDF)" : ""}</button>
    ${carte && isPdf && html`<a class="btn btn-ink btn-sm" href=${carte.recto} target="_blank" rel="noopener"><${Icon} n="file" s=${16} />Ouvrir le PDF de la carte</a><span class="tiny muted center">Le PDF doit contenir le recto et le verso.</span>`}
    ${carte && !isPdf && html`<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
      ${[["Recto", carte.recto], ["Verso", carte.verso]].map(([l, u]) => html`<div key=${l} class="col" style="gap:4px"><span class="tiny bold muted">${l}</span>${u ? html`<a href=${u} target="_blank" rel="noopener" title="Agrandir"><img src=${u} alt=${l + " de la carte de " + fullName(k)} style="width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:12px;border:1px solid var(--line);display:block" /></a>` : html`<span class="small muted" style="aspect-ratio:3/2;border-radius:12px;background:var(--soft);display:flex;align-items:center;justify-content:center;text-align:center;padding:8px">Non fourni (ancienne inscription)</span>`}</div>`)}
    </div><span class="tiny muted center">Touchez une photo pour l'agrandir.</span>`}
    <span class="row" style="gap:8px"><${Busy} on=${busy === "active"} cls="btn btn-gold btn-sm grow" onClick=${() => decide("active")}><${Icon} n="check" s=${17} w=${2.6} />Valider<//><${Busy} on=${busy === "refused"} cls="btn btn-danger btn-sm grow" onClick=${() => decide("refused")}>Refuser<//></span>
  </div>`;
}
function AdminMembers() {
  const c = useData("admin-pending", () => q(sb.from("profiles").select("*").eq("status", "pending").order("created_at")));
  return html`<div class="col">${c.loading && !c.data && html`<${Loading} />`}${(c.data || []).map(k => html`<${Candidate} key=${k.id} k=${k} />`)}${!c.loading && !(c.data || []).length && html`<${Empty} icon="shield" title="Aucune adhésion en attente" />`}</div>`;
}
function AdminJobs() {
  const j = useData("admin-jobs", () => q(sb.from("jobs").select("*, a:profiles!jobs_author_fkey(" + PROFILE_COLS + ")").eq("status", "pending").order("created_at")));
  const decide = async (x, st) => { try { await q(sb.from("jobs").update({ status: st }).eq("id", x.id)); toast(st === "online" ? "Offre publiée." : "Offre refusée."); refresh(); } catch (e) { fail(e); } };
  return html`<div class="col">${j.loading && !j.data && html`<${Loading} />`}
    ${(j.data || []).map(x => html`<div key=${x.id} class="card col" style="gap:8px"><b>${x.title}</b><span class="small muted">${x.company} · ${x.place} · ${x.contract} · ${x.salary}</span><p class="small" style="line-height:1.5;white-space:pre-wrap">${x.description}</p><span class="tiny muted">Proposée par ${fullName(x.a)} · ${ago(x.created_at)}</span>
      <span class="row" style="gap:8px"><button class="btn btn-gold btn-sm grow" onClick=${() => decide(x, "online")}>Publier</button><button class="btn btn-danger btn-sm grow" onClick=${() => decide(x, "refused")}>Refuser</button></span></div>`)}
    ${!j.loading && !(j.data || []).length && html`<${Empty} icon="brief" title="Aucune offre à valider" />`}</div>`;
}
function AdminJoyau() {
  const p = useData("admin-products", () => q(sb.from("products").select("*, shops(name)").order("created_at", { ascending: false }).limit(300)));
  const toggle = async x => { try { await q(sb.from("products").update({ status: x.status === "hidden_admin" ? "online" : "hidden_admin" }).eq("id", x.id)); refresh(); } catch (e) { fail(e); } };
  return html`<div class="col"><p class="small muted">Masquez une annonce qui ne respecte pas la charte. Le vendeur ne pourra pas la remettre en ligne lui-même.</p>
    ${(p.data || []).map(x => html`<div key=${x.id} class="list-row"><span style="width:46px;height:46px;border-radius:12px;background:var(--j-soft);overflow:hidden;flex:none"><img src=${x.photo_url} alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy" /></span><span class="grow" style="min-width:0"><b class="small" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.name}</b><span class="tiny muted">${x.shops ? x.shops.name : ""} · ${fmt(x.price)}${x.status !== "online" ? " · masquée" : ""}</span></span>
      <button class=${"btn btn-sm " + (x.status === "hidden_admin" ? "btn-ghost" : "btn-line")} onClick=${() => toggle(x)}>${x.status === "hidden_admin" ? "Rétablir" : "Masquer"}</button></div>`)}
    ${!p.loading && !(p.data || []).length && html`<${Empty} icon="store" title="Aucune annonce pour l'instant" />`}</div>`;
}
function AdminAll() {
  const [qq, setQ] = useState("");
  const m = useData("admin-all", () => q(sb.from("profiles").select("*").neq("status", "pending").order("created_at", { ascending: false }).limit(1000)));
  const list = (m.data || []).filter(x => !qq || [fullName(x), x.mail, x.eglise].join(" ").toLowerCase().includes(qq.toLowerCase()));
  const setStatus = async (x, st) => { try { await q(sb.from("profiles").update({ status: st }).eq("id", x.id)); refresh(); toast(st === "active" ? "Membre réactivé." : "Membre suspendu."); } catch (e) { fail(e); } };
  return html`<div class="col">
    <div class="search"><${Icon} n="search" s=${19} c="#63666F" /><input id="adm-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Nom, e-mail, église…" /></div>
    ${list.map(x => html`<div key=${x.id} class="list-row"><${Avatar} p=${x} size=${42} /><span class="grow" style="min-width:0"><b class="small">${fullName(x)}</b>${x.role === "admin" && html` <span class="pill pill-gold">Admin</span>`}<br /><span class="tiny muted">${x.mail} · ${x.status === "active" ? "membre" : "refusé / suspendu"}</span></span>
      ${x.role !== "admin" && (x.status === "active" ? html`<button class="btn btn-line btn-sm" onClick=${() => openSheet("confirm", { title: "Suspendre " + fullName(x) + " ?", text: "Il n'aura plus accès au réseau tant que vous ne l'aurez pas réactivé.", ok: "Suspendre", fn: () => setStatus(x, "refused") })}>Suspendre</button>` : html`<button class="btn btn-ghost btn-sm" onClick=${() => setStatus(x, "active")}>Réactiver</button>`)}</div>`)}
  </div>`;
}

function ConfirmSheet({ title, text, ok, fn }) {
  const [busy, setBusy] = useState(false);
  return html`<${Sheet}><div class="col" style="gap:12px;padding-bottom:4px"><h2 style="font-size:20px">${title}</h2><p class="muted" style="line-height:1.55">${text}</p>
    <${Busy} on=${busy} cls="btn btn-block" style="background:#B91C1C;color:#fff" onClick=${async () => { setBusy(true); try { await fn(); UI.sheet = null; refresh(); } catch (e) { fail(e); } setBusy(false); }}>${ok}<//><button class="btn btn-ghost btn-block" onClick=${closeSheet}>Annuler</button></div><//>`;
}

/* ---------- Navigation ---------- */
function Nav() {
  const tabs = [["home", "Accueil", "home"], ["network", "Réseau", "users"], ["joyau", "Joyau", ""], ["messages", "Messages", "chat"], ["opps", "Opportunités", "brief"]];
  const u = useUnread();
  return html`<nav class="nav" aria-label="Navigation principale">
    ${tabs.map(([k, label, ic]) => k === "joyau"
      ? html`<button key=${k} class=${"joyau-tab" + (UI.tab === k ? " on" : "")} aria-current=${UI.tab === k ? "page" : null} onClick=${() => go(k)}><span class="jt-icon"><${Bag} s=${32} /></span>${label}</button>`
      : html`<button key=${k} class=${UI.tab === k ? "on" : ""} aria-current=${UI.tab === k ? "page" : null} onClick=${() => { if (!isMember()) { openSheet("join", { what: label === "Messages" ? "La messagerie" : label === "Réseau" ? "Le réseau" : label === "Accueil" ? "Le fil d'actualité" : "L'espace Opportunités" }); return; } go(k); }}><${Icon} n=${ic} s=${23} w=${UI.tab === k ? 2.3 : 1.9} />${label}${k === "messages" && u.msgs ? html`<span class="dot">${u.msgs}</span>` : ""}</button>`)}
  </nav>`;
}

function OverlayView({ o }) {
  switch (o.type) {
    case "profile": return html`<${Profile} id=${o.id} />`;
    case "compose": return html`<${Compose} kind=${o.kind} />`;
    case "chat": return html`<${Chat} id=${o.id} />`;
    case "notifs": return html`<${Notifs} />`;
    case "jobForm": return html`<${JobForm} />`;
    case "servForm": return html`<${ServForm} />`;
    case "dealForm": return html`<${DealForm} />`;
    case "product": return html`<${Product} id=${o.id} />`;
    case "seller": return html`<${Seller} id=${o.id} />`;
    case "favs": return html`<${Favs} />`;
    case "shop": return html`<${Shop} />`;
    case "shopEdit": return html`<${ShopForm} edit />`;
    case "productForm": return html`<${ProductForm} shop=${o.shop} edit=${o.edit} />`;
    case "editProfile": return html`<${EditProfile} />`;
    case "password": return html`<${ChangePassword} />`;
    case "install": return html`<${Install} />`;
    case "pushSettings": return html`<${PushSettings} />`;
    case "admin": return isAdmin() ? html`<${Admin} />` : null;
  }
  return null;
}
function SheetView({ s }) {
  switch (s.type) {
    case "join": return html`<${JoinPrompt} what=${s.what} />`;
    case "job": return html`<${JobSheet} j=${s.j} />`;
    case "wa": return html`<${WaSheet} msg=${s.msg} num=${s.num} seller=${s.seller} />`;
    case "newMsg": return html`<${NewMsgSheet} />`;
    case "confirm": return html`<${ConfirmSheet} ...${s} />`;
    case "installJoyau": return html`<${InstallJoyauSheet} />`;
    case "copy": return html`<${Sheet}><div class="col" style="gap:12px"><h2 style="font-size:19px">Copiez ce lien</h2><input id="copy-url" class="input" readonly value=${s.url} onFocus=${e => e.target.select()} /><button class="btn btn-ink btn-block" onClick=${closeSheet}>Fermer</button></div><//>`;
  }
  return null;
}

function App() {
  const [, setTick] = useState(0);
  useEffect(() => { rerender = () => setTick(t => t + 1); boot(); }, []);
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") { if (UI.sheet) closeSheet(); else if (UI.stack.length) back(); } };
    addEventListener("keydown", onKey); return () => removeEventListener("keydown", onKey);
  }, []);
  const top = UI.stack[UI.stack.length - 1];
  let screen;
  if (!S.booted) screen = html`<div class="welcome" style="align-items:center;justify-content:center;gap:18px"><${Shield} s=${84} /><span class="spin"></span></div>`;
  else if (JOYAU_MODE) screen = html`<main><${JoyauTab} /></main>`;
  else if (S.recovery && S.session) screen = html`<${NewPassword} />`;
  else if (UI.start === "login" && !S.session) screen = html`<${Login} />`;
  else if (UI.start === "signup" && !S.session) screen = html`<${Signup} />`;
  else if (isMember() || S.guest) {
    if (!isMember() && UI.tab !== "joyau") UI.tab = "joyau";
    const tab = UI.tab;
    screen = html`<div>
      ${tab !== "joyau" && html`<${TopBar} />`}
      <main>${tab === "home" ? html`<${HomeTab} />` : tab === "network" ? html`<${NetworkTab} />` : tab === "messages" ? html`<${MessagesTab} />` : tab === "opps" ? html`<${OppsTab} />` : html`<${JoyauTab} />`}</main>
      <${Nav} />
    </div>`;
  }
  else if (S.session && !S.me) screen = html`<${ProfileSetup} />`;
  else if (S.me && S.me.status === "refused") screen = html`<${ProfileSetup} redo />`;
  else if (S.me && S.me.status === "pending") screen = html`<${Pending} />`;
  else screen = html`<${Welcome} />`;
  return html`<div class="shell">
    ${screen}
    ${S.booted && top && html`<${OverlayView} key=${UI.stack.length + top.type} o=${top} />`}
    ${UI.sheet && html`<${SheetView} s=${UI.sheet} />`}
    ${UI.toast && html`<div class="toast" role="status">${UI.toast}</div>`}
  </div>`;
}

render(html`<${App} />`, document.getElementById("app"));
if ("serviceWorker" in navigator && location.protocol === "https:") addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
