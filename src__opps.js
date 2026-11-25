/* ===== Opportunités : emplois, candidatures, services, affaires ===== */
const CO_COLORS = ["#23262D", "#8E6A1C", "#3A3D45", "#5B4612", "#63666F"];
function coColor(s) { let n = 0; for (const c of String(s)) n += c.charCodeAt(0); return CO_COLORS[n % CO_COLORS.length]; }
const fetchMyApps = () => q(sb.from("applications").select("job_id").eq("applicant", uid()));

function JobCard({ j }) {
  const apps = useData("my-apps", fetchMyApps);
  const applied = (apps.data || []).some(a => a.job_id === j.id);
  return html`<button class="card job" style="width:100%;text-align:left" onClick=${() => openSheet("job", { j })}>
    <span class="row" style="align-items:flex-start"><span class="logo-sq" style=${"background:" + coColor(j.company)}>${initials(j.company)}</span>
      <span class="grow"><b style="font-size:15.5px;line-height:1.3">${j.title}</b><br /><span class="small muted">${j.company} · ${j.place}</span></span></span>
    <span class="row" style="gap:6px;flex-wrap:wrap"><span class="pill pill-gold">${j.contract}</span><span class="pill pill-grey">${j.salary}</span>
      ${j.status === "pending" ? html`<span class="pill pill-warn">En attente de validation</span>` : j.status === "refused" ? html`<span class="pill pill-grey">Non validée</span>` : applied ? html`<span class="pill pill-ok"><${Icon} n="check" s=${13} w=${3} />Candidature envoyée</span>` : html`<span class="tiny muted" style="margin-left:auto">${ago(j.created_at)}</span>`}</span>
  </button>`;
}

function OppsTab() {
  const [seg, setSeg] = useState(UI.opp || "jobs");
  const set = v => { UI.opp = v; setSeg(v); };
  return html`<div class="page">
    <div style="padding-top:14px"><div class="seg"><button class=${seg === "jobs" ? "on" : ""} onClick=${() => set("jobs")}>Emplois</button><button class=${seg === "services" ? "on" : ""} onClick=${() => set("services")}>Services</button><button class=${seg === "deals" ? "on" : ""} onClick=${() => set("deals")}>Affaires</button></div></div>
    ${seg === "jobs" ? html`<${Jobs} />` : seg === "services" ? html`<${Services} />` : html`<${Deals} />`}
  </div>`;
}

function Jobs() {
  const [c, setC] = useState("Tous");
  const jobs = useData("jobs", () => q(sb.from("jobs").select("*").or("status.eq.online,author.eq." + uid()).order("created_at", { ascending: false }).limit(200)));
  const all = jobs.data || [];
  const mine = all.filter(j => j.author === uid());
  const list = all.filter(j => j.status === "online" && j.author !== uid() && (c === "Tous" || j.contract === c));
  return html`<div>
    <div class="row" style="justify-content:space-between;margin:18px 0 10px"><span><h2 style="font-size:20px">Offres d'emploi</h2><span class="tiny muted">Toutes validées par l'administrateur</span></span><button class="btn btn-gold btn-sm" onClick=${() => push("jobForm")}><${Icon} n="plus" s=${17} w=${2.6} />Publier</button></div>
    <div class="chips">${["Tous", "CDI", "CDD", "Stage", "Freelance"].map(x => html`<button key=${x} class=${"chip" + (x === c ? " on" : "")} onClick=${() => setC(x)}>${x}</button>`)}</div>
    ${jobs.loading && !jobs.data && html`<${Loading} />`}
    ${mine.length > 0 && html`<p class="kind-tag" style="margin:14px 0 8px">Mes offres</p><div class="col">${mine.map(j => html`<${JobCard} key=${j.id} j=${j} />`)}</div><p class="kind-tag" style="margin:18px 0 8px">Offres des membres</p>`}
    <div class="col" style="margin-top:8px">${list.map(j => html`<${JobCard} key=${j.id} j=${j} />`)}</div>
    ${!jobs.loading && !list.length && html`<${Empty} icon="brief" title="Aucune offre pour l'instant" text="Recrutez parmi des professionnels de confiance : publiez la première offre." />`}
  </div>`;
}

