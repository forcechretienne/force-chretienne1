/* ===== Comptes : connexion, création, profil, adhésion ===== */
async function loadMe() {
  if (!S.session) { S.me = null; return; }
  try { S.me = await q(sb.from("profiles").select("*").eq("id", uid()).maybeSingle()); }
  catch (e) { console.error(e); S.me = S.me || null; }
}
async function boot() {
  try { const { data } = await sb.auth.getSession(); S.session = data.session; } catch (e) { console.error(e); }
  await loadMe();
  S.booted = true; rerender();
  sb.auth.onAuthStateChange(async (ev, session) => {
    if (ev === "PASSWORD_RECOVERY") S.recovery = true;
    const changed = (session && session.user.id) !== (S.session && S.session.user.id);
    S.session = session;
    if (changed || ev === "SIGNED_IN" || ev === "USER_UPDATED") { await loadMe(); for (const k in CACHE) delete CACHE[k]; startRealtime(); }
    if (!session) { S.me = null; stopRealtime(); }
    refresh();
  });
  startRealtime();
}
let RT = null;
function startRealtime() {
  stopRealtime();
  if (!uid()) return;
  RT = sb.channel("fc-" + uid())
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: "recipient=eq." + uid() }, () => refresh())
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications", filter: "user_id=eq." + uid() }, async p => { if (p.new && /adhésion/.test(p.new.text)) await loadMe(); refresh(); })
    .subscribe();
}
function stopRealtime() { if (RT) { try { sb.removeChannel(RT); } catch (e) {} RT = null; } }
async function signOut() { stopRealtime(); await sb.auth.signOut(); S.session = null; S.me = null; S.guest = false; UI.stack = []; UI.tab = "home"; UI.start = ""; for (const k in CACHE) delete CACHE[k]; refresh(); }

function Welcome() {
  return html`<div class="welcome">
    <div class="hero">
      <span class="halo"></span>
      <span style="position:relative"><${Shield} s=${92} /></span>
      <${Wordmark} />
      <p class="muted" style="position:relative;max-width:320px;line-height:1.55;margin-top:4px">Le réseau des professionnels chrétiens : se connecter, s'entraider, entreprendre et acheter entre membres de confiance.</p>
    </div>
    <div class="col" style="padding:0 20px;gap:8px">
      <div class="feature"><span class="ic"><${Icon} n="users" c="#8E6A1C" /></span><span><b>Un réseau vérifié</b><br /><span class="small muted">Chaque membre est validé avec sa carte de membre d'église.</span></span></div>
      <div class="feature"><span class="ic"><${Icon} n="brief" c="#8E6A1C" /></span><span><b>Emplois, services et affaires</b><br /><span class="small muted">Des offres d'emploi validées par l'administrateur.</span></span></div>
      <div class="feature"><span class="ic" style="background:#FFC93C"><${Bag} s=${26} /></span><span><b>Joyau, la boutique intégrée</b><br /><span class="small muted">Achetez aux membres, commandez sur WhatsApp.</span></span></div>
    </div>
    <div class="col" style="padding:22px 20px 32px;gap:10px;margin-top:auto">
      <button class="btn btn-gold btn-block" style="height:54px" onClick=${() => { UI.start = "signup"; rerender(); }}>Rejoindre Force Chrétienne</button>
      <button class="btn btn-line btn-block" onClick=${() => { UI.start = "login"; rerender(); }}>J'ai déjà un compte</button>
      <button class="btn btn-block" style="background:#FFF7DD;color:#1F3FC4" onClick=${() => { S.guest = true; UI.tab = "joyau"; UI.start = ""; rerender(); }}><${Bag} s=${22} /> Découvrir Joyau sans compte</button>
    </div>
  </div>`;
}

