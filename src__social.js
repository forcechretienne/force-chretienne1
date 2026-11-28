/* ===== Réseau social : fil, réseau, profils, messagerie, notifications ===== */
const fetchUnread = async () => {
  if (!isMember()) return { notifs: 0, msgs: 0 };
  const [n, m] = await Promise.all([
    sb.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", uid()).eq("read", false),
    sb.from("messages").select("id", { count: "exact", head: true }).eq("recipient", uid()).is("read_at", null)
  ]);
  return { notifs: n.count || 0, msgs: m.count || 0 };
};
function useUnread() { return useData("unread", fetchUnread).data || { notifs: 0, msgs: 0 }; }

function TopBar() {
  const u = useUnread();
  return html`<header class="topbar">
    <span class="brand grow"><${Shield} s=${36} /><span class="brand-name">FORCE CHRÉTIENNE<small>RAYONNER ENSEMBLE</small></span></span>
    <button class="icon-btn" aria-label=${"Notifications" + (u.notifs ? ", " + u.notifs + " nouvelles" : "")} onClick=${() => push("notifs")}><${Icon} n="bell" s=${21} />${u.notifs ? html`<span class="badge">${u.notifs}</span>` : ""}</button>
    <button style="border:0;background:none;padding:0" aria-label="Mon profil" onClick=${() => push("profile", { id: uid() })}><${Avatar} p=${S.me} size=${40} /></button>
  </header>`;
}

/* ---------- Fil ---------- */
const POST_SEL = "*, author_p:profiles!posts_author_fkey(" + PROFILE_COLS + "), post_likes(user_id), comments(count)";
function PostCard({ p }) {
  const [open, setOpen] = useState(false);
  const [txt, setTxt] = useState("");
  const [menu, setMenu] = useState(false);
  const comments = useData("comments:" + p.id + (open ? "" : ":closed"), () => open ? q(sb.from("comments").select("*, author_p:profiles!comments_author_fkey(" + PROFILE_COLS + ")").eq("post_id", p.id).order("created_at")) : Promise.resolve([]), [open]);
  const m = p.author_p;
  const liked = (p.post_likes || []).some(l => l.user_id === uid());
  const nLikes = (p.post_likes || []).length;
  const nCom = p.comments && p.comments[0] ? p.comments[0].count : 0;
  const like = async () => { try { if (liked) await q(sb.from("post_likes").delete().eq("post_id", p.id).eq("user_id", uid())); else await q(sb.from("post_likes").insert({ post_id: p.id, user_id: uid() })); refresh(); } catch (e) { fail(e); } };
  const send = async e => { e.preventDefault(); if (!txt.trim()) return; try { await q(sb.from("comments").insert({ post_id: p.id, author: uid(), text: txt.trim() })); setTxt(""); refresh(); } catch (x) { fail(x); } };
  const del = () => openSheet("confirm", { title: "Supprimer cette publication ?", text: "Elle disparaîtra du fil pour tous les membres.", ok: "Supprimer", fn: async () => { await q(sb.from("posts").delete().eq("id", p.id)); toast("Publication supprimée."); } });
  const share = () => { const t = p.text + "\n\n— " + fullName(m) + " sur Force Chrétienne"; if (navigator.share) navigator.share({ text: t }).catch(() => {}); else if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => toast("Texte copié.")); };
  return html`<article class="post">
    <div class="row">
      <button style="border:0;background:none;padding:0" aria-label=${"Profil de " + fullName(m)} onClick=${() => push("profile", { id: p.author })}><${Avatar} p=${m} size=${46} /></button>
      <span class="grow" style="min-width:0"><b style="font-size:15px">${fullName(m)}</b><${Verified} /><br /><span class="tiny muted">${jobLine(m)} · ${ago(p.created_at)}</span></span>
      ${p.kind !== "Publication" && html`<span class="pill pill-gold">${p.kind}</span>`}
      ${(p.author === uid() || isAdmin()) && html`<button class="icon-btn" style="width:34px;height:34px;background:none" aria-label="Supprimer la publication" onClick=${del}><${Icon} n="trash" s=${17} c="#63666F" /></button>`}
    </div>
    <p class="txt">${p.text}</p>
    ${p.image_url && html`<div class="media"><img src=${p.image_url} alt="Photo jointe à la publication" loading="lazy" /></div>`}
    <div class="row tiny muted" style="margin-top:10px;justify-content:space-between"><span>${nLikes} j'aime</span><span>${nCom} commentaire${nCom > 1 ? "s" : ""}</span></div>
    <div class="acts">
      <button class=${liked ? "on" : ""} onClick=${like} aria-pressed=${liked}><${Icon} n="like" s=${19} fill=${liked ? "#F7EED6" : "none"} />J'aime</button>
      <button onClick=${() => setOpen(!open)}><${Icon} n="comment" s=${19} />Commenter</button>
      <button onClick=${share}><${Icon} n="share" s=${19} />Partager</button>
    </div>
    ${open && html`<div class="col" style="gap:10px;margin-top:8px">
      ${comments.loading && html`<span class="small muted">Chargement…</span>`}
      ${(comments.data || []).map(c => html`<div key=${c.id} class="row" style="align-items:flex-start"><${Avatar} p=${c.author_p} size=${32} /><span class="grow" style="background:var(--soft);border-radius:4px 14px 14px 14px;padding:8px 12px"><b class="small">${fullName(c.author_p)}</b> <span class="tiny muted">${ago(c.created_at)}</span><br /><span style="font-size:14px;line-height:1.5">${c.text}</span></span></div>`)}
      <form class="row" onSubmit=${send}><${Avatar} p=${S.me} size=${32} /><input id=${"cm-" + p.id} class="input" style="height:42px;border-radius:999px" value=${txt} onInput=${e => setTxt(e.target.value)} placeholder="Écrire un commentaire…" /><button class="send" style="width:42px;height:42px" aria-label="Envoyer le commentaire"><${Icon} n="send" s=${18} c="#23262D" /></button></form>
    </div>`}
  </article>`;
}

