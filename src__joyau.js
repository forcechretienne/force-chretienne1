/* ===== Joyau : la marketplace intégrée ===== */
const HERO = [
  { tag: "NOUVEAU", title: "Achetez aux membres, en un message.", text: "Choisissez, puis commandez directement sur WhatsApp", img: "sac", bg: "#0B1B3F", fg: "#fff", sub: "#C7D4F0", d1: "#1D4ED8", d2: "#3B82F6", tagBg: "#1D4ED8", tagFg: "#fff", goBg: "#fff", goFg: "#0B1B3F", go: "Voir les annonces", act: { cat: "Tout" } },
  { tag: "MODE", title: "Wax, sacs et baskets.", text: "Les créateurs de la communauté", img: "robe", bg: "#D62839", fg: "#fff", sub: "#FFE4E7", d1: "#E8475A", d2: "#FFC93C", tagBg: "#FFC93C", tagFg: "#0B1B3F", goBg: "#0B1B3F", goFg: "#fff", go: "Découvrir", act: { cat: "Mode" } },
  { tag: "BIJOUX & MONTRES", title: "Des cadeaux qui brillent.", text: "Colliers, montres et parures", img: "collier", bg: "#EAF1FF", fg: "#0B1B3F", sub: "#33405C", d1: "#DBE6FF", d2: "#1D4ED8", tagBg: "#1D4ED8", tagFg: "#fff", goBg: "#1D4ED8", goFg: "#fff", go: "Voir", act: { cat: "Bijoux & Montres" } }
];
const ADS1 = [
  { tag: "SAVEURS D'ICI", title: "Le goût du pays, commandé en un message.", text: "Attiéké, bissap, gâteaux maison", img: "attieke", bg: "#D62839", fg: "#fff", sub: "#FFE4E7", d1: "#E8475A", d2: "#FFC93C", tagBg: "#FFC93C", tagFg: "#0B1B3F", goBg: "#FFC93C", goFg: "#0B1B3F", go: "Commander", act: { cat: "Gastronomie" } },
  { tag: "IMMOBILIER", title: "Votre prochain chez-vous est sur Joyau.", text: "Terrains, maisons, magasins, hôtels et résidences", img: "immo", bg: "#0B1B3F", fg: "#fff", sub: "#C7D4F0", d1: "#1D4ED8", d2: "#3B82F6", tagBg: "#1D4ED8", tagFg: "#fff", goBg: "#fff", goFg: "#0B1B3F", go: "Voir les biens", act: { cat: "Immobilier" } },
  { tag: "PRESTATIONS DE SERVICES", title: "Un artisan de confiance, en un message.", text: "Menuisiers, plombiers, ferronniers, faniko…", img: "menuiserie", bg: "#FFC93C", fg: "#0B1B3F", sub: "#4A3A10", d1: "#FFD96B", d2: "#D62839", tagBg: "#D62839", tagFg: "#fff", goBg: "#0B1B3F", goFg: "#fff", go: "Trouver un pro", act: { cat: "Services" } }
];
const ADS2 = [
  { tag: "HIGH-TECH", title: "Le bon smartphone, au juste prix.", text: "Téléphones et accessoires des vendeurs membres", img: "telephone", bg: "#1D4ED8", fg: "#fff", sub: "#DCE7FF", d1: "#2563EB", d2: "#60A5FA", tagBg: "#FFC93C", tagFg: "#0B1B3F", goBg: "#fff", goFg: "#1D4ED8", go: "Voir les offres", act: { cat: "Téléphones" } },
  { tag: "BEAUTÉ", title: "Prenez soin de vous.", text: "Parfums, soins et cosmétiques", img: "parfum", bg: "#D62839", fg: "#fff", sub: "#FFE4E7", d1: "#E8475A", d2: "#FFC93C", tagBg: "#fff", tagFg: "#D62839", goBg: "#0B1B3F", goFg: "#fff", go: "Je découvre", act: { cat: "Beauté" } },
  { tag: "VOTRE PUB ICI", title: "Votre boutique mérite cette place.", text: "Gratuit pour les membres, sans commission", img: "blender", bg: "#FFC93C", fg: "#0B1B3F", sub: "#4A3A10", d1: "#FFD96B", d2: "#1D4ED8", tagBg: "#0B1B3F", tagFg: "#fff", goBg: "#1D4ED8", goFg: "#fff", go: "Ouvrir ma boutique", act: { shop: true } }
];
const PROD_SEL = "*, shops(id,name,city,whatsapp,owner)";
const fetchProducts = () => q(sb.from("products").select(PROD_SEL).eq("status", "online").order("created_at", { ascending: false }).limit(300));

