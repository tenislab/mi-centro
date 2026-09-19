const CACHE = 'mi-centro-v1';
const ASSETS = [
  './',
  './index.html',
  './support.js',
  './icon.svg',
  './icon-32.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './manifest.webmanifest',
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&family=Manrope:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Red primero para el documento (así ves las actualizaciones), caché como respaldo sin conexión.
// Todo lo demás: caché primero.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const isDoc = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isDoc) {
    e.respondWith(
      fetch(req)
        .then(res => {
          caches.open(CACHE).then(c => c.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match(req)
          .then(r => r || caches.match('./index.html'))
          .then(r => r || new Response('Sin conexión y sin copia guardada.', {status:503, headers:{'Content-Type':'text/plain; charset=utf-8'}})))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res.ok && (new URL(req.url).origin === location.origin || req.url.includes('fonts.g'))) {
          caches.open(CACHE).then(c => c.put(req, res.clone()));
        }
        return res;
      }).catch(() => new Response('', {status: 504, statusText: 'Sin conexión'}));
    })
  );
});
