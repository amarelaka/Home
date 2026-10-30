// ==========================================
// ১. Firebase Setup for Push Notification
// ==========================================
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCQUjnlabQIa7kAaNnDaYvjyAf9eY_yoRo",
  authDomain: "amaralakas.firebaseapp.com",
  projectId: "amaralakas",
  storageBucket: "amaralakas.firebasestorage.app",
  messagingSenderId: "84410073493",
  appId: "1:84410073493:web:cf26a68ff4073748fe369c",
  measurementId: "G-EHGHRXL28J"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ব্যাকগ্রাউন্ডে নোটিফিকেশন আসলে কী দেখাবে
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || "আমার এলাকা";
  const notificationOptions = {
    body: payload.notification?.body || "নতুন নোটিফিকেশন এসেছে",
    icon: '/icon-192.png' // আপনার অ্যাপের আইকনের লিংক
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// ==========================================
// ২. PWA Offline Caching (আপনার আগের sw.js থেকে)
// ==========================================
const CACHE_NAME = 'amar-elaka-v4';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.js',
  'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap'
];

// ইনস্টল (ফাইল ক্যাশ করা)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        CACHE_URLS.map(url => cache.add(url).catch(err => console.warn('Cache fail:', url)))
      );
    })
  );
  self.skipWaiting();
});

// অ্যাক্টিভেট (পুরনো ক্যাশ মুছে ফেলা)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// ফেচ (নেটওয়ার্ক না থাকলে ক্যাশ থেকে দেখানো)
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('firestore.googleapis.com') ||
      event.request.url.includes('identitytoolkit') ||
      event.request.url.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('অফলাইন — ইন্টারনেট সংযোগ করুন', { status: 503, headers: { 'Content-Type': 'text/plain;charset=UTF-8' } });
      });
    })
  );
});
