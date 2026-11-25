// Service worker : l'application s'ouvre vite et reste utilisable avec une connexion faible.
const CACHE = "fc-__V__";
const SHELL = ["/", "/index.html", "/app.css?v=__V__", "/app.js?v=__V__", "/config.js?v=__V__", "/preact.umd.js", "/hooks.umd.js", "/htm.umd.js", "/supabase.js", "/manifest.webmanifest", "/icon-192.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return; // Supabase et polices : toujours en direct
  if (e.request.mode === "navigate") { e.respondWith(fetch(e.request).catch(() => caches.match("/index.html"))); return; }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })));
});
