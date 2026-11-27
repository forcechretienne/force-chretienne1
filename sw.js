// Service worker : l'application s'ouvre vite et reste utilisable avec une connexion faible.
const CACHE = "fc-202611272326";
const SHELL = ["/", "/index.html", "/app.css?v=202611272326", "/app.js?v=202611272326", "/config.js?v=202611272326", "/preact.umd.js", "/hooks.umd.js", "/htm.umd.js", "/supabase.js", "/manifest.webmanifest", "/icon-192.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return; // Supabase et polices : toujours en direct
  if (e.request.mode === "navigate") { e.respondWith(fetch(e.request).catch(() => caches.match("/index.html"))); return; }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })));
});

// Notifications : affichage et ouverture de l'application au bon endroit
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Force Chrétienne", {
    body: d.body || "", icon: "/icon-192.png", badge: "/icon-192.png", tag: d.tag || undefined, renotify: !!d.tag, data: { url: d.url || "/" }
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "/";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if (new URL(c.url).origin === self.location.origin) { c.postMessage({ type: "open", url }); return c.focus(); } }
    return self.clients.openWindow(url);
  }));
});