function HomeTab() {
  const posts = useData("posts", () => q(sb.from("posts").select(POST_SEL).order("created_at", { ascending: false }).limit(40)));
  const prods = useData("joyau-strip", () => q(sb.from("products").select("id,name,price,photo_url").eq("status", "online").order("created_at", { ascending: false }).limit(8)));
  const job = useData("home-job", () => q(sb.from("jobs").select("*").eq("status", "online").order("created_at", { ascending: false }).limit(1)));
  const list = posts.data || [];
  const strip = html`${(prods.data || []).length > 0 && html`<section style="padding:16px 16px 18px;border-bottom:8px solid var(--soft);margin:0 -16px" class="j-scope">
      <div class="row" style="justify-content:space-between;margin-bottom:12px"><${JoyauLogo} slogan=${false} /><button class="link" onClick=${() => go("joyau")}>Voir la boutique</button></div>
      <div class="hscroll">${prods.data.map(p => html`<button key=${p.id} class="pcard" style="width:150px;flex:none" onClick=${() => push("product", { id: p.id })}><span class="ph" style="height:104px"><img class="photo" src=${p.photo_url} alt=${p.name} loading="lazy" /></span><span class="nm">${p.name}</span><span class="pr">${fmt(p.price)}</span></button>`)}</div>
    </section>`}`;
  const jobBlock = html`${job.data && job.data[0] && html`<section style="padding:16px;border-bottom:8px solid var(--soft);margin:0 -16px">
      <div class="row" style="justify-content:space-between;margin-bottom:10px"><b class="kind-tag">Offre d'emploi validée</b><button class="link" onClick=${() => { UI.opp = "jobs"; go("opps"); }}>Toutes les offres</button></div>
      <${JobCard} j=${job.data[0]} />
    </section>`}`;
  return html`<div class="page">
    <div style="padding-top:14px">
      <button class="composer" onClick=${() => push("compose")}><${Avatar} p=${S.me} size=${40} /><span class="ph">Partagez une réussite, une offre, un témoignage…</span><${Icon} n="photo" c="#8E6A1C" /></button>
    </div>
    <div class="row" style="margin-top:12px;gap:8px">
      <button class="btn btn-ghost btn-sm grow" onClick=${() => push("compose", { kind: "Témoignage" })}><${Icon} n="star" s=${17} c="#8E6A1C" />Témoignage</button>
      <button class="btn btn-ghost btn-sm grow" onClick=${() => push("jobForm")}><${Icon} n="brief" s=${17} c="#8E6A1C" />Emploi</button>
      <button class="btn btn-ghost btn-sm grow" onClick=${() => push("compose", { kind: "Événement" })}><${Icon} n="calendar" s=${17} c="#8E6A1C" />Événement</button>
    </div>
    ${!UI.pushHidden && html`<div style="margin-top:12px;position:relative"><${PushCard} compact onDone=${() => { UI.pushHidden = true; }} /></div>`}
    ${posts.loading && !list.length && html`<${Loading} />`}
    ${list.slice(0, 2).map(p => html`<${PostCard} key=${p.id} p=${p} />`)}
    ${strip}
    ${list.slice(2, 4).map(p => html`<${PostCard} key=${p.id} p=${p} />`)}
    ${jobBlock}
    ${list.slice(4).map(p => html`<${PostCard} key=${p.id} p=${p} />`)}
    ${!posts.loading && !list.length && html`<${Empty} icon="star" title="Soyez le premier à publier" text="Présentez-vous, partagez un témoignage ou une opportunité : le fil de Force Chrétienne commence avec vous." />`}
    ${list.length > 0 && html`<p class="center tiny muted" style="padding:24px 0">Vous êtes à jour. Que Dieu bénisse votre journée, ${S.me.prenoms.split(" ")[0]} !</p>`}
    <button class="fab" aria-label="Nouvelle publication" onClick=${() => push("compose")}><${Icon} n="plus" s=${26} c="#23262D" w=${2.4} /></button>
  </div>`;
}

