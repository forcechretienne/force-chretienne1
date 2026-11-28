// Faux client Supabase pour tester l'interface hors ligne
(function () {
  const ME = "u-me";
  const P = (id, prenoms, nom, profession, extra) => Object.assign({ id, prenoms, nom, profession, entreprise: "Groupe Horizon", photo_url: "", eglise: "Église Bethel", assemblee: "Cocody", ville: "Abidjan", status: "active", role: "member", mail: id + "@x.ci", whatsapp: "0707070707", created_at: new Date().toISOString(), naissance: "1988-04-12", bio: "" }, extra || {});
  const mode = (window.MOCK_MODE || "member");
  const me = (mode === "none" || mode === "noprofile") ? null : P(ME, "Michael", "ZEBA", "Fondateur", { role: mode === "admin" || mode === "member" ? "admin" : "member", status: mode === "pending" ? "pending" : "active", account_type: mode === "seller" ? "seller" : "member" });
  const people = [P("u1", "Aya Grâce", "N'GUESSAN", "Avocate"), P("u2", "Daniel", "KOUASSI", "Directeur financier")];
  const shop = { id: "s1", name: "Awa Bijoux", city: "Cocody", whatsapp: "0707070707", owner: "u1", description: "Bijoux faits main", status: "active", verified: true };
  const shop2 = { id: "s2", name: "Chez Ma Rose", city: "Yopougon", whatsapp: "0505050505", owner: mode === "seller" ? "u-me" : "u2", description: "Pâtisseries", status: "pending", verified: false };
  const img = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#FFC93C"/><circle cx="5" cy="5" r="3" fill="#D62839"/></svg>');
  const now = new Date().toISOString();
  const T = {
    profiles: (me ? [me] : []).concat(people, [P("u3", "Félicité", "BROU", "Infirmière", { status: "pending", carte_path: "u3/r.jpg", carte_verso_path: "u3/v.jpg" }), P("u4", "Ange", "KOFFI", "Comptable", { status: "pending", carte_path: "u4/carte.pdf" })]),
    posts: [{ id: "po1", author: "u1", kind: "Témoignage", text: "Merci à tous pour vos recommandations !", image_url: "", created_at: now, author_p: people[0], post_likes: [{ user_id: ME }], comments: [{ count: 1 }] }],
    comments: [{ id: "c1", post_id: "po1", author: "u2", text: "Bravo !", created_at: now, author_p: people[1] }],
    products: [{ id: "p1", shop_id: "s1", owner: "u1", name: "Collier émeraude", cat: "Bijoux & Montres", price: 12500, description: "Plaqué or", photo_url: img, opt_label: "Couleur", opts: ["Or", "Argent"], size_label: "", sizes: [], status: "online", views: 3, clicks: 1, created_at: now, shops: shop }],
    shops: [shop, shop2],
    reports: [{ id: "r1", product_id: "p1", shop_id: "s1", reason: "Arnaque ou fraude : prix trop bas", status: "open", created_at: now, products: { name: "Collier émeraude" }, shops: { name: "Awa Bijoux" } }],
    jobs: [{ id: "j1", author: "u2", title: "Comptable confirmé(e)", company: "RK Conseil", place: "Marcory", contract: "CDI", salary: "500 000 F", description: "Tenue de la comptabilité.", status: "online", created_at: now, a: people[1] }],
    applications: [], services: [{ id: "sv1", author: "u1", cat: "Juridique", title: "Contrats commerciaux", description: "Statuts, pactes", zone: "Abidjan", price: "Sur devis", created_at: now, a: people[0] }],
    deals: [{ id: "d1", author: "u2", cat: "Véhicule", title: "Toyota Corolla 2018", price: "7 500 000 F", place: "Cocody", photo_url: "", created_at: now, a: people[1] }],
    connections: [{ id: "cn1", requester: "u1", addressee: ME, status: "accepted" }, { id: "cn2", requester: "u2", addressee: ME, status: "pending" }],
    messages: [{ id: "m1", sender: "u1", recipient: ME, text: "Bonjour frère !", created_at: now, read_at: null, s: people[0], r: me }],
    notifications: [{ id: "n1", user_id: ME, kind: "admin", text: "Bienvenue !", read: false, created_at: now, link: "" }],
    post_likes: []
  };
  window.MOCK_LOG = [];
  function builder(table) {
    const st = { table, filters: [], single: false, op: "select", payload: null, head: false };
    const b = new Proxy({}, {
      get(_, k) {
        if (k === "then") return (res, rej) => run().then(res, rej);
        if (k === "maybeSingle" || k === "single") return () => { st.single = true; return b; };
        if (k === "select") return (cols, opts) => { if (opts && opts.head) st.head = true; return b; };
        if (["insert", "update", "delete", "upsert"].includes(k)) return p => { st.op = k; st.payload = p; window.MOCK_LOG.push([k, table, p]); return b; };
        if (k === "eq") return (c, v) => { st.filters.push([c, v]); return b; };
        return () => b;
      }
    });
    async function run() {
      await new Promise(r => setTimeout(r, 20));
      if (st.op !== "select") {
        if (st.op === "insert" && table === "profiles" && me === null) { /* noop */ }
        if (st.op === "insert") { const rows = [].concat(st.payload).map(r => Object.assign({ id: "new" + Math.random(), created_at: new Date().toISOString() }, table === "profiles" ? { status: r.account_type === "seller" ? "active" : "pending", role: "member" } : {}, r)); T[table] = (T[table] || []).concat(rows); }
        return { data: null, error: null };
      }
      let rows = T[table] || [];
      st.filters.forEach(([c, v]) => { rows = rows.filter(r => !(c in r) || r[c] === v); });
      if (st.head) return { data: null, count: rows.length, error: null };
      return { data: st.single ? (rows[0] || null) : rows, error: null };
    }
    return b;
  }
  const listeners = [];
  const session = (me || mode === "noprofile") ? { user: { id: ME, email: "direction@zematechnologies.com" } } : null;
  window.supabase = { createClient: () => ({
    from: builder,
    rpc: async (fn) => ({ data: fn === "admin_stats" ? { members: 3, pending: 1, jobs_pending: 0, products: 1, shops: 1, shops_pending: 1, sellers: 2, reports: 1 } : null, error: null }),
    auth: {
      getSession: async () => ({ data: { session } }),
      onAuthStateChange: cb => { listeners.push(cb); return { data: { subscription: { unsubscribe() {} } } }; },
      signInWithPassword: async () => ({ data: {}, error: { message: "Invalid login credentials" } }),
      signUp: async () => ({ data: { user: { id: ME, identities: [{}] }, session: window.MOCK_CONFIRM ? null : { user: { id: ME, email: "vendeur@x.ci" } } }, error: null }),
      signOut: async () => ({ error: null }), resetPasswordForEmail: async () => ({ data: {}, error: null }), updateUser: async () => ({ data: {}, error: null })
    },
    storage: { from: () => ({ upload: async p => ({ data: { path: p }, error: null }), getPublicUrl: p => ({ data: { publicUrl: img } }), createSignedUrl: async () => ({ data: { signedUrl: img }, error: null }) }) },
    channel: () => { const c = { on: () => c, subscribe: () => c }; return c; },
    removeChannel: () => {}
  }) };
})();
