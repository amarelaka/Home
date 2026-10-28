// ১. OneSignal Push Notification
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// ২. অফলাইন ক্যাশিং সেটআপ (v3 করা হলো)
const CACHE_NAME = 'amar-elaka-v3'; 
const CACHE_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/lucide@latest/dist/umd/lucide.js',
    'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap'
];

// ৩. ইনস্টল (ডিজাইনসহ সব ফাইল সেভ করা)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // একটি একটি করে ফাইল সেভ করবে, কোনোটা বাদ পড়লেও অ্যাপ ভাঙবে না
            return Promise.all(
                CACHE_URLS.map(url => cache.add(url).catch(err => console.warn('Cache fail:', url)))
            );
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

// ৫. ফেচ (নেটওয়ার্ক চেক)
self.addEventListener('fetch', (event) => {
    // ফায়ারবেস বা অনেসিগনালের ডেটা ক্যাশ হবে না, সবসময় লাইভ ডেটা খুঁজবে
    if (event.request.url.includes('firestore.googleapis.com') || 
        event.request.url.includes('identitytoolkit') ||
        event.request.url.includes('onesignal')) {
        return; 
    }

    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((response) => {
                if (response) {
                    return response; // ক্যাশ থেকে ডিজাইন/আইকন লোড হবে
                }
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html'); // অফলাইনে পেজ খুললে index দেখাবে
                }
                return new Response('অফলাইন — ইন্টারনেট সংযোগ চেক করুন', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
            });
        })
    );
});