function runAct(a) {
  if (a.shop) openShop();
  else if (a.cat) { UI.jcat = a.cat; rerender(); setTimeout(() => { const el = document.getElementById("j-annonces"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 40); }
}
function openShop() { if (!isMember()) { openSheet("join", { what: "La vente sur Joyau" }); return; } push("shop"); }

function Slider({ slides, sponso }) {
  const [i, setI] = useState(0);
  // Défilement automatique toutes les 3 secondes (le minuteur repart à chaque changement de diapositive)
  useEffect(() => {
    const t = setTimeout(() => setI(x => (x + 1) % slides.length), 3000);
    return () => clearTimeout(t);
  }, [i]);
  const dark = slides[i].fg !== "#fff";
  return html`<div class="slider">
    <div class="track" style=${"transform:translateX(-" + i * 100 + "%)"}>
      ${slides.map((x, k) => html`<div key=${k} class="slide" style=${"background:" + x.bg + ";color:" + x.fg} aria-hidden=${k !== i}>
        <span class="deco1" style=${"background:" + x.d1}></span><span class="deco2" style=${"border:2px solid " + x.d2}></span>
        <div class="txt"><span class="tag" style=${"background:" + x.tagBg + ";color:" + x.tagFg}>${x.tag}</span><h3>${x.title}</h3><span style=${"font-size:13px;line-height:1.4;color:" + x.sub}>${x.text}</span>
          <button class="go" tabindex=${k === i ? 0 : -1} style=${"background:" + x.goBg + ";color:" + x.goFg} onClick=${() => runAct(x.act)}>${x.go} →</button></div>
        <div class="art"><span class="tile" style=${"transform:rotate(" + (k % 2 ? 5 : -6) + "deg)"}><img src=${IMG[x.img]} alt="" /></span></div>
      </div>`)}
    </div>
    ${sponso && html`<span class="sponso">SPONSORISÉ</span>`}
    <div class="dots">${slides.map((x, k) => html`<button key=${k} aria-label=${"Diapositive " + (k + 1)} class=${k === i ? "on" : ""} style=${"background:" + (dark ? (k === i ? "#0B1B3F" : "rgba(11,27,63,.3)") : (k === i ? "#fff" : "rgba(255,255,255,.5)"))} onClick=${() => setI(k)}></button>`)}</div>
  </div>`;
}

function ProductCard({ p }) {
  const fav = getFavs().includes(p.id);
  const shop = p.shops || {};
  return html`<div style="position:relative">
    <button class="pcard" style="width:100%" onClick=${() => push("product", { id: p.id })}>
      <span class="ph"><img class="photo" src=${p.photo_url} alt=${p.name} loading="lazy" /><span class="cat">${p.cat === "Services" ? "Service" : p.cat}</span></span>
      <span class="nm">${p.name}</span><span class="sl">${shop.name || ""}${shop.city ? " · " + shop.city : ""}</span><span class="pr">${fmt(p.price)}</span>
    </button>
    <button class="fav" aria-label=${fav ? "Retirer des favoris" : "Ajouter aux favoris"} aria-pressed=${fav} onClick=${() => toggleFav(p.id)}><${Icon} n="heart" s=${17} c=${fav ? "#D62839" : "#0B1B3F"} fill=${fav ? "#D62839" : "none"} /></button>
  </div>`;
}

function JoyauTop({ hasShop }) {
  const n = getFavs().length;
  return html`<div class="j-top">
    <div class="row">
      ${isMember() && html`<button class="icon-btn" style="background:var(--j-soft)" aria-label="Retour à Force Chrétienne" onClick=${() => go("home")}><${Shield} s=${26} /></button>`}
      <span class="grow"><${JoyauLogo} slogan=${!isMember()} /></span>
      <button class="icon-btn" style="background:var(--j-soft)" aria-label=${"Mes favoris" + (n ? ", " + n : "")} onClick=${() => push("favs")}><${Icon} n="heart" s=${20} c="#0B1B3F" />${n ? html`<span class="badge">${n}</span>` : ""}</button>
      <button class="btn btn-sm" style="background:#D62839;color:#fff;padding:0 12px" onClick=${openShop}><${Icon} n="store" s=${17} />${hasShop ? "Ma boutique" : "Vendre"}</button>
    </div>
    <div class="search"><${Icon} n="search" s=${19} c="#55607A" /><input id="j-q" class="input" style="background:var(--j-soft)" value=${UI.jq || ""} onInput=${e => { UI.jq = e.target.value; rerender(); }} placeholder="Rechercher un produit, un service, un bien…" /></div>
  </div>`;
}

function JoyauTab() {
  const cat = UI.jcat || "Tout";
  const qq = (UI.jq || "").toLowerCase().trim();
  const prods = useData("products", fetchProducts);
  const myShop = useData("my-shop", () => uid() ? q(sb.from("shops").select("*").eq("owner", uid()).maybeSingle()) : Promise.resolve(null));
  const online = prods.data || [];
  const list = online.filter(p => (cat === "Tout" || p.cat === cat) && (!qq || [p.name, p.cat, p.description, p.shops && p.shops.name, p.shops && p.shops.city].join(" ").toLowerCase().includes(qq)));
  const setCat = c => { UI.jcat = c; rerender(); };
  const searching = qq || cat !== "Tout";
  const shopsMap = {};
  online.forEach(p => { if (p.shops) { const s = shopsMap[p.shops.id] || (shopsMap[p.shops.id] = { shop: p.shops, items: [] }); if (s.items.length < 2) s.items.push(p); } });
  const shops = Object.values(shopsMap).slice(0, 10);
  const catIcon = c => c === "Immobilier" ? html`<${Icon} n="building" s=${16} />` : c === "Services" ? html`<${Icon} n="tool" s=${16} />` : "";
  return html`<div class="j-scope" style="padding-bottom:120px">
    <${JoyauTop} hasShop=${!!myShop.data} />
    <div style="padding:12px 16px 0">
      <div class="chips">${CATS.map(c => html`<button key=${c} class=${"chip" + (c === cat ? " on" : "")} onClick=${() => setCat(c)}>${catIcon(c)}${c === "Services" ? "Prestations de services" : c}</button>`)}</div>
      ${!searching && html`
        <${Slider} slides=${HERO} />
        ${!S.session && html`<div class="row" style="margin-top:12px;padding:12px 14px;border-radius:16px;background:#FFF7DD"><${Shield} s=${30} /><span class="grow small" style="line-height:1.45"><b>Vous êtes membre d'une église ?</b> Rejoignez Force Chrétienne pour vendre et réseauter.</span><button class="btn btn-sm" style="background:#0B1B3F;color:#fff" onClick=${() => { S.guest = false; UI.start = "signup"; rerender(); }}>Rejoindre</button></div>`}
        <div class="section-title"><h2>Explorer les univers</h2></div>
        <div class="bento">
          <button style="background:#D62839;color:#fff" onClick=${() => setCat("Gastronomie")}><strong>Gastronomie</strong><span class="s">Plats, jus, pâtisseries</span><img src=${IMG.attieke} alt="" /></button>
          <button style="background:#0B1B3F;color:#fff" onClick=${() => setCat("Immobilier")}><strong>Immobilier</strong><span class="s">Terrains, maisons, hôtels et résidences</span><img src=${IMG.hotel} alt="" /></button>
          <button style="background:#FFC93C;color:#0B1B3F" onClick=${() => setCat("Services")}><strong>Prestations de services</strong><span class="s">Menuiserie, plomberie, faniko…</span><img src=${IMG.outils} alt="" /></button>
          <button style="background:#EAF1FF;color:#0B1B3F" onClick=${() => setCat("Mode")}><strong>Mode</strong><span class="s">Wax, sacs, baskets</span><img src=${IMG.robe} alt="" /></button>
        </div>
        <div style="margin-top:22px"><${Slider} slides=${ADS1} sponso /></div>`}
      <div id="j-annonces" class="section-title" style="scroll-margin-top:130px"><h2>${searching ? (cat !== "Tout" ? (cat === "Services" ? "Prestations de services" : cat) : "Résultats") : "Dernières annonces"}</h2><span class="small" style="color:var(--j-muted)">${list.length} annonce${list.length > 1 ? "s" : ""}</span></div>
      ${searching && html`<button class="link" style="margin:-6px 0 12px" onClick=${() => { UI.jcat = "Tout"; UI.jq = ""; rerender(); }}>← Revenir à l'accueil Joyau</button>`}
      ${prods.loading && !prods.data && html`<${Loading} />`}
      <div class="pgrid">${list.map(p => html`<${ProductCard} key=${p.id} p=${p} />`)}</div>
      ${!prods.loading && !list.length && html`<${Empty} icon="store" title=${online.length ? "Aucune annonce trouvée" : "Les premières boutiques ouvrent bientôt"} text=${online.length ? "Essayez un autre mot ou une autre catégorie." : "Membre de Force Chrétienne ? Ouvrez votre boutique gratuitement et soyez parmi les premiers vendeurs."}>${!online.length && html`<button class="btn btn-j btn-sm" onClick=${openShop}>Ouvrir ma boutique</button>`}<//>`}
      ${!searching && html`
        <div style="margin-top:26px"><${Slider} slides=${ADS2} sponso /></div>
        <div class="section-title"><h2>Acheter en 3 gestes</h2></div>
        <div class="steps">
          <div class="step" style="border-left:4px solid #D62839"><b class="n" style="color:#D62839">01</b><span><b>Trouvez</b><br /><span class="small" style="color:var(--j-muted)">Cherchez ou parcourez les univers, de la mode à la gastronomie.</span></span></div>
          <div class="step" style="border-left:4px solid #FFC93C"><b class="n" style="color:#C99A12">02</b><span><b>Choisissez</b><br /><span class="small" style="color:var(--j-muted)">Couleur, taille, quantité : votre commande est précise.</span></span></div>
          <div class="step" style="border-left:4px solid #1D4ED8"><b class="n" style="color:#1D4ED8">03</b><span><b>Commandez sur WhatsApp</b><br /><span class="small" style="color:var(--j-muted)">Le message part tout prêt chez le vendeur. Paiement et livraison se règlent avec lui.</span></span></div>
        </div>
        ${shops.length > 0 && html`<div class="section-title"><h2>Boutiques</h2></div>
        <div class="hscroll">${shops.map((s, k) => html`<button key=${s.shop.id} class="card col" style="width:210px;flex:none;text-align:left;background:var(--j-soft);border:0;gap:10px" onClick=${() => push("seller", { id: s.shop.id })}>
          <span class="row"><span class="logo-sq" style=${"width:42px;height:42px;background:" + ["#1D4ED8", "#D62839", "#0B1B3F", "#1F3FC4", "#2563EB"][k % 5]}>${initials(s.shop.name)}</span><span class="grow" style="min-width:0"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.shop.name}</b><span class="tiny" style="color:var(--j-muted)">${s.shop.city}</span></span></span>
          <span class="row" style="gap:6px">${s.items.map(it => html`<span key=${it.id} style="flex:1;height:64px;border-radius:12px;background:#fff;overflow:hidden"><img src=${it.photo_url} alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy" /></span>`)}</span>
        </button>`)}</div>`}
        <div style="margin-top:26px;background:#1D4ED8;color:#fff;border-radius:24px;padding:24px 20px;position:relative;overflow:hidden" class="col">
          <span style="position:absolute;right:-60px;top:-90px;width:220px;height:220px;border-radius:999px;border:36px solid #2563EB"></span>
          <h2 style="position:relative;font-size:25px;line-height:1.05">Vous vendez ?<br />Joyau vous amène les clients.</h2>
          <p style="position:relative;color:#DCE7FF;font-size:14px;line-height:1.5">Boutique gratuite pour les membres de Force Chrétienne. Les commandes arrivent sur votre WhatsApp.</p>
          <button class="btn btn-jy" style="position:relative;align-self:flex-start" onClick=${openShop}>${myShop.data ? "Gérer ma boutique" : "Créer ma boutique"}</button>
        </div>`}
    </div>
  </div>`;
}

function Product({ id }) {
  const pr = useData("product:" + id, () => q(sb.from("products").select(PROD_SEL).eq("id", id).maybeSingle()));
  const all = useData("products", fetchProducts);
  const [o, setO] = useState(0); const [s, setS] = useState(0); const [n, setN] = useState(1);
  useEffect(() => { sb.rpc("product_view", { p_id: id }).then(() => {}, () => {}); }, [id]);
  const p = pr.data;
  if (pr.loading && !p) return html`<div class="overlay j-scope"><${OvHead} title="Joyau" /><${Loading} /></div>`;
  if (!p) return html`<div class="overlay j-scope"><${OvHead} title="Joyau" /><${Empty} icon="store" title="Cette annonce n'est plus disponible" /></div>`;
  const shop = p.shops || {};
  const fav = getFavs().includes(p.id);
  const opts = p.opts || [], sizes = p.sizes || [];
  const others = (all.data || []).filter(x => x.shop_id === p.shop_id && x.id !== p.id).slice(0, 4);
  const lines = ["Bonjour " + shop.name + ", je souhaite commander via Joyau :", "", "• Produit : " + p.name];
  if (opts.length) lines.push("• " + (p.opt_label || "Option") + " : " + opts[o]);
  if (sizes.length) lines.push("• " + (p.size_label || "Taille") + " : " + sizes[s]);
  lines.push("• Quantité : " + n, "• Prix unitaire : " + fmt(p.price), "• Total : " + fmt(p.price * n), "", "Merci de me confirmer la disponibilité, le paiement et la livraison.");
  const msg = lines.join("\n");
  return html`<div class="overlay j-scope">
    <${OvHead} title=${shop.name || "Joyau"} right=${html`<button class="icon-btn" style="background:var(--j-soft)" aria-label=${fav ? "Retirer des favoris" : "Ajouter aux favoris"} onClick=${() => toggleFav(p.id)}><${Icon} n="heart" s=${20} c=${fav ? "#D62839" : "#0B1B3F"} fill=${fav ? "#D62839" : "none"} /></button>`} />
    <div style="aspect-ratio:1/1;max-height:420px;width:100%;background:var(--j-soft);overflow:hidden"><img src=${p.photo_url} alt=${p.name} style="width:100%;height:100%;object-fit:cover;display:block" /></div>
    <div class="ov-body col" style="gap:16px">
      ${p.status !== "online" && html`<div class="demo-note" style="background:var(--warn-soft);color:var(--warn)">${p.status === "hidden_admin" ? "Annonce masquée par l'administrateur." : "Annonce masquée : seuls vous la voyez."}</div>`}
      <div class="col" style="gap:6px"><span class="pill pill-j" style="align-self:flex-start">${p.cat === "Services" ? "Prestation de service" : p.cat}</span><h1 style="font-size:23px;line-height:1.15">${p.name}</h1><b style="font-family:var(--f-head);font-size:26px">${fmt(p.price)}</b></div>
      <button class="card row" style="text-align:left;border-color:var(--j-line)" onClick=${() => push("seller", { id: p.shop_id })}><span class="logo-sq" style="background:#1D4ED8">${initials(shop.name)}</span><span class="grow"><b>${shop.name}</b><${Verified} s=${14} /><br /><span class="small" style="color:var(--j-muted)">Membre Force Chrétienne · ${shop.city}</span></span><${Icon} n="arrow" s=${18} /></button>
      ${p.description && html`<p style="line-height:1.6;color:#33405C;white-space:pre-wrap">${p.description}</p>`}
      ${opts.length > 0 && html`<div class="col" style="gap:8px"><b>${p.opt_label || "Option"} : <span style="font-weight:500">${opts[o]}</span></b><div class="row" style="flex-wrap:wrap;gap:8px">${opts.map((x, k) => html`<button key=${x} class=${"opt" + (k === o ? " on" : "")} onClick=${() => setO(k)}>${x}</button>`)}</div></div>`}
      ${sizes.length > 0 && html`<div class="col" style="gap:8px"><b>${p.size_label || "Taille"} : <span style="font-weight:500">${sizes[s]}</span></b><div class="row" style="flex-wrap:wrap;gap:8px">${sizes.map((x, k) => html`<button key=${x} class=${"opt" + (k === s ? " on" : "")} onClick=${() => setS(k)}>${x}</button>`)}</div></div>`}
      <div class="row" style="justify-content:space-between"><div class="qty"><button aria-label="Diminuer la quantité" onClick=${() => setN(Math.max(1, n - 1))}>−</button><span>${n}</span><button aria-label="Augmenter la quantité" onClick=${() => setN(n + 1)}>+</button></div><span style="text-align:right"><span class="small" style="color:var(--j-muted)">Total</span><br /><b style="font-family:var(--f-head);font-size:24px">${fmt(p.price * n)}</b></span></div>
      <button class="btn btn-j btn-block" style="height:58px;font-size:17px" onClick=${() => { sb.rpc("product_click", { p_id: p.id }).then(() => {}, () => {}); openSheet("wa", { msg, num: waNumber(shop.whatsapp), seller: shop.name }); }}><${Icon} n="wa" s=${22} />Commander sur WhatsApp</button>
      <p class="center small" style="color:var(--j-muted);margin-top:-8px">Paiement et livraison à convenir directement avec le vendeur.</p>
      ${others.length > 0 && html`<div><div class="section-title" style="margin-top:8px"><h2 style="font-size:18px">Du même vendeur</h2></div><div class="pgrid">${others.map(x => html`<${ProductCard} key=${x.id} p=${x} />`)}</div></div>`}
    </div>
  </div>`;
}
function WaSheet({ msg, num, seller }) {
  const url = "https://wa.me/" + (num || "") + "?text=" + encodeURIComponent(msg);
  return html`<${Sheet}><div class="col j-scope" style="gap:14px">
    <h2 style="font-size:19px">Votre commande est prête</h2>
    <div class="wa-preview"><div class="h"><span class="av" style="width:36px;height:36px;background:#fff;color:#075E54;font-size:13px">${initials(seller)}</span><b>${seller}</b></div><div class="b"><div class="bubble">${msg}</div></div></div>
    <a class="btn btn-wa btn-block" style="height:54px" href=${url} target="_blank" rel="noopener" onClick=${() => setTimeout(closeSheet, 300)}><${Icon} n="wa" s=${22} />Ouvrir WhatsApp et envoyer</a>
    <button class="btn btn-ghost btn-block" onClick=${closeSheet}>Modifier ma commande</button>
  </div><//>`;
}

function Seller({ id }) {
  const shop = useData("shop:" + id, () => q(sb.from("shops").select("*").eq("id", id).maybeSingle()));
  const prods = useData("shop-products:" + id, () => q(sb.from("products").select(PROD_SEL).eq("shop_id", id).eq("status", "online").order("created_at", { ascending: false })));
  const s = shop.data || {};
  const list = prods.data || [];
  return html`<div class="overlay j-scope"><${OvHead} title=${s.name || "Boutique"} />
    <div style="background:#1D4ED8;color:#fff;padding:22px 16px;position:relative;overflow:hidden" class="row">
      <span style="position:absolute;right:-50px;top:-70px;width:180px;height:180px;border-radius:999px;border:30px solid #2563EB"></span>
      <span class="logo-sq" style="position:relative;width:64px;height:64px;font-size:22px;background:#FFC93C;color:#0B1B3F">${initials(s.name)}</span>
      <span class="grow" style="position:relative"><h1 style="font-size:22px">${s.name || "…"}</h1><span class="small" style="color:#DCE7FF">${s.city || ""} · ${list.length} annonce${list.length > 1 ? "s" : ""}</span></span>
    </div>
    <div class="ov-body">
      ${s.description && html`<p style="line-height:1.6;color:#33405C;margin-bottom:16px">${s.description}</p>`}
      ${s.owner && isMember() && s.owner !== uid() && html`<button class="btn btn-line btn-block" style="margin-bottom:16px" onClick=${() => push("profile", { id: s.owner })}>Voir le profil du vendeur</button>`}
      <div class="pgrid">${list.map(p => html`<${ProductCard} key=${p.id} p=${p} />`)}</div>
      ${!prods.loading && !list.length && html`<${Empty} icon="store" title="Aucune annonce en ligne" />`}
    </div>
  </div>`;
}
function Favs() {
  const ids = getFavs();
  const prods = useData("favs:" + ids.join(","), () => ids.length ? q(sb.from("products").select(PROD_SEL).in("id", ids)) : Promise.resolve([]));
  const list = prods.data || [];
  return html`<div class="overlay j-scope"><${OvHead} title="Mes favoris" /><div class="ov-body"><div class="pgrid">${list.map(p => html`<${ProductCard} key=${p.id} p=${p} />`)}</div>${!prods.loading && !list.length && html`<${Empty} icon="heart" title="Aucun favori pour l'instant" text="Touchez le cœur d'une annonce pour la retrouver ici." />`}</div></div>`;
}

/* ===== Espace vendeur ===== */
function Shop() {
  const shop = useData("my-shop", () => q(sb.from("shops").select("*").eq("owner", uid()).maybeSingle()));
  const mine = useData("my-products", () => q(sb.from("products").select("*").eq("owner", uid()).order("created_at", { ascending: false })));
  if (shop.loading && shop.data === null && !("my-shop" in CACHE)) return html`<div class="overlay j-scope"><${OvHead} title="Ma boutique Joyau" /><${Loading} /></div>`;
  if (!shop.data) return html`<${ShopForm} />`;
  const s = shop.data, list = mine.data || [];
  const views = list.reduce((a, p) => a + (p.views || 0), 0), clicks = list.reduce((a, p) => a + (p.clicks || 0), 0);
  const toggle = async p => { try { await q(sb.from("products").update({ status: p.status === "online" ? "hidden" : "online" }).eq("id", p.id)); refresh(); } catch (e) { fail(e); } };
  return html`<div class="overlay j-scope">
    <${OvHead} title="Ma boutique Joyau" right=${html`<button class="icon-btn" style="background:var(--j-soft)" aria-label="Modifier la boutique" onClick=${() => push("shopEdit")}><${Icon} n="edit" s=${19} /></button>`} />
    <div style="background:#FFC93C;padding:18px 16px" class="row"><span class="logo-sq" style="width:58px;height:58px;background:#1D4ED8;font-size:20px">${initials(s.name)}</span><span class="grow"><h2 style="font-size:21px">${s.name}</h2><span class="small" style="color:#4A3A10">${s.city} · WhatsApp ${s.whatsapp}</span></span></div>
    <div class="ov-body col" style="gap:16px">
      <div class="row" style="gap:8px"><div class="stat"><b>${list.filter(p => p.status === "online").length}</b><span>en ligne</span></div><div class="stat"><b>${views}</b><span>vues</span></div><div class="stat"><b>${clicks}</b><span>commandes WhatsApp</span></div></div>
      <button class="btn btn-j btn-block" onClick=${() => push("productForm", { shop: s })}><${Icon} n="plus" s=${19} w=${2.6} />Ajouter un produit ou un service</button>
      <button class="btn btn-line btn-block" onClick=${() => push("seller", { id: s.id })}><${Icon} n="eye" s=${18} />Voir ma boutique comme un acheteur</button>
      <div class="section-title" style="margin:6px 0 0"><h2 style="font-size:18px">Mes annonces</h2></div>
      ${list.map(p => html`<div key=${p.id} class="card row" style="border-color:var(--j-line);align-items:flex-start">
        <span style="width:68px;height:68px;border-radius:14px;background:var(--j-soft);flex:none;overflow:hidden"><img src=${p.photo_url} alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy" /></span>
        <span class="grow col" style="gap:4px;min-width:0"><b style="font-size:14.5px;line-height:1.3">${p.name}</b><span class="small" style="color:var(--j-muted)">${fmt(p.price)} · ${p.views} vues · ${p.clicks} commandes</span>
          <span class="row" style="gap:8px;margin-top:4px;flex-wrap:wrap"><span class=${"pill " + (p.status === "online" ? "pill-ok" : "pill-grey")}>${p.status === "online" ? "En ligne" : p.status === "hidden_admin" ? "Masqué par l'admin" : "Masqué"}</span>
            ${p.status !== "hidden_admin" && html`<button class="link" style="font-size:13px" onClick=${() => toggle(p)}>${p.status === "online" ? "Masquer" : "Remettre en ligne"}</button>`}
            <button class="link" style="font-size:13px" onClick=${() => push("productForm", { shop: s, edit: p })}>Modifier</button>
            <button class="link" style="font-size:13px;color:#B91C1C" onClick=${() => openSheet("confirm", { title: "Supprimer cette annonce ?", text: "« " + p.name + " » sera retirée de Joyau. Cette action est définitive.", ok: "Supprimer", fn: async () => { await q(sb.from("products").delete().eq("id", p.id)); toast("Annonce supprimée."); } })}>Supprimer</button></span></span>
      </div>`)}
      ${!mine.loading && !list.length && html`<${Empty} icon="store" title="Votre boutique est vide" text="Ajoutez votre premier produit ou service : il sera visible par tous les acheteurs de Joyau." />`}
    </div>
  </div>`;
}
function ShopForm({ edit }) {
  const cur = edit ? CACHE["my-shop"] : null;
  const me = S.me || {};
  const [f, setF] = useState(cur ? { name: cur.name, whatsapp: cur.whatsapp, city: cur.city || "", description: cur.description || "" } : { name: "", whatsapp: me.whatsapp || me.tel || "", city: me.ville || "", description: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const submit = async () => {
    if (!f.name.trim() || f.whatsapp.replace(/\D/g, "").length < 8) { setErr("Donnez un nom à votre boutique et un numéro WhatsApp valide."); return; }
    setBusy(true);
    try {
      const row = { name: f.name.trim(), whatsapp: f.whatsapp.trim(), city: f.city.trim() || "Abidjan", description: f.description.trim() };
      if (cur) await q(sb.from("shops").update(row).eq("id", cur.id)); else await q(sb.from("shops").insert(Object.assign({ owner: uid() }, row)));
      delete CACHE["my-shop"];
      if (cur) back();
      refresh(); toast(cur ? "Boutique mise à jour." : "Votre boutique est ouverte !");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay j-scope"><${OvHead} title=${cur ? "Modifier ma boutique" : "Ouvrir ma boutique"} />
    <div class="ov-body col" style="gap:14px">
      ${!cur && html`<div style="background:#1D4ED8;color:#fff;border-radius:20px;padding:18px" class="col"><b style="font-family:var(--f-head);font-size:20px">Gratuit, sans commission</b><span class="small" style="color:#DCE7FF;line-height:1.5">Vos produits sont vus par tous les acheteurs de Joyau. Les commandes arrivent directement sur votre WhatsApp.</span></div>`}
      <${Field} label="Nom de la boutique" req><input id="sh-name" class="input" value=${f.name} onInput=${set("name")} placeholder="Ex. Les Délices de Rose" /><//>
      <${Field} label="Numéro WhatsApp" req hint="Les acheteurs vous écrivent sur ce numéro. Format : 07 00 00 00 00 ou avec l'indicatif."><input id="sh-wa" class="input" inputmode="tel" value=${f.whatsapp} onInput=${set("whatsapp")} placeholder="07 00 00 00 00" /><//>
      <${Field} label="Ville ou quartier"><input id="sh-city" class="input" value=${f.city} onInput=${set("city")} placeholder="Cocody" /><//>
      <${Field} label="Présentation"><textarea id="sh-desc" class="input" value=${f.description} onInput=${set("description")} placeholder="Ce que vous vendez, vos délais de livraison…"></textarea><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} cls="btn btn-j btn-block" onClick=${submit}>${cur ? "Enregistrer" : "Ouvrir ma boutique"}<//>
    </div></div>`;
}
function ProductForm({ shop, edit }) {
  const e0 = edit || {};
  const [f, setF] = useState({ name: e0.name || "", cat: e0.cat || "Gastronomie", price: e0.price ? String(e0.price) : "", description: e0.description || "", opt_label: e0.opt_label || "Couleur", opts: (e0.opts || []).join(", "), size_label: e0.size_label || "Taille", sizes: (e0.sizes || []).join(", ") });
  const [photo, setPhoto] = useState(null); const [prev, setPrev] = useState(e0.photo_url || "");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const split = s => s.split(",").map(x => x.trim()).filter(Boolean);
  const submit = async () => {
    const price = parseInt(String(f.price).replace(/\D/g, ""), 10);
    if (!f.name.trim() || !(price >= 0) || isNaN(price) || (!photo && !prev)) { setErr("Ajoutez une photo, un nom et un prix."); return; }
    setBusy(true);
    try {
      const photo_url = photo ? publicUrl("products", await uploadFile("products", photo, "produit")) : e0.photo_url;
      const opts = split(f.opts), sizes = split(f.sizes);
      const row = { name: f.name.trim(), cat: f.cat, price, description: f.description.trim(), photo_url, opt_label: opts.length ? (f.opt_label.trim() || "Option") : "", opts, size_label: sizes.length ? (f.size_label.trim() || "Taille") : "", sizes };
      if (edit) await q(sb.from("products").update(row).eq("id", edit.id));
      else await q(sb.from("products").insert(Object.assign({ shop_id: shop.id, owner: uid() }, row)));
      back(); refresh(); toast(edit ? "Annonce mise à jour." : "Produit en ligne sur Joyau.");
    } catch (x) { fail(x); }
    setBusy(false);
  };
  return html`<div class="overlay j-scope"><${OvHead} title=${edit ? "Modifier l'annonce" : "Nouvelle annonce"} />
    <div class="ov-body col" style="gap:14px">
      <${Field} label="Photo" req><${Upload} id="pf-photo" icon="photo" label="Ajouter une photo" sub="Lumière naturelle, fond simple" preview=${prev} max=${1200} onFile=${(b, u) => { setPhoto(b); setPrev(u); }} /><//>
      <${Field} label="Nom du produit ou du service" req><input id="pp-name" class="input" value=${f.name} onInput=${set("name")} placeholder="Ex. Poulet braisé + attiéké" /><//>
      <${Field} label="Catégorie"><select id="pp-cat" class="input" value=${f.cat} onChange=${set("cat")}>${CATS.slice(1).map(c => html`<option key=${c} value=${c}>${c === "Services" ? "Prestations de services" : c}</option>`)}</select><//>
      <${Field} label="Prix (FCFA)" req hint="Pour un service ou un bien, indiquez un prix de départ."><input id="pp-price" class="input" inputmode="numeric" value=${f.price} onInput=${set("price")} placeholder="5000" /><//>
      <${Field} label="Description"><textarea id="pp-desc" class="input" value=${f.description} onInput=${set("description")} placeholder="Composition, état, délai de livraison…"></textarea><//>
      <div class="card col" style="gap:12px;border-color:var(--j-line)">
        <b>Choix proposés à l'acheteur <span class="small" style="color:var(--j-muted);font-weight:500">(facultatif)</span></b>
        <div class="row" style="gap:8px;align-items:flex-start"><input id="pp-optl" class="input" style="width:38%" value=${f.opt_label} onInput=${set("opt_label")} aria-label="Nom du choix 1" /><input id="pp-opts" class="input grow" value=${f.opts} onInput=${set("opts")} placeholder="Rouge, Noir, Blanc" aria-label="Valeurs du choix 1" /></div>
        <div class="row" style="gap:8px;align-items:flex-start"><input id="pp-sizel" class="input" style="width:38%" value=${f.size_label} onInput=${set("size_label")} aria-label="Nom du choix 2" /><input id="pp-sizes" class="input grow" value=${f.sizes} onInput=${set("sizes")} placeholder="S, M, L" aria-label="Valeurs du choix 2" /></div>
        <span class="tiny" style="color:var(--j-muted)">Séparez les valeurs par des virgules. Elles apparaîtront dans le message WhatsApp.</span>
      </div>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} cls="btn btn-j btn-block" onClick=${submit}>${edit ? "Enregistrer" : "Mettre en ligne"}<//>
    </div></div>`;
}
