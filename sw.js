// ১. OneSignal Push Notification (আগের মতোই থাকবে)
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// ২. অফলাইন ক্যাশিং সেটআপ
const CACHE_NAME = 'amar-elaka-v2'; // v1 থেকে v2 করা হলো যাতে ব্রাউজার নতুন কোড ধরে
const CACHE_URLS = [
    '/',
    '/index.html',
    '/manifest.json'
];

// ৩. ইনস্টল (ফাইলগুলো সেভ করে রাখা)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_URLS).catch(err => console.warn('Cache failed', err));
        })
    );
    self.skipWaiting();
});

// ৪. অ্যাক্টিভেট (পুরনো ক্যাশ মুছে ফেলা)
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

// ৫. ফেচ (নেটওয়ার্ক চেক এবং ক্যাশ থেকে লোড করা)
self.addEventListener('fetch', (event) => {
    // ফায়ারবেস বা অনেসিগনালের এপিআইগুলো ক্যাশ করা যাবে না
    if (event.request.url.includes('firestore.googleapis.com') || 
        event.request.url.includes('identitytoolkit') ||
        event.request.url.includes('onesignal')) {
        return; 
    }

    // অফলাইনে থাকলে ক্যাশ থেকে ডিজাইন লোড হবে
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                }
                // যদি অফলাইনে নতুন কোনো পেজ খোঁজা হয়, তবে index.html দেখাবে
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
                return new Response('অফলাইন — ইন্টারনেট সংযোগ চেক করুন', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
            });
        })
    );
});
