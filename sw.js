const CACHE_NAME = 'tasktime-v1';
const ARQUIVOS = [
  './index.html',
  './manifest.json'
];

// Instalação — guarda arquivos no cache
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

// Busca — usa cache se estiver sem internet
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});

// Atualização — limpa caches antigos
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(nomes => 
      Promise.all(nomes.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
});