function AuthHead({ onBack }) {
  return html`<div class="ov-head" style="position:static;border:0"><button class="icon-btn" aria-label="Retour" onClick=${onBack || (() => { UI.start = ""; rerender(); })}><${Icon} n="back" /></button></div>`;
}

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = async e => {
    e.preventDefault(); setErr("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setErr("Saisissez une adresse e-mail valide."); return; }
    if (forgot) {
      setBusy(true);
      try { await q(sb.auth.resetPasswordForEmail(email.trim(), { redirectTo: location.origin + location.pathname })); setSent(true); } catch (x) { setErr(errText(x)); }
      setBusy(false); return;
    }
    if (!pw) { setErr("Saisissez votre mot de passe."); return; }
    setBusy(true);
    try { await q(sb.auth.signInWithPassword({ email: email.trim(), password: pw })); UI.start = ""; UI.tab = "home"; S.guest = false; }
    catch (x) { setErr(errText(x)); }
    setBusy(false);
  };
  return html`<div class="welcome">
    <${AuthHead} onBack=${forgot ? () => { setForgot(false); setSent(false); setErr(""); } : null} />
    <form class="col" style="padding:8px 20px 32px;gap:16px" onSubmit=${submit}>
      <span class="row"><${Shield} s=${46} /><span class="brand-name" style="font-size:18px">FORCE<br />CHRÉTIENNE</span></span>
      <h1 style="font-size:28px">${forgot ? "Mot de passe oublié" : "Heureux de vous revoir"}</h1>
      ${forgot && html`<p class="muted" style="line-height:1.5">Entrez votre e-mail : vous recevrez un lien pour choisir un nouveau mot de passe.</p>`}
      <${Field} label="E-mail"><input id="login-email" class="input" type="email" autocomplete="email" value=${email} onInput=${e => setEmail(e.target.value)} placeholder="nom@exemple.com" /><//>
      ${!forgot && html`<${Field} label="Mot de passe"><input id="login-pw" class="input" type="password" autocomplete="current-password" value=${pw} onInput=${e => setPw(e.target.value)} /><//>`}
      ${err && html`<span class="err-msg">${err}</span>`}
      ${sent ? html`<div class="demo-note" style="background:var(--ok-soft);color:var(--ok)"><b>E-mail envoyé.</b> Ouvrez le lien reçu (pensez aux courriers indésirables) pour choisir votre nouveau mot de passe.</div>`
        : html`<${Busy} on=${busy} type="submit" cls="btn btn-ink btn-block">${forgot ? "Recevoir le lien" : "Se connecter"}<//>`}
      ${!forgot && html`<button type="button" class="link" style="align-self:center" onClick=${() => { setForgot(true); setErr(""); }}>Mot de passe oublié ?</button>`}
      ${!forgot && html`<p class="small muted center">Pas encore membre ? <button type="button" class="link" onClick=${() => { UI.start = "signup"; rerender(); }}>Créer mon compte</button></p>`}
    </form>
  </div>`;
}

function NewPassword() {
  const [pw, setPw] = useState(""); const [pw2, setPw2] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault();
    if (pw.length < 8) { setErr("8 caractères minimum."); return; }
    if (pw !== pw2) { setErr("Les deux mots de passe ne correspondent pas."); return; }
    setBusy(true);
    try { await q(sb.auth.updateUser({ password: pw })); S.recovery = false; toast("Mot de passe modifié."); refresh(); } catch (x) { setErr(errText(x)); }
    setBusy(false);
  };
  return html`<div class="welcome"><form class="col" style="padding:40px 20px;gap:16px" onSubmit=${submit}>
    <${Shield} s=${52} /><h1 style="font-size:26px">Nouveau mot de passe</h1>
    <${Field} label="Nouveau mot de passe" hint="8 caractères minimum"><input id="np-1" class="input" type="password" autocomplete="new-password" value=${pw} onInput=${e => setPw(e.target.value)} /><//>
    <${Field} label="Confirmer"><input id="np-2" class="input" type="password" autocomplete="new-password" value=${pw2} onInput=${e => setPw2(e.target.value)} /><//>
    ${err && html`<span class="err-msg">${err}</span>`}
    <${Busy} on=${busy} type="submit">Enregistrer<//>
  </form></div>`;
}

/* Étape 1 : créer le compte (e-mail + mot de passe) */
function Signup() {
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [pw2, setPw2] = useState("");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false); const [check, setCheck] = useState(false);
  const submit = async e => {
    e.preventDefault(); setErr("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setErr("Saisissez une adresse e-mail valide."); return; }
    if (pw.length < 8) { setErr("Le mot de passe doit contenir au moins 8 caractères."); return; }
    if (pw !== pw2) { setErr("Les deux mots de passe ne correspondent pas."); return; }
    setBusy(true);
    try {
      const d = await q(sb.auth.signUp({ email: email.trim(), password: pw, options: { emailRedirectTo: location.origin + location.pathname } }));
      if (d.user && d.user.identities && d.user.identities.length === 0) setErr("Un compte existe déjà avec cet e-mail. Connectez-vous.");
      else if (!d.session) setCheck(true);
      else { UI.start = ""; }
    } catch (x) { setErr(errText(x)); }
    setBusy(false);
  };
  if (check) return html`<div class="welcome"><${AuthHead} /><div class="col" style="padding:8px 20px 32px;gap:16px;align-items:center;text-align:center">
    <span style="width:96px;height:96px;border-radius:30px;background:var(--gold-soft);display:flex;align-items:center;justify-content:center"><${Icon} n="mail" s=${46} c="#8E6A1C" /></span>
    <h1 style="font-size:26px">Confirmez votre e-mail</h1>
    <p class="muted" style="line-height:1.55;max-width:330px">Nous avons envoyé un lien à <b style="color:var(--ink)">${email}</b>. Ouvrez-le pour activer votre compte, puis connectez-vous pour compléter votre profil. Pensez à vérifier les courriers indésirables.</p>
    <button class="btn btn-gold btn-block" onClick=${() => { UI.start = "login"; rerender(); }}>J'ai confirmé, me connecter</button>
  </div></div>`;
  return html`<div class="welcome">
    <${AuthHead} />
    <form class="col" style="padding:8px 20px 32px;gap:16px" onSubmit=${submit}>
      <div class="progress"><span class="on"></span><span></span><span></span><span></span></div>
      <h1 style="font-size:27px">Créer mon compte</h1>
      <p class="muted" style="line-height:1.5">Ensuite, vous compléterez votre profil et votre carte de membre. Votre adhésion sera validée par l'administrateur.</p>
      <${Field} label="E-mail" req><input id="su-email" class="input" type="email" autocomplete="email" value=${email} onInput=${e => setEmail(e.target.value)} placeholder="nom@exemple.com" /><//>
      <${Field} label="Mot de passe" req hint="8 caractères minimum"><input id="su-pw" class="input" type="password" autocomplete="new-password" value=${pw} onInput=${e => setPw(e.target.value)} /><//>
      <${Field} label="Confirmer le mot de passe" req><input id="su-pw2" class="input" type="password" autocomplete="new-password" value=${pw2} onInput=${e => setPw2(e.target.value)} /><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} type="submit" style="height:54px">Continuer<//>
      <p class="small muted center">Déjà membre ? <button type="button" class="link" onClick=${() => { UI.start = "login"; rerender(); }}>Se connecter</button></p>
    </form>
  </div>`;
}

/* Étapes 2 à 4 : profil, église et carte de membre (compte déjà créé) */
function ProfileSetup({ redo }) {
  const me = S.me || {};
  const [step, setStep] = useState(redo ? 1 : 0);
  const [f, setF] = useState({ nom: me.nom || "", prenoms: me.prenoms || "", naissance: me.naissance || "", profession: me.profession || "", entreprise: me.entreprise || "", eglise: me.eglise || "", assemblee: me.assemblee || "", ville: me.ville || "", tel: me.tel || "", whatsapp: me.whatsapp || "", accept: !!redo });
  const [photo, setPhoto] = useState(null); const [photoPrev, setPhotoPrev] = useState(me.photo_url || "");
  const [carte, setCarte] = useState(null); const [cartePrev, setCartePrev] = useState("");
  const [errs, setErrs] = useState({}); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const need = [["nom", "prenoms", "naissance", "photo"], ["profession", "eglise", "assemblee", "carte"], ["accept"]];
  const next = async () => {
    const e = {};
    need[step].forEach(k => {
      if (k === "photo") { if (!photo && !photoPrev) e.photo = "Ajoutez une photo de profil."; }
      else if (k === "carte") { if (!carte) e.carte = "Ajoutez la photo de votre carte de membre."; }
      else if (k === "accept") { if (!f.accept) e.accept = "Veuillez accepter la charte pour continuer."; }
      else if (!String(f[k] || "").trim()) e[k] = "Ce champ est obligatoire.";
    });
    setErrs(e);
    if (Object.keys(e).length) return;
    if (step < 2) { setStep(step + 1); try { window.scrollTo(0, 0); } catch (x) {} return; }
    setBusy(true);
    try {
      let photo_url = me.photo_url || "";
      if (photo) photo_url = publicUrl("avatars", await uploadFile("avatars", photo, "photo"));
      const carte_path = carte ? await uploadFile("cards", carte, "carte") : me.carte_path;
      const row = { id: uid(), nom: f.nom.trim().toUpperCase(), prenoms: f.prenoms.trim(), naissance: f.naissance || null, profession: f.profession.trim(), entreprise: f.entreprise.trim(), eglise: f.eglise.trim(), assemblee: f.assemblee.trim(), ville: f.ville.trim(), tel: f.tel.trim(), whatsapp: f.whatsapp.trim(), mail: S.session.user.email, photo_url, carte_path };
      if (S.me) await q(sb.from("profiles").update(row).eq("id", uid()));
      else await q(sb.from("profiles").insert(row));
      await loadMe(); refresh();
      toast(isMember() ? "Bienvenue !" : "Candidature envoyée.");
    } catch (x) { fail(x); }
    setBusy(false);
  };
  const titles = ["Qui êtes-vous ?", "Votre vie pro et votre église", "Vos coordonnées"];
  return html`<div class="welcome">
    <div class="ov-head"><button class="icon-btn" aria-label=${step ? "Étape précédente" : "Se déconnecter"} onClick=${() => { if (step > (redo ? 1 : 0)) setStep(step - 1); else signOut(); }}><${Icon} n=${step > (redo ? 1 : 0) ? "back" : "logout"} /></button><h1>${redo ? "Mettre à jour mon adhésion" : "Mon profil · étape " + (step + 2) + " sur 4"}</h1></div>
    <div class="col" style="padding:16px 20px 36px;gap:16px">
      <div class="progress"><span class="on"></span>${[0, 1, 2].map(i => html`<span key=${i} class=${i <= step ? "on" : ""}></span>`)}</div>
      <h2 style="font-size:25px">${titles[step]}</h2>
      ${step === 0 && html`
        <${Field} label="Nom" req err=${errs.nom}><input id="pf-nom" class=${"input" + (errs.nom ? " err" : "")} value=${f.nom} onInput=${set("nom")} placeholder="KOUADIO" autocomplete="family-name" /><//>
        <${Field} label="Prénoms" req err=${errs.prenoms}><input id="pf-prenoms" class=${"input" + (errs.prenoms ? " err" : "")} value=${f.prenoms} onInput=${set("prenoms")} placeholder="Ulrich Emmanuel" autocomplete="given-name" /><//>
        <${Field} label="Date de naissance" req err=${errs.naissance}><input id="pf-naissance" type="date" class=${"input" + (errs.naissance ? " err" : "")} value=${f.naissance} onInput=${set("naissance")} /><//>
        <${Field} label="Photo de profil" req err=${errs.photo}><${Upload} id="pf-photo" label="Ajouter votre photo" sub="Visage bien visible, de face" preview=${photoPrev} max=${500} onFile=${(b, u) => { setPhoto(b); setPhotoPrev(u); }} /><//>`}
      ${step === 1 && html`
        ${redo && html`<div class="demo-note" style="background:var(--warn-soft);color:var(--warn)">Votre adhésion n'a pas pu être validée. Vérifiez vos informations et envoyez une photo nette de votre carte de membre à jour.</div>`}
        <${Field} label="Profession" req err=${errs.profession}><input id="pf-profession" class=${"input" + (errs.profession ? " err" : "")} value=${f.profession} onInput=${set("profession")} placeholder="Responsable commercial" /><//>
        <${Field} label="Entreprise ou activité"><input id="pf-entreprise" class="input" value=${f.entreprise} onInput=${set("entreprise")} placeholder="Facultatif" /><//>
        <${Field} label="Église" req err=${errs.eglise}><input id="pf-eglise" class=${"input" + (errs.eglise ? " err" : "")} value=${f.eglise} onInput=${set("eglise")} placeholder="Église Évangélique Bethel" /><//>
        <${Field} label="Assemblée" req err=${errs.assemblee}><input id="pf-assemblee" class=${"input" + (errs.assemblee ? " err" : "")} value=${f.assemblee} onInput=${set("assemblee")} placeholder="Assemblée de Cocody Angré" /><//>
        <${Field} label="Carte de membre" req err=${errs.carte} hint="Carte à jour, signée par l'autorité ecclésiastique. Seuls les administrateurs la voient."><${Upload} id="pf-carte" icon="card" label="Photographier votre carte" sub="Recto, lisible, sans reflet" preview=${cartePrev} max=${1400} onFile=${(b, u) => { setCarte(b); setCartePrev(u); }} /><//>`}
      ${step === 2 && html`
        <p class="muted small">Facultatif, mais utile pour que les membres vous joignent.</p>
        <${Field} label="Ville"><input id="pf-ville" class="input" value=${f.ville} onInput=${set("ville")} placeholder="Abidjan" /><//>
        <${Field} label="Téléphone"><input id="pf-tel" class="input" inputmode="tel" value=${f.tel} onInput=${set("tel")} placeholder="07 00 00 00 00" /><//>
        <${Field} label="WhatsApp" hint="Indispensable pour vendre sur Joyau : les commandes arrivent sur ce numéro."><input id="pf-wa" class="input" inputmode="tel" value=${f.whatsapp} onInput=${set("whatsapp")} placeholder="07 00 00 00 00" /><//>
        <label class="row" style="align-items:flex-start;gap:10px;font-size:14px;line-height:1.5"><input id="pf-accept" type="checkbox" checked=${f.accept} onChange=${set("accept")} style="width:20px;height:20px;margin-top:2px;accent-color:#B8892B" /><span>J'adhère à la charte de Force Chrétienne : respect, honnêteté dans les affaires et bienveillance entre membres.</span></label>
        ${errs.accept && html`<span class="err-msg">${errs.accept}</span>`}`}
      <${Busy} on=${busy} style="height:54px;margin-top:6px" onClick=${next}>${step < 2 ? "Continuer" : redo ? "Renvoyer ma demande" : "Envoyer ma candidature"}<//>
      <p class="tiny muted center">Les champs marqués <b style="color:var(--gold-ink)">*</b> sont obligatoires.</p>
    </div>
  </div>`;
}

function Pending() {
  const me = S.me;
  const [busy, setBusy] = useState(false);
  const check = async () => { setBusy(true); await loadMe(); setBusy(false); if (isMember()) { toast("Adhésion validée. Bienvenue !"); UI.tab = "home"; } else toast("Toujours en cours de vérification."); refresh(); };
  return html`<div class="welcome">
    <div class="hero" style="padding-top:56px">
      <span class="halo"></span>
      <span style="position:relative;width:96px;height:96px;border-radius:30px;background:var(--gold-soft);display:flex;align-items:center;justify-content:center"><${Icon} n="shield" s=${46} c="#8E6A1C" /></span>
      <h1 style="position:relative;font-size:26px">Candidature envoyée</h1>
      <p class="muted" style="position:relative;max-width:330px;line-height:1.55">Merci ${me.prenoms.split(" ")[0]} ! Un administrateur vérifie votre carte de membre. Vous recevrez une notification dès que votre compte sera validé.</p>
    </div>
    <div class="col" style="padding:0 20px;gap:10px">
      <div class="card row"><${Avatar} p=${me} size=${52} /><span class="grow"><b>${fullName(me)}</b><br /><span class="small muted">${me.profession} · ${me.eglise}</span></span><span class="pill pill-warn">En attente</span></div>
      <div class="feature"><span class="ic" style="background:#FFC93C"><${Bag} s=${24} /></span><span class="grow"><b>En attendant, faites vos achats</b><br /><span class="small muted">Joyau est ouvert à tous.</span></span></div>
    </div>
    <div class="col" style="padding:22px 20px 32px;gap:10px;margin-top:auto">
      <button class="btn btn-block" style="background:#FFC93C;color:#0B1B3F" onClick=${() => { S.guest = true; UI.tab = "joyau"; rerender(); }}>Aller sur Joyau</button>
      <${Busy} on=${busy} cls="btn btn-line btn-block" onClick=${check}><${Icon} n="refresh" s=${18} />Vérifier l'état de ma demande<//>
      <button class="link" style="align-self:center;margin-top:4px" onClick=${signOut}>Se déconnecter</button>
    </div>
  </div>`;
}
