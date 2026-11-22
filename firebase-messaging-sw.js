// ==========================================
// ১. Firebase Setup for Push Notification (অপরিবর্তিত)
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

// ব্যাকগ্রাউন্ড নোটিফিকেশন
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // ✅ ফিক্স: ফায়ারবেস নিজে থেকেই নোটিফিকেশন দেখাবে, তাই আমাদের আর দেখানোর দরকার নেই (এতে ডাবল হবে না)
  if (payload.notification) {
    return;
  }
});


// ==========================================
// ২. PWA Offline Caching
//    (index.html তিনভাগে (html/css/js) ভাগ হওয়ার পর নতুন ফাইলগুলো যোগ করা হলো,
//     এবং lucide এর ভার্সন ঠিক করা হলো যাতে আসল সাইটের সাথে মিলে)
// ==========================================
const CACHE_NAME = 'amar-elaka-v6'; // ভার্সন বাড়ানো হলো যাতে ব্রাউজার নতুন কোড ধরে
const CACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',          // 👈 নতুন: আলাদা করা CSS ফাইল
  '/script.js',          // 👈 নতুন: আলাদা করা JS ফাইল
  '/manifest.json',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/maskable-192.png',
  '/maskable-512.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@0.525.0/dist/umd/lucide.js', // 👈 ঠিক করা হলো: আসল সাইটে ব্যবহৃত ভার্সনের সাথে মেলানো হলো (আগে @latest ছিল, যা আসলে কখনো ক্যাশ হতো না)
  'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap'
];

// ইনস্টল (ক্যাশ তৈরি করা)
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

  // শুধু GET রিকুয়েস্ট handle করা (POST/PUT ইত্যাদি cache করা যায় না)
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // 👇 নতুন: নেট থাকলে নতুন রেসপন্স cache এ জমা রাখা হচ্ছে, যাতে পরে নতুন কোনো
        // ছবি/ফাইল এই তালিকায় না থাকলেও ভবিষ্যতে অফলাইনে কাজ করে — বারবার আপডেট করা লাগবে না
        const resClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, resClone).catch(() => {});
        });
        return networkResponse;
      })
      .catch(() => {
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
