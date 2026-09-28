// Aggiornamenti: con la rete si carica sempre la versione pubblicata; senza rete si usa la copia salvata.
// I dati non passano da qui: stanno nella memoria del dispositivo.
// Quando si modifica index.html, cambiare anche il nome della cache qui sotto (v3 → v4…).
const CACHE = 'osservazioni-v3';
const FILE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  // cache: 'reload' scavalca la cache HTTP del browser, così la copia salvata è davvero quella nuova
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(FILE.map(f => fetch(f, { cache: 'reload' }).then(r => { if (r.ok) return c.put(f, r); }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // prima la rete (al massimo 4 secondi), poi la copia salvata
  e.respondWith(caches.open(CACHE).then(c => {
    const rete = fetch(req, { cache: 'no-cache' }).then(r => { if (r.ok) c.put(req, r.clone()); return r; });
    const limite = new Promise(res => setTimeout(res, 4000));
    return Promise.race([rete, limite.then(() => undefined)])
      .then(r => r || c.match(req, { ignoreSearch: true }).then(hit => hit || rete))
      .catch(() => c.match(req, { ignoreSearch: true }));
  }));
});