function JobSheet({ j }) {
  const apps = useData("my-apps", fetchMyApps);
  const received = useData("apps-of:" + j.id, () => j.author === uid() ? q(sb.from("applications").select("*, a:profiles!applications_applicant_fkey(" + PROFILE_COLS + ")").eq("job_id", j.id).order("created_at", { ascending: false })) : Promise.resolve([]));
  const poster = useData("profile:" + j.author, () => q(sb.from("profiles").select(PROFILE_COLS).eq("id", j.author).maybeSingle()));
  const [apply, setApply] = useState(false);
  const [msg, setMsg] = useState(""); const [cv, setCv] = useState(null); const [cvPrev, setCvPrev] = useState("");
  const [busy, setBusy] = useState(false);
  const applied = (apps.data || []).some(a => a.job_id === j.id);
  const send = async () => {
    setBusy(true);
    try {
      const cv_path = cv ? await uploadFile("cvs", cv, "cv") : "";
      await q(sb.from("applications").insert({ job_id: j.id, applicant: uid(), message: msg.trim(), cv_path }));
      UI.sheet = null; refresh(); toast("Candidature envoyée à " + j.company + ".");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  const openCv = async path => { try { window.open(await signedUrl("cvs", path), "_blank", "noopener"); } catch (e) { fail(e); } };
  return html`<${Sheet}>
    ${!apply ? html`<div class="col" style="gap:12px">
      <span class="row"><span class="logo-sq" style=${"width:54px;height:54px;background:" + coColor(j.company)}>${initials(j.company)}</span><span class="grow"><h2 style="font-size:19px;line-height:1.25">${j.title}</h2><span class="small muted">${j.company}</span></span></span>
      <div class="row" style="gap:6px;flex-wrap:wrap"><span class="pill pill-gold">${j.contract}</span><span class="pill pill-grey"><${Icon} n="pin" s=${13} />${j.place}</span><span class="pill pill-grey">${j.salary}</span></div>
      <p style="line-height:1.6;white-space:pre-wrap">${j.description}</p>
      ${poster.data && j.author !== uid() && html`<div class="row small muted"><${Avatar} p=${poster.data} size=${30} />Publiée par ${fullName(poster.data)} · ${ago(j.created_at)}</div>`}
      ${j.author === uid() ? html`
        <div class="demo-note">${j.status === "pending" ? "Votre offre est en attente : l'administrateur la vérifie avant publication." : j.status === "refused" ? "Cette offre n'a pas été validée par l'administrateur." : "Votre offre est en ligne."}</div>
        <b style="margin-top:4px">Candidatures reçues (${(received.data || []).length})</b>
        ${(received.data || []).map(a => html`<div key=${a.id} class="card col" style="gap:8px"><span class="row"><${Avatar} p=${a.a} size=${38} /><span class="grow"><b>${fullName(a.a)}</b><br /><span class="tiny muted">${jobLine(a.a)} · ${ago(a.created_at)}</span></span></span>${a.message && html`<p class="small" style="line-height:1.5;white-space:pre-wrap">${a.message}</p>`}
          <span class="row" style="gap:8px">${a.cv_path && html`<button class="btn btn-line btn-sm grow" onClick=${() => openCv(a.cv_path)}><${Icon} n="file" s=${16} />Voir le CV</button>`}<button class="btn btn-ink btn-sm grow" onClick=${() => { UI.sheet = null; openChat(a.applicant); }}>Écrire</button></span></div>`)}
        <button class="btn btn-danger btn-block" onClick=${() => openSheet("confirm", { title: "Supprimer cette offre ?", text: "L'offre et ses candidatures seront supprimées.", ok: "Supprimer", fn: async () => { await q(sb.from("jobs").delete().eq("id", j.id)); toast("Offre supprimée."); } })}>Supprimer l'offre</button>`
        : applied ? html`<button class="btn btn-ghost btn-block" disabled><${Icon} n="check" s=${18} />Candidature déjà envoyée</button>`
        : html`<button class="btn btn-gold btn-block" onClick=${() => setApply(true)}>Postuler</button>`}
    </div>` : html`<div class="col" style="gap:14px">
      <h2 style="font-size:19px">Postuler · ${j.company}</h2>
      <div class="row card"><${Avatar} p=${S.me} size=${42} /><span class="grow"><b>${fullName(S.me)}</b><br /><span class="small muted">Votre profil sera joint à la candidature</span></span></div>
      <${Field} label="Message de motivation"><textarea id="apply-msg" class="input" value=${msg} onInput=${e => setMsg(e.target.value)} placeholder="Présentez-vous en quelques lignes…"></textarea><//>
      <${Field} label="CV (photo ou capture)"><${Upload} id="apply-cv" icon="file" label="Joindre mon CV" sub="Facultatif · format image" preview=${cvPrev} max=${1800} onFile=${(b, u) => { setCv(b); setCvPrev(u); }} /><//>
      <${Busy} on=${busy} onClick=${send}>Envoyer ma candidature<//>
    </div>`}
  <//>`;
}

function JobForm() {
  const [f, setF] = useState({ title: "", company: (S.me && S.me.entreprise) || "", place: "", contract: "CDI", salary: "", description: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const submit = async () => {
    if (!f.title.trim() || !f.company.trim() || !f.place.trim() || !f.description.trim()) { setErr("Renseignez le poste, l'entreprise, le lieu et la description."); return; }
    setBusy(true);
    try {
      await q(sb.from("jobs").insert({ author: uid(), title: f.title.trim(), company: f.company.trim(), place: f.place.trim(), contract: f.contract, salary: f.salary.trim() || "Selon profil", description: f.description.trim() }));
      UI.stack = []; UI.opp = "jobs"; UI.tab = "opps"; refresh(); toast(isAdmin() ? "Offre publiée." : "Offre envoyée. Elle sera publiée après validation.");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay">
    <${OvHead} title="Publier une offre d'emploi" />
    <div class="ov-body col" style="gap:14px">
      <div class="demo-note" style="background:var(--gold-soft);color:#5B4612"><b>Validation obligatoire.</b> Chaque offre est vérifiée par l'administrateur avant d'être visible.</div>
      <${Field} label="Intitulé du poste" req><input id="jf-title" class="input" value=${f.title} onInput=${set("title")} placeholder="Assistant(e) commercial(e)" /><//>
      <${Field} label="Entreprise" req><input id="jf-company" class="input" value=${f.company} onInput=${set("company")} /><//>
      <${Field} label="Lieu" req><input id="jf-place" class="input" value=${f.place} onInput=${set("place")} placeholder="Abidjan, Cocody" /><//>
      <${Field} label="Type de contrat"><div class="chips" style="margin:0;padding:0;flex-wrap:wrap">${["CDI", "CDD", "Stage", "Freelance"].map(x => html`<button key=${x} class=${"chip" + (f.contract === x ? " on" : "")} onClick=${() => setF(Object.assign({}, f, { contract: x }))}>${x}</button>`)}</div><//>
      <${Field} label="Salaire"><input id="jf-salary" class="input" value=${f.salary} onInput=${set("salary")} placeholder="Selon profil" /><//>
      <${Field} label="Description du poste" req><textarea id="jf-desc" class="input" value=${f.description} onInput=${set("description")} placeholder="Missions, profil recherché, comment postuler…"></textarea><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} onClick=${submit}>Envoyer pour validation<//>
    </div>
  </div>`;
}

const SERV_SEL = "*, a:profiles!services_author_fkey(" + PROFILE_COLS + ")";
function Services() {
  const [qq, setQ] = useState("");
  const s = useData("services", () => q(sb.from("services").select(SERV_SEL).order("created_at", { ascending: false }).limit(200)));
  const list = (s.data || []).filter(x => !qq || [x.title, x.cat, fullName(x.a), x.description].join(" ").toLowerCase().includes(qq.toLowerCase()));
  return html`<div>
    <div class="row" style="justify-content:space-between;margin:18px 0 10px"><span><h2 style="font-size:20px">Services entre membres</h2><span class="tiny muted">Des compétences de confiance</span></span><button class="btn btn-gold btn-sm" onClick=${() => push("servForm")}><${Icon} n="plus" s=${17} w=${2.6} />Proposer</button></div>
    <div class="search"><${Icon} n="search" s=${19} c="#63666F" /><input id="serv-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Comptable, avocat, architecte…" /></div>
    ${s.loading && !s.data && html`<${Loading} />`}
    <div class="col" style="margin-top:12px">
      ${list.map(x => html`<div key=${x.id} class="card col" style="gap:10px">
        <span class="row"><${Avatar} p=${x.a} size=${42} /><span class="grow" style="min-width:0"><b>${fullName(x.a)}</b><${Verified} s=${14} /><br /><span class="tiny muted">${jobLine(x.a)}</span></span><span class="pill pill-gold">${x.cat}</span></span>
        <b style="font-size:15.5px;line-height:1.35">${x.title}</b>
        <p class="small muted" style="line-height:1.55;white-space:pre-wrap">${x.description}</p>
        <span class="row small" style="justify-content:space-between"><span class="row" style="gap:5px"><${Icon} n="pin" s=${15} c="#8E6A1C" />${x.zone}</span><b>${x.price}</b></span>
        ${x.author !== uid() ? html`<button class="btn btn-ink btn-sm btn-block" onClick=${() => openChat(x.author)}><${Icon} n="chat" s=${17} />Contacter</button>`
          : html`<button class="btn btn-danger btn-sm" onClick=${() => openSheet("confirm", { title: "Retirer ce service ?", text: "Il ne sera plus visible par les membres.", ok: "Retirer", fn: async () => { await q(sb.from("services").delete().eq("id", x.id)); } })}>Retirer mon service</button>`}
      </div>`)}
    </div>
    ${!s.loading && !list.length && html`<${Empty} icon="tool" title="Aucun service pour l'instant" text="Comptable, avocat, architecte, développeur… proposez vos compétences aux membres." />`}
  </div>`;
}

const DEAL_IMG = { Immobilier: "immo", "Véhicule": "voiture", "Matériel": "ordinateur", Partenariat: "outils" };
function Deals() {
  const [c, setC] = useState("Tout");
  const d = useData("deals", () => q(sb.from("deals").select("*, a:profiles!deals_author_fkey(" + PROFILE_COLS + ")").order("created_at", { ascending: false }).limit(200)));
  const list = (d.data || []).filter(x => c === "Tout" || x.cat === c);
  return html`<div>
    <div class="row" style="justify-content:space-between;margin:18px 0 10px"><span><h2 style="font-size:20px">Affaires</h2><span class="tiny muted">Biens, véhicules, matériel, partenariats</span></span><button class="btn btn-gold btn-sm" onClick=${() => push("dealForm")}><${Icon} n="plus" s=${17} w=${2.6} />Publier</button></div>
    <div class="chips">${["Tout", "Immobilier", "Véhicule", "Matériel", "Partenariat"].map(x => html`<button key=${x} class=${"chip" + (x === c ? " on" : "")} onClick=${() => setC(x)}>${x}</button>`)}</div>
    ${d.loading && !d.data && html`<${Loading} />`}
    <div class="pgrid" style="margin-top:10px">
      ${list.map(x => html`<div key=${x.id} class="card col" style="padding:8px;gap:8px">
        <span class="deal-img" style=${x.photo_url ? "padding:0" : ""}>${x.photo_url ? html`<img src=${x.photo_url} alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy" />` : html`<img src=${IMG[DEAL_IMG[x.cat]] || IMG.immo} alt="" />`}</span>
        <span class="pill pill-grey" style="align-self:flex-start">${x.cat}</span>
        <b style="font-size:13.5px;line-height:1.3;padding:0 2px">${x.title}</b>
        <span class="tiny muted" style="padding:0 2px">${x.place} · ${fullName(x.a)}</span>
        <b style="font-family:var(--f-head);padding:0 2px">${x.price}</b>
        ${x.author !== uid() ? html`<button class="btn btn-ghost btn-sm" onClick=${() => openChat(x.author)}>Contacter</button>`
          : html`<button class="btn btn-danger btn-sm" onClick=${() => openSheet("confirm", { title: "Retirer cette annonce ?", text: "Elle ne sera plus visible.", ok: "Retirer", fn: async () => { await q(sb.from("deals").delete().eq("id", x.id)); } })}>Retirer</button>`}
      </div>`)}
    </div>
    ${!d.loading && !list.length && html`<${Empty} icon="brief" title="Aucune affaire dans cette catégorie" text="Terrain, véhicule, matériel ou partenariat : publiez la première annonce." />`}
  </div>`;
}

function ServForm() {
  const [f, setF] = useState({ cat: "", title: "", description: "", zone: "", price: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const submit = async () => {
    if (!f.title.trim() || !f.cat.trim() || !f.description.trim()) { setErr("Renseignez le domaine, le titre et la description."); return; }
    setBusy(true);
    try { await q(sb.from("services").insert({ author: uid(), cat: f.cat.trim(), title: f.title.trim(), description: f.description.trim(), zone: f.zone.trim() || "À préciser", price: f.price.trim() || "Sur devis" })); UI.stack = []; UI.opp = "services"; UI.tab = "opps"; refresh(); toast("Votre service est en ligne."); }
    catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay"><${OvHead} title="Proposer un service" />
    <div class="ov-body col" style="gap:14px">
      <${Field} label="Domaine" req><input id="sf-cat" class="input" value=${f.cat} onInput=${set("cat")} placeholder="Comptabilité, Juridique, BTP…" /><//>
      <${Field} label="Titre du service" req><input id="sf-title" class="input" value=${f.title} onInput=${set("title")} /><//>
      <${Field} label="Description" req><textarea id="sf-desc" class="input" value=${f.description} onInput=${set("description")}></textarea><//>
      <${Field} label="Zone d'intervention"><input id="sf-zone" class="input" value=${f.zone} onInput=${set("zone")} placeholder="Abidjan et à distance" /><//>
      <${Field} label="Tarif"><input id="sf-price" class="input" value=${f.price} onInput=${set("price")} placeholder="Sur devis" /><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} onClick=${submit}>Publier mon service<//>
    </div></div>`;
}
function DealForm() {
  const [f, setF] = useState({ cat: "Immobilier", title: "", price: "", place: "" });
  const [photo, setPhoto] = useState(null); const [prev, setPrev] = useState("");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const submit = async () => {
    if (!f.title.trim() || !f.place.trim()) { setErr("Renseignez le titre et le lieu."); return; }
    setBusy(true);
    try {
      const photo_url = photo ? publicUrl("deals", await uploadFile("deals", photo, "affaire")) : "";
      await q(sb.from("deals").insert({ author: uid(), cat: f.cat, title: f.title.trim(), price: f.price.trim() || "Prix à débattre", place: f.place.trim(), photo_url }));
      UI.stack = []; UI.opp = "deals"; UI.tab = "opps"; refresh(); toast("Votre annonce est en ligne.");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay"><${OvHead} title="Publier une affaire" />
    <div class="ov-body col" style="gap:14px">
      <${Field} label="Catégorie"><div class="chips" style="margin:0;padding:0;flex-wrap:wrap">${["Immobilier", "Véhicule", "Matériel", "Partenariat"].map(x => html`<button key=${x} class=${"chip" + (f.cat === x ? " on" : "")} onClick=${() => setF(Object.assign({}, f, { cat: x }))}>${x}</button>`)}</div><//>
      <${Field} label="Titre" req><input id="df-title" class="input" value=${f.title} onInput=${set("title")} placeholder="Terrain 600 m² avec ACD" /><//>
      <${Field} label="Prix"><input id="df-price" class="input" value=${f.price} onInput=${set("price")} placeholder="Prix à débattre" /><//>
      <${Field} label="Lieu" req><input id="df-place" class="input" value=${f.place} onInput=${set("place")} placeholder="Bingerville" /><//>
      <${Field} label="Photo"><${Upload} id="df-photo" icon="photo" label="Ajouter une photo" sub="Facultatif" preview=${prev} onFile=${(b, u) => { setPhoto(b); setPrev(u); }} /><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} onClick=${submit}>Publier l'annonce<//>
    </div></div>`;
}