function Compose({ kind: k0 }) {
  const [kind, setKind] = useState(k0 || "Publication");
  const [text, setText] = useState("");
  const [img, setImg] = useState(null); const [prev, setPrev] = useState("");
  const [busy, setBusy] = useState(false);
  const publish = async () => {
    if (!text.trim()) return;
    setBusy(true);
    try {
      const image_url = img ? publicUrl("posts", await uploadFile("posts", img, "post")) : "";
      await q(sb.from("posts").insert({ author: uid(), kind, text: text.trim(), image_url }));
      UI.stack = []; UI.tab = "home"; refresh(); toast("Publication en ligne.");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay">
    <${OvHead} title="Nouvelle publication" right=${html`<${Busy} on=${busy} cls="btn btn-gold btn-sm" disabled=${!text.trim()} onClick=${publish}>Publier<//>`} />
    <div class="ov-body col" style="gap:16px">
      <div class="row"><${Avatar} p=${S.me} size=${46} /><span><b>${fullName(S.me)}</b><br /><span class="tiny muted">Visible par tous les membres</span></span></div>
      <div class="chips" style="margin:0;padding:0">${["Publication", "Témoignage", "Événement", "Annonce"].map(x => html`<button key=${x} class=${"chip" + (x === kind ? " on" : "")} onClick=${() => setKind(x)}>${x}</button>`)}</div>
      <textarea id="compose-text" class="input" style="min-height:170px;font-size:16.5px;border:0;padding:4px 0" value=${text} onInput=${e => setText(e.target.value)} placeholder=${kind === "Témoignage" ? "Racontez ce que Dieu a fait dans votre vie professionnelle…" : kind === "Événement" ? "Quoi, où, quand ? Comment s'inscrire ?" : "De quoi voulez-vous parler ?"}></textarea>
      ${prev ? html`<div style="position:relative"><img src=${prev} alt="Aperçu" style="width:100%;border-radius:16px;display:block" /><button class="icon-btn" aria-label="Retirer la photo" style="position:absolute;top:8px;right:8px;background:#fff" onClick=${() => { setImg(null); setPrev(""); }}><${Icon} n="close" /></button></div>`
        : html`<${Upload} id="compose-img" icon="photo" label="Ajouter une photo" sub="Facultatif" max=${1400} onFile=${(b, u) => { setImg(b); setPrev(u); }} />`}
    </div>
  </div>`;
}

/* ---------- Réseau ---------- */
const fetchConns = () => q(sb.from("connections").select("*").or("requester.eq." + uid() + ",addressee.eq." + uid()));
const fetchMembers = () => q(sb.from("profiles").select(PROFILE_COLS + ",secteur").eq("status", "active").eq("account_type", "member").neq("id", uid()).order("created_at", { ascending: false }).limit(1000));
function connState(conns, id) {
  const c = (conns || []).find(x => (x.requester === id && x.addressee === uid()) || (x.addressee === id && x.requester === uid()));
  if (!c) return { st: "none" };
  if (c.status === "accepted") return { st: "conn", c };
  return { st: c.requester === uid() ? "sent" : "invite", c };
}
async function connect(id) { try { await q(sb.from("connections").insert({ requester: uid(), addressee: id })); toast("Demande envoyée."); refresh(); } catch (e) { fail(e); } }
async function acceptConn(c) { try { await q(sb.from("connections").update({ status: "accepted" }).eq("id", c.id)); toast("Nouvelle relation ajoutée."); refresh(); } catch (e) { fail(e); } }
async function removeConn(c) { try { await q(sb.from("connections").delete().eq("id", c.id)); refresh(); } catch (e) { fail(e); } }

function NetworkTab() {
  const [mode, setMode] = useState(UI.net || "mine");
  const [qq, setQ] = useState("");
  const conns = useData("conns", fetchConns);
  const mem = useData("members", fetchMembers);
  const setM = v => { UI.net = v; setMode(v); };
  const members = mem.data || [];
  const byId = id => members.find(m => m.id === id);
  const cs = conns.data || [];
  const invites = cs.filter(c => c.status === "pending" && c.addressee === uid()).map(c => ({ c, m: byId(c.requester) })).filter(x => x.m);
  const rel = cs.filter(c => c.status === "accepted").map(c => byId(c.requester === uid() ? c.addressee : c.requester)).filter(Boolean);
  const ql = qq.toLowerCase();
  const all = members.filter(m => !ql || [fullName(m), m.profession, m.entreprise, m.eglise, m.assemblee, m.ville].join(" ").toLowerCase().includes(ql));
  return html`<div class="page">
    <div style="padding-top:14px"><div class="seg"><button class=${mode === "mine" ? "on" : ""} onClick=${() => setM("mine")}>Mon réseau</button><button class=${mode === "all" ? "on" : ""} onClick=${() => setM("all")}>Tous les membres</button></div></div>
    ${(conns.loading || mem.loading) && !members.length ? html`<${Loading} />` : mode === "mine" ? html`
      ${invites.length > 0 && html`<div class="section-title"><h2>Invitations</h2><span class="pill pill-gold">${invites.length}</span></div>
        ${invites.map(({ c, m }) => html`<div key=${c.id} class="card row" style="margin-bottom:10px;align-items:flex-start">
          <button style="border:0;background:none;padding:0" onClick=${() => push("profile", { id: m.id })}><${Avatar} p=${m} size=${50} /></button>
          <span class="grow col" style="gap:8px"><span><b>${fullName(m)}</b><br /><span class="small muted">${jobLine(m)}</span></span>
            <span class="row" style="gap:8px"><button class="btn btn-ink btn-sm grow" onClick=${() => acceptConn(c)}>Accepter</button><button class="btn btn-ghost btn-sm grow" onClick=${() => removeConn(c)}>Ignorer</button></span></span>
        </div>`)}`}
      <div class="section-title"><h2>Mes relations</h2><span class="small muted">${rel.length}</span></div>
      ${rel.length ? rel.map(m => html`<${MemberRow} key=${m.id} m=${m} conns=${cs} />`) : html`<${Empty} icon="users" title="Pas encore de relations" text="Parcourez les membres et envoyez vos premières demandes de mise en relation." />`}
      <button class="btn btn-line btn-block" style="margin-top:16px" onClick=${() => setM("all")}>Trouver des membres</button>
    ` : html`
      <div class="search" style="margin-top:14px"><${Icon} n="search" s=${19} c="#63666F" /><input id="net-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Nom, métier, église, ville…" /></div>
      <p class="small muted" style="margin:12px 0 4px">${all.length} membre${all.length > 1 ? "s" : ""} vérifié${all.length > 1 ? "s" : ""}</p>
      ${all.map(m => html`<${MemberRow} key=${m.id} m=${m} conns=${cs} action />`)}
      ${!all.length && html`<${Empty} icon="search" title=${members.length ? "Aucun membre trouvé" : "Les premiers membres arrivent"} text=${members.length ? "Essayez un autre mot." : "Les membres apparaîtront ici dès que l'administrateur aura validé leur adhésion."} />`}
    `}
  </div>`;
}
function MemberRow({ m, conns, action }) {
  const { st } = connState(conns, m.id);
  return html`<div class="list-row">
    <button style="border:0;background:none;padding:0" onClick=${() => push("profile", { id: m.id })} aria-label=${"Profil de " + fullName(m)}><${Avatar} p=${m} size=${50} /></button>
    <button class="grow" style="border:0;background:none;padding:0;text-align:left;min-width:0" onClick=${() => push("profile", { id: m.id })}><b>${fullName(m)}</b><${Verified} s=${14} /><br /><span class="small muted">${jobLine(m)}</span><br /><span class="tiny muted">${m.eglise}${m.ville ? " · " + m.ville : ""}</span></button>
    ${action && st === "none" ? html`<button class="btn btn-line btn-sm" onClick=${() => connect(m.id)}>Se connecter</button>`
      : action && st === "sent" ? html`<span class="pill pill-grey">En attente</span>`
      : html`<button class="icon-btn" aria-label=${"Écrire à " + fullName(m)} onClick=${() => openChat(m.id)}><${Icon} n="chat" s=${20} /></button>`}
  </div>`;
}

function Profile({ id }) {
  if (id === uid()) return html`<${MyProfile} />`;
  const pr = useData("profile:" + id, () => q(sb.from("profiles").select("*").eq("id", id).maybeSingle()));
  const conns = useData("conns", fetchConns);
  const posts = useData("posts-of:" + id, () => q(sb.from("posts").select(POST_SEL).eq("author", id).order("created_at", { ascending: false }).limit(20)));
  const servs = useData("services-of:" + id, () => q(sb.from("services").select("*").eq("author", id)));
  const prods = useData("products-of:" + id, () => q(sb.from("products").select("*, shops(name,city,whatsapp)").eq("owner", id).eq("status", "online")));
  const m = pr.data;
  if (pr.loading && !m) return html`<div class="overlay"><${OvHead} title="Profil" /><${Loading} /></div>`;
  if (!m) return html`<div class="overlay"><${OvHead} title="Profil" /><${Empty} title="Ce profil n'est pas disponible" /></div>`;
  const cs = connState(conns.data, id);
  return html`<div class="overlay">
    <${OvHead} title=${fullName(m)} />
    <div class="cover"></div>
    <div style="padding:0 16px;margin-top:-46px;position:relative" class="col">
      <span style="border:4px solid #fff;border-radius:999px;align-self:flex-start"><${Avatar} p=${m} size=${92} /></span>
      <h2 style="font-size:23px">${fullName(m)}<${Verified} s=${18} /></h2>
      <p class="muted">${jobLine(m)}</p>
      ${m.bio && html`<p style="line-height:1.55;font-size:14.5px">${m.bio}</p>`}
      <div class="col small" style="gap:6px;margin-top:2px">
        <span class="row" style="gap:8px"><${Icon} n="church" s=${17} c="#8E6A1C" />${m.eglise}, ${m.assemblee}</span>
        ${m.ville && html`<span class="row" style="gap:8px"><${Icon} n="pin" s=${17} c="#8E6A1C" />${m.ville}</span>`}
        ${cs.st === "conn" && (m.whatsapp || m.tel) && html`<span class="row" style="gap:8px"><${Icon} n="phone" s=${17} c="#8E6A1C" />${m.whatsapp || m.tel}</span>`}
      </div>
      <div class="row" style="margin-top:8px">
        ${cs.st === "conn" ? html`<button class="btn btn-ghost btn-sm grow" onClick=${() => openSheet("confirm", { title: "Retirer cette relation ?", text: fullName(m) + " ne fera plus partie de votre réseau.", ok: "Retirer", fn: async () => { await q(sb.from("connections").delete().eq("id", cs.c.id)); } })}><${Icon} n="check" s=${17} />Relation</button>`
          : cs.st === "sent" ? html`<span class="btn btn-ghost btn-sm grow">Demande envoyée</span>`
          : cs.st === "invite" ? html`<button class="btn btn-ink btn-sm grow" onClick=${() => acceptConn(cs.c)}>Accepter l'invitation</button>`
          : html`<button class="btn btn-ink btn-sm grow" onClick=${() => connect(id)}>Se connecter</button>`}
        <button class="btn btn-gold btn-sm grow" onClick=${() => openChat(id)}><${Icon} n="chat" s=${17} />Message</button>
      </div>
    </div>
    <div class="ov-body" style="padding-top:8px">
      ${(servs.data || []).map(s => html`<div key=${s.id} class="card" style="margin-top:12px"><span class="kind-tag">Service proposé</span><p class="bold" style="margin-top:6px">${s.title}</p><p class="small muted" style="margin-top:4px">${s.price}</p></div>`)}
      ${(prods.data || []).length > 0 && html`<div class="j-scope"><div class="section-title"><h2>Sa boutique Joyau</h2></div><div class="pgrid">${prods.data.map(p => html`<${ProductCard} key=${p.id} p=${p} />`)}</div></div>`}
      <div class="section-title"><h2>Publications</h2></div>
      ${(posts.data || []).length ? posts.data.map(p => html`<${PostCard} key=${p.id} p=${p} />`) : html`<p class="small muted">Aucune publication pour l'instant.</p>`}
    </div>
  </div>`;
}

/* ---------- Messagerie ---------- */
const MSG_SEL = "*, s:profiles!messages_sender_fkey(" + PROFILE_COLS + "), r:profiles!messages_recipient_fkey(" + PROFILE_COLS + ")";
function openChat(id) {
  if (!isMember()) { openSheet("join", { what: "La messagerie" }); return; }
  push("chat", { id });
}
function MessagesTab() {
  const [qq, setQ] = useState("");
  const msgs = useData("inbox", () => q(sb.from("messages").select(MSG_SEL).or("sender.eq." + uid() + ",recipient.eq." + uid()).order("created_at", { ascending: false }).limit(800)));
  const convs = [];
  const seen = {};
  (msgs.data || []).forEach(x => {
    const other = x.sender === uid() ? x.r : x.s; if (!other) return;
    if (!seen[other.id]) { seen[other.id] = { other, last: x, unread: 0 }; convs.push(seen[other.id]); }
    if (x.recipient === uid() && !x.read_at) seen[other.id].unread++;
  });
  const list = convs.filter(c => !qq || fullName(c.other).toLowerCase().includes(qq.toLowerCase()));
  return html`<div class="page">
    <div class="row" style="padding-top:14px">
      <div class="search grow"><${Icon} n="search" s=${19} c="#63666F" /><input id="msg-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Rechercher une conversation" /></div>
      <button class="icon-btn" style="width:50px;height:50px;background:var(--ink)" aria-label="Nouveau message" onClick=${() => openSheet("newMsg")}><${Icon} n="edit" c="#fff" /></button>
    </div>
    <div style="margin-top:6px">
      ${msgs.loading && !msgs.data && html`<${Loading} />`}
      ${list.map(c => html`<button key=${c.other.id} class="list-row" style="width:100%;border-left:0;border-right:0;border-top:0;background:none;text-align:left" onClick=${() => push("chat", { id: c.other.id })}>
        <${Avatar} p=${c.other} size=${52} />
        <span class="grow" style="min-width:0"><span class="row" style="justify-content:space-between"><b>${fullName(c.other)}</b><span class="tiny muted">${ago(c.last.created_at)}</span></span>
          <span class="row" style="justify-content:space-between"><span class="small" style=${"white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" + (c.unread ? "font-weight:700;color:var(--ink)" : "color:var(--muted)")}>${c.last.sender === uid() ? "Vous : " : ""}${c.last.text}</span>${c.unread ? html`<span class="badge" style="position:static;flex:none">${c.unread}</span>` : ""}</span></span>
      </button>`)}
      ${!msgs.loading && !list.length && html`<${Empty} icon="chat" title="Aucune conversation" text="Écrivez à n'importe quel membre de Force Chrétienne."><button class="btn btn-ink btn-sm" onClick=${() => openSheet("newMsg")}>Nouveau message</button><//>`}
    </div>
  </div>`;
}
function Chat({ id }) {
  const other = useData("profile:" + id, () => q(sb.from("profiles").select(PROFILE_COLS).eq("id", id).maybeSingle()));
  const msgs = useData("thread:" + id, () => q(sb.from("messages").select("*").or("and(sender.eq." + uid() + ",recipient.eq." + id + "),and(sender.eq." + id + ",recipient.eq." + uid() + ")").order("created_at").limit(500)));
  const [t, setT] = useState(""); const [busy, setBusy] = useState(false);
  const end = useRef(null);
  useEffect(() => { try { end.current && end.current.scrollIntoView({ block: "end" }); } catch (e) {} }, [msgs.data && msgs.data.length]);
  useEffect(() => {
    if ((msgs.data || []).some(x => x.recipient === uid() && !x.read_at))
      sb.from("messages").update({ read_at: new Date().toISOString() }).eq("recipient", uid()).eq("sender", id).is("read_at", null).then(() => { delete CACHE.unread; delete CACHE.inbox; });
  }, [msgs.data]);
  const m = other.data;
  const send = async e => {
    e.preventDefault(); if (!t.trim() || busy) return;
    setBusy(true);
    try { await q(sb.from("messages").insert({ sender: uid(), recipient: id, text: t.trim() })); setT(""); refresh(); } catch (x) { fail(x); }
    setBusy(false);
  };
  return html`<div class="overlay">
    <div class="ov-head"><button class="icon-btn" onClick=${back} aria-label="Retour"><${Icon} n="back" /></button>
      <button class="row grow" style="border:0;background:none;padding:0;text-align:left;min-width:0" onClick=${() => push("profile", { id })}><${Avatar} p=${m} size=${40} /><span style="min-width:0"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m ? fullName(m) : "…"}</b><span class="tiny muted">${jobLine(m)}</span></span></button></div>
    <div class="thread">
      <span class="pill pill-grey" style="align-self:center">Conversation entre membres vérifiés</span>
      ${(msgs.data || []).map(x => html`<div key=${x.id} class=${"msg " + (x.sender === uid() ? "out" : "in")}>${x.text}<span class="t">${hhmm(x.created_at)}</span></div>`)}
      ${msgs.data && !msgs.data.length && html`<p class="center small muted" style="margin-top:20px">Dites bonjour à ${m ? m.prenoms.split(" ")[0] : "ce membre"} !</p>`}
      <span ref=${end}></span>
    </div>
    <form class="chat-bar" onSubmit=${send}><input id="chat-input" class="input" value=${t} onInput=${e => setT(e.target.value)} placeholder="Votre message…" autocomplete="off" /><button class="send" aria-label="Envoyer" disabled=${busy}><${Icon} n="send" s=${19} c="#23262D" /></button></form>
  </div>`;
}
function NewMsgSheet() {
  const [qq, setQ] = useState("");
  const mem = useData("members", fetchMembers);
  const list = (mem.data || []).filter(m => !qq || fullName(m).toLowerCase().includes(qq.toLowerCase())).slice(0, 60);
  return html`<${Sheet}><h2 style="font-size:19px;margin-bottom:12px">Nouveau message</h2>
    <div class="search"><${Icon} n="search" s=${19} c="#63666F" /><input id="nm-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Chercher un membre" /></div>
    <div style="margin-top:6px">${list.map(m => html`<button key=${m.id} class="list-row" style="width:100%;border-left:0;border-right:0;border-top:0;background:none;text-align:left" onClick=${() => { UI.sheet = null; openChat(m.id); }}><${Avatar} p=${m} size=${42} /><span class="grow"><b>${fullName(m)}</b><br /><span class="small muted">${jobLine(m)}</span></span></button>`)}
    ${!mem.loading && !list.length && html`<p class="small muted center" style="padding:20px">Aucun membre trouvé.</p>`}</div>
  <//>`;
}

/* ---------- Notifications ---------- */
function Notifs() {
  const n = useData("notifs", () => q(sb.from("notifications").select("*").eq("user_id", uid()).order("created_at", { ascending: false }).limit(80)));
  useEffect(() => () => { sb.from("notifications").update({ read: true }).eq("user_id", uid()).eq("read", false).then(() => { delete CACHE.unread; refresh(); }); }, []);
  const ic = { admin: "shield", person: "users", joyau: "store", comment: "comment", job: "brief", like: "like" };
  const open = x => { const l = x.link || ""; if (l.startsWith("profile:")) push("profile", { id: l.slice(8) }); else if (l === "network") go("network"); else if (l === "opps") { UI.opp = "jobs"; go("opps"); } else if (l === "home") go("home"); else if (l === "admin" && isAdmin()) { UI.stack = []; push("admin"); } else if (l === "shop") { UI.stack = []; push("shop"); } };
  return html`<div class="overlay">
    <${OvHead} title="Notifications" right=${html`<button class="link" onClick=${async () => { await sb.from("notifications").update({ read: true }).eq("user_id", uid()); delete CACHE.unread; refresh(); }}>Tout lu</button>`} />
    <div class="ov-body" style="padding-top:4px">
      ${n.loading && !n.data && html`<${Loading} />`}
      ${(n.data || []).map(x => html`<button key=${x.id} class="list-row" style=${"width:100%;border-left:0;border-right:0;border-top:0;text-align:left;" + (x.read ? "background:none" : "background:#FFFBF0;margin:0 -16px;padding-left:16px;padding-right:16px;width:calc(100% + 32px)")} onClick=${() => open(x)}>
        <span class="icon-btn" style=${"flex:none;" + (x.kind === "admin" ? "background:var(--gold-soft)" : "")}><${Icon} n=${ic[x.kind] || "bell"} s=${20} c="#8E6A1C" /></span>
        <span class="grow"><span style="font-size:14.5px;line-height:1.45">${x.text}</span><br /><span class="tiny muted">${ago(x.created_at)}</span></span>
        ${!x.read && html`<span style="width:9px;height:9px;border-radius:9px;background:#C9A24A;flex:none" aria-label="Non lue"></span>`}
      </button>`)}
      ${!n.loading && !(n.data || []).length && html`<${Empty} icon="bell" title="Aucune notification" text="Vous serez prévenu ici des invitations, commentaires et validations." />`}
    </div>
  </div>`;
}
