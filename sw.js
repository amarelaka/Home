importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Minimal service worker: makes the site installable. Always loads fresh from network.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => new Response('অফলাইন — ইন্টারনেট সংযোগ চেক করুন', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })));
});
