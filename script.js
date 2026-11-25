/* ============================================================
   আমার এলাকা — ওয়েবসাইটের সম্পূর্ণ JavaScript
   (index.html থেকে আলাদা করা হয়েছে, কোনো ফিচার পরিবর্তন হয়নি)
   টাইপ module, কারণ এতে Firebase এর import স্টেটমেন্ট আছে
   ============================================================ */

/* ---------- জেলা → উপজেলা ড্রপডাউন সিস্টেম ---------- */
    /* ===================== জেলা → উপজেলা ড্রপডাউন সিস্টেম =====================
       বাংলাদেশের ৬৪ জেলা ও সংশ্লিষ্ট উপজেলা। ইউজার প্রথমে জেলা সিলেক্ট করবে,
       তারপর ঐ জেলার উপজেলা তালিকা থেকে উপজেলা সিলেক্ট করবে। কাস্টম লেখার সুযোগ নেই।
       আগের কোড যেন অপরিবর্তিত থাকে তাই একই id-র hidden input রাখা হয়েছে
       (.value পড়া/লেখা আগের মতোই কাজ করে)। */
        const BD_LOCATIONS = {
            'ঢাকা': ['ধামরাই','দোহার','কেরানীগঞ্জ','নবাবগঞ্জ','সাভার','ধানমন্ডি','গুলশান','বনানী','উত্তরা','মিরপুর','মোহাম্মদপুর','মতিঝিল','রমনা','তেজগাঁও','লালবাগ','কোতোয়ালী','সবুজবাগ','খিলগাঁও','যাত্রাবাড়ী','ডেমরা','বাড্ডা','রামপুরা','কাফরুল','পল্লবী','শাহবাগ','হাজারীবাগ','কামরাঙ্গীরচর','খিলক্ষেত','তুরাগ','ক্যান্টনমেন্ট'],
            'গাজীপুর': ['গাজীপুর সদর','কালিয়াকৈর','কালীগঞ্জ','কাপাসিয়া','শ্রীপুর','টঙ্গী'],
            'নারায়ণগঞ্জ': ['নারায়ণগঞ্জ সদর','আড়াইহাজার','বন্দর','রূপগঞ্জ','সোনারগাঁ','ফতুল্লা','সিদ্ধিরগঞ্জ'],
            'নরসিংদী': ['নরসিংদী সদর','বেলাবো','মনোহরদী','পলাশ','রায়পুরা','শিবপুর'],
            'মানিকগঞ্জ': ['মানিকগঞ্জ সদর','ঘিওর','দৌলতপুর','শিবালয়','সাটুরিয়া','সিঙ্গাইর','হরিরামপুর'],
            'মুন্সিগঞ্জ': ['মুন্সিগঞ্জ সদর','গজারিয়া','লৌহজং','শ্রীনগর','সিরাজদিখান','টঙ্গীবাড়ী'],
            'রাজবাড়ী': ['রাজবাড়ী সদর','গোয়ালন্দ','পাংশা','বালিয়াকান্দি','কালুখালী'],
            'ফরিদপুর': ['ফরিদপুর সদর','আলফাডাঙ্গা','বোয়ালমারী','সদরপুর','নগরকান্দা','ভাঙ্গা','চরভদ্রাসন','মধুখালী','সালথা'],
            'গোপালগঞ্জ': ['গোপালগঞ্জ সদর','কাশিয়ানী','কোটালীপাড়া','টুঙ্গিপাড়া','মুকসুদপুর'],
            'মাদারীপুর': ['মাদারীপুর সদর','কালকিনি','রাজৈর','শিবচর','ডাসার'],
            'শরীয়তপুর': ['শরীয়তপুর সদর','ডামুড্যা','নড়িয়া','ভেদরগঞ্জ','জাজিরা','গোসাইরহাট'],
            'কিশোরগঞ্জ': ['কিশোরগঞ্জ সদর','অষ্টগ্রাম','বাজিতপুর','ভৈরব','হোসেনপুর','ইটনা','করিমগঞ্জ','কটিয়াদি','কুলিয়ারচর','মিঠামইন','নিকলী','পাকুন্দিয়া','তাড়াইল'],
            'টাঙ্গাইল': ['টাঙ্গাইল সদর','বাসাইল','ভুঞাপুর','দেলদুয়ার','ঘাটাইল','গোপালপুর','কালিহাতী','মধুপুর','মির্জাপুর','নাগরপুর','সখীপুর','ধনবাড়ী'],

            'চট্টগ্রাম': ['আনোয়ারা','বাঁশখালী','বোয়ালখালী','চন্দনাইশ','ফটিকছড়ি','হাটহাজারী','লোহাগাড়া','মীরসরাই','পটিয়া','রাঙ্গুনিয়া','রাউজান','সন্দ্বীপ','সীতাকুণ্ড','সাতকানিয়া','কর্ণফুলী','কোতোয়ালী','পাহাড়তলী','পাঁচলাইশ','ডবলমুরিং','খুলশী','বন্দর','বাকলিয়া','চান্দগাঁও','হালিশহর','বায়েজিদ বোস্তামী','ইপিজেড'],
            'কুমিল্লা': ['কুমিল্লা আদর্শ সদর','কুমিল্লা সদর দক্ষিণ','বরুড়া','ব্রাহ্মণপাড়া','বুড়িচং','চান্দিনা','চৌদ্দগ্রাম','দাউদকান্দি','দেবিদ্বার','হোমনা','লাকসাম','লালমাই','মনোহরগঞ্জ','মেঘনা','মুরাদনগর','নাঙ্গলকোট','তিতাস'],
            'ফেনী': ['ফেনী সদর','ছাগলনাইয়া','দাগনভূঁইয়া','পরশুরাম','ফুলগাজী','সোনাগাজী'],
            'ব্রাহ্মণবাড়িয়া': ['ব্রাহ্মণবাড়িয়া সদর','আখাউড়া','আশুগঞ্জ','কসবা','বাঞ্ছারামপুর','বিজয়নগর','নবীনগর','নাসিরনগর','সরাইল','বাংলাবাজার'],
            'রাঙ্গামাটি': ['রাঙ্গামাটি সদর','বাঘাইছড়ি','বরকল','কাউখালী','বিলাইছড়ি','জুরাছড়ি','কাপ্তাই','লংগদু','নানিয়ারচর','রাজস্থলী'],
            'নোয়াখালী': ['নোয়াখালী সদর','বেগমগঞ্জ','চাটখিল','কোম্পানীগঞ্জ','হাতিয়া','কবিরহাট','সেনবাগ','সোনাইমুড়ী','সুবর্ণচর'],
            'চাঁদপুর': ['চাঁদপুর সদর','ফরিদগঞ্জ','হাইমচর','হাজীগঞ্জ','কচুয়া','মতলব উত্তর','মতলব দক্ষিণ','শাহরাস্তি'],
            'লক্ষ্মীপুর': ['লক্ষ্মীপুর সদর','কমলনগর','রায়পুর','রামগঞ্জ','রামগতি'],
            'কক্সবাজার': ['কক্সবাজার সদর','চকরিয়া','কুতুবদিয়া','উখিয়া','মহেশখালী','পেকুয়া','রামু','টেকনাফ','ঈদগাঁও'],
            'খাগড়াছড়ি': ['খাগড়াছড়ি সদর','দীঘিনালা','লক্ষ্মীছড়ি','মহালছড়ি','মানিকছড়ি','মাটিরাঙ্গা','পানছড়ি','রামগড়','গুইমারা'],
            'বান্দরবান': ['বান্দরবান সদর','আলীকদম','লামা','নাইক্ষ্যংছড়ি','রোয়াংছড়ি','রুমা','থানচি'],

            'রাজশাহী': ['বাগমারা','বাঘা','চারঘাট','দুর্গাপুর','গোদাগাড়ী','মোহনপুর','পবা','পুঠিয়া','তানোর','বোয়ালিয়া','মতিহার','রাজপাড়া','শাহ মখদুম'],
            'চাঁপাইনবাবগঞ্জ': ['চাঁপাইনবাবগঞ্জ সদর','ভোলাহাট','গোমস্তাপুর','নাচোল','নিয়ামতপুর','শিবগঞ্জ'],
            'নওগাঁ': ['নওগাঁ সদর','আত্রাই','বদলগাছী','ধামইরহাট','মহাদেবপুর','মান্দা','নিয়ামতপুর','পত্নীতলা','পোরশা','রাণীনগর','সাপাহার'],
            'নাটোর': ['নাটোর সদর','বড়াইগ্রাম','বাগাতিপাড়া','গুরুদাসপুর','লালপুর','সিংড়া','নলডাঙ্গা'],
            'পাবনা': ['পাবনা সদর','আটঘরিয়া','বেড়া','ভাঙ্গুড়া','চাটমোহর','ঈশ্বরদী','ফরিদপুর','সুজানগর','সাঁথিয়া'],
            'সিরাজগঞ্জ': ['সিরাজগঞ্জ সদর','বেলকুচি','চৌহালী','কামারখন্দ','কাজীপুর','রায়গঞ্জ','শাহজাদপুর','তাড়াশ','উল্লাপাড়া'],
            'বগুড়া': ['বগুড়া সদর','আদমদীঘি','ধুনট','দুপচাঁচিয়া','গাবতলী','কাহালু','নন্দীগ্রাম','শাজাহানপুর','সারিয়াকান্দি','শেরপুর','শিবগঞ্জ','সোনাতলা'],
            'জয়পুরহাট': ['জয়পুরহাট সদর','আক্কেলপুর','কালাই','ক্ষেতলাল','পাঁচবিবি'],

            'খুলনা': ['বটিয়াঘাটা','দাকোপ','ডুমুরিয়া','দিঘলিয়া','কয়রা','পাইকগাছা','ফুলতলা','রূপসা','তেরখাদা','খুলনা সদর','সোনাডাঙ্গা','খালিশপুর','দৌলতপুর','খান জাহান আলী','হরিণটানা'],
            'বাগেরহাট': ['বাগেরহাট সদর','চিতলমারী','ফকিরহাট','কচুয়া','মোল্লাহাট','মোংলা','মোড়েলগঞ্জ','রামপাল','শরণখোলা'],
            'সাতক্ষীরা': ['সাতক্ষীরা সদর','আশাশুনি','দেবহাটা','কলারোয়া','কালিগঞ্জ','শ্যামনগর','তালা'],
            'যশোর': ['যশোর সদর','অভয়নগর','বাঘারপাড়া','চৌগাছা','ঝিকরগাছা','কেশবপুর','মণিরামপুর','শার্শা'],
            'ঝিনাইদহ': ['ঝিনাইদহ সদর','কালীগঞ্জ','কোটচাঁদপুর','মহেশপুর','শৈলকুপা','হরিণাকুন্ডু'],
            'মাগুরা': ['মাগুরা সদর','মোহাম্মদপুর','শালিখা','শ্রীপুর'],
            'নড়াইল': ['নড়াইল সদর','কালিয়া','লোহাগড়া','নড়াগাতী'],
            'কুষ্টিয়া': ['কুষ্টিয়া সদর','ভেড়ামারা','দৌলতপুর','খোকসা','কুমারখালী','মিরপুর'],
            'চুয়াডাঙ্গা': ['চুয়াডাঙ্গা সদর','আলমডাঙ্গা','দামুড়হুদা','জীবননগর'],
            'মেহেরপুর': ['মেহেরপুর সদর','গাংনী','মুজিবনগর'],

            'বরিশাল': ['বরিশাল সদর','আগৈলঝাড়া','বাবুগঞ্জ','বাকেরগঞ্জ','বানারীপাড়া','গৌরনদী','হিজলা','মেহেন্দিগঞ্জ','মুলাদী','উজিরপুর'],
            'ভোলা': ['ভোলা সদর','বোরহানউদ্দিন','চরফ্যাশন','দৌলতখান','লালমোহন','মনপুরা','তজুমদ্দিন'],
            'পটুয়াখালী': ['পটুয়াখালী সদর','বাউফল','দশমিনা','দুমকি','গলাচিপা','কলাপাড়া','মির্জাগঞ্জ','রাঙ্গাবালী'],
            'পিরোজপুর': ['পিরোজপুর সদর','ভান্ডারিয়া','কাউখালী','মঠবাড়িয়া','নাজিরপুর','নেছারাবাদ','ইন্দুরকানী'],
            'ঝালকাঠি': ['ঝালকাঠি সদর','কাঠালিয়া','নলছিটি','রাজাপুর'],
            'বরগুনা': ['বরগুনা সদর','আমতলী','বামনা','বেতাগী','পাথরঘাটা','তালতলী'],

            'সিলেট': ['সিলেট সদর','বালাগঞ্জ','বিয়ানীবাজার','বিশ্বনাথ','কোম্পানীগঞ্জ','ফেঞ্চুগঞ্জ','গোলাপগঞ্জ','গোয়াইনঘাট','জৈন্তাপুর','কানাইঘাট','জকিগঞ্জ','দক্ষিণ সুরমা','ওসমানীনগর'],
            'মৌলভীবাজার': ['মৌলভীবাজার সদর','বড়লেখা','জুড়ী','কমলগঞ্জ','কুলাউড়া','রাজনগর','শ্রীমঙ্গল'],
            'হবিগঞ্জ': ['হবিগঞ্জ সদর','আজমিরীগঞ্জ','বাহুবল','বানিয়াচং','চুনারুঘাট','লাখাই','মাধবপুর','নবীগঞ্জ','শায়েস্তাগঞ্জ'],
            'সুনামগঞ্জ': ['সুনামগঞ্জ সদর','বিশ্বম্ভরপুর','ছাতক','দক্ষিণ সুনামগঞ্জ','দিরাই','ধর্মপাশা','দোয়ারাবাজার','জগন্নাথপুর','জামালগঞ্জ','শাল্লা','তাহিরপুর','মধ্যনগর'],

            'রংপুর': ['রংপুর সদর','বদরগঞ্জ','গঙ্গাচড়া','কাউনিয়া','মিঠাপুকুর','পীরগাছা','পীরগঞ্জ','তারাগঞ্জ'],
            'গাইবান্ধা': ['গাইবান্ধা সদর','ফুলছড়ি','গোবিন্দগঞ্জ','পলাশবাড়ী','সাদুল্লাপুর','সাঘাটা','সুন্দরগঞ্জ'],
            'কুড়িগ্রাম': ['কুড়িগ্রাম সদর','ভুরুঙ্গামারী','চিলমারী','ফুলবাড়ী','নাগেশ্বরী','রাজারহাট','রাজিবপুর','রৌমারী','উলিপুর'],
            'লালমনিরহাট': ['লালমনিরহাট সদর','আদিতমারী','হাতীবান্ধা','কালীগঞ্জ','পাটগ্রাম'],
            'নীলফামারী': ['নীলফামারী সদর','ডিমলা','ডোমার','জলঢাকা','কিশোরগঞ্জ','সৈয়দপুর'],
            'ঠাকুরগাঁও': ['ঠাকুরগাঁও সদর','বালিয়াডাঙ্গী','হরিপুর','পীরগঞ্জ','রাণীশংকৈল'],
            'পঞ্চগড়': ['পঞ্চগড় সদর','আটোয়ারী','বোদা','দেবীগঞ্জ','তেঁতুলিয়া'],
            'দিনাজপুর': ['দিনাজপুর সদর','বিরল','বীরগঞ্জ','বিরামপুর','বোচাগঞ্জ','চিরিরবন্দর','ফুলবাড়ী','ঘোড়াঘাট','হাকিমপুর','কাহারোল','খানসামা','নবাবগঞ্জ','পার্বতীপুর'],

            'ময়মনসিংহ': ['ময়মনসিংহ সদর','ভালুকা','ধোবাউড়া','ফুলবাড়িয়া','গফরগাঁও','গৌরীপুর','হালুয়াঘাট','ঈশ্বরগঞ্জ','মুক্তাগাছা','নান্দাইল','ফুলপুর','ত্রিশাল','তারাকান্দা'],
            'জামালপুর': ['জামালপুর সদর','বকশীগঞ্জ','দেওয়ানগঞ্জ','ইসলামপুর','মাদারগঞ্জ','মেলান্দহ','সরিষাবাড়ী'],
            'নেত্রকোণা': ['নেত্রকোণা সদর','আটপাড়া','বারহাট্টা','দুর্গাপুর','খালিয়াজুরী','কলমাকান্দা','কেন্দুয়া','মদন','মোহনগঞ্জ','পূর্বধলা'],
            'শেরপুর': ['শেরপুর সদর','ঝিনাইগাতী','নকলা','নালিতাবাড়ী','শ্রীবরদী']
        };
        // পুরনো ইউজারদের ইংরেজি/বিকল্প বানানে সংরক্ষিত জেলার নাম মেলানোর জন্য
        const BD_DISTRICT_ALIASES = {
            'dhaka':'ঢাকা','gazipur':'গাজীপুর','narayanganj':'নারায়ণগঞ্জ','narsingdi':'নরসিংদী','manikganj':'মানিকগঞ্জ','munshiganj':'মুন্সিগঞ্জ','rajbari':'রাজবাড়ী','faridpur':'ফরিদপুর','gopalganj':'গোপালগঞ্জ','madaripur':'মাদারীপুর','shariatpur':'শরীয়তপুর','kishoreganj':'কিশোরগঞ্জ','tangail':'টাঙ্গাইল',
            'chattogram':'চট্টগ্রাম','chittagong':'চট্টগ্রাম','cumilla':'কুমিল্লা','comilla':'কুমিল্লা','feni':'ফেনী','brahmanbaria':'ব্রাহ্মণবাড়িয়া','rangamati':'রাঙ্গামাটি','noakhali':'নোয়াখালী','chandpur':'চাঁদপুর','lakshmipur':'লক্ষ্মীপুর','laxmipur':'লক্ষ্মীপুর','coxsbazar':'কক্সবাজার','coxbazar':'কক্সবাজার','khagrachhari':'খাগড়াছড়ি','khagrachari':'খাগড়াছড়ি','bandarban':'বান্দরবান',
            'rajshahi':'রাজশাহী','chapainawabganj':'চাঁপাইনবাবগঞ্জ','naogaon':'নওগাঁ','natore':'নাটোর','pabna':'পাবনা','sirajganj':'সিরাজগঞ্জ','bogura':'বগুড়া','bogra':'বগুড়া','joypurhat':'জয়পুরহাট','jaipurhat':'জয়পুরহাট',
            'khulna':'খুলনা','bagerhat':'বাগেরহাট','satkhira':'সাতক্ষীরা','jashore':'যশোর','jessore':'যশোর','jhenaidah':'ঝিনাইদহ','magura':'মাগুরা','narail':'নড়াইল','kushtia':'কুষ্টিয়া','chuadanga':'চুয়াডাঙ্গা','meherpur':'মেহেরপুর',
            'barishal':'বরিশাল','barisal':'বরিশাল','bhola':'ভোলা','patuakhali':'পটুয়াখালী','pirojpur':'পিরোজপুর','jhalokathi':'ঝালকাঠি','jhalakathi':'ঝালকাঠি','barguna':'বরগুনা',
            'sylhet':'সিলেট','moulvibazar':'মৌলভীবাজার','maulvibazar':'মৌলভীবাজার','habiganj':'হবিগঞ্জ','sunamganj':'সুনামগঞ্জ',
            'rangpur':'রংপুর','gaibandha':'গাইবান্ধা','kurigram':'কুড়িগ্রাম','lalmonirhat':'লালমনিরহাট','nilphamari':'নীলফামারী','thakurgaon':'ঠাকুরগাঁও','panchagarh':'পঞ্চগড়','dinajpur':'দিনাজপুর',
            'mymensingh':'ময়মনসিংহ','jamalpur':'জামালপুর','netrokona':'নেত্রকোণা','netrakona':'নেত্রকোণা','sherpur':'শেরপুর'
        };

        (function () {
            const collator = new Intl.Collator('bn');
            const DISTRICTS = Object.keys(BD_LOCATIONS).sort(collator.compare);
            const bnDigits = '০১২৩৪৫৬৭৮৯';
            const toBn = (n) => String(n).replace(/\d/g, d => bnDigits[d]);
            const norm = (s) => String(s || '').trim().toLowerCase().replace(/[\s\-_.]+/g, '');
            const CHEV = '<svg class="loc-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
            const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
            const SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
            const escHtml = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

            // পুরনো/অমিল জেলা নাম মেলানো
            function matchDistrict(raw) {
                let v = String(raw || '').trim();
                if (!v) return '';
                if (BD_LOCATIONS[v]) return v;
                const stripped = v.replace(/\s*(জেলা|district|zila|zilla)\s*$/i, '').trim();
                if (BD_LOCATIONS[stripped]) return stripped;
                const alias = BD_DISTRICT_ALIASES[norm(stripped)];
                if (alias) return alias;
                return '';
            }
            function matchUpazila(district, raw) {
                const list = BD_LOCATIONS[district];
                let v = String(raw || '').trim();
                if (!list || !v) return '';
                if (list.includes(v)) return v;
                const stripped = v.replace(/\s*উপজেলা\s*$/, '').trim();
                if (list.includes(stripped)) return stripped;
                if (list.includes(stripped + ' সদর')) return stripped + ' সদর';
                const hit = list.find(u => norm(u) === norm(stripped));
                return hit || '';
            }

            // ---------- ভাসমান ড্রপডাউন প্যানেল (একটিই, সব ফিল্ডে শেয়ার হয়) ----------
            let panel, searchEl, listEl, headEl, current = null, activeIdx = -1, shown = [];
            function ensurePanel() {
                if (panel) return;
                panel = document.createElement('div');
                panel.id = 'locDropdown';
                panel.setAttribute('role', 'listbox');
                panel.innerHTML = '<div class="loc-head"><span></span><span></span></div>' +
                    '<div class="loc-search-wrap">' + SEARCH + '<input type="text" class="loc-search" autocomplete="off" autocapitalize="off" spellcheck="false"></div>' +
                    '<div class="loc-list"></div>';
                document.body.appendChild(panel);
                headEl = panel.querySelector('.loc-head');
                searchEl = panel.querySelector('.loc-search');
                listEl = panel.querySelector('.loc-list');
                searchEl.addEventListener('input', renderList);
                searchEl.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
                    else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
                    else if (e.key === 'Enter') { e.preventDefault(); if (shown[activeIdx] !== undefined) choose(shown[activeIdx]); }
                    else if (e.key === 'Escape') { e.preventDefault(); closePanel(true); }
                });
                listEl.addEventListener('click', (e) => {
                    const it = e.target.closest('.loc-item'); if (!it) return;
                    choose(it.dataset.val);
                });
                document.addEventListener('mousedown', (e) => {
                    if (!current) return;
                    if (panel.contains(e.target) || current.btn.contains(e.target)) return;
                    closePanel(false);
                }, true);
                document.addEventListener('touchstart', (e) => {
                    if (!current) return;
                    if (panel.contains(e.target) || current.btn.contains(e.target)) return;
                    closePanel(false);
                }, { passive: true, capture: true });
                // মোবাইলে সার্চ বক্সে ট্যাপ করলে কীবোর্ড ওঠে (resize/scroll হয়) — তখন প্যানেল বন্ধ না করে শুধু জায়গা ঠিক করা হয়
                window.addEventListener('resize', () => {
                    if (!current) return;
                    if (document.activeElement === searchEl) positionPanel(); else closePanel(false);
                });
                if (window.visualViewport) window.visualViewport.addEventListener('resize', () => { if (current) positionPanel(); });
                window.addEventListener('scroll', (e) => {
                    if (!current || panel.contains(e.target)) return;
                    if (document.activeElement === searchEl) { positionPanel(); return; }
                    closePanel(false);
                }, true);
            }

            function itemsFor(picker) {
                return picker.kind === 'district' ? DISTRICTS : (BD_LOCATIONS[picker.getDistrict()] || []).slice().sort(collator.compare);
            }
            function renderList() {
                if (!current) return;
                const all = itemsFor(current);
                const q = norm(searchEl.value);
                const items = q ? all.filter(x => norm(x).includes(q)) : all;
                shown = items.slice();
                let html = '';
                if (current.optional && current.value && !q) {
                    html += '<div class="loc-item loc-clear" data-val="">নির্বাচন মুছে ফেলুন</div>';
                }
                if (!items.length) html += '<div class="loc-empty">কিছু পাওয়া যায়নি</div>';
                items.forEach((it) => {
                    const sel = it === current.value;
                    html += '<div class="loc-item' + (sel ? ' selected' : '') + '" role="option" data-val="' + escHtml(it) + '">' +
                        '<span>' + escHtml(it) + '</span>' + (sel ? CHECK : '') + '</div>';
                });
                listEl.innerHTML = html;
                activeIdx = q && items.length ? 0 : -1;
                if (activeIdx === 0) listEl.querySelectorAll('.loc-item:not(.loc-clear)')[0]?.classList.add('active');
                const selEl = listEl.querySelector('.loc-item.selected');
                if (selEl && !q) listEl.scrollTop = Math.max(0, selEl.offsetTop - listEl.clientHeight / 2 + selEl.offsetHeight / 2);
                else listEl.scrollTop = 0;
                headEl.children[0].textContent = current.kind === 'district' ? 'জেলা নির্বাচন করুন' : (current.getDistrict() + ' জেলার উপজেলা');
                headEl.children[1].textContent = toBn(items.length) + 'টি';
            }
            function moveActive(d) {
                const els = listEl.querySelectorAll('.loc-item:not(.loc-clear)');
                if (!els.length) return;
                els.forEach(e => e.classList.remove('active'));
                activeIdx = (activeIdx + d + els.length) % els.length;
                const a = els[activeIdx];
                a.classList.add('active');
                if (a.offsetTop < listEl.scrollTop) listEl.scrollTop = a.offsetTop;
                else if (a.offsetTop + a.offsetHeight > listEl.scrollTop + listEl.clientHeight) listEl.scrollTop = a.offsetTop + a.offsetHeight - listEl.clientHeight;
            }
            function positionPanel() {
                const r = current.btn.getBoundingClientRect();
                const vw = window.innerWidth, vh = (window.visualViewport ? window.visualViewport.height : window.innerHeight);
                const width = Math.min(Math.max(r.width, 230), vw - 16);
                let left = Math.min(Math.max(8, r.left), vw - width - 8);
                const spaceBelow = vh - r.bottom - 10, spaceAbove = r.top - 10;
                const want = 330;
                const up = spaceBelow < 240 && spaceAbove > spaceBelow;
                const maxH = Math.max(180, Math.min(want, up ? spaceAbove : spaceBelow));
                panel.style.width = width + 'px';
                panel.style.left = left + 'px';
                panel.style.maxHeight = maxH + 'px';
                panel.classList.toggle('loc-up', up);
                if (up) { panel.style.top = 'auto'; panel.style.bottom = (window.innerHeight - r.top + 6) + 'px'; }
                else { panel.style.bottom = 'auto'; panel.style.top = (r.bottom + 6) + 'px'; }
            }
            function openPanel(picker) {
                ensurePanel();
                if (current && current !== picker) closePanel(false);
                current = picker;
                picker.btn.setAttribute('aria-expanded', 'true');
                searchEl.value = '';
                searchEl.placeholder = picker.kind === 'district' ? 'জেলা খুঁজুন...' : 'উপজেলা খুঁজুন...';
                panel.classList.add('open');
                renderList();
                positionPanel();
                // মোবাইলে অটো-ফোকাস করলে কীবোর্ড উঠে লিস্ট ঢেকে যায়, তাই শুধু ডেস্কটপে
                if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) setTimeout(() => searchEl.focus({ preventScroll: true }), 30);
            }
            function closePanel(refocus) {
                if (!current) return;
                current.btn.setAttribute('aria-expanded', 'false');
                if (refocus) { try { current.btn.focus({ preventScroll: true }); } catch (e) {} }
                panel.classList.remove('open');
                current = null;
            }
            function choose(val) {
                const p = current; if (!p) return;
                closePanel(true);
                p.userSelect(val);
            }

            // ---------- picker তৈরি ----------
            function makePicker(inputId, kind, partner) {
                const orig = document.getElementById(inputId);
                if (!orig || orig.dataset.locMounted) return null;
                const placeholder = orig.getAttribute('placeholder') || (kind === 'district' ? 'জেলা' : 'উপজেলা');
                const optional = !orig.required;
                const cls = orig.className || '';

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.id = inputId + 'Btn';
                btn.className = 'loc-btn ' + cls.replace(/placeholder:[^\s]+/g, '');
                if (orig.classList.contains('promo-input')) btn.classList.add('loc-promo');
                else if (/bg-\[#07140e\]/.test(cls)) btn.classList.add('loc-boxed');
                btn.setAttribute('aria-haspopup', 'listbox');
                btn.setAttribute('aria-expanded', 'false');
                btn.innerHTML = '<span class="loc-label loc-placeholder"></span>' + CHEV;

                const hid = document.createElement('input');
                hid.type = 'hidden';
                hid.id = inputId;
                hid.dataset.locMounted = '1';
                if (orig.name) hid.name = orig.name;

                let value = '';
                const label = btn.querySelector('.loc-label');
                const picker = { kind, btn, optional, hid, partner: null,
                    get value() { return value; },
                    getDistrict() { return picker.kind === 'upazila' && picker.partner ? picker.partner.value : ''; }
                };

                function paint() {
                    const needsDistrict = kind === 'upazila' && !picker.getDistrict();
                    btn.classList.toggle('loc-disabled', needsDistrict);
                    label.classList.toggle('loc-placeholder', !value);
                    label.textContent = value || (needsDistrict ? 'আগে জেলা নির্বাচন করুন' : placeholder);
                }
                picker.paint = paint;
                function setValue(v, fire) {
                    let nv = '';
                    if (kind === 'district') nv = matchDistrict(v);
                    else nv = matchUpazila(picker.getDistrict(), v);
                    const changed = nv !== value;
                    value = nv;
                    paint();
                    if (kind === 'district' && picker.child && changed) picker.child.reset();
                    if (fire && changed) hid.dispatchEvent(new Event('input', { bubbles: true }));
                }
                picker.reset = () => { const had = !!value; value = ''; paint(); if (had) hid.dispatchEvent(new Event('input', { bubbles: true })); };
                picker.userSelect = (val) => {
                    setValue(val, true);
                    if (kind === 'district' && val && picker.child) setTimeout(() => openPanel(picker.child), 120);
                };
                Object.defineProperty(hid, 'value', {
                    configurable: true,
                    get() { return value; },
                    set(v) { setValue(v, false); }
                });

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (kind === 'upazila' && !picker.getDistrict()) {
                        // জেলা নির্বাচন ছাড়া উপজেলা খোলা যাবে না — জেলার ড্রপডাউন খুলে দেওয়া হবে
                        btn.classList.remove('loc-shake'); void btn.offsetWidth; btn.classList.add('loc-shake');
                        if (picker.partner) openPanel(picker.partner);
                        return;
                    }
                    if (current === picker) closePanel(false); else openPanel(picker);
                });
                btn.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
                });

                orig.replaceWith(hid);
                hid.insertAdjacentElement('beforebegin', btn);
                const form = hid.closest('form');
                if (form) form.addEventListener('reset', () => setTimeout(() => { value = ''; paint(); }, 0));
                paint();
                return picker;
            }

            function mountPair(districtId, upazilaId) {
                const d = makePicker(districtId, 'district');
                const u = makePicker(upazilaId, 'upazila');
                if (!d || !u) return;
                d.child = u; u.partner = d;
                u.paint();
            }

            function init() {
                mountPair('regDistrict', 'regUpazila');      // রেজিস্ট্রেশন
                mountPair('editDistrict', 'editUpazila');    // প্রোফাইল এডিট
                mountPair('provDistrict', 'provUpazila');    // সার্ভিস প্রোভাইডার ফর্ম
                mountPair('promoDistrict', 'promoUpazila');  // প্রমোশন/বিজ্ঞাপন ফর্ম
                mountPair('bldReqDistrict', 'bldReqUpazila'); // রক্তদাতা ফর্ম
            }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
            else init();
        })();


/* ---------- মূল অ্যাপ লজিক (Firebase Auth, Firestore, UI) ---------- */
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, updatePassword, EmailAuthProvider, reauthenticateWithCredential, linkWithCredential, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocFromServer, updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp, writeBatch, where, getDocs, limit, startAfter, startAt, increment, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";

        // ========== ANTI-ZOOM ==========
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) e.preventDefault();
        });
        document.addEventListener('wheel', (e) => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
        document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
        document.addEventListener('gesturestart', (e) => e.preventDefault());

        const firebaseConfig = {
          apiKey: "AIzaSyCQUjnlabQIa7kAaNnDaYvjyAf9eY_yoRo",
          authDomain: "amaralakas.firebaseapp.com",
          projectId: "amaralakas",
          storageBucket: "amaralakas.firebasestorage.app",
          messagingSenderId: "84410073493",
          appId: "1:84410073493:web:cf26a68ff4073748fe369c",
          measurementId: "G-EHGHRXL28J"
        };
        let app, db, auth, firebaseReady = false;
        try {
            if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
                app = initializeApp(firebaseConfig);
                db = getFirestore(app);
                auth = getAuth(app);
                firebaseReady = true;
                console.log('Firebase connected');

                enableIndexedDbPersistence(db).catch((err) => {
                    if (err.code === 'failed-precondition') {
                        console.warn('একাধিক tab — offline cache কাজ করবে না');
                    } else if (err.code === 'unimplemented') {
                        console.warn('এই browser offline সাপোর্ট দেয় না');
                    } else {
                        console.warn('Offline setup:', err);
                    }
                });
            } else {
                document.getElementById('firebaseWarning').classList.remove('hidden');
            }
        } catch (e) {
            console.warn('Firebase init failed', e);
            document.getElementById('firebaseWarning').classList.remove('hidden');
        }


        // ========== NO SPLASH: direct home / last page ==========
        // Logged-in users go straight to app; guests see home preview (3-min login gate unchanged).
        function hideSplash() {
            const s = document.getElementById('splashScreen');
            if (!s) return;
            s.style.display = 'none';
            s.classList.add('hidden');
            try { s.remove(); } catch (e) {}
        }
        function enterAppShell() {
            hideSplash();
            const authEl = document.getElementById('authSection');
            if (authEl) authEl.classList.add('hidden');
            const app = document.getElementById('appContent');
            if (app) {
                app.classList.remove('hidden');
                app.classList.add('flex');
            }
            document.body.classList.remove('overflow-hidden');
        }
        // First paint: never show logo splash — open app shell immediately
        try { enterAppShell(); } catch (e) {}
        if (firebaseReady && auth?.currentUser) {
            try { enterAppShell(); } catch (e) {}
        } else {
            // Guest preview until auth resolves (keeps 3-min auto login + click gate)
            try {
                if (typeof showGuestApp === 'function') showGuestApp();
                else enterAppShell();
            } catch (e) { enterAppShell(); }
        }

        // ========== HELPERS ==========
        function refreshIcons() {
            if (window.lucide) { try { window.lucide.createIcons(); } catch (e) {} }
        }
        function faToLucide(faIcon) {
            if (!faIcon) return 'circle';
            const key = String(faIcon).trim().toLowerCase();
            const faMap = {
                'fa-border-all':'layout-grid','fa-wrench':'wrench','fa-hospital':'hospital','fa-bolt':'zap','fa-tint':'droplet','fa-tools':'wrench','fa-car':'car','fa-home':'house','fa-house':'house','fa-utensils':'utensils','fa-laptop':'laptop','fa-graduation-cap':'graduation-cap','fa-heart-pulse':'heart-pulse','fa-stethoscope':'stethoscope','fa-shield-halved':'shield-check','fa-truck':'truck','fa-brush':'brush','fa-water':'droplets','fa-fire':'flame','fa-phone':'phone','fa-briefcase':'briefcase','fa-user':'user','fa-users':'users','fa-star':'star','fa-circle':'circle','fa-banknote':'banknote','fa-store':'store','fa-shopping-cart':'shopping-cart','fa-scissors':'scissors','fa-baby':'baby','fa-book':'book-open'
            };
            if (faMap[key]) return faMap[key];
            if (/^[a-z][a-z0-9-]*$/.test(key) && !key.startsWith('fa-')) return key;
            return 'circle';
        }
        function esc(v) {
            return String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
        }
        function lsGet(key, fallback = null) { try { const raw = localStorage.getItem(key); return raw == null ? fallback : raw; } catch (e) { return fallback; } }
        function lsSet(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
        function lsGetJSON(key, fallback) { try { const raw = localStorage.getItem(key); return raw == null ? fallback : JSON.parse(raw); } catch (e) { return fallback; } }
        function lsSetJSON(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
        function currentUid() { return currentUser?.uid || 'guest'; }

        // ========== STATE ==========
        let currentUser = null;

        // ========== FLUTTER NATIVE FCM TOKEN BRIDGE ==========
        // ফ্লাটার অ্যাপ থেকে FCM টোকেন রিসিভ করার ফাংশন
        window.receiveNativeFcmToken = function(token) {
            console.log("Native FCM Token received from Flutter App:", token);
            if (!token) return;

            // টোকেনটি সেশনে সেভ করে রাখুন
            sessionStorage.setItem('pending_fcm_token', token);

            // ইউজার যদি ইতিমধ্যে লগইন থাকে, তবে সরাসরি ডেটাবেসে সেভ করুন
            if (currentUser && firebaseReady && db) {
                saveTokenToFirestore(token, currentUser.uid);
            }
        };

        // ফায়ারস্টোরে টোকেন সেভ করার হেল্পার ফাংশন
        function saveTokenToFirestore(token, uid) {
            if (!token || !uid || !firebaseReady || !db) return;
            setDoc(doc(db, 'users', uid), {
                fcmToken: token,
                notifPermission: 'granted',
                notifDevice: 'Android App',
                lastTokenUpdate: new Date()
            }, { merge: true }).then(() => {
                console.log("FCM Token successfully saved to Firestore!");
                sessionStorage.removeItem('pending_fcm_token');
            }).catch((e) => {
                console.error("Failed to save FCM token:", e);
            });
        }
        let userProfile = null;
        let guestRedirectTimer = null;
        let guestSessionStarted = false;
        const GUEST_PREVIEW_LIMIT_MS = 3 * 60 * 1000;
        function analyticsDateKey() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
        async function writeSiteAnalyticsEvent(eventName, extra = {}) {
            if (!firebaseReady) return;
            try {
                let sessionId = sessionStorage.getItem('ae_analytics_session');
                if (!sessionId) { sessionId = (crypto?.randomUUID?.() || ('s-' + Date.now() + '-' + Math.random().toString(36).slice(2))); sessionStorage.setItem('ae_analytics_session', sessionId); }
                await addDoc(collection(db, 'siteAnalytics'), { event: eventName, dateKey: analyticsDateKey(), uid: currentUser?.uid || null, sessionId, createdAt: serverTimestamp(), page: location.pathname, ...extra });
            } catch (err) { console.warn('Site analytics event not saved. Check Firestore siteAnalytics create rules:', err?.code || err?.message); }
        }
        function startGuestPreviewTimer() {
            if (guestRedirectTimer) clearTimeout(guestRedirectTimer);
            let startedAt = Number(sessionStorage.getItem('ae_guest_started_at') || 0);
            if (!startedAt) { startedAt = Date.now(); sessionStorage.setItem('ae_guest_started_at', String(startedAt)); }
            const remainingMs = Math.max(0, GUEST_PREVIEW_LIMIT_MS - (Date.now() - startedAt));
            guestRedirectTimer = setTimeout(() => {
                if (!currentUser) {
                    sessionStorage.setItem('ae_guest_preview_expired', '1');
                    showAuthScreen(); switchAuthTab('login');
                    showToast('৩ মিনিটের অতিথি সময় শেষ। চালিয়ে যেতে লগইন করুন।', 'lock', 'text-amber-400');
                }
            }, remainingMs);
        }
        function stopGuestPreviewTimer() { if (guestRedirectTimer) { clearTimeout(guestRedirectTimer); guestRedirectTimer = null; } }
        function showGuestApp() {
            document.getElementById('authSection')?.classList.add('hidden');
            const appEl = document.getElementById('appContent');
            appEl?.classList.remove('hidden'); appEl?.classList.add('flex');
            document.body.classList.remove('overflow-hidden');
            refreshIcons();
            if (!guestSessionStarted) { guestSessionStarted = true; if (!sessionStorage.getItem('ae_guest_visit_logged')) { sessionStorage.setItem('ae_guest_visit_logged', '1'); writeSiteAnalyticsEvent('guest_visit'); } }
            startGuestPreviewTimer();
        }

        let isForcedProfileMode = false;
        let categories = [{ id: 'all', name: 'সকল সেবা', icon: 'fa-border-all' }];
        let emergencyList = [];
        let bloodDonors = [];
        let notices = [];
        let chatMessages = [];
        // Admin Support messages are kept separately from community DMs to prevent state mixing.
        let adminChatMessages = [];
        let activeCategory = 'all';
        const MY_UPAZILA_CAT = '__my_upazila__';
        let myUpazilaFilterOn = false; // লোকেশন ফিল্টার — ক্যাটাগরির সাথে আলাদাভাবে কাজ করে
        let currentTab = 'services';
        let currentTheme = 'light'; // Default: light (saved per account)
        let _scrollLockY = 0;
        let unsubscribeChat = null;
        let unsubscribeAdminStatus = null;
        let unsubCategories = null;
        let unsubEmergency = null;
        let unsubBlood = null;
        let unsubNotices = null;
        let unsubPromotions = null;
        let promotionsCache = [];

        let chatInitialLoadDone = false;
        let heartbeatInterval = null;
        let activityUpdateInterval = null;
        let lastActivityTimestamp = null;
        let messaging = null;
        const VAPID_PUBLIC_KEY = 'BOo1psv4kSDGAgxMpMgYOTZRx1rnx5uDhN329QMoz3LmlaZvHkQrlFNwS2A-MYD8TIX3x_JEKDyZSNEZ2HrHi1U'; // <-- Put your Firebase Web Push certificates (VAPID) Public Key here
        const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMd88SpoSVXIMYVBkKf9NYbD1OYuE2i_h51cnbu_ekdiAoMyT5N3oXR0Gi10fENsPk/exec';
        const PUSH_SECRET = '_XZAtN4drI35Q1Rw2N_j-DG0XWuX0sRyAgVVHbrdbgY';
        let selectedProfilePicFile = null;
        const CLOUDINARY_CLOUD_NAME = "y2k19sbu";
        const CLOUDINARY_UPLOAD_PRESET = "amar_elaka_preset";
        let selectedPackage = { name: '1 Month', amount: 50, days: 30 };
        let selectedPaymentMethod = null;
        let isUserPremium = false;
        let premiumLaunchEnabled = true; // from appSettings/config — admin can hide entire premium system
        let unsubAppSettings = null;
        let isAdminOnline = false;

        const DEFAULT_PACKAGES = [
            { id: 'pkg_1m', name: '1 Month', price: 50, days: 30, active: true },
            { id: 'pkg_2m', name: '2 Months', price: 80, days: 60, active: true },
            { id: 'pkg_3m', name: '3 Months', price: 120, days: 90, active: true },
            { id: 'pkg_6m', name: '6 Months', price: 200, days: 180, active: true },
            { id: 'pkg_12m', name: '12 Months', price: 400, days: 365, active: true }
        ];
        const DEFAULT_PAYMENT_NUMBERS = { bkash: '01754285309', nagad: '01754285309', rocket: '01754285309' };
        let subscriptionPackages = DEFAULT_PACKAGES.map(p => ({ ...p }));
        let paymentNumbers = { ...DEFAULT_PAYMENT_NUMBERS };

        // Backward-compatible map built from live packages
        let PLAN_DAYS_MAP = { '1 Month':30,'2 Months':60,'3 Months':90,'6 Months':180,'12 Months':365 };
        function rebuildPlanDaysMap() {
            const map = {};
            (subscriptionPackages || []).forEach(p => {
                if (p && p.name) map[p.name] = Number(p.days) || 30;
            });
            PLAN_DAYS_MAP = Object.keys(map).length ? map : { '1 Month':30,'2 Months':60,'3 Months':90,'6 Months':180,'12 Months':365 };
        }

        // ========== PREMIUM LAUNCH (admin controlled) ==========
        function isPremiumSystemLive() {
            return premiumLaunchEnabled !== false;
        }
        function applyPremiumLaunchUI() {
            const live = isPremiumSystemLive();
            document.body.classList.toggle('premium-off', !live);
            // If currently on subscription/payment while system is off, leave those views
            if (!live && (currentTab === 'subscription' || currentTab === 'payment')) {
                try { switchTab('services'); } catch (e) {}
            }
            // Recompute premium UI (blue ticks etc.) from profile
            if (typeof updateProfileUI === 'function' && userProfile) {
                try { updateProfileUI(); } catch (e) {}
            } else if (!live) {
                // Force hide blue badges even without profile
                const bBadge = document.getElementById('profileBlueBadge');
                const sBadge = document.getElementById('sidebarBlueBadge');
                if (bBadge) bBadge.classList.add('hidden');
                if (sBadge) sBadge.classList.add('hidden');
                isUserPremium = false;
            }
            if (typeof updateCurrentPlanDisplay === 'function') {
                try { updateCurrentPlanDisplay(); } catch (e) {}
            }
            if (window.lucide) try { refreshIcons(); } catch (e) {}
        }
        function attachAppSettingsListener() {
            if (!firebaseReady || typeof onSnapshot !== 'function') return;
            if (unsubAppSettings) { try { unsubAppSettings(); } catch (e) {} unsubAppSettings = null; }
            unsubAppSettings = onSnapshot(doc(db, 'appSettings', 'config'), (snap) => {
                if (snap.exists()) {
                    const d = snap.data() || {};
                    // Missing field = treat as ON (backward compatible)
                    premiumLaunchEnabled = d.premiumEnabled !== false;
                    if (Array.isArray(d.packages) && d.packages.length) {
                        subscriptionPackages = d.packages.map(p => ({
                            id: p.id || ('pkg_' + Math.random().toString(36).slice(2, 8)),
                            name: p.name || 'Package',
                            price: Number(p.price) || 0,
                            days: Number(p.days) || 30,
                            active: p.active !== false
                        }));
                    } else {
                        subscriptionPackages = DEFAULT_PACKAGES.map(p => ({ ...p }));
                    }
                    if (d.paymentNumbers && typeof d.paymentNumbers === 'object') {
                        paymentNumbers = {
                            bkash: d.paymentNumbers.bkash || DEFAULT_PAYMENT_NUMBERS.bkash,
                            nagad: d.paymentNumbers.nagad || DEFAULT_PAYMENT_NUMBERS.nagad,
                            rocket: d.paymentNumbers.rocket || DEFAULT_PAYMENT_NUMBERS.rocket
                        };
                    } else {
                        paymentNumbers = { ...DEFAULT_PAYMENT_NUMBERS };
                    }
                } else {
                    premiumLaunchEnabled = true;
                    subscriptionPackages = DEFAULT_PACKAGES.map(p => ({ ...p }));
                    paymentNumbers = { ...DEFAULT_PAYMENT_NUMBERS };
                }
                rebuildPlanDaysMap();
                renderSubscriptionPackages();
                updatePaymentNumberDisplay();
                applyPremiumLaunchUI();
                try { applyDownloadConfigFromSettings(snap.exists() ? (snap.data() || {}) : {}); } catch (e) {}
            }, (err) => {
                console.warn('appSettings listener:', err?.code || err?.message);
                premiumLaunchEnabled = true;
                subscriptionPackages = DEFAULT_PACKAGES.map(p => ({ ...p }));
                paymentNumbers = { ...DEFAULT_PAYMENT_NUMBERS };
                rebuildPlanDaysMap();
                renderSubscriptionPackages();
                updatePaymentNumberDisplay();
                applyPremiumLaunchUI();
            });
        }

        function getUserCurrentPackageDays() {
            if (!isUserPremium || !userProfile) return 0;
            // Prefer explicit pending/current plan days
            const planName = userProfile.premiumPlan || userProfile.currentPlan || userProfile.pendingPremiumPlan || '';
            if (planName && PLAN_DAYS_MAP[planName]) return Number(PLAN_DAYS_MAP[planName]) || 0;
            // Fallback from premiumExpiry remaining roughly doesn't tell original package
            // Use stored days if available
            if (userProfile.premiumDays) return Number(userProfile.premiumDays) || 0;
            if (userProfile.pendingPremiumDays) return Number(userProfile.pendingPremiumDays) || 0;
            return 0;
        }

        function renderSubscriptionPackages() {
            const grid = document.getElementById('packagesGrid');
            if (!grid) return;
            const list = (subscriptionPackages || []).filter(p => p && p.active !== false && Number(p.price) > 0);
            // Cancel subscription button area
            let cancelHtml = '';
            if (isUserPremium) {
                cancelHtml = `<div class="col-span-full mt-4 pt-4 border-t border-emerald-900/30 text-center">
                    <button type="button" onclick="requestSubscriptionCancel()" class="text-sm font-bold text-rose-400 hover:text-rose-300 underline underline-offset-2 transition">
                        আপনার সাবস্ক্রিপশন বাতিল করুন
                    </button>
                </div>`;
            }
            if (!list.length) {
                grid.innerHTML = '<p class="text-slate-500 text-sm col-span-full text-center py-6">এখন কোনো প্যাকেজ উপলব্ধ নেই।</p>' + cancelHtml;
                return;
            }
            const userDays = getUserCurrentPackageDays();
            const userPrice = isUserPremium ? (Number(userProfile?.premiumAmount || userProfile?.pendingPremiumAmount || 0)) : 0;
            // Sort by days ascending
            list.sort((a, b) => (Number(a.days) || 0) - (Number(b.days) || 0));

            // Keep selectedPackage in sync if still valid (prefer first available/unlocked)
            const still = list.find(p => p.name === selectedPackage?.name && Number(p.price) === Number(selectedPackage?.amount));
            if (!still) {
                const firstAvail = list.find(p => {
                    const d = Number(p.days) || 30;
                    if (!isUserPremium) return true;
                    if (userDays > 0 && d <= userDays) return false;
                    const curName = (userProfile?.premiumPlan || userProfile?.currentPlan || '').toLowerCase();
                    if (curName && String(p.name || '').toLowerCase() === curName) return false;
                    return true;
                }) || list[0];
                if (firstAvail) {
                    selectedPackage = { name: firstAvail.name, amount: Number(firstAvail.price), days: Number(firstAvail.days) || 30 };
                    const n = document.getElementById('paySelectedPackageName');
                    const a = document.getElementById('paySelectedPackageAmount');
                    if (n) n.textContent = selectedPackage.name;
                    if (a) a.textContent = '৳' + selectedPackage.amount;
                }
            }
            grid.innerHTML = list.map(p => {
                const name = String(p.name || 'Package');
                const price = Number(p.price) || 0;
                const days = Number(p.days) || 30;
                const safeName = name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                // Disable same or lower packages when user already has active subscription
                let disabled = false;
                if (isUserPremium) {
                    const curName = (userProfile?.premiumPlan || userProfile?.currentPlan || '').toLowerCase();
                    if (curName && name.toLowerCase() === curName) disabled = true;
                    else if (userDays > 0 && days <= userDays) disabled = true;
                    else if (userDays === 0 && userPrice > 0 && price <= userPrice) disabled = true;
                }
                if (disabled) {
                    return `<div class="package-card opacity-50 pointer-events-none cursor-not-allowed relative" data-pkg-id="${esc(p.id || '')}">
                        <div class="absolute top-2 right-2 text-[9px] font-bold bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">Locked</div>
                        <div class="package-duration">${esc(name)}</div>
                        <div class="package-price">৳${price}</div>
                        <p class="text-[10px] text-slate-400 mt-1">${days} দিন</p>
                        <button type="button" disabled class="mt-3 w-full bg-slate-800 text-slate-500 text-xs font-bold py-2 rounded-lg border border-slate-700 cursor-not-allowed">Unavailable</button>
                    </div>`;
                }
                return `<div class="package-card" data-pkg-id="${esc(p.id || '')}" onclick="selectPackage('${safeName}', ${price}, this, ${days})">
                    <div class="package-duration">${esc(name)}</div>
                    <div class="package-price">৳${price}</div>
                    <p class="text-[10px] text-slate-400 mt-1">${days} দিন</p>
                    <button type="button" class="mt-3 w-full bg-emerald-900/50 text-emerald-300 text-xs font-bold py-2 rounded-lg border border-emerald-700/50">Get Subscription</button>
                </div>`;
            }).join('') + cancelHtml;
            if (window.lucide) try { refreshIcons(); } catch (e) {}
        }

        function getPaymentNumberForMethod(method) {
            const m = String(method || selectedPaymentMethod || '').toLowerCase();
            if (m === 'bkash') return paymentNumbers.bkash || DEFAULT_PAYMENT_NUMBERS.bkash;
            if (m === 'nagad') return paymentNumbers.nagad || DEFAULT_PAYMENT_NUMBERS.nagad;
            if (m === 'rocket') return paymentNumbers.rocket || DEFAULT_PAYMENT_NUMBERS.rocket;
            // fallback: first non-empty
            return paymentNumbers.bkash || paymentNumbers.nagad || paymentNumbers.rocket || DEFAULT_PAYMENT_NUMBERS.bkash;
        }

        function maskPaymentNumber(num) {
            const s = String(num || '').replace(/\s/g, '');
            if (s.length < 5) return s || '—';
            return s.slice(0, 2) + '*'.repeat(Math.max(0, s.length - 5)) + s.slice(-3);
        }
        function updatePaymentNumberDisplay() {
            const el = document.getElementById('paymentNumberDisplay');
            if (!el) return;
            const full = getPaymentNumberForMethod(selectedPaymentMethod);
            el.textContent = maskPaymentNumber(full);
            el.setAttribute('data-full-number', full);
        }


        const RATE_LIMITS = { chat: 1000, feedback: 60000, provider: 300000, subscription: 60000, promotion: 86400000 };
        const CHAT_READ_MAX = 500;

        // ===== Infinite Random Shuffle Loader =====
        const SERVICES_BATCH_SIZE = 12;
        let servicesCache = [];
        let servicesSeenIds = new Set();
        let servicesLoading = false;
        let servicesObserver = null;
        let servicesFirstLoadDone = false;

        let allServiceIds = [];
        let shuffledIds = [];
        let currentBatchIndex = 0;
        let servicesLoopCount = 0;
        let allServicesFullCache = null;

        // Independent, endlessly repeating randomized advertisement feed.
        // Ads are generated only as the service feed grows, so scrolling can
        // continue indefinitely without exhausting the available promotions.
        let adFeedCards = [];
        let adShufflePool = [];
        let adShuffleIndex = 0;
        let adLastShownId = null;
        let adPoolSignature = '';

        function resetAdFeedState() {
            adFeedCards = [];
            adShufflePool = [];
            adShuffleIndex = 0;
            adLastShownId = null;
            adPoolSignature = '';
        }

        let lastRenderedCount = 0;
        let lastAdCountAtRender = -1;
        let animationQueueCounter = 0;
        let wasInSearchMode = false;

        let noticeSliderInterval = null;
        let currentNoticeIndex = 0;
        let currentVisibleNotices = [];

        let userFavorites = new Set();
        let favoritesCache = [];
        let favoritesLoaded = false;
        let activeServiceId = null;
        let selectedProviderImage = null;

        // HELPER FUNCTION
        function isProfileComplete(profile) {
            if (!profile) return false;
            const hasPhone = profile.phone && /^01[3-9]\d{8}$/.test(profile.phone);
            const hasDistrict = profile.district && profile.district.trim().length > 0;
            const hasUpazila = profile.upazila && profile.upazila.trim().length > 0;
            return hasPhone && hasDistrict && hasUpazila;
        }

        function checkRateLimit(action) {
            const cooldown = RATE_LIMITS[action];
            if (!cooldown) return { allowed: true, remaining: 0 };
            const key = `rate-${action}-${currentUid()}`;
            const lastTime = parseInt(lsGet(key, '0') || '0', 10);
            const elapsed = Date.now() - lastTime;
            if (elapsed < cooldown) return { allowed: false, remaining: Math.ceil((cooldown - elapsed) / 1000) };
            return { allowed: true, remaining: 0 };
        }
        function setRateLimit(action) { lsSet(`rate-${action}-${currentUid()}`, String(Date.now())); }

        // ========== SOUND EFFECTS (Web Audio – no external files) ==========
        let _aeAudioCtx = null;
        let _aeAudioUnlocked = false;
        function _aeGetCtx() {
            try {
                if (!_aeAudioCtx) {
                    const AC = window.AudioContext || window.webkitAudioContext;
                    if (!AC) return null;
                    _aeAudioCtx = new AC();
                }
                if (_aeAudioCtx.state === 'suspended') _aeAudioCtx.resume().catch(() => {});
                return _aeAudioCtx;
            } catch (e) { return null; }
        }
        function _aeTone(freq, duration, type, vol, when) {
            const ctx = _aeGetCtx();
            if (!ctx) return;
            const t0 = (when != null ? when : ctx.currentTime);
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq, t0);
            gain.gain.setValueAtTime(0.0001, t0);
            gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, vol || 0.12), t0 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t0);
            osc.stop(t0 + duration + 0.02);
        }
        /** @param {'success'|'error'|'notify'|'message'|'send'|'ring'|'login'|'tap'} kind */
        window.playAppSound = (kind) => {
            try {
                const ctx = _aeGetCtx();
                if (!ctx) return;
                const t = ctx.currentTime;
                switch (kind) {
                    case 'success':
                        _aeTone(523.25, 0.12, 'sine', 0.11, t);
                        _aeTone(659.25, 0.14, 'sine', 0.10, t + 0.11);
                        _aeTone(783.99, 0.18, 'sine', 0.09, t + 0.22);
                        break;
                    case 'error':
                        _aeTone(220, 0.18, 'square', 0.07, t);
                        _aeTone(180, 0.22, 'square', 0.06, t + 0.14);
                        break;
                    case 'notify':
                        _aeTone(880, 0.10, 'sine', 0.10, t);
                        _aeTone(1174.66, 0.16, 'sine', 0.09, t + 0.12);
                        break;
                    case 'message':
                        _aeTone(698.46, 0.08, 'triangle', 0.09, t);
                        _aeTone(880, 0.12, 'triangle', 0.08, t + 0.09);
                        break;
                    case 'send':
                        _aeTone(640, 0.07, 'sine', 0.08, t);
                        _aeTone(960, 0.10, 'sine', 0.07, t + 0.06);
                        break;
                    case 'ring':
                        for (let i = 0; i < 3; i++) {
                            _aeTone(740, 0.12, 'sine', 0.10, t + i * 0.28);
                            _aeTone(980, 0.12, 'sine', 0.09, t + i * 0.28 + 0.12);
                        }
                        break;
                    case 'login':
                        _aeTone(392, 0.12, 'sine', 0.10, t);
                        _aeTone(523.25, 0.14, 'sine', 0.10, t + 0.12);
                        _aeTone(659.25, 0.18, 'sine', 0.09, t + 0.26);
                        break;
                    case 'tap':
                        _aeTone(600, 0.04, 'sine', 0.05, t);
                        break;
                    default:
                        _aeTone(600, 0.08, 'sine', 0.08, t);
                }
            } catch (e) {}
        };
        // Unlock audio on first user gesture (required by mobile browsers)
        function _aeUnlockAudio() {
            if (_aeAudioUnlocked) return;
            _aeAudioUnlocked = true;
            const ctx = _aeGetCtx();
            if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
            // silent tick to fully unlock
            try {
                const t = ctx.currentTime;
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                g.gain.value = 0.00001;
                osc.connect(g); g.connect(ctx.destination);
                osc.start(t); osc.stop(t + 0.01);
            } catch (e) {}
            document.removeEventListener('pointerdown', _aeUnlockAudio, true);
            document.removeEventListener('touchstart', _aeUnlockAudio, true);
            document.removeEventListener('keydown', _aeUnlockAudio, true);
        }
        document.addEventListener('pointerdown', _aeUnlockAudio, true);
        document.addEventListener('touchstart', _aeUnlockAudio, true);
        document.addEventListener('keydown', _aeUnlockAudio, true);

        let toastTimer = null;
        window.showToast = (msg, iconName = 'circle-check', colorClass = 'text-emerald-400') => {
            const toast = document.getElementById('toast');
            if (!toast) return;
            if (toastTimer) clearTimeout(toastTimer);
            document.getElementById('toastMessage').textContent = (typeof translateUiMessage === 'function') ? translateUiMessage(msg) : msg;
            const wrap = document.getElementById('toastIconWrap');
            if (wrap) { wrap.innerHTML = `<i data-lucide="${esc(iconName)}" class="w-5 h-5 ${colorClass}"></i>`; refreshIcons(); }
            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
            toastTimer = setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3200);
            // Sound from toast type
            try {
                const c = String(colorClass || '');
                const ic = String(iconName || '');
                if (c.includes('rose') || ic.includes('circle-x') || ic.includes('triangle-alert') || ic.includes('alert')) {
                    playAppSound('error');
                } else if (ic.includes('log-in') || ic.includes('user-plus') || ic.includes('sparkles')) {
                    playAppSound('login');
                } else if (ic.includes('bell') || ic.includes('megaphone')) {
                    playAppSound('notify');
                } else if (ic.includes('wifi-off') || ic.includes('clock')) {
                    playAppSound('tap');
                } else {
                    playAppSound('success');
                }
            } catch (e) {}
        };

        // ========== THEME SYSTEM (Light / Dark / System) ==========
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        window.setTheme = (theme) => {
            currentTheme = theme;
            localStorage.setItem('amar-elaka-theme', theme);
            applyTheme();
            saveThemeToAccount(theme);
            showToast(theme === 'light' ? 'লাইট মোড চালু হয়েছে' : (theme === 'dark' ? 'ডার্ক মোড চালু হয়েছে' : 'সিস্টেম থিম চালু হয়েছে'), 'palette', 'text-emerald-400');
        };

        function applyTheme() {
            let isDark = false;
            
            if (currentTheme === 'dark') {
                isDark = true;
            } else if (currentTheme === 'light') {
                isDark = false;
            } else {
                isDark = darkModeMediaQuery.matches;
            }

            if (isDark) {
                document.body.classList.remove('light-mode');
                document.documentElement.classList.add('dark');
            } else {
                document.body.classList.add('light-mode');
                document.documentElement.classList.remove('dark');
            }

            updateThemeButtonsUI();
        }

        darkModeMediaQuery.addEventListener('change', (e) => {
            if (currentTheme === 'system') {
                applyTheme();
            }
        });

        function updateThemeButtonsUI() {
            const btns = ['light', 'dark', 'system'];
            btns.forEach(t => {
                const btn = document.getElementById(`themeBtn-${t}`);
                if (btn) {
                    if (t === currentTheme) {
                        btn.className = 'theme-btn flex flex-col items-center justify-center gap-1 py-2 rounded-lg text-xs font-bold active';
                    } else {
                        btn.className = 'theme-btn flex flex-col items-center justify-center gap-1 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white';
                    }
                }
            });
        }


        // ----- Theme saved per account (Firestore users/{uid}.theme); localStorage is only a fast cache -----
        let themeMigratedUid = null;
        async function saveThemeToAccount(theme) {
            try {
                if (!firebaseReady || !currentUser || !db) return;
                await setDoc(doc(db, 'users', currentUser.uid), { theme }, { merge: true });
            } catch (e) { console.warn('Theme save:', e.code || e.message); }
        }
        function syncThemeFromProfile(profile) {
            if (!profile || !currentUser) return;
            const valid = ['light', 'dark', 'system'];
            if (valid.includes(profile.theme)) {
                if (profile.theme !== currentTheme) {
                    currentTheme = profile.theme;
                    try { localStorage.setItem('amar-elaka-theme', currentTheme); } catch (e) {}
                    applyTheme();
                }
            } else if (themeMigratedUid !== currentUser.uid) {
                // Existing account with no saved theme yet: save the theme this browser is using
                themeMigratedUid = currentUser.uid;
                saveThemeToAccount(currentTheme);
            }
        }

        currentTheme = localStorage.getItem('amar-elaka-theme') || 'light';
        applyTheme();

        // ========== LANGUAGE SYSTEM (bn / en) ==========
        let currentLang = localStorage.getItem('amar-elaka-lang') || 'bn';
        const I18N = {
            bn: {
                'settings.theme': 'অ্যাপের থিম',
                'settings.themeDesc': 'আপনার পছন্দমতো থিম বেছে নিন',
                'settings.light': 'লাইট',
                'settings.dark': 'ডার্ক',
                'settings.system': 'সিস্টেম',
                'settings.language': 'ভাষা / Language',
                'settings.languageDesc': 'অ্যাপের ভাষা পরিবর্তন করুন',
                'settings.title': 'সেটিংস',
                'settings.subtitle': 'অ্যাপ কাস্টমাইজ করুন',
                'settings.website': 'আমাদের ওয়েবসাইট',
                'settings.downloadApp': 'অ্যাপ ডাউনলোড',
                'download.title': 'অ্যাপ ডাউনলোড',
                'download.subtitle': 'মূল অ্যাপ বা অন্যান্য সোর্স থেকে ডাউনলোড করুন',
                'download.mainBtn': 'ডাউনলোড অ্যাপ্লিকেশন',
                'download.mainDesc': 'মূল অফিসিয়াল লিংক',
                'download.otherBtn': 'অন্যান্য সোর্স থেকে ডাউনলোড',
                'download.otherDesc': 'বিকল্প ডাউনলোড লিংকসমূহ',
                'download.otherTitle': 'অন্যান্য সোর্স',
                'download.otherSubtitle': 'Admin নির্ধারিত ডাউনলোড সোর্স',
                'download.loading': 'লোড হচ্ছে...',
                'download.empty': 'কোনো ডাউনলোড সোর্স পাওয়া যায়নি',
                'download.tapToOpen': 'ট্যাপ করে ডাউনলোড করুন',
                'download.noMainLink': 'ডাউনলোড লিংক এখনো সেট করা হয়নি',
                'download.invalidLink': 'লিংক পাওয়া যায়নি',

                'nav.home': 'হোম',
                'nav.emergency': 'জরুরি',
                'nav.blood': 'রক্ত',
                'nav.profile': 'প্রোফাইল',
                'nav.support': 'Admin Support',
                'nav.favorites': 'পছন্দ',
                'nav.notif': 'নোটিফিকেশন',
                'nav.news': 'খবর', 'nav.launch': 'লঞ্চের সময়সূচী', 'nav.map': 'লাইভ ম্যাপ', 'news.bd': 'বাংলাদেশ', 'news.world': 'বিশ্ব',
                'news.empty': 'এখন কোনো খবর পাওয়া যায়নি', 'news.loading': 'খবর লোড হচ্ছে...',
                'news.error': 'খবর আনা যায়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন।', 'news.retry': 'আবার চেষ্টা করুন',
                'sidebar.settings': 'সেটিংস',
                'sidebar.about': 'আমাদের সম্বন্ধে',
                'sidebar.terms': 'শর্তাবলী ও নীতিমালা',
                'sidebar.share': 'অ্যাপটি শেয়ার করুন',
                'sidebar.rate': 'রেটিং দিন',
                'sidebar.logout': 'লগ আউট',
                'sidebar.favorites': 'আমার পছন্দ',
                'sidebar.feedback': 'মতামত দিন',
                'sidebar.contact': 'যোগাযোগ',
                'sidebar.premium': 'প্রিমিয়াম',
                'rating.title': 'আমাদের রেটিং দিন',
                'rating.subtitle': 'আপনার অভিজ্ঞতা অনুযায়ী রেটিং দিন',
                'rating.commentLabel': 'আপনার মতামত লিখুন (ঐচ্ছিক)',
                'rating.commentPlaceholder': 'আপনার অভিজ্ঞতা আমাদের জানান...',
                'rating.submit': 'রেটিং পাঠান',
                'rating.resubmit': 'পুনরায় রেটিং পাঠান',
                'rating.yourRating': 'আপনার দেওয়া রেটিং',
                'rating.submitted': 'জমা হয়েছে',
                'rating.edit': 'রেটিং এডিট করুন',
                'rating.loginRequired': 'রেটিং দিতে প্রথমে লগইন করুন',
                'rating.selectStar': 'কমপক্ষে ১টি স্টার দিন',
                'rating.thanks': 'ধন্যবাদ! আপনার রেটিং জমা হয়েছে',
                'rating.updated': 'রেটিং আপডেট হয়েছে',
                'toast.langBn': 'ভাষা: বাংলা',
                'toast.langEn': 'Language: English',
                'auth.login': 'লগইন',
                'auth.register': 'রেজিস্ট্রেশন',
                'auth.email': 'ইমেইল',
                'auth.password': 'পাসওয়ার্ড',
                'auth.fullName': 'পূর্ণ নাম',
                'auth.loginBtn': 'লগইন করুন',
                'auth.registerBtn': 'রেজিস্ট্রেশন করুন',
                'auth.or': 'অথবা',
                'auth.google': 'Google দিয়ে চালিয়ে যান',
                'auth.github': 'GitHub দিয়ে চালিয়ে যান',
                'auth.guest': 'অতিথি হিসেবে দেখুন',
                'auth.welcome': 'স্বাগতম',
                'auth.loginTitle': 'আবার স্বাগতম',
                'auth.registerTitle': 'নতুন অ্যাকাউন্ট',
                'common.call': 'কল করুন',
                'common.share': 'শেয়ার',
                'common.website': 'ওয়েবসাইট',
                'common.close': 'বন্ধ',
                'common.save': 'সংরক্ষণ',
                'common.cancel': 'বাতিল',
                'common.search': 'খুঁজুন...',
                'common.loading': 'লোড হচ্ছে...',
                'common.details': 'বিস্তারিত বর্ণনা',
                'prov.media': 'সেবার মিডিয়া (ঐচ্ছিক)',
                'prov.typeImage': 'ছবি',
                'prov.typeVideo': 'ভিডিও',
                'prov.videoLabel': 'ভিডিও লিংক *',
                'prov.videoPlaceholder': 'https://youtube.com/watch?v=... / https://example.com/video.mp4',
                'prov.videoHint': 'YouTube / Facebook / সরাসরি .mp4 লিংক। সরাসরি ভিডিও অবশ্যই 1920x1080 (HD) হতে হবে।',
                'prov.videoRequired': 'ভিডিও লিংক দিন',
                'prov.videoInvalid': 'ভিডিও লিংক সঠিক নয় (http/https দিয়ে শুরু করুন)',
                'prov.videoRes': 'অনুগ্রহ করে 1920x1080 (HD) রেজোলিউশনের ভিডিও ব্যবহার করুন।',
                'prov.videoMeta': 'ভিডিওটি লোড করা যায়নি। লিংকটি সরাসরি, পাবলিক ও https ভিডিও ফাইলের (যেমন .mp4) কিনা দেখুন।',
                'prov.videoChecking': 'ভিডিও যাচাই হচ্ছে...',
                'common.provider': 'সেবাদানকারী',
                'common.location': 'অবস্থান',
                'common.noData': 'কোনো তথ্য নেই',
                'common.offline': 'অফলাইন — সংরক্ষিত ডেটা দেখানো হচ্ছে',
                'promo.advertiser': 'বিজ্ঞাপনদাতা',
                'promo.details': 'বিস্তারিত বর্ণনা',
                'promo.sponsored': 'স্পন্সরড',
                'promo.ad': 'AD',
                'service.call': 'কল করুন',
                'service.website': 'ওয়েবসাইট',
                'service.share': 'সেবাটি শেয়ার করুন',
                'service.favorite': 'পছন্দ',
                'profile.edit': 'প্রোফাইল এডিট',
                'profile.phone': 'ফোন',
                'profile.email': 'ইমেইল',
                'profile.address': 'ঠিকানা',
                'profile.logout': 'লগ আউট',
                'emergency.title': 'জরুরি হেল্পলাইন',
                'blood.title': 'রক্তদাতা',
                'blood.search': 'রক্তের গ্রুপ / নাম / এলাকা',
                'chat.placeholder': 'মেসেজ লিখুন...',
                'chat.send': 'পাঠান',
                'chat.support': 'Admin Support',
                'notice.title': 'নোটিশ',
                'categories.title': 'সকল ক্যাটাগরি',
                'categories.subtitle': 'ক্যাটাগরি নির্বাচন করে সার্ভিস খুঁজুন',
                'premium.title': 'প্রিমিয়াম',
                'guest.preview': 'অতিথি প্রিভিউ',
                'logout.confirm': 'আপনি কি সত্যিই লগআউট করতে চান?',
                'logout.done': 'লগআউট হয়েছে',
                'logout.fail': 'লগআউট ব্যর্থ',
            },
            en: {
                'settings.theme': 'App Theme',
                'settings.themeDesc': 'Choose your preferred theme',
                'settings.light': 'Light',
                'settings.dark': 'Dark',
                'settings.system': 'System',
                'settings.language': 'Language',
                'settings.languageDesc': 'Change app language',
                'settings.title': 'Settings',
                'settings.subtitle': 'Customize the app',
                'settings.website': 'Visit our website',
                'settings.downloadApp': 'Download App',
                'download.title': 'Download App',
                'download.subtitle': 'Download from main or other sources',
                'download.mainBtn': 'Download App',
                'download.mainDesc': 'Official primary link',
                'download.otherBtn': 'Download from Other Sources',
                'download.otherDesc': 'Alternative download links',
                'download.otherTitle': 'Other Sources',
                'download.otherSubtitle': 'Admin configured download sources',
                'download.loading': 'Loading...',
                'download.empty': 'No download sources available',
                'download.tapToOpen': 'Tap to download',
                'download.noMainLink': 'Download link is not set yet',
                'download.invalidLink': 'Link not found',

                'nav.home': 'Home',
                'nav.emergency': 'Emergency',
                'nav.blood': 'Blood',
                'nav.profile': 'Profile',
                'nav.support': 'Admin Support',
                'nav.favorites': 'Favorites',
                'nav.notif': 'Notifications',
                'nav.news': 'News', 'nav.launch': 'Launch Schedule', 'nav.map': 'Live Map', 'news.bd': 'Bangladesh', 'news.world': 'World',
                'news.empty': 'No news available right now', 'news.loading': 'Loading news...',
                'news.error': 'Could not load news. Check your connection and try again.', 'news.retry': 'Try again',
                'sidebar.settings': 'Settings',
                'sidebar.about': 'About Us',
                'sidebar.terms': 'Terms & Policy',
                'sidebar.share': 'Share App',
                'sidebar.rate': 'Rate Us',
                'sidebar.logout': 'Log Out',
                'sidebar.favorites': 'My Favorites',
                'sidebar.feedback': 'Feedback',
                'sidebar.contact': 'Contact',
                'sidebar.premium': 'Premium',
                'rating.title': 'Rate Us',
                'rating.subtitle': 'Rate according to your experience',
                'rating.commentLabel': 'Write your feedback (optional)',
                'rating.commentPlaceholder': 'Tell us about your experience...',
                'rating.submit': 'Submit Rating',
                'rating.resubmit': 'Update Rating',
                'rating.yourRating': 'Your Rating',
                'rating.submitted': 'Submitted',
                'rating.edit': 'Edit Rating',
                'rating.loginRequired': 'Please login to rate',
                'rating.selectStar': 'Please select at least 1 star',
                'rating.thanks': 'Thank you! Your rating has been submitted',
                'rating.updated': 'Rating updated',
                'toast.langBn': 'ভাষা: বাংলা',
                'toast.langEn': 'Language: English',
                'auth.login': 'Login',
                'auth.register': 'Register',
                'auth.email': 'Email',
                'auth.password': 'Password',
                'auth.fullName': 'Full name',
                'auth.loginBtn': 'Log in',
                'auth.registerBtn': 'Create account',
                'auth.or': 'or',
                'auth.google': 'Continue with Google',
                'auth.github': 'Continue with GitHub',
                'auth.guest': 'Continue as guest',
                'auth.welcome': 'Welcome',
                'auth.loginTitle': 'Welcome back',
                'auth.registerTitle': 'Create account',
                'common.call': 'Call',
                'common.share': 'Share',
                'common.website': 'Website',
                'common.close': 'Close',
                'common.save': 'Save',
                'common.cancel': 'Cancel',
                'common.search': 'Search...',
                'common.loading': 'Loading...',
                'common.details': 'Details',
                'prov.media': 'Service media (optional)',
                'prov.typeImage': 'Image',
                'prov.typeVideo': 'Video',
                'prov.videoLabel': 'Video URL *',
                'prov.videoPlaceholder': 'https://youtube.com/watch?v=... / https://example.com/video.mp4',
                'prov.videoHint': 'YouTube / Facebook / direct .mp4 link. Direct videos must be exactly 1920x1080 (HD).',
                'prov.videoRequired': 'Please enter a video URL',
                'prov.videoInvalid': 'Invalid video link (must start with http:// or https://)',
                'prov.videoRes': 'Please use a 1920x1080 (HD) resolution video.',
                'prov.videoMeta': 'Could not load the video. Make sure the link is a direct, public, https video file (e.g. .mp4).',
                'prov.videoChecking': 'Checking video...',
                'common.provider': 'Provider',
                'common.location': 'Location',
                'common.noData': 'No data',
                'common.offline': 'Offline — showing saved data',
                'promo.advertiser': 'Advertiser',
                'promo.details': 'Details',
                'promo.sponsored': 'Sponsored',
                'promo.ad': 'AD',
                'service.call': 'Call',
                'service.website': 'Website',
                'service.share': 'Share service',
                'service.favorite': 'Favorite',
                'profile.edit': 'Edit profile',
                'profile.phone': 'Phone',
                'profile.email': 'Email',
                'profile.address': 'Address',
                'profile.logout': 'Log out',
                'emergency.title': 'Emergency helplines',
                'blood.title': 'Blood donors',
                'blood.search': 'Blood group / name / area',
                'chat.placeholder': 'Type a message...',
                'chat.send': 'Send',
                'chat.support': 'Admin Support',
                'notice.title': 'Notices',
                'categories.title': 'All categories',
                'categories.subtitle': 'Pick a category to find services',
                'premium.title': 'Premium',
                'guest.preview': 'Guest preview',
                'logout.confirm': 'Do you really want to log out?',
                'logout.done': 'Logged out',
                'logout.fail': 'Logout failed',
            }
        };
        function t(key) {
            return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.bn[key]) || key;
        }
        function updateLangButtonsUI() {
            ['bn', 'en'].forEach(l => {
                const btn = document.getElementById('langBtn-' + l);
                if (!btn) return;
                if (l === currentLang) {
                    btn.className = 'lang-btn flex flex-col items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-bold active';
                    btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
                    btn.style.color = '#fff';
                } else {
                    btn.className = 'lang-btn flex flex-col items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white';
                    btn.style.background = '';
                    btn.style.color = '';
                }
            });
        }
        // ========== COMPLETE STATIC UI TRANSLATION LAYER ==========
        // This dictionary is intentionally limited to website-owned interface text.
        // Firebase/user-submitted values (names, addresses, donor details, service
        // descriptions, notices, chat messages, etc.) are excluded below.
        const STATIC_UI_EN = {
            'আগামী ৩ দিন': 'Next 3 days', 'পরশু': 'Day after tomorrow',
            'আমার এলাকা - সকল সেবা এখন হাতের মুঠোয়': 'Amar Elaka - All Services at Your Fingertips',
            'আমার এলাকা': 'Amar Elaka',
            'ইউজার সেবা পোর্টাল': 'User Service Portal',
            'আমার এলাকা - ইউজার সার্ভিস পোর্টাল': 'Amar Elaka - User Service Portal',
            'স্থানীয় পরিষেবা ও তথ্যের নির্ভরযোগ্য প্ল্যাটফর্ম': 'A trusted platform for local services and information',
            'আমার এলাকা। সর্বস্বত্ব সংরক্ষিত।': 'Amar Elaka. All rights reserved.',
            'আমার এলাকা — সর্বস্বত্ব সংরক্ষিত।': 'Amar Elaka — All rights reserved.',
            'লোড হচ্ছে...': 'Loading...', 'প্যাকেজ লোড হচ্ছে...': 'Loading packages...',
            'লগইন': 'Login', 'রেজিস্ট্রেশন': 'Register', 'স্বাগতম!': 'Welcome!',
            'আপনার অ্যাকাউন্টে প্রবেশ করুন': 'Sign in to your account', 'ইমেইল': 'Email',
            'ইমেইল *': 'Email *', 'পাসওয়ার্ড': 'Password', 'পাসওয়ার্ড *': 'Password *',
            'পূর্ণ নাম': 'Full name', 'পুরো নাম *': 'Full name *',
            'মোবাইল (১১ সংখ্যা) *': 'Mobile number (11 digits) *', 'জেলা *': 'District *',
            'উপজেলা *': 'Upazila *', 'কনফার্ম *': 'Confirm *',
            'প্রবেশ করুন': 'Sign in', 'লগইন করুন': 'Log in', 'রেজিস্ট্রেশন করুন': 'Create account',
            'নতুন অ্যাকাউন্ট': 'Create a new account', 'আজই যোগ দিন আমাদের সাথে': 'Join us today',
            'আমি': 'I have read, understood, and fully agree to the',
            'পড়েছি, বুঝেছি এবং এর সাথে সম্পূর্ণ সম্মত আছি।': 'and agree to the terms and policies.',
            'শর্তাবলী ও নীতিমালা': 'Terms & Policies', 'অথবা (OR)': 'OR', 'অথবা': 'OR',
            'Google দিয়ে চালিয়ে যান': 'Continue with Google', 'GitHub দিয়ে চালিয়ে যান': 'Continue with GitHub',
            'প্রবেশ করতে লগইন করা বাধ্যতামূলক': 'Login is required to access this feature',
            'আপনার তথ্য সম্পূর্ণ সুরক্ষিত ও এনক্রিপ্টেড': 'Your information is fully protected and encrypted',
            'অতিথি ব্যবহারকারী': 'Guest user', 'অতিথি হিসেবে দেখুন': 'Continue as guest',
            'আমার অ্যাকাউন্ট': 'My Account', 'সেবাসমূহ': 'Services', 'সকল সেবা সমূহ': 'All Services',
            'সকল সেবা': 'All Services', 'সেবা, হাসপাতাল বা টেকনিশিয়ান খুঁজুন...': 'Search services, hospitals, or technicians...',
            'জরুরী হেল্পলাইন': 'Emergency Helplines', 'জরুরি হেল্পলাইন': 'Emergency Helplines',
            'জরুরি বিভাগ শেয়ার করুন': 'Share Emergency Section', 'রক্তদাতা বিভাগ শেয়ার করুন': 'Share Blood Donor Section',
            'রক্তদাতা সন্ধান': 'Find Blood Donors', 'রক্তদাতা খুঁজুন': 'Find Blood Donors',
            'আপনার এলাকায় রক্তদাতাদের তালিকা': 'List of blood donors in your area',
            'সকল গ্রুপ': 'All Groups', 'সকল ক্যাটাগরি': 'All Categories',
            'ক্যাটাগরি নির্বাচন করে সার্ভিস খুঁজুন': 'Choose a category to find services',
            'ক্যাটাগরি খুঁজুন...': 'Search categories...', 'সেবা যোগ করা': 'Add a Service',
            'সেবা যোগ করুন': 'Add Service', 'সেবাদাতা আবেদন': 'Service Provider Application',
            'সেবা দাতা হিসেবে যোগদান': 'Join as a Service Provider', 'সেবাদাতা হিসেবে আবেদন করুন': 'Apply as a Service Provider',
            'সেবা দাতা হিসেবে যোগদান': 'Join as a Service Provider', 'সেবার ছবি (ঐচ্ছিক)': 'Service Image (Optional)',
            'সেবার নাম *': 'Service Name *', 'সেবাদাতার নাম *': 'Provider Name *',
            'যোগাযোগের নম্বর *': 'Contact Number *', 'সোশ্যাল / ওয়েবসাইট (ঐচ্ছিক)': 'Social / Website (Optional)',
            'বিস্তারিত বিবরণ *': 'Detailed Description *', 'বিস্তারিত বর্ণনা': 'Description',
            'বিস্তারিত বর্ণনা *': 'Detailed Description *', 'বিস্তারিত': 'Details',
            'পরবর্তী আবেদনের জন্য অপেক্ষা করুন...': 'Please wait before submitting another application...',
            'আবেদন জমা দিন': 'Submit Application', 'অ্যাডমিন অনুমোদনের পর হোমপেজে প্রকাশিত হবে': 'Will be published on the homepage after admin approval',
            'এডমিন পোস্ট': 'Admin Post', 'সেবাদানকারী': 'Service Provider', 'কল করুন': 'Call',
            'সেবা শেয়ার করুন': 'Share Service', 'সেবাটি শেয়ার করুন': 'Share this service',
            'স্পন্সরড': 'Sponsored', 'বিজ্ঞাপনদাতা': 'Advertiser', 'বিজ্ঞাপন': 'Advertisement',
            'বিজ্ঞাপন চালান': 'Promote Your Ad', 'আপনার পোস্ট প্রমোট করুন': 'Promote Your Post',
            'প্রমোশন পোস্ট': 'Promotional Post', 'বিজ্ঞাপন জমা দিন': 'Submit Advertisement',
            'ধাপ ১/৪ — প্রমোশনের ধরন': 'Step 1/4 — Promotion Type', 'আপনি কী প্রমোট করতে চান?': 'What would you like to promote?',
            'ছবি *': 'Image *', 'শিরোনাম * (৩-৮০ অক্ষর)': 'Title * (3–80 characters)',
            'সংক্ষিপ্ত বিবরণ * (৫-১৫০) — কার্ডে দেখাবে': 'Short Description * (5–150) — Shown on the card',
            'বিস্তারিত বর্ণনা * (১০-৬০০)': 'Detailed Description * (10–600)',
            'কার্ডে যা দেখাবে': 'Shown on the card', 'বিস্তারিত লিখুন': 'Enter details',
            'জেলা': 'District', 'উপজেলা': 'Upazila', 'কমপক্ষে ১টি বাটন বেছে নিন': 'Choose at least one button',
            'লাইভ প্রিভিউ': 'Live Preview', 'পিছনে': 'Back', 'পরের ধাপ': 'Next Step',
            'প্রিমিয়াম অ্যাকশন': 'Premium Actions', 'আপনার পছন্দমতো অপশন বেছে নিন': 'Choose your preferred option',
            'কেন আপনি বিজ্ঞাপন চালাবেন ?': 'Why should you promote an advertisement?',
            'বার্তা': 'Message', 'আপনার বার্তা লিখুন...': 'Write your message...',
            'অ্যাডমিন এখন অফলাইনে': 'Admin is currently offline',
            'অ্যাডমিন বর্তমানে অফলাইনে রয়েছেন। অ্যাডমিন অনলাইনে আসলে আপনি ভয়েস কল করতে পারবেন। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।': 'The admin is currently offline. You can make a voice call when the admin is online. Please try again later.',
            'ঠিক আছে': 'OK', 'কল প্রস্তুত করা হচ্ছে...': 'Preparing call...', 'বন্ধ করুন': 'Close',
            'মাইক্রোফোন বন্ধ বা চালু': 'Mute or unmute microphone', 'কল শেষ করুন': 'End Call',
            'নোটিফিকেশন': 'Notifications', 'সব পড়া হয়েছে': 'All caught up',
            'সব পড়া হিসেবে চিহ্নিত করুন': 'Mark all as read',
            'নতুন আপডেট স্বয়ংক্রিয়ভাবে এখানে দেখানো হবে': 'New updates will appear here automatically',
            'আমার': 'Amar', 'এলাকা': 'Elaka', 'নাগরিক সেবা': 'Citizen Services',
            'অ্যাডমিন চ্যাট': 'Admin Chat', 'অ্যাডমিন সাপোর্ট': 'Admin Support', 'অ্যাডমিন সাপোর্টের উত্তর': 'Admin Support Reply',
            'আরও (+)': 'More (+)', 'টি সেবা চলছে': 'services are active', 'লাইভ': 'Live',
            'আপনার সংরক্ষিত সকল সেবার তালিকা': 'List of all your saved services', 'অ্যাডমিন অনুরোধ': 'Admin Requests',
            'জরুরি': 'Emergency', 'হোম': 'Home', 'প্রোফাইল': 'Profile', 'পছন্দ': 'Favorites',
            'নারী ও শিশু নির্যাতন ঘটলে': 'For violence against women and children',
            'এখনই কল করুন': 'Call Now', 'পরিচয় গোপন': 'Confidential', '২৪ ঘণ্টা': '24 Hours',
            'হেল্পলাইন': 'Helpline', 'জরুরি মুহূর্তে যেকোনো সহায়তা পেতে নিচের হটলাইনে ক্লিক করে সরাসরি কল করুন।': 'For help in an emergency, tap one of the helplines below to call directly.',
            'সকল সেবা এখন হাতের মুঠোয়': 'All services at your fingertips', 'ফিচারসমূহ': 'Features',
            'সাধারণ': 'Basic', 'উন্নতমানের': 'Advanced', 'ফ্রি': 'Free', 'অ্যাড ব্লক': 'Ad Block',
            'প্রোফাইল ভেরিফাইড': 'Verified Profile', 'ব্লু ভেরিফাই ব্যাজ': 'Blue Verified Badge', 'আপগ্রেড নাও': 'Upgrade Now',
            'মোবাইল:': 'Mobile:', 'ইমেইল:': 'Email:', 'এলাকা:': 'Area:',
            'প্রোফাইল এডিট করুন': 'Edit Profile', 'প্রোফাইল এডিট': 'Edit Profile', 'প্রোফাইল সম্পূর্ণ করুন': 'Complete Profile',
            'লগআউট': 'Log Out', 'লগ আউট': 'Log Out', 'লগইন করুন': 'Log In',
            'স্ট্যাটাস:': 'Status:', 'স্ট্যাটাস': 'Status', 'যাচাইকৃত': 'Verified', 'যাচাই করুন': 'Verify Now',
            'স্ট্যাটাস:': 'Status:', 'পাসওয়ার্ড পরিবর্তন করুন': 'Change Password', 'পাসওয়ার্ড পরিবর্তন': 'Change Password',
            'নতুন পাসওয়ার্ড সেট করুন': 'Set a New Password', 'পুরনো পাসওয়ার্ড *': 'Current Password *',
            'নতুন পাসওয়ার্ড *': 'New Password *', 'কনফার্ম নতুন পাসওয়ার্ড *': 'Confirm New Password *',
            'সংরক্ষণ করুন': 'Save Changes', 'ছবি দিন': 'Add Photo', 'ছবি পরিবর্তন করতে ক্লিক করুন': 'Click to change photo',
            'ইমেইল পরিবর্তন করতে পারবেন না।': 'Email address cannot be changed.', 'সাপোর্টে যোগাযোগ করুন': 'Contact Support',
            'অপশন': 'Options', 'রিপোর্ট': 'Report', 'সমস্যা রিপোর্ট করুন': 'Report a Problem',
            'ওয়েবসাইট ফিডব্যাক': 'Website Feedback', 'মতামত ও পরামর্শ দিন': 'Send Feedback and Suggestions',
            'জরুরি তথ্য যোগ করুন': 'Add Emergency Information', 'অ্যাডমিন যাচাই করে হেল্পলাইনে যোগ করবেন': 'The admin will verify and add it to the helpline directory',
            'শিরোনাম *': 'Title *', 'জরুরি ফোন নাম্বার *': 'Emergency Phone Number *', 'ক্যাটাগরি *': 'Category *',
            'বিবরণ (ঐচ্ছিক)': 'Description (Optional)', 'আপনার মোবাইল নাম্বার *': 'Your Mobile Number *',
            'যাচাইয়ের প্রয়োজনে অ্যাডমিন আপনাকে কল করতে পারেন।': 'The admin may call you if verification is needed.',
            'রক্তদাতা হিসেবে যোগ দিন': 'Join as a Blood Donor', 'অ্যাডমিন যাচাই করে রক্তদাতা তালিকায় যোগ করবেন': 'The admin will verify and add you to the donor list',
            'আপনার তথ্য যাচাইয়ের পর অ্যাডমিন অনুমোদন করলে তালিকায় প্রকাশিত হবে।': 'Your information will appear in the list after admin verification and approval.',
            'নাম *': 'Name *', 'রক্তের গ্রুপ *': 'Blood Group *', '-- গ্রুপ নির্বাচন করুন --': '-- Select Blood Group --',
            'মোবাইল নাম্বার *': 'Mobile Number *', 'এলাকা (গ্রাম/বাজার/শহর) *': 'Area (Village/Market/City) *',
            'আপনার মতামত আমাদের কাছে গুরুত্বপূর্ণ': 'Your feedback matters to us', 'ধরন *': 'Type *',
            'অভিযোগ': 'Complaint', 'পরামর্শ': 'Suggestion', 'বিষয় *': 'Subject *', 'বিস্তারিত *': 'Details *',
            'পরবর্তী পাঠানোর জন্য অপেক্ষা করুন...': 'Please wait before sending another request...',
            'অ্যাপ কাস্টমাইজ করুন': 'Customize the App', 'অ্যাপের থিম': 'App Theme',
            'আপনার পছন্দমতো থিম বেছে নিন': 'Choose your preferred theme', 'লাইট': 'Light', 'ডার্ক': 'Dark', 'সিস্টেম': 'System',
            'ভাষা / Language': 'Language', 'অ্যাপের ভাষা পরিবর্তন করুন': 'Change the app language', 'বাংলা': 'Bengali',
            'আমাদের রেটিং দিন': 'Rate Us', 'আপনার অভিজ্ঞতা অনুযায়ী রেটিং দিন': 'Rate us based on your experience',
            'আপনার মতামত লিখুন (ঐচ্ছিক)': 'Write your feedback (Optional)', 'রেটিং পাঠান': 'Submit Rating',
            'আপনার দেওয়া রেটিং': 'Your Rating', 'জমা হয়েছে': 'Submitted', 'রেটিং এডিট করুন': 'Edit Rating',
            'রেটিং দিতে প্রথমে লগইন করুন': 'Please log in to submit a rating', 'কমপক্ষে ১টি স্টার দিন': 'Please select at least one star',
            'ধন্যবাদ! আপনার রেটিং জমা হয়েছে': 'Thank you! Your rating has been submitted', 'রেটিং আপডেট হয়েছে': 'Rating updated',
            'ভাষা: বাংলা': 'Language: Bengali', 'আমাদের সম্বন্ধে': 'About Us', 'আমাদের সম্পর্কে': 'About Us',
            'শর্তাবলী ও নীতিমালা': 'Terms & Policies', 'অ্যাপটি শেয়ার করুন': 'Share App', 'রেটিং দিন': 'Rate Us',
            'আমার পছন্দ': 'My Favorites', 'মতামত দিন': 'Feedback', 'যোগাযোগ': 'Contact', 'সেটিংস': 'Settings',
            'সেটিংস ও তথ্য': 'Settings & Information', 'সকল সেবা সমূহ': 'All Services', 'সহযোগিতা': 'Support',
            'সেবা দাতা হিসেবে যোগদান': 'Join as a Service Provider', 'আমাদের যাত্রা': 'Our Journey',
            'আমাদের লক্ষ্য': 'Our Mission', 'আমরা কী করতে চাই?': 'What Do We Want to Do?', 'আমাদের মূল দর্শন': 'Our Core Philosophy',
            'প্রযুক্তি ও AI সহযোগিতা': 'Technology and AI Assistance', 'আমাদের অঙ্গীকার': 'Our Commitment',
            '১. আমাদের সম্পর্কে': '1. About Us', '২. ব্যবহারের শর্তাবলী': '2. Terms of Use', '৩. গোপনীয়তা নীতিমালা': '3. Privacy Policy',
            '৪. রক্তদাতা নীতিমালা': '4. Blood Donor Policy', '৫. জরুরি সেবা নীতিমালা': '5. Emergency Service Policy',
            '৬. তথ্য ও সেবার নীতিমালা': '6. Information and Service Policy', '৭. পোস্ট ও প্রচার নীতিমালা': '7. Posting and Promotion Policy',
            '৮. আচরণবিধি (নিষিদ্ধ কাজসমূহ)': '8. Code of Conduct (Prohibited Activities)', '৯. অভিযোগ ও সহযোগিতা': '9. Complaints and Support',
            '১০. দায়বদ্ধতা ও সীমাবদ্ধতা': '10. Liability and Limitations', '১১. নীতিমালা পরিবর্তন': '11. Policy Changes', '১২. যোগাযোগ': '12. Contact',
            'যেকোনো প্রশ্ন, অভিযোগ, সহযোগিতা বা তথ্য সংশোধনের জন্য আমাদের সাথে যোগাযোগ করতে পারেন:': 'For questions, complaints, support, or information corrections, you can contact us:',
            'আমার এলাকা ফেসবুক পেজ': 'Amar Elaka Facebook Page', 'আমি বুঝেছি ও সম্মত আছি': 'I Understand and Agree',
            'BTEB রেজাল্ট সার্চ': 'BTEB Result Search', 'রেজাল্ট পেজ লোড হচ্ছে...': 'Loading result page...', 'PDF ডাউনলোড': 'Download PDF',
            'যোগাযোগ করুন': 'Contact Us', 'যেকোনো প্রয়োজনে বা সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন:': 'Contact us for any assistance or help:',
            'ইমেইল করুন': 'Email Us', 'ফেসবুক পেজ': 'Facebook Page', 'আমার এলাকা - Amar Elaka': 'Amar Elaka',
            'আপনার তথ্য আপডেট করুন': 'Update Your Information', 'পাসওয়ার্ড পরিবর্তন': 'Change Password', 'নতুন পাসওয়ার্ড সেট করুন': 'Set a New Password',
            'সমস্যা রিপোর্ট করুন': 'Report a Problem', 'ওয়েবসাইট ফিডব্যাক': 'Website Feedback', 'মতামত ও পরামর্শ দিন': 'Share Feedback and Suggestions',
            'সেবা যোগ করুন': 'Add a Service', 'সেবাদাতা হিসেবে আবেদন করুন': 'Apply as a Service Provider',
            'আপনার পোস্ট প্রমোট করুন': 'Promote Your Post', 'প্রমোশনের ধরন': 'Promotion Type', 'সাধারণ তথ্য': 'General Information',
            'অতিরিক্ত তথ্য': 'Additional Information', 'বাটন ও প্রিভিউ': 'Buttons and Preview',
            'এই ধরনের জন্য অতিরিক্ত তথ্য লাগবে না। পরের ধাপে যান।': 'No additional information is required for this type. Continue to the next step.',
            'প্রথমে প্রমোশনের ধরন বেছে নিন।': 'Choose a promotion type first.', 'বাটনের লেখা (যেমন: অফার দেখুন)': 'Button Label (e.g. View Offer)',
            'কাস্টম বাটনের লেখা দিন': 'Enter a custom button label', 'কাস্টম বাটনের সঠিক লিংক দিন (http/https)': 'Enter a valid custom button URL (http/https)',
            'শুধু JPG/PNG ছবি দিন': 'Only JPG/PNG images are allowed', 'ছবি সর্বোচ্চ ৩MB হতে পারবে': 'Image size must not exceed 3MB',
            'আপনার বিজ্ঞাপনের শিরোনাম': 'Your Ad Title', 'সংক্ষিপ্ত বিবরণ এখানে দেখাবে': 'The short description will appear here',
            'প্রমোশনের ধরন বেছে নিন': 'Choose a promotion type', 'ছবি আপলোড করুন': 'Upload an Image',
            'শিরোনাম ৩-৮০ অক্ষরের হতে হবে': 'Title must be 3–80 characters', 'সংক্ষিপ্ত বিবরণ ৫-১৫০ অক্ষরের হতে হবে': 'Short description must be 5–150 characters',
            'বিস্তারিত বর্ণনা ১০-৬০০ অক্ষরের হতে হবে': 'Detailed description must be 10–600 characters',
            'বিজ্ঞাপন চালাতে প্রিমিয়াম সাবস্ক্রিপশন কিনতে হবে': 'A premium subscription is required to run an advertisement',
            'প্রিমিয়াম সাবস্ক্রিপশন প্রয়োজন': 'Premium subscription required', '২৪ ঘণ্টায় ১টি বিজ্ঞাপন দেওয়া যায়': 'Only one advertisement can be submitted every 24 hours',
            'নোটিশের বিস্তারিত': 'Notice Details', 'আপনার অভিজ্ঞতা আমাদের জানান...': 'Tell us about your experience...',
            'নোটিশ': 'Notices', 'পাঠান': 'Send', 'মেসেজ লিখুন...': 'Type a message...', 'আপনার পুরো নাম': 'Your Full Name',
            'অভিজ্ঞতা, কাজের ধরন, সেবার সময়...': 'Experience, type of work, service hours...', 'ছবি আপলোড করতে ক্লিক করুন': 'Click to upload an image',
            'JPG/PNG, সর্বোচ্চ ৩MB': 'JPG/PNG, up to 3MB', 'পাসওয়ার্ড পরিবর্তন করুন': 'Change Password',
            'ছবি আপলোড করতে ক্লিক করুন': 'Click to upload an image', 'সেবা শেয়ার সফল হয়েছে': 'Service shared successfully',
            'শেয়ার সফল হয়েছে': 'Shared successfully', 'লিংক কপি হয়েছে, বন্ধুদের সাথে শেয়ার করুন!': 'Link copied. Share it with your friends!',
            'শেয়ার করা যায়নি, লিংকটি ম্যানুয়ালি কপি করুন।': 'Could not share. Please copy the link manually.',
            'শেয়ার লিংক কপি হয়েছে': 'Share link copied', 'লিংক কপি করা যায়নি। আবার চেষ্টা করুন।': 'Could not copy the link. Please try again.',
            'শেয়ার করতে প্রথমে লগইন বা রেজিস্ট্রেশন করুন': 'Please log in or register to share',
            'রক্তদাতা খুঁজতে আমার এলাকার রক্তদাতা বিভাগটি দেখুন।': 'Visit the Blood Donors section to find donors.',
            'জরুরি যোগাযোগের নম্বর ও সহায়তার জন্য আমার এলাকার জরুরি বিভাগটি দেখুন।': 'Visit the Emergency section for emergency contact numbers and assistance.',
            'আমার এলাকার সেবা': 'Amar Elaka Services', 'এইমাত্র': 'Just now', 'সব নোটিফিকেশন পড়া হিসেবে চিহ্নিত হয়েছে': 'All notifications marked as read',
            'সব নোটিফিকেশন আগেই পড়া হয়েছে': 'All notifications were already read', 'ব্যবহারকারী': 'User',
            'আপনার অ্যাকাউন্ট তৈরি হয়েছে। এখন সব সেবা ব্যবহার করতে পারবেন।': 'Your account has been created. You can now use all services.',
            'সফলভাবে লগইন করেছেন।': 'You have logged in successfully.', 'ইন্টারনেট ফিরেছে — sync হচ্ছে': 'Internet restored — syncing',
            'অফলাইন — ক্যাশ থেকে দেখছেন': 'Offline — showing cached data', 'অফলাইন মোড — সংযোগ ফিরলে সব আপডেট হবে': 'Offline mode — updates will sync when connection returns',
            'ছবির সাইজ ৫MB এর কম হতে হবে': 'Image size must be less than 5MB', 'ছবি আপলোড ব্যর্থ': 'Image upload failed',
            'প্রথমে লগইন করুন': 'Please log in first', 'কোনো একটিভ সাবস্ক্রিপশন নেই': 'No active subscription',
            'আপনি কি সাবস্ক্রিপশন বাতিলের অনুরোধ পাঠাতে চান?': 'Do you want to submit a subscription cancellation request?',
            'বাতিলের অনুরোধ পাঠানো হয়েছে। অ্যাডমিন অনুমোদনের অপেক্ষা করুন।': 'Cancellation request submitted. Waiting for admin approval.',
            'এই প্যাকেজ আপনার জন্য উপলব্ধ নয়': 'This package is not available to you', 'নাগরিক': 'Citizen',
            'Firebase কনফিগার হয়নি': 'Firebase is not configured', 'এই ইমেইলে অ্যাকাউন্ট নেই': 'No account exists with this email',
            'পাসওয়ার্ড ভুল': 'Incorrect password', 'ইমেইল সঠিক নয়': 'Invalid email address', 'ইমেইল বা পাসওয়ার্ড ভুল': 'Incorrect email or password',
            'অনেকবার চেষ্টা — কিছুক্ষণ পরে': 'Too many attempts — please try again later', 'গুগল লগইন সফল!': 'Google login successful!',
            'লগইন বাতিল': 'Login cancelled', 'পপআপ ব্লক! অনুমতি দিন।': 'Popup blocked! Please allow popups.',
            'এই ইমেইলে অন্য অ্যাকাউন্ট আছে!': 'Another account already exists with this email!', 'গুগল লগইন ব্যর্থ': 'Google login failed',
            'গিটহাব লগইন সফল!': 'GitHub login successful!', 'গিটহাব লগইন ব্যর্থ': 'GitHub login failed',
            'অনুগ্রহ করে শর্তাবলী ও নীতিমালা পড়ে সম্মতি দিন।': 'Please read and agree to the Terms & Policies.',
            'পাসওয়ার্ড মিলছে না': 'Passwords do not match', 'সঠিক মোবাইল নম্বর দিন': 'Enter a valid mobile number',
            'উপজেলা নির্বাচন করুন': 'Select an upazila', 'রেজিস্ট্রেশন সফল!': 'Registration successful!',
            'ইমেইল ইতিমধ্যে নিবন্ধিত': 'This email is already registered', 'পাসওয়ার্ড দুর্বল': 'Password is too weak',
            'অতিথি': 'Guest', 'হোমপেজে যেতে হলে আগে আপনার প্রোফাইল সম্পূর্ণ করুন!': 'Please complete your profile before going to the homepage!',
            'সঠিক নাম দিন': 'Enter a valid name', 'অভিনন্দন! আপনার প্রোফাইল সম্পূর্ণ হয়েছে।': 'Congratulations! Your profile is complete.',
            'মোবাইল, জেলা ও উপজেলা সঠিকভাবে পূরণ করুন!': 'Please enter a valid mobile number, district, and upazila!',
            'প্রোফাইল আপডেট হয়েছে!': 'Profile updated successfully!', 'অনুগ্রহ করে আগে প্রোফাইল সম্পূর্ণ করুন!': 'Please complete your profile first!',
            'সাধারণ': 'General', 'গুরুত্বপূর্ণ': 'Important', 'বিস্তারিত দেওয়া হয়নি।': 'No details provided.',
            'নোটিশটি আর সক্রিয় নেই': 'This notice is no longer active', 'ফেভারিট করতে আগে লগইন করুন': 'Please log in to add favorites',
            'ফেভারিট থেকে সরানো হয়েছে': 'Removed from favorites', 'ফেভারিটে যোগ হয়েছে': 'Added to favorites', 'আপডেট ব্যর্থ': 'Update failed',
            'দোকান': 'Shop', 'পণ্য': 'Product', 'গাড়ি': 'Vehicle', 'সার্ভিস': 'Service', 'অন্যান্য': 'Other',
            'চ্যানেল লিংক': 'Channel Link', 'সাবস্ক্রাইবার সংখ্যা': 'Subscriber Count', 'ক্যাটাগরি': 'Category', 'পেজ লিংক': 'Page Link',
            'ফলোয়ার সংখ্যা': 'Follower Count', 'প্রোফাইল লিংক': 'Profile Link', 'কনটেন্টের ধরন': 'Content Type',
            'চ্যানেল/গ্রুপ লিংক': 'Channel/Group Link', 'মেম্বার সংখ্যা': 'Member Count', 'দোকানের ঠিকানা': 'Shop Address',
            'খোলার সময়': 'Opening Hours', 'ব্যবসার ধরন': 'Business Type', 'মূল্য (৳)': 'Price (৳)', 'ডিসকাউন্ট': 'Discount',
            'পণ্যের ধরন': 'Product Type', 'মডেল': 'Model', 'সাল': 'Year', 'অবস্থা (নতুন/ব্যবহৃত)': 'Condition (New/Used)',
            'সার্ভিসের ধরন': 'Service Type', 'সার্ভিসের সময়': 'Service Hours', 'কল করুন': 'Call', 'ওয়েবসাইট': 'Website',
            'ওয়েবসাইটে যান': 'Visit Website', 'WhatsApp-এ মেসেজ': 'Message on WhatsApp', 'Facebook-এ যান': 'Visit Facebook',
            'YouTube-এ দেখুন': 'Watch on YouTube', 'TikTok-এ দেখুন': 'Watch on TikTok', 'Instagram-এ যান': 'Visit Instagram',
            'Telegram-এ যোগ দিন': 'Join on Telegram', 'কাস্টম বাটন': 'Custom Button', 'দেখুন': 'View',
            'প্রমোশনের ধরন': 'Promotion Type', 'সাধারণ তথ্য': 'General Information', 'অতিরিক্ত তথ্য': 'Additional Information',
            'বাটন ও প্রিভিউ': 'Buttons and Preview', 'নতুন ক্যাটাগরি যোগ হয়েছে': 'New category added', 'নতুন ক্যাটাগরি': 'New Category',
            'নতুন জরুরি নম্বর': 'New Emergency Number', 'নতুন নোটিশ প্রকাশিত': 'New Notice Published', 'নতুন ঘোষণা': 'New Announcement',
            'লগইন নেই': 'Not logged in', 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে': 'New password must be at least 6 characters',
            'নতুন পাসওয়ার্ড মিলছে না': 'New passwords do not match', 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!': 'Password changed successfully!',
            'পাসওয়ার্ড পরিবর্তন ব্যর্থ': 'Password change failed', 'পুরনো পাসওয়ার্ড ভুল': 'Current password is incorrect',
            'অনেকবার চেষ্টা করেছেন, কিছুক্ষণ পর চেষ্টা করুন': 'Too many attempts. Please try again later.',
            'আবার লগইন করে চেষ্টা করুন': 'Log in again and try', 'শর্টকাট লগইনের জন্য অনুগ্রহ করে প্রোফাইল সম্পূর্ণ করুন!': 'Please complete your profile to use quick login!',
            'জরুরী': 'Emergency', 'রিফ্রেশ করা যায়নি — আবার চেষ্টা করুন': 'Could not refresh — please try again',
            'রিপোর্ট অপশন শীঘ্রই আসছে': 'Report option coming soon', 'নির্বাচন মুছে ফেলুন': 'Clear Selection',
            'কিছু পাওয়া যায়নি': 'No results found', 'জেলা নির্বাচন করুন': 'Select District', 'জেলার উপজেলা': 'District Upazilas',
            'জেলা খুঁজুন...': 'Search districts...', 'উপজেলা খুঁজুন...': 'Search upazilas...', 'আগে জেলা নির্বাচন করুন': 'Select a district first',
            'একাধিক tab — offline cache কাজ করবে না': 'Multiple tabs — offline cache will not work',
            'এই browser offline সাপোর্ট দেয় না': 'This browser does not support offline mode',
            '৩ মিনিটের অতিথি সময় শেষ। চালিয়ে যেতে লগইন করুন।': 'The 3-minute guest session has ended. Log in to continue.',
            'এখন কোনো প্যাকেজ উপলব্ধ নেই।': 'No packages are currently available.', 'লাইট মোড চালু হয়েছে': 'Light mode enabled',
            'ডার্ক মোড চালু হয়েছে': 'Dark mode enabled', 'সিস্টেম থিম চালু হয়েছে': 'System theme enabled',
            'রেটিং দিতে প্রথমে লগইন করুন': 'Please log in before rating', 'কমপক্ষে ১টি স্টার দিন': 'Please select at least one star',
            'ধন্যবাদ! আপনার রেটিং জমা হয়েছে': 'Thank you! Your rating has been submitted', 'রেটিং আপডেট হয়েছে': 'Rating updated',
            'আপনার আগের রেটিং:': 'Your previous rating:', 'শুধু ছবি ফাইল দিন': 'Please select an image file only',
            'ছবির সাইজ ৩MB এর কম হতে হবে': 'Image size must be less than 3MB', 'সেবার নাম কমপক্ষে ৩ অক্ষর': 'Service name must be at least 3 characters',
            'বিস্তারিত কমপক্ষে ১০ অক্ষর': 'Description must be at least 10 characters',
            'ওয়েবসাইট লিংক http/https দিয়ে শুরু করুন': 'Website URL must start with http/https',
            'Facebook লিংক http/https দিয়ে শুরু করুন': 'Facebook URL must start with http/https',
            'আপনার সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন': 'Enter a valid 11-digit mobile number',
            'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন': 'Enter a valid 11-digit mobile number',
            'রক্তের গ্রুপ নির্বাচন করুন': 'Select a blood group', 'সঠিক এলাকা লিখুন': 'Enter a valid area',
            'অনুরোধ পাঠানো হয়েছে! অ্যাডমিন যাচাই করে যোগ করবেন।': 'Request submitted! The admin will verify and add it.',
            'অনুরোধ পাঠানো হয়েছে! অ্যাডমিন যাচাই করে রক্তদাতা তালিকায় যোগ করবেন।': 'Request submitted! The admin will verify and add you to the blood donor list.',
            'আপনি আজ ইতিমধ্যে ২টি অনুরোধ পাঠিয়েছেন। আগামীকাল আবার চেষ্টা করুন।': 'You have already submitted 2 requests today. Please try again tomorrow.',
            'অফলাইন — net এলে যাবে': 'Offline — will send when connected', 'পাঠানো হচ্ছে...': 'Sending...',
            'অ্যাডমিন': 'Admin', 'ইউজার': 'User', 'অফলাইন — net ফিরলে auto যাবে': 'Offline — will send automatically when online',
            'অ্যাডমিন অফলাইনে আছেন, শীঘ্রই উত্তর দেবেন।': 'The admin is offline and will reply soon.',
            'ভয়েস কল': 'Voice Call', 'অ্যাডমিন আপনার কলটি গ্রহণ করতে পারেননি। পরে আবার চেষ্টা করুন।': 'The admin could not answer your call. Please try again later.',
            'কলের সময় শেষ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।': 'The call timed out. Please try again.',
            'কল সংযোগ করা যায়নি। নেটওয়ার্ক পরীক্ষা করে আবার চেষ্টা করুন।': 'Could not connect the call. Check your network and try again.',
            'কলটি শেষ হয়েছে।': 'The call has ended.', 'অ্যাডমিন কল গ্রহণ করেছেন। অডিও সংযোগ স্থাপন হচ্ছে...': 'The admin accepted the call. Connecting audio...',
            'কল সংযোগে সমস্যা হয়েছে।': 'There was a problem connecting the call.', 'কলের অবস্থা পাওয়া যাচ্ছে না।': 'Call status is unavailable.',
            'আপনার একটি কল ইতিমধ্যে চলছে': 'You already have an active call', 'ভয়েস কল করতে প্রথমে লগইন করুন': 'Please log in to make a voice call',
            'আগে আপনার প্রোফাইল সম্পূর্ণ করুন': 'Please complete your profile first', 'ইন্টারনেট সংযোগ নেই': 'No internet connection',
            'এই ব্রাউজারে WebRTC Audio সমর্থিত নয়': 'WebRTC audio is not supported in this browser',
            'যাচাই হচ্ছে': 'Verifying', 'মাইক্রোফোন ব্যবহারের অনুমতি নেওয়া হচ্ছে...': 'Requesting microphone permission...',
            'কথোপকথন চলছে': 'Call in progress', 'নেটওয়ার্ক সংযোগ বিচ্ছিন্ন হয়েছে।': 'Network connection lost.',
            'অ্যাডমিনের কাছে কল পাঠানো হয়েছে, উত্তর দেওয়ার অপেক্ষায় আছেন।': 'Call request sent to the admin. Waiting for an answer.',
            'মাইক্রোফোন ব্যবহারের অনুমতি পাওয়া যায়নি। Browser Settings থেকে অনুমতি দিন।': 'Microphone permission was denied. Allow it in your browser settings.',
            'কল করার অনুমতি নেই। Firebase Security Rules পরীক্ষা করুন।': 'Call permission denied. Check Firebase Security Rules.',
            'কল শুরু করা যায়নি। আবার চেষ্টা করুন।': 'Could not start the call. Please try again.', 'আপনি কলটি শেষ করেছেন।': 'You ended the call.',
            'অনলাইন': 'Online', 'এইমাত্র সক্রিয় ছিলেন': 'Active just now', 'অফলাইন': 'Offline',
            'আবেদন জমা হয়েছে! অ্যাডমিন অনুমোদনের অপেক্ষায়।': 'Application submitted! Waiting for admin approval.',
            'পাঠানো হয়েছে! ধন্যবাদ।': 'Sent! Thank you.', 'রেজাল্ট দেখার পর ব্রাউজার মেনু থেকে Print → Save as PDF চাপুন': 'After viewing the result, select Print → Save as PDF from your browser menu.',
            'কোনো ক্যাটাগরি নেই।': 'No categories available.', 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে': 'New password must be at least 6 characters long.',
            'অ্যাডমিন সাপোর্ট': 'Admin Support', 'প্রোফাইল লোড ব্যর্থ:': 'Profile loading failed:', 'জরুরী': 'Emergency',
            'একটি জনকল্যাণমূলক ডিজিটাল উদ্যোগ, যার মূল উদ্দেশ্য হলো প্রযুক্তির মাধ্যমে মানুষের কাছে প্রয়োজনীয় তথ্য, সেবা ও সহযোগিতা সহজলভ্য করে তোলা। আমরা বিশ্বাস করি, সঠিক সময়ে সঠিক তথ্য এবং মানুষের পারস্পরিক সহযোগিতা অনেকের জীবনে ইতিবাচক পরিবর্তন আনতে পারে।': 'A public-welfare digital initiative whose main purpose is to make essential information, services, and support more accessible through technology. We believe that timely information and mutual support can bring positive change to many lives.',
            'মানুষের জরুরি প্রয়োজনে রক্তদাতা খুঁজে পেতে ভোগান্তি এবং প্রয়োজনীয় তথ্য সহজে পাওয়ার সীমাবদ্ধতা থেকেই “আমার এলাকা” গড়ে তোলার চিন্তা আসে। বিশেষ করে জরুরি মুহূর্তে রক্তের প্রয়োজন হলে মানুষকে বিভিন্ন জায়গায় যোগাযোগ করতে হয় এবং প্রয়োজনীয় তথ্য খুঁজতে সময় ব্যয় করতে হয়। এই বাস্তবতা থেকে অনুপ্রাণিত হয়ে এমন একটি প্ল্যাটফর্ম গড়ে তোলার উদ্যোগ নেওয়া হয়েছে, যেখানে মানুষের প্রয়োজনীয় তথ্য ও সেবা সহজে খুঁজে পাওয়ার সুযোগ থাকবে।': 'The idea for Amar Elaka grew from the difficulties people face when searching for blood donors during urgent situations and from the limited access to essential information. In emergencies, people often have to contact many places and spend valuable time finding the information they need. Inspired by this reality, we set out to build a platform where people can find useful information and services more easily.',
            'আমাদের লক্ষ্য হলো মানুষের দৈনন্দিন প্রয়োজন ও জরুরি পরিস্থিতিতে কাজে লাগে এমন তথ্য ও সেবা একটি সহজলভ্য ডিজিটাল প্ল্যাটফর্মে একত্রিত করা। রক্তদাতা খুঁজতে সহায়তা, জরুরি যোগাযোগ নম্বর, স্থানীয় সেবাদাতা এবং বিভিন্ন প্রয়োজনীয় সেবার তথ্য মানুষের কাছে পৌঁছে দেওয়ার মাধ্যমে আমরা পারস্পরিক সহযোগিতা ও জনকল্যাণে অবদান রাখতে চাই।': 'Our goal is to bring together information and services that help with everyday needs and emergencies in one accessible digital platform. By helping people find blood donors, emergency contact numbers, local service providers, and other essential services, we aim to encourage mutual support and contribute to public welfare.',
            '“আমার এলাকা”র মাধ্যমে আমরা এমন একটি সহযোগিতামূলক পরিবেশ গড়ে তুলতে চাই, যেখানে মানুষ প্রয়োজনীয় তথ্য খুঁজে পেতে পারবেন, নিজেদের উপকারী তথ্য অন্যদের সঙ্গে ভাগ করে নিতে পারবেন এবং বিভিন্ন সেবার সঙ্গে সহজে পরিচিত হতে পারবেন। আমাদের পরিকল্পনার মধ্যে রয়েছে দৈনন্দিন যাতায়াতের প্রয়োজনীয় সেবা, যেমন সিএনজি, অটোরিকশা ও ব্যক্তিগত গাড়ির তথ্য যুক্ত করা, যাতে মানুষ সহজে প্রয়োজনীয় পরিবহন খুঁজে পান।': 'Through Amar Elaka, we want to build a collaborative environment where people can find essential information, share useful information with others, and discover different services easily. Our plans include adding everyday transport options such as CNGs, auto-rickshaws, and private cars so people can find suitable transportation more easily.',
            'আমরা মনে করি, সমাজের উন্নয়নে প্রত্যেক মানুষের ছোট ছোট উদ্যোগও গুরুত্বপূর্ণ ভূমিকা রাখতে পারে। মানুষের পাশে দাঁড়ানো, প্রয়োজনের সময় সহযোগিতার হাত বাড়িয়ে দেওয়া এবং প্রযুক্তিকে ইতিবাচক কাজে ব্যবহার করাই আমাদের চিন্তার মূল ভিত্তি। আমরা চাই, “আমার এলাকা” মানুষের পারস্পরিক সহযোগিতা ও জনকল্যাণে একটি কার্যকর মাধ্যম হয়ে উঠুক।': 'We believe that small initiatives by individuals can play an important role in social progress. Supporting people, offering help when it is needed, and using technology for positive purposes are the foundations of our vision. We hope Amar Elaka will become a useful channel for mutual support and public welfare.',
            '“আমার এলাকা” উদ্যোগের পরিকল্পনা, ধারণা সাজানো, লেখালেখি এবং ডিজিটাল উন্নয়নের বিভিন্ন কাজে': 'For planning the Amar Elaka initiative, organizing ideas, writing content, and various aspects of digital development, assistance is being taken from',
            '-এর সহযোগিতা নেওয়া হচ্ছে। কৃত্রিম বুদ্ধিমত্তাকে সহায়ক মাধ্যম হিসেবে ব্যবহার করে উদ্যোগটির পরিকল্পনা ও উন্নয়নের কাজকে আরও সহজ ও কার্যকর করার চেষ্টা করা হচ্ছে। আমরা বিশ্বাস করি, মানুষের চিন্তা, সৃজনশীলতা এবং আধুনিক প্রযুক্তির যথাযথ সমন্বয় সমাজের কল্যাণে ইতিবাচক ভূমিকা রাখতে পারে।': '. Artificial intelligence is being used as a supporting tool to make the planning and development of this initiative easier and more effective. We believe that combining human ideas, creativity, and modern technology can contribute positively to society.',
            'মানুষের প্রয়োজনকে গুরুত্ব দেওয়া, তথ্যের যথার্থতা ও গোপনীয়তার প্রতি যত্নশীল থাকা, অন্যের অধিকারকে সম্মান করা এবং প্রযুক্তিকে জনকল্যাণে কাজে লাগানোর প্রচেষ্টা অব্যাহত রাখাই “আমার এলাকা”র অঙ্গীকার। এই পথচলায় মানুষের মতামত, সহযোগিতা এবং সম্মিলিত অংশগ্রহণ আমাদের জন্য অত্যন্ত গুরুত্বপূর্ণ।': 'Our commitment is to prioritize people’s needs, care about information accuracy and privacy, respect the rights of others, and continue using technology for public welfare. Feedback, support, and community participation are very important to us on this journey.',
            'একটি জনকল্যাণমূলক উদ্যোগ। আমাদের মূল লক্ষ্য মানুষের পাশে দাঁড়ানো, সমাজসেবায় অবদান রাখা এবং বিভিন্ন প্রয়োজনীয় সেবা মানুষের কাছে সহজে পৌঁছে দেওয়া। এই প্ল্যাটফর্মের প্রতিষ্ঠাতা': 'is a public-welfare initiative. Our main goal is to support people, contribute to social service, and make essential services easier to access. The founder of this platform is',
            ', চাঁদপুর টেকনিক্যাল স্কুল ও কলেজের একজন শিক্ষার্থী। একজন শিক্ষার্থী হয়েও মানুষের কল্যাণে প্রযুক্তিকে কাজে লাগিয়ে একটি উপকারী প্ল্যাটফর্ম গড়ে তোলার চেষ্টা করছেন তিনি। আমাদের অনুপ্রেরণা হলো বিপদের সময় মানুষের পাশে থাকা এবং রক্তদাতা খুঁজে পেতে সহায়তা করা।': ', a student of Chandpur Technical School and College. While still a student, he is working to use technology to build a helpful platform for people. Our inspiration is to support people in difficult times and help them find blood donors.',
            '"আমার এলাকা" ওয়েবসাইটের মূল উদ্দেশ্য হলো স্থানীয় সেবা, জরুরি হেল্পলাইন এবং রক্তদাতাদের তথ্য একই প্ল্যাটফর্মে একত্রিত করা। এটি কোনো বাণিজ্যিক প্রতিষ্ঠান নয়, বরং একটি সমাজসেবামূলক উদ্যোগ। মানুষের সহযোগিতায় এই প্ল্যাটফর্মকে আরও উপকারী করে তোলার আমাদের অঙ্গীকার।': 'The main purpose of the Amar Elaka website is to bring local services, emergency helplines, and blood donor information together on one platform. It is not a commercial organization; it is a social-service initiative. We are committed to making this platform more useful with the support of the community.',
            'ব্যবহারকারীদের সঠিক ও সত্য তথ্য প্রদান করতে হবে। ওয়েবসাইটটি ব্যবহারের সময় অন্যদের প্রতি সম্মান বজায় রাখতে হবে। কোনো অশ্লীল, হিংসাত্মক বা বিভ্রান্তিকর তথ্য বা পোস্ট করা যাবে না। প্ল্যাটফর্মের ক্ষতিসাধন করে এমন কোনো কার্যকলাপ করা থেকে বিরত থাকতে হবে।': 'Users must provide accurate and truthful information and treat others respectfully while using the website. Obscene, violent, or misleading information and posts are not allowed. Users must not engage in activities that could harm the platform.',
            'আপনার ব্যক্তিগত তথ্য (নাম, ফোন নম্বর, প্রোফাইল) আমাদের কাছে অত্যন্ত সুরক্ষিত। আমরা আপনার তথ্য তৃতীয় কোনো পক্ষের কাছে বিক্রি বা বিপণন করি না। শুধুমাত্র সেবা প্রদানের স্বার্থে (যেমন: রক্তদাতা বা জরুরি সেবার সাথে সংযোগ করতে) প্রয়োজনীয় তথ্য ব্যবহার করা হয়।': 'Your personal information (name, phone number, and profile) is treated with care. We do not sell or market your information to third parties. Information is used only when necessary to provide services, such as connecting you with blood donors or emergency services.',
            'রক্তদাতাদের দেওয়া তথ্য শুধুমাত্র রক্তের প্রয়োজনে ব্যবহার করতে হবে। রক্তদাতার অনুমতি ছাড়া তার নম্বর কোনো প্রকার প্রচার বা অপব্যবহার করা সম্পূর্ণ নিষিদ্ধ। রক্তদাতাদেরও সঠিক ও সর্বশেষ তথ্য দেওয়ার জন্য অনুরোধ করা হচ্ছে।': 'Blood donor information must only be used for blood-related needs. Sharing or misusing a donor’s phone number without permission is strictly prohibited. Donors are also requested to provide accurate and up-to-date information.',
            'জরুরি হেল্পলাইনে দেওয়া নম্বরগুলো কেবলমাত্র সত্যিকারের জরুরি প্রয়োজনে ব্যবহার করতে হবে। কোনো প্রকার মিথ্যা কল বা হয়রানি করা আইনত দণ্ডনীয়। জরুরি পরিস্থিতিতে সরাসরি সংশ্লিষ্ট কর্তৃপক্ষের সাথে যোগাযোগ করাই সর্বোত্তম।': 'The numbers listed in the emergency helpline directory must only be used for genuine emergencies. False calls or harassment may be punishable by law. In an emergency, contacting the relevant authorities directly is recommended.',
            'ব্যবহারকারীদের দেওয়া তথ্যের যথার্থতা যাচাই করার সর্বোচ্চ চেষ্টা করা হয়। তবে ভুল তথ্য পাওয়া গেলে তা সংশোধনের জন্য অ্যাডমিনের সাথে যোগাযোগ করতে হবে। অনুমতি ছাড়া অন্য কোনো ব্যক্তি বা প্রতিষ্ঠানের তথ্য প্রকাশ করা যাবে না।': 'We make every effort to verify the accuracy of information submitted by users. If you find incorrect information, contact the admin to request a correction. Information about another person or organization must not be published without permission.',
            'সেবা, দোকান বা পণ্যের প্রচারের জন্য দেওয়া পোস্ট অবশ্যই সত্য এবং আইনসম্মত হতে হবে। কোনো প্রকার ভুয়া অফার বা প্রতারণামূলক বিজ্ঞাপন অনুমোদন করা হবে না। অ্যাডমিন যেকোনো পোস্ট যাচাইয়ের পর তা প্রকাশ বা বাতিল করার অধিকার রাখে।': 'Posts promoting services, shops, or products must be truthful and lawful. Fake offers and deceptive advertisements will not be approved. The admin reserves the right to review and publish or reject any post.',
            'প্ল্যাটফর্মে ভুয়া তথ্য দেওয়া, প্রতারণা করা, কাউকে হয়রানি করা, স্প্যাম করা এবং অন্যের ব্যক্তিগত তথ্য চুরি বা অপব্যবহার করা সম্পূর্ণ নিষিদ্ধ। এমন কাজ প্রমাণিত হলে অ্যাকাউন্টটি ব্লক করা হবে।': 'Providing false information, committing fraud, harassing others, spamming, or stealing or misusing someone else’s personal information is strictly prohibited. Accounts found engaging in such activities may be blocked.',
            "যদি আপনি কোনো ভুল তথ্য, অনুপযুক্ত পোস্ট বা গোপনীয়তা লঙ্ঘনের বিষয় লক্ষ্য করেন, তবে অনুগ্রহ করে আমাদের 'অভিযোগ ও পরামর্শ' সেকশনের মাধ্যমে জানান। আপনার একটি ছোট রিপোর্ট প্ল্যাটফর্মটিকে নিরাপদ রাখতে সাহায্য করবে।": "If you notice incorrect information, an inappropriate post, or a privacy violation, please report it through our 'Complaints and Suggestions' section. Your report can help keep the platform safe.",
            '"আমার এলাকা" একটি তথ্য প্রদানকারী প্ল্যাটফর্ম। তৃতীয় পক্ষের (যেমন: ডাক্তার, টেকনিশিয়ান) দেওয়া সেবার মান বা ফলাফলের জন্য প্ল্যাটফর্ম সরাসরি দায়ী নয়। যেকোনো সেবা নেওয়ার আগে নিজ দায়িত্বে যাচাই করে নেওয়ার জন্য অনুরোধ করা হচ্ছে।': 'Amar Elaka is an information platform. The platform is not directly responsible for the quality or results of services provided by third parties, such as doctors or technicians. Users are advised to verify details independently before using any service.',
            'ভবিষ্যতে প্রয়োজন অনুযায়ী এই নীতিমালা সংশোধন বা পরিবর্তন করা হতে পারে। পরিবর্তনগুলো এই পেজেই আপডেট করা হবে। প্ল্যাটফর্মের নিয়মিত ব্যবহারের মানে হলো আপনি নতুন নীতিমালার সাথেও সম্মত আছেন।': 'These policies may be revised or changed as needed in the future. Any changes will be updated on this page. Continued use of the platform means that you agree to the updated policies.',
            'আমাদের ওয়েবসাইটে সেবাগুলো রেনডমলি ভাবে হোম পেজে দেখা যায়। এর মানে আপনি এই মাত্র যে সেবাটি দেখেছেন সেটা একটু পর আবার নাও দেখতে পারেন যদি না আপনি সংরক্ষণ করে রাখেন। বিজ্ঞাপনের সুবিধাটি হলো যত বেশি সম্ভব বিজ্ঞাপন করা পোস্টটি হোমপেজে দেখানো। আপনি প্রতিদিন একটি প্রমোশন পোস্ট করতে পারবেন যার মেয়াদ থাকবে ২৪ ঘন্টা অর্থাৎ একদিন। তাহলে আর দেরি কেন এখনই করুন আপনার প্রমোশন পোস্ট।': 'Services on our website are displayed randomly on the homepage, so a service you just viewed may not appear again unless you save it. Promotion helps your post appear on the homepage more frequently. You can submit one promotional post per day, and each promotion remains active for 24 hours. Create your promotion when you are ready.',
            'যেমন: মো: আরিফুল ইসলাম': 'e.g. Md. Ariful Islam', 'সেবা, হাসপাতাল বা টেকনিশিয়ান খুঁজুন...': 'Search services, hospitals, or technicians...',
            'ক্যাটাগরি খুঁজুন...': 'Search categories...', 'আপনার অভিযোগ বা পরামর্শ লিখুন...': 'Write your complaint or suggestion...',
            'আপনার অভিজ্ঞতা আমাদের জানান...': 'Tell us about your experience...', 'যেমন: পুলিশ হেল্পলাইন': 'e.g. Police Helpline',
            'যেমন: 999': 'e.g. 999', 'যেমন: হাসপাতাল, পুলিশ': 'e.g. Hospital, Police', 'অতিরিক্ত তথ্য...': 'Additional information...',
            'যেমন: শাহবাজপুর বাজার, চাঁদপুর': 'e.g. Shahbazpur Bazar, Chandpur', 'যেমন: রহমান টেলিকম — ঈদ অফার': 'e.g. Rahman Telecom — Eid Offer',
            'যেমন: ইলেকট্রিশিয়ান সার্ভিস': 'e.g. Electrician Service', 'আপনার পুরো নাম': 'Your full name',
            'আপনার বার্তা লিখুন...': 'Write your message...', 'উপজেলা': 'Upazila', 'জেলা': 'District',
            'জেলার উপজেলা': 'Upazilas in this district', 'নির্বাচন মুছে ফেলুন': 'Clear selection', 'কিছু পাওয়া যায়নি': 'No results found',
            'আপনি এখনো কোনো সেবা': 'You have not saved any services yet', 'এই বিজ্ঞাপনে কোনো অ্যাকশন বাটন নেই।': 'This advertisement has no action buttons.',
            'আপনার সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন': 'Enter your correct 11-digit mobile number',
            'আপনি কি সত্যিই লগআউট করতে চান?': 'Do you really want to log out?', 'লগআউট হয়েছে': 'Logged out', 'লগআউট ব্যর্থ': 'Logout failed',
            'আপনার আগের রেটিং:': 'Your previous rating:', 'পুনরায় রেটিং পাঠান': 'Resubmit Rating', 'রেটিং দিতে প্রথমে লগইন করুন': 'Please log in to rate',
            'এখন কোনো প্যাকেজ উপলব্ধ নেই।': 'No packages are currently available.', 'কোনো ক্যাটাগরি নেই।': 'No categories available.',
            'শুধু JPG/PNG ছবি দিন': 'Only JPG/PNG images are allowed', 'ছবি সর্বোচ্চ ৩MB হতে পারবে': 'Image must be 3MB or smaller',
            'আপনার একটি কল ইতিমধ্যে চলছে': 'You already have a call in progress', 'এই ব্রাউজারে WebRTC Audio সমর্থিত নয়': 'WebRTC audio is not supported in this browser',
            'কলের অবস্থা পাওয়া যাচ্ছে না।': 'Call status is unavailable.', 'কলটি শেষ হয়েছে।': 'The call has ended.',
            'অ্যাডমিনের কাছে কল পাঠানো হয়েছে, উত্তর দেওয়ার অপেক্ষায় আছেন।': 'Your call request has been sent to the admin. Waiting for a response.',
            'Firebase কনফিগারেশন নেই!': 'Firebase configuration is missing!', 'কোডের ভেতরে': 'inside the code',
            'এ আপনার Firebase প্রজেক্টের API key বসান।': 'add your Firebase project API key here.',
            'প্রিমিয়াম': 'Premium', 'রক্ত': 'Blood', 'আবহাওয়া': 'Weather', 'রেজাল্ট বের করুন': 'Check Results',
            'এডমিন চ্যাট': 'Admin Chat', 'অভিযোগ ও পরামর্শ': 'Complaints & Suggestions',
            'প্রতিষ্ঠাতা:Akror karmaker': 'Founder: Akror Karmaker', 'ইমেইল:': 'Email:', 'ফেসবুক:': 'Facebook:',
            'অনুরোধ পাঠান': 'Send Request', 'ছবি *': 'Image *', 'আপনার আগের রেটিং: 0/5': 'Your previous rating: 0/5',
            '“আমার এলাকা”র মাধ্যমে আমরা এমন একটি সহযোগিতামূলক পরিবেশ গড়ে তুলতে চাই, যেখানে মানুষ প্রয়োজনীয় তথ্য খুঁজে পেতে পারবেন, নিজেদের উপকারী তথ্য অন্যদের সঙ্গে ভাগ করে নিতে পারবেন এবং বিভিন্ন সেবার সঙ্গে সহজে পরিচিত হতে পারবেন। আমাদের পরিকল্পনার মধ্যে রয়েছে রক্তদাতা খুঁজতে সহায়তা, জরুরি যোগাযোগের তথ্য, স্থানীয় সেবা ও সেবাদাতাদের পরিচিতি, বিভিন্ন প্রয়োজনীয় তথ্য এবং সামাজিক ও ব্যবসায়িক প্রচারের সুযোগ তৈরি করা। এসব সেবা মানুষের প্রকৃত চাহিদা, যথাযথ অনুমতি এবং বাস্তবসম্মত পরিকল্পনার ভিত্তিতে ধাপে ধাপে উন্নত করার প্রত্যাশা রয়েছে।': 'Through Amar Elaka, we want to create a collaborative environment where people can find essential information, share useful information with others, and discover different services. Our plans include helping people find blood donors, providing emergency contact information, introducing local services and providers, sharing other useful information, and creating opportunities for community and business promotion. We aim to improve these services gradually based on people’s real needs, proper permissions, and practical planning.',
            'আমরা মনে করি, সমাজের উন্নয়নে প্রত্যেক মানুষের ছোট ছোট উদ্যোগও গুরুত্বপূর্ণ ভূমিকা রাখতে পারে। মানুষের পাশে দাঁড়ানো, প্রয়োজনের সময় সহযোগিতার হাত বাড়িয়ে দেওয়া এবং প্রযুক্তিকে ইতিবাচক কাজে ব্যবহার করাই আমাদের চিন্তার মূল ভিত্তি। আমরা চাই, “আমার এলাকা” শুধু তথ্য খোঁজার একটি মাধ্যম না হয়ে মানুষের পারস্পরিক সহযোগিতা ও জনকল্যাণের একটি কার্যকর প্ল্যাটফর্ম হিসেবে গড়ে উঠুক।': 'We believe that small initiatives by individuals can play an important role in social progress. Supporting people, offering help when needed, and using technology for positive purposes are the foundations of our vision. We want Amar Elaka to become more than an information-search tool: a practical platform for mutual support and public welfare.',
            '“আমার এলাকা” উদ্যোগের পরিকল্পনা, ধারণা সাজানো, লেখালেখি এবং ডিজিটাল উন্নয়নের বিভিন্ন কাজে ': 'For planning the Amar Elaka initiative, organizing ideas, writing content, and various aspects of digital development, assistance is being provided by ',
            '-এর সহযোগিতা নেওয়া হচ্ছে। কৃত্রিম বুদ্ধিমত্তাকে সহায়ক মাধ্যম হিসেবে ব্যবহার করে উদ্যোগটির পরিকল্পনা ও উন্নয়নের কাজকে আরও সহজ ও কার্যকর করার চেষ্টা করা হচ্ছে। আমরা বিশ্বাস করি, মানুষের চিন্তা, সৃজনশীলতা এবং আধুনিক প্রযুক্তির যথাযথ সমন্বয় সমাজের কল্যাণে নতুন সম্ভাবনা তৈরি করতে পারে।': '. Artificial intelligence is being used as a supporting tool to make the planning and development of this initiative easier and more effective. We believe that combining human ideas, creativity, and modern technology can create new opportunities for the good of society.',
            'মানুষের প্রয়োজনকে গুরুত্ব দেওয়া, তথ্যের যথার্থতা ও গোপনীয়তার প্রতি যত্নশীল থাকা, অন্যের অধিকারকে সম্মান করা এবং প্রযুক্তিকে জনকল্যাণে কাজে লাগানোর প্রচেষ্টা অব্যাহত রাখাই “আমার এলাকা”র অঙ্গীকার। এই পথচলায় মানুষের মতামত, সহযোগিতা এবং সম্মিলিত অংশগ্রহণ আমাদের এগিয়ে যাওয়ার অনুপ্রেরণা।': 'Our commitment is to prioritize people’s needs, protect information accuracy and privacy, respect the rights of others, and continue using technology for public welfare. Feedback, support, and community participation inspire us to keep moving forward.',
            "যদি আপনি কোনো ভুল তথ্য, অনুপযুক্ত পোস্ট বা গোপনীয়তা লঙ্ঘনের বিষয় লক্ষ্য করেন, তবে অনুগ্রহ করে আমাদের 'অভিযোগ ও পরামর্শ' সেকশনের মাধ্যমে জানান। আপনার একটি ছোট রিপোর্ট প্ল্যাটফর্মটিকে নিরাপদ রাখতে সাহায্য করবে।": "If you notice incorrect information, an inappropriate post, or a privacy violation, please let us know through our 'Complaints and Suggestions' section. Even a small report can help keep the platform safe.",
            'সেবাদাতা:': 'Provider:', 'কল': 'Call', 'এডমিন': 'Admin', 'কোনো সংরক্ষিত সেবা নেই': 'No saved services yet',
            'আপনি এখনো কোনো সেবা "আমার পছন্দ" তালিকায় যুক্ত করেননি। সেবার উপরে থাকা হার্ট আইকনে ক্লিক করে সেভ করুন।': 'You have not added any services to My Favorites yet. Tap the heart icon on a service card to save it.',
            'কোনো রক্তদাতা নিবন্ধিত নেই।': 'No blood donors are registered yet.', 'এখনো কোনো মেসেজ নেই।': 'There are no messages yet.',
            'কোনো নোটিফিকেশন নেই': 'No notifications', 'নতুন আপডেট বা ঘোষণা এলে এখানে দেখা যাবে।': 'New updates and announcements will appear here.',
            'সব পড়া হয়েছে': 'All caught up', 'সকল': 'All'
        };

        const uiOriginalTextNodes = new WeakMap();
        const uiOriginalAttributes = new WeakMap();
        const UI_DYNAMIC_CONTENT_SKIP = [
            '#profileNameText', '#profilePhone', '#profileEmail', '#profileLocation', '#profileFullAddress',
            '#sidebarUserName', '#sidebarUserEmail', '#svcModalTitle', '#svcModalProvider', '#svcModalLocation', '#svcModalDescription',
            '#promoModalTitle', '#promoModalAdvertiser', '#promoModalLocation', '#promoModalDescription', '#noticeModalTitle', '#noticeModalContent',
            '.chat-message-body', '.firebase-user-content', '.user-generated-content', '[data-user-content="true"]',
            '.donor-name', '.donor-location', '.service-title', '.service-description', '.service-provider', '.service-location',
            '.notice-title', '.notice-description', '.notice-body', '.dynamic-user-value'
        ].join(',');

        function isInsideDynamicUserContent(node) {
            const el = node && (node.nodeType === 1 ? node : node.parentElement);
            if (!el || !el.closest) return false;
            if (el.closest('[data-i18n]')) return true;
            return !!el.closest(UI_DYNAMIC_CONTENT_SKIP);
        }

        function translateStaticUiText(root = document) {
            if (!root || currentLang !== 'en') {
                if (root && currentLang === 'bn') restoreStaticUiText(root);
                return;
            }
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                    if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    if (isInsideDynamicUserContent(node)) return NodeFilter.FILTER_REJECT;
                    const parent = node.parentElement;
                    if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
                    if (parent.isContentEditable) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            });
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);
            nodes.forEach(node => {
                if (!uiOriginalTextNodes.has(node)) uiOriginalTextNodes.set(node, node.nodeValue);
                const original = uiOriginalTextNodes.get(node);
                const key = original.trim();
                const translated = STATIC_UI_EN[key];
                if (translated) {
                    const leading = original.match(/^\s*/)?.[0] || '';
                    const trailing = original.match(/\s*$/)?.[0] || '';
                    const nextValue = leading + translated + trailing;
                    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
                }
            });
            // Translate only fixed interface attributes; never rewrite user-entered values.
            root.querySelectorAll?.('input[placeholder],textarea[placeholder],button[title],[title],[aria-label]').forEach(el => {
                if (isInsideDynamicUserContent(el)) return;
                ['placeholder', 'title', 'aria-label'].forEach(attr => {
                    if (!el.hasAttribute(attr)) return;
                    let saved = uiOriginalAttributes.get(el);
                    if (!saved) { saved = {}; uiOriginalAttributes.set(el, saved); }
                    if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
                    const original = saved[attr];
                    if (currentLang === 'en' && STATIC_UI_EN[original?.trim()]) el.setAttribute(attr, STATIC_UI_EN[original.trim()]);
                    else if (currentLang === 'bn' && el.getAttribute(attr) !== original) el.setAttribute(attr, original);
                });
            });
        }

        function restoreStaticUiText(root = document) {
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);
            nodes.forEach(node => {
                if (uiOriginalTextNodes.has(node)) {
                    const original = uiOriginalTextNodes.get(node);
                    if (node.nodeValue !== original) node.nodeValue = original;
                }
            });
            root.querySelectorAll?.('[placeholder],[title],[aria-label]').forEach(el => {
                const saved = uiOriginalAttributes.get(el);
                if (saved) Object.entries(saved).forEach(([attr, value]) => el.setAttribute(attr, value));
            });
        }

        let uiTranslationObserver = null;
        function startUiTranslationObserver() {
            if (uiTranslationObserver || !document.body || !window.MutationObserver) return;
            uiTranslationObserver = new MutationObserver(records => {
                if (currentLang !== 'en') return;
                records.forEach(record => {
                    record.addedNodes?.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) translateStaticUiText(node);
                        else if (node.nodeType === Node.TEXT_NODE && !isInsideDynamicUserContent(node)) {
                            const key = (node.nodeValue || '').trim();
                            if (STATIC_UI_EN[key]) {
                                if (!uiOriginalTextNodes.has(node)) uiOriginalTextNodes.set(node, node.nodeValue);
                                node.nodeValue = node.nodeValue.replace(key, STATIC_UI_EN[key]);
                            }
                        }
                    });
                });
            });
            uiTranslationObserver.observe(document.body, { childList: true, subtree: true });
        }

        function translateUiMessage(message) {
            if (currentLang !== 'en' || typeof message !== 'string') return message;
            const trimmed = message.trim();
            if (STATIC_UI_EN[trimmed]) return message.replace(trimmed, STATIC_UI_EN[trimmed]);
            return message;
        }

        // ========== BRAND NAME (never translated to "My Area") ==========
        const BRAND_NAME_BN = 'আমার এলাকা';
        const BRAND_NAME_EN = 'Amar Elaka';
        const BRAND_TITLE_BN = 'আমার এলাকা - সকল সেবা এখন হাতের মুঠোয়';
        const BRAND_TITLE_EN = 'Amar Elaka - All Services at Your Fingertips';
        function applyBrandName() {
            const en = currentLang === 'en';
            document.querySelectorAll('[data-brand="text"]').forEach(el => {
                const v = en ? BRAND_NAME_EN : BRAND_NAME_BN;
                if (el.textContent !== v) el.textContent = v;
            });
            document.querySelectorAll('[data-brand="split"]').forEach(el => {
                el.innerHTML = en
                    ? '<span class="brand-text-1">Amar</span><span class="brand-text-2"> Elaka</span>'
                    : '<span class="brand-text-1">আমার</span><span class="brand-text-2"> এলাকা</span>';
            });
            const title = en ? BRAND_TITLE_EN : BRAND_TITLE_BN;
            document.title = title;
            ['meta[property="og:title"]', 'meta[property="twitter:title"]'].forEach(sel => {
                const m = document.querySelector(sel); if (m) m.setAttribute('content', title);
            });
        }

        function applyLanguage() {
            document.documentElement.lang = currentLang === 'en' ? 'en' : 'bn';
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (key && t(key)) el.textContent = t(key);
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (key && t(key)) el.setAttribute('placeholder', t(key));
            });
            // Bottom nav labels
            const navMap = {
                'bnav-services': 'nav.home',
                'bnav-emergency': 'nav.emergency',
                'bnav-blood': 'nav.blood',
                'bnav-profile': 'nav.profile',
                'bnav-news': 'nav.news'
            };
            Object.entries(navMap).forEach(([id, key]) => {
                const btn = document.getElementById(id);
                if (!btn) return;
                const span = btn.querySelector('span:last-child') || btn.querySelector('span');
                // structure varies; update text nodes carefully
                const labels = btn.querySelectorAll('span');
                labels.forEach(s => {
                    if (s.classList.contains('admin-fab-label')) return;
                    if (s.textContent && s.textContent.trim().length < 20) s.textContent = t(key);
                });
            });
            const fabLabel = document.querySelector('.admin-fab-label');
            if (fabLabel) fabLabel.textContent = t('nav.support');
            // Sidebar key items
            document.querySelectorAll('.sidebar-item span').forEach(span => {
                const txt = span.textContent.trim();
                const map = {
                    'সেটিংস': 'sidebar.settings', 'Settings': 'sidebar.settings',
                    'আমাদের সম্বন্ধে': 'sidebar.about', 'About Us': 'sidebar.about',
                    'শর্তাবলী ও নীতিমালা': 'sidebar.terms', 'Terms & Policy': 'sidebar.terms',
                    'অ্যাপটি শেয়ার করুন': 'sidebar.share', 'Share App': 'sidebar.share',
                    'রেটিং দিন': 'sidebar.rate', 'Rate Us': 'sidebar.rate',
                    'লগ আউট': 'sidebar.logout', 'Log Out': 'sidebar.logout',
                    'আমার পছন্দ': 'sidebar.favorites', 'My Favorites': 'sidebar.favorites',
                    'মতামত দিন': 'sidebar.feedback', 'Feedback': 'sidebar.feedback',
                    'যোগাযোগ': 'sidebar.contact', 'Contact': 'sidebar.contact',
                    'প্রিমিয়াম': 'sidebar.premium', 'Premium': 'sidebar.premium'
                };
                if (map[txt]) span.textContent = t(map[txt]);
            });
            // Title attributes
            document.querySelectorAll('[data-i18n-title]').forEach(el => {
                const key = el.getAttribute('data-i18n-title');
                if (key && t(key)) el.setAttribute('title', t(key));
            });
            // Common static labels that use known keys when data-i18n is present are already handled
            // Service modal fixed labels
            const svcProvLabel = document.querySelector('#serviceDetailModal .uppercase.tracking-wider.font-bold');
            if (svcProvLabel && (svcProvLabel.textContent.includes('সেবাদানকারী') || svcProvLabel.textContent.includes('Provider'))) {
                svcProvLabel.textContent = t('common.provider');
            }
            const svcDescH = document.querySelector('#serviceDetailModal h4');
            if (svcDescH && (svcDescH.textContent.includes('বিস্তারিত') || svcDescH.textContent.includes('Details'))) {
                svcDescH.textContent = t('common.details');
            }
            const callBtn = document.querySelector('#svcModalCall');
            if (callBtn) {
                const icon = callBtn.querySelector('i');
                callBtn.innerHTML = '';
                if (icon) callBtn.appendChild(icon);
                callBtn.appendChild(document.createTextNode(' ' + t('common.call')));
            }
            translateStaticUiText(document);
            startUiTranslationObserver();
            applyBrandName();
            updateLangButtonsUI();
            refreshIcons();
        }
        window.setLanguage = (lang) => {
            if (!['bn', 'en'].includes(lang)) return;
            currentLang = lang;
            try { localStorage.setItem('amar-elaka-lang', lang); } catch (e) {}
            applyLanguage();
            showToast(lang === 'bn' ? t('toast.langBn') : t('toast.langEn'), 'languages', 'text-emerald-400');
        };
        // apply saved language early
        applyLanguage();

        // ========== RATING SYSTEM ==========
        let selectedRating = 0;
        let existingUserRating = null; // { stars, comment, updatedAt }
        let ratingEditMode = false;

        function paintStars(containerSelector, value, interactive) {
            const root = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
            if (!root) return;
            const stars = root.querySelectorAll('.rating-star, [data-star]');
            stars.forEach(btn => {
                const n = parseInt(btn.getAttribute('data-star'), 10);
                const filled = n <= value;
                btn.innerHTML = filled ? '<svg class="ic ic-fill" aria-hidden="true"><use href="#i-star"/></svg>' : '<svg class="ic" aria-hidden="true"><use href="#i-star"/></svg>';
                btn.classList.toggle('text-amber-400', filled);
                btn.classList.toggle('text-slate-500', !filled);
            });
        }

        function bindStarClicks() {
            document.querySelectorAll('#ratingStars .rating-star').forEach(btn => {
                btn.onclick = () => {
                    selectedRating = parseInt(btn.getAttribute('data-star'), 10);
                    paintStars('#ratingStars', selectedRating, true);
                };
            });
        }

        window.openRatingModal = async () => {
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast(t('rating.loginRequired'), 'circle-x', 'text-rose-400');
            selectedRating = 0;
            ratingEditMode = false;
            document.getElementById('ratingComment').value = '';
            document.getElementById('ratingFormView').classList.remove('hidden');
            document.getElementById('ratingExistingView').classList.add('hidden');
            paintStars('#ratingStars', 0, true);
            bindStarClicks();
            // Load existing rating
            existingUserRating = null;
            if (firebaseReady) {
                try {
                    const snap = await getDoc(doc(db, 'appRatings', currentUser.uid));
                    if (snap.exists()) {
                        existingUserRating = snap.data();
                        showExistingRatingView();
                    }
                } catch (e) { console.warn('Load rating failed', e); }
            }
            const m = document.getElementById('ratingModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            const btn = document.getElementById('ratingSubmitBtn');
            if (btn) {
                btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i><span>${existingUserRating ? t('rating.resubmit') : t('rating.submit')}</span>`;
            }
            refreshIcons();
        };

        function showExistingRatingView() {
            if (!existingUserRating) return;
            document.getElementById('ratingFormView').classList.add('hidden');
            document.getElementById('ratingExistingView').classList.remove('hidden');
            const stars = existingUserRating.stars || 0;
            const disp = document.getElementById('existingStarsDisplay');
            if (disp) {
                disp.innerHTML = [1,2,3,4,5].map(n =>
                    `<span class="text-2xl ${n <= stars ? 'text-amber-400' : 'text-slate-600'}">${n <= stars ? '<svg class="ic ic-fill" aria-hidden="true"><use href="#i-star"/></svg>' : '<svg class="ic" aria-hidden="true"><use href="#i-star"/></svg>'}</span>`
                ).join('');
            }
            const txt = document.getElementById('existingRatingText');
            if (txt) txt.textContent = (currentLang === 'en' ? 'Your previous rating: ' : 'আপনার আগের রেটিং: ') + stars + '/5';
            const box = document.getElementById('existingCommentBox');
            if (box) {
                if (existingUserRating.comment) {
                    box.textContent = existingUserRating.comment;
                    box.classList.remove('hidden');
                } else box.classList.add('hidden');
            }
        }

        window.enableRatingEdit = () => {
            ratingEditMode = true;
            selectedRating = existingUserRating?.stars || 0;
            document.getElementById('ratingExistingView').classList.add('hidden');
            document.getElementById('ratingFormView').classList.remove('hidden');
            document.getElementById('ratingComment').value = existingUserRating?.comment || '';
            paintStars('#ratingStars', selectedRating, true);
            bindStarClicks();
            const btn = document.getElementById('ratingSubmitBtn');
            if (btn) btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i><span>${t('rating.resubmit')}</span>`;
            refreshIcons();
        };

        window.closeRatingModal = () => {
            const m = document.getElementById('ratingModal');
            if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
            document.body.classList.remove('overflow-hidden');
        };

        window.submitRating = async () => {
            if (!currentUser) return showToast(t('rating.loginRequired'), 'circle-x', 'text-rose-400');
            if (!selectedRating || selectedRating < 1) return showToast(t('rating.selectStar'), 'star', 'text-amber-400');
            if (!firebaseReady) return showToast('Firebase not ready', 'triangle-alert', 'text-rose-400');
            const comment = (document.getElementById('ratingComment')?.value || '').trim();
            const btn = document.getElementById('ratingSubmitBtn');
            if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i>'; refreshIcons(); }
            try {
                const isUpdate = !!existingUserRating;
                await setDoc(doc(db, 'appRatings', currentUser.uid), {
                    uid: currentUser.uid,
                    userName: userProfile?.fullName || currentUser.displayName || '',
                    userEmail: userProfile?.email || currentUser.email || '',
                    userPhone: userProfile?.phone || '',
                    stars: selectedRating,
                    comment: comment,
                    updatedAt: serverTimestamp(),
                    createdAt: existingUserRating?.createdAt || serverTimestamp()
                }, { merge: true });
                existingUserRating = { stars: selectedRating, comment, updatedAt: new Date() };
                showToast(isUpdate ? t('rating.updated') : t('rating.thanks'), 'star', 'text-amber-400');
                showExistingRatingView();
            } catch (err) {
                showToast((err.code || err.message || 'Failed'), 'circle-x', 'text-rose-400');
            } finally {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i><span>${t('rating.resubmit')}</span>`;
                    refreshIcons();
                }
            }
        };

        // close rating modal on backdrop / escape list
        document.getElementById('ratingModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'ratingModal') closeRatingModal();
        });

        // ========== BODY SCROLL LOCK (sidebar / drawers) ==========
        function lockBodyScroll() {
            _scrollLockY = window.pageYOffset || document.documentElement.scrollTop || 0;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${_scrollLockY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.classList.add('overflow-hidden');
        }
        function unlockBodyScroll() {
            document.body.classList.remove('overflow-hidden');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            window.scrollTo(0, _scrollLockY || 0);
            _scrollLockY = 0;
        }

        // ========== SIDEBAR ==========
        window.openSidebar = () => {
            if (isForcedProfileMode) return;
            if (!currentUser) { showAuthScreen(); switchAuthTab('login'); return; }
            const b = document.getElementById('sidebarBackdrop');
            const d = document.getElementById('sidebarDrawer');
            b.classList.remove('hidden'); void b.offsetWidth;
            b.classList.remove('opacity-0'); b.classList.add('opacity-100');
            d.classList.remove('-translate-x-full'); d.classList.add('translate-x-0');
            lockBodyScroll();
        };
        window.closeSidebar = () => {
            const b = document.getElementById('sidebarBackdrop');
            const d = document.getElementById('sidebarDrawer');
            b.classList.remove('opacity-100'); b.classList.add('opacity-0');
            d.classList.remove('translate-x-0'); d.classList.add('-translate-x-full');
            unlockBodyScroll();
            setTimeout(() => { if (b.classList.contains('opacity-0')) b.classList.add('hidden'); }, 320);
        };
        window.sidebarNav = (action) => {
            if (!currentUser && !['news', 'launch'].includes(action)) { showAuthScreen(); switchAuthTab('login'); return; }
            closeSidebar();
            setTimeout(() => {
                if (action === 'subscription' && !isPremiumSystemLive()) {
                    showToast('প্রিমিয়াম সাবস্ক্রিপশন বর্তমানে উপলব্ধ নয়', 'crown', 'text-slate-400');
                    return;
                }
                if (action === 'provider') openProviderModal();
                else if (action === 'feedback') openFeedbackModal();
                else if (action === 'about') openAboutModal();
                else if (action === 'terms') openTermsModal();
                else if (action === 'settings') switchTab('settings');
                else if (action === 'contact') openContactModal();
                else if (action === 'result') openResultModal();
                else switchTab(action);
            }, 200);
        };
        window.sidebarLogout = () => { closeSidebar(); setTimeout(() => logoutUser(), 200); };
        document.getElementById('sidebarBackdrop')?.addEventListener('click', closeSidebar);

        // ========== SHARE / RATE ==========
        window.shareApp = () => {
            if (navigator.share) {
                navigator.share({
                    title: 'আমার এলাকা',
                    text: 'সকল সেবা এখন হাতের মুঠোয়। স্থানীয় পরিষেবা, জরুরি হেল্পলাইন এবং রক্তদাতা খুঁজুন একই প্ল্যাটফর্মে।',
                    url: window.location.origin
                }).then(() => {
                    showToast('শেয়ার সফল হয়েছে', 'check-circle', 'text-emerald-400');
                }).catch((err) => {
                    console.log('Share failed:', err);
                });
            } else {
                navigator.clipboard.writeText(window.location.origin).then(() => {
                    showToast('লিংক কপি হয়েছে, বন্ধুদের সাথে শেয়ার করুন!', 'copy', 'text-emerald-400');
                }).catch(() => {
                    showToast('শেয়ার করা যায়নি, লিংকটি ম্যানুয়ালি কপি করুন।', 'alert-circle', 'text-rose-400');
                });
            }
        };

        // ========== PROTECTED SECTION / SERVICE SHARING ==========
        async function copyShareUrl(url) {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(url);
                } else {
                    const field = document.createElement('textarea');
                    field.value = url; field.setAttribute('readonly', '');
                    field.style.position = 'fixed'; field.style.opacity = '0';
                    document.body.appendChild(field); field.select();
                    const ok = document.execCommand('copy'); field.remove();
                    if (!ok) throw new Error('Clipboard copy failed');
                }
                showToast('শেয়ার লিংক কপি হয়েছে', 'copy', 'text-emerald-400');
                return true;
            } catch (err) {
                console.warn('Copy share URL failed:', err);
                showToast('লিংক কপি করা যায়নি। আবার চেষ্টা করুন।', 'alert-circle', 'text-rose-400');
                return false;
            }
        }

        window.shareProtectedSection = async (section) => {
            if (!['blood', 'emergency'].includes(section)) return;
            if (!currentUser) {
                showToast('শেয়ার করতে প্রথমে লগইন বা রেজিস্ট্রেশন করুন', 'lock', 'text-amber-400');
                showAuthScreen();
                return;
            }
            const url = new URL(window.location.href);
            url.hash = section;
            const title = section === 'blood' ? 'আমার এলাকা — রক্তদাতা সন্ধান' : 'আমার এলাকা — জরুরি হেল্পলাইন';
            const text = section === 'blood'
                ? 'রক্তদাতা খুঁজতে আমার এলাকার রক্তদাতা বিভাগটি দেখুন।'
                : 'জরুরি যোগাযোগের নম্বর ও সহায়তার জন্য আমার এলাকার জরুরি বিভাগটি দেখুন।';
            if (navigator.share) {
                try {
                    await navigator.share({ title, text, url: url.toString() });
                    showToast('শেয়ার সফল হয়েছে', 'check-circle', 'text-emerald-400');
                } catch (err) {
                    if (err?.name !== 'AbortError') await copyShareUrl(url.toString());
                }
            } else await copyShareUrl(url.toString());
        };

        window.shareService = async (serviceId) => {
            if (!currentUser) { showAuthScreen(); switchAuthTab('login'); return; }
            const url = new URL(window.location.href);
            url.searchParams.set('service', serviceId);
            const service = servicesCache.find(x => x.id === serviceId) || favoritesCache.find(x => x.id === serviceId) || (allServicesFullCache || []).find(x => x.id === serviceId);
            const title = service?.title || 'আমার এলাকার সেবা';
            const payload = { title, text: `${title} — আমার এলাকা`, url: url.toString() };
            if (navigator.share) {
                try { await navigator.share(payload); showToast('সেবা শেয়ার সফল হয়েছে', 'check-circle', 'text-emerald-400'); }
                catch (err) { if (err?.name !== 'AbortError') await copyShareUrl(url.toString()); }
            } else await copyShareUrl(url.toString());
        };

        window.shareCurrentService = () => {
            if (activeServiceId) shareService(activeServiceId);
        };

        // Shared section links open the requested public section on page load.
        function openSharedSectionFromHash() {
            const section = String(window.location.hash || '').replace('#', '');
            if (['blood', 'emergency'].includes(section)) switchTab(section);
        }
        window.addEventListener('hashchange', openSharedSectionFromHash);

        window.rateApp = () => {
            closeSidebar();
            openRatingModal();
        };

        // ========== SETTINGS & CONTACT ==========


        window.openContactModal = () => { if (isForcedProfileMode) return; document.getElementById('contactModal').classList.remove('hidden'); document.getElementById('contactModal').classList.add('flex'); document.body.classList.add('overflow-hidden'); refreshIcons(); };
        window.closeContactModal = () => { document.getElementById('contactModal').classList.add('hidden'); document.getElementById('contactModal').classList.remove('flex'); document.body.classList.remove('overflow-hidden'); };

        // ========== NOTIF = পূর্ণ পেজ (মোডাল/পপআপ নয়) ==========
        window.openNotifPanel = () => {
            if (isForcedProfileMode) return;
            if (!currentUser) { showAuthScreen(); switchAuthTab('login'); return; }
            // চ্যাট থ্রেডে থাকলে নোটিফ খুলবে না
            if (document.body.classList.contains('chat-thread')) return;
            const store = getNotifStore();
            let changed = false;
            store.forEach(n => { if (!n.read) { n.read = true; changed = true; } });
            if (changed) saveNotifStore(store);
            renderNotifications();
            updateNotifBadge();
            const b = document.getElementById('notifBackdrop');
            const p = document.getElementById('notifPanel');
            if (b) { b.classList.add('hidden'); b.classList.remove('opacity-100'); b.classList.add('opacity-0'); }
            if (p) {
                p.classList.remove('translate-x-full');
                p.classList.add('translate-x-0');
            }
            document.body.classList.add('notif-page-open');
            document.querySelectorAll('.bottom-nav-btn').forEach(el => el.classList.remove('active'));
            document.getElementById('bnav-notif')?.classList.add('active');
        };
        window.closeNotifPanel = () => {
            const b = document.getElementById('notifBackdrop');
            const p = document.getElementById('notifPanel');
            if (b) {
                b.classList.add('hidden');
                b.classList.remove('opacity-100');
                b.classList.add('opacity-0');
                b.style.bottom = '';
            }
            if (p) {
                p.classList.remove('translate-x-0');
                p.classList.add('translate-x-full');
            }
            document.body.classList.remove('notif-page-open');
            document.getElementById('bnav-notif')?.classList.remove('active');
            // আগের ট্যাব হাইলাইট ফিরিয়ে আনা
            try {
                const tab = currentTab || 'services';
                const bnav = document.getElementById('bnav-' + tab);
                if (bnav) bnav.classList.add('active');
            } catch (e) {}
        };
        window.deleteNotification = (id, ev) => {
            if (ev) { ev.preventDefault(); ev.stopPropagation(); }
            const list = getNotifStore().filter(n => n.id !== id);
            saveNotifStore(list);
            renderNotifications();
            updateNotifBadge();
            showToast('নোটিফিকেশন মুছে ফেলা হয়েছে', 'trash-2', 'text-rose-400');
        };
        window.toggleNotifMenu = (id, ev) => {
            if (ev) { ev.preventDefault(); ev.stopPropagation(); }
            document.querySelectorAll('.notif-menu-pop').forEach(el => {
                if (el.dataset.nid !== id) el.classList.add('hidden');
            });
            const pop = document.querySelector(`.notif-menu-pop[data-nid="${id}"]`);
            if (pop) pop.classList.toggle('hidden');
        };
        document.addEventListener('click', () => {
            document.querySelectorAll('.notif-menu-pop').forEach(el => el.classList.add('hidden'));
        });

        const NOTIF_STORE_PREFIX = 'amar-notif-store-';
        const NOTIF_MAX = 100;
        function getNotifStore() { 
            if (!currentUser) return [];
            return lsGetJSON(NOTIF_STORE_PREFIX + currentUid(), []); 
        }
        function saveNotifStore(list) { 
            if (!currentUser) return;
            lsSetJSON(NOTIF_STORE_PREFIX + currentUid(), list.slice(0, NOTIF_MAX)); 
        }
        function addNotification(notif) {
            if (!notif || !notif.id || !currentUser) return;
            let list = getNotifStore();
            if (list.find(n => n.id === notif.id)) return;
            // Chat notifications: keep only the latest one at the top (no spam)
            if ((notif.type || '') === 'chat' || (notif.clickAction || '') === 'chat') {
                // প্রতি চ্যাটের জন্য শুধু সর্বশেষ নোটিফিকেশন (অ্যাডমিন = 'chat', DM = 'chat:<uid>')
                const ca = notif.clickAction || 'chat';
                list = list.filter(n => (n.clickAction || '') !== ca);
            }
            list.unshift({
                id: notif.id,
                type: notif.type || 'info',
                title: notif.title || 'নোটিফিকেশন',
                body: notif.body || '',
                icon: notif.icon || 'bell',
                image: notif.image || '',
                clickAction: notif.clickAction || 'home',
                read: false,
                time: new Date().toISOString()
            });
            saveNotifStore(list);
            renderNotifications();
            updateNotifBadge();
            try {
                if (notif.type === 'chat') playAppSound('message');
                else if (notif.type === 'login') playAppSound('login');
                else playAppSound('notify');
            } catch (e) {}
        }

        function handleNotificationClick(id) {
            const list = getNotifStore();
            const item = list.find(n => n.id === id);
            if (item && !item.read) {
                item.read = true;
                saveNotifStore(list);
                renderNotifications();
                updateNotifBadge();
            }
            const action = (item && item.clickAction) || 'home';
            navigateFromNotification(action);
            closeNotifPanel();
        }

        function navigateFromNotification(action) {
            if (typeof action === 'string' && action.startsWith('chat:')) { window.mesesuOpenFromPush(action.slice(5)); return; }
            const map = {
                'subscription': 'subscription',
                'chat': 'chat',
                'home': 'services',
                'services': 'services',
                'notice': 'services',
                'profile': 'profile'
            };
            const tab = map[action] || 'services';
            try { switchTab(tab); } catch (e) { console.warn(e); }
        }
        function getUnreadNotifCount() { return getNotifStore().filter(n => !n.read).length; }
        function updateNotifBadge() {
            const badge = document.getElementById('notifBadge');
            if (!badge) return;
            const count = getUnreadNotifCount();
            if (count > 0) { badge.textContent = count > 9 ? '9+' : String(count); badge.classList.remove('hidden'); badge.classList.add('flex'); }
            else { badge.classList.add('hidden'); badge.classList.remove('flex'); }
        }
        function formatNotifTime(iso) {
            const t = new Date(iso).getTime();
            if (!Number.isFinite(t)) return '';
            const diff = Date.now() - t;
            const mins = Math.floor(diff / 60000);
            if (mins < 1) return 'এইমাত্র';
            if (mins < 60) return `${mins} মিনিট আগে`;
            const hrs = Math.floor(mins / 60);
            if (hrs < 24) return `${hrs} ঘণ্টা আগে`;
            const days = Math.floor(hrs / 24);
            if (days < 7) return `${days} দিন আগে`;
            return new Date(iso).toLocaleDateString('bn-BD');
        }
        function renderNotifications() {
            const list = document.getElementById('notifList');
            const summary = document.getElementById('notifSummary');
            if (!list) return;
            const items = getNotifStore();
            const unread = items.filter(n => !n.read).length;
            if (summary) summary.textContent = unread > 0 ? `${unread}টি নতুন` : 'সব পড়া হয়েছে';
            if (!items.length) {
                list.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center px-4">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600/30 to-emerald-600/20 border border-emerald-500/40 flex items-center justify-center mb-3"><i data-lucide="bell-off" class="w-8 h-8 text-emerald-400"></i></div>
                    <h4 class="text-sm font-bold text-slate-200 mb-1">কোনো নোটিফিকেশন নেই</h4>
                    <p class="text-xs text-slate-400 max-w-xs">নতুন আপডেট বা ঘোষণা এলে এখানে দেখা যাবে।</p>
                </div>`;
                refreshIcons(); return;
            }
            list.innerHTML = items.map(n => {
                const iconHtml = n.image
                    ? `<div class="notif-icon overflow-hidden p-0"><img src="${esc(n.image)}" class="w-full h-full object-cover rounded-xl" alt=""></div>`
                    : `<div class="notif-icon"><i data-lucide="${esc(n.icon || 'bell')}"></i></div>`;
                return `
                <div class="notif-item ${n.read ? 'read' : 'unread'} relative" onclick="handleNotificationClick('${esc(n.id)}')">
                    ${iconHtml}
                    <div class="min-w-0 flex-1">
                        <div class="flex items-start justify-between gap-2">
                            <h4 data-user-content="true" class="text-xs font-bold text-slate-100 leading-snug">${esc(n.title)}</h4>
                            ${!n.read ? '<span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>' : ''}
                        </div>
                        ${n.body ? `<p data-user-content="true" class="mt-0.5 text-[11px] text-slate-400 leading-relaxed line-clamp-2">${esc(n.body)}</p>` : ''}
                        <span class="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><i data-lucide="clock" class="w-2.5 h-2.5"></i>${esc(formatNotifTime(n.time))}</span>
                    </div>
                    <button type="button" class="notif-menu-btn" onclick="toggleNotifMenu('${esc(n.id)}', event)" aria-label="মেনু">
                        <i data-lucide="ellipsis-vertical" class="w-4 h-4"></i>
                    </button>
                    <div class="notif-menu-pop hidden" data-nid="${esc(n.id)}" onclick="event.stopPropagation()">
                        <button type="button" onclick="deleteNotification('${esc(n.id)}', event)">
                            <span class="inline-flex items-center gap-2"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> ডিলিট</span>
                        </button>
                    </div>
                </div>`;
            }).join('');
            refreshIcons();
        }
        window.markNotificationRead = (id) => {
            const list = getNotifStore();
            const item = list.find(n => n.id === id);
            if (!item || item.read) return;
            item.read = true; saveNotifStore(list); renderNotifications(); updateNotifBadge();
        };
        window.markAllNotificationsRead = () => {
            const list = getNotifStore();
            let changed = false;
            list.forEach(n => { if (!n.read) { n.read = true; changed = true; } });
            if (changed) { saveNotifStore(list); renderNotifications(); updateNotifBadge(); showToast('সব নোটিফিকেশন পড়া হিসেবে চিহ্নিত হয়েছে', 'check-check', 'text-emerald-400'); }
            else showToast('সব নোটিফিকেশন আগেই পড়া হয়েছে', 'info', 'text-emerald-400');
        };
        function trackCollectionUpdates(collectionName, items, callback) {
            const key = `amar-track-${collectionName}-${currentUid()}`;
            const stored = lsGetJSON(key, null);
            const isFirst = !stored || !Array.isArray(stored);
            const seen = new Set(isFirst ? [] : stored);
            if (isFirst) items.forEach(it => seen.add(it.id));
            else items.forEach(it => { if (!seen.has(it.id)) { try { callback(it); } catch (e) {} seen.add(it.id); } });
            lsSetJSON(key, [...seen]);
        }
        function pushWelcomeNotification(kind) {
            if (!currentUser) return;
            const dateKey = new Date().toISOString().slice(0, 10);
            const id = `welcome-${currentUser.uid}-${dateKey}`;
            const name = userProfile?.fullName || currentUser.email || 'ব্যবহারকারী';
            const title = kind === 'register' ? `স্বাগতম, ${name}!` : `আবার স্বাগতম, ${name}!`;
            const body = kind === 'register' ? 'আপনার অ্যাকাউন্ট তৈরি হয়েছে। এখন সব সেবা ব্যবহার করতে পারবেন।' : 'সফলভাবে লগইন করেছেন।';
            addNotification({ id, type: 'login', title, body, icon: kind === 'register' ? 'sparkles' : 'log-in' });
        }
        function showAuthScreen() {
            document.getElementById('authSection').classList.remove('hidden');
            document.getElementById('appContent').classList.add('hidden');
            document.getElementById('appContent').classList.remove('flex');
            document.body.classList.add('overflow-hidden');
        }
        function hideAuthScreen() {
            document.getElementById('authSection').classList.add('hidden');
            document.getElementById('appContent').classList.remove('hidden');
            document.getElementById('appContent').classList.add('flex');
            document.body.classList.remove('overflow-hidden');
            refreshIcons();
            setTimeout(openSharedSectionFromHash, 150);
        }

        // ========== HEARTBEAT ==========
        async function logSessionEvent(uid, kind) {
            try {
                const d = new Date().toISOString().slice(0, 10);
                await setDoc(doc(db, 'users', uid, 'dailyActivity', d), { date: d, [kind === 'login' ? 'loginCount' : 'logoutCount']: increment(1), [kind === 'login' ? 'lastLoginAt' : 'lastLogoutAt']: serverTimestamp() }, { merge: true });
            } catch (e) {}
        }
        async function updateUserHeartbeat(isOnline) {
            if (!currentUser) return;
            try {
                const update = { isOnline, lastSeen: serverTimestamp() };
                if (!isOnline) update.lastLogout = serverTimestamp();
                await setDoc(doc(db, 'users', currentUser.uid), update, { merge: true });
            } catch (e) { console.warn('Heartbeat error', e); }
        }
        function startUserHeartbeat() {
            if (heartbeatInterval) clearInterval(heartbeatInterval);
            updateUserHeartbeat(true);
            heartbeatInterval = setInterval(() => { if (document.visibilityState === 'visible') updateUserHeartbeat(true); }, 300000);
        }
        function stopUserHeartbeat() { if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; } updateUserHeartbeat(false); }

        // ========== ACTIVITY ==========
        function todayKey() { return new Date().toISOString().slice(0, 10); }
        async function flushActivityTime() {
            if (!currentUser || !firebaseReady || !lastActivityTimestamp) return;
            const elapsed = Math.floor((Date.now() - lastActivityTimestamp) / 1000);
            if (elapsed < 1) return;
            lastActivityTimestamp = Date.now();
            try {
                await setDoc(doc(db, 'users', currentUser.uid, 'dailyActivity', todayKey()), {
                    date: todayKey(), totalTimeSeconds: increment(elapsed), lastActiveAt: serverTimestamp()
                }, { merge: true });
            } catch (e) {}
        }
        function startActivityTracking() {
            if (!currentUser || !firebaseReady) return;
            lastActivityTimestamp = Date.now();
            if (activityUpdateInterval) clearInterval(activityUpdateInterval);
            activityUpdateInterval = setInterval(() => {
                if (document.visibilityState === 'visible' && currentUser) flushActivityTime();
            }, 60000);
        }
        function stopActivityTracking() {
            if (activityUpdateInterval) { clearInterval(activityUpdateInterval); activityUpdateInterval = null; }
            if (lastActivityTimestamp && currentUser && firebaseReady) flushActivityTime();
            lastActivityTimestamp = null;
        }
        async function flushPendingActivity() {
            if (!currentUser || !firebaseReady) return;
            const pendingKey = `pending-activity-${currentUid()}`;
            const pending = parseInt(lsGet(pendingKey, '0'), 10) || 0;
            if (pending < 1) return;
            try {
                await setDoc(doc(db, 'users', currentUser.uid, 'dailyActivity', todayKey()), {
                    date: todayKey(), totalTimeSeconds: increment(pending), lastActiveAt: serverTimestamp()
                }, { merge: true });
                lsSet(pendingKey, '0');
            } catch (e) {}
        }
        async function trackCallClick(serviceName, phoneNumber) {
            if (!currentUser || !firebaseReady) return;
            try {
                const today = todayKey();
                await addDoc(collection(db, 'callClicks'), {
                    uid: currentUser.uid, userName: userProfile?.fullName || '', userPhone: userProfile?.phone || '',
                    userEmail: userProfile?.email || '', serviceName: serviceName || 'Call Now',
                    phoneNumber: String(phoneNumber || ''), date: today, timestamp: serverTimestamp()
                });
                await setDoc(doc(db, 'users', currentUser.uid, 'dailyActivity', today), {
                    date: today, callClicks: increment(1), lastActiveAt: serverTimestamp()
                }, { merge: true });
            } catch (e) {}
        }
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="tel:"]');
            if (link && currentUser) trackCallClick(link.dataset.serviceName || 'Call Now', link.getAttribute('href').replace('tel:', ''));
        });
        document.addEventListener('visibilitychange', () => {
            if (!currentUser) return;
            if (document.visibilityState === 'hidden') { stopActivityTracking(); updateUserHeartbeat(false); }
            else { updateUserHeartbeat(true); startActivityTracking(); }
        });
        window.addEventListener('beforeunload', () => {
            if (currentUser) {
                try { updateUserHeartbeat(false); } catch (e) {}
                if (lastActivityTimestamp) {
                    const elapsed = Math.floor((Date.now() - lastActivityTimestamp) / 1000);
                    if (elapsed > 0) {
                        const pk = `pending-activity-${currentUid()}`;
                        lsSet(pk, String((parseInt(lsGet(pk, '0'), 10) || 0) + elapsed));
                    }
                }
                try { endUserActivitySession(); } catch (e) {}
            }
        });

        // ========== USER ACTIVITY LOGS (user_activity_logs) ==========
        let aeActivitySessionDocId = null;
        let aeActivityLoginMs = null;
        let aeActivityEnding = false;

        async function startUserActivitySession() {
            if (!currentUser || !firebaseReady || !db) return;
            if (aeActivitySessionDocId) return; // one active session per page load
            try {
                const uid = currentUser.uid;
                const name = (userProfile && (userProfile.fullName || userProfile.name)) || currentUser.displayName || '';
                const email = (userProfile && userProfile.email) || currentUser.email || '';
                const phone = (userProfile && userProfile.phone) || '';
                const district = (userProfile && userProfile.district) || '';
                const upazila = (userProfile && userProfile.upazila) || '';
                const sessionId = (crypto?.randomUUID?.() || ('sess-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10)));
                const loginTime = new Date();
                const dateKey = loginTime.toISOString().slice(0, 10);

                // Count how many times this user already logged in today
                let loginCountToday = 1;
                try {
                    const qToday = query(collection(db, 'user_activity_logs'), where('uid', '==', uid), where('dateKey', '==', dateKey));
                    const snapToday = await getDocs(qToday);
                    loginCountToday = snapToday.size + 1;
                } catch (e) {
                    // Fallback without composite index: fetch recent and filter client-side
                    try {
                        const qUid = query(collection(db, 'user_activity_logs'), where('uid', '==', uid), limit(50));
                        const snapUid = await getDocs(qUid);
                        const count = snapUid.docs.filter(d => (d.data().dateKey === dateKey)).length;
                        loginCountToday = count + 1;
                    } catch (e2) { loginCountToday = 1; }
                }

                const ref = await addDoc(collection(db, 'user_activity_logs'), {
                    uid,
                    name,
                    email,
                    phone,
                    district,
                    upazila,
                    sessionId,
                    dateKey,
                    loginTime,
                    loginCountToday,
                    logoutTime: null,
                    durationInMinutes: null,
                    createdAt: serverTimestamp()
                });
                aeActivitySessionDocId = ref.id;
                aeActivityLoginMs = loginTime.getTime();
                try {
                    sessionStorage.setItem('ae_activity_session_doc', ref.id);
                    sessionStorage.setItem('ae_activity_login_ms', String(aeActivityLoginMs));
                } catch (e) {}
            } catch (e) {
                console.warn('startUserActivitySession', e);
            }
        }

        async function endUserActivitySession() {
            if (aeActivityEnding) return;
            const docId = aeActivitySessionDocId || (function () {
                try { return sessionStorage.getItem('ae_activity_session_doc'); } catch (e) { return null; }
            })();
            if (!docId || !firebaseReady || !db) return;
            aeActivityEnding = true;
            try {
                const loginMs = aeActivityLoginMs || parseInt((function () {
                    try { return sessionStorage.getItem('ae_activity_login_ms') || '0'; } catch (e) { return '0'; }
                })(), 10) || Date.now();
                const logoutTime = new Date();
                const durationInMinutes = Math.max(0, Math.round((logoutTime.getTime() - loginMs) / 60000));
                await updateDoc(doc(db, 'user_activity_logs', docId), {
                    logoutTime,
                    durationInMinutes,
                    updatedAt: serverTimestamp()
                });
            } catch (e) {
                console.warn('endUserActivitySession', e);
            } finally {
                aeActivitySessionDocId = null;
                aeActivityLoginMs = null;
                try {
                    sessionStorage.removeItem('ae_activity_session_doc');
                    sessionStorage.removeItem('ae_activity_login_ms');
                } catch (e) {}
                aeActivityEnding = false;
            }
        }

        // Best-effort on mobile/back navigation
        window.addEventListener('pagehide', () => {
            try { endUserActivitySession(); } catch (e) {}
        });

        // ========== ONLINE / OFFLINE UI HANDLERS ==========
        function updateOnlineUI() {
            const banner = document.getElementById('offlineBanner');
            if (!banner) return;
            if (navigator.onLine) {
                banner.classList.add('hidden');
            } else {
                banner.classList.remove('hidden');
            }
        }
        window.addEventListener('online', () => {
            updateOnlineUI();
            showToast('ইন্টারনেট ফিরেছে — sync হচ্ছে', 'wifi', 'text-emerald-400');
            setTimeout(() => {
                if (currentTab === 'chat') markMessagesAsRead();
                updateUnreadBadge();
            }, 1500);
        });
        window.addEventListener('offline', () => {
            updateOnlineUI();
            showToast('অফলাইন — ক্যাশ থেকে দেখছেন', 'wifi-off', 'text-amber-400');
        });

        // ========== PUSH ==========
        async function setupPushNotifications() {
            // Permission is NOT requested on page load / login.
            // User must click "Enable Notifications" (enablePushNotifications).
            // If permission was already granted earlier, we still register SW + refresh token.
            if (!currentUser || !firebaseReady) return;
            try {
                if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
                const isFlutterApp = !!(window.flutterFcmBridgeReady || window.FlutterBridge);
                const permission = Notification.permission;
                if (!isFlutterApp) {
                    try {
                        await setDoc(doc(db, 'users', currentUser.uid), {
                            notifPermission: permission,
                            notifPermissionAt: serverTimestamp(),
                            notifDevice: (navigator.userAgent || '').slice(0, 120)
                        }, { merge: true });
                    } catch (e) {}
                }
                if (permission !== 'granted') {
                    try { updateNotifEnableUI(); } catch (e) {}
                    return;
                }
                messaging = getMessaging(app);
                if (!isFlutterApp) {
                    try {
                        const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                        await navigator.serviceWorker.ready;
                        const token = await getToken(messaging, {
                            vapidKey: VAPID_PUBLIC_KEY,
                            serviceWorkerRegistration: reg
                        });
                        if (token) {
                            await setDoc(doc(db, 'users', currentUser.uid), { fcmToken: token }, { merge: true });
                        }
                    } catch (tokenErr) {
                        console.log('FCM token setup error:', tokenErr);
                    }
                }
                try {
                    onMessage(messaging, (payload) => {
                        const n = payload.notification || {};
                        const d = payload.data || {};
                        const title = n.title || d.title || 'Amar Elaka';
                        const body = n.body || d.body || '';
                        const clickAction = d.clickAction || d.click_action || 'home';
                        const image = n.image || d.image || '';
                        const id = `push-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
                        addNotification({
                            id,
                            type: String(clickAction).split(':')[0] === 'chat' ? 'chat' : (clickAction === 'subscription' ? 'subscription' : 'info'),
                            title,
                            body,
                            icon: String(clickAction).startsWith('chat:') ? 'message-circle' : (clickAction === 'chat' ? 'headset' : (clickAction === 'subscription' ? 'crown' : 'bell')),
                            image,
                            clickAction
                        });
                        showToast(`${title}: ${body}`, 'bell', 'text-emerald-400');
                    });
                } catch (msgErr) {
                    console.log('onMessage setup:', msgErr);
                }
                try { updateNotifEnableUI(); } catch (e) {}
            } catch (e) {
                console.log('setupPushNotifications', e);
            }
        }

        /** User-initiated only: requests Notification permission, registers SW, gets FCM token, saves to users/{uid}.fcmToken */
        async function enablePushNotifications() {
            if (!currentUser || !firebaseReady) {
                try { showToast('নোটিফিকেশন চালু করতে লগইন করুন', 'circle-x', 'text-rose-400'); } catch (e) {}
                return;
            }
            try {
                if (!('Notification' in window)) {
                    try { showToast('এই ব্রাউজার নোটিফিকেশন সাপোর্ট করে না', 'circle-x', 'text-rose-400'); } catch (e) {}
                    return;
                }
                if (!('serviceWorker' in navigator)) {
                    try { showToast('সার্ভিস ওয়ার্কার সাপোর্ট নেই', 'circle-x', 'text-rose-400'); } catch (e) {}
                    return;
                }
                const permission = await Notification.requestPermission();
                const isFlutterApp = !!(window.flutterFcmBridgeReady || window.FlutterBridge);
                if (!isFlutterApp) {
                    try {
                        await setDoc(doc(db, 'users', currentUser.uid), {
                            notifPermission: permission,
                            notifPermissionAt: serverTimestamp(),
                            notifDevice: (navigator.userAgent || '').slice(0, 120)
                        }, { merge: true });
                    } catch (e) {}
                }
                if (permission !== 'granted') {
                    try { showToast('নোটিফিকেশন অনুমতি দেওয়া হয়নি', 'bell-off', 'text-amber-400'); } catch (e) {}
                    try { updateNotifEnableUI(); } catch (e) {}
                    return;
                }
                messaging = getMessaging(app);
                if (!isFlutterApp) {
                    const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                    await navigator.serviceWorker.ready;
                    const token = await getToken(messaging, {
                        vapidKey: VAPID_PUBLIC_KEY,
                        serviceWorkerRegistration: reg
                    });
                    if (token) {
                        await setDoc(doc(db, 'users', currentUser.uid), { fcmToken: token }, { merge: true });
                        try { showToast('নোটিফিকেশন সফলভাবে চালু হয়েছে!', 'bell', 'text-emerald-400'); } catch (e) {}
                    } else {
                        try { showToast('FCM টোকেন পাওয়া যায়নি', 'circle-x', 'text-amber-400'); } catch (e) {}
                    }
                } else {
                    try { showToast('নোটিফিকেশন অনুমতি দেওয়া হয়েছে', 'bell', 'text-emerald-400'); } catch (e) {}
                }
                try {
                    onMessage(messaging, (payload) => {
                        const n = payload.notification || {};
                        const d = payload.data || {};
                        const title = n.title || d.title || 'Amar Elaka';
                        const body = n.body || d.body || '';
                        const clickAction = d.clickAction || d.click_action || 'home';
                        const image = n.image || d.image || '';
                        const id = `push-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
                        addNotification({
                            id,
                            type: String(clickAction).split(':')[0] === 'chat' ? 'chat' : (clickAction === 'subscription' ? 'subscription' : 'info'),
                            title,
                            body,
                            icon: String(clickAction).startsWith('chat:') ? 'message-circle' : (clickAction === 'chat' ? 'headset' : (clickAction === 'subscription' ? 'crown' : 'bell')),
                            image,
                            clickAction
                        });
                        showToast(`${title}: ${body}`, 'bell', 'text-emerald-400');
                    });
                } catch (msgErr) {
                    console.log('onMessage setup:', msgErr);
                }
                try { updateNotifEnableUI(); } catch (e) {}
            } catch (e) {
                console.log('enablePushNotifications error:', e);
                try { showToast('নোটিফিকেশন সেটআপ ব্যর্থ হয়েছে', 'circle-x', 'text-rose-400'); } catch (err) {}
            }
        }
        window.enablePushNotifications = enablePushNotifications;

        function updateNotifEnableUI() {
            const btn = document.getElementById('enableNotifBtn');
            const status = document.getElementById('notifPermissionStatus');
            if (!btn && !status) return;
            const perm = (typeof Notification !== 'undefined' && Notification.permission) ? Notification.permission : 'default';
            if (status) {
                if (perm === 'granted') status.textContent = 'চালু';
                else if (perm === 'denied') status.textContent = 'ব্লক করা হয়েছে';
                else status.textContent = 'বন্ধ';
            }
            if (btn) {
                if (perm === 'granted') {
                    btn.disabled = true;
                    btn.classList.add('opacity-60', 'cursor-not-allowed');
                    const t = btn.querySelector('[data-enable-notif-label]');
                    if (t) t.textContent = 'নোটিফিকেশন চালু আছে';
                } else if (perm === 'denied') {
                    btn.disabled = true;
                    btn.classList.add('opacity-60', 'cursor-not-allowed');
                    const t = btn.querySelector('[data-enable-notif-label]');
                    if (t) t.textContent = 'ব্রাউজার সেটিংস থেকে অনুমতি দিন';
                } else {
                    btn.disabled = false;
                    btn.classList.remove('opacity-60', 'cursor-not-allowed');
                    const t = btn.querySelector('[data-enable-notif-label]');
                    if (t) t.textContent = 'নোটিফিকেশন চালু করুন';
                }
            }
        }
        window.updateNotifEnableUI = updateNotifEnableUI;

        // ========== CHAT AUTO CLEAR ==========
        async function clearOldChatMessages() {
            if (!currentUser || !firebaseReady || !navigator.onLine) return;
            try {
                const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                const q = query(
                    collection(db, `chats/${currentUser.uid}/messages`),
                    where('deliveredAt', '<=', sevenDaysAgo)
                );
                const snap = await getDocs(q);
                if (snap.empty) return;
                const batch = writeBatch(db);
                snap.forEach(d => batch.delete(d.ref));
                await batch.commit();
            } catch (e) { console.warn('Chat cleanup:', e); }
        }
        function startChatAutoClear() { clearOldChatMessages(); setInterval(clearOldChatMessages, 600000); }

        // ========== IMAGE UPLOAD ==========
        window.previewProfilePic = (e) => {
            if (isForcedProfileMode) return;
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > 5 * 1024 * 1024) return showToast('ছবির সাইজ ৫MB এর কম হতে হবে', 'circle-x', 'text-rose-400');
            selectedProfilePicFile = file;
            const r = new FileReader();
            r.onload = ev => {
                document.getElementById('editProfilePicPreview').src = ev.target.result;
                document.getElementById('editProfilePicPreview').classList.remove('hidden');
                document.getElementById('editProfilePicPlaceholder').classList.add('hidden');
            };
            r.readAsDataURL(file);
        };
        async function compressImage(file, maxWidth = 1200, quality = 0.82) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        let { width, height } = img;
                        if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
                        canvas.width = width; canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        canvas.toBlob(blob => {
                            if (blob) resolve(new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }));
                            else reject(new Error('Compress failed'));
                        }, 'image/jpeg', quality);
                    };
                    img.onerror = reject;
                    img.src = e.target.result;
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
        async function uploadToCloudinary(file) {
            let toUpload = file;
            try {
                if (file.size > 300 * 1024) toUpload = await compressImage(file);
            } catch (e) {}
            const fd = new FormData();
            fd.append('file', toUpload);
            fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
            if (!res.ok) throw new Error('ছবি আপলোড ব্যর্থ');
            const data = await res.json();
            return data.secure_url;
        }


        window.requestSubscriptionCancel = async () => {
            if (!currentUser || !firebaseReady) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!isUserPremium) return showToast('কোনো একটিভ সাবস্ক্রিপশন নেই', 'info', 'text-slate-400');
            if (!confirm('আপনি কি সাবস্ক্রিপশন বাতিলের অনুরোধ পাঠাতে চান?')) return;
            try {
                await addDoc(collection(db, 'subscriptionCancelRequests'), {
                    userId: currentUser.uid,
                    userName: userProfile?.fullName || 'Unknown',
                    userPhone: userProfile?.phone || '',
                    userEmail: userProfile?.email || currentUser.email || '',
                    currentPlan: userProfile?.premiumPlan || userProfile?.currentPlan || 'Unknown',
                    premiumExpiry: userProfile?.premiumExpiry || null,
                    status: 'pending',
                    createdAt: serverTimestamp()
                });
                await setDoc(doc(db, 'users', currentUser.uid), {
                    cancelRequestStatus: 'pending',
                    cancelRequestedAt: serverTimestamp()
                }, { merge: true });
                if (userProfile) userProfile.cancelRequestStatus = 'pending';
                showToast('বাতিলের অনুরোধ পাঠানো হয়েছে। অ্যাডমিন অনুমোদনের অপেক্ষা করুন।', 'check-circle', 'text-emerald-400');
            } catch (err) {
                console.error(err);
                showToast('অনুরোধ পাঠানো যায়নি: ' + (err.code || err.message), 'circle-x', 'text-rose-400');
            }
        };

        // ========== SUBSCRIPTION ==========
        window.selectPackage = (name, amount, el, days) => {
            if (!isPremiumSystemLive()) return showToast('প্রিমিয়াম সাবস্ক্রিপশন বর্তমানে উপলব্ধ নয়', 'crown', 'text-slate-400');
            if (isForcedProfileMode) return;
            const d = Number(days) || PLAN_DAYS_MAP[name] || 30;
            if (isUserPremium) {
                const userDays = getUserCurrentPackageDays();
                const curName = (userProfile?.premiumPlan || userProfile?.currentPlan || '').toLowerCase();
                if ((userDays > 0 && d <= userDays) || (curName && String(name).toLowerCase() === curName)) {
                    return showToast('এই প্যাকেজ আপনার জন্য উপলব্ধ নয়', 'lock', 'text-amber-400');
                }
            }
            selectedPackage = { name, amount: Number(amount), days: d };
            document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
            if (el) el.classList.add('selected');
            document.getElementById('paySelectedPackageName').textContent = name;
            document.getElementById('paySelectedPackageAmount').textContent = `৳${amount}`;
            const banner = document.getElementById('payExistingPlanBanner');
            const bt = document.getElementById('payExistingPlanText');
            if (isUserPremium && userProfile?.premiumExpiry) {
                let et = typeof userProfile.premiumExpiry.toDate === 'function' ? userProfile.premiumExpiry.toDate().getTime() : new Date(userProfile.premiumExpiry).getTime();
                const dl = Math.ceil((et - Date.now()) / 86400000);
                if (dl > 0 && banner && bt) { banner.classList.remove('hidden'); bt.textContent = `You have ${dl} day${dl !== 1 ? 's' : ''} left. Buying will extend.`; }
            } else if (banner) banner.classList.add('hidden');
            setTimeout(() => switchTab('payment'), 150);
        };
        window.selectPaymentMethod = (m, el) => {
            if (isForcedProfileMode) return;
            selectedPaymentMethod = m;
            document.querySelectorAll('.pay-method-card').forEach(c => c.classList.remove('selected'));
            if (el) el.classList.add('selected');
            updatePaymentNumberDisplay();
        };
        window.copyPaymentNumber = () => {
            if (isForcedProfileMode) return;
            const num = getPaymentNumberForMethod(selectedPaymentMethod);
            navigator.clipboard.writeText(num).then(() => showToast('Number copied!', 'copy', 'text-emerald-400')).catch(() => showToast('Copy failed', 'alert-circle', 'text-rose-400'));
        };
        window.submitSubscriptionRequest = async (e) => {
            e.preventDefault();
            if (!isPremiumSystemLive()) return showToast('প্রিমিয়াম সাবস্ক্রিপশন বর্তমানে উপলব্ধ নয়', 'crown', 'text-slate-400');
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('Please login first.', 'circle-x', 'text-rose-400');
            if (!selectedPaymentMethod) return showToast('Select payment method.', 'alert-circle', 'text-amber-400');
            const trxId = document.getElementById('subTrxId').value.trim();
            if (trxId.length < 5) return showToast('Invalid Transaction ID.', 'circle-x', 'text-rose-400');
            const rate = checkRateLimit('subscription');
            if (!rate.allowed) return showToast(`Wait ${rate.remaining}s`, 'clock', 'text-amber-400');
            const btn = document.getElementById('submitSubBtn');
            btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> Sending...'; refreshIcons();
            try {
                await addDoc(collection(db, 'subscriptionRequests'), {
                    userId: currentUser.uid, userName: userProfile?.fullName || 'Unknown', userPhone: userProfile?.phone || '',
                    userEmail: userProfile?.email || '', packageName: selectedPackage.name,
                    packageDays: selectedPackage.days || PLAN_DAYS_MAP[selectedPackage.name] || 30, amount: selectedPackage.amount,
                    paymentMethod: selectedPaymentMethod, transactionId: trxId, status: 'pending', createdAt: serverTimestamp()
                });
                await setDoc(doc(db, 'users', currentUser.uid), {
                    subscriptionStatus: 'pending', pendingPremiumPlan: selectedPackage.name,
                    pendingPremiumAmount: selectedPackage.amount, pendingPremiumDays: selectedPackage.days || PLAN_DAYS_MAP[selectedPackage.name] || 30,
                    pendingRequestAt: serverTimestamp()
                }, { merge: true });
                userProfile.subscriptionStatus = 'pending';
                userProfile.pendingPremiumPlan = selectedPackage.name;
                updateCurrentPlanDisplay();
                setRateLimit('subscription');
                showToast('Request sent! Wait for admin approval.', 'check-circle', 'text-emerald-400');
                switchTab('profile');
                document.getElementById('subTrxId').value = '';
            } catch (err) {
                showToast('Failed: ' + (err.code || err.message), 'circle-x', 'text-rose-400');
            } finally {
                btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Send Request'; refreshIcons();
            }
        };
        function updateCurrentPlanDisplay() {
            const nameEl = document.getElementById('currentPlanName');
            const subEl = document.getElementById('currentPlanSubtext');
            const badgeEl = document.getElementById('currentPlanBadge');
            const progressEl = document.getElementById('currentPlanProgress');
            const titleEl = document.getElementById('packagesSectionTitle');
            const profPlanName = document.getElementById('profilePlanName');
            const profPlanSub = document.getElementById('profilePlanSubtext');
            const profPlanAction = document.getElementById('profilePlanAction');
            let status = 'free', planName = 'Free', subtext = 'No active subscription';
            let badgeHTML = '<span class="px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-bold flex items-center gap-1"><i data-lucide="x-circle" class="w-3 h-3"></i> Free</span>';
            let progressHTML = '', profAction = 'Upgrade', profSub = 'No active subscription';
            if (userProfile) {
                const now = Date.now();
                let et = 0;
                if (userProfile.premiumExpiry) et = typeof userProfile.premiumExpiry.toDate === 'function' ? userProfile.premiumExpiry.toDate().getTime() : new Date(userProfile.premiumExpiry).getTime();
                const isActive = et > now;
                const isPending = !isActive && userProfile.subscriptionStatus === 'pending';
                if (isActive) {
                    status = 'active';
                    const dl = Math.ceil((et - now) / 86400000);
                    planName = userProfile.premiumPlan || 'Premium';
                    subtext = `Expires ${new Date(et).toLocaleDateString('en-GB')} — ${dl} day${dl !== 1 ? 's' : ''} left`;
                    badgeHTML = '<span class="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3 h-3"></i> Active</span>';
                    const td = userProfile.premiumTotalDays || PLAN_DAYS_MAP[planName] || 30;
                    const du = Math.max(0, td - dl);
                    const pct = Math.max(0, Math.min(100, (dl / td) * 100));
                    progressHTML = `<div class="flex items-center justify-between text-[10px] text-slate-400 mb-1"><span>Progress</span><span>${du}/${td} days used</span></div>
                        <div class="w-full bg-emerald-950/80 rounded-full h-2 overflow-hidden border border-emerald-900/60"><div class="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 transition-all" style="width:${pct}%"></div></div>
                        <p class="text-[10px] text-emerald-300 mt-2 flex items-center gap-1"><i data-lucide="info" class="w-3 h-3"></i> Purchase any package below to extend.</p>`;
                    profAction = 'Extend'; profSub = `${dl} day${dl !== 1 ? 's' : ''} remaining`;
                } else if (isPending) {
                    status = 'pending';
                    planName = userProfile.pendingPremiumPlan || 'Pending';
                    subtext = 'Payment is being verified.';
                    badgeHTML = '<span class="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> Pending</span>';
                    progressHTML = '<p class="text-[10px] text-amber-300 flex items-center gap-1 mt-1"><i data-lucide="hourglass" class="w-3 h-3"></i> You will be notified once approved.</p>';
                    profAction = 'View'; profSub = 'Verification in progress';
                } else if (et > 0) {
                    subtext = `Previous plan expired ${new Date(et).toLocaleDateString('en-GB')}`;
                    profSub = 'Plan expired';
                }
            }
            if (nameEl) { nameEl.textContent = planName; nameEl.className = `text-xl sm:text-2xl font-extrabold mt-1 ${status === 'active' ? 'text-amber-400' : (status === 'pending' ? 'text-amber-400' : 'text-white')}`; }
            if (subEl) subEl.textContent = subtext;
            if (badgeEl) badgeEl.innerHTML = badgeHTML;
            if (progressEl) progressEl.innerHTML = progressHTML;
            if (titleEl) titleEl.textContent = status === 'active' ? 'Extend Your Plan' : (status === 'pending' ? 'Buy Another Plan' : 'Select a Package');
            if (profPlanName) profPlanName.textContent = planName;
            if (profPlanSub) profPlanSub.textContent = profSub;
            if (profPlanAction) profPlanAction.textContent = profAction;
            // সেটিংস পেজের "প্রিমিয়াম ম্যানেজ করুন" কার্ড — শুধুমাত্র একটিভ প্রিমিয়াম সাবস্ক্রিপশন থাকলেই দৃশ্যমান হবে
            const settingsPremiumCard = document.getElementById('settingsManagePremiumCard');
            const settingsPremiumSub = document.getElementById('settingsPremiumSubtext');
            if (settingsPremiumCard) settingsPremiumCard.classList.toggle('hidden', status !== 'active');
            if (settingsPremiumSub) settingsPremiumSub.textContent = `${planName} — ${profSub}`;
            refreshIcons();
            try { renderSubscriptionPackages(); } catch (e) {}
        }

        // ========== AUTH ==========
        async function checkAndCreateUser(user, defaultName = null, defaultPhone = null) {
            const ref = doc(db, 'users', user.uid);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
                const profile = {
                    fullName: defaultName || user.displayName || 'নাগরিক', email: user.email || '', uid: user.uid,
                    photoURL: user.photoURL || '', phone: defaultPhone || user.phoneNumber || '', district: '', upazila: '',
                    isOnline: true, lastSeen: serverTimestamp(), lastLogin: serverTimestamp(), createdAt: serverTimestamp(),
                    subscriptionStatus: 'free'
                };
                await setDoc(ref, profile);
                userProfile = profile;
                try { sessionStorage.setItem('amar-welcome-pending', 'register'); } catch (e) {}
            } else {
                try { sessionStorage.setItem('amar-welcome-pending', 'login'); } catch (e) {}
            }
        }
        window.switchAuthTab = (tab) => {
            const lTab = document.getElementById('authTabLogin');
            const rTab = document.getElementById('authTabRegister');
            const lForm = document.getElementById('loginForm');
            const rForm = document.getElementById('registerForm');
            const isLogin = tab === 'login';
            lTab.classList.toggle('active', isLogin);
            rTab.classList.toggle('active', !isLogin);
            lForm.classList.toggle('hidden', !isLogin);
            rForm.classList.toggle('hidden', isLogin);
            const body = document.querySelector('.glass-card > .flex-1');
            if (body) body.scrollTop = 0;
            refreshIcons();
        };
        window.handleLoginSubmit = async (e) => {
            e.preventDefault();
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const email = document.getElementById('loginIdentifier').value.trim();
            const pass = document.getElementById('loginPassword').value;
            const btn = document.getElementById('loginBtn');
            btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> লগইন হচ্ছে...'; refreshIcons();
            try {
                await signInWithEmailAndPassword(auth, email, pass);
                try { sessionStorage.setItem('amar-welcome-pending', 'login'); } catch (e) {}
            } catch (err) {
                let m = err.message;
                if (err.code === 'auth/user-not-found') m = 'এই ইমেইলে অ্যাকাউন্ট নেই';
                else if (err.code === 'auth/wrong-password') m = 'পাসওয়ার্ড ভুল';
                else if (err.code === 'auth/invalid-email') m = 'ইমেইল সঠিক নয়';
                else if (err.code === 'auth/invalid-credential') m = 'ইমেইল বা পাসওয়ার্ড ভুল';
                else if (err.code === 'auth/too-many-requests') m = 'অনেকবার চেষ্টা — কিছুক্ষণ পরে';
                showToast(m, 'circle-x', 'text-rose-400');
                btn.disabled = false; btn.innerHTML = '<i data-lucide="log-in" class="w-4 h-4"></i> <span>প্রবেশ করুন</span>'; refreshIcons();
            }
        };
        window.handleForgotPassword = async () => {
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const emailInput = document.getElementById('loginIdentifier');
            const email = (emailInput?.value || '').trim();
            if (!email) {
                emailInput?.focus();
                return showToast('আগে আপনার রেজিস্ট্রেশন করা ইমেইল লিখুন', 'mail', 'text-amber-400');
            }
            const btn = document.querySelector('button[onclick="handleForgotPassword()"]');
            if (btn) btn.disabled = true;
            try {
                await sendPasswordResetEmail(auth, email);
                showToast('যদি এই ইমেইলে পাসওয়ার্ড লগইন চালু থাকে, তাহলে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে। ইনবক্স ও স্প্যাম ফোল্ডার দেখুন।', 'mail-check', 'text-emerald-400');
            } catch (err) {
                console.warn('Password reset request:', err?.code || err?.message);
                if (err.code === 'auth/invalid-email') showToast('সঠিক ইমেইল ঠিকানা লিখুন', 'circle-x', 'text-rose-400');
                else if (err.code === 'auth/too-many-requests') showToast('অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।', 'alert-circle', 'text-amber-400');
                else showToast('রিসেট লিংক পাঠানো যায়নি। ইমেইল ঠিকানা যাচাই করে আবার চেষ্টা করুন।', 'circle-x', 'text-rose-400');
            } finally { if (btn) btn.disabled = false; }
        };

        window.handleGoogleLogin = async () => {
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const btns = document.querySelectorAll('[onclick="handleGoogleLogin()"]');
            btns.forEach(b => { b.disabled = true; });
            try {
                try { sessionStorage.setItem('amar-welcome-pending', 'login'); } catch (e) {}
                const provider = new GoogleAuthProvider();
                provider.setCustomParameters({ prompt: 'select_account' });
                // Popup keeps the user on this site; do not switch to signInWithRedirect here.
                const result = await signInWithPopup(auth, provider);
                await checkAndCreateUser(result.user);
                showToast('গুগল লগইন সফল!', 'check-circle', 'text-emerald-400');
            } catch (err) {
                if (err.code === 'auth/popup-closed-by-user') showToast('লগইন বাতিল', 'x-circle', 'text-amber-400');
                else if (err.code === 'auth/popup-blocked') showToast('পপআপ ব্লক! অনুমতি দিন।', 'alert-circle', 'text-rose-400');
                else if (err.code === 'auth/account-exists-with-different-credential') showToast('এই ইমেইলে অন্য অ্যাকাউন্ট আছে!', 'alert-circle', 'text-rose-400');
                else showToast('গুগল লগইন ব্যর্থ', 'x-circle', 'text-rose-400');
            } finally {
                btns.forEach(b => { b.disabled = false; });
            }
        };
        window.handleGithubLogin = async () => {
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const btns = document.querySelectorAll('[onclick="handleGithubLogin()"]');
            btns.forEach(b => { b.disabled = true; });
            try {
                try { sessionStorage.setItem('amar-welcome-pending', 'login'); } catch (e) {}
                const provider = new GithubAuthProvider();
                const result = await signInWithPopup(auth, provider);
                await checkAndCreateUser(result.user);
                showToast('গিটহাব লগইন সফল!', 'check-circle', 'text-emerald-400');
            } catch (err) {
                if (err.code === 'auth/popup-closed-by-user') showToast('লগইন বাতিল', 'x-circle', 'text-amber-400');
                else if (err.code === 'auth/popup-blocked') showToast('পপআপ ব্লক! অনুমতি দিন।', 'alert-circle', 'text-rose-400');
                else if (err.code === 'auth/account-exists-with-different-credential') showToast('এই ইমেইলে অন্য অ্যাকাউন্ট আছে!', 'alert-circle', 'text-rose-400');
                else showToast('গিটহাব লগইন ব্যর্থ', 'x-circle', 'text-rose-400');
            } finally {
                btns.forEach(b => { b.disabled = false; });
            }
        };
        window.handleRegisterSubmit = async (e) => {
            e.preventDefault();
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const fullName = document.getElementById('regFullName').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const district = document.getElementById('regDistrict').value.trim();
            const upazila = document.getElementById('regUpazila').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const pass = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirmPassword').value;
            
            const isTermsAgreed = document.getElementById('regTermsAgree').checked;
            if (!isTermsAgreed) return showToast('অনুগ্রহ করে শর্তাবলী ও নীতিমালা পড়ে সম্মতি দিন।', 'alert-circle', 'text-rose-400');
            
            if (pass !== confirm) return showToast('পাসওয়ার্ড মিলছে না', 'circle-x', 'text-rose-400');
            if (!/^01[3-9]\d{8}$/.test(phone)) return showToast('সঠিক মোবাইল নম্বর দিন', 'circle-x', 'text-rose-400');
            if (!district) return showToast('জেলা নির্বাচন করুন', 'circle-x', 'text-rose-400');
            if (!upazila) return showToast('উপজেলা নির্বাচন করুন', 'circle-x', 'text-rose-400');
            
            const btn = document.getElementById('registerBtn');
            btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> রেজিস্ট্রেশন...'; refreshIcons();
            try {
                try { sessionStorage.setItem('amar-welcome-pending', 'register'); } catch (e) {}
                const cred = await createUserWithEmailAndPassword(auth, email, pass);
                const profile = {
                    fullName, phone, district, upazila, email, uid: cred.user.uid, profileEditedAt: serverTimestamp(),
                    isOnline: true, lastSeen: serverTimestamp(), lastLogin: serverTimestamp(),
                    createdAt: serverTimestamp(), subscriptionStatus: 'free'
                };
                await setDoc(doc(db, 'users', cred.user.uid), profile);
                userProfile = profile;
                updateProfileUI();
                document.getElementById('registerForm').reset();
                showToast('রেজিস্ট্রেশন সফল!', 'check-circle', 'text-emerald-400');
            } catch (err) {
                let m = err.message;
                if (err.code === 'auth/email-already-in-use') m = 'ইমেইল ইতিমধ্যে নিবন্ধিত';
                else if (err.code === 'auth/weak-password') m = 'পাসওয়ার্ড দুর্বল';
                else if (err.code === 'auth/invalid-email') m = 'ইমেইল সঠিক নয়';
                showToast(m, 'circle-x', 'text-rose-400');
            } finally {
                btn.disabled = false; btn.innerHTML = '<i data-lucide="user-plus" class="w-4 h-4"></i> <span>রেজিস্ট্রেশন করুন</span>'; refreshIcons();
            }
        };
        window.logoutUser = async () => {
            // Immediate logout: show login right away (no multi-second delay)
            const msg = (typeof t === 'function' && currentLang === 'en') ? 'Do you really want to log out?' : 'আপনি কি সত্যিই লগআউট করতে চান?';
            if (!confirm(msg)) return;
            try {
                try { await endUserActivitySession(); } catch (e) {}
                stopUserHeartbeat(); stopActivityTracking();
                // UI first so user lands on login instantly
                try { closeSidebar?.(); } catch (e) {}
                try { closeServiceDetailModal?.(); } catch (e) {}
                try { closePromotionDetailModal?.(); } catch (e) {}
                isForcedProfileMode = false;
                document.body.classList.remove('force-profile-mode');
                currentUser = null;
                userProfile = null;
                // লগআউটের পর লগইন পেজ নয় — গেস্ট মোডে হোম পেজ, নতুন করে ৩ মিনিট
                try { sessionStorage.removeItem('ae_guest_started_at'); sessionStorage.removeItem('ae_guest_preview_expired'); } catch (e) {}
                try { stopGuestPreviewTimer(); } catch (e) {}
                ['contactModal','aboutModal','termsModal','feedbackModal','ratingModal','editProfileModal','changePasswordModal','premiumActionModal','userEmergencyRequestModal','userBloodRequestModal','promotionFormModal','providerModal','chatInfoModal','noticeModal','categoryModal','downloadAppModal'].forEach(id => {
                    const fn = window['close' + id.charAt(0).toUpperCase() + id.slice(1)];
                    const el = document.getElementById(id);
                    if (el && !el.classList.contains('hidden') && typeof fn === 'function') { try { fn(); } catch (e) {} }
                });
                try { if (document.body.classList.contains('notif-page-open')) closeNotifPanel(); } catch (e) {}
                try { window.switchTab('services'); } catch (e) {}
                try { window.__aeNavReset && window.__aeNavReset(); } catch (e) {}
                showGuestApp();
                try { window.scrollTo(0, 0); } catch (e) {}
                const toastMsg = (typeof t === 'function' && currentLang === 'en') ? 'Logged out' : 'লগআউট হয়েছে';
                showToast(toastMsg, 'circle-check', 'text-emerald-400');
                // Fire analytics + Firebase signOut in background (do not block UI)
                const uid = auth?.currentUser?.uid;
                if (uid) {
                    try { logSessionEvent(uid, 'logout'); } catch (e) {}
                    try { writeSiteAnalyticsEvent('logout'); } catch (e) {}
                }
                try { await signOut(auth); } catch (e) {}
            } catch (err) {
                showToast(currentLang === 'en' ? 'Logout failed' : 'লগআউট ব্যর্থ', 'circle-x', 'text-rose-400');
            }
        };

        // ========== PROFILE UI ==========
        function updateProfileUI() {
            const nameEl = document.getElementById('sidebarUserName');
            const emailEl = document.getElementById('sidebarUserEmail');
            if (!userProfile) {
                if (nameEl) nameEl.textContent = 'অতিথি';
                if (emailEl) emailEl.textContent = 'লগইন করুন';
                myUpazilaFilterOn = false;
                if (activeCategory === MY_UPAZILA_CAT) activeCategory = 'all';
                try { renderCategoryChips(); } catch (e) {}
                try { if (typeof updateBloodDistrictToggleUI === 'function') updateBloodDistrictToggleUI(); } catch (e) {}
                return;
            }
            try { renderCategoryChips(); } catch (e) {}
            const addr = [userProfile.upazila, userProfile.district].filter(Boolean).join(', ') || '—';
            document.getElementById('profileNameText').textContent = userProfile.fullName || 'নাগরিক';
            document.getElementById('profilePhone').textContent = userProfile.phone || '—';
            document.getElementById('profileEmail').textContent = userProfile.email || '—';
            document.getElementById('profileLocation').textContent = userProfile.email || currentUser?.email || '—';
            document.getElementById('profileFullAddress').textContent = addr;
            try { if (typeof updateBloodDistrictToggleUI === 'function') updateBloodDistrictToggleUI(); } catch (e) {}
            const imgEl = document.getElementById('profilePicImg');
            const iconEl = document.getElementById('profilePicIcon');
            const sImg = document.getElementById('sidebarProfilePic');
            const sIcon = document.getElementById('sidebarProfileIcon');
            const bnavImg = document.getElementById('bnavProfilePic');
            const bnavIcon = document.getElementById('bnavProfileIcon');

            if (userProfile.photoURL) {
                if (imgEl) { imgEl.src = userProfile.photoURL; imgEl.classList.remove('hidden'); }
                if (iconEl) iconEl.classList.add('hidden');
                if (sImg) { sImg.src = userProfile.photoURL; sImg.classList.remove('hidden'); }
                if (sIcon) sIcon.classList.add('hidden');
                if (bnavImg) { bnavImg.src = userProfile.photoURL; bnavImg.classList.remove('hidden'); }
                if (bnavIcon) bnavIcon.classList.add('hidden');
            } else {
                if (imgEl) imgEl.classList.add('hidden');
                if (iconEl) iconEl.classList.remove('hidden');
                if (sImg) sImg.classList.add('hidden');
                if (sIcon) sIcon.classList.remove('hidden');
                if (bnavImg) bnavImg.classList.add('hidden');
                if (bnavIcon) bnavIcon.classList.remove('hidden');
            }
            
            let et = 0;
            if (userProfile.premiumExpiry) et = typeof userProfile.premiumExpiry.toDate === 'function' ? userProfile.premiumExpiry.toDate().getTime() : new Date(userProfile.premiumExpiry).getTime();
            // When admin turns OFF premium launch, treat everyone as non-premium (no blue tick / plan UI)
            isUserPremium = isPremiumSystemLive() && et > Date.now();
            const statusEl = document.getElementById('profileVerifyStatus');
            const verifyBtn = document.getElementById('profileVerifyBtn');
            const bBadge = document.getElementById('profileBlueBadge');
            const sBadge = document.getElementById('sidebarBlueBadge');
            
            if (isUserPremium) {
                statusEl.innerHTML = '<i data-lucide="shield-check" class="w-3 h-3"></i> Verified';
                statusEl.className = 'text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-1';
                verifyBtn.classList.add('hidden');
                if (bBadge) bBadge.classList.remove('hidden');
                if (sBadge) sBadge.classList.remove('hidden');
            } else {
                statusEl.innerHTML = '<i data-lucide="x-circle" class="w-3 h-3"></i> Unverified';
                statusEl.className = 'text-xs font-bold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1';
                verifyBtn.classList.remove('hidden');
                if (bBadge) bBadge.classList.add('hidden');
                if (sBadge) sBadge.classList.add('hidden');
            }
            if (nameEl) nameEl.textContent = userProfile.fullName || 'নাগরিক';
            if (emailEl) emailEl.textContent = userProfile.email || '—';
            updateCurrentPlanDisplay();
            refreshIcons();
        }
        window.openSupportFromProfile = () => { if (isForcedProfileMode) return; closeEditProfileModal(); switchTab('chat'); setTimeout(() => focusChatInput(), 400); };
        

        // ========== PROFILE EDIT LOCK (3 days, account based) ==========
        // Name, mobile, district and upazila are locked for 3 days after registration/profile completion
        // and after every edit of those fields. Profile picture is never locked.
        const PROFILE_LOCK_MS = 3 * 24 * 60 * 60 * 1000;
        let serverClockOffsetMs = 0;
        function serverNow() { return Date.now() + serverClockOffsetMs; }
        async function syncServerClock(uid) {
            // lastLogin was just written with serverTimestamp(); reading it back from the server gives the real server time
            const t0 = Date.now();
            const s = await getDocFromServer(doc(db, 'users', uid));
            const ll = s.exists() ? s.data().lastLogin : null;
            if (ll && typeof ll.toMillis === 'function') serverClockOffsetMs = ll.toMillis() - t0;
        }
        function getProfileLockInfo(profile) {
            const p = profile || userProfile;
            if (isForcedProfileMode || !p || !p.profileEditedAt) return { locked: false, remainingMs: 0 };
            const e = p.profileEditedAt;
            const ms = typeof e.toMillis === 'function' ? e.toMillis() : (e.seconds ? e.seconds * 1000 : null);
            if (ms == null) return { locked: false, remainingMs: 0 };
            const remaining = ms + PROFILE_LOCK_MS - serverNow();
            return { locked: remaining > 0, remainingMs: Math.max(0, remaining) };
        }
        function formatLockRemaining(ms) {
            const bn = (n) => Number(n).toLocaleString('bn-BD');
            const day = 24 * 60 * 60 * 1000, hour = 60 * 60 * 1000;
            const d = Math.floor(ms / day);
            const h = Math.ceil((ms % day) / hour);
            if (d > 0) return h > 0 && h < 24 ? `${bn(d)} দিন ${bn(h)} ঘণ্টা` : `${bn(d + (h >= 24 ? 1 : 0))} দিন`;
            return h > 0 ? `${bn(h)} ঘণ্টা` : 'কিছুক্ষণ';
        }
        function applyProfileLockUI() {
            const info = getProfileLockInfo();
            ['editFullName', 'editPhone', 'editDistrict', 'editUpazila'].forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                el.disabled = info.locked;
                el.classList.toggle('opacity-60', info.locked);
                el.classList.toggle('cursor-not-allowed', info.locked);
            });
            const note = document.getElementById('editProfileLockNotice');
            if (note) {
                note.classList.toggle('hidden', !info.locked);
                const txt = document.getElementById('editProfileLockText');
                if (txt && info.locked) txt.textContent = `নাম, মোবাইল নম্বর, জেলা ও উপজেলা আর ${formatLockRemaining(info.remainingMs)} পর পরিবর্তন করতে পারবেন। প্রোফাইল ছবি যেকোনো সময় পরিবর্তন করা যাবে।`;
            }
            refreshIcons();
        }

        window.openEditProfileModal = (force = false) => {
            if (!userProfile) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            
            isForcedProfileMode = force;
            
            document.getElementById('editFullName').value = userProfile.fullName || '';
            document.getElementById('editPhone').value = userProfile.phone || '';
            document.getElementById('editDistrict').value = userProfile.district || '';
            document.getElementById('editUpazila').value = userProfile.upazila || '';
            const passwordSetupSection = document.getElementById('googlePasswordSetupSection');
            const hasPasswordProvider = !!currentUser?.providerData?.some(p => p.providerId === 'password');
            const isGoogleAccount = !!currentUser?.providerData?.some(p => p.providerId === 'google.com');
            if (passwordSetupSection) passwordSetupSection.classList.toggle('hidden', !(isGoogleAccount && !hasPasswordProvider));
            const googlePass = document.getElementById('googleNewPassword');
            const googlePassConfirm = document.getElementById('googleConfirmPassword');
            if (googlePass) googlePass.value = '';
            if (googlePassConfirm) googlePassConfirm.value = '';
            const pv = document.getElementById('editProfilePicPreview');
            const ph = document.getElementById('editProfilePicPlaceholder');
            if (userProfile.photoURL) { pv.src = userProfile.photoURL; pv.classList.remove('hidden'); ph.classList.add('hidden'); }
            else { pv.src = ''; pv.classList.add('hidden'); ph.classList.remove('hidden'); }
            selectedProfilePicFile = null;
            document.getElementById('profilePicInput').value = '';
            applyProfileLockUI();
            
            const m = document.getElementById('editProfileModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            
            const closeBtn = m.querySelector('button[onclick="closeEditProfileModal()"]');
            const headerText = m.querySelector('.bg-gradient-to-r h3');
            
            if (isForcedProfileMode) {
                if (closeBtn) closeBtn.style.display = 'none';
                if (headerText) headerText.innerHTML = '<i data-lucide="shield-alert" class="w-4 h-4 text-amber-400"></i> প্রোফাইল সম্পূর্ণ করুন';
            } else {
                if (closeBtn) closeBtn.style.display = 'flex';
                if (headerText) headerText.innerHTML = '<i data-lucide="pencil" class="w-4 h-4"></i> প্রোফাইল এডিট';
            }
            
            refreshIcons();
        };
        
        window.closeEditProfileModal = () => {
            if (isForcedProfileMode) {
                showToast('হোমপেজে যেতে হলে আগে আপনার প্রোফাইল সম্পূর্ণ করুন!', 'lock', 'text-rose-400');
                return; 
            }
            const m = document.getElementById('editProfileModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };
        
        window.handleEditProfileSubmit = async (e) => {
            e.preventDefault();
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            // Re-check the lock against the latest server copy (not only the local state)
            let lockInfo = getProfileLockInfo();
            try {
                const fresh = await getDocFromServer(doc(db, 'users', currentUser.uid));
                if (fresh.exists()) lockInfo = getProfileLockInfo(fresh.data());
            } catch (e) {}
            const locked = lockInfo.locked;
            const fullName = locked ? (userProfile.fullName || '') : document.getElementById('editFullName').value.trim();
            const phone = locked ? (userProfile.phone || '') : document.getElementById('editPhone').value.trim();
            const district = locked ? (userProfile.district || '') : document.getElementById('editDistrict').value.trim();
            const upazila = locked ? (userProfile.upazila || '') : document.getElementById('editUpazila').value.trim();
            if (locked) {
                if (!selectedProfilePicFile) return showToast(`নাম, মোবাইল ও ঠিকানা আর ${formatLockRemaining(lockInfo.remainingMs)} পর পরিবর্তন করতে পারবেন। ছবি বদলাতে চাইলে নতুন ছবি বাছুন।`, 'lock', 'text-amber-400');
            } else {
                if (fullName.length < 2) return showToast('সঠিক নাম দিন', 'circle-x', 'text-rose-400');
                if (!/^01[3-9]\d{8}$/.test(phone)) return showToast('সঠিক মোবাইল নম্বর দিন', 'circle-x', 'text-rose-400');
                if (!district) return showToast('জেলা নির্বাচন করুন', 'circle-x', 'text-rose-400');
                if (!upazila) return showToast('উপজেলা নির্বাচন করুন', 'circle-x', 'text-rose-400');
            }
            
            const btn = document.getElementById('editProfileSaveBtn');
            const passwordSetupSection = document.getElementById('googlePasswordSetupSection');
            const pendingGooglePassword = document.getElementById('googleNewPassword')?.value || '';
            const pendingGooglePasswordConfirm = document.getElementById('googleConfirmPassword')?.value || '';
            const shouldLinkGooglePassword = !!currentUser?.providerData?.some(p => p.providerId === 'google.com') &&
                !currentUser?.providerData?.some(p => p.providerId === 'password');
            if (shouldLinkGooglePassword && (pendingGooglePassword || pendingGooglePasswordConfirm)) {
                if (pendingGooglePassword.length < 6) return showToast('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।', 'circle-x', 'text-rose-400');
                if (pendingGooglePassword !== pendingGooglePasswordConfirm) return showToast('নতুন পাসওয়ার্ড ও নিশ্চিতকরণ মিলছে না।', 'circle-x', 'text-rose-400');
            }
            btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> সংরক্ষণ...'; refreshIcons();
            try {
                let photoURL = userProfile.photoURL || '';
                if (selectedProfilePicFile) {
                    btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> ছবি আপলোড...'; refreshIcons();
                    photoURL = await uploadToCloudinary(selectedProfilePicFile);
                }
                const detailsChanged = !locked && (fullName !== (userProfile.fullName || '') || phone !== (userProfile.phone || '') || district !== (userProfile.district || '') || upazila !== (userProfile.upazila || ''));
                const startLock = !locked && (isForcedProfileMode || detailsChanged);
                const payload = locked ? { photoURL } : { fullName, phone, district, upazila, photoURL };
                if (startLock) payload.profileEditedAt = serverTimestamp();
                await setDoc(doc(db, 'users', currentUser.uid), payload, { merge: true });

                // Google users may optionally link an email/password credential to this SAME Firebase account.
                const googlePassword = document.getElementById('googleNewPassword')?.value || '';
                const googlePasswordConfirm = document.getElementById('googleConfirmPassword')?.value || '';
                const needsPasswordLink = !!currentUser?.providerData?.some(p => p.providerId === 'google.com') &&
                    !currentUser?.providerData?.some(p => p.providerId === 'password');
                if (needsPasswordLink && (googlePassword || googlePasswordConfirm)) {
                    if (!currentUser.email) throw new Error('এই Google অ্যাকাউন্টে ব্যবহারযোগ্য ইমেইল পাওয়া যায়নি।');
                    const emailCredential = EmailAuthProvider.credential(currentUser.email, googlePassword);
                    await linkWithCredential(currentUser, emailCredential);
                    if (passwordSetupSection) passwordSetupSection.classList.add('hidden');
                    document.getElementById('googleNewPassword').value = '';
                    document.getElementById('googleConfirmPassword').value = '';
                    showToast('এই অ্যাকাউন্টে ইমেইল ও পাসওয়ার্ড লগইনও চালু হয়েছে।', 'check-circle', 'text-emerald-400');
                }
                userProfile = { ...userProfile, ...payload };
                if (startLock) userProfile.profileEditedAt = { seconds: Math.floor(serverNow() / 1000) };
                updateProfileUI();
                applyProfileLockUI();
                
                if (isForcedProfileMode) {
                    if (isProfileComplete(userProfile)) {
                        isForcedProfileMode = false;
                        document.body.classList.remove('force-profile-mode');
                        
                        const m = document.getElementById('editProfileModal');
                        const closeBtn = m.querySelector('button[onclick="closeEditProfileModal()"]');
                        if (closeBtn) closeBtn.style.display = 'flex';
                        
                        closeEditProfileModal();
                        switchTab('services');
                        showToast('অভিনন্দন! আপনার প্রোফাইল সম্পূর্ণ হয়েছে।', 'sparkles', 'text-emerald-400');
                    } else {
                        showToast('মোবাইল, জেলা ও উপজেলা সঠিকভাবে পূরণ করুন!', 'circle-x', 'text-rose-400');
                    }
                } else {
                    showToast(startLock ? 'প্রোফাইল আপডেট হয়েছে! পরবর্তী ৩ দিন নাম, মোবাইল ও ঠিকানা পরিবর্তন করা যাবে না।' : 'প্রোফাইল আপডেট হয়েছে!', 'circle-check', 'text-emerald-400');
                    closeEditProfileModal();
                }
                
            } catch (err) {
                console.error('Profile save / Google password linking failed:', err);
                let message = err?.message || 'অজানা সমস্যা';
                if (err?.code === 'auth/email-already-in-use' || err?.code === 'auth/credential-already-in-use') {
                    message = 'এই ইমেইল দিয়ে আগে থেকেই অন্য একটি অ্যাকাউন্ট রয়েছে। সেই অ্যাকাউন্টে লগইন করে সাপোর্টের সাহায্য নিন।';
                } else if (err?.code === 'auth/weak-password') {
                    message = 'পাসওয়ার্ডটি আরও শক্তিশালী করুন (কমপক্ষে ৬ অক্ষর)।';
                }
                showToast('ব্যর্থ: ' + message, 'circle-x', 'text-rose-400');
            }
            finally { btn.disabled = false; btn.innerHTML = '<i data-lucide="save" class="w-4 h-4"></i> সংরক্ষণ করুন'; refreshIcons(); }
        };
        
        document.getElementById('editProfileModal')?.addEventListener('click', (e) => { if (e.target.id === 'editProfileModal') closeEditProfileModal(); });

        // ========== TAB SWITCH ==========
        window.switchTab = (tabName) => {
            if (isForcedProfileMode && tabName !== 'profile') {
                showToast('অনুগ্রহ করে আগে প্রোফাইল সম্পূর্ণ করুন!', 'shield-alert', 'text-rose-400');
                return;
            }
            // Premium system hidden by admin
            if (!isPremiumSystemLive() && (tabName === 'subscription' || tabName === 'payment')) {
                showToast('প্রিমিয়াম সাবস্ক্রিপশন বর্তমানে উপলব্ধ নয়', 'crown', 'text-slate-400');
                return;
            }
            if (!currentUser && !['services', 'emergency', 'blood', 'news', 'launch'].includes(tabName)) {
                showAuthScreen(); switchAuthTab('login'); return;
            }
            currentTab = tabName;
            if (tabName !== 'map') { try { localStorage.setItem('amar-elaka-tab', tabName); } catch (e) {} }
            if (tabName !== 'chat' && typeof mesesuStopPeerWatchers === 'function') { try { mesesuStopPeerWatchers(); } catch (e) {} }
            // রক্তদাতা সেকশন ছেড়ে গেলে জেলা-ফিল্টার টগল অটো অফ
            if (tabName !== 'blood' && typeof resetBloodDistrictFilter === 'function') {
                resetBloodDistrictFilter();
            }
            if (tabName === 'chat') {
                document.body.classList.add('chat-active');
            } else {
                document.body.classList.remove('chat-active');
            }
            // যেকোনো ট্যাব সুইচে নোটিফ পেজ বন্ধ
            if (document.body.classList.contains('notif-page-open') && typeof closeNotifPanel === 'function') {
                try { closeNotifPanel(); } catch (e) {}
            }

            document.querySelectorAll('.tab-view').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(el => { el.className = 'tab-btn px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-emerald-950/60 transition flex items-center gap-2 border border-transparent'; });
            document.querySelectorAll('.bottom-nav-btn').forEach(el => el.classList.remove('active'));
            const view = document.getElementById(`view-${tabName}`);
            if (view) view.classList.remove('hidden');
            const tab = document.getElementById(`tab-${tabName}`);
            if (tab) tab.className = 'tab-btn px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white shadow-lg shadow-emerald-600/40';
            const bnav = document.getElementById(`bnav-${tabName}`);
            if (bnav) bnav.classList.add('active');
            // Header messenger/chat icon highlight
            const headerChat = document.getElementById('headerChatBtn');
            if (headerChat) headerChat.classList.toggle('header-chat-active', tabName === 'chat');
            const showSearch = ['services', 'emergency', 'blood', 'favorites'].includes(tabName);
            document.getElementById('searchContainerDesktop')?.classList.toggle('show', showSearch);
            document.getElementById('searchContainerMobile')?.classList.toggle('hidden', !showSearch);
            const isEmergencyTab = tabName === 'emergency';
            const isBloodTab = tabName === 'blood';
            ['shareEmergencyBtnDesktop','shareEmergencyBtnMobile'].forEach(id => document.getElementById(id)?.classList.toggle('hidden', !isEmergencyTab));
            ['shareBloodBtnDesktop','shareBloodBtnMobile'].forEach(id => document.getElementById(id)?.classList.toggle('hidden', !isBloodTab));

            const addBtnDesktop = document.getElementById('addEmergencyBtnDesktop');
            const addBtnMobile = document.getElementById('addEmergencyBtnMobile');
            if (tabName === 'emergency') {
                addBtnDesktop?.classList.remove('hidden');
                addBtnMobile?.classList.remove('hidden');
            } else {
                addBtnDesktop?.classList.add('hidden');
                addBtnMobile?.classList.add('hidden');
            }
            const addBloodBtnDesktop = document.getElementById('addBloodBtnDesktop');
            const addBloodBtnMobile = document.getElementById('addBloodBtnMobile');
            if (tabName === 'blood') {
                addBloodBtnDesktop?.classList.remove('hidden');
                addBloodBtnMobile?.classList.remove('hidden');
            } else {
                addBloodBtnDesktop?.classList.add('hidden');
                addBloodBtnMobile?.classList.add('hidden');
            }

            const si = document.getElementById('searchInput'); if (si) si.value = '';
            const sm = document.getElementById('searchInputMobile'); if (sm) sm.value = '';
            updateSearchPlaceholders(tabName);
            
            renderNotices();
            if (tabName === 'subscription' || tabName === 'payment' || tabName === 'settings') updateCurrentPlanDisplay();
            if (tabName === 'chat') {
                if (typeof mesesuShowInbox === 'function') mesesuShowInbox();
                updateUnreadBadge();
            } else updateUnreadBadge();
            
            if (tabName === 'favorites') {
                loadUserFavorites();
            }
            if (tabName === 'news' && typeof newsOnOpen === 'function') { try { newsOnOpen(); } catch (e) {} }
            if (tabName === 'launch' && typeof launchOnOpen === 'function') { try { launchOnOpen(); } catch (e) {} }
            if (tabName === 'map' && typeof mapOnOpen === 'function') { try { mapOnOpen(); } catch (e) { console.warn('map open', e); } }
            if (tabName !== 'map' && typeof mapOnClose === 'function') { try { mapOnClose(); } catch (e) {} }
            if (tabName === 'weather') {
                try { weatherOnOpen(); } catch (e) { console.warn('weather open', e); }
            }

            const bottomNav = document.getElementById('bottomNav');
            if (bottomNav) {
                // চ্যাট ইনবক্সে নিচের নেভ দেখাবে; থ্রেডে লুকানো থাকবে
                if (tabName === 'chat' && document.body.classList.contains('chat-thread')) {
                    bottomNav.classList.add('nav-hidden');
                } else {
                    bottomNav.classList.remove('nav-hidden');
                }
            }
            if (tabName !== 'chat') {
                document.body.classList.remove('chat-thread', 'chat-kb-open');
                document.documentElement.style.setProperty('--kb-offset', '0px');
            }
            lastScrollTop = 0;

            refreshIcons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Section-aware search placeholder text
        function updateSearchPlaceholders(tabName) {
            const placeholders = {
                services: 'সেবা, হাসপাতাল বা টেকনিশিয়ান খুঁজুন...',
                favorites: 'সেবা, হাসপাতাল বা টেকনিশিয়ান খুঁজুন...',
                emergency: 'জরুরি সেবা খুঁজুন...',
                blood: 'রক্তদাতা খুঁজুন যেমন রহিম, ও পজেটিভ...'
            };
            const ph = placeholders[tabName] || placeholders.services;
            const si = document.getElementById('searchInput');
            const sm = document.getElementById('searchInputMobile');
            if (si) si.placeholder = ph;
            if (sm) sm.placeholder = ph;
        }
        function getSearchValue() {
            const si = document.getElementById('searchInput');
            const sm = document.getElementById('searchInputMobile');
            return String((si && si.value) || (sm && sm.value) || '').toLowerCase().trim();
        }
        let searchDebounceTimer = null;
        let searchFetchInFlight = null;
        window.handleSearch = (el) => {
            if (isForcedProfileMode) return;
            const val = el.value;
            const si = document.getElementById('searchInput'); if (si && si !== el) si.value = val;
            const sm = document.getElementById('searchInputMobile'); if (sm && sm !== el) sm.value = val;

            // Debounce to stop card shake from re-animating on every keystroke
            if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(async () => {
                const search = String(val || '').trim().toLowerCase();
                if (currentTab === 'services') {
                    if (search) {
                        if (!allServicesFullCache) {
                            if (searchFetchInFlight) {
                                try { await searchFetchInFlight; } catch (e) {}
                            } else {
                                searchFetchInFlight = (async () => {
                                    const allIds = allServiceIds.length ? allServiceIds : await fetchAllServicesData();
                                    if (!allServiceIds.length) allServiceIds = allIds;
                                    allServicesFullCache = allIds.map(id => serviceDataCache.get(id)).filter(Boolean);
                                })();
                                try { await searchFetchInFlight; } finally { searchFetchInFlight = null; }
                            }
                        }
                        renderServices(true);
                    } else {
                        allServicesFullCache = null;
                        renderServices(true);
                    }
                } else if (currentTab === 'emergency') renderEmergency();
                else if (currentTab === 'blood') filterBloodDonors();
                else if (currentTab === 'favorites') renderFavorites();
            }, 220);
        };
        function serviceMatchesMyUpazila(s) {
            const upa = (userProfile && userProfile.upazila) ? String(userProfile.upazila).trim().toLowerCase() : '';
            if (!upa) return true;
            const u = String(s.upazila || '').trim().toLowerCase();
            const loc = String(s.location || '').trim().toLowerCase();
            const dist = String(s.district || '').trim().toLowerCase();
            return u === upa || u.includes(upa) || loc.includes(upa) || dist.includes(upa);
        }

        window.filterCategory = (catId) => {
            if (isForcedProfileMode) return;
            // উপজেলা চিপ = লোকেশন টগল (ক্যাটাগরি সিলেকশন অপরিবর্তিত থাকে)
            if (catId === MY_UPAZILA_CAT) {
                if (!currentUser) {
                    showAuthScreen(); switchAuthTab('login'); return;
                }
                const userUpazila = (userProfile && userProfile.upazila) ? String(userProfile.upazila).trim() : '';
                if (!userUpazila) {
                    showToast('প্রোফাইলে উপজেলা যোগ করুন', 'map-pin', 'text-amber-400');
                    return;
                }
                myUpazilaFilterOn = !myUpazilaFilterOn;
                renderCategoryChips();
                const si = document.getElementById('searchInput'); if (si) si.value = '';
                const sm = document.getElementById('searchInputMobile'); if (sm) sm.value = '';
                loadServiceBatch(true);
                return;
            }
            if (activeCategory === catId) return;
            activeCategory = catId;
            renderCategoryChips();
            const si = document.getElementById('searchInput'); if (si) si.value = '';
            const sm = document.getElementById('searchInputMobile'); if (sm) sm.value = '';
            loadServiceBatch(true);
        };
        function renderCategoryChips() {
            const container = document.getElementById('categoryChips');
            if (!container) return;
            const userUpazila = (currentUser && userProfile && userProfile.upazila) ? String(userProfile.upazila).trim() : '';
            if (!userUpazila) myUpazilaFilterOn = false;
            // Build chip list: সকল সেবা → [ব্যক্তিগত উপজেলা টগল] → other categories
            const chips = [];
            const allCat = categories.find(c => c.id === 'all') || { id: 'all', name: 'সকল সেবা', icon: 'fa-border-all' };
            chips.push(allCat);
            if (userUpazila) {
                chips.push({ id: MY_UPAZILA_CAT, name: userUpazila, icon: 'fa-map-marker-alt', isUpazila: true });
            }
            categories.filter(c => c.id !== 'all').slice(0, 7).forEach(c => chips.push(c));
            container.innerHTML = chips.map(cat => {
                const iconName = cat.isUpazila ? 'map-pin' : faToLucide(cat.icon);
                const isActive = cat.isUpazila ? myUpazilaFilterOn : (activeCategory === cat.id);
                const activeCls = cat.isUpazila
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-400 shadow-lg shadow-emerald-600/40'
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/40';
                const idleCls = 'bg-[#10281c] text-slate-300 border-emerald-900/50 hover:border-emerald-600/60';
                return `<button type="button" onclick="filterCategory('${esc(cat.id)}')" class="px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1 ${isActive ? activeCls : idleCls}" aria-pressed="${isActive ? 'true' : 'false'}">
                    <i data-lucide="${esc(iconName)}" class="w-3.5 h-3.5"></i><span>${esc(cat.name)}</span>
                </button>`;
            }).join('');
            refreshIcons();
        }

        // ========== NOTICES ==========
        function noticeDate(value) {
            if (!value) return null;
            if (typeof value.toDate === 'function') return value.toDate();
            if (value.seconds) return new Date(value.seconds * 1000);
            const d = new Date(value); return Number.isNaN(d.getTime()) ? null : d;
        }
        function isNoticeVisible(item, now = new Date()) {
            const active = item.isActive === true || item.active === true || item.status === 'published';
            if (!active) return false;
            const s = noticeDate(item.publishAt || item.startsAt || item.startAt);
            const e = noticeDate(item.expiresAt || item.endAt);
            if (s && s > now) return false;
            if (e && e <= now) return false;
            return true;
        }
        function noticePriority(item) {
            const raw = String(item.priority || item.importance || 'সাধারণ').toLowerCase();
            if (['urgent', 'জরুরি'].includes(raw)) return { label: 'জরুরি', style: 'bg-rose-500/15 text-rose-300 border-rose-500/40', icon: 'triangle-alert', card: 'border-rose-500/40' };
            if (['important', 'গুরুত্বপূর্ণ'].includes(raw)) return { label: 'গুরুত্বপূর্ণ', style: 'bg-amber-500/15 text-amber-300 border-amber-500/40', icon: 'circle-alert', card: 'border-amber-500/35' };
            return { label: 'সাধারণ', style: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40', icon: 'megaphone', card: 'border-emerald-500/30' };
        }
        function buildNoticeCardHTML(item) {
            const p = noticePriority(item);
            const title = esc(item.title || item.heading || 'নোটিশ');
            const body = esc(item.description || item.details || item.message || 'বিস্তারিত দেওয়া হয়নি।');
            const date = noticeDate(item.publishAt || item.startsAt || item.createdAt);
            const dl = date ? date.toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' }) : '';
            return `<article onclick="openNoticeModal('${esc(item.id)}')" class="notice-card rounded-xl border ${p.card} bg-gradient-to-br from-[#10281c] to-[#07140e] p-3 shadow-md shadow-black/20 cursor-pointer hover:border-emerald-500 transition-colors w-full">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg ${p.style} border flex items-center justify-center shrink-0"><i data-lucide="${p.icon}" class="w-3.5 h-3.5"></i></span>
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center justify-between gap-2"><h3 data-user-content="true" class="text-sm font-bold text-white truncate leading-tight">${title}</h3><i data-lucide="chevron-right" class="w-4 h-4 text-slate-500 shrink-0"></i></div>
                        <p data-user-content="true" class="mt-0.5 text-[11px] text-slate-400 line-clamp-1">${body}</p>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-[9px] px-1.5 py-0.5 rounded-md border ${p.style} font-bold">${p.label}</span>
                            ${dl ? `<span class="text-[9px] text-slate-500 flex items-center gap-1"><i data-lucide="clock" class="w-2.5 h-2.5"></i>${esc(dl)}</span>` : ''}
                        </div>
                    </div>
                </div>
            </article>`;
        }
        function updateActiveNoticeCard() {
            const list = document.getElementById('noticesList');
            if (!list || currentVisibleNotices.length === 0) return;
            if (currentNoticeIndex >= currentVisibleNotices.length) currentNoticeIndex = 0;
            const item = currentVisibleNotices[currentNoticeIndex];
            list.innerHTML = buildNoticeCardHTML(item);
            refreshIcons();
        }
        function setupNoticeAutoSlide() {
            if (noticeSliderInterval) clearInterval(noticeSliderInterval);
            if (currentVisibleNotices.length <= 1) return;
            const listEl = document.getElementById('noticesList');
            if (!listEl) return;
            let isHovered = false;
            listEl.onmouseenter = () => { isHovered = true; };
            listEl.onmouseleave = () => { isHovered = false; };
            listEl.ontouchstart = () => { isHovered = true; };
            listEl.ontouchend = () => { isHovered = false; };
            noticeSliderInterval = setInterval(() => {
                if (isHovered) return;
                listEl.style.opacity = '0';
                setTimeout(() => {
                    currentNoticeIndex = (currentNoticeIndex + 1) % currentVisibleNotices.length;
                    updateActiveNoticeCard();
                    listEl.style.opacity = '1';
                }, 500);
            }, 5000);
        }
        function renderNotices() {
            if (isForcedProfileMode) return;
            const section = document.getElementById('noticesSection');
            if (!section) return;
            if (currentTab !== 'services') { 
                section.classList.add('hidden'); 
                if (noticeSliderInterval) clearInterval(noticeSliderInterval);
                return; 
            }
            const now = new Date();
            currentVisibleNotices = notices.filter(n => isNoticeVisible(n, now)).sort((a, b) => {
                const score = v => ['urgent', 'জরুরি'].includes(String(v).toLowerCase()) ? 3 : (['important', 'গুরুত্বপূর্ণ'].includes(String(v).toLowerCase()) ? 2 : 1);
                return score(b.priority || b.importance) - score(a.priority || a.importance) ||
                    ((noticeDate(b.publishAt || b.startsAt)?.getTime() || 0) - (noticeDate(a.publishAt || a.startsAt)?.getTime() || 0));
            });
            if (!currentVisibleNotices.length) { 
                section.classList.add('hidden'); 
                document.getElementById('noticesList').innerHTML = ''; 
                if (noticeSliderInterval) clearInterval(noticeSliderInterval);
                return; 
            }
            section.classList.remove('hidden');
            if (currentNoticeIndex >= currentVisibleNotices.length) currentNoticeIndex = 0;
            updateActiveNoticeCard();
            setupNoticeAutoSlide();
        }
        window.openNoticeModal = (id) => {
            if (isForcedProfileMode) return;
            const item = notices.find(n => n.id === id && isNoticeVisible(n));
            if (!item) { showToast('নোটিশটি আর সক্রিয় নেই', 'info', 'text-amber-400'); renderNotices(); return; }
            const p = noticePriority(item);
            const content = document.getElementById('noticeModalContent');
            document.getElementById('noticeModalTitle').textContent = item.title || item.heading || 'নোটিশের বিস্তারিত';
            const date = noticeDate(item.publishAt || item.startsAt || item.createdAt);
            const expiry = noticeDate(item.expiresAt || item.endAt);
            const img = item.imageUrl || item.image || '';
            const safe = /^https:\/\//i.test(img) ? img : '';
            content.innerHTML = `
                <div class="mb-3"><span class="inline-flex text-[11px] px-3 py-1 rounded-full border ${p.style}">${p.label}</span></div>
                ${safe ? `<img src="${esc(safe)}" alt="নোটিশ" loading="lazy" class="w-full max-h-64 object-cover rounded-2xl mb-3 border border-emerald-900/50">` : ''}
                <p class="whitespace-pre-wrap leading-relaxed text-slate-200 text-sm">${esc(item.description || item.details || item.message || 'বিস্তারিত দেওয়া হয়নি।')}</p>
                ${date ? `<p class="mt-3 text-[11px] text-slate-500 flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i>প্রকাশ: ${esc(date.toLocaleString('bn-BD'))}</p>` : ''}
                ${expiry ? `<p class="mt-1 text-[11px] text-slate-500 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i>মেয়াদ: ${esc(expiry.toLocaleString('bn-BD'))}</p>` : ''}`;
            const m = document.getElementById('noticeModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closeNoticeModal = () => {
            const m = document.getElementById('noticeModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };
        document.getElementById('noticeModal')?.addEventListener('click', (e) => { if (e.target.id === 'noticeModal') closeNoticeModal(); });

        // ========== TERMS ACCORDION ==========
        window.toggleTermsAccordion = (id, btn) => {
            const content = document.getElementById(id);
            const icon = btn.querySelector('i[data-lucide="chevron-down"]');
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                if(icon) icon.style.transform = 'rotate(180deg)';
                btn.classList.add('bg-emerald-900/10');
            } else {
                content.classList.add('hidden');
                if(icon) icon.style.transform = 'rotate(0deg)';
                btn.classList.remove('bg-emerald-900/10');
            }
        };

        // ========== SERVICES: FAVORITES ==========
        async function loadUserFavorites() {
            if (!currentUser || !firebaseReady) { 
                userFavorites = new Set(); 
                favoritesCache = [];
                favoritesLoaded = true; 
                renderFavorites();
                return; 
            }
            try {
                const favSnap = await getDocs(collection(db, 'users', currentUser.uid, 'favorites'));
                const favIds = favSnap.docs.map(d => d.id);
                userFavorites = new Set(favIds);
                let favServices = [];
                if (favIds.length > 0) {
                    for (let i = 0; i < favIds.length; i += 10) {
                        const chunk = favIds.slice(i, i + 10);
                        const q = query(collection(db, 'services'), where('__name__', 'in', chunk));
                        const snap = await getDocs(q);
                        snap.forEach(doc => { favServices.push({ id: doc.id, ...doc.data() }); });
                    }
                }
                favoritesCache = favServices; 
            } catch (e) { 
                console.warn('Load favorites failed', e); 
                userFavorites = new Set(); 
                favoritesCache = [];
            }
            favoritesLoaded = true;
            renderFavorites();
        }

        function renderFavorites() {
            if (isForcedProfileMode) return;
            const grid = document.getElementById('favoritesGrid');
            const countEl = document.getElementById('favCountText');
            if (!grid) return;
            if (!favoritesLoaded) {
                grid.innerHTML = `<div class="col-span-full text-center py-10"><i data-lucide="loader-circle" class="w-8 h-8 animate-spin mx-auto text-emerald-500"></i></div>`;
                if (countEl) countEl.textContent = 'লোড হচ্ছে...';
                refreshIcons();
                return;
            }
            const search = getSearchValue();
            const filtered = favoritesCache.filter(s => {
                const matchSearch = !search ||
                    (s.title || '').toLowerCase().includes(search) ||
                    (s.description || '').toLowerCase().includes(search) ||
                    (s.district || '').toLowerCase().includes(search) ||
                    (s.upazila || '').toLowerCase().includes(search) ||
                    (s.location || '').toLowerCase().includes(search) ||
                    (s.providerName || '').toLowerCase().includes(search);
                return matchSearch;
            });
            if (countEl) countEl.textContent = `${filtered.length} টি সংরক্ষিত সেবা`;
            if (filtered.length === 0) {
                grid.innerHTML = `<div class="col-span-full text-center py-10 bg-[#10281c] rounded-2xl border border-dashed border-rose-900/50 p-6 space-y-2">
                    <div class="w-16 h-16 bg-rose-950/60 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-800/60"><i data-lucide="heart-off" class="w-7 h-7"></i></div>
                    <h3 class="text-sm font-bold text-slate-200">কোনো সংরক্ষিত সেবা নেই</h3>
                    <p class="text-xs text-slate-400 max-w-sm mx-auto">আপনি এখনো কোনো সেবা "আমার পছন্দ" তালিকায় যুক্ত করেননি। সেবার উপরে থাকা হার্ট আইকনে ক্লিক করে সেভ করুন।</p>
                </div>`;
                refreshIcons(); 
                return;
            }
            const html = filtered.map((card, idx) => {
                const delay = Math.min(idx * 65, 500);
                return `<div class="service-card-in" data-card-wrapper style="animation-delay:${delay}ms">${buildServiceCard(card)}</div>`;
            }).join('');
            grid.innerHTML = html;
            refreshIcons();
        }

        window.toggleFavorite = async (serviceId, btnEl) => {
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('ফেভারিট করতে আগে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const isFav = userFavorites.has(serviceId);
            if (btnEl) btnEl.disabled = true;
            try {
                if (isFav) {
                    await deleteDoc(doc(db, 'users', currentUser.uid, 'favorites', serviceId));
                    userFavorites.delete(serviceId);
                    favoritesCache = favoritesCache.filter(s => s.id !== serviceId);
                    showToast('ফেভারিট থেকে সরানো হয়েছে', 'heart-off', 'text-slate-400');
                } else {
                    await setDoc(doc(db, 'users', currentUser.uid, 'favorites', serviceId), { serviceId, addedAt: serverTimestamp() });
                    userFavorites.add(serviceId);
                    const srv = servicesCache.find(s => s.id === serviceId) || (allServicesFullCache || []).find(s => s.id === serviceId);
                    if (srv) favoritesCache.unshift(srv);
                    showToast('ফেভারিটে যোগ হয়েছে', 'heart', 'text-rose-400');
                }
                updateFavoriteUI(serviceId, !isFav);
                if (currentTab === 'favorites') renderFavorites();
            } catch (e) {
                showToast('আপডেট ব্যর্থ', 'circle-x', 'text-rose-400');
            } finally { if (btnEl) btnEl.disabled = false; }
        };
        function updateFavoriteUI(serviceId, isFav) {
            document.querySelectorAll(`[data-fav-id="${serviceId}"]`).forEach(btn => {
                const icon = btn.querySelector('svg');
                if (isFav) { btn.classList.add('is-favorite'); if (icon) { icon.classList.add('fill-rose-500', 'text-rose-500'); } }
                else { btn.classList.remove('is-favorite'); if (icon) icon.classList.remove('fill-rose-500', 'text-rose-500'); }
            });
        }
        window.handleModalFavClick = async (e) => {
            if (isForcedProfileMode) return;
            e.stopPropagation();
            const btn = e.currentTarget;
            const sid = btn.getAttribute('data-fav-id');
            if (!sid) return;
            await toggleFavorite(sid, btn);
        };

        window.openExternalUrl = (el) => {
            if (isForcedProfileMode) return;
            const url = el.getAttribute('data-url');
            if (/^https?:\/\//i.test(url)) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        };

        // ========== SERVICE LOADER HELPERS ==========
        function shuffleArray(arr) {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        // ফায়ারস্টোর থেকে একবার আনা সার্ভিস ডেটা এখানে ক্যাশ হয়ে থাকে, যাতে
        // পরবর্তী ব্যাচ/সার্চের সময় একই ডকুমেন্ট আবার ডাউনলোড করতে না হয়।
        let serviceDataCache = new Map(); // id -> { id, ...data }

        // ক্যাটাগরি/উপজেলা ফিল্টারসহ services কুয়েরি তৈরি
        function buildServicesQuery(withLimit = null) {
            const baseCol = collection(db, 'services');
            const useCat = activeCategory && activeCategory !== 'all' && activeCategory !== MY_UPAZILA_CAT;
            if (withLimit && withLimit > 0) {
                return useCat
                    ? query(baseCol, where('category', '==', activeCategory), limit(withLimit))
                    : query(baseCol, limit(withLimit));
            }
            return useCat
                ? query(baseCol, where('category', '==', activeCategory))
                : baseCol;
        }
        function applyUpazilaClientFilter(docs) {
            if (!(myUpazilaFilterOn && currentUser && userProfile && userProfile.upazila)) return docs;
            const upaLower = String(userProfile.upazila).trim().toLowerCase();
            return docs.filter(d => {
                const data = d.data ? d.data() : d;
                const u = String(data.upazila || '').trim().toLowerCase();
                const loc = String(data.location || '').trim().toLowerCase();
                const dist = String(data.district || '').trim().toLowerCase();
                return u === upaLower || u.includes(upaLower) || loc.includes(upaLower) || dist.includes(upaLower);
            });
        }
        // পুরো কালেকশন (ব্যাকগ্রাউন্ড ক্যাশ / শাফলের জন্য)
        async function fetchAllServicesData() {
            if (!firebaseReady) return [];
            const cacheDocs = (docs) => docs.map(d => {
                const data = { id: d.id, ...d.data() };
                serviceDataCache.set(d.id, data);
                return d.id;
            });
            try {
                const snap = await getDocs(buildServicesQuery(null));
                const docs = applyUpazilaClientFilter(snap.docs);
                return cacheDocs(docs);
            } catch (e) {
                console.warn('fetchAllServicesData failed:', e);
                return [];
            }
        }
        // প্রথম পেইন্ট: শুধু সীমিত ব্যাচ — হোম দ্রুত দেখানোর জন্য
        async function fetchFirstServicesFast(batchSize) {
            if (!firebaseReady) return [];
            try {
                // উপজেলা ফিল্টার থাকলে client-side কাটতে একটু বেশি আনা
                const fetchLimit = (myUpazilaFilterOn && userProfile?.upazila)
                    ? Math.max(batchSize * 4, 48)
                    : batchSize;
                const snap = await getDocs(buildServicesQuery(fetchLimit));
                let docs = applyUpazilaClientFilter(snap.docs);
                docs = docs.slice(0, batchSize);
                return docs.map(d => {
                    const data = { id: d.id, ...d.data() };
                    serviceDataCache.set(d.id, data);
                    return data;
                });
            } catch (e) {
                console.warn('fetchFirstServicesFast failed:', e);
                return [];
            }
        }

        // ক্যাশে থাকা ডেটা থেকে সরাসরি রিটার্ন করে — Firestore-এ নতুন করে কল যায় শুধু
        // তখনই, যখন কোনো id ক্যাশে নেই (সাধারণত এটা হবে না, কারণ fetchAllServicesData
        // আগেই সবকিছু ক্যাশ করে রাখে)।
        async function fetchServicesByIds(ids) {
            if (!ids.length || !firebaseReady) return [];
            const missing = ids.filter(id => !serviceDataCache.has(id));
            if (missing.length) {
                const groups = [];
                for (let i = 0; i < missing.length; i += 10) groups.push(missing.slice(i, i + 10));
                try {
                    const results = await Promise.all(groups.map(g =>
                        getDocs(query(collection(db, 'services'), where('__name__', 'in', g)))
                    ));
                    results.forEach(snap => snap.docs.forEach(d => serviceDataCache.set(d.id, { id: d.id, ...d.data() })));
                } catch (e) {
                    console.warn('fetchServicesByIds failed:', e);
                }
            }
            return ids.map(id => serviceDataCache.get(id)).filter(Boolean);
        }

        function matchesServiceSearch(s, search) {
            const q = search.toLowerCase();
            return (s.title || '').toLowerCase().includes(q) ||
                (s.description || '').toLowerCase().includes(q) ||
                (s.district || '').toLowerCase().includes(q) ||
                (s.upazila || '').toLowerCase().includes(q) ||
                (s.location || '').toLowerCase().includes(q) ||
                (s.providerName || '').toLowerCase().includes(q);
        }

        function showServicesLoading(show) {
            const grid = document.getElementById('servicesGrid');
            if (!grid || !show) return;
            grid.innerHTML = Array.from({ length: 4 }).map(() => `<div class="svc-skeleton"></div>`).join('');
        }

        // ========== INFINITE SCROLL (MODE A) ==========
        function setupInfiniteScroll() {
            const sentinel = document.getElementById('servicesSentinel');
            if (!sentinel) return;
            if (servicesObserver) servicesObserver.disconnect();
            if (servicesCache.length === 0) {
                sentinel.classList.add('hidden');
                return;
            }
            sentinel.classList.remove('hidden');
            servicesObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !servicesLoading) {
                    loadServiceBatch(false);
                }
            }, { rootMargin: '400px' });
            servicesObserver.observe(sentinel);
        }

        // ========== LOAD SERVICE BATCH (Mode A) ==========
        let servicesFullIndexReady = false;
        let servicesFullIndexLoading = false;

        async function loadServiceBatch(reset = false) {
            if (isForcedProfileMode) return;
            if (!firebaseReady || servicesLoading) return;
            servicesLoading = true;

            try {
                if (reset) {
                    servicesCache = [];
                    servicesSeenIds = new Set();
                    currentBatchIndex = 0;
                    servicesLoopCount = 0;
                    servicesFirstLoadDone = false;
                    servicesFullIndexReady = false;
                    allServicesFullCache = null;
                    allServiceIds = [];
                    shuffledIds = [];
                    const grid = document.getElementById('servicesGrid');
                    if (grid) grid.innerHTML = '';
                    lastRenderedCount = 0;
                    lastAdCountAtRender = -1;
                    animationQueueCounter = 0;
                    wasInSearchMode = false;
                    showServicesLoading(true);
                    serviceDataCache = new Map();
                    resetAdFeedState();

                    // ① দ্রুত প্রথম পেইন্ট — সীমিত ব্যাচ + ক্লায়েন্ট-সাইড র্যান্ডম অর্ডার
                    const firstBatch = shuffleArray(await fetchFirstServicesFast(SERVICES_BATCH_SIZE));
                    firstBatch.forEach(svc => {
                        if (!servicesSeenIds.has(svc.id)) {
                            servicesSeenIds.add(svc.id);
                            servicesCache.push(svc);
                        }
                    });
                    servicesFirstLoadDone = true;
                    renderServices();
                    showServicesLoading(false);
                    servicesLoading = false;

                    const sharedServiceId = new URLSearchParams(window.location.search).get('service');
                    if (sharedServiceId && !window.__sharedServiceOpened) {
                        const sharedService = servicesCache.find(x => x.id === sharedServiceId)
                            || serviceDataCache.get(sharedServiceId);
                        if (sharedService) {
                            window.__sharedServiceOpened = true;
                            setTimeout(() => openServiceDetail(sharedServiceId), 250);
                        }
                    }

                    // ② ব্যাকগ্রাউন্ডে পুরো ইনডেক্স — শাফল + ইনফিনিট স্ক্রলের জন্য
                    if (!servicesFullIndexLoading) {
                        servicesFullIndexLoading = true;
                        fetchAllServicesData().then(ids => {
                            servicesFullIndexLoading = false;
                            allServiceIds = ids;
                            allServicesFullCache = allServiceIds.map(id => serviceDataCache.get(id)).filter(Boolean);
                            // ইতিমধ্যে দেখানো আইটেম বাদ দিয়ে বাকিগুলো শাফল
                            const remaining = allServiceIds.filter(id => !servicesSeenIds.has(id));
                            shuffledIds = shuffleArray(remaining);
                            currentBatchIndex = 0;
                            servicesFullIndexReady = true;
                            setupInfiniteScroll();
                            // শেয়ার্ড সার্ভিস পুরো ক্যাশে থাকলে ওপেন
                            if (sharedServiceId && !window.__sharedServiceOpened) {
                                const s = serviceDataCache.get(sharedServiceId);
                                if (s) {
                                    window.__sharedServiceOpened = true;
                                    setTimeout(() => openServiceDetail(sharedServiceId), 200);
                                }
                            }
                        }).catch(err => {
                            servicesFullIndexLoading = false;
                            console.warn('background services index failed:', err);
                            setupInfiniteScroll();
                        });
                    } else {
                        setupInfiniteScroll();
                    }
                    return;
                }

                // ইনফিনিট স্ক্রল — পুরো ইনডেক্স প্রস্তুত না হলে অপেক্ষা
                if (!servicesFullIndexReady || !shuffledIds.length) {
                    if (!servicesFullIndexLoading && allServiceIds.length === 0) {
                        servicesFullIndexLoading = true;
                        try {
                            allServiceIds = await fetchAllServicesData();
                            allServicesFullCache = allServiceIds.map(id => serviceDataCache.get(id)).filter(Boolean);
                            const remaining = allServiceIds.filter(id => !servicesSeenIds.has(id));
                            shuffledIds = shuffleArray(remaining);
                            currentBatchIndex = 0;
                            servicesFullIndexReady = true;
                        } catch (e) {
                            console.warn(e);
                        } finally {
                            servicesFullIndexLoading = false;
                        }
                    }
                    if (!shuffledIds.length) {
                        setupInfiniteScroll();
                        return;
                    }
                }

                const BATCH = SERVICES_BATCH_SIZE;
                let remaining = shuffledIds.length - currentBatchIndex;

                if (remaining <= 0) {
                    servicesLoopCount++;
                    servicesSeenIds = new Set();
                    shuffledIds = shuffleArray(allServiceIds);
                    currentBatchIndex = 0;
                    remaining = shuffledIds.length;
                }

                const take = Math.min(BATCH, remaining);
                const batchIds = shuffledIds.slice(currentBatchIndex, currentBatchIndex + take);
                currentBatchIndex += take;

                const newServices = await fetchServicesByIds(batchIds);
                newServices.forEach(svc => {
                    if (!servicesSeenIds.has(svc.id)) {
                        servicesSeenIds.add(svc.id);
                        servicesCache.push(svc);
                    }
                });

                servicesFirstLoadDone = true;
                renderServices();
                setupInfiniteScroll();
            } catch (e) {
                console.error('loadServiceBatch error:', e);
                if (!servicesFirstLoadDone) {
                    const grid = document.getElementById('servicesGrid');
                    if (grid) {
                        grid.innerHTML = `<div class="col-span-full text-center py-10 bg-[#10281c] rounded-2xl border border-dashed border-rose-800/50 p-6">
                            <i data-lucide="wifi-off" class="w-10 h-10 text-rose-400 mx-auto mb-2"></i>
                            <p class="text-sm font-bold text-slate-200">সেবা লোড ব্যর্থ</p>
                            <p class="text-xs text-slate-400 mt-1">ইন্টারনেট বা Firestore rules চেক করুন।</p>
                        </div>`;
                        refreshIcons();
                    }
                }
            } finally {
                servicesLoading = false;
                showServicesLoading(false);
            }
        }

        window.restartServiceLoop = () => loadServiceBatch(true);

        // ========== PROMOTIONS / ADS ==========
        const PROMO_TYPES = {
            youtube:   { label: 'YouTube',   icon: 'circle-play',  color: '#ef4444' },
            facebook:  { label: 'Facebook',  icon: 'thumbs-up',    color: '#3b82f6' },
            tiktok:    { label: 'TikTok',    icon: 'music',        color: '#ec4899' },
            instagram: { label: 'Instagram', icon: 'camera',       color: '#d946ef' },
            telegram:  { label: 'Telegram',  icon: 'send',         color: '#0ea5e9' },
            shop:      { label: 'দোকান',     icon: 'store',        color: '#f97316' },
            product:   { label: 'পণ্য',      icon: 'shopping-bag', color: '#22c55e' },
            car:       { label: 'গাড়ি',     icon: 'car',          color: '#6366f1' },
            service:   { label: 'সার্ভিস',    icon: 'wrench',       color: '#14b8a6' },
            other:     { label: 'অন্যান্য',   icon: 'sparkles',     color: '#94a3b8' }
        };
        const PROMO_EXTRA_FIELDS = {
            youtube:   [{ k: 'channelUrl', l: 'চ্যানেল লিংক', req: 1, url: 1 }, { k: 'subscriberCount', l: 'সাবস্ক্রাইবার সংখ্যা' }, { k: 'category', l: 'ক্যাটাগরি' }],
            facebook:  [{ k: 'pageUrl', l: 'পেজ লিংক', req: 1, url: 1 }, { k: 'followerCount', l: 'ফলোয়ার সংখ্যা' }, { k: 'category', l: 'ক্যাটাগরি' }],
            tiktok:    [{ k: 'profileUrl', l: 'প্রোফাইল লিংক', req: 1, url: 1 }, { k: 'followerCount', l: 'ফলোয়ার সংখ্যা' }, { k: 'contentType', l: 'কনটেন্টের ধরন' }],
            instagram: [{ k: 'profileUrl', l: 'প্রোফাইল লিংক', req: 1, url: 1 }, { k: 'followerCount', l: 'ফলোয়ার সংখ্যা' }, { k: 'category', l: 'ক্যাটাগরি' }],
            telegram:  [{ k: 'channelUrl', l: 'চ্যানেল/গ্রুপ লিংক', req: 1, url: 1 }, { k: 'memberCount', l: 'মেম্বার সংখ্যা' }, { k: 'category', l: 'ক্যাটাগরি' }],
            shop:      [{ k: 'shopAddress', l: 'দোকানের ঠিকানা', req: 1 }, { k: 'openingHours', l: 'খোলার সময়' }, { k: 'businessType', l: 'ব্যবসার ধরন' }],
            product:   [{ k: 'price', l: 'মূল্য (৳)', req: 1, num: 1 }, { k: 'discount', l: 'ডিসকাউন্ট' }, { k: 'productType', l: 'পণ্যের ধরন' }],
            car:       [{ k: 'model', l: 'মডেল', req: 1 }, { k: 'year', l: 'সাল' }, { k: 'price', l: 'মূল্য (৳)', req: 1, num: 1 }, { k: 'condition', l: 'অবস্থা (নতুন/ব্যবহৃত)' }],
            service:   [{ k: 'serviceType', l: 'সার্ভিসের ধরন', req: 1 }, { k: 'serviceTime', l: 'সার্ভিসের সময়' }],
            other:     []
        };
        const PROMO_CTA_OPTIONS = {
            call:      { label: 'কল করুন', ic: 'phone',  icon: 'phone',          kind: 'phone', ph: '01XXXXXXXXX', btn: 'কল করুন' },
            website:   { label: 'ওয়েবসাইট', ic: 'globe', icon: 'globe',          kind: 'url',   ph: 'https://...', btn: 'ওয়েবসাইটে যান' },
            whatsapp:  { label: 'WhatsApp', ic: 'message',  icon: 'message-circle', kind: 'phone', ph: '01XXXXXXXXX', btn: 'WhatsApp-এ মেসেজ' },
            facebook:  { label: 'Facebook', ic: 'thumbs-up',  icon: 'thumbs-up',      kind: 'url',   ph: 'https://facebook.com/...', btn: 'Facebook-এ যান' },
            youtube:   { label: 'YouTube', ic: 'play',   icon: 'circle-play',    kind: 'url',   ph: 'https://youtube.com/...', btn: 'YouTube-এ দেখুন' },
            tiktok:    { label: 'TikTok', ic: 'music',    icon: 'music',          kind: 'url',   ph: 'https://tiktok.com/...', btn: 'TikTok-এ দেখুন' },
            instagram: { label: 'Instagram', ic: 'camera', icon: 'camera',         kind: 'url',   ph: 'https://instagram.com/...', btn: 'Instagram-এ যান' },
            telegram:  { label: 'Telegram', ic: 'send',  icon: 'send',           kind: 'url',   ph: 'https://t.me/...', btn: 'Telegram-এ যোগ দিন' },
            custom:    { label: 'কাস্টম বাটন', ic: 'link', icon: 'link',         kind: 'custom', btn: 'দেখুন' }
        };
        const PROMO_STEP_LABELS = ['প্রমোশনের ধরন', 'সাধারণ তথ্য', 'অতিরিক্ত তথ্য', 'বাটন ও প্রিভিউ'];
        let promoStep = 1, promoType = null, promoImageFile = null, promoImageObjUrl = '', promoCtaChecked = new Set(), promoSubmitting = false;

        const isHttpUrl = (v) => /^https?:\/\/\S+$/i.test(String(v || '').trim());
        const isBdPhone = (v) => /^01[3-9]\d{8}$/.test(String(v || '').trim());

        function renderPromoTypeGrid() {
            if (isForcedProfileMode) return;
            const g = document.getElementById('promoTypeGrid'); if (!g) return;
            g.innerHTML = Object.entries(PROMO_TYPES).map(([k, t]) => `<button type="button" class="promo-type-btn ${promoType === k ? 'selected' : ''}" style="--pc:${t.color}" onclick="selectPromoType('${k}')"><span class="w-9 h-9 rounded-xl flex items-center justify-center text-white" style="background:${t.color}"><i data-lucide="${t.icon}" class="w-4 h-4"></i></span>${esc(t.label)}</button>`).join('');
            refreshIcons();
        }
        window.selectPromoType = (k) => {
            if (isForcedProfileMode) return;
            if (!PROMO_TYPES[k]) return;
            promoType = k; renderPromoTypeGrid(); renderPromoExtraFields();
        };
        function renderPromoExtraFields() {
            if (isForcedProfileMode) return;
            const box = document.getElementById('promoExtraFields'); if (!box) return;
            const fields = PROMO_EXTRA_FIELDS[promoType] || [];
            if (!promoType || fields.length === 0) { box.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">${promoType ? 'এই ধরনের জন্য অতিরিক্ত তথ্য লাগবে না। পরের ধাপে যান।' : 'প্রথমে প্রমোশনের ধরন বেছে নিন।'}</p>`; return; }
            const prev = {}; fields.forEach(f => { const el = document.getElementById('pxf_' + f.k); if (el) prev[f.k] = el.value; });
            box.innerHTML = fields.map(f => `<div><label class="promo-label">${esc(f.l)}${f.req ? ' *' : ''}</label><input id="pxf_${f.k}" type="${f.num ? 'number' : (f.url ? 'url' : 'text')}" ${f.num ? 'min="0" inputmode="numeric"' : ''} class="promo-input" value="${esc(prev[f.k] || '')}" ${f.url ? 'placeholder="https://..."' : ''}></div>`).join('');
        }
        function collectPromoExtra() {
            const out = {}; (PROMO_EXTRA_FIELDS[promoType] || []).forEach(f => { out[f.k] = (document.getElementById('pxf_' + f.k)?.value || '').trim(); }); return out;
        }
        function renderPromoCtaList() {
            if (isForcedProfileMode) return;
            const box = document.getElementById('promoCtaList'); if (!box) return;
            box.innerHTML = Object.entries(PROMO_CTA_OPTIONS).map(([k, o]) => `<div class="rounded-xl border border-amber-900/40 bg-[#07140e] p-2.5">
                <label class="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-slate-200"><input type="checkbox" class="accent-amber-500 w-4 h-4" id="pcta_chk_${k}" onchange="togglePromoCta('${k}', this.checked)"> ${o.ic ? '<svg class="ic" aria-hidden="true"><use href="#i-' + o.ic + '"/></svg> ' : ''}${o.label}</label>
                <div id="pcta_wrap_${k}" class="hidden mt-2 space-y-2">${o.kind === 'custom'
                    ? `<input id="pcta_custom_label" class="promo-input" maxlength="20" placeholder="বাটনের লেখা (যেমন: অফার দেখুন)"><input id="pcta_custom_url" class="promo-input" placeholder="https://...">`
                    : `<input id="pcta_val_${k}" class="promo-input" ${o.kind === 'phone' ? 'inputmode="tel"' : ''} placeholder="${esc(o.ph)}">`}</div></div>`).join('');
            box.querySelectorAll('input.promo-input').forEach(i => i.addEventListener('input', updatePromoPreview));
        }
        window.togglePromoCta = (k, on) => {
            if (isForcedProfileMode) return;
            if (on) promoCtaChecked.add(k); else promoCtaChecked.delete(k);
            document.getElementById('pcta_wrap_' + k)?.classList.toggle('hidden', !on);
            updatePromoPreview();
        };
        function collectPromoCtas(strict) {
            const cta = {};
            if (promoCtaChecked.size === 0) { if (strict) throw new Error('কমপক্ষে ১টি বাটন বেছে নিন'); return cta; }
            for (const k of promoCtaChecked) {
                const o = PROMO_CTA_OPTIONS[k];
                if (k === 'custom') {
                    const label = (document.getElementById('pcta_custom_label')?.value || '').trim();
                    const url = (document.getElementById('pcta_custom_url')?.value || '').trim();
                    if (strict) { if (label.length < 2) throw new Error('কাস্টম বাটনের লেখা দিন'); if (!isHttpUrl(url)) throw new Error('কাস্টম বাটনের সঠিক লিংক দিন (http/https)'); }
                    if (label && isHttpUrl(url)) cta.custom = { label, url };
                    continue;
                }
                const v = (document.getElementById('pcta_val_' + k)?.value || '').trim();
                if (strict) {
                    if (o.kind === 'phone' && !isBdPhone(v)) throw new Error(`${o.btn}: সঠিক মোবাইল নম্বর দিন`);
                    if (o.kind === 'url' && !isHttpUrl(v)) throw new Error(`${o.btn}: সঠিক লিংক দিন (http/https)`);
                }
                if (v) cta[k] = v;
            }
            return cta;
        }
        function clearPromoImage() {
            promoImageFile = null;
            if (promoImageObjUrl) { URL.revokeObjectURL(promoImageObjUrl); promoImageObjUrl = ''; }
            const inp = document.getElementById('promoImageInput'); if (inp) inp.value = '';
            const pv = document.getElementById('promoImagePreview'); if (pv) { pv.removeAttribute('src'); pv.classList.add('hidden'); }
            document.getElementById('promoImagePrompt')?.classList.remove('hidden');
            document.getElementById('promoImageZone')?.classList.remove('has-image');
        }
        window.setPromoMediaType = (type) => {
            type = type === 'video' ? 'video' : 'image';
            document.getElementById('promoMediaType').value = type;
            document.querySelectorAll('input[name="promoMediaTypeRadio"]').forEach(r => { r.checked = (r.value === type); });
            document.getElementById('promoImageZone').classList.toggle('hidden', type !== 'image');
            document.getElementById('promoVideoSection').classList.toggle('hidden', type !== 'video');
            if (type === 'image') { const u = document.getElementById('promoVideoUrl'); if (u) u.value = ''; }
            else clearPromoImage();
            if (promoStep === 4) updatePromoPreview();
        };
        window.onPromoVideoUrlInput = () => {
            if (document.getElementById('promoVideoUrl').value.trim()) clearPromoImage();
            if (promoStep === 4) updatePromoPreview();
        };
        window.previewPromoImage = (input) => {
            if (isForcedProfileMode) return;
            const f = input.files && input.files[0]; if (!f) return;
            if (!/^image\/(jpeg|png)$/i.test(f.type)) { input.value = ''; return showToast('শুধু JPG/PNG ছবি দিন', 'circle-x', 'text-rose-400'); }
            if (f.size > 3 * 1024 * 1024) { input.value = ''; return showToast('ছবি সর্বোচ্চ ৩MB হতে পারবে', 'circle-x', 'text-rose-400'); }
            promoImageFile = f;
            const vInp = document.getElementById('promoVideoUrl'); if (vInp) vInp.value = '';
            if (promoImageObjUrl) URL.revokeObjectURL(promoImageObjUrl);
            promoImageObjUrl = URL.createObjectURL(f);
            const img = document.getElementById('promoImagePreview'); img.src = promoImageObjUrl; img.classList.remove('hidden');
            document.getElementById('promoImagePrompt').classList.add('hidden');
            document.getElementById('promoImageZone').classList.add('has-image');
        };
        function draftPromotion() {
            return {
                type: promoType || 'other',
                title: document.getElementById('promoTitle')?.value.trim() || 'আপনার বিজ্ঞাপনের শিরোনাম',
                shortDescription: document.getElementById('promoShortDesc')?.value.trim() || 'সংক্ষিপ্ত বিবরণ এখানে দেখাবে',
                userName: userProfile?.fullName || 'বিজ্ঞাপনদাতা',
                district: document.getElementById('promoDistrict')?.value.trim() || '',
                upazila: document.getElementById('promoUpazila')?.value.trim() || '',
                image: promoImageObjUrl,
                videoUrl: (document.getElementById('promoMediaType')?.value === 'video') ? (document.getElementById('promoVideoUrl')?.value.trim() || '') : '',
                cta: collectPromoCtas(false)
            };
        }
        function updatePromoPreview() {
            if (isForcedProfileMode) return;
            const box = document.getElementById('promoPreviewBox'); if (!box) return;
            box.innerHTML = buildPromotionCard(draftPromotion(), true); refreshIcons();
        }

        function setPromoStep(n) {
            if (isForcedProfileMode) return;
            promoStep = n;
            for (let i = 1; i <= 4; i++) document.getElementById('promoStep' + i)?.classList.toggle('hidden', i !== n);
            document.getElementById('promoStepLabel').textContent = `ধাপ ${n}/৪ — ${PROMO_STEP_LABELS[n - 1]}`;
            document.querySelectorAll('#promoStepBar > div').forEach((d, i) => { d.classList.toggle('bg-amber-500', i < n); d.classList.toggle('bg-white/10', i >= n); });
            document.getElementById('promoBackBtn').classList.toggle('hidden', n === 1);
            document.getElementById('promoNextBtn').classList.toggle('hidden', n === 4);
            document.getElementById('promoSubmitBtn').classList.toggle('hidden', n !== 4);
            if (n === 3) renderPromoExtraFields();
            if (n === 4) updatePromoPreview();
            document.querySelector('#promotionFormModal .overflow-y-auto')?.scrollTo?.(0, 0);
            refreshIcons();
        }
        function validatePromoStep(n) {
            const bad = (m) => { showToast(m, 'circle-x', 'text-rose-400'); return false; };
            if (n === 1) return promoType ? true : bad('প্রমোশনের ধরন বেছে নিন');
            if (n === 2) {
                const t = document.getElementById('promoTitle').value.trim(), s = document.getElementById('promoShortDesc').value.trim(), d = document.getElementById('promoFullDesc').value.trim();
                if (document.getElementById('promoMediaType').value === 'video') {
                    const vu = document.getElementById('promoVideoUrl').value.trim();
                    if (!vu) return bad('ভিডিও লিংক দিন (অথবা ছবি বেছে নিন)');
                    if (!aeParseVideo(vu)) return bad('ভিডিও লিংক সঠিক নয় (http/https দিয়ে শুরু করুন)');
                } else if (!promoImageFile) return bad('ছবি আপলোড করুন');
                if (t.length < 3 || t.length > 80) return bad('শিরোনাম ৩-৮০ অক্ষরের হতে হবে');
                if (s.length < 5 || s.length > 150) return bad('সংক্ষিপ্ত বিবরণ ৫-১৫০ অক্ষরের হতে হবে');
                if (d.length < 10 || d.length > 600) return bad('বিস্তারিত বর্ণনা ১০-৬০০ অক্ষরের হতে হবে');
                return true;
            }
            if (n === 3) {
                const ex = collectPromoExtra();
                for (const f of (PROMO_EXTRA_FIELDS[promoType] || [])) {
                    const v = ex[f.k];
                    if (f.req && !v) return bad(`${f.l} দিন`);
                    if (f.url && v && !isHttpUrl(v)) return bad(`${f.l} সঠিক নয় (http/https দিয়ে শুরু করুন)`);
                    if (f.num && v && !(Number(v) >= 0)) return bad(`${f.l} সঠিক সংখ্যা দিন`);
                }
                return true;
            }
            return true;
        }
        window.promoNextStep = () => { if (isForcedProfileMode) return; if (validatePromoStep(promoStep)) setPromoStep(Math.min(4, promoStep + 1)); };
        window.promoPrevStep = () => { if (isForcedProfileMode) return; setPromoStep(Math.max(1, promoStep - 1)); };

        async function getPromoServerCooldownMs() {
            try {
                if (!firebaseReady || !currentUser) return 0;
                const snap = await getDocs(query(collection(db, 'promotions'), where('uid', '==', currentUser.uid)));
                let last = 0;
                snap.forEach(d => { const c = d.data().createdAt; const ms = c && typeof c.toDate === 'function' ? c.toDate().getTime() : 0; if (ms > last) last = ms; });
                return last ? Math.max(0, RATE_LIMITS.promotion - (Date.now() - last)) : 0;
            } catch (e) { return 0; }
        }
        function formatPromoWait(ms) { const h = Math.floor(ms / 3600000), m = Math.ceil((ms % 3600000) / 60000); return h > 0 ? `${h} ঘণ্টা ${m} মিনিট` : `${m} মিনিট`; }

        window.openPromotionFormModal = async () => {
            if (isForcedProfileMode) return;
            if (!currentUser || !userProfile) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            const rate = checkRateLimit('promotion');
            if (!rate.allowed) return showToast(`২৪ ঘণ্টায় ১টি বিজ্ঞাপন দেওয়া যায়। ${formatPromoWait(rate.remaining * 1000)} পর আবার চেষ্টা করুন`, 'clock', 'text-amber-400');
            const wait = await getPromoServerCooldownMs();
            if (wait > 0) return showToast(`২৪ ঘণ্টায় ১টি বিজ্ঞাপন দেওয়া যায়। ${formatPromoWait(wait)} পর আবার চেষ্টা করুন`, 'clock', 'text-amber-400');
            promoType = null; promoImageFile = null; promoCtaChecked = new Set();
            if (promoImageObjUrl) { URL.revokeObjectURL(promoImageObjUrl); promoImageObjUrl = ''; }
            ['promoTitle', 'promoShortDesc', 'promoFullDesc'].forEach(id => { document.getElementById(id).value = ''; });
            document.getElementById('promoDistrict').value = userProfile.district || '';
            document.getElementById('promoUpazila').value = userProfile.upazila || '';
            document.getElementById('promoImagePreview').classList.add('hidden');
            document.getElementById('promoImagePrompt').classList.remove('hidden');
            document.getElementById('promoImageZone').classList.remove('has-image');
            document.getElementById('promoImageInput').value = '';
            { const vu = document.getElementById('promoVideoUrl'); if (vu) vu.value = ''; }
            setPromoMediaType('image');
            const sc = document.getElementById('promoShortDesc'), fc = document.getElementById('promoFullDesc');
            sc.oninput = () => { document.getElementById('promoShortCount').textContent = `${sc.value.length}/150`; };
            fc.oninput = () => { document.getElementById('promoFullCount').textContent = `${fc.value.length}/600`; };
            sc.oninput(); fc.oninput();
            ['promoTitle', 'promoShortDesc', 'promoDistrict', 'promoUpazila'].forEach(id => { document.getElementById(id).oninput = () => { if (promoStep === 4) updatePromoPreview(); }; });
            renderPromoTypeGrid(); renderPromoExtraFields(); renderPromoCtaList(); setPromoStep(1);
            document.getElementById('promotionFormModal').classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closePromotionFormModal = () => {
            if (isForcedProfileMode) return;
            const m = document.getElementById('promotionFormModal'); if (!m || m.classList.contains('hidden')) return;
            m.classList.add('hidden'); document.body.classList.remove('overflow-hidden');
            if (promoImageObjUrl) { URL.revokeObjectURL(promoImageObjUrl); promoImageObjUrl = ''; }
        };
        window.handleRunAdClick = () => {
            if (isForcedProfileMode) return;
            closePremiumActionModal();
            if (!isPremiumSystemLive()) {
                showToast('প্রিমিয়াম সাবস্ক্রিপশন বর্তমানে উপলব্ধ নয়', 'crown', 'text-slate-400');
                return;
            }
            if (!isUserPremium) {
                showToast('বিজ্ঞাপন চালাতে প্রিমিয়াম সাবস্ক্রিপশন কিনতে হবে', 'crown', 'text-amber-400');
                setTimeout(() => switchTab('subscription'), 800);
                return;
            }
            openPromotionFormModal();
        };
        window.handlePromotionSubmit = async () => {
            if (isForcedProfileMode) return;
            if (promoSubmitting) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            if (!isPremiumSystemLive()) return showToast('প্রিমিয়াম সাবস্ক্রিপশন বর্তমানে উপলব্ধ নয়', 'crown', 'text-slate-400');
            if (!isUserPremium) return showToast('প্রিমিয়াম সাবস্ক্রিপশন প্রয়োজন', 'crown', 'text-amber-400');
            const rate = checkRateLimit('promotion');
            if (!rate.allowed) return showToast('২৪ ঘণ্টায় ১টি বিজ্ঞাপন দেওয়া যায়', 'clock', 'text-amber-400');
            for (let i = 1; i <= 3; i++) if (!validatePromoStep(i)) return setPromoStep(i);
            let cta; try { cta = collectPromoCtas(true); } catch (e) { return showToast(e.message, 'circle-x', 'text-rose-400'); }
            const btn = document.getElementById('promoSubmitBtn');
            promoSubmitting = true; btn.disabled = true; btn.classList.add('opacity-60');
            try {
                const promoMediaType = document.getElementById('promoMediaType').value === 'video' ? 'video' : 'image';
                let imageUrl = '', videoUrl = '';
                if (promoMediaType === 'video') {
                    videoUrl = document.getElementById('promoVideoUrl').value.trim();
                } else {
                    btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> ছবি আপলোড...'; refreshIcons();
                    imageUrl = await uploadToCloudinary(promoImageFile);
                }
                btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> পাঠানো হচ্ছে...'; refreshIcons();
                await addDoc(collection(db, 'promotions'), {
                    uid: currentUser.uid,
                    userName: userProfile?.fullName || '', userPhone: userProfile?.phone || '', userEmail: userProfile?.email || currentUser.email || '',
                    type: promoType,
                    title: document.getElementById('promoTitle').value.trim(),
                    shortDescription: document.getElementById('promoShortDesc').value.trim(),
                    fullDescription: document.getElementById('promoFullDesc').value.trim(),
                    mediaType: promoMediaType,
                    image: imageUrl,
                    videoUrl: videoUrl,
                    district: document.getElementById('promoDistrict').value.trim(),
                    upazila: document.getElementById('promoUpazila').value.trim(),
                    extraFields: collectPromoExtra(),
                    cta,
                    status: 'pending', createdAt: serverTimestamp(), reviewedAt: null, expiresAt: null, rejectionReason: null
                });
                setRateLimit('promotion');
                showToast('বিজ্ঞাপন জমা হয়েছে! অ্যাডমিন অনুমোদনের অপেক্ষায়।', 'circle-check', 'text-emerald-400');
                closePromotionFormModal();
            } catch (err) {
                showToast('জমা ব্যর্থ: ' + (err.code || err.message), 'circle-x', 'text-rose-400');
            } finally {
                promoSubmitting = false; btn.disabled = false; btn.classList.remove('opacity-60');
                btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> বিজ্ঞাপন জমা দিন'; refreshIcons();
            }
        };

        function promoCtaHref(k, v) {
            if (k === 'call') return 'tel:' + String(v).replace(/[^0-9+]/g, '');
            if (k === 'whatsapp') { let d = String(v).replace(/[^0-9]/g, ''); if (d.startsWith('0')) d = '88' + d; return 'https://wa.me/' + d; }
            if (k === 'custom') return isHttpUrl(v.url) ? v.url : '';
            return isHttpUrl(v) ? v : '';
        }
        function getPromoPrimaryCTA(promo) {
            const cta = promo.cta || {};
            const has = (k) => k === 'custom' ? !!(cta.custom && cta.custom.label && promoCtaHref('custom', cta.custom)) : !!(cta[k] && promoCtaHref(k, cta[k]));
            const typeMatch = ['youtube', 'facebook', 'tiktok', 'instagram', 'telegram'].includes(promo.type) ? promo.type : null;
            const order = ['custom', typeMatch, 'call', 'website', 'whatsapp', 'facebook', 'youtube', 'tiktok', 'instagram', 'telegram'].filter(Boolean);
            const key = order.find(has);
            if (!key) return null;
            return { key, label: key === 'custom' ? cta.custom.label : PROMO_CTA_OPTIONS[key].btn, icon: PROMO_CTA_OPTIONS[key].icon, href: promoCtaHref(key, key === 'custom' ? cta.custom : cta[key]) };
        }
        // ========== VIDEO HELPERS + GLOBAL VIDEO MODAL ==========
        function aeParseVideo(url) {
            url = String(url || '').trim();
            if (!/^https?:\/\//i.test(url)) return null;
            const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
            if (m) return { type: 'youtube', id: m[1], url };
            if (/(facebook\.com|fb\.watch|fb\.com)/i.test(url)) return { type: 'facebook', url };
            return { type: 'direct', url };
        }
        window.aeYtThumbFallback = (img, id) => {
            if (img.dataset.fb) return;
            img.dataset.fb = '1';
            img.src = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
        };
        // 16:9 thumbnail with a play overlay; click opens the global video modal
        function aeVideoThumbHTML(url, title, extra = '') {
            const v = aeParseVideo(url);
            if (!v) return '';
            let media;
            if (v.type === 'youtube') {
                media = `<img src="https://img.youtube.com/vi/${v.id}/maxresdefault.jpg" alt="${esc(title || '')}" loading="lazy" decoding="async" onerror="aeYtThumbFallback(this,'${v.id}')" onload="if(this.naturalWidth&&this.naturalWidth<=120)aeYtThumbFallback(this,'${v.id}')">`;
            } else if (v.type === 'direct') {
                media = `<video src="${esc(v.url)}#t=0.5" preload="metadata" muted playsinline></video>`;
            } else {
                media = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1877F2]/40 to-slate-900"><svg class="w-12 h-12 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>`;
            }
            return `<div class="ae-vthumb" data-video-url="${esc(v.url)}" role="button" tabindex="0" aria-label="Play video" onclick="event.stopPropagation(); openVideoModal(this.dataset.videoUrl)" onkeydown="if(event.key==='Enter'){event.stopPropagation();openVideoModal(this.dataset.videoUrl)}">${media}<div class="ae-vshade"></div><div class="ae-vplay"><span><svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M8 5v14l11-7z"/></svg></span></div>${extra}</div>`;
        }
        let aeVideoAddedOverflow = false;
        window.openVideoModal = (url) => {
            const v = aeParseVideo(url);
            if (!v) return;
            const modal = document.getElementById('aeVideoModal');
            const body = document.getElementById('aeVideoModalBody');
            if (!modal || !body) return;
            let html;
            if (v.type === 'youtube') {
                html = `<iframe src="https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
            } else if (v.type === 'facebook') {
                html = `<iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(v.url)}&show_text=false&autoplay=true" title="Video" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>`;
            } else {
                html = `<video src="${esc(v.url)}" controls autoplay playsinline controlsList="nodownload"></video>`;
            }
            body.innerHTML = html;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            if (!document.body.classList.contains('overflow-hidden')) { document.body.classList.add('overflow-hidden'); aeVideoAddedOverflow = true; }
        };
        window.closeAeVideoModal = () => {
            const modal = document.getElementById('aeVideoModal');
            const body = document.getElementById('aeVideoModalBody');
            if (body) body.innerHTML = ''; // stops playback
            if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
            if (aeVideoAddedOverflow) { document.body.classList.remove('overflow-hidden'); aeVideoAddedOverflow = false; }
        };
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const m = document.getElementById('aeVideoModal');
                if (m && !m.classList.contains('hidden')) closeAeVideoModal();
            }
        });

        function buildPromotionCard(promo, preview = false) {
            const t = PROMO_TYPES[promo.type] || PROMO_TYPES.other;
            const loc = esc([promo.upazila, promo.district].filter(Boolean).join(', ') || '—');
            const img = /^(https?:|blob:)/i.test(promo.imageUrl || promo.image || '') ? (promo.imageUrl || promo.image) : '';
            const promoVideoUrl = String(promo.videoUrl || '').trim();
            const promoHasVideo = !!aeParseVideo(promoVideoUrl);
            const primary = getPromoPrimaryCTA(promo);
            const cta = promo.cta || {};
            const smallKeys = ['call', 'website', 'whatsapp', 'facebook', 'youtube', 'tiktok', 'instagram', 'telegram', 'custom'].filter(k => k !== (primary && primary.key) && (k === 'custom' ? (cta.custom && promoCtaHref('custom', cta.custom)) : (cta[k] && promoCtaHref(k, cta[k])))).slice(0, 3);
            const link = (href, cls, inner, title) => preview ? `<span class="${cls}" title="${esc(title || '')}">${inner}</span>` : `<a href="${esc(href)}" ${href.startsWith('tel:') ? '' : 'target="_blank" rel="noopener noreferrer"'} onclick="event.stopPropagation()" class="${cls}" title="${esc(title || '')}">${inner}</a>`;
            const smalls = smalls_(smallKeys);
            function smalls_(keys) { return keys.map(k => link(promoCtaHref(k, k === 'custom' ? cta.custom : cta[k]), 'promo-cta-small', `<i data-lucide="${PROMO_CTA_OPTIONS[k].icon}" class="w-4 h-4"></i>`, k === 'custom' ? cta.custom.label : PROMO_CTA_OPTIONS[k].btn)).join(''); }
            return `<div class="promotion-card cursor-pointer" data-promo-id="${esc(promo.id || '')}" onclick="openPromotionDetail('${esc(promo.id || '')}')">
                <div>
                    ${promoHasVideo ? aeVideoThumbHTML(promoVideoUrl, promo.title, '<span class="promo-ad-badge">AD</span><span class="promo-sponsored-badge"><svg class="ic ic-fill" aria-hidden="true"><use href="#i-star"/></svg> স্পন্সরড</span>') : `<div class="h-40 bg-[#0f0a03] overflow-hidden relative">
                        ${img ? `<img src="${esc(img)}" alt="${esc(promo.title || '')}" loading="lazy" decoding="async" class="w-full h-full object-cover">` : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-900/40 to-orange-900/20"><i data-lucide="megaphone" class="w-10 h-10 text-amber-400/60"></i></div>`}
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0d1f17]/85 via-transparent to-transparent pointer-events-none"></div>
                        <span class="promo-ad-badge">AD</span>
                        <span class="promo-sponsored-badge"><svg class="ic ic-fill" aria-hidden="true"><use href="#i-star"/></svg> স্পন্সরড</span>
                    </div>`}
                    <div class="p-4">
                        <span class="promo-type-tag mb-1.5" style="background:${t.color}"><i data-lucide="${t.icon}" class="w-3 h-3"></i> ${esc(t.label)}</span>
                        <h4 class="font-bold text-slate-100 text-sm sm:text-base leading-snug mb-1.5">${esc(promo.title || '')}</h4>
                        <p class="text-[11px] text-amber-300 font-bold mb-1.5 flex items-center gap-1 truncate"><i data-lucide="megaphone" class="w-3 h-3 shrink-0"></i> বিজ্ঞাপনদাতা: ${esc(promo.userName || 'অজানা')}</p>
                        <p class="text-[11px] text-slate-400 mb-2 flex items-center gap-1 truncate"><i data-lucide="map-pin" class="w-3 h-3 text-rose-400 shrink-0"></i> ${loc}</p>
                        <p class="text-xs text-slate-300 line-clamp-2">${esc(promo.shortDescription || '')}</p>
                    </div>
                </div>
                <div class="p-3 pt-0 flex items-center gap-1.5">
                    ${smalls}
                    ${primary ? link(primary.href, 'promo-cta-main', `<i data-lucide="${primary.icon}" class="w-3.5 h-3.5 shrink-0"></i><span class="truncate">${esc(primary.label)}</span>`, primary.label) : ''}
                </div>
            </div>`;
        }
        function promoTimeMs(v) { return v && typeof v.toDate === 'function' ? v.toDate().getTime() : (v ? new Date(v).getTime() : 0); }
        function getActivePromotions() {
            const now = Date.now();
            return promotionsCache.filter(p => p.status === 'approved' && promoTimeMs(p.expiresAt) > now);
        }

        // Returns the next ad in a shuffled cycle. Each active ad is shown once
        // per cycle; when the pool ends, a fresh random order is generated.
        function getNextRandomPromotionCard(activeAds) {
            if (!activeAds.length) return null;

            const signature = activeAds.map(p => p.id).sort().join('|');
            if (signature !== adPoolSignature) {
                adFeedCards = [];
                adShufflePool = [];
                adShuffleIndex = 0;
                adLastShownId = null;
                adPoolSignature = signature;
            }

            if (adShuffleIndex >= adShufflePool.length) {
                adShufflePool = shuffleArray(activeAds);
                adShuffleIndex = 0;

                // Avoid an identical ad at the boundary between two cycles
                // whenever at least two different active ads are available.
                if (adShufflePool.length > 1 && adShufflePool[0].id === adLastShownId) {
                    const swapIndex = 1 + Math.floor(Math.random() * (adShufflePool.length - 1));
                    [adShufflePool[0], adShufflePool[swapIndex]] = [adShufflePool[swapIndex], adShufflePool[0]];
                }
            }

            const promotion = adShufflePool[adShuffleIndex++];
            adLastShownId = promotion.id;
            return buildPromotionCard(promotion);
        }

        function mixAdsWithServices(services, search) {
            const cards = services.map(buildServiceCard);
            // Search results intentionally remain service-only, as before.
            if (search) return cards;

            const activeAds = getActivePromotions();
            if (!activeAds.length) return cards;

            const out = [];
            let adIndex = 0;

            cards.forEach((serviceCard, index) => {
                out.push(serviceCard);

                // Exactly one advertisement after every three service cards.
                if ((index + 1) % 3 === 0) {
                    if (!adFeedCards[adIndex]) {
                        adFeedCards[adIndex] = getNextRandomPromotionCard(activeAds);
                    }
                    if (adFeedCards[adIndex]) out.push(adFeedCards[adIndex]);
                    adIndex++;
                }
            });

            return out;
        }
        let lastActivePromoCount = -1;
        setInterval(() => {
            if (!promotionsCache.length || isForcedProfileMode) return;
            const n = getActivePromotions().length;
            if (lastActivePromoCount !== -1 && n !== lastActivePromoCount && currentTab === 'services') renderServices(true);
            lastActivePromoCount = n;
        }, 60000);

        // ========== SERVICES: BUILD CARD ==========
        function buildServiceCard(item) {
            const id = esc(item.id);
            const title = esc(item.title || 'সেবা');
            const desc = esc(item.description || '');
            const location = esc([item.upazila, item.district].filter(Boolean).join(', ') || item.location || '—');
            const providerName = esc(item.providerName || item.applicantName || item.userName || 'অজানা');
            const phoneRaw = String(item.phone || '').replace(/[^0-9+]/g, '');
            const imageUrl = String(item.imageUrl || item.image || '').trim();
            const safeImage = /^https?:\/\//i.test(imageUrl) ? imageUrl : '';
            const svcVideoUrl = String(item.videoUrl || '').trim();
            const svcHasVideo = !!aeParseVideo(svcVideoUrl);
            const website = /^https?:\/\//i.test(item.website || '') ? item.website : '';
            const facebook = /^https?:\/\//i.test(item.facebook || '') ? item.facebook : '';
            const whatsapp = String(item.whatsapp || '').replace(/[^0-9]/g, '');
            const isAdminPost = item.isAdminPost === true || item.source === 'admin';
            const isFav = userFavorites.has(item.id);
            return `<div class="service-card" onclick="openServiceDetail('${id}')" data-service-id="${id}">
                <div>
                    ${svcHasVideo ? aeVideoThumbHTML(svcVideoUrl, item.title || '') : `<div class="h-40 bg-[#07140e] overflow-hidden relative">
                        ${safeImage
                            ? `<img src="${esc(safeImage)}" alt="${title}" loading="lazy" decoding="async" class="w-full h-full object-cover">`
                            : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900/50 to-emerald-900/30"><i data-lucide="briefcase" class="w-10 h-10 text-emerald-400/60"></i></div>`
                        }
                        <div class="absolute inset-0 bg-gradient-to-t from-[#10281c]/85 via-transparent to-transparent pointer-events-none"></div>
                        <!-- Favorite action is intentionally kept only in the detail modal footer to avoid duplicate heart controls. -->
                    </div>`}
                    <div class="p-4">
                        <div class="flex items-center flex-wrap gap-2 mb-1.5">
                            <h4 data-user-content="true" class="font-bold text-slate-100 text-sm sm:text-base leading-snug flex-1 min-w-0">${title}</h4>
                            
                            ${isAdminPost ? `<span class="bg-emerald-600/90 text-white px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 shadow-sm border border-emerald-500/50 shrink-0">এডমিন <i data-lucide="shield-check" class="w-2.5 h-2.5 text-white"></i></span>` : ''}
                        </div>
                        <p class="text-[11px] text-emerald-300 font-bold mb-1.5 flex items-center gap-1 truncate">
                            <i data-lucide="user" class="w-3 h-3 shrink-0"></i> সেবাদাতা: <span data-user-content="true">${providerName}</span>
                        </p>
                        <p class="text-[11px] text-slate-400 mb-2 flex items-center gap-1 truncate">
                            <i data-lucide="map-pin" class="w-3 h-3 text-rose-400 shrink-0"></i> <span data-user-content="true">${location}</span>
                        </p>
                        <p data-user-content="true" class="text-xs text-slate-300 line-clamp-2">${desc}</p>
                    </div>
                </div>
                <div class="p-3 pt-0 flex items-center gap-1.5">
                    ${website ? `<button type="button" data-url="${esc(website)}" onclick="event.stopPropagation(); openExternalUrl(this)" class="action-btn w-9 h-9 shrink-0 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded-xl flex items-center justify-center" title="ওয়েবসাইট"><i data-lucide="globe" class="w-4 h-4"></i></button>` : ''}
                    ${whatsapp ? `<button type="button" data-url="https://wa.me/${whatsapp}" onclick="event.stopPropagation(); openExternalUrl(this)" class="action-btn w-9 h-9 shrink-0 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] rounded-xl flex items-center justify-center" title="WhatsApp"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></button>` : ''}
                    ${facebook ? `<button type="button" data-url="${esc(facebook)}" onclick="event.stopPropagation(); openExternalUrl(this)" class="action-btn w-9 h-9 shrink-0 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] rounded-xl flex items-center justify-center" title="Facebook"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>` : ''}
                    <button type="button" onclick="event.stopPropagation(); shareService('${id}')" class="action-btn w-9 h-9 shrink-0 bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-400/40 text-emerald-200 rounded-xl flex items-center justify-center" title="সেবা শেয়ার করুন" aria-label="সেবা শেয়ার করুন"><i data-lucide="share-2" class="w-4 h-4"></i></button>
                    <a href="${currentUser ? `tel:${esc(phoneRaw)}` : '#guest-login'}" data-service-name="Service: ${title}" onclick="event.stopPropagation(); if (!currentUser) { showAuthScreen(); switchAuthTab('login'); return false; }" class="call-action flex-1 h-9 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-green-600/30">
                        <i data-lucide="phone" class="w-3.5 h-3.5"></i> কল করুন
                    </a>
                </div>
            </div>`;
        }

        // ========== RENDER SERVICES ==========
        function renderServices(reset = false) {
            if (isForcedProfileMode) return;
            const grid = document.getElementById('servicesGrid');
            const count = document.getElementById('itemCountText');
            if (!grid) return;

            if (!servicesFirstLoadDone && servicesCache.length === 0) return;

            const search = getSearchValue();
            const source = search && allServicesFullCache ? allServicesFullCache : servicesCache;
            const filtered = search ? source.filter(s => matchesServiceSearch(s, search)) : source;

            if (count) {
                if (search) {
                    count.textContent = `${filtered.length} টি মিলেছে`;
                } else if (myUpazilaFilterOn) {
                    const upaName = (userProfile && userProfile.upazila) ? String(userProfile.upazila).trim() : 'আপনার এলাকা';
                    count.innerHTML = `<span class="text-emerald-300 font-semibold">${filtered.length} টি সেবা · ${esc(upaName)}</span>`;
                } else {
                    count.innerHTML = `<span class="inline-flex items-center gap-1.5">
                        <span class="infinity-symbol">∞</span>
                        <span class="text-emerald-300 font-semibold">টি সেবা চলছে</span>
                    </span>`;
                }
            }

            const isSearchMode = !!search;
            const searchModeChanged = isSearchMode !== wasInSearchMode;
            wasInSearchMode = isSearchMode;
            const currentAdCount = getActivePromotions().length;
            const adCountChanged = currentAdCount !== lastAdCountAtRender;

            // Empty state when upazila location filter is on and nothing matches
            if (!isSearchMode && myUpazilaFilterOn && servicesFirstLoadDone && filtered.length === 0) {
                const upaName = (userProfile && userProfile.upazila) ? String(userProfile.upazila).trim() : 'আপনার উপজেলা';
                grid.innerHTML = `<div class="col-span-full text-center py-10 bg-[#10281c] rounded-2xl border border-dashed border-emerald-900/50 p-6 space-y-2">
                    <div class="w-16 h-16 bg-emerald-950/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-800/60"><i data-lucide="map-pin" class="w-7 h-7"></i></div>
                    <h3 class="text-sm font-bold text-slate-200">${esc(upaName)}-এ এই ক্যাটাগরিতে কোনো সেবা নেই</h3>
                    <p class="text-xs text-slate-400 max-w-sm mx-auto">লোকেশন ফিল্টার বন্ধ করুন অথবা অন্য ক্যাটাগরি বেছে নিন।</p>
                    <button type="button" onclick="filterCategory('${MY_UPAZILA_CAT}')" class="mt-2 px-4 py-2 rounded-full text-xs font-bold bg-emerald-600 text-white">লোকেশন ফিল্টার বন্ধ করুন</button>
                </div>`;
                refreshIcons();
                return;
            }

            if (isSearchMode) {
                if (filtered.length === 0) {
                    grid.innerHTML = `<div class="col-span-full text-center py-10 bg-[#10281c] rounded-2xl border border-dashed border-emerald-900/50 p-6 space-y-2">
                        <div class="w-16 h-16 bg-emerald-950/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-800/60"><i data-lucide="search-x" class="w-7 h-7"></i></div>
                        <h3 class="text-sm font-bold text-slate-200">কোনো সেবা মেলেনি</h3>
                        <p class="text-xs text-slate-400 max-w-sm mx-auto">অন্য শব্দ দিয়ে খুঁজুন বা সার্চ মুছে ফেলুন।</p>
                    </div>`;
                    refreshIcons();
                    return;
                }
                // No entrance animation during search — prevents shake on each keystroke
                const html = filtered.map((s) => {
                    return `<div data-card-wrapper style="height:100%">${buildServiceCard(s)}</div>`;
                }).join('');
                grid.innerHTML = html;
                refreshIcons();
                return;
            }

            if (reset || adCountChanged || searchModeChanged) {
                grid.innerHTML = '';
                lastRenderedCount = 0;
                lastAdCountAtRender = currentAdCount;
                animationQueueCounter = 0;

                // A manual/realtime refresh or a changed active-ad count starts
                // a fresh ad shuffle cycle while preserving all service data.
                if (reset || adCountChanged) resetAdFeedState();
            }

            const allCards = mixAdsWithServices(filtered, search);
            const newCards = allCards.slice(lastRenderedCount);

            if (newCards.length > 0) {
                const html = newCards.map((cardHTML, idx) => {
                    const globalIdx = animationQueueCounter + idx;
                    const delay = Math.min(globalIdx * 65, 500);
                    const isAd = cardHTML.includes('promotion-card');
                    const wrapperClass = isAd ? 'promo-card-in' : 'service-card-in';
                    return `<div class="${wrapperClass}" data-card-wrapper style="animation-delay:${delay}ms">${cardHTML}</div>`;
                }).join('');

                grid.insertAdjacentHTML('beforeend', html);
                animationQueueCounter += newCards.length;
                lastRenderedCount = allCards.length;
            }

            refreshIcons();
            // Clear transforms after entrance so later search/filter does not feel shaky
            setTimeout(() => {
                document.querySelectorAll('#servicesGrid [data-card-wrapper]').forEach(el => el.classList.add('anim-done'));
            }, 450);
        }

        // ========== SERVICE DETAIL MODAL ==========
        window.openServiceDetail = (serviceId) => {
            if (isForcedProfileMode) return;
            if (!currentUser) { showAuthScreen(); switchAuthTab('login'); return; }
            const service = servicesCache.find(s => s.id === serviceId)
                || favoritesCache.find(s => s.id === serviceId)
                || (allServicesFullCache || []).find(s => s.id === serviceId);
            if (!service) return;
            activeServiceId = serviceId;
            const title = service.title || 'সেবা';
            const providerName = service.providerName || service.applicantName || service.userName || 'অজানা';
            const location = [service.upazila, service.district].filter(Boolean).join(', ') || service.location || '—';
            const phoneRaw = String(service.phone || '').replace(/[^0-9+]/g, '');
            const imageUrl = /^https?:\/\//i.test(service.image || '') ? service.image : '';
            const website = /^https?:\/\//i.test(service.website || '') ? service.website : '';
            const facebook = /^https?:\/\//i.test(service.facebook || '') ? service.facebook : '';
            const whatsapp = String(service.whatsapp || '').replace(/[^0-9]/g, '');
            const isAdminPost = service.isAdminPost === true || service.source === 'admin';
            const isFav = userFavorites.has(serviceId);

            document.getElementById('svcModalTitle').textContent = title;
            document.getElementById('svcModalProvider').textContent = providerName;
            document.getElementById('svcModalLocation').textContent = location;
            document.getElementById('svcModalDescription').textContent = service.description || 'বিস্তারিত দেওয়া হয়নি।';
            document.getElementById('svcModalAdminBadge').classList.toggle('hidden', !isAdminPost);
            const imgEl = document.getElementById('svcModalImage');
            const fb = document.getElementById('svcModalImageFallback');
            if (imageUrl) { imgEl.src = imageUrl; imgEl.classList.remove('hidden'); fb.classList.add('hidden'); fb.classList.remove('flex'); }
            else { imgEl.removeAttribute('src'); imgEl.classList.add('hidden'); fb.classList.remove('hidden'); fb.classList.add('flex'); }
            const svcVidBox = document.getElementById('svcModalVideo');
            if (svcVidBox) {
                const vHtml = aeVideoThumbHTML(service.videoUrl, title);
                svcVidBox.innerHTML = vHtml;
                svcVidBox.classList.toggle('hidden', !vHtml);
                if (vHtml) { imgEl.classList.add('hidden'); fb.classList.add('hidden'); fb.classList.remove('flex'); }
            }
            const setLink = (id, href, show) => {
                const el = document.getElementById(id); if (!el) return;
                if (show) { el.href = href; el.classList.remove('hidden'); el.classList.add('flex'); }
                else { el.classList.add('hidden'); el.classList.remove('flex'); }
            };
            setLink('svcModalWebsite', website, !!website);
            setLink('svcModalWhatsapp', whatsapp ? `https://wa.me/${whatsapp}` : '', !!whatsapp);
            setLink('svcModalFacebook', facebook, !!facebook);
            const callEl = document.getElementById('svcModalCall');
            callEl.href = `tel:${phoneRaw}`;
            callEl.dataset.serviceName = `Service: ${title}`;
            ['svcModalFavBottom'].forEach(fid => {
                const btn = document.getElementById(fid);
                if (!btn) return;
                btn.setAttribute('data-fav-id', serviceId);
                const icon = btn.querySelector('svg');
                if (isFav) { btn.classList.add('is-favorite'); if (icon) icon.classList.add('fill-rose-500', 'text-rose-500'); }
                else { btn.classList.remove('is-favorite'); if (icon) icon.classList.remove('fill-rose-500', 'text-rose-500'); }
            });
            const m = document.getElementById('serviceDetailModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closeServiceDetailModal = () => {
            const m = document.getElementById('serviceDetailModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
            activeServiceId = null;
        };
        document.getElementById('serviceDetailModal')?.addEventListener('click', (e) => { if (e.target.id === 'serviceDetailModal') closeServiceDetailModal(); });

        window.openPromotionDetail = (promoId) => {
            if (isForcedProfileMode) return;
            if (!currentUser) { showAuthScreen(); switchAuthTab('login'); return; }
            const promo = (promotionsCache || []).find(p => p.id === promoId)
                || (typeof getActivePromotions === 'function' ? getActivePromotions().find(p => p.id === promoId) : null);
            if (!promo) return;
            const tInfo = (typeof PROMO_TYPES !== 'undefined' && PROMO_TYPES[promo.type]) ? PROMO_TYPES[promo.type] : { label: promo.type || 'AD', icon: 'megaphone', color: '#94a3b8' };
            const loc = [promo.upazila, promo.district].filter(Boolean).join(', ') || promo.location || '—';
            const img = /^(https?:|blob:)/i.test(promo.image || '') ? promo.image : '';
            const desc = promo.shortDescription || promo.description || promo.details || (currentLang === 'en' ? 'No details provided.' : 'বিস্তারিত দেওয়া হয়নি।');
            document.getElementById('promoModalTitle').textContent = promo.title || (currentLang === 'en' ? 'Promotion' : 'বিজ্ঞাপন');
            document.getElementById('promoModalAdvertiser').textContent = promo.userName || (currentLang === 'en' ? 'Unknown' : 'অজানা');
            document.getElementById('promoModalLocation').textContent = loc;
            document.getElementById('promoModalDescription').textContent = desc;
            const typeTag = document.getElementById('promoModalTypeTag');
            if (typeTag) {
                typeTag.style.background = tInfo.color || '#94a3b8';
                typeTag.innerHTML = `<i data-lucide="${tInfo.icon || 'sparkles'}" class="w-3 h-3"></i> ${esc(tInfo.label || '')}`;
            }
            const imgEl = document.getElementById('promoModalImage');
            const fb = document.getElementById('promoModalImageFallback');
            if (img) { imgEl.src = img; imgEl.classList.remove('hidden'); fb.classList.add('hidden'); fb.classList.remove('flex'); }
            else { imgEl.removeAttribute('src'); imgEl.classList.add('hidden'); fb.classList.remove('hidden'); fb.classList.add('flex'); }
            const promoVidBox = document.getElementById('promoModalVideo');
            if (promoVidBox) {
                const pvHtml = aeVideoThumbHTML(promo.videoUrl, promo.title || '');
                promoVidBox.innerHTML = pvHtml;
                promoVidBox.classList.toggle('hidden', !pvHtml);
                if (pvHtml) { imgEl.classList.add('hidden'); fb.classList.add('hidden'); fb.classList.remove('flex'); }
            }

            // Extra type fields (read-only)
            const extraBox = document.getElementById('promoModalExtra');
            const extraDefs = (typeof PROMO_EXTRA_FIELDS !== 'undefined' && PROMO_EXTRA_FIELDS[promo.type]) ? PROMO_EXTRA_FIELDS[promo.type] : [];
            const extraData = promo.extra || promo;
            let extraHtml = '';
            extraDefs.forEach(f => {
                const val = extraData[f.k];
                if (val == null || String(val).trim() === '') return;
                extraHtml += `<div class="flex items-start gap-2 bg-[#07140e] p-2.5 rounded-xl border border-amber-900/30 text-sm"><span class="text-[10px] font-bold text-amber-300/90 shrink-0 min-w-[7rem]">${esc(f.l)}</span><span class="text-slate-200 break-all">${esc(String(val))}</span></div>`;
            });
            if (extraHtml) { extraBox.innerHTML = extraHtml; extraBox.classList.remove('hidden'); }
            else { extraBox.innerHTML = ''; extraBox.classList.add('hidden'); }

            // CTAs only — same options as card (no share / no save)
            const actions = document.getElementById('promoModalActions');
            const cta = promo.cta || {};
            const primary = typeof getPromoPrimaryCTA === 'function' ? getPromoPrimaryCTA(promo) : null;
            const order = ['call', 'website', 'whatsapp', 'facebook', 'youtube', 'tiktok', 'instagram', 'telegram', 'custom'];
            const parts = [];
            order.forEach(k => {
                const has = k === 'custom' ? !!(cta.custom && cta.custom.label && promoCtaHref('custom', cta.custom)) : !!(cta[k] && promoCtaHref(k, cta[k]));
                if (!has) return;
                const href = promoCtaHref(k, k === 'custom' ? cta.custom : cta[k]);
                const label = k === 'custom' ? (cta.custom.label || 'Link') : (PROMO_CTA_OPTIONS[k]?.btn || k);
                const icon = PROMO_CTA_OPTIONS[k]?.icon || 'link';
                const isPrimary = primary && primary.key === k;
                if (isPrimary) {
                    parts.push(`<a href="${esc(href)}" ${href.startsWith('tel:') ? '' : 'target="_blank" rel="noopener noreferrer"'} class="promo-cta-main flex-1 min-w-[9rem] h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2"><i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i><span class="truncate">${esc(label)}</span></a>`);
                } else {
                    parts.push(`<a href="${esc(href)}" ${href.startsWith('tel:') ? '' : 'target="_blank" rel="noopener noreferrer"'} class="promo-cta-small w-11 h-11 shrink-0 rounded-xl flex items-center justify-center" title="${esc(label)}"><i data-lucide="${icon}" class="w-4 h-4"></i></a>`);
                }
            });
            if (!parts.length) {
                parts.push(`<p class="text-xs text-slate-400 w-full text-center py-1">${currentLang === 'en' ? 'No action buttons for this ad.' : 'এই বিজ্ঞাপনে কোনো অ্যাকশন বাটন নেই।'}</p>`);
            }
            actions.innerHTML = parts.join('');
            const m = document.getElementById('promotionDetailModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closePromotionDetailModal = () => {
            const m = document.getElementById('promotionDetailModal');
            if (!m) return;
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };
        document.getElementById('promotionDetailModal')?.addEventListener('click', (e) => { if (e.target.id === 'promotionDetailModal') closePromotionDetailModal(); });



        // ========== EMERGENCY ==========
        function renderEmergency() {
            if (isForcedProfileMode) return;
            const list = document.getElementById('emergencyList');
            if (!list) return;
            const search = getSearchValue();
            const filtered = search ? emergencyList.filter(i =>
                (i.title || '').toLowerCase().includes(search) ||
                (i.number || '').toLowerCase().includes(search) ||
                (i.desc || '').toLowerCase().includes(search) ||
                (i.category || '').toLowerCase().includes(search)
            ) : emergencyList;
            if (filtered.length === 0) {
                list.innerHTML = `<div class="col-span-full text-center py-10 bg-[#10281c] rounded-2xl border border-dashed border-emerald-900/50 p-6 space-y-2">
                    <div class="w-16 h-16 bg-rose-950/60 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-800/60"><i data-lucide="phone-off" class="w-7 h-7"></i></div>
                    <h3 class="text-sm font-bold text-slate-200">কোনো হটলাইন নেই</h3>
                    <p class="text-xs text-slate-400">অ্যাডমিন নম্বর যোগ করলে এখানে দেখা যাবে।</p>
                </div>`;
                refreshIcons(); return;
            }
            const grouped = {};
            filtered.forEach(i => { const c = i.category || 'অন্যান্য'; if (!grouped[c]) grouped[c] = []; grouped[c].push(i); });
            let html = '', idx = 1;
            for (const [catName, items] of Object.entries(grouped)) {
                html += `<div class="col-span-full mt-2 first:mt-0">
                    <div class="flex items-center gap-2 mb-2 pb-2 border-b border-emerald-900/40">
                        <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">${idx++}</span>
                        <h3 class="font-bold text-slate-100 text-sm">${esc(catName)}</h3>
                        <span class="text-[10px] text-slate-500">(${items.length}টি)</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">`;
                items.forEach(item => {
                    const c = /^bg-[a-z]+-\d{2,3}$/.test(String(item.color || '')) ? item.color : 'bg-rose-600';
                    html += `<div class="bg-[#10281c] p-3.5 rounded-2xl border border-emerald-900/40 emergency-card-hover hover:border-emerald-600/50 flex items-center justify-between gap-2.5">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <div class="w-11 h-11 ${c} text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-black/30"><i data-lucide="phone" class="w-5 h-5"></i></div>
                            <div class="min-w-0">
                                <h4 class="font-bold text-slate-200 text-xs sm:text-sm truncate">${esc(item.title || '')}</h4>
                                <p class="text-[10px] text-slate-400 line-clamp-2">${esc(item.desc || '')}</p>
                            </div>
                        </div>
                        <a href="${currentUser ? `tel:${esc(String(item.number || '').replace(/[^0-9+]/g, ''))}` : '#guest-login'}" data-service-name="Emergency: ${esc(item.title || '')}" onclick="if (!currentUser) { showAuthScreen(); switchAuthTab('login'); return false; }" class="call-action w-11 h-11 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shrink-0 border-2 border-green-300/40 touch-target shadow-lg shadow-green-600/30"><i data-lucide="phone" class="w-4 h-4"></i></a>
                    </div>`;
                });
                html += `</div></div>`;
            }
            list.innerHTML = html;
            refreshIcons();
        }

        // ========== USER EMERGENCY REQUEST ==========
        window.openUserEmergencyRequestModal = () => {
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            document.getElementById('userEmergencyForm').reset();
            if (userProfile && userProfile.phone) {
                document.getElementById('reqUserPhone').value = userProfile.phone;
            }
            const m = document.getElementById('userEmergencyRequestModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };

        window.closeUserEmergencyRequestModal = () => {
            const m = document.getElementById('userEmergencyRequestModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };

        // ========== DUPLICATE NUMBER PREVENTION (per section: blood / emergency) ==========
        // Same number cannot be added twice inside the SAME section; the same number may exist in the other section.
        function normalizeNumber(raw) {
            let s = String(raw || '');
            const bnDigits = '০১২৩৪৫৬৭৮৯';
            s = s.replace(/[০-৯]/g, d => String(bnDigits.indexOf(d)));
            s = s.replace(/[^0-9]/g, '');
            if (/^8801\d{9}$/.test(s)) s = '0' + s.slice(3);
            else if (/^1[3-9]\d{8}$/.test(s)) s = '0' + s;
            return s;
        }
        function dupMessage(section) {
            return section === 'blood'
                ? 'এই নাম্বারটি আগে থেকেই রক্ত সেকশনে আছে। একই নাম্বার দ্বিতীয়বার যোগ করা যাবে না।'
                : 'এই নাম্বারটি আগে থেকেই জরুরি সেকশনে আছে। একই নাম্বার দ্বিতীয়বার যোগ করা যাবে না।';
        }
        async function checkDuplicateNumber(section, norm, ownSnap) {
            if (!norm) return false;
            const field = section === 'blood' ? 'phone' : 'number';
            const live = section === 'blood' ? bloodDonors : emergencyList;
            if (live.some(x => normalizeNumber(x[field]) === norm)) return true;
            if (ownSnap && ownSnap.docs.some(d => { const x = d.data(); return x.status !== 'rejected' && normalizeNumber(x[field]) === norm; })) return true;
            try {
                const k = await getDoc(doc(db, 'uniqueNumbers', `${section}_${norm}`));
                if (k.exists()) return true;
            } catch (e) { /* rules not configured yet: the checks above still apply */ }
            return false;
        }
        async function addRequestWithUniqueKey(section, collName, data, norm) {
            const keyRef = doc(db, 'uniqueNumbers', `${section}_${norm}`);
            const reqRef = doc(collection(db, collName));
            try {
                const b = writeBatch(db);
                b.set(reqRef, data);
                b.set(keyRef, { section, number: norm, requestId: reqRef.id, uid: currentUser.uid, createdAt: serverTimestamp() });
                await b.commit();
            } catch (err) {
                if (err && err.code === 'permission-denied') {
                    let exists = false;
                    try { exists = (await getDoc(keyRef)).exists(); } catch (e) {}
                    if (exists) { const e2 = new Error('duplicate-number'); e2.code = 'duplicate-number'; throw e2; }
                    await addDoc(collection(db, collName), data); // uniqueNumbers rules not published yet
                    return;
                }
                throw err;
            }
        }

        window.handleUserEmergencySubmit = async (e) => {
            e.preventDefault();
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const title = document.getElementById('reqTitle').value.trim();
            const emergencyPhone = document.getElementById('reqEmergencyPhone').value.trim();
            const category = document.getElementById('reqCategory').value.trim();
            const description = document.getElementById('reqDescription').value.trim();
            const userPhone = document.getElementById('reqUserPhone').value.trim();
            if (!/^01[3-9]\d{8}$/.test(userPhone)) return showToast('আপনার সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন', 'circle-x', 'text-rose-400');
            const btn = document.getElementById('userEmergencySubmitBtn');
            btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> যাচাই করা হচ্ছে...'; refreshIcons();
            try {
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                const q = query(collection(db, 'emergencyRequests'), where('submitterUid', '==', currentUser.uid));
                const snap = await getDocs(q);
                const normNumber = normalizeNumber(emergencyPhone);
                if (await checkDuplicateNumber('emergency', normNumber, snap)) {
                    btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> অনুরোধ পাঠান'; refreshIcons();
                    return showToast(dupMessage('emergency'), 'alert-circle', 'text-rose-400');
                }
                let todayCount = 0;
                snap.forEach(doc => {
                    const data = doc.data();
                    if (data.createdAt) {
                        const createdAtDate = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt.seconds * 1000);
                        if (createdAtDate >= startOfDay) todayCount++;
                    }
                });
                if (todayCount >= 2) {
                    btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> অনুরোধ পাঠান'; refreshIcons();
                    return showToast('আপনি আজ ইতিমধ্যে ২টি অনুরোধ পাঠিয়েছেন। আগামীকাল আবার চেষ্টা করুন।', 'alert-circle', 'text-rose-400');
                }
                btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> পাঠানো হচ্ছে...'; refreshIcons();
                await addRequestWithUniqueKey('emergency', 'emergencyRequests', {
                    title, number: emergencyPhone, category, desc: description,
                    submitterPhone: userPhone, submitterName: userProfile?.fullName || '',
                    submitterUid: currentUser.uid, status: 'pending', createdAt: serverTimestamp()
                }, normNumber);
                showToast('অনুরোধ পাঠানো হয়েছে! অ্যাডমিন যাচাই করে যোগ করবেন।', 'check-circle', 'text-emerald-400');
                closeUserEmergencyRequestModal();
            } catch (err) {
                showToast(err && err.code === 'duplicate-number' ? dupMessage('emergency') : 'পাঠাতে ব্যর্থ: ' + (err.code || err.message), 'circle-x', 'text-rose-400');
            } finally {
                btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> অনুরোধ পাঠান'; refreshIcons();
            }
        };

        // ========== USER BLOOD DONOR REQUEST ==========
        window.openUserBloodRequestModal = () => {
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            document.getElementById('userBloodForm').reset();
            if (userProfile && userProfile.fullName) {
                document.getElementById('bldReqName').value = userProfile.fullName;
            }
            if (userProfile && userProfile.phone) {
                document.getElementById('bldReqPhone').value = userProfile.phone;
            }
            // Prefill district/upazila from profile after loc pickers remount values
            setTimeout(() => {
                try {
                    if (userProfile?.district) {
                        const d = document.getElementById('bldReqDistrict');
                        if (d) d.value = userProfile.district;
                    }
                    if (userProfile?.upazila) {
                        const u = document.getElementById('bldReqUpazila');
                        if (u) u.value = userProfile.upazila;
                    }
                } catch (e) {}
            }, 30);
            const m = document.getElementById('userBloodRequestModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };

        window.closeUserBloodRequestModal = () => {
            const m = document.getElementById('userBloodRequestModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };

        window.handleUserBloodSubmit = async (e) => {
            e.preventDefault();
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const name = document.getElementById('bldReqName').value.trim();
            const group = document.getElementById('bldReqGroup').value;
            const phone = document.getElementById('bldReqPhone').value.trim();
            const district = (document.getElementById('bldReqDistrict')?.value || '').trim();
            const upazila = (document.getElementById('bldReqUpazila')?.value || '').trim();
            const address = (document.getElementById('bldReqAddress')?.value || '').trim();
            const location = [address, upazila, district].filter(Boolean).join(', ');
            if (name.length < 2) return showToast('সঠিক নাম দিন', 'circle-x', 'text-rose-400');
            if (!group) return showToast('রক্তের গ্রুপ নির্বাচন করুন', 'circle-x', 'text-rose-400');
            if (!/^01[3-9]\d{8}$/.test(phone)) return showToast('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন', 'circle-x', 'text-rose-400');
            if (!district) return showToast('জেলা নির্বাচন করুন', 'circle-x', 'text-rose-400');
            if (!upazila) return showToast('উপজেলা নির্বাচন করুন', 'circle-x', 'text-rose-400');
            const btn = document.getElementById('userBloodSubmitBtn');
            btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> যাচাই করা হচ্ছে...'; refreshIcons();
            try {
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                const q = query(collection(db, 'bloodDonorRequests'), where('submitterUid', '==', currentUser.uid));
                const snap = await getDocs(q);
                const normNumber = normalizeNumber(phone);
                if (await checkDuplicateNumber('blood', normNumber, snap)) {
                    btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> অনুরোধ পাঠান'; refreshIcons();
                    return showToast(dupMessage('blood'), 'alert-circle', 'text-rose-400');
                }
                let todayCount = 0;
                snap.forEach(doc => {
                    const data = doc.data();
                    if (data.createdAt) {
                        const createdAtDate = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt.seconds * 1000);
                        if (createdAtDate >= startOfDay) todayCount++;
                    }
                });
                if (todayCount >= 2) {
                    btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> অনুরোধ পাঠান'; refreshIcons();
                    return showToast('আপনি আজ ইতিমধ্যে ২টি অনুরোধ পাঠিয়েছেন। আগামীকাল আবার চেষ্টা করুন।', 'alert-circle', 'text-rose-400');
                }
                btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> পাঠানো হচ্ছে...'; refreshIcons();
                await addRequestWithUniqueKey('blood', 'bloodDonorRequests', {
                    name, group, phone, location, district, upazila, address: address || '',
                    submitterUid: currentUser.uid, submitterName: userProfile?.fullName || '',
                    submitterPhone: userProfile?.phone || '', submitterEmail: userProfile?.email || '',
                    status: 'pending', createdAt: serverTimestamp()
                }, normNumber);
                showToast('অনুরোধ পাঠানো হয়েছে! অ্যাডমিন যাচাই করে রক্তদাতা তালিকায় যোগ করবেন।', 'check-circle', 'text-emerald-400');
                closeUserBloodRequestModal();
            } catch (err) {
                showToast(err && err.code === 'duplicate-number' ? dupMessage('blood') : 'পাঠাতে ব্যর্থ: ' + (err.code || err.message), 'circle-x', 'text-rose-400');
            } finally {
                btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> অনুরোধ পাঠান'; refreshIcons();
            }
        };

        // ========== BLOOD ==========
        let bloodDistrictFilterOn = false;

        function getUserBloodDistrict() {
            return (userProfile && userProfile.district) ? String(userProfile.district).trim() : '';
        }

        function donorMatchesDistrict(d, district) {
            if (!district) return true;
            const dn = district.toLowerCase();
            if (d.district && String(d.district).toLowerCase() === dn) return true;
            // Fallback for older records that only have free-text location
            const loc = String(d.location || '').toLowerCase();
            return loc.includes(dn);
        }

        function updateBloodDistrictToggleUI() {
            const btn = document.getElementById('bloodDistrictToggleBtn');
            const knob = document.getElementById('bloodDistrictToggleKnob');
            const label = document.getElementById('bloodDistrictToggleLabel');
            if (!btn || !knob || !label) return;
            const district = getUserBloodDistrict();
            const on = bloodDistrictFilterOn && !!currentUser && !!district;
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            if (on) {
                btn.className = 'group relative inline-flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-emerald-600/25 border border-emerald-400/60 shadow-md shadow-emerald-600/20 transition-all duration-300 touch-target active:scale-95';
                knob.className = 'relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/40 transition-all duration-300 ring-2 ring-emerald-300/50';
                label.className = 'text-[10px] font-bold text-emerald-300 max-w-[5.5rem] truncate leading-tight';
            } else {
                btn.className = 'group relative inline-flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-700/70 border border-slate-500/50 shadow-inner transition-all duration-300 touch-target active:scale-95';
                knob.className = 'relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-md transition-all duration-300';
                label.className = 'text-[10px] font-semibold text-slate-300 max-w-[5.5rem] truncate leading-tight';
            }
            if (!currentUser) {
                label.textContent = 'লগইন';
            } else if (!district) {
                label.textContent = 'জেলা নেই';
                label.className = 'text-[10px] font-semibold text-amber-400 max-w-[5.5rem] truncate leading-tight';
            } else {
                label.textContent = district;
            }
            if (typeof refreshIcons === 'function') refreshIcons();
        }

        window.toggleBloodDistrictFilter = () => {
            if (!currentUser) {
                showAuthScreen();
                switchAuthTab('login');
                return;
            }
            const district = getUserBloodDistrict();
            if (!district) {
                showToast('প্রোফাইলে জেলা যোগ করুন', 'map-pin', 'text-amber-400');
                return;
            }
            bloodDistrictFilterOn = !bloodDistrictFilterOn;
            updateBloodDistrictToggleUI();
            filterBloodDonors();
        };

        window.resetBloodDistrictFilter = () => {
            if (!bloodDistrictFilterOn) return;
            bloodDistrictFilterOn = false;
            updateBloodDistrictToggleUI();
        };

        window.filterBloodDonors = () => {
            if (isForcedProfileMode) return;
            const grid = document.getElementById('bloodDonorsGrid');
            if (!grid) return;
            updateBloodDistrictToggleUI();
            const group = document.getElementById('bloodGroupFilter').value;
            const search = getSearchValue();
            let filtered = group === 'all' ? bloodDonors.slice() : bloodDonors.filter(d => d.group === group);
            if (bloodDistrictFilterOn && currentUser) {
                const district = getUserBloodDistrict();
                if (district) filtered = filtered.filter(d => donorMatchesDistrict(d, district));
            }
            if (search) filtered = filtered.filter(d =>
                (d.name || '').toLowerCase().includes(search) ||
                (d.location || '').toLowerCase().includes(search) ||
                (d.district || '').toLowerCase().includes(search) ||
                (d.upazila || '').toLowerCase().includes(search) ||
                (d.group || '').toLowerCase().includes(search)
            );
            if (filtered.length === 0) {
                const emptyMsg = bloodDistrictFilterOn
                    ? 'আপনার জেলায় কোনো রক্তদাতা পাওয়া যায়নি।'
                    : 'কোনো রক্তদাতা নিবন্ধিত নেই।';
                grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-xs"><i data-lucide="droplet" class="w-8 h-8 text-rose-400 mb-2 mx-auto"></i>${emptyMsg}</div>`;
                refreshIcons(); return;
            }
            grid.innerHTML = filtered.map(d => {
                const locLine = [d.upazila, d.district].filter(Boolean).join(', ') || d.location || '';
                const extra = d.address ? ` · ${d.address}` : '';
                return `<div class="bg-[#07140e] p-3.5 rounded-2xl border border-emerald-900/40 flex items-center justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-10 h-10 bg-gradient-to-br from-rose-600 to-red-600 text-white font-black text-sm rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-rose-600/30">${esc(d.group || '?')}</div>
                    <div class="min-w-0"><h4 data-user-content="true" class="font-bold text-slate-200 text-xs truncate">${esc(d.name || '')}</h4><p data-user-content="true" class="text-[10px] text-slate-400 truncate">${esc(locLine + extra)}</p></div>
                </div>
                <a href="${currentUser ? `tel:${esc(String(d.phone || '').replace(/[^0-9+]/g, ''))}` : '#guest-login'}" data-service-name="Blood Donor: ${esc(d.name || '')} (${esc(d.group || '')})" onclick="if (!currentUser) { showAuthScreen(); switchAuthTab('login'); return false; }" class="call-action bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold px-3 py-2 rounded-xl touch-target flex items-center gap-1 shadow-lg shadow-green-600/30"><i data-lucide="phone" class="w-3 h-3"></i> কল</a>
            </div>`;
            }).join('');
            refreshIcons();
        };

        // ========== CHAT RENDERING WITH OFFLINE/PENDING STATES ==========
        function renderChatMessages(opts) {
            if (isForcedProfileMode) return;
            const box = document.getElementById('chatMessages');
            if (!box) return;
            const prevTop = box.scrollTop;
            if (chatMessages.length === 0) {
                box.innerHTML = `<div class="flex flex-col items-center justify-center py-10 text-center px-4">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600/30 to-emerald-600/20 border border-emerald-500/40 flex items-center justify-center mb-3"><i data-lucide="messages-square" class="w-8 h-8 text-emerald-400"></i></div>
                    <h4 class="text-sm font-bold text-slate-200 mb-1">স্বাগতম!</h4>
                    <p class="text-xs text-slate-400 max-w-xs mb-4">এখনো কোনো মেসেজ নেই।</p>
                </div>`;
                refreshIcons(); return;
            }
            box.innerHTML = chatMessages.map(msg => {
                if (msg.sender === 'system') {
                    return `<div class="flex justify-center my-2 px-6">
                        <span class="mesesu-system-watermark text-[11px] text-slate-400 text-center leading-relaxed select-none">${esc(msg.text)}</span>
                    </div>`;
                }
                if (msg.sender === 'user') {
                    const pending = msg.pending === true;
                    const wasOffline = msg.offlineSent === true;
                    return `<div class="flex gap-2 max-w-[85%] ml-auto justify-end">
                        <div class="bg-gradient-to-br from-emerald-600 to-emerald-600 text-white px-3 py-1.5 rounded-2xl rounded-tr-none shadow-lg shadow-emerald-600/30 ${pending ? 'opacity-70' : ''}">
                            <p data-user-content="true" class="text-sm leading-snug">${esc(msg.text)}</p>
                            <div class="flex items-center justify-end gap-1 mt-0.5">
                                ${pending
                                    ? `<span class="text-[9px] text-amber-200 flex items-center gap-0.5"><i data-lucide="clock" class="w-2.5 h-2.5"></i>${wasOffline ? 'অফলাইন — net এলে যাবে' : 'পাঠানো হচ্ছে...'}</span>`
                                    : `<span class="text-[9px] text-emerald-200 flex items-center gap-0.5">${mesesuTickHtml(msg)}${esc(msg.time || '')}</span>`
                                }
                            </div>
                        </div>
                    </div>`;
                }
                let sideAvatar;
                if (msg.isDm === true) {
                    const ph = (typeof mesesuPeer !== 'undefined' && mesesuPeer && mesesuPeer.photoURL) ? mesesuPeer.photoURL : '';
                    sideAvatar = `<div class="w-7 h-7 rounded-full overflow-hidden bg-emerald-800/80 text-emerald-200 flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">${ph ? `<img src="${esc(ph)}" alt="" class="w-full h-full object-cover" loading="lazy">` : `<i data-lucide="user" class="w-3.5 h-3.5"></i>`}</div>`;
                } else {
                    sideAvatar = `<div class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30"><i data-lucide="headset" class="w-3.5 h-3.5"></i></div>`;
                }
                return `<div class="flex gap-2 max-w-[85%]">
                    ${sideAvatar}
                    <div class="bg-[#10281c] text-slate-100 px-3 py-1.5 rounded-2xl rounded-tl-none border border-emerald-900/60">
                        <p data-user-content="true" class="text-sm leading-snug">${esc(msg.text)}</p>
                        <span data-user-content="true" class="text-[9px] text-slate-500 mt-0.5 block">${esc(msg.time || '')}</span>
                    </div>
                </div>`;
            }).join('');
            box.scrollTop = (opts && opts.keepScroll) ? prevTop : box.scrollHeight;
            refreshIcons();
            // Refresh admin last-message preview on Mesesu inbox list
            try {
                if (typeof mesesuMode !== 'undefined' && mesesuMode === 'inbox' && typeof mesesuRenderThreads === 'function') {
                    mesesuRenderThreads(typeof mesesuApprovedThreads !== 'undefined' ? mesesuApprovedThreads : []);
                }
            } catch (e) {}
        }
        // ========== MESESU (community messenger inbox) ==========
        const DM_PERMISSION_TEXT = 'আমাকে কি আপনার সাথে মেসেজ করার অনুমতি দিবেন?';
        let mesesuMode = 'inbox'; // inbox | admin | dm
        let mesesuPeer = null; // { id, fullName, photoURL, isPremium }
        let mesesuDmPermission = 'none'; // none | pending | approved | rejected
        let mesesuPermissionRequester = null;
        let mesesuPermissionRejectedBy = null; // রিজেক্ট করেছে এমন ব্যক্তির uid
        let mesesuPermissionRejectedAt = 0; // রিজেক্টের সময় (ms)
        let unsubscribeDm = null;
        let unsubscribeDmThread = null; // থ্রেড ডকুমেন্টের লাইভ লিস্টেনার (permission স্টেট)
        let unsubscribeInbox = null;
        let mesesuInboxCache = [];
        let mesesuUsersCache = [];
        // মেসেজ রিকুয়েস্ট / রিজেক্টেড মেসেজ লিস্ট (থ্রি-ডট মেনু)
        let mesesuApprovedThreads = []; // মূল চ্যাট লিস্টে যা দেখা যাবে (approved + আমার পাঠানো pending)
        let mesesuRequestsCache = []; // আমার কাছে আসা pending রিকুয়েস্ট (আমি requester নই)
        let mesesuSubView = null; // null | 'requests' | 'rejected' — কোন সাব-ভিউ খোলা আছে
        const mesesuVerifiedInbox = new Set(); // সার্ভার থেকে যাচাই করা pending ইনবক্স ডকুমেন্ট
        let mesesuRejectedCache = []; // আমি যাদের রিজেক্ট করেছি, ৫ দিনের মধ্যে
        // ===== Mesesu v2 স্টেট: আনরিড ব্যাজ, টিক, প্রেজেন্স =====
        let mesesuUnsubPeerDoc = null;     // খোলা DM-এর পিয়ারের users ডক লাইভ লিস্টেনার
        let mesesuPeerLive = null;         // পিয়ারের সর্বশেষ users ডেটা
        let mesesuThreadReadMap = {};      // dmThreads/{tid}.readAt -> { uid: ms }
        let mesesuBadgeSeenMs = 0;         // হেডার ব্যাজ "দেখা হয়েছে" ওয়াটারমার্ক (সার্ভার-টাইম ms)
        let mesesuBadgeSavedMs = 0;
        let mesesuBadgeSaveTimer = null;
        let mesesuInboxUid = null;
        let mesesuAdminLastSeenMs = 0;
        let mesesuReadInFlight = false;
        let mesesuReadLastTry = 0;
        let mesesuReadRetry = null;
        let mesesuRenderTimer = null;
        const mesesuPeerWatch = new Map(); // peerUid -> unsubscribe
        const mesesuPeerData = {};         // peerUid -> users ডক ডেটা (ইনবক্স স্ট্যাটাস ডটের জন্য)
        const MESESU_FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000; // চ্যাট মেসেজ + রিজেক্ট ব্লক মেয়াদ: ৫ দিন
        const MESESU_ADMIN_ONE_DAY_MS = 24 * 60 * 60 * 1000; // অ্যাডমিন চ্যাট মেসেজ মেয়াদ: ১ দিন
        function mesesuTsMillis(ts) {
            try { return ts?.toDate ? ts.toDate().getTime() : (ts ? new Date(ts).getTime() : 0); } catch (e) { return 0; }
        }
        function mesesuRejectDaysLeft() {
            if (!mesesuPermissionRejectedAt) return 5;
            const passed = Date.now() - mesesuPermissionRejectedAt;
            return Math.max(1, Math.ceil((MESESU_FIVE_DAYS_MS - passed) / MESESU_ADMIN_ONE_DAY_MS));
        }

        function mesesuFirstName(full) {
            const p = String(full || '').trim().split(/\s+/).filter(Boolean);
            return p[0] || 'ইউজার';
        }
        function mesesuHasBlue(u) {
            if (!u) return false;
            if (u.isPremium || u.verified || u.blueBadge) return true;
            try {
                const toMs = (v) => v?.toDate ? v.toDate().getTime() : (v ? new Date(v).getTime() : 0);
                // পুরনো ফিল্ড
                if ((toMs(u.premiumExpiresAt) || 0) > Date.now()) return true;
                // অ্যাপের আসল প্রিমিয়াম ফিল্ড: premiumExpiry (নিজের প্রোফাইলে isUserPremium এটা দিয়েই হয়, প্রিমিয়াম সিস্টেম লাইভ থাকলে)
                const live = (typeof isPremiumSystemLive === 'function') ? isPremiumSystemLive() : true;
                if (live && (toMs(u.premiumExpiry) || 0) > Date.now()) return true;
                return false;
            } catch (e) { return false; }
        }
        /** Realistic online: isOnline flag + lastSeen within 8 minutes */
        function mesesuIsReallyOnline(u) {
            if (!u || u.isOnline !== true) return false;
            try {
                const ls = u.lastSeen?.toDate ? u.lastSeen.toDate() : (u.lastSeen ? new Date(u.lastSeen) : null);
                if (!ls || Number.isNaN(ls.getTime())) return false;
                return (Date.now() - ls.getTime()) < 8 * 60 * 1000;
            } catch (e) { return false; }
        }
        function mesesuThreadId(a, b) {
            return [a, b].sort().join('_');
        }
        function mesesuAvatarHtml(photoURL, sizeClass) {
            if (photoURL) return `<img src="${esc(photoURL)}" alt="" class="${sizeClass} rounded-full object-cover">`;
            return `<div class="${sizeClass} rounded-full bg-emerald-800/80 flex items-center justify-center"><i data-lucide="user" class="w-1/2 h-1/2 text-emerald-200"></i></div>`;
        }
        // ================= Mesesu v2 হেল্পার =================
        /** ইনবক্স লিস্ট আর চ্যাট হেডার — দুই জায়গায় একই ব্লু টিক লজিক */
        function mesesuPeerBlue(peerId, u) {
            if (mesesuHasBlue(u)) return true;
            const row = (mesesuInboxCache || []).find(x => (x.peerId || x.id) === peerId);
            return !!(row && row.peerBlue);
        }
        /** আপডেট ৭: হেডারের "Active X ago" (ইংরেজি) */
        function mesesuActiveAgoText(u) {
            const ms = mesesuTsMillis(u && u.lastSeen);
            if (!ms) return 'Offline';
            const mins = Math.max(0, Math.floor((Date.now() - ms) / 60000));
            if (mins < 1) return 'Active just now';
            if (mins < 60) return `Active ${mins} minute${mins === 1 ? '' : 's'} ago`;
            const hrs = Math.floor(mins / 60);
            if (hrs < 24) return `Active ${hrs} hour${hrs === 1 ? '' : 's'} ago`;
            const days = Math.floor(hrs / 24);
            return `Active ${days} day${days === 1 ? '' : 's'} ago`;
        }
        /** আপডেট ৬: নিজের পাঠানো মেসেজের স্ট্যাটাস — 'sent' | 'delivered' | 'seen' */
        function mesesuOwnMsgStatus(msg) {
            const t = msg.createdMs || mesesuTsMillis(msg.createdAt) || Date.now();
            if (msg.isDm === true && typeof mesesuPeer !== 'undefined' && mesesuPeer) {
                const readMs = mesesuThreadReadMap[mesesuPeer.id] || 0;
                if (readMs && readMs >= t) return 'seen';
                const u = mesesuPeerLive;
                if (u) {
                    if (mesesuIsReallyOnline(u)) return 'delivered';
                    const ls = mesesuTsMillis(u.lastSeen);
                    if (ls && ls >= t) return 'delivered'; // মেসেজের পরে প্রাপক অনলাইনে এসেছিল
                }
                return 'sent';
            }
            // অ্যাডমিন সাপোর্ট চ্যাট
            if (msg.seenByAdmin === true || msg.readByAdmin === true) return 'seen';
            if (isAdminOnline || (mesesuAdminLastSeenMs && mesesuAdminLastSeenMs >= t)) return 'delivered';
            return 'sent';
        }
        function mesesuTickHtml(msg) {
            const st = mesesuOwnMsgStatus(msg);
            if (st === 'sent') return '<i data-lucide="check" class="w-2.5 h-2.5"></i>';
            if (st === 'seen') return '<i data-lucide="check-check" class="w-3 h-3" stroke-width="3" style="color:#7dd3fc"></i>';
            return '<i data-lucide="check-check" class="w-2.5 h-2.5"></i>';
        }
        function mesesuRowBadge(n) {
            n = Number(n) || 0;
            if (n < 1) return '';
            return `<span class="mesesu-unread-badge">${n > 9 ? '9+' : n}</span>`;
        }
        function mesesuAdminUnreadCount() {
            try {
                const localRead = getLocallyReadMessageIds();
                return (adminChatMessages || []).filter(m => m.sender === 'admin' && !m.isDm && m.readByUser !== true && !localRead.has(m.id)).length;
            } catch (e) { return 0; }
        }
        // ---------- আপডেট ১: হেডার ব্যাজ (চ্যাট গণনা) ----------
        function mesesuBadgeRows() {
            return (mesesuApprovedThreads || []).filter(t => !t._pendingSent).concat(mesesuRequestsCache || []);
        }
        function mesesuBadgeChatCount() {
            if (!currentUser) return 0;
            const seen = mesesuBadgeSeenMs || 0;
            let n = 0;
            try {
                const localRead = getLocallyReadMessageIds();
                const au = (adminChatMessages || []).filter(m => m.sender === 'admin' && !m.isDm && m.readByUser !== true && !localRead.has(m.id));
                if (au.length) {
                    const lastMs = Math.max.apply(null, au.map(m => mesesuTsMillis(m.createdAt) || Date.now()));
                    if (lastMs > seen) n++;
                }
            } catch (e) {}
            mesesuBadgeRows().forEach(t => {
                if ((Number(t.unreadCount) || 0) > 0 && mesesuTsMillis(t.lastAt) > seen) n++;
            });
            return n;
        }
        /** Mesesu-তে ঢুকলে/থাকলে: এ পর্যন্ত জানা সব অ্যাক্টিভিটি "দেখা হয়েছে" ধরে ওয়াটারমার্ক এগিয়ে দেয় (সার্ভার-টাইম ভিত্তিক, ক্লক-স্কিউ নেই) */
        function mesesuAckBadge() {
            if (!currentUser) return;
            let mx = mesesuBadgeSeenMs || 0;
            try {
                (mesesuInboxCache || []).forEach(t => { const v = mesesuTsMillis(t.lastAt); if (v > mx) mx = v; });
                (adminChatMessages || []).forEach(m => { const v = mesesuTsMillis(m.createdAt); if (v > mx) mx = v; });
            } catch (e) {}
            if (mx <= (mesesuBadgeSeenMs || 0)) return;
            mesesuBadgeSeenMs = mx;
            lsSet('amar-mesesu-badgeseen-' + currentUser.uid, String(mx));
            if (!firebaseReady) return;
            clearTimeout(mesesuBadgeSaveTimer);
            mesesuBadgeSaveTimer = setTimeout(() => {
                if (!currentUser || mesesuBadgeSavedMs >= mesesuBadgeSeenMs) return;
                mesesuBadgeSavedMs = mesesuBadgeSeenMs;
                setDoc(doc(db, 'users', currentUser.uid), { mesesuBadgeSeenAt: mesesuBadgeSeenMs }, { merge: true })
                    .catch(e => console.warn('badge seen save', e?.code || e?.message));
            }, 1200);
        }
        // ---------- খোলা DM-এর পিয়ার লাইভ (আপডেট ৩, ৬, ৭) ----------
        function mesesuRenderPeerHeader() {
            if (mesesuMode !== 'dm' || !mesesuPeer) return;
            const u = mesesuPeerLive || {};
            const online = mesesuIsReallyOnline(u);
            const tick = document.getElementById('threadBlueTick');
            if (tick) tick.classList.toggle('hidden', !mesesuPeerBlue(mesesuPeer.id, u));
            const dot = document.getElementById('adminStatusDot');
            if (dot) {
                dot.classList.remove('hidden');
                dot.className = online
                    ? 'w-3 h-3 bg-emerald-500 border-2 border-[#10281c] rounded-full absolute -bottom-0.5 -right-0.5 z-10 animate-pulse'
                    : 'w-3 h-3 bg-slate-500 border-2 border-[#10281c] rounded-full absolute -bottom-0.5 -right-0.5 z-10';
            }
            const label = document.getElementById('adminStatusLabel');
            if (label) {
                label.textContent = online ? 'অনলাইন' : mesesuActiveAgoText(u);
                label.className = online ? 'text-[10px] text-emerald-500 font-medium' : 'text-[10px] text-slate-400 font-medium';
            }
        }
        function mesesuStopPeerWatch() {
            if (mesesuUnsubPeerDoc) { try { mesesuUnsubPeerDoc(); } catch (e) {} mesesuUnsubPeerDoc = null; }
        }
        function mesesuStartPeerWatch(peerId) {
            mesesuStopPeerWatch();
            if (!firebaseReady || !peerId) return;
            mesesuUnsubPeerDoc = onSnapshot(doc(db, 'users', peerId), snap => {
                if (mesesuMode !== 'dm' || !mesesuPeer || mesesuPeer.id !== peerId || !snap.exists()) return;
                mesesuPeerLive = { id: peerId, ...snap.data() };
                mesesuPeer.isPremium = mesesuPeerBlue(peerId, mesesuPeerLive);
                mesesuPeer.isOnline = mesesuIsReallyOnline(mesesuPeerLive);
                mesesuRenderPeerHeader();
                renderChatMessages({ keepScroll: true });
            }, err => console.warn('peer watch', err?.code || err?.message));
        }
        // ---------- আপডেট ২/৬: DM পড়া হয়েছে মার্ক ----------
        async function mesesuMarkDmRead() {
            try {
                if (!currentUser || !firebaseReady || mesesuMode !== 'dm' || !mesesuPeer) return;
                if (currentTab !== 'chat' || document.visibilityState === 'hidden') return;
                if (mesesuReadInFlight) return;
                if (Date.now() - mesesuReadLastTry < 1500) {
                    if (!mesesuReadRetry) mesesuReadRetry = setTimeout(() => { mesesuReadRetry = null; mesesuMarkDmRead(); }, 1600);
                    return;
                }
                const peerId = mesesuPeer.id, myUid = currentUser.uid;
                const tid = mesesuThreadId(myUid, peerId);
                const row = (mesesuInboxCache || []).find(x => (x.peerId || x.id) === peerId);
                const needInbox = !!row && (Number(row.unreadCount) || 0) > 0;
                let lastPeerMs = 0;
                (chatMessages || []).forEach(m => { if (m.isDm && m.sender === 'admin' && (m.createdMs || 0) > lastPeerMs) lastPeerMs = m.createdMs; });
                const needThread = mesesuDmPermission !== 'none' && lastPeerMs > (mesesuThreadReadMap[myUid] || 0);
                if (!needInbox && !needThread) return;
                mesesuReadInFlight = true; mesesuReadLastTry = Date.now();
                try {
                    if (needThread) await setDoc(doc(db, 'dmThreads', tid), { readAt: { [myUid]: serverTimestamp() } }, { merge: true });
                    if (needInbox) await setDoc(doc(db, 'users', myUid, 'inbox', peerId), { unreadCount: 0, lastReadAt: serverTimestamp() }, { merge: true });
                } finally { mesesuReadInFlight = false; }
            } catch (e) { console.warn('mark dm read', e?.code || e?.message); }
        }
        // ---------- আপডেট ৮: ইনবক্স রো-র স্ট্যাটাস ডটের জন্য পিয়ার ওয়াচার ----------
        function mesesuScheduleThreadsRender() {
            clearTimeout(mesesuRenderTimer);
            mesesuRenderTimer = setTimeout(() => {
                if (currentTab === 'chat' && mesesuMode === 'inbox' && !mesesuSubView) mesesuRenderThreads(mesesuApprovedThreads || []);
            }, 250);
        }
        function mesesuStopPeerWatchers() {
            mesesuPeerWatch.forEach(un => { try { un(); } catch (e) {} });
            mesesuPeerWatch.clear();
        }
        function mesesuSyncPeerWatchers() {
            if (!currentUser || !firebaseReady) return;
            const ids = [];
            (mesesuApprovedThreads || []).forEach(t => {
                const id = t.peerId || t.id;
                if (id && id !== currentUser.uid && !ids.includes(id)) ids.push(id);
            });
            const want = new Set(ids.slice(0, 40));
            mesesuPeerWatch.forEach((un, id) => {
                if (!want.has(id)) { try { un(); } catch (e) {} mesesuPeerWatch.delete(id); delete mesesuPeerData[id]; }
            });
            const sig = (x) => x ? [mesesuIsReallyOnline(x) ? 1 : 0, mesesuHasBlue(x) ? 1 : 0].join('|') : '';
            want.forEach(id => {
                if (mesesuPeerWatch.has(id)) return;
                const un = onSnapshot(doc(db, 'users', id), snap => {
                    if (!snap.exists()) return;
                    const prev = mesesuPeerData[id];
                    mesesuPeerData[id] = snap.data();
                    if (sig(prev) !== sig(mesesuPeerData[id])) mesesuScheduleThreadsRender();
                }, () => {});
                mesesuPeerWatch.set(id, un);
            });
        }
        // প্রতি ১ মিনিটে: "Active X ago", অনলাইন-মেয়াদ ও টিক রিফ্রেশ
        if (!window.__mesesuMinuteTick) {
            window.__mesesuMinuteTick = setInterval(() => {
                try {
                    if (!currentUser || currentTab !== 'chat') return;
                    if (mesesuMode === 'dm') { mesesuRenderPeerHeader(); renderChatMessages({ keepScroll: true }); }
                    else if (mesesuMode === 'inbox' && !mesesuSubView) mesesuRenderThreads(mesesuApprovedThreads || []);
                } catch (e) {}
            }, 60000);
        }
        // ================= Mesesu: ইউজার→ইউজার পুশ নোটিফিকেশন =================
        async function mesesuPushToPeer(peerId, kind, text) {
            try {
                if (!currentUser || !peerId || !APPS_SCRIPT_URL) return;
                let token = (mesesuPeerLive && mesesuPeerLive.id === peerId && mesesuPeerLive.fcmToken) || '';
                if (!token) {
                    const u = (mesesuUsersCache || []).find(x => x.id === peerId);
                    token = (u && u.fcmToken) || '';
                }
                if (!token) {
                    try { const snap = await getDoc(doc(db, 'users', peerId)); if (snap.exists()) token = snap.data().fcmToken || ''; } catch (e) {}
                }
                // টোকেন নেই = প্রাপক নোটিফিকেশন Allow করেননি; একই ডিভাইসে নিজেকেও পাঠানো হবে না
                if (!token || token === (userProfile && userProfile.fcmToken)) return;
                const myName = (userProfile && userProfile.fullName) || (currentUser.displayName) || 'ইউজার';
                let body;
                if (kind === 'request') body = 'আপনাকে মেসেজের অনুরোধ পাঠিয়েছেন';
                else {
                    const t = String(text || '').trim();
                    body = t.length > 100 ? t.slice(0, 100).trimEnd() + '...' : t;
                }
                const payload = {
                    title: myName,
                    body,
                    tokens: [token],
                    image: '',
                    clickAction: 'chat:' + currentUser.uid,
                    scheduleAt: null,
                    secret: PUSH_SECRET
                };
                fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload), keepalive: true }).catch(() => {});
            } catch (e) { console.warn('mesesu push', e); }
        }
        window.mesesuOpenFromPush = (uid) => {
            if (!uid) return;
            try { switchTab('chat'); setTimeout(() => { if (window.mesesuOpenUser) window.mesesuOpenUser(uid); }, 200); } catch (e) { console.warn(e); }
        };
        function mesesuShowInbox() {
            mesesuMode = 'inbox';
            mesesuPeer = null;
            if (unsubscribeDm) { try { unsubscribeDm(); } catch (e) {} unsubscribeDm = null; }
            if (unsubscribeDmThread) { try { unsubscribeDmThread(); } catch (e) {} unsubscribeDmThread = null; }
            mesesuStopPeerWatch(); mesesuPeerLive = null; mesesuThreadReadMap = {};
            document.getElementById('mesesuInbox')?.classList.remove('hidden');
            document.getElementById('mesesuThreadView')?.classList.add('hidden');
            const search = document.getElementById('mesesuSearchInput');
            if (search) search.value = '';
            document.getElementById('mesesuSearchResults')?.classList.add('hidden');
            mesesuApplySubViewVisibility(); // সাব-ভিউ (রিকুয়েস্ট/রিজেক্টেড) খোলা থাকলে মূল লিস্ট আর একসাথে দেখাবে না
            // ইনবক্স: থ্রেড মোড বন্ধ — নিচের নেভ দেখাবে
            document.body.classList.remove('chat-thread');
            document.body.classList.remove('chat-kb-open');
            document.documentElement.style.setProperty('--kb-offset', '0px');
            const bottomNav = document.getElementById('bottomNav');
            if (bottomNav && currentTab === 'chat') bottomNav.classList.remove('nav-hidden');
            // Always show Admin Support row immediately
            mesesuRenderThreads(mesesuApprovedThreads || []);
            if (currentUser && firebaseReady) {
                mesesuLoadPeopleRow();
                mesesuListenInbox();
                mesesuSyncPeerWatchers();
            } else {
                mesesuRenderPeopleRow([]);
            }
            refreshIcons();
        }
        window.mesesuShowInbox = mesesuShowInbox;
        window.mesesuBackToInbox = () => {
            mesesuShowInbox();
            updateUnreadBadge();
        };

        async function mesesuLoadPeopleRow() {
            if (!firebaseReady || !currentUser) return;
            try {
                const snap = await getDocs(query(collection(db, 'users'), limit(80)));
                let users = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(u => u.id !== currentUser.uid);
                mesesuUsersCache = users;
                const online = users.filter(u => mesesuIsReallyOnline(u));
                const offline = users.filter(u => !mesesuIsReallyOnline(u));
                const pick = (arr, n) => shuffleArray(arr.slice()).slice(0, n);
                // Prefer real online users first, fill rest with offline — no fake online
                let selected = pick(online, Math.min(6, online.length));
                if (selected.length < 10) selected = selected.concat(pick(offline, 10 - selected.length));
                selected = selected.slice(0, 10);
                mesesuRenderPeopleRow(selected);
            } catch (e) {
                console.warn('mesesu people', e);
                mesesuRenderPeopleRow([]);
            }
        }
        function mesesuRenderPeopleRow(list) {
            const row = document.getElementById('mesesuPeopleRow');
            if (!row) return;
            const meName = mesesuFirstName(userProfile?.fullName || currentUser?.displayName || 'আমি');
            const mePhoto = userProfile?.photoURL || '';
            const meOnline = !!(currentUser && navigator.onLine);
            let html = `<div class="mesesu-person ${meOnline ? 'online' : ''}" title="আপনার প্রোফাইল">
                <div class="mesesu-person-avatar"><div class="mesesu-person-avatar-inner">${mePhoto ? `<img src="${esc(mePhoto)}" alt="">` : `<i data-lucide="user" class="w-6 h-6 text-white"></i>`}</div>
                ${meOnline ? '<span class="mesesu-online-dot" title="অনলাইন"></span>' : ''}
                </div>
                <div class="mesesu-person-name font-semibold">${esc(meName)}</div>
            </div>`;
            (list || []).forEach(u => {
                const online = mesesuIsReallyOnline(u);
                html += `<div class="mesesu-person ${online ? 'online' : ''}" onclick="mesesuOpenUser('${esc(u.id)}')">
                    <div class="mesesu-person-avatar">
                      <div class="mesesu-person-avatar-inner">${u.photoURL ? `<img src="${esc(u.photoURL)}" alt="">` : `<i data-lucide="user" class="w-6 h-6 text-white"></i>`}</div>
                      ${online ? '<span class="mesesu-online-dot" title="অনলাইন"></span>' : ''}
                    </div>
                    <div class="mesesu-person-name">${esc(mesesuFirstName(u.fullName))}${mesesuHasBlue(u) ? ' <i data-lucide="badge-check" class="w-3 h-3 inline fill-blue-500 text-blue-400"></i>' : ''}</div>
                </div>`;
            });
            row.innerHTML = html;
            refreshIcons();
        }
        function mesesuListenInbox() {
            if (!currentUser || !firebaseReady) return;
            // লগইনের পর থেকেই একটাই লিস্টেনার চলে (হোমপেজ ব্যাজের জন্য); একই ইউজারের জন্য আবার সাবস্ক্রাইব করে না
            if (unsubscribeInbox && mesesuInboxUid === currentUser.uid) return;
            if (unsubscribeInbox) { try { unsubscribeInbox(); } catch (e) {} unsubscribeInbox = null; }
            mesesuInboxUid = currentUser.uid;
            mesesuInboxCache = [];
            const q = query(collection(db, 'users', currentUser.uid, 'inbox'), orderBy('lastAt', 'desc'));
            unsubscribeInbox = onSnapshot(q, snap => {
                mesesuInboxCache = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                mesesuHandleInboxUpdate();
            }, err => {
                console.warn('inbox listen', err);
                // fallback without orderBy if index missing
                unsubscribeInbox = onSnapshot(collection(db, 'users', currentUser.uid, 'inbox'), snap2 => {
                    mesesuInboxCache = snap2.docs.map(d => ({ id: d.id, ...d.data() }));
                    mesesuInboxCache.sort((a, b) => (b.lastAt?.toMillis?.() || 0) - (a.lastAt?.toMillis?.() || 0));
                    mesesuHandleInboxUpdate();
                });
            });
        }
        /** ইনবক্সের র্যাজ ডেটাকে ৩ ভাগে ভাগ করে: approved (মূল লিস্ট), requests (আমার কাছে আসা pending), rejected (আমি রিজেক্ট করেছি, ৫ দিনের মধ্যে) */
        function mesesuPartitionInbox() {
            const myUid = currentUser?.uid;
            const approved = [], requests = [], rejected = [];
            (mesesuInboxCache || []).forEach(t => {
                const status = t.permissionStatus || 'approved'; // পুরনো থ্রেড যেগুলোতে স্ট্যাটাস নেই, সেগুলো approved ধরা হবে
                if (status === 'pending') {
                    if (t.permissionRequester === myUid) {
                        approved.push(Object.assign({}, t, { _pendingSent: true }));
                    } else {
                        // আমার পাঠানো নয় — সার্ভারের থ্রেড দেখে দিক/স্ট্যাটাস যাচাই না হওয়া পর্যন্ত (পুরনো ডকুমেন্টে requester নেই) রিকুয়েস্টে দেখানো হবে না
                        if (!mesesuVerifiedInbox.has(t.id + '|' + mesesuTsMillis(t.lastAt)) || !t.permissionRequester) return;
                        requests.push(t);
                    }
                } else if (status === 'rejected') {
                    const rejAt = mesesuTsMillis(t.rejectedAt);
                    const within = rejAt && (Date.now() - rejAt) < MESESU_FIVE_DAYS_MS;
                    if (t.rejectedBy === myUid && within) rejected.push(t);
                    // মেয়াদ শেষ হলে বা আমি রিজেক্টার না হলে — কোথাও দেখানো হবে না (৫ দিন পর স্বয়ংক্রিয়ভাবে রিসেট হবে)
                } else {
                    approved.push(t);
                }
            });
            mesesuApprovedThreads = approved;
            mesesuRequestsCache = requests;
            mesesuRejectedCache = rejected;
        }
        function mesesuUpdateReqBadge() {
            const n = mesesuRequestsCache.length;
            const badge = document.getElementById('mesesuReqBadge');
            const inline = document.getElementById('mesesuReqCountInline');
            if (badge) { if (n > 0) { badge.textContent = n > 99 ? '৯৯+' : String(n); badge.classList.remove('hidden'); } else badge.classList.add('hidden'); }
            if (inline) { if (n > 0) { inline.textContent = String(n); inline.classList.remove('hidden'); } else inline.classList.add('hidden'); }
        }
        /** আমার পাঠানো নয় এমন pending ইনবক্স ডকুমেন্ট থ্রেডের আসল ডেটার সাথে মিলিয়ে ঠিক করে (পুরনো/বাসি ডেটার কারণে ভুল রিকুয়েস্ট এড়াতে) */
        async function mesesuVerifyPendingInbox() {
            if (!currentUser || !firebaseReady) return;
            const myUid = currentUser.uid;
            const todo = (mesesuInboxCache || []).filter(t => (t.permissionStatus || 'approved') === 'pending'
                && t.permissionRequester !== myUid
                && !mesesuVerifiedInbox.has(t.id + '|' + mesesuTsMillis(t.lastAt)));
            if (!todo.length) return;
            for (const t of todo) {
                const key = t.id + '|' + mesesuTsMillis(t.lastAt);
                mesesuVerifiedInbox.add(key); // ব্যর্থ হলেও লুপ এড়াতে একবারই চেষ্টা
                try {
                    const peerId = t.peerId || t.id;
                    const tid = mesesuThreadId(myUid, peerId);
                    let tSnap;
                    try { tSnap = await getDocFromServer(doc(db, 'dmThreads', tid)); } catch (e) { tSnap = await getDoc(doc(db, 'dmThreads', tid)); }
                    const patch = tSnap.exists()
                        ? (() => { const d = tSnap.data(); return { permissionStatus: d.permissionStatus || 'approved', permissionRequester: d.permissionRequester || null, rejectedBy: d.rejectedBy || null, rejectedAt: d.rejectedAt || null }; })()
                        : { permissionStatus: 'approved' };
                    const differs = patch.permissionStatus !== t.permissionStatus
                        || ('permissionRequester' in patch && (patch.permissionRequester || null) !== (t.permissionRequester || null));
                    if (differs) {
                        Object.assign(t, patch);
                        setDoc(doc(db, 'users', myUid, 'inbox', t.id), patch, { merge: true }).catch(() => {});
                    }
                } catch (e) { console.warn('verify inbox', e); }
            }
            mesesuHandleInboxUpdate();
        }
        function mesesuHandleInboxUpdate() {
            mesesuVerifyPendingInbox();
            mesesuPartitionInbox();
            if (currentTab === 'chat') {
                mesesuRenderThreads(mesesuApprovedThreads);
                mesesuSyncPeerWatchers();
            }
            mesesuUpdateReqBadge();
            if (!document.getElementById('mesesuRequestsView')?.classList.contains('hidden')) mesesuRenderRequestsList();
            if (!document.getElementById('mesesuRejectedView')?.classList.contains('hidden')) mesesuRenderRejectedList();
            try { updateUnreadBadge(); } catch (e) {}
            if (mesesuMode === 'dm') mesesuMarkDmRead();
        }
        // থ্রি-ডট মেনু খোলা/বন্ধ
        function mesesuToggleMenu(e) {
            e?.stopPropagation();
            document.getElementById('mesesuMenuDropdown')?.classList.toggle('hidden');
        }
        document.addEventListener('click', (e) => {
            const wrap = document.getElementById('mesesuMenuWrap');
            if (wrap && !wrap.contains(e.target)) document.getElementById('mesesuMenuDropdown')?.classList.add('hidden');
        });
        /** একটাই জায়গা থেকে ঠিক হয় কোন প্যানেল দেখা যাবে — একসাথে দুটো দেখানোর সুযোগ নেই */
        function mesesuApplySubViewVisibility() {
            const v = mesesuSubView;
            const show = (id, on) => document.getElementById(id)?.classList.toggle('hidden', !on);
            show('mesesuPeopleRow', !v);
            show('mesesuThreadList', !v);
            show('mesesuRequestsView', v === 'requests');
            show('mesesuRejectedView', v === 'rejected');
            if (v === 'requests') mesesuRenderRequestsList();
            if (v === 'rejected') mesesuRenderRejectedList();
        }
        function mesesuOpenRequests() {
            document.getElementById('mesesuMenuDropdown')?.classList.add('hidden');
            document.getElementById('mesesuSearchResults')?.classList.add('hidden');
            mesesuSubView = 'requests';
            mesesuApplySubViewVisibility();
        }
        function mesesuOpenRejected() {
            document.getElementById('mesesuMenuDropdown')?.classList.add('hidden');
            document.getElementById('mesesuSearchResults')?.classList.add('hidden');
            mesesuSubView = 'rejected';
            mesesuApplySubViewVisibility();
        }
        function mesesuCloseSubView() {
            mesesuSubView = null;
            mesesuApplySubViewVisibility();
        }
        function mesesuRenderRequestsList() {
            const box = document.getElementById('mesesuRequestsList');
            if (!box) return;
            if (!mesesuRequestsCache.length) {
                box.innerHTML = `<div class="text-center py-12 px-4"><p class="text-sm font-bold text-slate-300">কোনো মেসেজ রিকুয়েস্ট নেই</p><p class="text-xs text-slate-500 mt-1">কেউ আপনাকে মেসেজ করার অনুরোধ পাঠালে এখানে দেখা যাবে</p></div>`;
                refreshIcons(); return;
            }
            box.innerHTML = mesesuRequestsCache.map(t => {
                const tick = t.peerBlue ? '<i data-lucide="badge-check" class="w-3.5 h-3.5 fill-blue-500 text-blue-400 shrink-0"></i>' : '';
                const preview = mesesuPreviewText(t.lastMessage || '', 6);
                return `<div class="mesesu-thread-row" onclick="mesesuOpenUser('${esc(t.peerId || t.id)}')">
                    <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-emerald-900/50 flex items-center justify-center">
                        ${t.peerPhoto ? `<img src="${esc(t.peerPhoto)}" class="w-full h-full object-cover" alt="">` : `<i data-lucide="user" class="w-6 h-6 text-emerald-300"></i>`}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-slate-100 truncate flex items-center gap-1">${esc(t.peerName || 'ইউজার')} ${tick}</p>
                        <p class="text-xs text-slate-400 truncate mt-0.5">${esc(preview)}</p>
                    </div>
                </div>`;
            }).join('');
            refreshIcons();
        }
        function mesesuRenderRejectedList() {
            const box = document.getElementById('mesesuRejectedList');
            if (!box) return;
            if (!mesesuRejectedCache.length) {
                box.innerHTML = `<div class="text-center py-12 px-4"><p class="text-sm font-bold text-slate-300">কোনো রিজেক্টেড মেসেজ নেই</p><p class="text-xs text-slate-500 mt-1">আপনি যাদের রিকুয়েস্ট রিজেক্ট করেছেন তারা এখানে ৫ দিনের জন্য দেখা যাবে</p></div>`;
                refreshIcons(); return;
            }
            box.innerHTML = mesesuRejectedCache.map(t => {
                const rejAt = mesesuTsMillis(t.rejectedAt);
                const daysLeft = Math.max(1, Math.ceil((MESESU_FIVE_DAYS_MS - (Date.now() - rejAt)) / MESESU_ADMIN_ONE_DAY_MS));
                return `<div class="mesesu-thread-row" onclick="mesesuOpenUser('${esc(t.peerId || t.id)}')">
                    <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-rose-900/30 flex items-center justify-center">
                        ${t.peerPhoto ? `<img src="${esc(t.peerPhoto)}" class="w-full h-full object-cover opacity-50" alt="">` : `<i data-lucide="user-x" class="w-6 h-6 text-rose-300"></i>`}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-slate-100 truncate">${esc(t.peerName || 'ইউজার')}</p>
                        <p class="text-xs text-rose-400 truncate mt-0.5">আপনি রিজেক্ট করেছেন · আর ${daysLeft} দিন বাকি</p>
                    </div>
                </div>`;
            }).join('');
            refreshIcons();
        }
        window.mesesuToggleMenu = mesesuToggleMenu;
        window.mesesuOpenRequests = mesesuOpenRequests;
        window.mesesuOpenRejected = mesesuOpenRejected;
        window.mesesuCloseSubView = mesesuCloseSubView;
        function mesesuPreviewText(text, maxWords) {
            const words = String(text || '').trim().split(/\s+/).filter(Boolean);
            if (!words.length) return '';
            const n = maxWords || 5;
            if (words.length <= n) return words.join(' ');
            return words.slice(0, n).join(' ') + '...';
        }
        function mesesuAdminLastPreview() {
            // Latest message from the real Admin Support thread only.
            if (!adminChatMessages || !adminChatMessages.length) return 'অ্যাডমিনের সাথে কথা বলুন';
            const last = adminChatMessages[adminChatMessages.length - 1];
            const raw = (last && last.text) ? String(last.text) : '';
            const prev = mesesuPreviewText(raw, 5);
            return prev || 'অ্যাডমিনের সাথে কথা বলুন';
        }
        function mesesuRenderThreads(list) {
            const box = document.getElementById('mesesuThreads');
            const empty = document.getElementById('mesesuEmptyState');
            if (!box) return;
            const adminOnline = !!isAdminOnline;
            const adminPreview = mesesuAdminLastPreview();
            const adminUnread = mesesuAdminUnreadCount();
            // Pinned Admin Support — verified badge by name; online/offline on avatar corner
            let html = `<div class="mesesu-thread-row" onclick="mesesuOpenAdmin()">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shrink-0 relative overflow-visible">
                    <i data-lucide="headset" class="w-6 h-6 text-white"></i>
                    <span class="mesesu-admin-online-dot ${adminOnline ? 'on' : 'off'}" title="${adminOnline ? 'অনলাইন' : 'অফলাইন'}"></span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2">
                        <p class="text-sm font-bold text-slate-100 truncate flex items-center gap-1">
                            অ্যাডমিন সাপোর্ট
                            <i data-lucide="badge-check" class="w-3.5 h-3.5 fill-blue-500 text-blue-400 shrink-0" title="Verified"></i>
                        </p>
                        <span class="text-[10px] text-slate-500 shrink-0">${adminOnline ? 'অনলাইন' : 'অফলাইন'}</span>
                    </div>
                    <div class="flex items-center justify-between gap-2 mt-0.5">
                        <p class="text-xs text-slate-400 truncate ${adminUnread ? 'font-semibold' : ''}">${esc(adminPreview)}</p>
                        ${mesesuRowBadge(adminUnread)}
                    </div>
                </div>
            </div>`;
            const rows = list || [];
            if (empty) empty.classList.add('hidden');
            rows.forEach(t => {
                const pid = t.peerId || t.id;
                const live = mesesuPeerData[pid] || (mesesuUsersCache || []).find(u => u.id === pid) || null;
                const tick = mesesuPeerBlue(pid, live) ? '<i data-lucide="badge-check" class="w-3.5 h-3.5 fill-blue-500 text-blue-400 shrink-0"></i>' : '';
                const isOn = live ? mesesuIsReallyOnline(live) : false;
                const timeStr = t.lastAt?.toDate ? t.lastAt.toDate().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }) : '';
                const preview = t._pendingSent ? 'অনুমতির অপেক্ষায়...' : mesesuPreviewText(t.lastMessage || '', 5);
                const unread = t._pendingSent ? 0 : (Number(t.unreadCount) || 0);
                html += `<div class="mesesu-thread-row" onclick="mesesuOpenUser('${esc(pid)}')">
                    <div class="relative w-12 h-12 shrink-0">
                        <div class="w-12 h-12 rounded-full overflow-hidden bg-emerald-900/50 flex items-center justify-center">
                            ${t.peerPhoto ? `<img src="${esc(t.peerPhoto)}" class="w-full h-full object-cover" alt="">` : `<i data-lucide="user" class="w-6 h-6 text-emerald-300"></i>`}
                        </div>
                        <span class="mesesu-admin-online-dot ${isOn ? 'on' : 'off'}" title="${isOn ? 'অনলাইন' : 'অফলাইন'}"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                            <p class="text-sm font-bold text-slate-100 truncate flex items-center gap-1">${esc(t.peerName || 'ইউজার')} ${tick}</p>
                            <span class="text-[10px] text-slate-500 shrink-0">${esc(timeStr)}</span>
                        </div>
                        <div class="flex items-center justify-between gap-2 mt-0.5">
                            <p class="text-xs text-slate-400 truncate ${unread ? 'font-semibold' : ''}">${esc(preview)}</p>
                            ${mesesuRowBadge(unread)}
                        </div>
                    </div>
                </div>`;
            });
            if (!rows.length) {
                html += `<div class="text-center py-12 px-4">
                    <p class="text-sm font-bold text-slate-300">কোনো চ্যাট নেই</p>
                    <p class="text-xs text-slate-500 mt-1">উপরের প্রোফাইল থেকে কাউকে বেছে মেসেজের অনুমতি চান</p>
                </div>`;
            }
            box.innerHTML = html;
            refreshIcons();
        }
        window.mesesuOpenAdmin = async () => {
            // Switch mode first so a late DM snapshot cannot overwrite Admin Support state.
            mesesuMode = 'admin';
            mesesuPeer = null;
            mesesuStopPeerWatch(); mesesuPeerLive = null; mesesuThreadReadMap = {};
            if (unsubscribeDm) { try { unsubscribeDm(); } catch (e) {} unsubscribeDm = null; }
            if (unsubscribeDmThread) { try { unsubscribeDmThread(); } catch (e) {} unsubscribeDmThread = null; }
            mesesuDmPermission = 'none';
            mesesuPermissionRequester = null;
            chatMessages = [];
            document.getElementById('chatMessages')?.replaceChildren();
            document.getElementById('mesesuInbox')?.classList.add('hidden');
            document.getElementById('mesesuThreadView')?.classList.remove('hidden');
            // থ্রেড মোড: দুই নেভ লুকানো + নোটিফ বন্ধ
            document.body.classList.add('chat-thread');
            if (typeof closeNotifPanel === 'function') { try { closeNotifPanel(); } catch (e) {} }
            const bottomNav = document.getElementById('bottomNav');
            if (bottomNav) bottomNav.classList.add('nav-hidden');
            document.getElementById('threadTitle').textContent = 'অ্যাডমিন সাপোর্ট';
            document.getElementById('threadBlueTick')?.classList.remove('hidden');
            const statusDot = document.getElementById('adminStatusDot');
            if (statusDot) {
                statusDot.classList.remove('hidden');
                if (isAdminOnline) {
                    statusDot.className = 'w-3 h-3 bg-emerald-500 border-2 border-[#10281c] rounded-full absolute -bottom-0.5 -right-0.5 z-10 animate-pulse';
                } else {
                    statusDot.className = 'w-3 h-3 bg-slate-500 border-2 border-[#10281c] rounded-full absolute -bottom-0.5 -right-0.5 z-10';
                }
            }
            const statusLabel = document.getElementById('adminStatusLabel');
            if (statusLabel) {
                statusLabel.textContent = isAdminOnline ? 'অনলাইন' : 'অফলাইন';
                statusLabel.className = isAdminOnline ? 'text-[10px] text-emerald-500 font-medium' : 'text-[10px] text-slate-400 font-medium';
            }
            const img = document.getElementById('threadAvatarImg');
            const ic = document.getElementById('threadAvatarIcon');
            if (img) { img.classList.add('hidden'); img.src = ''; }
            if (ic) { ic.classList.remove('hidden'); ic.setAttribute('data-lucide', 'headset'); }
            document.getElementById('dmPermissionBanner')?.classList.add('hidden');
            const adminInput = document.getElementById('chatInput');
            if (adminInput) {
                adminInput.disabled = false;
                adminInput.readOnly = false;
                adminInput.placeholder = 'আপনার বার্তা লিখুন...';
                adminInput.value = '';
            }
            updateChatActionButton();

            // Fetch the real Admin Support thread again; never reuse DM messages.
            if (currentUser && firebaseReady) {
                // ১ দিনের বেশি পুরনো অ্যাডমিন-চ্যাট মেসেজ নিরবে ক্লিনআপ (চ্যাট লিস্ট এন্ট্রি কখনো মুছবে না)
                await mesesuAutoCleanAdminMessages().catch(() => {});
                try {
                    const adminQuery = query(
                        collection(db, `chats/${currentUser.uid}/messages`),
                        orderBy('createdAt', 'asc')
                    );
                    const adminSnap = await getDocs(adminQuery);
                    adminChatMessages = adminSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                    if (mesesuMode === 'admin') {
                        chatMessages = adminChatMessages.slice();
                        renderChatMessages();
                        await markMessagesAsRead();
                    }
                } catch (err) {
                    console.warn('Admin Support refresh failed:', err?.code || err?.message);
                    // Keep the listener cache if the one-time refresh is unavailable.
                    if (mesesuMode === 'admin') {
                        chatMessages = adminChatMessages.slice();
                        renderChatMessages();
                    }
                }
            } else {
                chatMessages = adminChatMessages.slice();
                renderChatMessages();
            }
            updateUnreadBadge();
            refreshIcons();
        };
        window.mesesuOpenUser = async (peerId) => {
            if (!currentUser || !peerId || peerId === currentUser.uid) return;
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            let peer = mesesuUsersCache.find(u => u.id === peerId);
            if (!peer) {
                try {
                    const snap = await getDoc(doc(db, 'users', peerId));
                    if (!snap.exists()) return showToast('ব্যবহারকারী পাওয়া যায়নি', 'circle-x', 'text-rose-400');
                    peer = { id: peerId, ...snap.data() };
                } catch (e) {
                    return showToast('লোড ব্যর্থ', 'circle-x', 'text-rose-400');
                }
            }
            mesesuMode = 'dm';
            // আগের চ্যাটের permission স্টেট নতুন থ্রেডে ঢুকতে দেওয়া হবে না
            mesesuDmPermission = 'none';
            mesesuPermissionRequester = null;
            mesesuPermissionRejectedBy = null;
            mesesuPermissionRejectedAt = 0;
            if (unsubscribeDmThread) { try { unsubscribeDmThread(); } catch (e) {} unsubscribeDmThread = null; }
            {
                const lockInput = document.getElementById('chatInput');
                if (lockInput) { lockInput.value = ''; lockInput.readOnly = true; lockInput.placeholder = 'লোড হচ্ছে...'; }
            }
            const peerOnline = mesesuIsReallyOnline(peer);
            mesesuPeer = { id: peer.id, fullName: peer.fullName || 'ইউজার', photoURL: peer.photoURL || '', isPremium: mesesuPeerBlue(peer.id, peer), isOnline: peerOnline };
            mesesuPeerLive = peer; mesesuThreadReadMap = {};
            document.getElementById('mesesuInbox')?.classList.add('hidden');
            document.getElementById('mesesuThreadView')?.classList.remove('hidden');
            // থ্রেড মোড: দুই নেভ লুকানো + নোটিফ বন্ধ
            document.body.classList.add('chat-thread');
            if (typeof closeNotifPanel === 'function') { try { closeNotifPanel(); } catch (e) {} }
            const bottomNavDm = document.getElementById('bottomNav');
            if (bottomNavDm) bottomNavDm.classList.add('nav-hidden');
            document.getElementById('threadTitle').textContent = mesesuPeer.fullName;
            /* ব্লু ভেরিফাই ব্যাজ — প্রিমিয়াম/verified ইউজার হলে দেখাবে */
            document.getElementById('threadBlueTick')?.classList.toggle('hidden', !mesesuPeer.isPremium);
            /* অনলাইন/অফলাইন ব্যাজ প্রোফাইল পিকচারের নিচের ডান কোনায় */
            const statusDot = document.getElementById('adminStatusDot');
            if (statusDot) {
                statusDot.classList.remove('hidden');
                if (peerOnline) {
                    statusDot.className = 'w-3 h-3 bg-emerald-500 border-2 border-[#10281c] rounded-full absolute -bottom-0.5 -right-0.5 z-10 animate-pulse';
                } else {
                    statusDot.className = 'w-3 h-3 bg-slate-500 border-2 border-[#10281c] rounded-full absolute -bottom-0.5 -right-0.5 z-10';
                }
            }
            const statusLabel = document.getElementById('adminStatusLabel');
            if (statusLabel) {
                statusLabel.textContent = peerOnline ? 'অনলাইন' : 'অফলাইন';
                statusLabel.className = peerOnline ? 'text-[10px] text-emerald-500 font-medium' : 'text-[10px] text-slate-400 font-medium';
            }
            const img = document.getElementById('threadAvatarImg');
            const ic = document.getElementById('threadAvatarIcon');
            if (mesesuPeer.photoURL && img) {
                img.src = mesesuPeer.photoURL; img.classList.remove('hidden');
                if (ic) ic.classList.add('hidden');
            } else {
                if (img) { img.classList.add('hidden'); img.src = ''; }
                if (ic) { ic.classList.remove('hidden'); ic.setAttribute('data-lucide', 'user'); }
            }
            mesesuRenderPeerHeader();
            mesesuStartPeerWatch(peerId);
            chatMessages = [];
            renderChatMessages();
            await mesesuOpenDmThread(peerId);
            refreshIcons();
        };
        /* থ্রেডের permission স্টেট সার্ভার থেকে সরাসরি পড়ে (অফলাইন ক্যাশের পুরনো ডেটা এড়াতে) */
        /** ৫ দিন পার হয়ে গেলে রিজেক্ট করা থ্রেড স্বয়ংক্রিয়ভাবে 'none'-এ রিসেট হবে এবং সব মেসেজ (watermark বাদে) মুছে যাবে */
        async function mesesuMaybeExpireRejection(tid, d, peerId) {
            if (!d || d.permissionStatus !== 'rejected') return d;
            const rejAt = mesesuTsMillis(d.rejectedAt);
            if (!rejAt || (Date.now() - rejAt) < MESESU_FIVE_DAYS_MS) return d;
            try {
                await setDoc(doc(db, 'dmThreads', tid), { permissionStatus: 'none', permissionRequester: null, rejectedBy: null, rejectedAt: null }, { merge: true });
                await mesesuClearThreadMessages(tid);
                await setDoc(doc(db, 'users', currentUser.uid, 'inbox', peerId), { permissionStatus: 'none', rejectedBy: null, rejectedAt: null, lastMessage: '' }, { merge: true });
                await setDoc(doc(db, 'users', peerId, 'inbox', currentUser.uid), { permissionStatus: 'none', rejectedBy: null, rejectedAt: null, lastMessage: '' }, { merge: true });
            } catch (e) { console.warn('expire reject', e); }
            return Object.assign({}, d, { permissionStatus: 'none', permissionRequester: null, rejectedBy: null, rejectedAt: null });
        }
        async function mesesuSyncThreadState(peerIdArg) {
            if (!currentUser || !firebaseReady) return;
            const peerId = peerIdArg || (mesesuPeer && mesesuPeer.id);
            if (!peerId) return;
            const tid = mesesuThreadId(currentUser.uid, peerId);
            let d = null, ok = false;
            try {
                const tSnap = await getDocFromServer(doc(db, 'dmThreads', tid));
                d = tSnap.exists() ? tSnap.data() : null;
                ok = true;
            } catch (e) {
                try {
                    const tSnap2 = await getDoc(doc(db, 'dmThreads', tid));
                    d = tSnap2.exists() ? tSnap2.data() : null;
                    ok = true;
                } catch (e2) { ok = false; }
            }
            if (!ok) return;
            d = await mesesuMaybeExpireRejection(tid, d, peerId);
            if (mesesuMode !== 'dm' || !mesesuPeer || mesesuPeer.id !== peerId) return;
            const np = d ? (d.permissionStatus || 'none') : 'none';
            const nr = d ? (d.permissionRequester || null) : null;
            const nrb = d ? (d.rejectedBy || null) : null;
            const nra = d ? mesesuTsMillis(d.rejectedAt) : 0;
            const changed = (np !== mesesuDmPermission) || (nr !== mesesuPermissionRequester) || (nrb !== mesesuPermissionRejectedBy);
            mesesuDmPermission = np;
            mesesuPermissionRequester = nr;
            mesesuPermissionRejectedBy = nrb;
            mesesuPermissionRejectedAt = nra;
            if (changed) mesesuApplyPermissionUi();
        }
        async function mesesuOpenDmThread(peerId) {
            const tid = mesesuThreadId(currentUser.uid, peerId);
            // প্রথমে সার্ভার থেকে নিশ্চিত স্টেট নিন (এতে ৫ দিন পার হওয়া রিজেক্ট অটো-রিসেট হয়ে যাবে)
            await mesesuSyncThreadState(peerId);
            mesesuApplyPermissionUi();
            // ৫ দিনের পুরনো মেসেজ (watermark বাদে) নিরবে ক্লিনআপ — ভিজিট করার সময় চলে
            mesesuAutoCleanOldMessages(tid).catch(() => {});

            // থ্রেড ডকুমেন্ট লাইভ শুনুন — permissionStatus/permissionRequester/rejectedBy বদলালে সাথে সাথে UI আপডেট
            if (unsubscribeDmThread) { try { unsubscribeDmThread(); } catch (e) {} unsubscribeDmThread = null; }
            unsubscribeDmThread = onSnapshot(doc(db, 'dmThreads', tid), tSnap => {
                if (mesesuMode !== 'dm' || !mesesuPeer || mesesuPeer.id !== peerId) return;
                // পড়া-রসিদ (seen): dmThreads/{tid}.readAt = { uid: Timestamp }
                try {
                    const dd0 = tSnap.exists() ? tSnap.data() : null;
                    const ra = dd0 && dd0.readAt;
                    if (ra && typeof ra === 'object') {
                        let ch = false;
                        Object.keys(ra).forEach(k => {
                            const ms = mesesuTsMillis(ra[k]);
                            if (ms && ms !== mesesuThreadReadMap[k]) { mesesuThreadReadMap[k] = ms; ch = true; }
                        });
                        if (ch) renderChatMessages({ keepScroll: true });
                    }
                } catch (e) {}
                // ক্যাশ থেকে আসা snapshot-এ পুরনো স্টেট থাকতে পারে; সার্ভারের snapshot-ই চূড়ান্ত
                if (tSnap.metadata && tSnap.metadata.fromCache && tSnap.exists()) return;
                const d = tSnap.exists() ? tSnap.data() : null;
                const np = d ? (d.permissionStatus || 'none') : 'none';
                const nr = d ? (d.permissionRequester || null) : null;
                const nrb = d ? (d.rejectedBy || null) : null;
                const nra = d ? mesesuTsMillis(d.rejectedAt) : 0;
                if (np !== mesesuDmPermission || nr !== mesesuPermissionRequester || nrb !== mesesuPermissionRejectedBy) {
                    mesesuDmPermission = np;
                    mesesuPermissionRequester = nr;
                    mesesuPermissionRejectedBy = nrb;
                    mesesuPermissionRejectedAt = nra;
                    mesesuApplyPermissionUi();
                }
            }, err => console.warn('dm thread', err));

            if (unsubscribeDm) { try { unsubscribeDm(); } catch (e) {} }
            const q = query(collection(db, 'dmThreads', tid, 'messages'), orderBy('createdAt', 'asc'));
            unsubscribeDm = onSnapshot(q, snap => {
                if (mesesuMode !== 'dm' || !mesesuPeer || mesesuPeer.id !== peerId) return;
                chatMessages = snap.docs.map(d => {
                    const m = d.data();
                    // এপ্রুভের পর স্থায়ী watermark বার্তা — কোনো চ্যাট বাবল/বক্স ছাড়া হালকা জলছাপ টেক্সট হিসেবে দেখানো হবে
                    if (m.senderId === 'system' || m.type === 'system-approved') {
                        return { id: d.id, sender: 'system', text: m.text || '', time: m.time || '', isDm: true, permanent: true };
                    }
                    return {
                        id: d.id,
                        sender: m.senderId === currentUser.uid ? 'user' : 'admin',
                        text: m.text || '',
                        time: m.time || '',
                        uid: m.senderId,
                        userName: m.senderName || '',
                        readByUser: true,
                        createdMs: mesesuTsMillis(m.createdAt),
                        isDm: true
                    };
                });
                // নোট: এখন থেকে শুধু অপর পক্ষের রিপ্লাই দিলেই স্বয়ংক্রিয়ভাবে অনুমতি দেওয়া হয় না —
                // প্রাপককে অবশ্যই এপ্রুভ/রিজেক্ট বাটনে ক্লিক করতে হবে (নিচের mesesuApproveCurrentRequest দেখুন)।
                renderChatMessages();
                mesesuMarkDmRead();
            }, err => console.warn('dm messages', err));
        }
        function mesesuApplyPermissionUi() {
            const input = document.getElementById('chatInput');
            const banner = document.getElementById('dmPermissionBanner');
            const actionBar = document.getElementById('dmRequestActionBar');
            const rejectedBanner = document.getElementById('dmRejectedBanner');
            const chatForm = document.getElementById('chatForm');
            if (mesesuMode !== 'dm') {
                banner?.classList.add('hidden');
                actionBar?.classList.add('hidden');
                rejectedBanner?.classList.add('hidden');
                chatForm?.classList.remove('hidden');
                if (input) { input.disabled = false; input.placeholder = 'আপনার বার্তা লিখুন...'; input.readOnly = false; }
                return;
            }
            // প্রতিবার আগে সব লুকিয়ে, নিচে যেটা প্রযোজ্য সেটাই দেখানো হবে
            actionBar?.classList.add('hidden');
            rejectedBanner?.classList.add('hidden');
            banner?.classList.add('hidden');
            chatForm?.classList.remove('hidden');

            if (mesesuDmPermission === 'none') {
                if (input) {
                    input.value = DM_PERMISSION_TEXT;
                    input.readOnly = true;
                    input.disabled = false;
                    input.placeholder = DM_PERMISSION_TEXT;
                }
                updateChatActionButton();
            } else if (mesesuDmPermission === 'pending' && mesesuPermissionRequester === currentUser?.uid) {
                // আমি অনুমতি চেয়েছি, এখনো সিদ্ধান্ত আসেনি — অপেক্ষার ব্যানার, ইনপুট বন্ধ
                banner?.classList.remove('hidden');
                chatForm?.classList.add('hidden');
                if (input) { input.value = ''; input.readOnly = true; input.disabled = true; input.placeholder = 'উত্তরের অপেক্ষায়...'; }
            } else if (mesesuDmPermission === 'pending') {
                // আমি প্রাপক — এপ্রুভ/রিজেক্ট ছাড়া কিছুই করতে পারবো না, ফ্রি টেক্সট রিপ্লাই বন্ধ
                chatForm?.classList.add('hidden');
                actionBar?.classList.remove('hidden');
                if (input) { input.value = ''; input.readOnly = true; input.disabled = true; input.placeholder = 'এপ্রুভ অথবা রিজেক্ট করুন'; }
            } else if (mesesuDmPermission === 'rejected') {
                // রিজেক্ট হওয়া অবস্থা — ৫ দিন উভয় পাশে ব্লক; কে রিজেক্ট করেছে তার ওপর ভিত্তি করে ভিন্ন বার্তা
                chatForm?.classList.add('hidden');
                const iAmRejecter = mesesuPermissionRejectedBy === currentUser?.uid;
                const daysLeft = mesesuRejectDaysLeft();
                if (rejectedBanner) {
                    rejectedBanner.textContent = iAmRejecter
                        ? `আপনি ${mesesuPeer?.fullName || 'এই ব্যবহারকারী'} কে রিজেক্ট করেছেন, দয়া করে ${daysLeft} দিন পর আবার চেষ্টা করুন`
                        : 'আপনার মেসেজ এখনো এপ্রুভ করা হয়নি';
                    rejectedBanner.classList.remove('hidden');
                }
                if (input) { input.value = ''; input.readOnly = true; input.disabled = true; input.placeholder = ''; }
            } else {
                // approved — স্বাভাবিক চ্যাট
                if (input) { input.value = ''; input.readOnly = false; input.disabled = false; input.placeholder = 'আপনার বার্তা লিখুন...'; }
                updateChatActionButton();
            }
        }
        /** এপ্রুভের পর স্থায়ী watermark বার্তা — কখনো অটো-ডিলিট হবে না */
        function mesesuApprovalWatermarkText() {
            return currentLang === 'en' ? 'You can now message each other' : 'আপনারা এখন থেকে একে অপরকে মেসেজ করতে পারবেন';
        }
        async function mesesuInsertApprovalWatermark(tid) {
            const time = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
            try {
                await addDoc(collection(db, 'dmThreads', tid, 'messages'), {
                    senderId: 'system', type: 'system-approved', permanent: true,
                    text: mesesuApprovalWatermarkText(), time, createdAt: serverTimestamp()
                });
            } catch (e) { console.warn('watermark insert', e); }
        }
        async function mesesuSendDm(text) {
            if (!mesesuPeer || !currentUser) return;
            const peerId = mesesuPeer.id;
            const tid = mesesuThreadId(currentUser.uid, peerId);
            const time = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
            // পাঠানোর আগে সার্ভার থেকে সর্বশেষ permission স্টেট নিশ্চিত করা (৫ দিন পার হওয়া রিজেক্ট এখানেই অটো-রিসেট হয়)
            const prevPerm = mesesuDmPermission;
            await mesesuSyncThreadState(peerId);
            if (mesesuMode !== 'dm' || !mesesuPeer || mesesuPeer.id !== peerId) return;

            // রিজেক্ট করা অবস্থায় — কে রিজেক্ট করেছে তার ওপর ভিত্তি করে ভিন্ন বার্তা, "রিজেক্ট হয়েছে" শব্দ কখনো অনুরোধকারীকে বলা হবে না
            if (mesesuDmPermission === 'rejected') {
                const iAmRejecter = mesesuPermissionRejectedBy === currentUser.uid;
                const daysLeft = mesesuRejectDaysLeft();
                mesesuApplyPermissionUi();
                return showToast(
                    iAmRejecter ? `আপনি এই ব্যবহারকারীকে রিজেক্ট করেছেন, দয়া করে ${daysLeft} দিন পর আবার চেষ্টা করুন` : 'আপনার মেসেজ এখনো এপ্রুভ করা হয়নি',
                    'lock', 'text-rose-400'
                );
            }
            // দুজনেই একসাথে অনুমতি চাইলে (কেউ কাউকে এপ্রুভ/রিজেক্ট করার আগেই): সরাসরি approved + watermark
            if (prevPerm === 'none' && mesesuDmPermission === 'pending' && mesesuPermissionRequester && mesesuPermissionRequester !== currentUser.uid) {
                mesesuDmPermission = 'approved';
                try {
                    await setDoc(doc(db, 'dmThreads', tid), { permissionStatus: 'approved', approvedAt: serverTimestamp(), rejectedBy: null, rejectedAt: null }, { merge: true });
                    await mesesuInsertApprovalWatermark(tid);
                    await setDoc(doc(db, 'users', currentUser.uid, 'inbox', peerId), { permissionStatus: 'approved' }, { merge: true });
                    await setDoc(doc(db, 'users', peerId, 'inbox', currentUser.uid), { permissionStatus: 'approved' }, { merge: true });
                } catch (e) {}
                mesesuApplyPermissionUi();
                return showToast('অপর পক্ষ আগেই অনুমতি চেয়েছে — এখন মেসেজ করতে পারবেন', 'check', 'text-emerald-400');
            }
            if (mesesuDmPermission === 'pending' && mesesuPermissionRequester === currentUser.uid) {
                return showToast('উত্তর না আসা পর্যন্ত মেসেজ পাঠানো যাবে না', 'lock', 'text-amber-400');
            }
            if (mesesuDmPermission === 'pending' && mesesuPermissionRequester !== currentUser.uid) {
                // আমি প্রাপক — এপ্রুভ/রিজেক্ট বাটন ছাড়া ফ্রি-টেক্সট রিপ্লাই দেওয়া যাবে না
                mesesuApplyPermissionUi();
                return showToast('অনুগ্রহ করে প্রথমে এপ্রুভ অথবা রিজেক্ট করুন', 'lock', 'text-amber-400');
            }
            const isPermission = mesesuDmPermission === 'none';
            const msgText = isPermission ? DM_PERMISSION_TEXT : text;
            if (isPermission) {
                await setDoc(doc(db, 'dmThreads', tid), {
                    members: [currentUser.uid, peerId],
                    permissionStatus: 'pending',
                    permissionRequester: currentUser.uid,
                    rejectedBy: null, rejectedAt: null,
                    updatedAt: serverTimestamp(),
                    lastMessage: msgText,
                    lastMessageAt: serverTimestamp()
                }, { merge: true });
                mesesuDmPermission = 'pending';
                mesesuPermissionRequester = currentUser.uid;
            } else {
                // এই পয়েন্টে mesesuDmPermission === 'approved', কারণ 'none'/'pending'/'rejected' সব ওপরেই হ্যান্ডেল হয়ে গেছে
                const payload = {
                    members: [currentUser.uid, peerId],
                    updatedAt: serverTimestamp(),
                    lastMessage: msgText,
                    lastMessageAt: serverTimestamp()
                };
                await setDoc(doc(db, 'dmThreads', tid), payload, { merge: true });
            }
            await addDoc(collection(db, 'dmThreads', tid, 'messages'), {
                senderId: currentUser.uid,
                senderName: userProfile?.fullName || 'ইউজার',
                text: msgText,
                time,
                type: isPermission ? 'permission' : 'text',
                createdAt: serverTimestamp()
            });
            // mirror inbox both sides
            const myInbox = {
                peerId, peerName: mesesuPeer.fullName, peerPhoto: mesesuPeer.photoURL || '',
                peerBlue: !!mesesuPeer.isPremium,
                lastMessage: msgText, lastAt: serverTimestamp(),
                permissionStatus: mesesuDmPermission,
                permissionRequester: mesesuPermissionRequester || null
            };
            const peerInbox = {
                peerId: currentUser.uid,
                peerName: userProfile?.fullName || 'ইউজার',
                peerPhoto: userProfile?.photoURL || '',
                peerBlue: !!isUserPremium,
                lastMessage: msgText, lastAt: serverTimestamp(),
                permissionStatus: mesesuDmPermission,
                permissionRequester: mesesuPermissionRequester || null
            };
            await setDoc(doc(db, 'users', currentUser.uid, 'inbox', peerId), myInbox, { merge: true });
            await setDoc(doc(db, 'users', peerId, 'inbox', currentUser.uid), peerInbox, { merge: true });
            // আপডেট ২: প্রাপকের ইনবক্সে আনরিড +1 (আলাদা রাইট — ব্যর্থ হলেও মেসেজ পাঠানো ভাঙবে না)
            setDoc(doc(db, 'users', peerId, 'inbox', currentUser.uid), { unreadCount: increment(1) }, { merge: true })
                .catch(e => console.warn('unread inc', e?.code || e?.message));
            mesesuPushToPeer(peerId, isPermission ? 'request' : 'message', msgText);
            mesesuApplyPermissionUi();
            try { playAppSound('send'); } catch (e) {}
        }
        /** প্রাপক রিকুয়েস্ট এপ্রুভ করলে: স্ট্যাটাস approved, স্থায়ী watermark বার্তা যোগ হবে (কখনো অটো-ডিলিট হবে না) */
        window.mesesuApproveCurrentRequest = async () => {
            if (!mesesuPeer || !currentUser || !firebaseReady) return;
            const peerId = mesesuPeer.id;
            const tid = mesesuThreadId(currentUser.uid, peerId);
            try {
                await setDoc(doc(db, 'dmThreads', tid), { permissionStatus: 'approved', approvedAt: serverTimestamp(), rejectedBy: null, rejectedAt: null }, { merge: true });
                await mesesuInsertApprovalWatermark(tid);
                await setDoc(doc(db, 'users', currentUser.uid, 'inbox', peerId), { permissionStatus: 'approved' }, { merge: true });
                await setDoc(doc(db, 'users', peerId, 'inbox', currentUser.uid), { permissionStatus: 'approved' }, { merge: true });
                mesesuDmPermission = 'approved';
                mesesuPermissionRejectedBy = null;
                mesesuApplyPermissionUi();
                showToast('অনুমোদন করা হয়েছে, এখন থেকে মেসেজ করতে পারবেন', 'check', 'text-emerald-400');
            } catch (e) {
                console.warn('approve request', e);
                showToast('এপ্রুভ ব্যর্থ হয়েছে', 'triangle-alert', 'text-rose-400');
            }
        };
        /** প্রাপক রিকুয়েস্ট রিজেক্ট করলে: উভয় পক্ষ ৫ দিনের জন্য ব্লক, থ্রেড "রিজেক্টেড মেসেজ" লিস্টে চলে যায় */
        window.mesesuRejectCurrentRequest = async () => {
            if (!mesesuPeer || !currentUser || !firebaseReady) return;
            const peerId = mesesuPeer.id;
            const tid = mesesuThreadId(currentUser.uid, peerId);
            try {
                await setDoc(doc(db, 'dmThreads', tid), { permissionStatus: 'rejected', rejectedBy: currentUser.uid, rejectedAt: serverTimestamp() }, { merge: true });
                await setDoc(doc(db, 'users', currentUser.uid, 'inbox', peerId), { permissionStatus: 'rejected', rejectedBy: currentUser.uid, rejectedAt: serverTimestamp() }, { merge: true });
                await setDoc(doc(db, 'users', peerId, 'inbox', currentUser.uid), { permissionStatus: 'rejected', rejectedBy: currentUser.uid, rejectedAt: serverTimestamp() }, { merge: true });
                mesesuDmPermission = 'rejected';
                mesesuPermissionRejectedBy = currentUser.uid;
                mesesuPermissionRejectedAt = Date.now();
                showToast('রিকুয়েস্ট রিজেক্ট করা হয়েছে', 'user-x', 'text-rose-400');
                mesesuShowInbox();
            } catch (e) {
                console.warn('reject request', e);
                showToast('রিজেক্ট ব্যর্থ হয়েছে', 'triangle-alert', 'text-rose-400');
            }
        };
        /** watermark বাদে থ্রেডের সব মেসেজ ডিলিট করে — রিজেক্ট-মেয়াদ শেষে ব্যবহৃত হয় */
        async function mesesuClearThreadMessages(tid) {
            try {
                const snap = await getDocs(collection(db, 'dmThreads', tid, 'messages'));
                const batch = writeBatch(db);
                let count = 0;
                snap.docs.forEach(d => {
                    const m = d.data();
                    if (!m.permanent) { batch.delete(d.ref); count++; }
                });
                if (count > 0) await batch.commit();
            } catch (e) { console.warn('clear thread messages', e); }
        }
        /** থ্রেড খোলার সময় ৫ দিনের বেশি পুরনো মেসেজ (watermark বাদে) স্বয়ংক্রিয়ভাবে মুছে ফেলে — স্টোরেজ বাঁচাতে */
        async function mesesuAutoCleanOldMessages(tid) {
            if (!firebaseReady) return;
            try {
                const snap = await getDocs(collection(db, 'dmThreads', tid, 'messages'));
                const batch = writeBatch(db);
                let count = 0;
                const cutoff = Date.now() - MESESU_FIVE_DAYS_MS;
                snap.docs.forEach(d => {
                    const m = d.data();
                    if (m.permanent) return; // approval watermark কখনো মুছবে না
                    const t = mesesuTsMillis(m.createdAt);
                    if (t && t < cutoff) { batch.delete(d.ref); count++; }
                });
                if (count > 0) await batch.commit();
            } catch (e) { console.warn('auto clean dm messages', e); }
        }
        /** অ্যাডমিন সাপোর্ট চ্যাটের ১ দিনের বেশি পুরনো মেসেজ মুছে ফেলে — চ্যাট লিস্টে "অ্যাডমিন সাপোর্ট" এন্ট্রি কখনো মুছবে না */
        async function mesesuAutoCleanAdminMessages() {
            if (!currentUser || !firebaseReady) return;
            try {
                const snap = await getDocs(collection(db, `chats/${currentUser.uid}/messages`));
                const batch = writeBatch(db);
                let count = 0;
                const cutoff = Date.now() - MESESU_ADMIN_ONE_DAY_MS;
                snap.docs.forEach(d => {
                    const m = d.data();
                    const t = mesesuTsMillis(m.createdAt);
                    if (t && t < cutoff) { batch.delete(d.ref); count++; }
                });
                if (count > 0) await batch.commit();
            } catch (e) { console.warn('auto clean admin messages', e); }
        }

        // Search users as you type
        (() => {
            const bind = () => {
                const input = document.getElementById('mesesuSearchInput');
                if (!input || input.dataset.bound) return;
                input.dataset.bound = '1';
                input.addEventListener('input', () => {
                    const q = input.value.trim().toLowerCase();
                    const res = document.getElementById('mesesuSearchResults');
                    const listWrap = document.getElementById('mesesuThreadList');
                    if (!q) {
                        res?.classList.add('hidden');
                        mesesuApplySubViewVisibility();
                        return;
                    }
                    listWrap?.classList.add('hidden');
                    document.getElementById('mesesuPeopleRow')?.classList.add('hidden');
                    document.getElementById('mesesuRequestsView')?.classList.add('hidden');
                    document.getElementById('mesesuRejectedView')?.classList.add('hidden');
                    res?.classList.remove('hidden');
                    const hits = (mesesuUsersCache || []).filter(u =>
                        String(u.fullName || '').toLowerCase().includes(q) ||
                        String(u.email || '').toLowerCase().includes(q)
                    ).slice(0, 30);
                    if (!hits.length) {
                        res.innerHTML = `<p class="text-center text-xs text-slate-500 py-8">কোনো ব্যবহারকারী পাওয়া যায়নি</p>`;
                        return;
                    }
                    res.innerHTML = hits.map(u => `<div class="mesesu-thread-row" onclick="mesesuOpenUser('${esc(u.id)}')">
                        <div class="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-emerald-900/50 flex items-center justify-center">
                            ${u.photoURL ? `<img src="${esc(u.photoURL)}" class="w-full h-full object-cover" alt="">` : `<i data-lucide="user" class="w-5 h-5 text-emerald-300"></i>`}
                        </div>
                        <div class="min-w-0 flex-1">
                            <p class="text-sm font-bold text-slate-100 truncate flex items-center gap-1">${esc(u.fullName || 'ইউজার')}${mesesuHasBlue(u) ? ' <i data-lucide="badge-check" class="w-3.5 h-3.5 fill-blue-500 text-blue-400"></i>' : ''}</p>
                            <p class="text-[10px] text-slate-500">${u.isOnline ? 'অনলাইন' : 'অফলাইন'}</p>
                        </div>
                    </div>`).join('');
                    refreshIcons();
                });
            };
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
            else bind();
            setTimeout(bind, 800);
        })();

        window.focusChatInput = () => { if (isForcedProfileMode) return; const i = document.getElementById('chatInput'); if (i) i.focus(); };

        /* সবসময় Messenger-style সবুজ সেন্ড বাটন (Gemini আইকন সরানো) */
        const SEND_BTN_HTML = `<span class="chat-btn-send flex items-center justify-center"><i data-lucide="send" class="w-5 h-5"></i></span>`;

        function updateChatActionButton() {
            const btn = document.getElementById('chatSendBtn');
            if (!btn) return;
            btn.dataset.mode = 'send';
            btn.setAttribute('aria-label', 'পাঠান');
            btn.classList.remove('chat-gemini-mode');
            btn.classList.add('chat-send-mode');
            btn.type = 'submit';
            if (!btn.querySelector('.chat-btn-send') || btn.querySelector('.chat-btn-gemini')) {
                btn.innerHTML = SEND_BTN_HTML;
                if (typeof refreshIcons === 'function') refreshIcons();
            }
        }
        function bindChatActionToggle() {
            const btn = document.getElementById('chatSendBtn');
            if (!btn || btn.dataset.sendBound) return;
            btn.dataset.sendBound = '1';
            updateChatActionButton();
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindChatActionToggle);
        else bindChatActionToggle();
        setTimeout(bindChatActionToggle, 500);

        // ========== KEYBOARD AWARE INPUT (Messenger/Instagram style) ==========
        // visualViewport দিয়ে কীবোর্ড উচ্চতা মাপা — ইনপুট কীবোর্ডের উপরে থাকে
        (() => {
            const root = document.documentElement;
            let lastKb = 0;
            function applyKeyboardOffset() {
                if (!document.body.classList.contains('chat-active') || !document.body.classList.contains('chat-thread')) {
                    root.style.setProperty('--kb-offset', '0px');
                    document.body.classList.remove('chat-kb-open');
                    lastKb = 0;
                    return;
                }
                const vv = window.visualViewport;
                if (!vv) return;
                // কীবোর্ড খোলা হলে visualViewport.height কমে যায়
                const fullH = window.innerHeight || document.documentElement.clientHeight;
                const kb = Math.max(0, Math.round(fullH - vv.height - (vv.offsetTop || 0)));
                // ছোট পার্থক্য (অ্যাড্রেস বার) উপেক্ষা
                const effective = kb > 80 ? kb : 0;
                if (effective !== lastKb) {
                    lastKb = effective;
                    root.style.setProperty('--kb-offset', effective + 'px');
                    document.body.classList.toggle('chat-kb-open', effective > 0);
                    // মেসেজ লিস্ট নিচে স্ক্রল রাখা
                    const box = document.getElementById('chatMessages');
                    if (box && effective > 0) {
                        requestAnimationFrame(() => { box.scrollTop = box.scrollHeight; });
                    }
                }
            }
            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', applyKeyboardOffset);
                window.visualViewport.addEventListener('scroll', applyKeyboardOffset);
            }
            window.addEventListener('resize', applyKeyboardOffset);
            // ইনপুট ফোকাস/ব্লার
            document.addEventListener('focusin', (e) => {
                if (e.target && e.target.id === 'chatInput') {
                    setTimeout(applyKeyboardOffset, 50);
                    setTimeout(applyKeyboardOffset, 300);
                }
            });
            document.addEventListener('focusout', (e) => {
                if (e.target && e.target.id === 'chatInput') {
                    setTimeout(() => {
                        root.style.setProperty('--kb-offset', '0px');
                        document.body.classList.remove('chat-kb-open');
                        lastKb = 0;
                    }, 80);
                }
            });
        })();

        // ========== CHAT SEND WITH OFFLINE OPTIMISTIC UI ==========
        window.handleSendChatMessage = async (e) => {
            e.preventDefault();
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');

            const rate = checkRateLimit('chat');
            if (!rate.allowed) return showToast(`${rate.remaining} সেকেন্ড অপেক্ষা করুন`, 'clock', 'text-amber-400');

            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (!text) {
                updateChatActionButton();
                return;
            }

            // Community DM path
            if (typeof mesesuMode !== 'undefined' && mesesuMode === 'dm') {
                if (mesesuDmPermission === 'pending' && mesesuPermissionRequester === currentUser.uid) {
                    // লোকাল স্টেট পুরনো হতে পারে — ব্লক করার আগে সার্ভার থেকে যাচাই
                    await mesesuSyncThreadState();
                    if (mesesuDmPermission === 'pending' && mesesuPermissionRequester === currentUser.uid) {
                        return showToast('উত্তর না আসা পর্যন্ত মেসেজ পাঠানো যাবে না', 'lock', 'text-amber-400');
                    }
                }
                const btn = document.getElementById('chatSendBtn');
                btn.disabled = true;
                try {
                    await mesesuSendDm(text);
                    if (mesesuDmPermission !== 'none') {
                        input.value = '';
                        updateChatActionButton();
                    }
                } catch (err) {
                    showToast('পাঠানো যায়নি: ' + (err.code || err.message), 'circle-x', 'text-rose-400');
                } finally {
                    btn.disabled = false;
                    updateChatActionButton();
                }
                return;
            }
            // Inbox mode — no direct send
            if (typeof mesesuMode !== 'undefined' && mesesuMode === 'inbox') return;

            const isOnline = navigator.onLine;
            const time = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
            const tempId = 'temp-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);

            const optimisticMsg = {
                id: tempId, sender: 'user', text, time,
                uid: currentUser.uid,
                userName: userProfile?.fullName || 'ইউজার',
                readByUser: true, pending: true, offline: !isOnline
            };
            chatMessages.push(optimisticMsg);
            renderChatMessages();
            input.value = '';
            updateChatActionButton();

            const btn = document.getElementById('chatSendBtn');
            btn.disabled = true;
            const prevMode = btn.dataset.mode;
            btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i>';
            btn.classList.remove('chat-gemini-mode');
            btn.classList.add('chat-send-mode');
            refreshIcons();

            try {
                await addDoc(collection(db, `chats/${currentUser.uid}/messages`), {
                    sender: 'user', text, time,
                    uid: currentUser.uid,
                    userName: userProfile?.fullName || 'ইউজার',
                    readByUser: true,
                    createdAt: serverTimestamp(),
                    deliveredAt: isOnline ? serverTimestamp() : null,
                    offlineSent: !isOnline,
                    tempId: tempId
                });
                try { playAppSound('send'); } catch (e) {}
                setRateLimit('chat');

                if (!isOnline) {
                    showToast('অফলাইন — net ফিরলে auto যাবে', 'wifi-off', 'text-amber-400');
                } else if (!isAdminOnline) {
                    const key = `autoReply_${currentUser.uid}`;
                    const last = parseInt(lsGet(key, '0'), 10);
                    if (Date.now() - last > 3600000) {
                        try {
                            await addDoc(collection(db, `chats/${currentUser.uid}/messages`), {
                                sender: 'admin', text: 'অ্যাডমিন অফলাইনে আছেন, শীঘ্রই উত্তর দেবেন।', time,
                                uid: currentUser.uid, userName: 'অ্যাডমিন', readByUser: false, createdAt: serverTimestamp(),
                                deliveredAt: serverTimestamp()
                            });
                            lsSet(key, String(Date.now()));
                        } catch (e) { console.warn('Auto reply failed', e); }
                    }
                }
            } catch (err) {
                chatMessages = chatMessages.filter(m => m.id !== tempId);
                renderChatMessages();
                showToast('পাঠানো যায়নি: ' + (err.code || err.message), 'circle-x', 'text-rose-400');
            } finally {
                btn.disabled = false;
                updateChatActionButton();
            }
        };

        function getLocallyReadMessageIds() { const arr = lsGetJSON(`amar-chat-read-${currentUid()}`, []); return new Set(Array.isArray(arr) ? arr : []); }
        function markMessagesAsReadLocally() {
            const s = getLocallyReadMessageIds();
            adminChatMessages.filter(m => m.sender === 'admin' && !m.isDm).forEach(m => s.add(m.id));
            const arr = [...s];
            lsSetJSON(`amar-chat-read-${currentUid()}`, arr.length > CHAT_READ_MAX ? arr.slice(-CHAT_READ_MAX) : arr);
        }
        async function markMessagesAsRead() {
            if (!currentUser || !firebaseReady || isForcedProfileMode || mesesuMode !== 'admin') return;

            // Only documents from the real Admin Support collection are eligible.
            const unread = adminChatMessages.filter(m =>
                m.sender === 'admin' && !m.isDm && m.readByUser !== true
            );
            if (!unread.length) {
                markMessagesAsReadLocally();
                updateUnreadBadge();
                return;
            }

            try {
                // Firestore write batches are limited to 500 operations; use safe chunks.
                for (let i = 0; i < unread.length; i += 450) {
                    const batch = writeBatch(db);
                    unread.slice(i, i + 450).forEach(m => {
                        batch.update(doc(db, `chats/${currentUser.uid}/messages`, m.id), { readByUser: true });
                    });
                    await batch.commit();
                }

                const readIds = new Set(unread.map(m => m.id));
                adminChatMessages = adminChatMessages.map(m =>
                    readIds.has(m.id) ? { ...m, readByUser: true } : m
                );
                if (mesesuMode !== 'dm') chatMessages = adminChatMessages.slice();
                markMessagesAsReadLocally();
            } catch (e) {
                // Do not mark locally if Firestore rejected the update.
                console.warn('Admin Support read receipt failed:', e?.code || e?.message);
            }
            updateUnreadBadge();
        }
        function updateUnreadBadge() {
            const b = document.getElementById('adminUnreadBadge');
            if (!b) return;
            // Mesesu-তে থাকলে সব "দেখা হয়েছে" ধরা হয় — হোমে ফিরলে ব্যাজ ফিরবে না
            if (currentUser && currentTab === 'chat') { try { mesesuAckBadge(); } catch (e) {} }
            // ব্যাজ = কতগুলো চ্যাটে নতুন অ্যাক্টিভিটি (মেসেজ সংখ্যা নয়); ৯-এর বেশি হলে "9+"
            const n = (currentUser && currentTab !== 'chat') ? mesesuBadgeChatCount() : 0;
            if (n > 0) { b.textContent = n > 9 ? '9+' : String(n); b.classList.remove('hidden'); b.classList.add('flex'); }
            else { b.classList.add('hidden'); b.classList.remove('flex'); }
        }
        function updateAdminStatus(isOnline, lastSeen) {
            const dot = document.getElementById('adminStatusDot');
            const label = document.getElementById('adminStatusLabel');
            if (!dot || !label) return;
            /* শুধু অ্যাডমিন থ্রেডে আপডেট করুন (DM-এ আলাদা হ্যান্ডল) */
            if (typeof mesesuMode !== 'undefined' && mesesuMode === 'dm') return;
            if (isOnline) {
                dot.classList.remove('hidden');
                dot.className = 'w-3 h-3 bg-emerald-500 border-2 border-[#10281c] rounded-full absolute -bottom-0.5 -right-0.5 z-10 animate-pulse';
                label.textContent = 'অনলাইন';
                label.className = 'text-[10px] text-emerald-500 font-medium';
            } else {
                dot.classList.remove('hidden');
                dot.className = 'w-3 h-3 bg-slate-500 border-2 border-[#10281c] rounded-full absolute -bottom-0.5 -right-0.5 z-10';
                if (lastSeen) {
                    const mins = Math.floor((Date.now() - lastSeen.getTime()) / 60000);
                    if (mins < 1) label.textContent = 'এইমাত্র সক্রিয় ছিলেন';
                    else if (mins < 60) label.textContent = `${mins} মিনিট আগে`;
                    else if (mins < 1440) label.textContent = `${Math.floor(mins / 60)} ঘণ্টা আগে`;
                    else label.textContent = `${Math.floor(mins / 1440)} দিন আগে`;
                } else label.textContent = 'অফলাইন';
                label.className = 'text-[10px] text-slate-400 font-medium';
            }
        }

        // ========== PROVIDER FORM ==========
        // ----- Provider media type (Image OR Video, never both) -----
        function getProviderMediaType() {
            const r = document.querySelector('#providerForm input[name="provMediaType"]:checked');
            return r && r.value === 'video' ? 'video' : 'image';
        }
        function clearProviderImage() {
            selectedProviderImage = null;
            const inp = document.getElementById('provImageInput'); if (inp) inp.value = '';
            const pv = document.getElementById('provImagePreview'); if (pv) { pv.classList.add('hidden'); pv.removeAttribute('src'); }
            const pr = document.getElementById('provImagePrompt'); if (pr) pr.classList.remove('hidden');
            const zn = document.getElementById('provImageZone'); if (zn) zn.classList.remove('has-image');
        }
        window.setProviderMediaType = (type) => {
            type = type === 'video' ? 'video' : 'image';
            const radio = document.querySelector('#providerForm input[name="provMediaType"][value="' + type + '"]');
            if (radio) radio.checked = true;
            document.getElementById('provMediaOptImage')?.classList.toggle('active', type === 'image');
            document.getElementById('provMediaOptVideo')?.classList.toggle('active', type === 'video');
            document.getElementById('provImageWrap')?.classList.toggle('hidden', type !== 'image');
            document.getElementById('provVideoWrap')?.classList.toggle('hidden', type !== 'video');
            if (type === 'image') {
                const v = document.getElementById('provVideoUrl'); if (v) v.value = '';
            } else {
                clearProviderImage();
            }
        };
        window.onProviderVideoInput = () => {
            const v = document.getElementById('provVideoUrl');
            if (v && v.value.trim()) clearProviderImage();
        };
        // Loads a direct video in a hidden <video>, resolves with its real size (or an error reason)
        function checkProviderVideoResolution(url) {
            return new Promise((resolve) => {
                const vid = document.createElement('video');
                vid.preload = 'metadata'; vid.muted = true; vid.playsInline = true;
                vid.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
                let done = false;
                const finish = (res) => {
                    if (done) return; done = true;
                    clearTimeout(timer);
                    vid.onloadedmetadata = null; vid.onerror = null;
                    try { vid.removeAttribute('src'); vid.load(); } catch (_) {}
                    vid.remove();
                    resolve(res);
                };
                const timer = setTimeout(() => finish({ ok: false }), 15000);
                vid.onloadedmetadata = () => finish({ ok: true, w: vid.videoWidth, h: vid.videoHeight });
                vid.onerror = () => finish({ ok: false });
                document.body.appendChild(vid);
                vid.src = url;
            });
        }
        window.previewProviderImage = (e) => {
            if (isForcedProfileMode) return;
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > 3 * 1024 * 1024) { showToast('ছবির সাইজ ৩MB এর কম হতে হবে', 'circle-x', 'text-rose-400'); e.target.value = ''; return; }
            if (!file.type.startsWith('image/')) { showToast('শুধু ছবি ফাইল দিন', 'circle-x', 'text-rose-400'); e.target.value = ''; return; }
            selectedProviderImage = file;
            const _pvu = document.getElementById('provVideoUrl'); if (_pvu) _pvu.value = '';
            const r = new FileReader();
            r.onload = ev => {
                const pv = document.getElementById('provImagePreview');
                const pr = document.getElementById('provImagePrompt');
                const zn = document.getElementById('provImageZone');
                pv.src = ev.target.result; pv.classList.remove('hidden'); pr.classList.add('hidden'); zn.classList.add('has-image');
            };
            r.readAsDataURL(file);
        };
        window.openProviderModal = () => {
            if (isForcedProfileMode) return;
            if (!userProfile) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            document.getElementById('provServiceTitle').value = '';
            document.getElementById('provProviderName').value = userProfile.fullName || '';
            document.getElementById('provDistrict').value = userProfile.district || '';
            document.getElementById('provUpazila').value = userProfile.upazila || '';
            document.getElementById('provPhone').value = userProfile.phone || '';
            document.getElementById('provWebsite').value = '';
            document.getElementById('provWhatsapp').value = '';
            document.getElementById('provFacebook').value = '';
            document.getElementById('provServiceDetails').value = '';
            document.getElementById('provDescCount').textContent = '0';
            document.getElementById('provImagePreview').classList.add('hidden');
            document.getElementById('provImagePrompt').classList.remove('hidden');
            document.getElementById('provImageZone').classList.remove('has-image');
            document.getElementById('provImageInput').value = '';
            selectedProviderImage = null;
            document.getElementById('provVideoUrl').value = '';
            setProviderMediaType('image');
            const desc = document.getElementById('provServiceDetails');
            desc.oninput = () => { document.getElementById('provDescCount').textContent = desc.value.length; };
            updateProviderCooldownUI();
            document.getElementById('providerModal').classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closeProviderModal = () => {
            document.getElementById('providerModal').classList.add('hidden');
            document.getElementById('providerForm').reset();
            document.getElementById('provImagePreview').classList.add('hidden');
            document.getElementById('provImagePrompt').classList.remove('hidden');
            document.getElementById('provImageZone').classList.remove('has-image');
            selectedProviderImage = null;
            document.getElementById('provVideoUrl').value = '';
            setProviderMediaType('image');
            document.body.classList.remove('overflow-hidden');
        };
        function updateProviderCooldownUI() {
            const rate = checkRateLimit('provider');
            const textEl = document.getElementById('providerCooldownText');
            const btn = document.getElementById('providerSubmitBtn');
            if (!textEl || !btn) return;
            if (!rate.allowed) {
                textEl.classList.remove('hidden');
                textEl.querySelector('span').textContent = `পরবর্তী আবেদনের জন্য ${rate.remaining} সেকেন্ড অপেক্ষা করুন`;
                btn.disabled = true; btn.classList.add('opacity-60', 'cursor-not-allowed');
            } else {
                textEl.classList.add('hidden'); btn.disabled = false; btn.classList.remove('opacity-60', 'cursor-not-allowed');
            }
        }
        window.handleProviderSubmit = async (e) => {
            e.preventDefault();
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const rate = checkRateLimit('provider');
            if (!rate.allowed) return showToast(`${rate.remaining} সেকেন্ড অপেক্ষা করুন`, 'clock', 'text-amber-400');
            const title = document.getElementById('provServiceTitle').value.trim();
            const providerName = document.getElementById('provProviderName').value.trim();
            const district = document.getElementById('provDistrict').value.trim();
            const upazila = document.getElementById('provUpazila').value.trim();
            const phone = document.getElementById('provPhone').value.trim();
            const website = document.getElementById('provWebsite').value.trim();
            const whatsapp = document.getElementById('provWhatsapp').value.trim();
            const facebook = document.getElementById('provFacebook').value.trim();
            const details = document.getElementById('provServiceDetails').value.trim();
            if (title.length < 3) return showToast('সেবার নাম কমপক্ষে ৩ অক্ষর', 'circle-x', 'text-rose-400');
            if (providerName.length < 2) return showToast('সঠিক নাম দিন', 'circle-x', 'text-rose-400');
            if (!/^01[3-9]\d{8}$/.test(phone)) return showToast('সঠিক মোবাইল নম্বর দিন', 'circle-x', 'text-rose-400');
            if (!district) return showToast('জেলা নির্বাচন করুন', 'circle-x', 'text-rose-400');
            if (!upazila) return showToast('উপজেলা নির্বাচন করুন', 'circle-x', 'text-rose-400');
            if (details.length < 10) return showToast('বিস্তারিত কমপক্ষে ১০ অক্ষর', 'circle-x', 'text-rose-400');
            if (website && !/^https?:\/\//i.test(website)) return showToast('ওয়েবসাইট লিংক http/https দিয়ে শুরু করুন', 'circle-x', 'text-rose-400');
            if (facebook && !/^https?:\/\//i.test(facebook)) return showToast('Facebook লিংক http/https দিয়ে শুরু করুন', 'circle-x', 'text-rose-400');
            const mediaType = getProviderMediaType();
            let videoUrl = '';
            if (mediaType === 'video') {
                videoUrl = (document.getElementById('provVideoUrl').value || '').trim();
                if (!videoUrl) return showToast(t('prov.videoRequired'), 'circle-x', 'text-rose-400');
                if (!/^https?:\/\//i.test(videoUrl) || !aeParseVideo(videoUrl)) return showToast(t('prov.videoInvalid'), 'circle-x', 'text-rose-400');
            }
            const btn = document.getElementById('providerSubmitBtn');
            btn.disabled = true;
            try {
                if (mediaType === 'video' && aeParseVideo(videoUrl).type === 'direct') {
                    btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> ' + t('prov.videoChecking'); refreshIcons();
                    const chk = await checkProviderVideoResolution(videoUrl);
                    if (!chk.ok || !chk.w || !chk.h) return showToast(t('prov.videoMeta'), 'circle-x', 'text-rose-400');
                    if (chk.w !== 1920 || chk.h !== 1080) return showToast(t('prov.videoRes'), 'circle-x', 'text-rose-400');
                }
                let imageUrl = '';
                if (mediaType === 'image' && selectedProviderImage) {
                    btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> ছবি আপলোড...'; refreshIcons();
                    imageUrl = await uploadToCloudinary(selectedProviderImage);
                }
                btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> পাঠানো হচ্ছে...'; refreshIcons();
                await addDoc(collection(db, 'providerApplications'), {
                    title, providerName, district, upazila, location: `${upazila}, ${district}`,
                    phone, website: website || '', whatsapp: whatsapp || '', facebook: facebook || '',
                    details, description: details,
                    mediaType, image: imageUrl, imageUrl: imageUrl, videoUrl: videoUrl,
                    applicantName: providerName, applicantEmail: userProfile?.email || '', applicantUid: currentUser.uid,
                    status: 'pending', createdAt: serverTimestamp()
                });
                setRateLimit('provider');
                showToast('আবেদন জমা হয়েছে! অ্যাডমিন অনুমোদনের অপেক্ষায়।', 'circle-check', 'text-emerald-400');
                closeProviderModal();
            } catch (err) {
                showToast('জমা ব্যর্থ: ' + (err.code || err.message), 'circle-x', 'text-rose-400');
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> আবেদন জমা দিন';
                refreshIcons();
            }
        };

        // ========== FEEDBACK ==========
        window.openFeedbackModal = () => {
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            document.getElementById('feedbackForm').reset();
            updateFeedbackCooldownUI();
            document.getElementById('feedbackModal').classList.remove('hidden');
            document.getElementById('feedbackModal').classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closeFeedbackModal = () => {
            document.getElementById('feedbackModal').classList.add('hidden');
            document.getElementById('feedbackModal').classList.remove('flex');
            document.getElementById('feedbackForm').reset();
            document.body.classList.remove('overflow-hidden');
        };
        function updateFeedbackCooldownUI() {
            const rate = checkRateLimit('feedback');
            const t = document.getElementById('feedbackCooldownText');
            const b = document.getElementById('feedbackSubmitBtn');
            if (!t || !b) return;
            if (!rate.allowed) { t.classList.remove('hidden'); t.querySelector('span').textContent = `${rate.remaining} সেকেন্ড অপেক্ষা করুন`; b.disabled = true; b.classList.add('opacity-60'); }
            else { t.classList.add('hidden'); b.disabled = false; b.classList.remove('opacity-60'); }
        }
        window.handleFeedbackSubmit = async (e) => {
            e.preventDefault();
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            if (!firebaseReady) return showToast('Firebase কনফিগার হয়নি', 'triangle-alert', 'text-rose-400');
            const rate = checkRateLimit('feedback');
            if (!rate.allowed) return showToast(`${rate.remaining} সেকেন্ড অপেক্ষা করুন`, 'clock', 'text-amber-400');
            const type = document.getElementById('feedbackType').value;
            const subject = document.getElementById('feedbackSubject').value.trim();
            const message = document.getElementById('feedbackMessage').value.trim();
            const btn = document.getElementById('feedbackSubmitBtn');
            btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> পাঠানো হচ্ছে...'; refreshIcons();
            try {
                await addDoc(collection(db, 'feedback'), {
                    type, subject, message, uid: currentUser.uid, name: userProfile?.fullName || '',
                    email: userProfile?.email || '', phone: userProfile?.phone || '', status: 'pending', createdAt: serverTimestamp()
                });
                setRateLimit('feedback');
                showToast('পাঠানো হয়েছে! ধন্যবাদ।', 'check-circle', 'text-emerald-400');
                closeFeedbackModal();
            } catch (err) { showToast('ব্যর্থ: ' + (err.code || err.message), 'circle-x', 'text-rose-400'); }
            finally { btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> পাঠান'; refreshIcons(); }
        };

        // ========== RESULT MODAL ==========
        const RESULT_URL = 'https://result.bteb.gov.bd/result-search';
        let resultLoaderTimer = null;
        window.openResultModal = () => {
            if (isForcedProfileMode) return;
            const m = document.getElementById('resultModal');
            const f = document.getElementById('resultFrame');
            const loader = document.getElementById('resultLoader');
            loader.classList.remove('hidden');
            if (!f.getAttribute('src')) {
                f.onload = () => { loader.classList.add('hidden'); clearTimeout(resultLoaderTimer); };
                f.src = RESULT_URL;
            } else { loader.classList.add('hidden'); }
            clearTimeout(resultLoaderTimer);
            resultLoaderTimer = setTimeout(() => loader.classList.add('hidden'), 12000);
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closeResultModal = () => {
            const m = document.getElementById('resultModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };
        window.downloadResultPdf = () => {
            // Cross-site page: browser cannot read its content, so open it and guide the user to Save as PDF
            window.open(RESULT_URL, '_blank', 'noopener');
            showToast('রেজাল্ট দেখার পর ব্রাউজার মেনু থেকে Print → Save as PDF চাপুন', 'file-down', 'text-emerald-400');
        };
        document.getElementById('resultModal')?.addEventListener('click', (e) => { if (e.target.id === 'resultModal') closeResultModal(); });

        // ========== ABOUT/TERMS ==========
        window.openAboutModal = () => { if (isForcedProfileMode) return; document.getElementById('aboutModal').classList.remove('hidden'); document.getElementById('aboutModal').classList.add('flex'); document.body.classList.add('overflow-hidden'); refreshIcons(); };
        window.closeAboutModal = () => { document.getElementById('aboutModal').classList.add('hidden'); document.getElementById('aboutModal').classList.remove('flex'); document.body.classList.remove('overflow-hidden'); };
        window.openTermsModal = () => { if (isForcedProfileMode) return; document.getElementById('termsModal').classList.remove('hidden'); document.getElementById('termsModal').classList.add('flex'); document.body.classList.add('overflow-hidden'); refreshIcons(); };
        window.closeTermsModal = () => { document.getElementById('termsModal').classList.add('hidden'); document.getElementById('termsModal').classList.remove('flex'); document.body.classList.remove('overflow-hidden'); };
        
        window.openPremiumActionModal = () => {
            if (!isPremiumSystemLive()) return showToast('প্রিমিয়াম সাবস্ক্রিপশন বর্তমানে উপলব্ধ নয়', 'crown', 'text-slate-400');
            if (isForcedProfileMode) return;
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            const m = document.getElementById('premiumActionModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closePremiumActionModal = () => {
            const m = document.getElementById('premiumActionModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };

        ['feedbackModal', 'aboutModal', 'termsModal', 'providerModal', 'categoryModal', 'userEmergencyRequestModal', 'userBloodRequestModal', 'premiumActionModal', 'contactModal', 'ratingModal'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', (e) => {
                if (e.target.id === id) {
                    if (id === 'feedbackModal') closeFeedbackModal();
                    else if (id === 'aboutModal') closeAboutModal();
                    else if (id === 'termsModal') closeTermsModal();
                    else if (id === 'providerModal') closeProviderModal();
                    else if (id === 'categoryModal') closeCategoryModal();
                    else if (id === 'userEmergencyRequestModal') closeUserEmergencyRequestModal();
                    else if (id === 'userBloodRequestModal') closeUserBloodRequestModal();
                    else if (id === 'premiumActionModal') closePremiumActionModal();
                    else if (id === 'contactModal') closeContactModal();
                    else if (id === 'ratingModal') closeRatingModal();
                }
            });
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeNoticeModal(); closeFeedbackModal(); closeAboutModal(); closeTermsModal(); closeResultModal();
                closeProviderModal(); closeCategoryModal(); closeEditProfileModal();
                closeSidebar(); closeNotifPanel(); closeServiceDetailModal();
                closeUserEmergencyRequestModal();
                closeUserBloodRequestModal();
                closePremiumActionModal();
                closePromotionFormModal();
                closeContactModal();
                closeRatingModal();
                closeChangePasswordModal();
                closeChatInfoModal();
            }
        });

        // ========== CATEGORY MODAL ==========
        window.openCategoryModal = () => {
            if (isForcedProfileMode) return;
            const searchInput = document.getElementById('modalCategorySearch');
            if (searchInput) searchInput.value = '';
            document.getElementById('categoryModal').classList.remove('hidden');
            renderModalCategories(categories);
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closeCategoryModal = () => { document.getElementById('categoryModal').classList.add('hidden'); document.body.classList.remove('overflow-hidden'); };
        function renderModalCategories(list) {
            if (isForcedProfileMode) return;
            const c = document.getElementById('modalCategoriesList');
            if (!c) return;
            if (!list.length) { c.innerHTML = '<div class="col-span-full text-center py-8 text-slate-400 text-xs">কোনো ক্যাটাগরি নেই।</div>'; refreshIcons(); return; }
            c.innerHTML = list.map(cat => {
                const icon = faToLucide(cat.icon);
                return `<button onclick="selectCategoryFromModal('${esc(cat.id)}')" class="p-3 rounded-2xl border text-left transition flex items-center gap-2.5 ${activeCategory === cat.id ? 'is-active bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold shadow-lg shadow-emerald-600/20' : 'is-inactive bg-[#07140e] border-emerald-900/40 text-slate-200 hover:border-emerald-600/60 font-medium'}">
                    <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${activeCategory === cat.id ? 'bg-gradient-to-br from-emerald-600 to-emerald-600 text-white' : 'bg-emerald-950/60 text-emerald-400'}"><i data-lucide="${esc(icon)}" class="w-3.5 h-3.5"></i></div>
                    <span class="text-xs truncate">${esc(cat.name)}</span>
                </button>`;
            }).join('');
            refreshIcons();
        }
        window.filterModalCategories = () => {
            if (isForcedProfileMode) return;
            const q = document.getElementById('modalCategorySearch').value.toLowerCase().trim();
            renderModalCategories(categories.filter(c => (c.name || '').toLowerCase().includes(q)));
        };
        window.selectCategoryFromModal = (id) => { if (isForcedProfileMode) return; filterCategory(id); closeCategoryModal(); };

        // ========== REALTIME LISTENERS ==========
        function attachRealtimeListeners() {
            if (!firebaseReady) return;
            if (currentUser) attachAppSettingsListener();
            if (unsubPromotions) unsubPromotions();
            unsubPromotions = onSnapshot(query(collection(db, 'promotions'), where('status', '==', 'approved')), snap => {
                promotionsCache = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                lastActivePromoCount = getActivePromotions().length;
                if (typeof renderServices === 'function' && servicesFirstLoadDone) renderServices(true);
            }, err => console.warn('promotions listener:', err.code || err.message));

            if (unsubCategories) unsubCategories();
            unsubCategories = onSnapshot(collection(db, 'categories'), snap => {
                const adminCats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                categories = [{ id: 'all', name: 'সকল সেবা', icon: 'fa-border-all' }, ...adminCats];
                renderCategoryChips();
                // Category in-app notification disabled (too noisy for users)
                // if (currentUser) {
                //     trackCollectionUpdates('categories', categories, (item) => {
                //         addNotification({ id: `cat-${item.id}`, type: 'category', title: 'নতুন ক্যাটাগরি যোগ হয়েছে', body: item.name || 'নতুন ক্যাটাগরি', icon: 'layers' });
                //     });
                // }
            }, err => console.warn('categories listener:', err.code || err.message));

            if (unsubEmergency) unsubEmergency();
            unsubEmergency = onSnapshot(collection(db, 'emergency'), snap => {
                emergencyList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                renderEmergency();
                // Emergency number in-app notification disabled (too noisy for users)
                // if (currentUser) {
                //     trackCollectionUpdates('emergency', emergencyList, (item) => {
                //         addNotification({ id: `emg-${item.id}`, type: 'emergency', title: 'নতুন জরুরি নম্বর', body: `${item.title || ''} — ${item.number || ''}`, icon: 'phone-call' });
                //     });
                // }
            }, err => console.warn('emergency listener:', err.code || err.message));

            if (unsubBlood) unsubBlood();
            unsubBlood = onSnapshot(collection(db, 'bloodDonors'), snap => {
                bloodDonors = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                filterBloodDonors();
            }, err => console.warn('blood listener:', err.code || err.message));

            if (unsubNotices) unsubNotices();
            unsubNotices = onSnapshot(collection(db, 'notices'), snap => {
                notices = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                renderNotices();
                if (currentUser) {
                    trackCollectionUpdates('notices', notices, (item) => {
                        addNotification({ id: `ntc-${item.id}`, type: 'notice', title: 'নতুন নোটিশ প্রকাশিত', body: item.title || item.heading || 'নতুন ঘোষণা', icon: 'megaphone', clickAction: 'home' });
                    });
                }
            }, err => console.warn('notices listener:', err.code || err.message));

            if (unsubscribeAdminStatus) unsubscribeAdminStatus();
            unsubscribeAdminStatus = onSnapshot(doc(db, 'adminStatus', 'current'), (snap) => {
                if (snap.exists()) {
                    const data = snap.data();
                    const lastSeen = data.lastSeen?.toDate?.() || null;
                    isAdminOnline = data.online === true && lastSeen && (Date.now() - lastSeen.getTime() < 5 * 60 * 1000);
                    mesesuAdminLastSeenMs = lastSeen ? lastSeen.getTime() : 0;
                    updateAdminStatus(isAdminOnline, lastSeen);
                    try { if (currentTab === 'chat' && mesesuMode === 'admin') renderChatMessages({ keepScroll: true }); } catch (e) {}
                } else { isAdminOnline = false; updateAdminStatus(false, null); }
            }, (err) => { isAdminOnline = false; updateAdminStatus(false, null); });
        }


        // ========== CHANGE PASSWORD ==========
        window.openChangePasswordModal = () => {
            if (!currentUser) return showToast('প্রথমে লগইন করুন', 'circle-x', 'text-rose-400');
            document.getElementById('changePasswordForm').reset();
            const m = document.getElementById('changePasswordModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closeChangePasswordModal = () => {
            const m = document.getElementById('changePasswordModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };
        window.handleChangePassword = async (e) => {
            e.preventDefault();
            if (!currentUser || !firebaseReady) return showToast('লগইন নেই', 'circle-x', 'text-rose-400');
            const oldPass = document.getElementById('oldPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmNewPassword').value;
            if (newPass.length < 6) return showToast('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে', 'circle-x', 'text-rose-400');
            if (newPass !== confirmPass) return showToast('নতুন পাসওয়ার্ড মিলছে না', 'circle-x', 'text-rose-400');
            const btn = document.getElementById('changePasswordBtn');
            btn.disabled = true;
            btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> অপেক্ষা করুন...';
            refreshIcons();
            try {
                const cred = EmailAuthProvider.credential(currentUser.email, oldPass);
                await reauthenticateWithCredential(currentUser, cred);
                await updatePassword(currentUser, newPass);
                closeChangePasswordModal();
                showToast('পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!', 'circle-check', 'text-emerald-400');
            } catch (err) {
                console.error(err);
                let msg = 'পাসওয়ার্ড পরিবর্তন ব্যর্থ';
                if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') msg = 'পুরনো পাসওয়ার্ড ভুল';
                else if (err.code === 'auth/too-many-requests') msg = 'অনেকবার চেষ্টা করেছেন, কিছুক্ষণ পর চেষ্টা করুন';
                else if (err.code === 'auth/requires-recent-login') msg = 'আবার লগইন করে চেষ্টা করুন';
                showToast(msg, 'circle-x', 'text-rose-400');
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> পাসওয়ার্ড পরিবর্তন করুন';
                refreshIcons();
            }
        };

        // ========== CHAT INFO MODAL ==========
        window.openChatInfoModal = () => {
            const m = document.getElementById('chatInfoModal');
            m.classList.remove('hidden'); m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            refreshIcons();
        };
        window.closeChatInfoModal = () => {
            const m = document.getElementById('chatInfoModal');
            m.classList.add('hidden'); m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };



        // ========== DOWNLOAD APP SYSTEM (App Store style + real streamed progress) ==========
        let mainAppDownloadLink = '';
        const AE_APK_PATH = '/downloads/amar-elaka.apk';   // একই ডোমেইনে APK
        const AE_APK_NAME = 'Amar-Elaka.apk';
        const AE_APK_FALLBACK_BYTES = 50 * 1024 * 1024;     // Content-Length না পেলে
        const AE_APP_VERSION = '1.0';
        let aeApkBusy = false, aeApkTotal = 0, aeApkSizeKnown = false;
        const aeL = (bn, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : bn;
        const aeMB = b => (b / 1048576).toFixed(1) + ' MB';
        const aeApkUrl = () => {
            const u = mainAppDownloadLink || window.__appDownloadUrl || '';
            return (typeof u === 'string' && (u.startsWith('/') || u.startsWith(location.origin))) ? u : AE_APK_PATH;
        };
        function aeApplyPageTexts() {
            const m = document.getElementById('downloadAppModal'); if (!m) return;
            m.querySelectorAll('[data-bn]').forEach(el => { el.textContent = aeL(el.dataset.bn, el.dataset.en); });
            const v = document.getElementById('apVer'); if (v) v.textContent = AE_APP_VERSION;
            if (!aeApkBusy) { const g = document.getElementById('apGetT'); if (g) g.textContent = aeL('ডাউনলোড', 'Download'); }
        }
        async function aeLoadApkSize() {
            if (aeApkSizeKnown) return;
            try {
                const r = await fetch(aeApkUrl(), { method: 'HEAD', cache: 'no-store' });
                const n = parseInt(r.headers.get('Content-Length'), 10);
                if (r.ok && n > 0) { aeApkTotal = n; aeApkSizeKnown = true; }
            } catch (e) {}
            const el = document.getElementById('apSize');
            if (el) el.textContent = aeApkSizeKnown ? aeMB(aeApkTotal) : '~' + Math.round(AE_APK_FALLBACK_BYTES / 1048576) + ' MB';
        }
        window.openDownloadAppModal = () => {
            const m = document.getElementById('downloadAppModal'); if (!m) return;
            m.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            try { if (typeof closeSidebar === 'function') closeSidebar(); } catch (e) {}
            aeApplyPageTexts(); aeLoadApkSize();
            if (typeof refreshIcons === 'function') refreshIcons();
        };
        window.closeDownloadAppModal = () => {
            const m = document.getElementById('downloadAppModal'); if (!m) return;
            m.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        };
        // পুল-টু-রিফ্রেশ সম্পূর্ণ বন্ধ: ডাউনলোড পেজ খোলা থাকলে উপরে টেনে নামালে রিফ্রেশ হবে না
        (function aeBlockPullRefresh() {
            let y0 = 0;
            document.addEventListener('touchstart', e => { if (e.touches.length === 1) y0 = e.touches[0].clientY; }, { passive: true });
            document.addEventListener('touchmove', e => {
                const m = document.getElementById('downloadAppModal');
                if (!m || m.classList.contains('hidden')) return;
                const dy = e.touches[0].clientY - y0;
                if (dy > 0 && m.scrollTop <= 0 && e.cancelable) e.preventDefault();
            }, { passive: false });
        })();
        window.closeOtherDownloadSources = () => {};
        window.handleMainAppDownload = () => { openDownloadAppModal(); };
        window.aeShareApp = async () => {
            const d = { title: 'আমার এলাকা', text: aeL('আমার এলাকা অ্যাপ ডাউনলোড করুন', 'Download the Amar Elaka app'), url: location.origin };
            try {
                if (navigator.share) await navigator.share(d);
                else if (navigator.clipboard) { await navigator.clipboard.writeText(d.url); showToast(aeL('লিংক কপি হয়েছে', 'Link copied')); }
            } catch (e) {}
        };
        function aeDock(on, err) {
            const d = document.getElementById('apDock'); if (!d) return;
            d.classList.toggle('show', on); d.classList.toggle('err', !!err);
        }
        function aeRender(loaded, total, speed) {
            const pct = total ? Math.min(100, loaded / total * 100) : 0, p1 = pct.toFixed(1) + '%';
            const $ = id => document.getElementById(id);
            $('apBar').style.width = pct + '%';
            $('apPct').textContent = Math.floor(pct) + '%';
            $('apTrack').setAttribute('aria-valuenow', Math.floor(pct));
            $('apDone').textContent = aeMB(loaded);
            $('apLeft').textContent = aeMB(Math.max(0, total - loaded));
            if (speed != null) {
                $('apSpd').textContent = speed > 0 ? (speed / 1048576).toFixed(1) + ' MB/s' : '—';
                const sec = speed > 0 ? Math.ceil((total - loaded) / speed) : 0;
                $('apEta').textContent = speed > 0 ? (sec >= 60 ? Math.floor(sec / 60) + aeL(' মি ', 'm ') + (sec % 60) + aeL(' সে', 's') : sec + aeL(' সে', 's')) : '—';
            }
            $('apDF').style.width = pct + '%'; $('apT1').textContent = p1; $('apT2').textContent = p1;
            $('apT2').style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
        }
        function aeFail(msg) {
            aeApkBusy = false; aeDock(false);
            const $ = id => document.getElementById(id);
            $('apGet').disabled = false; $('apGetT').textContent = aeL('আবার চেষ্টা করুন', 'Try again');
            $('apLive').className = 'ap-card ap-live show fail';
            $('apState').textContent = aeL('ব্যর্থ', 'Failed');
            $('apEr').innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-x-circle"/></svg> <b>' + aeL('ডাউনলোড ব্যর্থ হয়েছে', 'Download failed') + '</b><br>' + msg +
                '<br><a href="' + aeApkUrl() + '" download>' + aeL('সরাসরি ডাউনলোড লিংক (প্রগ্রেস ছাড়া)', 'Direct download link (no progress)') + '</a>';
        }
        window.aeStartApkDownload = async () => {
            if (aeApkBusy) return;
            aeApkBusy = true;
            const $ = id => document.getElementById(id);
            $('apGet').disabled = true; $('apGetT').textContent = aeL('ডাউনলোড চলছে…', 'Downloading…');
            $('apLive').className = 'ap-card ap-live show';
            $('apState').textContent = aeL('সংযোগ হচ্ছে…', 'Connecting…');
            const guess = aeApkTotal || AE_APK_FALLBACK_BYTES;
            aeRender(0, guess, 0); aeDock(true);
            try {
                const res = await fetch(aeApkUrl(), { cache: 'no-store' });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                if (!res.body || !res.body.getReader) throw new Error('NO_STREAM');
                let total = parseInt(res.headers.get('Content-Length'), 10);
                if (!total || isNaN(total)) total = guess;
                aeApkTotal = total; aeApkSizeKnown = true; $('apSize').textContent = aeMB(total);
                $('apState').textContent = aeL('ডাউনলোড হচ্ছে…', 'Downloading…');
                const rd = res.body.getReader(), chunks = []; let loaded = 0, lastT = performance.now(), lastB = 0, speed = 0;
                for (;;) {
                    const r = await rd.read(); if (r.done) break;
                    chunks.push(r.value); loaded += r.value.length;
                    const now = performance.now();
                    if (now - lastT > 400) { speed = (loaded - lastB) / ((now - lastT) / 1000); lastT = now; lastB = loaded; }
                    aeRender(loaded, Math.max(total, loaded), speed);
                }
                aeRender(loaded, loaded, 0); $('apEta').textContent = '0';
                const blob = new Blob(chunks, { type: 'application/vnd.android.package-archive' });
                if (blob.size < 1048576) throw new Error('BAD_FILE');
                const url = URL.createObjectURL(blob), a = document.createElement('a');
                a.href = url; a.download = AE_APK_NAME; document.body.appendChild(a); a.click(); a.remove();
                setTimeout(() => URL.revokeObjectURL(url), 60000);
                aeApkBusy = false; $('apGet').disabled = false; $('apGetT').textContent = aeL('আবার ডাউনলোড', 'Download again');
                $('apLive').className = 'ap-card ap-live show done';
                $('apState').textContent = aeL('সম্পন্ন', 'Completed');
                $('apOk').innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-check-circle"/></svg> <b>' + aeL('ডাউনলোড সম্পন্ন!', 'Download complete!') + '</b><br>' +
                    aeL('ফাইলটি খুলে Install করুন। প্রয়োজনে “Install unknown apps” অনুমতি দিন।', 'Open the file and tap Install. Allow “Install unknown apps” if asked.');
                setTimeout(() => aeDock(false), 3500);
            } catch (e) {
                const m = String(e && e.message || e);
                aeFail(m === 'NO_STREAM' ? aeL('আপনার ব্রাউজার লাইভ প্রগ্রেস সমর্থন করে না।', 'Your browser does not support live progress.') :
                       m.indexOf('HTTP') === 0 ? aeL('সার্ভার থেকে ফাইল পাওয়া যায়নি (' + m + ').', 'File not found on server (' + m + ').') :
                       m === 'BAD_FILE' ? aeL('ফাইলটি সম্পূর্ণ আসেনি, আবার চেষ্টা করুন।', 'The file was incomplete, please retry.') :
                       aeL('ইন্টারনেট সংযোগ বিচ্ছিন্ন হয়েছে বা সার্ভার অনুরোধ আটকে দিয়েছে।', 'Connection lost or the server blocked the request.'));
            }
        };
        // Admin settings (appSettings) থেকে একই-ডোমেইন লিংক এলে সেটি ব্যবহার হবে
        function applyDownloadConfigFromSettings(data) {
            if (!data) return;
            const u = data.appDownloadUrl || data.downloadAppUrl || data.mainDownloadLink;
            if (u) { mainAppDownloadLink = u; window.__appDownloadUrl = u; }
        }

        // ========== WEATHER v2 (WeatherAPI.com) — বাস্তবধর্মী ক্যানভাস অ্যানিমেশন + জেলা ভিত্তিক ডিফল্ট ==========
        const WEATHER_API_KEY = '26598531301d4ad2b4e170112262111';
        const WEATHER_BASE = 'https://api.weatherapi.com/v1';

        // ৬৪ জেলার সদরের সঠিক স্থানাঙ্ক (নাম দিয়ে সার্চ করলে ভুল জায়গা আসত, তাই lat/lon দিয়ে লোড হয়)
        const WX_DISTRICTS = {
            'ঢাকা':[23.8103,90.4125,'Dhaka'],'গাজীপুর':[23.9999,90.4203,'Gazipur'],'নারায়ণগঞ্জ':[23.6238,90.5000,'Narayanganj'],'নরসিংদী':[23.9322,90.7151,'Narsingdi'],
            'মানিকগঞ্জ':[23.8617,90.0003,'Manikganj'],'মুন্সিগঞ্জ':[23.5422,90.5305,'Munshiganj'],'রাজবাড়ী':[23.7574,89.6444,'Rajbari'],'ফরিদপুর':[23.6070,89.8429,'Faridpur'],
            'গোপালগঞ্জ':[23.0051,89.8266,'Gopalganj'],'মাদারীপুর':[23.1641,90.1896,'Madaripur'],'শরীয়তপুর':[23.2423,90.4348,'Shariatpur'],'কিশোরগঞ্জ':[24.4449,90.7766,'Kishoreganj'],
            'টাঙ্গাইল':[24.2513,89.9167,'Tangail'],'শেরপুর':[25.0204,90.0153,'Sherpur'],'ময়মনসিংহ':[24.7471,90.4203,'Mymensingh'],'জামালপুর':[24.9375,89.9372,'Jamalpur'],
            'নেত্রকোণা':[24.8708,90.7279,'Netrokona'],'চট্টগ্রাম':[22.3569,91.7832,'Chattogram'],'কুমিল্লা':[23.4607,91.1809,'Cumilla'],'ফেনী':[23.0159,91.3976,'Feni'],
            'ব্রাহ্মণবাড়িয়া':[23.9571,91.1115,'Brahmanbaria'],'রাঙ্গামাটি':[22.6567,92.1732,'Rangamati'],'নোয়াখালী':[22.8696,91.0995,'Noakhali'],'চাঁদপুর':[23.2333,90.6713,'Chandpur'],
            'লক্ষ্মীপুর':[22.9425,90.8412,'Lakshmipur'],'কক্সবাজার':[21.4272,92.0058,'Coxs Bazar'],'খাগড়াছড়ি':[23.1193,91.9847,'Khagrachhari'],'বান্দরবান':[22.1953,92.2184,'Bandarban'],
            'রাজশাহী':[24.3745,88.6042,'Rajshahi'],'চাঁপাইনবাবগঞ্জ':[24.5965,88.2775,'Chapainawabganj'],'নওগাঁ':[24.8078,88.9411,'Naogaon'],'নাটোর':[24.4206,89.0000,'Natore'],
            'পাবনা':[24.0064,89.2372,'Pabna'],'সিরাজগঞ্জ':[24.4534,89.7006,'Sirajganj'],'বগুড়া':[24.8465,89.3773,'Bogura'],'জয়পুরহাট':[25.0947,89.0945,'Joypurhat'],
            'খুলনা':[22.8456,89.5403,'Khulna'],'বাগেরহাট':[22.6602,89.7856,'Bagerhat'],'সাতক্ষীরা':[22.7185,89.0705,'Satkhira'],'যশোর':[23.1667,89.2081,'Jashore'],
            'ঝিনাইদহ':[23.5448,89.1539,'Jhenaidah'],'মাগুরা':[23.4873,89.4199,'Magura'],'নড়াইল':[23.1725,89.5126,'Narail'],'কুষ্টিয়া':[23.9013,89.1200,'Kushtia'],
            'চুয়াডাঙ্গা':[23.6402,88.8418,'Chuadanga'],'মেহেরপুর':[23.7622,88.6318,'Meherpur'],'বরিশাল':[22.7010,90.3535,'Barishal'],'ভোলা':[22.6859,90.6482,'Bhola'],
            'পটুয়াখালী':[22.3596,90.3299,'Patuakhali'],'পিরোজপুর':[22.5841,89.9720,'Pirojpur'],'ঝালকাঠি':[22.6406,90.1987,'Jhalokathi'],'বরগুনা':[22.1590,90.1256,'Barguna'],
            'সিলেট':[24.8949,91.8687,'Sylhet'],'মৌলভীবাজার':[24.4829,91.7774,'Moulvibazar'],'হবিগঞ্জ':[24.3740,91.4156,'Habiganj'],'সুনামগঞ্জ':[25.0658,91.3950,'Sunamganj'],
            'রংপুর':[25.7439,89.2752,'Rangpur'],'গাইবান্ধা':[25.3297,89.5430,'Gaibandha'],'কুড়িগ্রাম':[25.8054,89.6361,'Kurigram'],'লালমনিরহাট':[25.9923,89.2847,'Lalmonirhat'],
            'নীলফামারী':[25.9318,88.8560,'Nilphamari'],'ঠাকুরগাঁও':[26.0337,88.4617,'Thakurgaon'],'পঞ্চগড়':[26.3411,88.5541,'Panchagarh'],'দিনাজপুর':[25.6279,88.6332,'Dinajpur']
        };
        /* উপজেলা অনুযায়ী আবহাওয়ার স্থানাঙ্ক [অক্ষাংশ, দ্রাঘিমাংশ] — ডেটা: bd-geocode (নুহিল)। তালিকায় না থাকলে জেলা সদরের তথ্য দেখানো হয়। */
        const WX_UPAZILAS = {
            'ঢাকা':{'ধামরাই':[23.9390,90.1408],'দোহার':[23.6016,90.1084],'কেরানীগঞ্জ':[23.6943,90.3437],'নবাবগঞ্জ':[23.6724,90.1608],'সাভার':[23.8800,90.2806]},
            'গাজীপুর':{'গাজীপুর সদর':[24.0849,90.4248],'কালিয়াকৈর':[24.1022,90.2656],'কালীগঞ্জ':[23.9648,90.5552],'কাপাসিয়া':[24.1478,90.6005],'শ্রীপুর':[24.2058,90.4436]},
            'নারায়ণগঞ্জ':{'নারায়ণগঞ্জ সদর':[23.6127,90.4697],'আড়াইহাজার':[23.7643,90.6694],'বন্দর':[23.6409,90.5455],'রূপগঞ্জ':[23.8124,90.5400],'সোনারগাঁ':[23.6747,90.5943]},
            'নরসিংদী':{'নরসিংদী সদর':[23.8691,90.7080],'বেলাবো':[24.1015,90.8487],'মনোহরদী':[24.1608,90.7308],'পলাশ':[23.9564,90.6499],'রায়পুরা':[23.9619,90.8721],'শিবপুর':[24.0276,90.7470]},
            'মানিকগঞ্জ':{'মানিকগঞ্জ সদর':[23.8367,90.0300],'ঘিওর':[23.8744,89.9039],'দৌলতপুর':[23.9562,89.7986],'শিবালয়':[23.8384,89.8108],'সাটুরিয়া':[23.9585,90.0010],'সিঙ্গাইর':[23.7834,90.1540],'হরিরামপুর':[23.7207,89.9459]},
            'মুন্সিগঞ্জ':{'মুন্সিগঞ্জ সদর':[23.4875,90.5261],'গজারিয়া':[23.5472,90.6290],'লৌহজং':[23.4692,90.3435],'শ্রীনগর':[23.5464,90.2636],'সিরাজদিখান':[23.5976,90.3580],'টঙ্গীবাড়ী':[23.4748,90.4528]},
            'রাজবাড়ী':{'রাজবাড়ী সদর':[23.7172,89.6561],'গোয়ালন্দ':[23.7558,89.7652],'পাংশা':[23.7890,89.3878],'বালিয়াকান্দি':[23.6506,89.5517],'কালুখালী':[23.7419,89.4753]},
            'ফরিদপুর':{'ফরিদপুর সদর':[23.5974,89.8127],'আলফাডাঙ্গা':[23.2951,89.6703],'বোয়ালমারী':[23.3987,89.6924],'সদরপুর':[23.4984,90.0509],'নগরকান্দা':[23.4343,89.8956],'ভাঙ্গা':[23.3891,90.0100],'চরভদ্রাসন':[23.5901,89.9801],'মধুখালী':[23.5411,89.6111],'সালথা':[23.4180,89.8008]},
            'গোপালগঞ্জ':{'গোপালগঞ্জ সদর':[23.0606,89.8477],'কাশিয়ানী':[23.1913,89.7952],'কোটালীপাড়া':[23.0105,90.0202],'টুঙ্গিপাড়া':[22.9236,89.9022],'মুকসুদপুর':[23.2661,89.9158]},
            'মাদারীপুর':{'মাদারীপুর সদর':[23.1912,90.1784],'কালকিনি':[23.0670,90.2807],'রাজৈর':[23.2021,90.0386],'শিবচর':[23.3732,90.1760],'ডাসার':[23.0920,90.1607]},
            'শরীয়তপুর':{'শরীয়তপুর সদর':[23.2188,90.3167],'ডামুড্যা':[23.1399,90.4226],'নড়িয়া':[23.3058,90.4277],'ভেদরগঞ্জ':[23.2477,90.5136],'জাজিরা':[23.3656,90.3237],'গোসাইরহাট':[23.0817,90.4569]},
            'কিশোরগঞ্জ':{'কিশোরগঞ্জ সদর':[24.4260,90.7833],'অষ্টগ্রাম':[24.3236,91.1225],'বাজিতপুর':[24.2266,90.9485],'ভৈরব':[24.1022,90.9812],'হোসেনপুর':[24.4483,90.6634],'ইটনা':[24.5509,91.0841],'করিমগঞ্জ':[24.4543,90.8964],'কটিয়াদি':[24.2952,90.8208],'কুলিয়ারচর':[24.1531,90.8866],'মিঠামইন':[24.4331,91.1109],'নিকলী':[24.3383,90.9609],'পাকুন্দিয়া':[24.3215,90.6937],'তাড়াইল':[24.5509,90.8905]},
            'টাঙ্গাইল':{'টাঙ্গাইল সদর':[24.2596,89.8671],'বাসাইল':[24.2338,90.0402],'ভুঞাপুর':[24.4772,89.8159],'দেলদুয়ার':[24.1475,89.9390],'ঘাটাইল':[24.4737,90.0530],'গোপালপুর':[24.5724,89.9018],'কালিহাতী':[24.3597,89.9467],'মধুপুর':[24.6501,90.0623],'মির্জাপুর':[24.1181,90.1072],'নাগরপুর':[24.0506,89.8755],'সখীপুর':[24.3063,90.1749],'ধনবাড়ী':[24.6875,89.9335]},
            'চট্টগ্রাম':{'আনোয়ারা':[22.1976,91.8787],'বাঁশখালী':[22.0173,91.9381],'বোয়ালখালী':[22.3773,91.9662],'চন্দনাইশ':[22.2124,92.0645],'ফটিকছড়ি':[22.7555,91.7489],'হাটহাজারী':[22.5262,91.7978],'লোহাগাড়া':[21.9861,92.1120],'মীরসরাই':[22.8039,91.5476],'পটিয়া':[22.2931,91.9874],'রাঙ্গুনিয়া':[22.4662,92.0683],'রাউজান':[22.5197,91.9173],'সন্দ্বীপ':[22.5106,91.4579],'সীতাকুণ্ড':[22.5430,91.6569],'সাতকানিয়া':[22.1059,92.0595],'কর্ণফুলী':[22.2872,91.8460]},
            'কুমিল্লা':{'কুমিল্লা আদর্শ সদর':[23.4798,91.1567],'কুমিল্লা সদর দক্ষিণ':[23.3883,91.2022],'বরুড়া':[23.3569,91.0400],'ব্রাহ্মণপাড়া':[23.6470,91.0960],'বুড়িচং':[23.5352,91.1169],'চান্দিনা':[23.4463,90.9448],'চৌদ্দগ্রাম':[23.2218,91.2797],'দাউদকান্দি':[23.5029,90.7731],'দেবিদ্বার':[23.5797,90.9981],'হোমনা':[23.6800,90.8115],'লাকসাম':[23.2314,91.1049],'লালমাই':[23.2977,91.1594],'মনোহরগঞ্জ':[23.1385,91.0667],'মেঘনা':[23.6258,90.6902],'মুরাদনগর':[23.6781,90.9428],'নাঙ্গলকোট':[23.1403,91.2091],'তিতাস':[23.5909,90.7955]},
            'ফেনী':{'ফেনী সদর':[22.9907,91.4159],'ছাগলনাইয়া':[23.0202,91.5065],'দাগনভূঁইয়া':[22.9720,91.3000],'পরশুরাম':[23.2024,91.4385],'ফুলগাজী':[23.1185,91.4416],'সোনাগাজী':[22.8538,91.3969]},
            'ব্রাহ্মণবাড়িয়া':{'ব্রাহ্মণবাড়িয়া সদর':[23.9499,91.1159],'আখাউড়া':[23.8407,91.1902],'আশুগঞ্জ':[24.0181,91.0183],'কসবা':[23.7609,91.1313],'বাঞ্ছারামপুর':[23.7805,90.8073],'বিজয়নগর':[23.9915,91.2274],'নবীনগর':[23.8633,90.9797],'নাসিরনগর':[24.1823,91.1871],'সরাইল':[24.1025,91.1132]},
            'রাঙ্গামাটি':{'রাঙ্গামাটি সদর':[22.6451,92.2014],'বাঘাইছড়ি':[23.3828,92.2371],'বরকল':[22.8310,92.3461],'কাউখালী':[22.6235,92.0123],'বিলাইছড়ি':[22.2574,92.4831],'জুরাছড়ি':[22.5593,92.4555],'কাপ্তাই':[22.4624,92.2017],'লংগদু':[22.9701,92.2167],'নানিয়ারচর':[22.8337,92.0726],'রাজস্থলী':[22.3716,92.2446]},
            'নোয়াখালী':{'নোয়াখালী সদর':[22.8083,91.0487],'বেগমগঞ্জ':[22.9309,91.0943],'চাটখিল':[23.0533,90.9637],'কোম্পানীগঞ্জ':[22.7587,91.3008],'হাতিয়া':[22.3482,91.0914],'কবিরহাট':[22.8109,91.1993],'সেনবাগ':[22.9906,91.2127],'সোনাইমুড়ী':[23.0263,91.0778],'সুবর্ণচর':[22.6192,91.1564]},
            'চাঁদপুর':{'চাঁদপুর সদর':[23.2318,90.6514],'ফরিদগঞ্জ':[23.1442,90.7619],'হাইমচর':[23.0766,90.6172],'হাজীগঞ্জ':[23.2578,90.8375],'কচুয়া':[23.3593,90.8829],'মতলব উত্তর':[23.4101,90.6411],'মতলব দক্ষিণ':[23.3482,90.7473],'শাহরাস্তি':[23.2059,90.9569]},
            'লক্ষ্মীপুর':{'লক্ষ্মীপুর সদর':[22.9113,90.8439],'কমলনগর':[22.7574,90.8538],'রায়পুর':[23.0047,90.7315],'রামগঞ্জ':[23.0968,90.8727],'রামগতি':[22.6249,90.9222]},
            'কক্সবাজার':{'কক্সবাজার সদর':[21.4661,92.0156],'চকরিয়া':[21.7411,92.0517],'কুতুবদিয়া':[21.8380,91.8625],'উখিয়া':[21.2281,92.1153],'মহেশখালী':[21.6072,91.9196],'পেকুয়া':[21.8159,91.9447],'রামু':[21.4388,92.1204],'টেকনাফ':[20.9693,92.2371],'ঈদগাঁও':[21.5558,92.0592]},
            'খাগড়াছড়ি':{'খাগড়াছড়ি সদর':[23.1584,91.9983],'দীঘিনালা':[23.4158,92.0590],'লক্ষ্মীছড়ি':[22.7836,91.9311],'মহালছড়ি':[22.9835,92.0495],'মানিকছড়ি':[22.8519,91.8268],'মাটিরাঙ্গা':[23.1627,91.8549],'পানছড়ি':[23.3422,91.9246],'রামগড়':[22.9540,91.7761],'গুইমারা':[22.9582,91.9226]},
            'বান্দরবান':{'বান্দরবান সদর':[22.0655,92.2327],'আলীকদম':[21.5962,92.4034],'লামা':[21.8103,92.2116],'নাইক্ষ্যংছড়ি':[21.4714,92.2430],'রোয়াংছড়ি':[22.1994,92.3519],'রুমা':[22.0078,92.4486],'থানচি':[21.6426,92.5333]},
            'রাজশাহী':{'বাগমারা':[24.5936,88.8092],'বাঘা':[24.2059,88.8340],'চারঘাট':[24.3012,88.7751],'দুর্গাপুর':[24.4683,88.7609],'গোদাগাড়ী':[24.4831,88.4149],'মোহনপুর':[24.5548,88.6408],'পবা':[24.3381,88.5907],'পুঠিয়া':[24.4115,88.8274],'তানোর':[24.6199,88.5309]},
            'চাঁপাইনবাবগঞ্জ':{'চাঁপাইনবাবগঞ্জ সদর':[24.5653,88.2581],'ভোলাহাট':[24.8972,88.2095],'গোমস্তাপুর':[24.8586,88.3554],'নাচোল':[24.7271,88.3963],'শিবগঞ্জ':[24.7050,88.1549]},
            'নওগাঁ':{'নওগাঁ সদর':[24.8120,88.8980],'আত্রাই':[24.6248,88.9891],'বদলগাছী':[24.9675,88.9425],'ধামইরহাট':[25.1305,88.8242],'মহাদেবপুর':[24.9218,88.7637],'মান্দা':[24.7463,88.7120],'নিয়ামতপুর':[24.8305,88.5502],'পত্নীতলা':[25.0775,88.7146],'পোরশা':[24.9950,88.5174],'রাণীনগর':[24.7117,89.0201],'সাপাহার':[25.1194,88.5307]},
            'নাটোর':{'নাটোর সদর':[24.3971,88.9900],'বড়াইগ্রাম':[24.2732,89.1500],'বাগাতিপাড়া':[24.3133,88.9479],'গুরুদাসপুর':[24.3737,89.2054],'লালপুর':[24.1998,88.9857],'সিংড়া':[24.5244,89.1843],'নলডাঙ্গা':[24.5060,88.9756]},
            'পাবনা':{'পাবনা সদর':[23.9949,89.2811],'আটঘরিয়া':[24.1074,89.2827],'বেড়া':[23.9425,89.6572],'ভাঙ্গুড়া':[24.2389,89.3964],'চাটমোহর':[24.2241,89.3032],'ঈশ্বরদী':[24.0802,89.0943],'ফরিদপুর':[24.1581,89.4495],'সুজানগর':[23.8978,89.5140],'সাঁথিয়া':[24.0434,89.5159]},
            'সিরাজগঞ্জ':{'সিরাজগঞ্জ সদর':[24.4943,89.6896],'বেলকুচি':[24.2979,89.7015],'চৌহালী':[24.1394,89.7574],'কামারখন্দ':[24.3775,89.6423],'কাজীপুর':[24.6716,89.6889],'রায়গঞ্জ':[24.4922,89.5153],'শাহজাদপুর':[24.1630,89.6307],'তাড়াশ':[24.4454,89.3578],'উল্লাপাড়া':[24.3278,89.5182]},
            'বগুড়া':{'বগুড়া সদর':[24.8954,89.3561],'আদমদীঘি':[24.8001,89.0597],'ধুনট':[24.6826,89.5502],'দুপচাঁচিয়া':[24.8824,89.1398],'গাবতলী':[24.8872,89.4648],'কাহালু':[24.8325,89.2514],'নন্দীগ্রাম':[24.6812,89.2272],'শাজাহানপুর':[24.7602,89.3756],'সারিয়াকান্দি':[24.8789,89.6166],'শেরপুর':[24.6287,89.4226],'শিবগঞ্জ':[25.0168,89.3065],'সোনাতলা':[24.9974,89.5142]},
            'জয়পুরহাট':{'জয়পুরহাট সদর':[25.1077,89.0215],'আক্কেলপুর':[24.9335,89.0420],'কালাই':[25.0781,89.1988],'ক্ষেতলাল':[25.0234,89.1177],'পাঁচবিবি':[25.2050,89.0719]},
            'খুলনা':{'বটিয়াঘাটা':[22.7133,89.5149],'দাকোপ':[22.2420,89.5264],'ডুমুরিয়া':[22.8058,89.3980],'দিঘলিয়া':[22.9215,89.5538],'কয়রা':[22.0779,89.3951],'পাইকগাছা':[22.5901,89.3402],'ফুলতলা':[22.9483,89.4542],'রূপসা':[22.8192,89.6362],'তেরখাদা':[22.9140,89.6551]},
            'বাগেরহাট':{'বাগেরহাট সদর':[22.6761,89.7627],'চিতলমারী':[22.8111,89.8653],'ফকিরহাট':[22.7426,89.6661],'কচুয়া':[22.6521,89.8739],'মোল্লাহাট':[22.8842,89.7730],'মোংলা':[22.1165,89.6597],'মোড়েলগঞ্জ':[22.4833,89.8342],'রামপাল':[22.5903,89.6514],'শরণখোলা':[22.0631,89.8217]},
            'সাতক্ষীরা':{'সাতক্ষীরা সদর':[22.7203,89.0383],'আশাশুনি':[22.5192,89.1874],'দেবহাটা':[22.5965,89.0135],'কলারোয়া':[22.8803,89.0302],'কালিগঞ্জ':[22.4474,89.0624],'শ্যামনগর':[22.0122,89.1806],'তালা':[22.7399,89.2106]},
            'যশোর':{'যশোর সদর':[23.1825,89.2189],'অভয়নগর':[23.0177,89.4197],'বাঘারপাড়া':[23.2425,89.3354],'চৌগাছা':[23.2633,89.0233],'ঝিকরগাছা':[23.0687,89.0543],'কেশবপুর':[22.8804,89.2315],'মণিরামপুর':[23.0065,89.2199],'শার্শা':[23.0448,88.9411]},
            'ঝিনাইদহ':{'ঝিনাইদহ সদর':[23.5164,89.1575],'কালীগঞ্জ':[23.3696,89.1523],'কোটচাঁদপুর':[23.4450,89.0014],'মহেশপুর':[23.3202,88.8597],'শৈলকুপা':[23.6636,89.2426],'হরিণাকুন্ডু':[23.6435,89.0769]},
            'মাগুরা':{'মাগুরা সদর':[23.4519,89.4124],'মোহাম্মদপুর':[23.4001,89.5507],'শালিখা':[23.3477,89.3593],'শ্রীপুর':[23.5977,89.4241]},
            'নড়াইল':{'নড়াইল সদর':[23.1549,89.4951],'কালিয়া':[23.0292,89.6416],'লোহাগড়া':[23.2042,89.6242]},
            'কুষ্টিয়া':{'কুষ্টিয়া সদর':[23.8245,89.0898],'ভেড়ামারা':[24.0563,88.9812],'দৌলতপুর':[24.0343,88.8355],'খোকসা':[23.8108,89.3004],'কুমারখালী':[23.8582,89.2103],'মিরপুর':[23.8972,88.9862]},
            'চুয়াডাঙ্গা':{'চুয়াডাঙ্গা সদর':[23.5895,88.8854],'আলমডাঙ্গা':[23.7295,88.9082],'দামুড়হুদা':[23.5920,88.7398],'জীবননগর':[23.4430,88.8503]},
            'মেহেরপুর':{'মেহেরপুর সদর':[23.7653,88.6614],'গাংনী':[23.8574,88.7707],'মুজিবনগর':[23.6680,88.6207]},
            'বরিশাল':{'বরিশাল সদর':[22.7148,90.4096],'আগৈলঝাড়া':[22.9676,90.1405],'বাবুগঞ্জ':[22.8246,90.3127],'বাকেরগঞ্জ':[22.5548,90.3901],'বানারীপাড়া':[22.8112,90.1292],'গৌরনদী':[22.9698,90.2429],'হিজলা':[22.9628,90.5518],'মেহেন্দিগঞ্জ':[22.8160,90.5190],'মুলাদী':[22.9551,90.3760],'উজিরপুর':[22.8657,90.1650]},
            'ভোলা':{'ভোলা সদর':[22.7072,90.6305],'বোরহানউদ্দিন':[22.4854,90.7154],'চরফ্যাশন':[22.0449,90.7246],'দৌলতখান':[22.6421,90.7455],'লালমোহন':[22.3023,90.7714],'মনপুরা':[22.2222,90.9431],'তজুমদ্দিন':[22.4525,90.8598]},
            'পটুয়াখালী':{'পটুয়াখালী সদর':[22.3345,90.3293],'বাউফল':[22.4373,90.5465],'দশমিনা':[22.2508,90.5543],'দুমকি':[22.4483,90.3731],'গলাচিপা':[22.1478,90.4605],'কলাপাড়া':[21.9337,90.2217],'মির্জাগঞ্জ':[22.3555,90.2174],'রাঙ্গাবালী':[21.9316,90.4305]},
            'পিরোজপুর':{'পিরোজপুর সদর':[22.6092,89.9793],'ভান্ডারিয়া':[22.4518,90.0197],'কাউখালী':[22.6063,90.0573],'মঠবাড়িয়া':[22.2829,89.9493],'নাজিরপুর':[22.7699,89.9748],'নেছারাবাদ':[22.7214,90.0856],'ইন্দুরকানী':[22.4662,89.9652]},
            'ঝালকাঠি':{'ঝালকাঠি সদর':[22.6798,90.1928],'কাঠালিয়া':[22.4194,90.1021],'নলছিটি':[22.6010,90.2715],'রাজাপুর':[22.5497,90.1309]},
            'বরগুনা':{'বরগুনা সদর':[22.1269,90.1017],'আমতলী':[22.1465,90.2700],'বামনা':[22.2723,90.0573],'বেতাগী':[22.3482,90.1494],'পাথরঘাটা':[22.0897,89.9594],'তালতলী':[21.9676,90.1006]},
            'সিলেট':{'সিলেট সদর':[24.9443,91.8459],'বালাগঞ্জ':[24.6887,91.8299],'বিয়ানীবাজার':[24.8493,92.1596],'বিশ্বনাথ':[24.8347,91.7281],'কোম্পানীগঞ্জ':[25.0799,91.7731],'ফেঞ্চুগঞ্জ':[24.6936,91.9630],'গোলাপগঞ্জ':[24.8105,92.0184],'গোয়াইনঘাট':[25.0815,91.9590],'জৈন্তাপুর':[25.0580,92.1045],'কানাইঘাট':[24.9932,92.2191],'জকিগঞ্জ':[24.9253,92.3679],'দক্ষিণ সুরমা':[24.8171,91.8771],'ওসমানীনগর':[24.7034,91.7319]},
            'মৌলভীবাজার':{'মৌলভীবাজার সদর':[24.4994,91.7132],'বড়লেখা':[24.7085,92.1764],'জুড়ী':[24.5539,92.1452],'কমলগঞ্জ':[24.3169,91.8602],'কুলাউড়া':[24.4900,92.0151],'রাজনগর':[24.5652,91.8635],'শ্রীমঙ্গল':[24.3022,91.6990]},
            'হবিগঞ্জ':{'হবিগঞ্জ সদর':[24.3509,91.4158],'আজমিরীগঞ্জ':[24.5535,91.2814],'বাহুবল':[24.3614,91.5446],'বানিয়াচং':[24.4988,91.3669],'চুনারুঘাট':[24.1800,91.5158],'লাখাই':[24.2985,91.2609],'মাধবপুর':[24.1204,91.3374],'নবীগঞ্জ':[24.5707,91.5482],'শায়েস্তাগঞ্জ':[24.2750,91.4068]},
            'সুনামগঞ্জ':{'সুনামগঞ্জ সদর':[25.0539,91.4000],'বিশ্বম্ভরপুর':[25.1089,91.3152],'ছাতক':[24.9489,91.6145],'দিরাই':[24.7874,91.3361],'ধর্মপাশা':[24.9443,91.0638],'দোয়ারাবাজার':[25.0716,91.5612],'জগন্নাথপুর':[24.7502,91.5567],'জামালগঞ্জ':[24.9559,91.2033],'শাল্লা':[24.6875,91.2589],'তাহিরপুর':[25.1290,91.1637],'মধ্যনগর':[25.0902,91.0133]},
            'রংপুর':{'রংপুর সদর':[25.7512,89.1506],'বদরগঞ্জ':[25.6678,89.0549],'গঙ্গাচড়া':[25.8802,89.2010],'কাউনিয়া':[25.7664,89.3937],'মিঠাপুকুর':[25.5721,89.2609],'পীরগাছা':[25.6650,89.4223],'পীরগঞ্জ':[25.4258,89.2747],'তারাগঞ্জ':[25.7834,89.0333]},
            'গাইবান্ধা':{'গাইবান্ধা সদর':[25.3500,89.5656],'ফুলছড়ি':[25.2538,89.6533],'গোবিন্দগঞ্জ':[25.1577,89.3697],'পলাশবাড়ী':[25.2651,89.3918],'সাদুল্লাপুর':[25.3949,89.4257],'সাঘাটা':[25.1252,89.5635],'সুন্দরগঞ্জ':[25.5102,89.5618]},
            'কুড়িগ্রাম':{'কুড়িগ্রাম সদর':[25.8273,89.6915],'ভুরুঙ্গামারী':[26.1155,89.6934],'চিলমারী':[25.5639,89.7182],'ফুলবাড়ী':[25.9477,89.5717],'নাগেশ্বরী':[25.9599,89.7395],'রাজারহাট':[25.7874,89.5416],'রাজিবপুর':[25.4443,89.7642],'রৌমারী':[25.5931,89.8281],'উলিপুর':[25.6897,89.6687]},
            'লালমনিরহাট':{'লালমনিরহাট সদর':[25.8787,89.4534],'আদিতমারী':[25.9430,89.3682],'হাতীবান্ধা':[26.1203,89.1436],'কালীগঞ্জ':[25.9856,89.2417],'পাটগ্রাম':[26.3434,89.0195]},
            'নীলফামারী':{'নীলফামারী সদর':[25.9420,88.8547],'ডিমলা':[26.1731,88.9739],'ডোমার':[26.1596,88.8254],'জলঢাকা':[26.0312,88.9936],'কিশোরগঞ্জ':[25.8980,89.0331],'সৈয়দপুর':[25.8037,88.9205]},
            'ঠাকুরগাঁও':{'ঠাকুরগাঁও সদর':[26.0717,88.4638],'বালিয়াডাঙ্গী':[26.1082,88.2635],'হরিপুর':[25.8788,88.1545],'পীরগঞ্জ':[25.8425,88.3679],'রাণীশংকৈল':[25.9408,88.2459]},
            'পঞ্চগড়':{'পঞ্চগড় সদর':[26.3648,88.5911],'আটোয়ারী':[26.2508,88.4246],'বোদা':[26.2350,88.6188],'দেবীগঞ্জ':[26.1270,88.7174],'তেঁতুলিয়া':[26.5125,88.4306]},
            'দিনাজপুর':{'দিনাজপুর সদর':[25.6082,88.6757],'বিরল':[25.6469,88.5472],'বীরগঞ্জ':[25.9294,88.6258],'বিরামপুর':[25.3799,88.9634],'বোচাগঞ্জ':[25.7862,88.4533],'চিরিরবন্দর':[25.6667,88.7833],'ফুলবাড়ী':[25.4714,88.9007],'ঘোড়াঘাট':[25.2873,89.2148],'হাকিমপুর':[25.2928,89.0612],'কাহারোল':[25.8025,88.5985],'খানসামা':[25.8717,88.7646],'নবাবগঞ্জ':[25.4209,89.0906],'পার্বতীপুর':[25.6198,88.9230]},
            'ময়মনসিংহ':{'ময়মনসিংহ সদর':[24.8461,90.2642],'ভালুকা':[24.3816,90.3539],'ধোবাউড়া':[25.1012,90.5256],'ফুলবাড়িয়া':[24.5868,90.2562],'গফরগাঁও':[24.3937,90.5499],'গৌরীপুর':[24.7565,90.5861],'হালুয়াঘাট':[25.0841,90.3521],'ঈশ্বরগঞ্জ':[24.6448,90.5995],'মুক্তাগাছা':[24.7443,90.2055],'নান্দাইল':[24.5495,90.6768],'ফুলপুর':[24.9529,90.3529],'ত্রিশাল':[24.5637,90.4104],'তারাকান্দা':[24.8641,90.4634]},
            'জামালপুর':{'জামালপুর সদর':[24.8428,90.0152],'বকশীগঞ্জ':[25.2144,89.8522],'দেওয়ানগঞ্জ':[25.2680,89.7663],'ইসলামপুর':[25.0756,89.7631],'মাদারগঞ্জ':[24.8851,89.7418],'মেলান্দহ':[24.9560,89.8280],'সরিষাবাড়ী':[24.7216,89.8306]},
            'নেত্রকোণা':{'নেত্রকোণা সদর':[24.8872,90.7381],'আটপাড়া':[24.7940,90.8771],'বারহাট্টা':[24.9223,90.8851],'দুর্গাপুর':[25.0891,90.6833],'খালিয়াজুরী':[24.7050,91.1218],'কলমাকান্দা':[25.0776,90.8576],'কেন্দুয়া':[24.6780,90.8022],'মদন':[24.6783,90.9670],'মোহনগঞ্জ':[24.8279,91.0234],'পূর্বধলা':[24.9340,90.6029]},
            'শেরপুর':{'শেরপুর সদর':[24.9908,90.0216],'ঝিনাইগাতী':[25.1824,90.0541],'নকলা':[24.9580,90.1848],'নালিতাবাড়ী':[25.1173,90.1844],'শ্রীবরদী':[25.1648,89.9571]}
        };
        const WX_EN_ALIAS = { chittagong:'চট্টগ্রাম', comilla:'কুমিল্লা', jessore:'যশোর', bogra:'বগুড়া', barisal:'বরিশাল', coxbazar:'কক্সবাজার', coxsbazar:'কক্সবাজার', laxmipur:'লক্ষ্মীপুর', chapainawabganj:'চাঁপাইনবাবগঞ্জ', nawabganj:'চাঁপাইনবাবগঞ্জ', jhalakathi:'ঝালকাঠি', moulvibazar:'মৌলভীবাজার', netrakona:'নেত্রকোণা', khagrachari:'খাগড়াছড়ি' };

        const WX_BN_DIGITS = '০১২৩৪৫৬৭৮৯';
        const WX_WEEKDAYS = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
        const WX_MONTHS = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
        const wxBn = n => String(n).replace(/\d/g, d => WX_BN_DIGITS[d]);

        let weatherLastReq = null;      // শেষ রিকোয়েস্ট (Retry-এর জন্য)
        let weatherReqId = 0;
        let weatherSearchTimer = null;
        let weatherLoadedOnce = false;
        let wxMainAbort = null, wxSearchAbort = null;
        let wxSugItems = [];
        const wxCache = new Map();      // key -> {t, data}
        const WX_CACHE_MS = 5 * 60 * 1000;
        let wxState = { tz: 'Asia/Dhaka', sr: null, ss: null, ill: 50, wax: true, phase: 'day' };
        let wxClockTimer = null;

        /* ---------- জেলা খোঁজা ---------- */
        function wxDistInfo(bn) { const d = WX_DISTRICTS[bn]; return d ? { bn, lat: d[0], lon: d[1], en: d[2] } : null; }
        function wxFindDistrict(raw) {
            let v = String(raw || '').trim().replace(/\s*(জেলা|district|zila|zilla)\s*$/i, '').trim();
            if (!v) return null;
            if (WX_DISTRICTS[v]) return wxDistInfo(v);
            const low = v.toLowerCase().replace(/[^a-z]/g, '');
            if (low) {
                if (WX_EN_ALIAS[low]) return wxDistInfo(WX_EN_ALIAS[low]);
                for (const k in WX_DISTRICTS) if (WX_DISTRICTS[k][2].toLowerCase().replace(/[^a-z]/g, '') === low) return wxDistInfo(k);
            }
            for (const k in WX_DISTRICTS) if (v.includes(k) || k.includes(v)) return wxDistInfo(k);
            return null;
        }
        function wxNearestDistrict(lat, lon) {
            const R = 6371, rad = Math.PI / 180;
            let best = null, bd = 1e9;
            for (const k in WX_DISTRICTS) {
                const [la, lo] = WX_DISTRICTS[k];
                const a = Math.sin((la - lat) * rad / 2) ** 2 + Math.cos(lat * rad) * Math.cos(la * rad) * Math.sin((lo - lon) * rad / 2) ** 2;
                const d = 2 * R * Math.asin(Math.sqrt(a));
                if (d < bd) { bd = d; best = k; }
            }
            return { bn: best, km: bd };
        }
        const wxInBD = (lat, lon) => lat > 20.5 && lat < 26.8 && lon > 88.0 && lon < 92.8;

        /* ---------- সময় (বাংলাদেশ সময় / ১২-ঘণ্টা বাংলা) ---------- */
        function wxParts(tz) {
            const now = new Date();
            try {
                const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', weekday: 'short' });
                const o = {}; f.formatToParts(now).forEach(p => { o[p.type] = p.value; });
                const wd = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday);
                return { y: +o.year, mo: +o.month, d: +o.day, h: (+o.hour) % 24, m: +o.minute, wd: wd < 0 ? 0 : wd };
            } catch (e) {
                const u = new Date(now.getTime() + 6 * 3600 * 1000); // UTC+6 (বাংলাদেশ)
                return { y: u.getUTCFullYear(), mo: u.getUTCMonth() + 1, d: u.getUTCDate(), h: u.getUTCHours(), m: u.getUTCMinutes(), wd: u.getUTCDay() };
            }
        }
        function wxPeriod(h) {
            if (h >= 4 && h < 6) return 'ভোর';
            if (h >= 6 && h < 12) return 'সকাল';
            if (h >= 12 && h < 15) return 'দুপুর';
            if (h >= 15 && h < 17) return 'বিকাল';
            if (h >= 17 && h < 19) return 'সন্ধ্যা';
            return 'রাত';
        }
        function wxTimeBn(h, m) { return `${wxPeriod(h)} ${wxBn(h % 12 || 12)}:${wxBn(String(m).padStart(2, '0'))}`; }
        function wxParseAstro(t) {
            const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t || '');
            if (!m) return null;
            let h = (+m[1]) % 12; if (/PM/i.test(m[3])) h += 12;
            return h * 60 + (+m[2]);
        }
        function wxPhaseAt(min, sr, ss) {
            if (sr == null || ss == null) return (min >= 360 && min < 1080) ? 'day' : 'night';
            if (min >= sr - 35 && min < sr + 35) return 'dawn';
            if (min >= ss - 35 && min < ss + 35) return 'dusk';
            if (min >= sr + 35 && min < ss - 35) return 'day';
            return 'night';
        }
        function wxStampBn(raw) {
            const m = String(raw || '').match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{1,2}):(\d{2})/);
            if (!m) return '';
            return `${wxBn(+m[3])} ${WX_MONTHS[+m[2] - 1]}, ${wxTimeBn(+m[4], +m[5])}`;
        }
        /* এই মুহূর্তের (বর্তমান) আবহাওয়ার জন্য কঠোর নিয়ম:
           "বৃষ্টির সম্ভাবনা/আশেপাশে" কোডকে (1063, 1066, 1069, 1072, 1087) বৃষ্টি চলছে বলে দেখানো হয় না।
           বৃষ্টির ছবি/অ্যানিমেশন শুধু তখনই, যখন মাপা বৃষ্টি (precip) অন্তত ০.১ মিমি অথবা কোড নিজেই সত্যিকারের বৃষ্টি বলছে। */
        function wxKindNow(code, text, precip, temp, cloud) {
            code = Number(code) || 0; precip = Number(precip) || 0; cloud = Number(cloud);
            const POSSIBLE = [1063, 1066, 1069, 1072, 1087];
            if (POSSIBLE.includes(code) && precip < 0.2) {
                const c = isNaN(cloud) ? 70 : cloud;
                const k = c >= 85 ? 'overcast' : c >= 50 ? 'cloudy' : 'partly';
                const base = k === 'overcast' ? { cover: .9, dark: .22 } : k === 'cloudy' ? { cover: .65, dark: .08 } : { cover: .38, dark: 0 };
                return Object.assign({ kind: k, rain: 0, snow: 0, fog: 0, possible: true }, base);
            }
            return wxKind(code, '', precip >= 0.1 ? precip : 0, temp);
        }
        /* দিনের পূর্বাভাসের আইকন: "বৃষ্টির সম্ভাবনা" কম (৫০% এর নিচে) হলে বৃষ্টির ছবি নয়; ছোট মাপের বৃষ্টি/লেখা দেখে ছবি ঠিক হয় না */
        function wxKindDay(day) {
            day = day || {};
            const code = Number(day.condition?.code) || 0;
            const chance = Number(day.daily_chance_of_rain) || 0, tp = Number(day.totalprecip_mm) || 0;
            if ([1063, 1066, 1069, 1072, 1087].includes(code) && chance < 50) return { kind: 'cloudy', cover: .65, dark: .08, rain: 0, snow: 0, fog: 0 };
            return wxKind(code, '', (chance >= 50 || tp >= 2) ? tp : 0, day.avgtemp_c);
        }
        function wxDayText(day) {
            const code = Number(day?.condition?.code) || 0, chance = Number(day?.daily_chance_of_rain) || 0;
            if ([1063, 1066, 1069, 1072, 1087].includes(code) && chance < 50) return 'আশেপাশে বৃষ্টির সম্ভাবনা';
            return day?.condition?.text || '—';
        }
        function wxBnAgo(epoch) {
            if (!epoch) return '';
            const m = Math.max(0, Math.floor((Date.now() / 1000 - Number(epoch)) / 60));
            if (m < 1) return 'এইমাত্র আপডেট';
            if (m < 60) return `${wxBn(m)} মিনিট আগের তথ্য`;
            return `${wxBn(Math.floor(m / 60))} ঘণ্টা আগের তথ্য`;
        }
        function wxPaintAgo() {
            const e = document.getElementById('weatherLastUpdated');
            if (!e || !wxState.updText) return;
            const ago = wxBnAgo(wxState.updEpoch);
            e.textContent = wxState.updText + (ago ? ' · ' + ago : '');
        }
        function wxFindUpazila(distRaw, upRaw) {
            const up = String(upRaw || '').trim(); if (!up) return null;
            const raw = String(distRaw || '').trim(), di = wxFindDistrict(raw);
            for (const dk of [raw, di && di.bn]) {
                const t = dk && WX_UPAZILAS[dk] && WX_UPAZILAS[dk][up];
                if (t) return { lat: t[0], lon: t[1], label: `${up}, ${dk}` };
            }
            return null;
        }
        let wxAutoTimer = null, wxAgoTimer = null;
        function wxAutoStart() {
            clearInterval(wxAutoTimer);
            wxAutoTimer = setInterval(() => {
                try {
                    if (document.visibilityState !== 'visible' || !weatherLastReq) return;
                    const c = document.getElementById('weatherCurrentCard');
                    if (!c || c.classList.contains('hidden') || c.offsetParent === null) return;
                    weatherLoad(weatherLastReq.lat, weatherLastReq.lon, weatherLastReq.meta, { force: true, silent: true });
                } catch (e) {}
            }, WX_CACHE_MS);
        }
        function wxTickClock() {
            const p = wxParts(wxState.tz);
            const isBD = wxState.tz === 'Asia/Dhaka';
            const el = document.getElementById('weatherLocalTime');
            if (el) el.textContent = `${isBD ? 'বাংলাদেশ সময়' : 'স্থানীয় সময়'}: ${WX_WEEKDAYS[p.wd]}, ${wxBn(p.d)} ${WX_MONTHS[p.mo - 1]} · ${wxTimeBn(p.h, p.m)}`;
            const ph = wxPhaseAt(p.h * 60 + p.m, wxState.sr, wxState.ss);
            if (ph !== wxState.phase) { wxState.phase = ph; try { WxScene.set(wxSceneTime()); } catch (e) {} }
        }
        function wxSceneTime() {
            const p = wxParts(wxState.tz), min = p.h * 60 + p.m, { sr, ss } = wxState;
            let sunP = .5, moonP = .5;
            if (sr != null && ss != null) {
                sunP = Math.max(0, Math.min(1, (min - sr) / Math.max(1, ss - sr)));
                const nightLen = ((sr + 1440 - ss) % 1440) || 720;
                moonP = Math.max(0, Math.min(1, (((min - ss) % 1440 + 1440) % 1440) / nightLen));
            }
            return { phase: wxState.phase, sunP, moonP, ill: wxState.ill, wax: wxState.wax };
        }

        /* ---------- আবহাওয়ার ধরন ---------- */
        function wxKind(code, text, precip, temp) {
            code = Number(code) || 0; text = String(text || '').toLowerCase(); precip = Number(precip) || 0;
            const inn = (arr) => arr.includes(code);
            if (inn([1087, 1273, 1276, 1279, 1282]) || /বজ্র|thunder/.test(text)) return { kind: 'thunder', cover: 1, dark: .9, rain: .8, snow: 0, fog: 0, thunder: true };
            if (inn([1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264]) || /তুষার|snow|বরফ|sleet/.test(text)) return { kind: 'snow', cover: .9, dark: .1, rain: 0, snow: 1, fog: 0 };
            if (inn([1192, 1195, 1201, 1243, 1246]) || precip >= 4 || /ভারী বৃষ্টি|heavy rain|torrential/.test(text)) return { kind: 'heavyrain', cover: 1, dark: .55, rain: 1, snow: 0, fog: 0 };
            if (inn([1186, 1189])) return { kind: 'rain', cover: .95, dark: .38, rain: .65, snow: 0, fog: 0 };
            if (inn([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1240]) || precip > 0 || /বৃষ্টি|rain|drizzle|shower/.test(text)) return { kind: 'rain', cover: .9, dark: .28, rain: .35, snow: 0, fog: 0 };
            if (inn([1135, 1147]) || /fog/.test(text)) return { kind: 'fog', cover: .55, dark: .05, rain: 0, snow: 0, fog: 1 };
            if (inn([1030]) || /কুয়াশা|mist|ধোঁয়া|haze/.test(text)) return { kind: 'mist', cover: .45, dark: .02, rain: 0, snow: 0, fog: .6 };
            if (code === 1009 || /overcast|ঘন মেঘ/.test(text)) return { kind: 'overcast', cover: .9, dark: .22, rain: 0, snow: 0, fog: 0 };
            if (code === 1006 || /মেঘ|cloud/.test(text) && code !== 1003) return { kind: 'cloudy', cover: .65, dark: .08, rain: 0, snow: 0, fog: 0 };
            if (code === 1003 || /আংশিক|partly/.test(text)) return { kind: 'partly', cover: .38, dark: 0, rain: 0, snow: 0, fog: 0 };
            return { kind: 'clear', cover: .05, dark: 0, rain: 0, snow: 0, fog: 0 };
        }

        /* ---------- প্রফেশনাল SVG আইকন ---------- */
        function wxIcon(kind, isDay) {
            const CL = (fill, tr) => `<g class="wxi-cloud" ${tr ? `transform="${tr}"` : ''} fill="url(#${fill})"><circle cx="25" cy="38" r="10"/><circle cx="36" cy="31" r="12"/><circle cx="47" cy="39" r="9"/><rect x="15" y="37" width="40" height="11" rx="5.5"/></g>`;
            const SUN = (cx, cy, r, rays) => `<g transform="translate(${cx} ${cy})"><g class="wxi-rays" stroke="#ffc83d" stroke-width="3" stroke-linecap="round">${[0,45,90,135,180,225,270,315].map(a => `<line x1="0" y1="${-(r + 5)}" x2="0" y2="${-(r + 5 + rays)}" transform="rotate(${a})"/>`).join('')}</g><circle r="${r}" fill="url(#wxg-sun)"/></g>`;
            const MOON = (tr) => `<g ${tr ? `transform="${tr}"` : ''}><path d="M38 12a19 19 0 1 0 14 31A16 16 0 0 1 38 12z" fill="url(#wxg-moon)"/><circle class="wxi-tw" cx="50" cy="16" r="1.6" fill="#fff"/><circle class="wxi-tw t2" cx="56" cy="27" r="1.2" fill="#fff"/></g>`;
            let body = '';
            switch (kind) {
                case 'clear': body = isDay ? SUN(32, 32, 12, 7) : MOON(); break;
                case 'partly': body = (isDay ? SUN(24, 24, 9, 5) : MOON('translate(-12 -8) scale(.8)')) + CL('wxg-cloud', 'translate(3 5)'); break;
                case 'cloudy': body = CL('wxg-cloud-d', 'translate(-6 -6) scale(.85)') + CL('wxg-cloud', 'translate(4 4)'); break;
                case 'overcast': body = CL('wxg-cloud-d', 'translate(-5 -5) scale(.85)') + CL('wxg-cloud-d', 'translate(3 5)'); break;
                case 'rain': case 'heavyrain': {
                    const n = kind === 'heavyrain' ? 4 : 3;
                    let drops = ''; for (let i = 0; i < n; i++) { const x = 22 + i * (kind === 'heavyrain' ? 7 : 10); drops += `<line class="wxi-drop d${i}" x1="${x}" y1="50" x2="${x - 3}" y2="57" stroke="#5ab4ff" stroke-width="2.8" stroke-linecap="round"/>`; }
                    body = CL('wxg-cloud-d', 'translate(0 -6)') + drops; break; }
                case 'thunder': body = CL('wxg-cloud-d', 'translate(0 -7)') + `<path class="wxi-bolt" d="M35 38 L26 53 H32 L29 63 L42 46 H35 L39 38Z" fill="#ffd23f" stroke="#ff9a1f" stroke-width=".8" stroke-linejoin="round"/>`; break;
                case 'snow': body = CL('wxg-cloud', 'translate(0 -6)') + [24, 34, 44].map((x, i) => `<circle class="wxi-flake f${i}" cx="${x}" cy="52" r="2.4" fill="#fff"/>`).join(''); break;
                case 'fog': case 'mist': body = CL('wxg-cloud', 'translate(0 -8)') + [50, 55, 60].map((y, i) => `<line class="wxi-fog fg${i}" x1="${16 + i * 3}" y1="${y}" x2="${46 + i * 3}" y2="${y}" stroke="#dbe4ee" stroke-width="3" stroke-linecap="round"/>`).join(''); break;
                default: body = SUN(32, 32, 12, 7);
            }
            return `<svg viewBox="0 0 64 64" class="wxi" aria-hidden="true">${body}</svg>`;
        }

        /* ---------- আবহাওয়া অনুযায়ী মজার কথা ---------- */
        function wxFunLines(o) {
            const L = [];
            const add = (arr, n, tag) => { arr.slice().sort(() => Math.random() - .5).slice(0, n).forEach(([e, t]) => L.push({ e, t, tag })); };
            const tm = o.tom;
            if (tm) {
                const ch = tm.chance || 0;
                if (ch >= 60) add([
                    ['umbrella', `কালকে ছাতা নিয়ে বের হন — বৃষ্টির সম্ভাবনা ${ch}%!`],
                    ['bowl', 'বৃষ্টির দিনে খিচুড়ি আর ইলিশ ভাজা — আজই বাজার সেরে রাখুন'],
                    ['shoe', 'কালকে নতুন জুতা তুলে রাখুন, কাদাপানিতে মন খারাপ হবে'],
                    ['shirt', 'কালকের জন্য কাপড় রোদে শুকাতে দেবেন না, বৃষ্টি সব ভিজিয়ে দিতে পারে'],
                    ['backpack', 'ব্যাগে রেইনকোট বা পলিথিন রাখুন, বই-খাতা ভিজলে মুশকিল!'],
                    ['bus', 'বৃষ্টিতে রাস্তায় জ্যাম হতে পারে, একটু আগে রওনা দিন']], 4, 'আগামীকাল');
                else if (ch >= 30) add([
                    ['cloud-sun', 'কালকে বৃষ্টি আসতে পারে — ছাতাটা ব্যাগে রাখলে ক্ষতি নেই'],
                    ['cloud', 'আকাশের মেজাজের ভরসা নেই, বের হওয়ার আগে একবার আকাশটা দেখে নিন'],
                    ['shirt', 'কালকে হালকা জ্যাকেট বা ওড়না সঙ্গে রাখুন']], 2, 'আগামীকাল');
                else add([
                    ['smile', 'কালকে বৃষ্টির ভয় নেই — ছাতা বাসায় রেখে নির্ভয়ে ঘুরুন'],
                    ['shirt', 'কালকে কাপড় ধোয়ার সেরা দিন, রোদে ঝটপট শুকিয়ে যাবে']], 2, 'আগামীকাল');
                if (tm.max >= 33) add([
                    ['cup', 'কালকে গরম বেশি — সাথে পানির বোতল রাখুন'],
                    ['sun', 'রোদে বের হলে টুপি বা ছাতা মাথায় দিন'],
                    ['droplet', 'ডাবের পানি বা লেবুর শরবতে শরীর ঠান্ডা রাখুন']], 2, 'আগামীকাল');
                if (tm.min <= 16) add([
                    ['shirt', 'কালকে সকালে বেশ ঠান্ডা — হালকা সোয়েটার গায়ে দিন'],
                    ['bowl', 'শীতের দিনে ভাপা পিঠা আর খেজুরের রসের কথা মনে পড়ছে না?']], 1, 'আগামীকাল');
            }
            const c = o.cur;
            if (c.thunder) add([['bolt', 'বজ্রপাতের সময় খোলা মাঠে বা গাছের নিচে দাঁড়াবেন না'], ['home', 'ঝড়-বৃষ্টিতে নিরাপদ আশ্রয়ে থাকুন, দরকার ছাড়া বের হবেন না'], ['plug', 'ঝড়ের সময় ফোন চার্জে দিয়ে কথা বলা এড়িয়ে চলুন']], 2, 'এখন');
            if (c.fog) add([['car', 'কুয়াশায় রাস্তা ঝাপসা — গাড়ি চালালে হেডলাইট জ্বালান'], ['mask', 'কুয়াশায় ধুলাবালি বেশি, বাইরে গেলে মাস্ক পরুন']], 2, 'এখন');
            if (c.rain > 0 && !c.thunder) add([['cloud-rain', 'এখন বৃষ্টি হচ্ছে — জানালার পাশে বসে চায়ের কাপে চুমুক দেওয়ার সময়'], ['music', 'বৃষ্টির শব্দে পুরনো গান শুনলে মন ভালো হয়ে যায়']], 1, 'এখন');
            if (c.temp <= 17) add([['coffee', 'এমন ঠান্ডায় গরম চায়ের কাপই আসল সঙ্গী'], ['bed', 'কম্বলের নিচে আজ ঘুম বেশি মিষ্টি লাগবে']], 1, 'এখন');
            if (c.temp >= 34) add([['flame', 'বাইরে বেশ গরম — দুপুরে অকারণে রোদে ঘুরবেন না']], 1, 'এখন');
            if (c.uv >= 8) add([['bottle', 'ইউভি অনেক বেশি — সানস্ক্রিন বা ছাতা ব্যবহার করুন']], 1, 'এখন');
            if (c.humidity >= 85) add([['droplets', 'আর্দ্রতা বেশি, গা চিটচিট করবে — ফ্যান ছেড়ে বসুন']], 1, 'এখন');
            if (c.wind >= 25) add([['wind', 'বাতাস জোরালো — ঘুড়ি ওড়ানোর পারফেক্ট দিন! তবে ছাতা সামলে']], 1, 'এখন');
            if (c.night) add([['moon', 'রাত হয়েছে — মোবাইল রেখে আজ তাড়াতাড়ি ঘুমিয়ে পড়ুন'], ['star', 'আকাশ পরিষ্কার থাকলে একটু তারা গুনে দেখুন']], 1, 'এখন');
            else if (c.kind === 'clear' || c.kind === 'partly') add([['sun', 'চমৎকার আবহাওয়া — বন্ধুদের সাথে চা-আড্ডার জন্য পারফেক্ট'], ['walk', 'আজ একটু হেঁটে আসুন, শরীরও ভালো থাকবে মনও']], 1, 'এখন');
            const fill = [['droplet', 'দিনে অন্তত ৮ গ্লাস পানি খেতে ভুলবেন না'], ['mobile', 'বের হওয়ার আগে একবার আবহাওয়া দেখে নিন — ঠিক যেমন এখন দেখছেন'], ['leaf', 'আবহাওয়া যেমনই হোক, হাসিমুখে দিন শুরু করুন'], ['sparkles', 'বাইরে থেকে ফিরে হাত ধুতে ভুলবেন না']];
            add(fill, Math.max(0, 6 - L.length), 'টিপস');
            const seen = new Set();
            return L.filter(x => !seen.has(x.t) && seen.add(x.t)).slice(0, 8);
        }
        let wxFunList = [], wxFunIdx = 0, wxFunTimer = null;
        function wxFunShow(i) {
            const card = document.getElementById('weatherFunCard'); if (!card || !wxFunList.length) return;
            wxFunIdx = (i + wxFunList.length) % wxFunList.length;
            const it = wxFunList[wxFunIdx];
            const box = card.querySelector('.wx-fun-body');
            box.classList.add('out');
            setTimeout(() => {
                card.querySelector('.wx-fun-emoji').innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-' + it.e + '"/></svg>';
                card.querySelector('.wx-fun-tag').textContent = it.tag;
                card.querySelector('.wx-fun-text').textContent = it.t;
                card.querySelector('.wx-fun-dots').innerHTML = wxFunList.map((_, k) => `<i class="${k === wxFunIdx ? 'on' : ''}"></i>`).join('');
                box.classList.remove('out');
            }, 220);
        }
        window.weatherFunNext = () => { wxFunShow(wxFunIdx + 1); wxFunRestart(); };
        function wxFunRestart() {
            clearInterval(wxFunTimer);
            wxFunTimer = setInterval(() => {
                const v = document.getElementById('view-weather');
                if (!v || v.classList.contains('hidden') || document.hidden) return;
                wxFunShow(wxFunIdx + 1);
            }, 6500);
        }
        function wxFunSet(list) {
            wxFunList = list; wxFunIdx = 0;
            const card = document.getElementById('weatherFunCard');
            if (!card) return;
            if (!list.length) { card.classList.add('hidden'); return; }
            card.classList.remove('hidden');
            const it = list[0];
            card.querySelector('.wx-fun-emoji').innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-' + it.e + '"/></svg>';
            card.querySelector('.wx-fun-tag').textContent = it.tag;
            card.querySelector('.wx-fun-text').textContent = it.t;
            card.querySelector('.wx-fun-dots').innerHTML = list.map((_, k) => `<i class="${k === 0 ? 'on' : ''}"></i>`).join('');
            wxFunRestart();
        }

        /* =====================================================================
           WxScene — ক্যানভাস ভিত্তিক বাস্তবধর্মী আবহাওয়া দৃশ্য
           (আকাশের গ্রেডিয়েন্ট, সূর্য/চাঁদ/তারা, নরম মেঘ, বৃষ্টি, কাচে পানির ফোঁটা,
            বজ্রপাত, কুয়াশা, তুষার)
           ===================================================================== */
        const WxScene = (() => {
            const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
            const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
            const shade = (a, f) => a.map(v => v * f);
            const rgba = (a, al) => `rgba(${a[0] | 0},${a[1] | 0},${a[2] | 0},${al})`;
            const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647);
            const BASE = { day: ['#1672d0', '#4aa6ee', '#b6e2f8'], dawn: ['#35457f', '#d9806f', '#ffd7a3'], dusk: ['#28366e', '#bf5468', '#ffb067'], night: ['#040918', '#0b1838', '#1a2d58'] };
            const GREY = { day: ['#6d7c8b', '#92a0ad', '#c1cad2'], dawn: ['#4b5266', '#8c8189', '#c7ae9a'], dusk: ['#3f4559', '#85737d', '#c29a86'], night: ['#0a1019', '#121a26', '#1d2836'] };
            const CLOUD = { day: ['#ffffff', '#b4c2d3'], dawn: ['#ffe2c4', '#9d7a98'], dusk: ['#ffc89a', '#7a5679'], night: ['#8493b2', '#1e2a45'] };
            const CLOUDG = { day: ['#cdd4dc', '#76808c'], dawn: ['#b9aeb3', '#6f6670'], dusk: ['#b59a94', '#5f5360'], night: ['#4a566b', '#171e2d'] };
            const FOGC = { day: '#e6edf2', dawn: '#f0d9cf', dusk: '#e0c3bf', night: '#4a5a74' };

            let cv, ctx, W = 0, H = 0, dpr = 1, raf = 0, running = false, visible = true, last = 0, t = 0, io = null, ro = null;
            const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
            const P = { kind: 'clear', cover: .05, dark: 0, rain: 0, snow: 0, fog: 0, thunder: false, wind: 8, phase: 'day', sunP: .5, moonP: .5, ill: 60, wax: true };
            let sprites = [], clouds = [], drops = [], glass = [], flakes = [], stars = [], fogSpr = null, fogBanks = [], moonSpr = null;
            let bolt = null, flash = 0, nextBolt = 3, shoot = null, nextShoot = 6;

            const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
            function blob(x, px, py, r, col, a) {
                const g = x.createRadialGradient(px, py, r * .1, px, py, r);
                g.addColorStop(0, rgba(col, a)); g.addColorStop(.6, rgba(col, a * .72)); g.addColorStop(1, rgba(col, 0));
                x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, 6.2832); x.fill();
            }
            function cloudColors() {
                const base = CLOUD[P.phase], grey = CLOUDG[P.phase], k = Math.min(1, P.cover * .95);
                const f = 1 - P.dark * .55;
                return [shade(mix(hex(base[0]), hex(grey[0]), k), f), shade(mix(hex(base[1]), hex(grey[1]), k), f)];
            }
            function makeCloud(seed, top, bot) {
                const w = 300, h = 140, c = mk(w, h), x = c.getContext('2d'), r = rnd(seed), puffs = [];
                const n = 16 + Math.floor(r() * 8);
                for (let i = 0; i < n; i++) {
                    const px = w * (.18 + .64 * r()), spread = 1 - Math.abs(px / w - .5) * 1.7;
                    const rad = h * (.16 + .22 * r()) * (.55 + spread * .6);
                    puffs.push([px, h * (.64 - .34 * spread * r()), rad]);
                }
                for (let i = 0; i < 6; i++) puffs.push([w * (.2 + .12 * i), h * .68, h * .16]);
                puffs.forEach(([px, py, rad]) => blob(x, px, py, rad, bot, .95));
                puffs.forEach(([px, py, rad]) => blob(x, px - rad * .12, py - rad * .3, rad * .78, top, .82));
                x.globalCompositeOperation = 'destination-out';
                const g = x.createLinearGradient(0, h * .74, 0, h); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)');
                x.fillStyle = g; x.fillRect(0, h * .74, w, h * .26);
                return c;
            }
            function makeMoon() {
                const s = 160, c = mk(s, s), x = c.getContext('2d'), r = 62, cx = 80, cy = 80;
                const g = x.createRadialGradient(cx - 18, cy - 18, 8, cx, cy, r); g.addColorStop(0, '#fffef4'); g.addColorStop(1, '#d6dcea');
                x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fill();
                [[-22, -14, 13], [14, 10, 17], [-6, 28, 9], [26, -26, 8], [-30, 16, 7]].forEach(([dx, dy, rr]) => blob(x, cx + dx, cy + dy, rr, [150, 160, 182], .35));
                const k = Math.max(0, Math.min(1, P.ill / 100));
                if (k < .985) {
                    x.globalCompositeOperation = 'destination-out';
                    const sx = cx + (P.wax ? -1 : 1) * 2 * r * k;
                    const sg = x.createRadialGradient(sx, cy, r * .86, sx, cy, r * 1.06); sg.addColorStop(0, 'rgba(0,0,0,1)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
                    x.fillStyle = sg; x.beginPath(); x.arc(sx, cy, r * 1.08, 0, 6.2832); x.fill();
                    x.globalCompositeOperation = 'destination-over';
                    x.fillStyle = 'rgba(170,185,215,.16)'; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fill();
                }
                return c;
            }
            function makeFog() {
                const w = 640, h = 190, c = mk(w, h), x = c.getContext('2d'), r = rnd(77), col = hex(FOGC[P.phase]);
                for (let i = 0; i < 26; i++) blob(x, w * r(), h * (.3 + .4 * r()), h * (.28 + .3 * r()), col, .2);
                return c;
            }
            function skyColors() {
                const b = BASE[P.phase].map(hex), g = GREY[P.phase].map(hex);
                const f = 1 - P.dark * (P.phase === 'night' ? .5 : .62);
                const fc = hex(FOGC[P.phase]);
                return b.map((c, i) => {
                    let m = shade(mix(c, g[i], P.cover), f);
                    if (P.fog > 0) m = mix(m, shade(fc, P.phase === 'night' ? .55 : .8), P.fog * .5);
                    return m;
                });
            }

            function rebuild() {
                if (!W) return;
                const [top, bot] = cloudColors();
                sprites = [1, 2, 3, 4].map(i => makeCloud(i * 977, top, bot));
                const night = P.phase === 'night';
                let cnt = Math.round(2 + P.cover * 9);
                if (P.kind === 'clear') cnt = night ? 1 : 3;
                const r = rnd(4242), sc0 = Math.max(.7, W / 360);
                clouds = [];
                for (let i = 0; i < cnt; i++) {
                    const sc = (.7 + r() * 1.3) * sc0;
                    clouds.push({ s: Math.floor(r() * 4), x: r() * (W + 300 * sc) - 300 * sc * .5, y: H * (.0 + r() * .5), sc, sp: (5 + r() * 9) * (.5 + P.wind / 22), a: .55 + r() * .4, front: r() > .5 });
                }
                clouds.sort((a, b) => a.sc - b.sc);
                // বৃষ্টির রেখা
                const area = (W * H) / (360 * 300);
                const dn = P.rain > 0 ? Math.max(40, Math.min(420, Math.round((50 + 280 * P.rain) * area))) : 0;
                drops = Array.from({ length: dn }, () => { const z = .4 + Math.random() * .6; return { x: Math.random() * (W + 80) - 40, y: Math.random() * H, z, len: 9 + z * 20, sp: 520 + z * 620 }; });
                // কাচে পানির ফোঁটা
                const gn = P.rain > 0 ? Math.round((8 + P.rain * 14) * Math.min(1.4, area)) : 0;
                glass = Array.from({ length: gn }, () => ({ x: Math.random() * W, y: Math.random() * H * .95, r: 1.6 + Math.random() * 2.8, vy: 0, wait: Math.random() * 6, sliding: false, dist: 0, trail: 0 }));
                flakes = P.snow > 0 ? Array.from({ length: Math.round(90 * area) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: .8 + Math.random() * 2.6, sp: 25 + Math.random() * 55, ph: Math.random() * 6.28 })) : [];
                if (!stars.length || stars.length !== 110) stars = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random() * .75, r: .4 + Math.random() * 1.1, ph: Math.random() * 6.28, sp: 1 + Math.random() * 2.5 }));
                moonSpr = makeMoon();
                fogSpr = P.fog > 0 ? makeFog() : null;
                fogBanks = P.fog > 0 ? [0, 1, 2, 3].map(i => ({ y: H * (.18 + i * .22), x: -Math.random() * 300, sp: (i % 2 ? -1 : 1) * (4 + Math.random() * 7), a: P.fog * (.55 + Math.random() * .35), sc: 1 + Math.random() * .6 })) : [];
            }

            function resize() {
                if (!cv) return;
                const w = cv.clientWidth, h = cv.clientHeight;
                if (w < 10 || h < 10) return;
                dpr = Math.min(2, window.devicePixelRatio || 1);
                if (Math.abs(w - W) > 1 || Math.abs(h - H) > 1) {
                    W = w; H = h; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
                    rebuild();
                }
            }

            function genBolt(x1, y1, x2, y2, d, out) {
                const L = Math.hypot(x2 - x1, y2 - y1);
                if (d <= 0 || L < 8) { out.push([x2, y2]); return; }
                const mx = (x1 + x2) / 2 + (Math.random() - .5) * L * .5, my = (y1 + y2) / 2 + (Math.random() - .5) * 8;
                genBolt(x1, y1, mx, my, d - 1, out); genBolt(mx, my, x2, y2, d - 1, out);
            }
            function newBolt() {
                const x0 = W * (.15 + Math.random() * .7), y1 = H * (.5 + Math.random() * .3);
                const main = [[x0, 0]]; genBolt(x0, 0, x0 + (Math.random() - .5) * 80, y1, 5, main);
                const br = [];
                for (let i = 0; i < 2; i++) {
                    const p = main[Math.floor(main.length * (.3 + Math.random() * .4))], pts = [p];
                    genBolt(p[0], p[1], p[0] + (Math.random() - .5) * 120, p[1] + 50 + Math.random() * 60, 3, pts); br.push(pts);
                }
                bolt = { main, br, life: 0 };
                flash = 1;
            }

            function update(dt) {
                t += dt;
                const slant = Math.min(.55, P.wind / 70) + .08;
                clouds.forEach(c => { c.x += c.sp * dt; if (c.x > W + 20) c.x = -300 * c.sc; });
                drops.forEach(d => { d.y += d.sp * dt; d.x += d.sp * slant * dt; if (d.y > H + 20) { d.y = -d.len; d.x = Math.random() * (W + 80) - 60; } });
                glass.forEach(g => {
                    g.wait -= dt;
                    if (g.sliding) {
                        g.vy = Math.min(75, g.vy + 65 * dt); g.y += g.vy * dt; g.trail += g.vy * dt; g.dist -= g.vy * dt;
                        if (g.dist <= 0) { g.sliding = false; g.vy = 0; g.wait = 2 + Math.random() * 6; }
                    } else {
                        if (g.wait <= 0) { g.sliding = true; g.dist = 25 + Math.random() * 110; g.vy = 8; }
                        if (g.trail > 0) g.trail = Math.max(0, g.trail - 9 * dt);
                    }
                    if (g.y > H + 10) { g.y = -4; g.x = Math.random() * W; g.trail = 0; g.sliding = false; g.wait = 1 + Math.random() * 4; }
                });
                flakes.forEach(f => { f.y += f.sp * dt; f.x += Math.sin(t * .8 + f.ph) * 14 * dt + P.wind * .3 * dt; if (f.y > H + 6) { f.y = -6; f.x = Math.random() * W; } if (f.x > W + 6) f.x = -6; });
                fogBanks.forEach(b => { b.x += b.sp * dt; const w = 640 * b.sc; if (b.x > W) b.x = -w; if (b.x < -w) b.x = W; });
                if (P.thunder) {
                    nextBolt -= dt;
                    if (nextBolt <= 0) { if (Math.random() < .6) newBolt(); else flash = .8; nextBolt = 3 + Math.random() * 6; }
                }
                if (bolt) { bolt.life += dt; if (bolt.life > .5) bolt = null; }
                flash = Math.max(0, flash - dt * 2.6);
                if (P.phase === 'night' && P.cover < .3) {
                    nextShoot -= dt;
                    if (nextShoot <= 0 && !shoot) { shoot = { x: W * (.2 + Math.random() * .6), y: H * (.05 + Math.random() * .25), life: 0 }; nextShoot = 7 + Math.random() * 9; }
                }
                if (shoot) { shoot.life += dt; if (shoot.life > .8) shoot = null; }
            }

            function draw() {
                if (!ctx || !W) return;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, W, H);
                // আকাশ
                const sc = skyColors();
                const sg = ctx.createLinearGradient(0, 0, 0, H);
                sg.addColorStop(0, rgba(sc[0], 1)); sg.addColorStop(.55, rgba(sc[1], 1)); sg.addColorStop(1, rgba(sc[2], 1));
                ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);

                const clear = 1 - Math.min(1, P.cover * 1.05);
                // তারা
                const sa = P.phase === 'night' ? clear : (P.phase === 'dawn' || P.phase === 'dusk') ? clear * .25 : 0;
                if (sa > .02) {
                    stars.forEach(s => {
                        const a = sa * (.55 + .45 * Math.sin(t * s.sp + s.ph));
                        ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, 6.2832); ctx.fill();
                        if (s.r > 1.2) { ctx.fillStyle = `rgba(200,220,255,${a * .25})`; ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r * 3, 0, 6.2832); ctx.fill(); }
                    });
                    if (shoot) {
                        const p = shoot.life / .8, x = shoot.x + p * 150, y = shoot.y + p * 70, a = Math.sin(p * Math.PI);
                        const g = ctx.createLinearGradient(x, y, x - 60, y - 28); g.addColorStop(0, `rgba(255,255,255,${a})`); g.addColorStop(1, 'rgba(255,255,255,0)');
                        ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 60, y - 28); ctx.stroke();
                    }
                }
                // চাঁদ
                if (P.phase === 'night') {
                    const a = Math.max(.12, 1 - P.cover * .88), mx = W * (.14 + .72 * P.moonP), my = H * (.52 - .4 * Math.sin(Math.PI * P.moonP)) + 6;
                    const gl = ctx.createRadialGradient(mx, my, 6, mx, my, W * .42);
                    gl.addColorStop(0, `rgba(190,210,255,${.32 * a})`); gl.addColorStop(1, 'rgba(190,210,255,0)');
                    ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
                    ctx.globalAlpha = a; ctx.drawImage(moonSpr, mx - 24, my - 24, 48, 48); ctx.globalAlpha = 1;
                }
                // সূর্য
                if (P.phase !== 'night') {
                    const a = Math.max(0, 1 - P.cover * .92), sx = W * (.1 + .8 * P.sunP), sy = H * (.58 - .46 * Math.sin(Math.PI * P.sunP)) + 4;
                    if (a > .03) {
                        const warm = P.phase === 'day' ? [255, 236, 170] : [255, 150, 90];
                        const gl = ctx.createRadialGradient(sx, sy, 4, sx, sy, W * .62);
                        gl.addColorStop(0, rgba(warm, .55 * a)); gl.addColorStop(.25, rgba(warm, .22 * a)); gl.addColorStop(1, rgba(warm, 0));
                        ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
                        if (P.cover < .55) {
                            ctx.save(); ctx.translate(sx, sy); ctx.rotate(t * .03); ctx.globalCompositeOperation = 'lighter';
                            for (let i = 0; i < 10; i++) {
                                ctx.rotate(6.2832 / 10);
                                const rg = ctx.createLinearGradient(0, 0, 0, -W * .8); rg.addColorStop(0, rgba(warm, .13 * a)); rg.addColorStop(1, rgba(warm, 0));
                                ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.lineTo(20, -W * .8); ctx.lineTo(-20, -W * .8); ctx.fill();
                            }
                            ctx.restore();
                        }
                        const core = ctx.createRadialGradient(sx, sy, 0, sx, sy, 24);
                        core.addColorStop(0, `rgba(255,255,245,${a})`); core.addColorStop(.5, rgba(P.phase === 'day' ? [255, 238, 160] : [255, 170, 100], .95 * a)); core.addColorStop(1, rgba(warm, 0));
                        ctx.fillStyle = core; ctx.beginPath(); ctx.arc(sx, sy, 24, 0, 6.2832); ctx.fill();
                    }
                }
                // মেঘ (পেছনের স্তর)
                const ca = .35 + .65 * Math.min(1, P.cover * 1.6);
                const drawCloud = c => { ctx.globalAlpha = c.a * ca; ctx.drawImage(sprites[c.s], c.x, c.y, 300 * c.sc, 140 * c.sc); };
                clouds.forEach(c => { if (!c.front) drawCloud(c); });
                // ঘন মেঘের ছাদ
                if (P.cover > .6) {
                    ctx.globalAlpha = 1;
                    const dk = shade(hex(GREY[P.phase][0]), (P.phase === 'night' ? .55 : .7) * (1 - P.dark * .5));
                    const cg = ctx.createLinearGradient(0, 0, 0, H * .62);
                    cg.addColorStop(0, rgba(dk, .75 * Math.min(1, (P.cover - .5) * 2))); cg.addColorStop(1, rgba(dk, 0));
                    ctx.fillStyle = cg; ctx.fillRect(0, 0, W, H * .62);
                }
                clouds.forEach(c => { if (c.front) drawCloud(c); });
                ctx.globalAlpha = 1;
                // কুয়াশা
                if (P.fog > 0 && fogSpr) {
                    fogBanks.forEach(b => { ctx.globalAlpha = b.a; ctx.drawImage(fogSpr, b.x, b.y, 640 * b.sc, 190 * b.sc); });
                    ctx.globalAlpha = 1;
                    const fc = hex(FOGC[P.phase]), vg = ctx.createLinearGradient(0, 0, 0, H);
                    vg.addColorStop(0, rgba(fc, .06 * P.fog)); vg.addColorStop(1, rgba(fc, .34 * P.fog));
                    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
                }
                // বৃষ্টি
                if (drops.length) {
                    const slant = Math.min(.55, P.wind / 70) + .08;
                    [[.7, .22, .8], [1.01, .5, 1.4]].forEach(([zmax, al, lw], bi) => {
                        ctx.strokeStyle = `rgba(205,228,255,${al})`; ctx.lineWidth = lw; ctx.beginPath();
                        drops.forEach(d => { if ((bi === 0 && d.z <= .7) || (bi === 1 && d.z > .7)) { ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.len * slant, d.y - d.len); } });
                        ctx.stroke();
                    });
                    const mg = ctx.createLinearGradient(0, H * .7, 0, H); mg.addColorStop(0, 'rgba(220,235,255,0)'); mg.addColorStop(1, `rgba(220,235,255,${.12 * P.rain})`);
                    ctx.fillStyle = mg; ctx.fillRect(0, H * .7, W, H * .3);
                }
                // তুষার
                flakes.forEach(f => { ctx.fillStyle = `rgba(255,255,255,${.4 + f.r * .18})`; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.2832); ctx.fill(); });
                // বজ্রপাত
                if (bolt) {
                    const l = bolt.life, a = l < .08 ? 1 : l < .14 ? .25 : l < .22 ? 1 : Math.max(0, 1 - (l - .22) / .28);
                    const strokePts = (pts, w, al) => { ctx.lineWidth = w; ctx.strokeStyle = `rgba(255,255,255,${al})`; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
                    ctx.save(); ctx.lineJoin = 'round'; ctx.shadowColor = 'rgba(160,195,255,.95)'; ctx.shadowBlur = 18;
                    strokePts(bolt.main, 2.6, a); bolt.br.forEach(b => strokePts(b, 1.4, a * .8));
                    ctx.restore();
                }
                if (flash > .01) { ctx.fillStyle = `rgba(205,220,255,${flash * .38})`; ctx.fillRect(0, 0, W, H); }
                // কাচে পানির ফোঁটা
                glass.forEach(g => {
                    if (g.trail > 0) { ctx.strokeStyle = 'rgba(255,255,255,.10)'; ctx.lineWidth = g.r * .8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(g.x, g.y - g.trail); ctx.lineTo(g.x, g.y); ctx.stroke(); }
                    const gr = ctx.createRadialGradient(g.x - g.r * .3, g.y - g.r * .35, g.r * .1, g.x, g.y, g.r * 1.05);
                    gr.addColorStop(0, 'rgba(255,255,255,.6)'); gr.addColorStop(.4, 'rgba(255,255,255,.07)'); gr.addColorStop(1, 'rgba(255,255,255,.3)');
                    ctx.fillStyle = gr; ctx.beginPath(); ctx.ellipse(g.x, g.y, g.r * .82, g.r * 1.05, 0, 0, 6.2832); ctx.fill();
                });
                // ভিগনেট
                const vg2 = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .35, W / 2, H / 2, Math.max(W, H) * .75);
                vg2.addColorStop(0, 'rgba(0,0,0,0)'); vg2.addColorStop(1, 'rgba(0,0,0,.28)');
                ctx.fillStyle = vg2; ctx.fillRect(0, 0, W, H);
            }

            function loop(ts) {
                if (!running) return;
                raf = requestAnimationFrame(loop);
                const dt = Math.min(.05, (ts - last) / 1000); last = ts;
                if (dt <= 0) return;
                if (!W) resize();
                if (!W) return;
                update(dt); draw();
            }
            function start() {
                if (running || reduced || !cv || !visible || document.hidden) return;
                running = true; last = performance.now(); raf = requestAnimationFrame(loop);
            }
            function stop() { running = false; cancelAnimationFrame(raf); }

            return {
                mount(canvas) {
                    if (cv === canvas) return;
                    cv = canvas; ctx = cv.getContext('2d');
                    if ('ResizeObserver' in window) { ro = new ResizeObserver(() => { resize(); if (!running) draw(); }); ro.observe(cv); }
                    if ('IntersectionObserver' in window) { io = new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) { resize(); start(); } else stop(); }, { threshold: .01 }); io.observe(cv); }
                    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
                },
                set(p) { Object.assign(P, p); resize(); rebuild(); if (W) { draw(); start(); } },
                _P: P, _draw: draw, _resize: resize, _update: update
            };
        })();

        /* ---------- UI সাহায্যকারী ---------- */
        function weatherHideAll() {
            ['weatherLoading', 'weatherError', 'weatherCurrentCard', 'weatherFunCard', 'weatherTomorrowCard', 'weatherForecastCard', 'weatherDistrictTip'].forEach(id => document.getElementById(id)?.classList.add('hidden'));
            document.getElementById('weatherSuggestions')?.classList.add('hidden');
        }
        function weatherShowLoading() { weatherHideAll(); document.getElementById('weatherLoading')?.classList.remove('hidden'); }
        function weatherShowError(msg) {
            weatherHideAll();
            const t = document.getElementById('weatherErrorText');
            if (t) t.textContent = msg || 'আবহাওয়া পাওয়া যায়নি। ইন্টারনেট চেক করে আবার চেষ্টা করুন।';
            document.getElementById('weatherError')?.classList.remove('hidden');
        }
        async function weatherFetchJson(path, params = {}, signal) {
            const q = new URLSearchParams({ key: WEATHER_API_KEY, lang: 'bn', ...params });
            const res = await fetch(`${WEATHER_BASE}${path}?${q.toString()}`, { signal, cache: 'no-store' });
            if (!res.ok) { const b = await res.text().catch(() => ''); throw new Error(`HTTP ${res.status}${b ? ': ' + b.slice(0, 80) : ''}`); }
            return res.json();
        }
        function weatherBnChance(pct) {
            const n = Number(pct) || 0;
            if (n >= 70) return `${n}% — বৃষ্টি হওয়ার সম্ভাবনা বেশি`;
            if (n >= 40) return `${n}% — মাঝারি সম্ভাবনা`;
            if (n >= 15) return `${n}% — কম সম্ভাবনা`;
            return `${n}% — প্রায় বৃষ্টিহীন`;
        }
        function weatherBnSun(day) {
            const k = wxKindDay(day).kind;
            return ({ clear: 'রোদ উঠবে / আকাশ পরিষ্কার', partly: 'আংশিক মেঘলা, মাঝে মাঝে রোদ', cloudy: 'মেঘলা আকাশ', overcast: 'ঘন মেঘে ঢাকা আকাশ', rain: 'মেঘলা ও বৃষ্টির সম্ভাবনা', heavyrain: 'মেঘলা ও ভারী বৃষ্টি', thunder: 'বজ্রসহ ঝড়-বৃষ্টি', snow: 'তুষারপাত', fog: 'ঘন কুয়াশা', mist: 'কুয়াশাচ্ছন্ন আকাশ' })[k] || (day?.condition?.text || 'সাধারণ আবহাওয়া');
        }
        function weatherFormatDateBn(dateStr) {
            const m = String(dateStr).match(/(\d{4})-(\d{2})-(\d{2})/);
            if (!m) return dateStr;
            const d = new Date(+m[1], +m[2] - 1, +m[3], 12);
            return `${WX_WEEKDAYS[d.getDay()]} ${wxBn(+m[3])} ${WX_MONTHS[+m[2] - 1]}`;
        }

        /* ---------- রেন্ডার ---------- */
        function weatherRender(data, meta) {
            meta = meta || {};
            if (!data || !data.location || !data.current) { weatherShowError('ডেটা পাওয়া যায়নি'); return; }
            weatherHideAll();
            const loc = data.location, cur = data.current, forecast = data.forecast?.forecastday || [];
            const astro = forecast[0]?.astro || {};
            wxState.tz = loc.tz_id || 'Asia/Dhaka';
            wxState.sr = wxParseAstro(astro.sunrise); wxState.ss = wxParseAstro(astro.sunset);
            wxState.ill = Number(astro.moon_illumination); if (isNaN(wxState.ill)) wxState.ill = 60;
            wxState.wax = !/wan|last/i.test(astro.moon_phase || '');
            const pp = wxParts(wxState.tz);
            wxState.phase = (wxState.sr == null) ? (cur.is_day === 1 ? 'day' : 'night') : wxPhaseAt(pp.h * 60 + pp.m, wxState.sr, wxState.ss);
            const isDay = wxState.phase !== 'night';

            const K = wxKindNow(cur.condition?.code, cur.condition?.text, cur.precip_mm, cur.temp_c, cur.cloud);
            const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };

            const isBD = /bangladesh/i.test(loc.country || '');
            const name = meta.label || [loc.name, loc.region].filter(Boolean).join(', ');
            set('weatherLocationName', `${name} · ${isBD ? 'বাংলাদেশ' : (loc.country || '')}`);
            { const sb = document.getElementById('weatherSourceBadge'); if (sb) sb.innerHTML = meta.kind === 'upazila' ? '<svg class="ic" aria-hidden="true"><use href="#i-map-pin"/></svg> আপনার উপজেলা' : meta.kind === 'home' ? '<svg class="ic" aria-hidden="true"><use href="#i-map-pin"/></svg> আপনার জেলা (সদর)' : meta.kind === 'gps' ? '<svg class="ic" aria-hidden="true"><use href="#i-crosshair"/></svg> লাইভ লোকেশন' : '<svg class="ic" aria-hidden="true"><use href="#i-search"/></svg> সার্চ করা স্থান'; }
            wxTickClock();
            clearInterval(wxClockTimer); wxClockTimer = setInterval(wxTickClock, 20000);
            set('weatherTemp', `${Math.round(cur.temp_c)}°`);
            set('weatherFeelsLike', `অনুভূত ${Math.round(cur.feelslike_c)}°`);
            set('weatherCondition', K.possible ? 'আশেপাশে বৃষ্টির সম্ভাবনা' : (cur.condition?.text || '—'));
            document.getElementById('weatherIcon').innerHTML = wxIcon(K.kind, isDay);
            wxState.updText = cur.last_updated ? 'আপডেট: ' + wxStampBn(cur.last_updated) : '';
            wxState.updEpoch = cur.last_updated_epoch || 0;
            wxPaintAgo();
            clearInterval(wxAgoTimer); wxAgoTimer = setInterval(wxPaintAgo, 30000);
            { // এই মুহূর্তে বৃষ্টি হচ্ছে কি না — স্পষ্ট করে বলা
                const pr = Number(cur.precip_mm) || 0;
                let nn = 'এখন বৃষ্টি হচ্ছে না';
                if (K.possible) nn = 'এখন বৃষ্টি মাপা যায়নি — আশেপাশে বৃষ্টির সম্ভাবনা আছে';
                else if (K.snow > 0) nn = 'এখন তুষার/শিলাবৃষ্টির তথ্য আছে';
                else if (K.rain > 0) nn = pr >= 0.1 ? `এখন বৃষ্টি হচ্ছে (মাপা: ${wxBn(pr.toFixed(1))} মিমি)` : 'আবহাওয়া মডেল অনুযায়ী এখন হালকা বৃষ্টি হচ্ছে';
                set('weatherNowNote', nn);
            }
            wxAutoStart();
            set('weatherHumidity', `${cur.humidity}%`);
            set('weatherWind', `${Math.round(cur.wind_kph)} কিমি/ঘণ্টা`);
            const todayChance = forecast[0]?.day?.daily_chance_of_rain;
            set('weatherRainChance', todayChance != null ? `${todayChance}%` : (cur.precip_mm > 0 ? 'হ্যাঁ' : 'কম'));
            set('weatherUv', String(cur.uv ?? '—'));
        
            document.getElementById('weatherCurrentCard')?.classList.remove('hidden');
            try {
                WxScene.mount(document.getElementById('weatherCanvas'));
                WxScene.set(Object.assign({ kind: K.kind, cover: K.cover, dark: K.dark, rain: K.rain, snow: K.snow, fog: K.fog, thunder: !!K.thunder, wind: Number(cur.wind_kph) || 0 }, wxSceneTime()));
            } catch (e) { console.warn('weather scene', e); }

            // আগামীকাল
            const tomorrow = forecast[1];
            let tomInfo = null;
            if (tomorrow) {
                const d = tomorrow.day, chance = d.daily_chance_of_rain ?? 0;
                tomInfo = { chance, max: d.maxtemp_c, min: d.mintemp_c };
                document.getElementById('weatherTomorrowCard')?.classList.remove('hidden');
                set('weatherTomorrowDate', weatherFormatDateBn(tomorrow.date));
                document.getElementById('weatherTomorrowIcon').innerHTML = wxIcon(wxKindDay(d).kind, true);
                set('weatherTomorrowCond', wxDayText(d));
                set('weatherTomorrowTemp', `সর্বোচ্চ ${Math.round(d.maxtemp_c)}° · সর্বনিম্ন ${Math.round(d.mintemp_c)}°`);
                set('weatherTomorrowRain', weatherBnChance(chance));
                set('weatherTomorrowSun', weatherBnSun(d));
                let note = chance >= 60 ? 'আগামীকাল ছাতা সাথে রাখুন। বাইরে বের হলে সাবধানে থাকুন।' : chance >= 30 ? 'হালকা বৃষ্টি হতে পারে। প্রয়োজনে ছাতা নিন।' : 'আগামীকাল সাধারণত শুষ্ক থাকার সম্ভাবনা বেশি।';
                if (d.maxtemp_c >= 35) note += ' তাপমাত্রা বেশ বেশি থাকতে পারে।';
                set('weatherTomorrowNote', note);
            }

            // মজার কথা
            wxFunSet(wxFunLines({ tom: tomInfo, cur: { kind: K.kind, temp: cur.temp_c, humidity: cur.humidity, wind: cur.wind_kph, uv: cur.uv, rain: K.rain, thunder: !!K.thunder, fog: K.fog > 0, night: !isDay } }));

            // আজ ও আগামীকাল
            const list = document.getElementById('weatherForecastList');
            if (list && forecast.length) {
                list.innerHTML = forecast.slice(0, 3).map((fd, i) => {
                    const day = fd.day, kk = wxKindDay(day).kind;
                    return `<div class="flex items-center gap-3 rounded-xl bg-[#07140e]/70 border border-emerald-900/25 px-3 py-2.5">
                        <div class="wx-icon-sm shrink-0">${wxIcon(kk, true)}</div>
                        <div class="flex-1 min-w-0"><p class="text-xs font-bold text-slate-100">${['আজ', 'আগামীকাল', 'পরশু'][i] || ''}</p><p class="text-[10px] text-slate-400 truncate">${wxDayText(day)}</p></div>
                        <div class="text-right shrink-0"><p class="text-xs font-bold text-white">${Math.round(day.maxtemp_c)}° / ${Math.round(day.mintemp_c)}°</p><p class="text-[10px] text-sky-400">বৃষ্টি ${day.daily_chance_of_rain ?? 0}%</p></div>
                    </div>`;
                }).join('');
                document.getElementById('weatherForecastCard')?.classList.remove('hidden');
            }

            // নিজ জেলার টিপ
            const tip = document.getElementById('weatherDistrictTip'), tipText = document.getElementById('weatherDistrictTipText');
            if (tip && tipText && (meta.kind === 'home' || meta.kind === 'upazila') && tomorrow) {
                tipText.textContent = ` আপনার ${meta.kind === 'upazila' ? 'এলাকা' : 'জেলা'} (${meta.label})-এ আগামীকাল ${weatherBnChance(tomorrow.day.daily_chance_of_rain || 0)}। ${weatherBnSun(tomorrow.day)}।`;
                tip.classList.remove('hidden');
            } else if (tip) tip.classList.add('hidden');

            weatherLoadedOnce = true;
            if (typeof refreshIcons === 'function') refreshIcons();
        }

        /* ---------- লোড ---------- */
        async function weatherLoad(lat, lon, meta, opts = {}) {
            weatherLastReq = { lat, lon, meta };
            const key = `${(+lat).toFixed(3)},${(+lon).toFixed(3)}`;
            const hit = wxCache.get(key);
            const reqId = ++weatherReqId;
            if (hit && !opts.force && Date.now() - hit.t < WX_CACHE_MS) { weatherRender(hit.data, meta); return; }
            if (!opts.silent) weatherShowLoading();
            try { wxMainAbort?.abort(); } catch (e) {}
            wxMainAbort = new AbortController();
            try {
                const data = await weatherFetchJson('/forecast.json', { q: `${lat},${lon}`, days: '3', aqi: 'no' }, wxMainAbort.signal);
                if (reqId !== weatherReqId) return;
                wxCache.set(key, { t: Date.now(), data });
                weatherRender(data, meta);
            } catch (err) {
                if (err.name === 'AbortError' || reqId !== weatherReqId) return;
                console.warn('weather load', err);
                if (opts.silent) return;
                weatherShowError('আবহাওয়া লোড করা যায়নি। ইন্টারনেট চেক করে আবার চেষ্টা করুন।');
            }
        }
        async function wxWaitDistrict() {
            for (let i = 0; i < 14; i++) {
                const d = (typeof userProfile !== 'undefined' && userProfile && userProfile.district) ? String(userProfile.district).trim() : '';
                if (d) return d;
                await new Promise(r => setTimeout(r, 250));
            }
            return '';
        }
        async function weatherLoadHome(force) {
            weatherShowLoading();
            const d = await wxWaitDistrict();
            const upz = (typeof userProfile !== 'undefined' && userProfile && userProfile.upazila) ? String(userProfile.upazila).trim() : '';
            const uInfo = wxFindUpazila(d, upz);
            if (uInfo) return weatherLoad(uInfo.lat, uInfo.lon, { label: uInfo.label, kind: 'upazila' }, { force });
            const info = wxFindDistrict(d);
            if (info) return weatherLoad(info.lat, info.lon, { label: info.bn, kind: 'home' }, { force });
            if (d) { // তালিকায় নেই — নাম দিয়ে চেষ্টা
                try {
                    const data = await weatherFetchJson('/forecast.json', { q: `${d}, Bangladesh`, days: '3', aqi: 'no' });
                    return weatherRender(data, { label: d, kind: 'home' });
                } catch (e) {}
            }
            const dh = wxDistInfo('ঢাকা');
            weatherLoad(dh.lat, dh.lon, { label: dh.bn, kind: 'search' }, { force });
        }

        /* ---------- লাইভ লোকেশন ---------- */
        async function wxReverseName(lat, lon) {
            try {
                const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 4500);
                const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=bn`, { signal: ctl.signal });
                clearTimeout(tm);
                if (!r.ok) return '';
                const j = await r.json();
                const a = j.locality || j.city || '';
                const b = j.principalSubdivision ? String(j.principalSubdivision).replace(/\s*(বিভাগ|Division)\s*$/i, '') : '';
                return [a, b && b !== a ? b : ''].filter(Boolean).join(', ');
            } catch (e) { return ''; }
        }
        function wxGeo(opts) { return new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, opts)); }
        window.weatherUseMyLocation = async () => {
            const homeFallback = () => weatherLoadHome(false);
            if (!navigator.geolocation) { showToast('এই ডিভাইসে লোকেশন সাপোর্ট নেই', 'map-pin-off', 'text-amber-400'); return homeFallback(); }
            if (window.isSecureContext === false) { showToast('লোকেশনের জন্য https সংযোগ লাগবে', 'map-pin-off', 'text-amber-400'); return homeFallback(); }
            if (/FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\//i.test(navigator.userAgent)) {
                weatherShowError('এই অ্যাপের ভেতরের ব্রাউজারে লোকেশন বন্ধ থাকে। ওয়েবসাইটটি Chrome/ডিফল্ট ব্রাউজারে খুলে লাইভ লোকেশন চেষ্টা করুন।');
                return;
            }
            try {
                if (navigator.permissions?.query) {
                    const st = await navigator.permissions.query({ name: 'geolocation' });
                    if (st.state === 'denied') {
                        weatherShowError('লোকেশন অনুমতি বন্ধ আছে। ব্রাউজারের ঠিকানা-বারের তালা আইকনে চাপ দিন → সাইট সেটিংস → লোকেশন → "অনুমতি দিন" করে আবার চেষ্টা করুন।');
                        return;
                    }
                }
            } catch (e) {}
            weatherShowLoading();
            let pos;
            try { pos = await wxGeo({ enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }); }
            catch (e1) {
                if (e1 && e1.code === 1) { weatherShowError('লোকেশন অনুমতি দেওয়া হয়নি। ব্রাউজারের সাইট সেটিংস থেকে লোকেশন "অনুমতি দিন" করে আবার চেষ্টা করুন।'); return; }
                try { pos = await wxGeo({ enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }); }
                catch (e2) { showToast('লোকেশন পাওয়া যায়নি — আপনার জেলার আবহাওয়া দেখানো হচ্ছে', 'map-pin-off', 'text-amber-400'); return homeFallback(); }
            }
            const lat = pos.coords.latitude, lon = pos.coords.longitude;
            let label = await wxReverseName(lat, lon);
            if (!label) {
                if (wxInBD(lat, lon)) { const n = wxNearestDistrict(lat, lon); label = `${n.bn} এর কাছাকাছি`; } else label = 'আপনার অবস্থান';
            }
            weatherLoad(lat, lon, { label, kind: 'gps' }, { force: true });
        };

        window.weatherOnOpen = () => {
            const inp = document.getElementById('weatherSearchInput'); if (inp) inp.value = '';
            document.getElementById('weatherSearchClear')?.classList.add('hidden');
            document.getElementById('weatherSuggestions')?.classList.add('hidden');
            weatherLoadHome(false); // সবসময় নিজের জেলা দিয়ে শুরু
        };
        window.weatherRefreshHome = () => { window.weatherClearSearch(); return weatherLoadHome(true); };   // পুল-টু-রিফ্রেশ: আগের সার্চ মুছে নিজের জেলা
        window.weatherRetry = () => {
            if (weatherLastReq) weatherLoad(weatherLastReq.lat, weatherLastReq.lon, weatherLastReq.meta, { force: true });
            else weatherLoadHome(true);
        };
        window.weatherClearSearch = () => {
            const inp = document.getElementById('weatherSearchInput'); if (inp) inp.value = '';
            document.getElementById('weatherSearchClear')?.classList.add('hidden');
            document.getElementById('weatherSuggestions')?.classList.add('hidden');
        };

        /* ---------- সার্চ ---------- */
        function wxLocalMatches(q) {
            const ql = q.toLowerCase().replace(/\s+/g, ''), out = [];
            for (const k in WX_DISTRICTS) {
                const en = WX_DISTRICTS[k][2].toLowerCase().replace(/\s+/g, '');
                if (k.startsWith(q) || k.includes(q) || en.startsWith(ql) || (ql.length > 2 && en.includes(ql))) out.push({ label: k, title: `${k} জেলা`, sub: WX_DISTRICTS[k][2], lat: WX_DISTRICTS[k][0], lon: WX_DISTRICTS[k][1], bd: true, local: true });
            }
            return out.sort((a, b) => (a.label.startsWith(q) ? 0 : 1) - (b.label.startsWith(q) ? 0 : 1)).slice(0, 6);
        }
        async function wxApiMatches(q) {
            try { wxSearchAbort?.abort(); } catch (e) {}
            wxSearchAbort = new AbortController();
            let list = await weatherFetchJson('/search.json', { q }, wxSearchAbort.signal);
            if (!Array.isArray(list)) return [];
            const ql = q.toLowerCase();
            list = list.slice().sort((a, b) => {
                const ab = /bangladesh/i.test(a.country || '') ? 0 : 1, bb = /bangladesh/i.test(b.country || '') ? 0 : 1;
                if (ab !== bb) return ab - bb;
                const as = (a.name || '').toLowerCase().startsWith(ql) ? 0 : 1, bs = (b.name || '').toLowerCase().startsWith(ql) ? 0 : 1;
                return as - bs;
            });
            return list.slice(0, 8).map(i => ({ label: [i.name, i.region].filter(Boolean).join(', '), title: [i.name, i.region, i.country].filter(Boolean).join(', '), sub: '', lat: i.lat, lon: i.lon, bd: /bangladesh/i.test(i.country || ''), local: false }));
        }
        function wxPlaceSuggestions() {
            const box = document.getElementById('weatherSuggestions'), wrap = document.getElementById('weatherSearchWrap');
            if (!box || !wrap) return;
            const r = wrap.getBoundingClientRect(), vv = window.visualViewport;
            const top = r.bottom + 6, bottomLimit = vv ? (vv.offsetTop + vv.height) : window.innerHeight;
            box.style.left = r.left + 'px'; box.style.width = r.width + 'px'; box.style.top = top + 'px';
            box.style.maxHeight = Math.max(130, Math.min(bottomLimit - top - 10, 380)) + 'px';
        }
        function wxRenderSuggestions(items) {
            const box = document.getElementById('weatherSuggestions'); if (!box) return;
            wxSugItems = items;
            if (!items.length) box.innerHTML = '<div class="px-3 py-3 text-xs text-slate-400">কোনো স্থান পাওয়া যায়নি</div>';
            else box.innerHTML = items.map((it, i) => `<button type="button" class="weather-sug-btn w-full text-left px-3 py-2.5 text-xs text-slate-100 hover:bg-emerald-900/40 border-b border-emerald-900/20 last:border-0 flex items-center gap-2" onclick="weatherPickSuggestion(${i})">
                <i data-lucide="${it.local ? 'map-pinned' : 'map-pin'}" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
                <span class="truncate flex-1">${it.title.replace(/</g, '&lt;')}${it.sub ? ` <span class="text-slate-400">· ${it.sub}</span>` : ''}</span>
                ${it.bd ? '<span class="text-[9px] font-bold text-emerald-400 shrink-0">BD</span>' : ''}</button>`).join('');
            wxPlaceSuggestions();
            box.classList.remove('hidden');
            if (typeof refreshIcons === 'function') refreshIcons();
        }
        window.weatherOnSearchInput = (val) => {
            const q = String(val || '').trim();
            document.getElementById('weatherSearchClear')?.classList.toggle('hidden', !q);
            clearTimeout(weatherSearchTimer);
            if (!q) { document.getElementById('weatherSuggestions')?.classList.add('hidden'); return; }
            const local = wxLocalMatches(q);
            if (local.length) wxRenderSuggestions(local);
            weatherSearchTimer = setTimeout(async () => {
                try {
                    const api = q.length >= 2 ? await wxApiMatches(q) : [];
                    const seen = new Set(local.map(l => `${l.lat.toFixed(1)},${l.lon.toFixed(1)}`));
                    const merged = local.concat(api.filter(a => !seen.has(`${(+a.lat).toFixed(1)},${(+a.lon).toFixed(1)}`)));
                    if ((document.getElementById('weatherSearchInput')?.value || '').trim() === q) wxRenderSuggestions(merged);
                } catch (e) { if (e.name !== 'AbortError') console.warn('weather search', e); }
            }, 240);
        };
        window.weatherPickSuggestion = (i) => {
            const it = wxSugItems[i]; if (!it) return;
            const inp = document.getElementById('weatherSearchInput'); if (inp) { inp.value = it.label; inp.blur(); }
            document.getElementById('weatherSuggestions')?.classList.add('hidden');
            document.getElementById('weatherSearchClear')?.classList.remove('hidden');
            weatherLoad(+it.lat, +it.lon, { label: it.label, kind: 'search' }, {});
        };
        window.weatherSearchSubmit = async () => {
            const q = (document.getElementById('weatherSearchInput')?.value || '').trim(); if (!q) return;
            document.getElementById('weatherSuggestions')?.classList.add('hidden');
            let items = wxLocalMatches(q);
            if (!items.length) { try { items = await wxApiMatches(q); } catch (e) {} }
            if (!items.length) { wxRenderSuggestions([]); return; }
            wxSugItems = items; weatherPickSuggestion(0);
        };
        window.weatherSelectSuggestion = (q) => { const i = document.getElementById('weatherSearchInput'); if (i) i.value = q; weatherSearchSubmit(); };

        (function wxInit() {
            // সার্চ লিস্ট body-তে নিয়ে যাওয়া — যাতে কোনো কার্ডের নিচে চাপা/কাটা না পড়ে
            const box = document.getElementById('weatherSuggestions');
            if (box && box.parentElement !== document.body) {
                document.body.appendChild(box);
                box.classList.remove('absolute', 'left-0', 'right-0', 'top-full', 'mt-1.5', 'z-[80]');
                box.style.position = 'fixed'; box.style.zIndex = '150';
            }
            const inp = document.getElementById('weatherSearchInput'), wrap = document.getElementById('weatherSearchWrap');
            inp?.addEventListener('focus', () => {
                setTimeout(() => { wrap?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(wxPlaceSuggestions, 350); }, 250);
                if (inp.value.trim()) window.weatherOnSearchInput(inp.value);
            });
            const rep = () => { if (!document.getElementById('weatherSuggestions')?.classList.contains('hidden')) wxPlaceSuggestions(); };
            window.addEventListener('scroll', rep, { passive: true }); window.addEventListener('resize', rep);
            window.visualViewport?.addEventListener('resize', rep); window.visualViewport?.addEventListener('scroll', rep);
            document.addEventListener('click', (e) => {
                const b = document.getElementById('weatherSuggestions');
                if (b && !e.target.closest?.('#weatherSearchWrap, #weatherSuggestions')) b.classList.add('hidden');
            });
        })();


        // ========== BOOT ==========
        document.getElementById('footerYear').textContent = new Date().getFullYear();
        const aF = document.getElementById('aboutFooterYear'); if (aF) aF.textContent = new Date().getFullYear();
        renderCategoryChips();
        renderNotices();
        renderEmergency();
        filterBloodDonors();
        renderChatMessages();
        renderNotifications();
        updateNotifBadge();
        updateCurrentPlanDisplay();
        updateThemeButtonsUI(); // Added to set initial UI state for theme buttons
        // Restore last tab on refresh (page persistence)
        try {
            const savedTab = localStorage.getItem('amar-elaka-tab');
            if (savedTab && document.getElementById('view-' + savedTab)) {
                // delay slightly so DOM & auth are ready; guests can only use public tabs
                setTimeout(() => {
                    const publicTabs = ['services', 'emergency', 'blood', 'news', 'launch'];
                    if (currentUser || publicTabs.includes(savedTab)) {
                        switchTab(savedTab);
                    }
                }, 100);
            }
        } catch (e) {}
        refreshIcons();
        updateOnlineUI(); // Initial offline banner state
        // Show default packages immediately; Firestore will override when ready
        try { renderSubscriptionPackages(); updatePaymentNumberDisplay(); } catch (e) {}
        if (firebaseReady) attachAppSettingsListener(); // Premium launch + packages + payment numbers

        // ========== AUTO-HIDING BOTTOM NAVIGATION ==========
        let lastScrollTop = 0;
        const scrollThreshold = 50;
        let ticking = false;
        const bottomNavElement = document.getElementById('bottomNav');
        let navHideTimer = null;

        function setBottomNavHidden(hidden) {
            if (!bottomNavElement) return;
            if (isForcedProfileMode) return;
            bottomNavElement.classList.toggle('nav-hidden', !!hidden);
            document.body.classList.toggle('nav-is-hidden', !!hidden);
            // Expand notif page to bottom when nav hides
            const np = document.getElementById('notifPanel');
            if (np && document.body.classList.contains('notif-page-open')) {
                np.style.bottom = hidden ? '0px' : '';
            }
        }
        window.setBottomNavHidden = setBottomNavHidden;

        window.addEventListener('scroll', () => {
            if (isForcedProfileMode) return;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (document.body.classList.contains('overflow-hidden') && !document.body.classList.contains('notif-page-open')) {
                        ticking = false;
                        return;
                    }
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                        setBottomNavHidden(true);
                    } else if (scrollTop < lastScrollTop - 4) {
                        setBottomNavHidden(false);
                    }
                    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Tap/click anywhere (except bottom nav / form controls) temporarily hides bottom nav — all sections
        document.addEventListener('click', (event) => {
            if (isForcedProfileMode) return;
            if (!currentUser && !document.getElementById('appContent')?.classList.contains('flex')) return;
            const t = event.target;
            if (!t || !t.closest) return;
            if (t.closest('#bottomNav, .bottom-nav, input, textarea, select, button, a, [contenteditable="true"], .notif-menu-pop, .modal-sheet, #sidebarDrawer, #sidebarBackdrop')) return;
            // Hide on content tap; show again after idle
            setBottomNavHidden(true);
            if (navHideTimer) clearTimeout(navHideTimer);
            navHideTimer = setTimeout(() => setBottomNavHidden(false), 2800);
        }, true);

        // Notif list scroll also toggles nav
        document.getElementById('notifList')?.addEventListener('scroll', () => {
            const el = document.getElementById('notifList');
            if (!el) return;
            if (el.scrollTop > 24) setBottomNavHidden(true);
            else setBottomNavHidden(false);
        }, { passive: true });

        // Guest preview interaction gate: ads, service cards, phone actions and protected controls require auth.
        document.addEventListener('click', (event) => {
            if (currentUser) return;
            const promo = event.target.closest('.promotion-card');
            const serviceAction = event.target.closest('.service-card .action-btn, .service-card a.call-action, .service-card');
            const phoneAction = event.target.closest('a[href^="tel:"], a.call-action');
            if (promo || serviceAction || phoneAction) {
                event.preventDefault(); event.stopPropagation();
                showAuthScreen(); switchAuthTab('login');
            }
        }, true);

        // ========== AUTH STATE LISTENER ==========
        if (firebaseReady) {
            onAuthStateChanged(auth, async (user) => {
                currentUser = user;
                hideSplash();
                
                if (user) {
                    stopGuestPreviewTimer();
                    sessionStorage.removeItem('ae_guest_preview_expired');
                    sessionStorage.removeItem('ae_guest_started_at');
                    hideAuthScreen();
                    if (!sessionStorage.getItem('ae_user_visit_logged')) { sessionStorage.setItem('ae_user_visit_logged', '1'); writeSiteAnalyticsEvent('user_visit'); }

                    try {
                        onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
                            if (docSnap.exists()) { 
                                userProfile = docSnap.data({ serverTimestamps: 'estimate' }); 
                                updateProfileUI(); 
                                syncThemeFromProfile(userProfile);
                                // Re-check if profile becomes complete/incomplete dynamically
                                if (!isForcedProfileMode && !isProfileComplete(userProfile)) {
                                    isForcedProfileMode = true;
                                    document.body.classList.add('force-profile-mode');
                                    setTimeout(() => {
                                        openEditProfileModal(true);
                                        showToast('শর্টকাট লগইনের জন্য অনুগ্রহ করে প্রোফাইল সম্পূর্ণ করুন!', 'shield-alert', 'text-amber-400');
                                    }, 500);
                                }
                            }
                        }, (e) => console.warn('User profile listener', e));

                        const snap = await getDoc(doc(db, 'users', user.uid));
                        userProfile = snap.exists() ? snap.data() : { email: user.email, fullName: user.displayName || user.email?.split('@')[0] || 'নাগরিক' };
                        updateProfileUI();
                        syncThemeFromProfile(userProfile);
                        attachRealtimeListeners();

                        // NEW FORCE PROFILE CHECK
                        if (!isProfileComplete(userProfile)) {
                            isForcedProfileMode = true;
                            document.body.classList.add('force-profile-mode');
                            setTimeout(() => {
                                openEditProfileModal(true);
                                showToast('শর্টকাট লগইনের জন্য অনুগ্রহ করে প্রোফাইল সম্পূর্ণ করুন!', 'shield-alert', 'text-amber-400');
                            }, 500);
                        } else {
                            isForcedProfileMode = false;
                            document.body.classList.remove('force-profile-mode');
                        }

                        // Start homepage services immediately — do not wait for lastLogin / push / favorites.
                        // loadServiceBatch is guarded by servicesLoading so duplicate calls are safe.
                        let earlyServicesPromise = null;
                        if (!isForcedProfileMode) {
                            earlyServicesPromise = loadServiceBatch(true);
                        }

                        try { await setDoc(doc(db, 'users', user.uid), { lastLogin: serverTimestamp() }, { merge: true }); await syncServerClock(user.uid); } catch (e) {}
                        const authEntryKind = sessionStorage.getItem('amar-welcome-pending');
                        if (authEntryKind === 'register') writeSiteAnalyticsEvent('register');
                        else { logSessionEvent(user.uid, 'login'); writeSiteAnalyticsEvent('login'); }

                        flushPendingActivity();
                        startUserHeartbeat();
                        startChatAutoClear();
                        startActivityTracking();
                        setupPushNotifications();
                        try { startUserActivitySession(); } catch (e) { console.warn(e); }

                        // ফ্লাটার থেকে আসা pending FCM টোকেন থাকলে লগইনের সাথে সাথে সেভ করুন
                        try {
                            const pendingFcm = sessionStorage.getItem('pending_fcm_token');
                            if (pendingFcm) saveTokenToFirestore(pendingFcm, user.uid);
                        } catch (e) {}

                        let pendingKind = null;
                        try { pendingKind = sessionStorage.getItem('amar-welcome-pending'); if (pendingKind) sessionStorage.removeItem('amar-welcome-pending'); } catch (e) {}
                        if (pendingKind) pushWelcomeNotification(pendingKind);

                        updateNotifBadge();
                        renderNotifications();

                        // Favorites in parallel; services already started earlier when profile is complete.
                        const favoritesLoadPromise = loadUserFavorites();
                        const servicesLoadPromise = earlyServicesPromise || loadServiceBatch(true);
                        await Promise.all([servicesLoadPromise, favoritesLoadPromise]);
                        // Restore last tab after login
                        try {
                            const savedTab = localStorage.getItem('amar-elaka-tab');
                            if (savedTab && document.getElementById('view-' + savedTab) && savedTab !== 'services') {
                                switchTab(savedTab);
                            }
                        } catch (e) {}
                        // নোটিফিকেশন লিংক ?chat=<uid> থাকলে সরাসরি ওই চ্যাট খুলবে
                        try {
                            const cu = new URLSearchParams(location.search).get('chat');
                            if (cu) {
                                history.replaceState(null, '', location.pathname + location.hash);
                                setTimeout(() => window.mesesuOpenFromPush(cu), 600);
                            }
                        } catch (e) {}

                        if (unsubscribeChat) unsubscribeChat();
                        chatInitialLoadDone = false;
                        const q = query(collection(db, `chats/${user.uid}/messages`), orderBy('createdAt', 'asc'));
                        unsubscribeChat = onSnapshot(q, snap => {
                            const isInitial = !chatInitialLoadDone;
                            chatInitialLoadDone = true;
                            adminChatMessages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                            // Do not let the Admin listener overwrite an open community DM.
                            if (mesesuMode !== 'dm') {
                                chatMessages = adminChatMessages.slice();
                                renderChatMessages();
                            }
                            updateUnreadBadge();
                            if (currentTab === 'chat' && mesesuMode === 'admin') setTimeout(async () => await markMessagesAsRead(), 500);
                            if (!isInitial) {
                                snap.docChanges().forEach(change => {
                                    if (change.type === 'added') {
                                        const msg = change.doc.data();
                                        if (msg.sender === 'admin' && currentTab !== 'chat') {
                                            addNotification({ id: `adminreply-${change.doc.id}`, type: 'chat', title: 'অ্যাডমিন সাপোর্টের উত্তর', body: (msg.text || '').substring(0, 100), icon: 'headset', clickAction: 'chat' });
                                        }
                                    }
                                });
                            }
                        }, err => console.warn('chat listener:', err.code || err.message));
                        // Mesesu ইনবক্স লিস্টেনার লগইনের পর থেকেই চলবে (হোমপেজ ব্যাজ + আনরিড কাউন্ট)
                        try {
                            mesesuBadgeSeenMs = Math.max(Number(userProfile?.mesesuBadgeSeenAt) || 0, parseInt(lsGet('amar-mesesu-badgeseen-' + user.uid, '0'), 10) || 0);
                            mesesuBadgeSavedMs = mesesuBadgeSeenMs;
                            mesesuListenInbox();
                        } catch (e) { console.warn('mesesu inbox start', e); }
                    } catch (e) {
                        console.error(e);
                        showToast('প্রোফাইল লোড ব্যর্থ: ' + e.message, 'circle-x', 'text-rose-400');
                    }
                } else {
                    userProfile = null; currentUser = null; chatInitialLoadDone = false; adminChatMessages = []; chatMessages = [];
                    isForcedProfileMode = false;
                    document.body.classList.remove('force-profile-mode');
                    if (unsubscribeChat) { unsubscribeChat(); unsubscribeChat = null; }
                    try { if (unsubscribeInbox) unsubscribeInbox(); } catch (e) {}
                    unsubscribeInbox = null; mesesuInboxUid = null;
                    mesesuInboxCache = []; mesesuApprovedThreads = []; mesesuRequestsCache = []; mesesuRejectedCache = [];
                    mesesuBadgeSeenMs = 0; mesesuBadgeSavedMs = 0;
                    try { mesesuStopPeerWatchers(); mesesuStopPeerWatch(); } catch (e) {}
                    if (unsubscribeAdminStatus) { unsubscribeAdminStatus(); unsubscribeAdminStatus = null; }
                    [unsubCategories, unsubEmergency, unsubBlood, unsubNotices, unsubPromotions].forEach(fn => { try { fn?.(); } catch(e){} });
                    unsubCategories = unsubEmergency = unsubBlood = unsubNotices = unsubPromotions = null;
                    // Stop account/payment configuration listener for guests.
                    if (unsubAppSettings) { try { unsubAppSettings(); } catch (e) {} unsubAppSettings = null; }
                    promotionsCache = []; closePromotionFormModal();

                    if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
                    if (activityUpdateInterval) { clearInterval(activityUpdateInterval); activityUpdateInterval = null; }
                    if (servicesObserver) { servicesObserver.disconnect(); servicesObserver = null; }
                    if (noticeSliderInterval) { clearInterval(noticeSliderInterval); noticeSliderInterval = null; }
                    lastActivityTimestamp = null;
                    chatMessages = [];
                    userFavorites = new Set(); favoritesLoaded = false;
                    favoritesCache = [];
                    servicesCache = []; servicesSeenIds = new Set();
                    serviceDataCache = new Map();
                    resetAdFeedState();
                    allServiceIds = []; shuffledIds = []; currentBatchIndex = 0;
                    servicesFirstLoadDone = false; servicesLoopCount = 0;
                    servicesFullIndexReady = false; servicesFullIndexLoading = false;
                    allServicesFullCache = null;
                    lastRenderedCount = 0; lastAdCountAtRender = -1;
                    animationQueueCounter = 0; wasInSearchMode = false;
                    const grid = document.getElementById('servicesGrid'); if (grid) grid.innerHTML = '';
                    const favGrid = document.getElementById('favoritesGrid'); if (favGrid) favGrid.innerHTML = '';
                    
                    isUserPremium = false;
                    activeCategory = 'all';
                    myUpazilaFilterOn = false;
                    currentTab = 'services';
                    document.body.classList.remove('chat-active');

                    renderChatMessages(); renderNotifications(); updateNotifBadge(); updateCurrentPlanDisplay(); renderFavorites();
                    showGuestApp();
                    // Public preview data: guests may read only the collections shown in the public sections.
                    if (firebaseReady) { attachRealtimeListeners(); loadServiceBatch(true); }
                }
            });
        }

        window.addEventListener('load', refreshIcons);

        // পেজ লোডের পর ফ্লাটার অ্যাপের কাছে FCM টোকেন চাওয়া
        function requestNativeFcmToken() {
            try {
                if (window.FlutterBridge) {
                    window.FlutterBridge.postMessage('request_fcm_token');
                }
            } catch (e) { console.warn('FCM token request failed', e); }
        }
        if (document.readyState === 'complete') requestNativeFcmToken();
        else window.addEventListener('load', requestNativeFcmToken);
        setTimeout(refreshIcons, 300);
        setTimeout(refreshIcons, 1200);
    
        // ========== AMAR ELAKA: SECTION-AWARE PULL TO REFRESH ==========
        (() => {
            const ICON_BY_TAB = {
                services: 'house',
                emergency: 'siren',
                blood: 'droplet',
                weather: 'cloud-sun',
                profile: 'user-round',
                chat: 'headset'
            };
            const LABEL_BY_TAB = {
                services: 'Home',
                emergency: 'জরুরী',
                blood: 'রক্ত',
                weather: 'আবহাওয়া',
                profile: 'Profile',
                chat: 'Admin Support'
            };
            const THRESHOLD = 78;
            const MAX_PULL = 112;
            let ptrStartY = 0;
            let ptrStartX = 0;
            let ptrPull = 0;
            let ptrTracking = false;
            let ptrRefreshing = false;
            let ptrScrollTarget = null;
            let ptrIndicator = null;

            function ensurePtrIndicator() {
                if (ptrIndicator) return ptrIndicator;
                ptrIndicator = document.createElement('div');
                ptrIndicator.id = 'amarElakaPullRefresh';
                ptrIndicator.setAttribute('role', 'status');
                ptrIndicator.setAttribute('aria-live', 'polite');
                ptrIndicator.innerHTML = '<span class="ptr-ring"></span><i class="ptr-icon" data-lucide="house"></i>';
                document.body.appendChild(ptrIndicator);
                if (typeof refreshIcons === 'function') refreshIcons();
                return ptrIndicator;
            }

            function getPtrTab() {
                return ICON_BY_TAB[currentTab] ? currentTab : 'services';
            }

            function updatePtrIcon() {
                const el = ensurePtrIndicator();
                const tab = getPtrTab();
                el.classList.toggle('ptr-blood', tab === 'blood');
                const icon = ICON_BY_TAB[tab] || 'house';
                const oldIcon = el.querySelector('.ptr-icon');
                if (oldIcon && oldIcon.getAttribute('data-lucide') !== icon) {
                    oldIcon.setAttribute('data-lucide', icon);
                    oldIcon.innerHTML = '';
                    if (typeof refreshIcons === 'function') refreshIcons();
                }
                el.setAttribute('aria-label', `${LABEL_BY_TAB[tab] || 'Home'} রিফ্রেশ হচ্ছে`);
                return el;
            }

            function setPtrPull(distance) {
                const el = updatePtrIcon();
                ptrPull = Math.max(0, Math.min(MAX_PULL, distance));
                const progress = Math.min(1, ptrPull / THRESHOLD);
                const eased = Math.min(1, progress * (0.82 + progress * 0.18));
                el.style.top = `${8 + eased * 37}px`;
                el.style.opacity = String(Math.min(1, progress * 1.25));
                el.style.transform = `translate(-50%, ${-20 + eased * 20}px) scale(${0.82 + eased * 0.18})`;
                el.classList.add('ptr-visible');
                el.classList.toggle('ptr-armed', ptrPull >= THRESHOLD);
                const ring = el.querySelector('.ptr-ring');
                if (ring) ring.style.opacity = String(0.22 + progress * 0.78);
            }

            function hidePtr() {
                if (!ptrIndicator || ptrRefreshing) return;
                ptrIndicator.classList.remove('ptr-visible', 'ptr-armed');
                ptrIndicator.style.opacity = '0';
                ptrIndicator.style.top = '8px';
                ptrIndicator.style.transform = 'translate(-50%, -72px) scale(.82)';
                const ring = ptrIndicator.querySelector('.ptr-ring');
                if (ring) ring.style.opacity = '.25';
                ptrPull = 0;
            }

            function findEligibleScrollTarget(target) {
                if (currentTab === 'chat') {
                    const chatBox = document.getElementById('chatMessages');
                    if (chatBox && (target === chatBox || chatBox.contains(target))) {
                        return chatBox.scrollTop <= 0 ? chatBox : null;
                    }
                    return null;
                }
                return (window.scrollY <= 0 || document.documentElement.scrollTop <= 0) ? window : null;
            }

            async function refreshCurrentSection() {
                if (ptrRefreshing) return;
                ptrRefreshing = true;
                const tab = getPtrTab();
                const el = updatePtrIcon();
                el.classList.add('ptr-visible', 'ptr-refreshing');
                el.classList.remove('ptr-armed');
                el.style.opacity = '1';
                el.style.top = '8px';
                el.style.transform = 'translate(-50%, 0) scale(1)';

                try {
                    if (!firebaseReady || !navigator.onLine) {
                        // Keep locally cached content visible when offline; no forced reload.
                        if (tab === 'services') renderServices();
                        else if (tab === 'emergency') renderEmergency();
                        else if (tab === 'blood') filterBloodDonors();
                        else if (tab === 'weather' && typeof weatherRefreshHome === 'function') weatherRefreshHome();
                        else if (tab === 'profile') updateProfileUI();
                        else if (tab === 'chat') renderChatMessages();
                        if (!navigator.onLine) {
                            showToast('অফলাইন — সংরক্ষিত ডেটা দেখানো হচ্ছে', 'wifi-off', 'text-amber-400');
                        }
                    } else if (tab === 'services') {
                        await loadServiceBatch(true);
                        // Home also displays notices; refresh their snapshot without replacing listeners.
                        const noticeSnap = await getDocs(collection(db, 'notices'));
                        notices = noticeSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                        renderNotices();
                    } else if (tab === 'emergency') {
                        const snap = await getDocs(collection(db, 'emergency'));
                        emergencyList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                        renderEmergency();
                    } else if (tab === 'blood') {
                        const snap = await getDocs(collection(db, 'bloodDonors'));
                        bloodDonors = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                        filterBloodDonors();
                    } else if (tab === 'weather') {
                        if (typeof weatherRefreshHome === 'function') await weatherRefreshHome();
                    } else if (tab === 'profile') {
                        if (currentUser) {
                            const snap = await getDoc(doc(db, 'users', currentUser.uid));
                            if (snap.exists()) userProfile = snap.data();
                        }
                        updateProfileUI();
                        updateCurrentPlanDisplay();
                    } else if (tab === 'chat') {
                        if (currentUser) {
                            const q = query(collection(db, `chats/${currentUser.uid}/messages`), orderBy('createdAt', 'asc'));
                            const snap = await getDocs(q);
                            chatMessages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                        }
                        renderChatMessages();
                        updateUnreadBadge();
                    }
                    if (typeof refreshIcons === 'function') refreshIcons();
                } catch (err) {
                    console.warn('Pull-to-refresh failed:', err);
                    showToast('রিফ্রেশ করা যায়নি — আবার চেষ্টা করুন', 'wifi-off', 'text-rose-400');
                } finally {
                    // Keep the ring visible briefly so the completion feels deliberate.
                    setTimeout(() => {
                        ptrRefreshing = false;
                        if (ptrIndicator) {
                            ptrIndicator.classList.remove('ptr-refreshing', 'ptr-visible', 'ptr-armed');
                            ptrIndicator.style.opacity = '0';
                            ptrIndicator.style.top = '8px';
                            ptrIndicator.style.transform = 'translate(-50%, -72px) scale(.82)';
                        }
                        ptrPull = 0;
                    }, 380);
                }
            }

            document.addEventListener('touchstart', (event) => {
                if (ptrRefreshing || event.touches.length !== 1) return;
                if (document.body.classList.contains('overflow-hidden')) return;
                const target = event.target;
                if (target.closest('#view-map')) return; // ম্যাপ টানলে পুল-টু-রিফ্রেশ চালু হবে না
                if (target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
                const scrollTarget = findEligibleScrollTarget(target);
                if (!scrollTarget) return;
                ptrScrollTarget = scrollTarget;
                ptrStartY = event.touches[0].clientY;
                ptrStartX = event.touches[0].clientX;
                ptrPull = 0;
                ptrTracking = true;
            }, { passive: true });

            document.addEventListener('touchmove', (event) => {
                if (!ptrTracking || ptrRefreshing || event.touches.length !== 1) return;
                const dy = event.touches[0].clientY - ptrStartY;
                const dx = event.touches[0].clientX - ptrStartX;
                if (Math.abs(dx) > Math.abs(dy) * 1.15) {
                    ptrTracking = false;
                    hidePtr();
                    return;
                }
                if (dy <= 0) {
                    hidePtr();
                    return;
                }
                if (ptrScrollTarget === window) {
                    if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
                        ptrTracking = false;
                        hidePtr();
                        return;
                    }
                } else if (ptrScrollTarget && ptrScrollTarget.scrollTop > 0) {
                    ptrTracking = false;
                    hidePtr();
                    return;
                }
                // Keep native vertical touch scrolling enabled. The page-level overscroll
                // behavior already suppresses browser pull-to-refresh where supported.
                setPtrPull(Math.min(MAX_PULL, dy * 0.58));
            }, { passive: false });

            function finishPtrGesture() {
                if (!ptrTracking) return;
                ptrTracking = false;
                if (ptrPull >= THRESHOLD) {
                    refreshCurrentSection();
                } else {
                    hidePtr();
                }
                ptrScrollTarget = null;
            }
            document.addEventListener('touchend', finishPtrGesture, { passive: true });
            document.addEventListener('touchcancel', () => {
                ptrTracking = false;
                ptrScrollTarget = null;
                hidePtr();
            }, { passive: true });

            // Update the icon immediately whenever the existing tab switcher changes section.
            const originalSwitchTab = window.switchTab;
            if (typeof originalSwitchTab === 'function') {
                window.switchTab = (...args) => {
                    const result = originalSwitchTab(...args);
                    updatePtrIcon();
                    return result;
                };
            }
            ensurePtrIndicator();
            updatePtrIcon();
        })();

        // ========== BACK BUTTON নেভিগেশন (ওয়েবসাইট থেকে বের না করে আগের পেজে ফেরা) ==========
        (function aeBackNavigation() {
            const TAB_HOME = 'services';
            const EXIT_WINDOW_MS = 2000;
            const MODAL_IDS = ['aeVideoModal','providerModal','serviceDetailModal','promotionDetailModal','categoryModal','noticeModal','feedbackModal','ratingModal','aboutModal','termsModal','resultModal','contactModal','editProfileModal','changePasswordModal','chatInfoModal','userEmergencyRequestModal','userBloodRequestModal','promotionFormModal','premiumActionModal','downloadAppModal','otherDownloadSourcesModal'];
            let tabStack = [{ tab: TAB_HOME, scroll: 0 }];
            let internalNav = false;
            let armed = false;
            let lastHomeBackAt = 0;

            function visible(el) {
                if (!el || el.classList.contains('hidden')) return false;
                const cs = getComputedStyle(el);
                return cs.display !== 'none' && cs.visibility !== 'hidden';
            }
            function capName(id) { return 'close' + id.charAt(0).toUpperCase() + id.slice(1); }

            // সবচেয়ে উপরের খোলা মোডাল/ফর্ম খুঁজে বের করা
            function topOpenModal() {
                const set = new Set();
                MODAL_IDS.forEach(id => { const el = document.getElementById(id); if (el) set.add(el); });
                document.querySelectorAll('.modal-sheet-parent').forEach(el => set.add(el));
                let best = null, bestZ = -1, bestIdx = -1, idx = 0;
                set.forEach(el => {
                    idx++;
                    if (!visible(el)) return;
                    const cs = getComputedStyle(el);
                    if (cs.position !== 'fixed') return;
                    const z = parseInt(cs.zIndex, 10) || 0;
                    if (z > bestZ || (z === bestZ && idx > bestIdx)) { best = el; bestZ = z; bestIdx = idx; }
                });
                return best;
            }
            function closeModalEl(el) {
                const id = el.id || '';
                const fn = id ? window[capName(id)] : null;
                if (typeof fn === 'function') { try { fn(); } catch (e) {} }
                if (visible(el)) {
                    el.classList.add('hidden'); el.classList.remove('flex');
                    try { document.body.classList.remove('overflow-hidden'); } catch (e) {}
                }
            }
            function sidebarOpen() {
                const d = document.getElementById('sidebarDrawer');
                return !!d && d.classList.contains('translate-x-0');
            }
            function toastSafe(msg, icon, color) { try { showToast(msg, icon, color); } catch (e) {} }

            function scrollTo(y) {
                const go = () => { try { window.scrollTo(0, y || 0); } catch (e) {} };
                requestAnimationFrame(go); setTimeout(go, 80); setTimeout(go, 250);
            }

            // ব্যাক চাপলে কী হবে — true মানে ওয়েবসাইট থেকে বের হওয়া যাবে
            function handleBack() {
                // ১) প্রোফাইল সম্পূর্ণ করা বাধ্যতামূলক হলে বের/ক্লোজ হবে না
                if (isForcedProfileMode) {
                    toastSafe('অনুগ্রহ করে আগে প্রোফাইল সম্পূর্ণ করুন!', 'shield-alert', 'text-rose-400');
                    return false;
                }
                // ২) খোলা ফর্ম / মোডাল / ডিটেইল পপআপ
                const modal = topOpenModal();
                if (modal) { closeModalEl(modal); return false; }
                // ৩) চ্যাট মেনু ড্রপডাউন
                const dd = document.getElementById('mesesuMenuDropdown');
                if (dd && !dd.classList.contains('hidden')) { dd.classList.add('hidden'); return false; }
                // ৪) সাইডবার
                if (sidebarOpen()) { try { closeSidebar(); } catch (e) {} return false; }
                // ৫) নোটিফিকেশন পেজ
                if (document.body.classList.contains('notif-page-open')) { try { closeNotifPanel(); } catch (e) {} return false; }
                // ৬) চ্যাটের ভেতরের পেজ (রিকুয়েস্ট/থ্রেড) → আগের চ্যাট স্তরে
                if (currentTab === 'chat') {
                    try {
                        if (typeof mesesuSubView !== 'undefined' && mesesuSubView) { mesesuCloseSubView(); return false; }
                        if (document.body.classList.contains('chat-thread')) { mesesuBackToInbox(); return false; }
                    } catch (e) {}
                }
                // ৭) লগইন/রেজিস্টার পেজ
                const authEl = document.getElementById('authSection');
                if (authEl && !authEl.classList.contains('hidden')) {
                    const rForm = document.getElementById('registerForm');
                    if (rForm && !rForm.classList.contains('hidden')) { try { switchAuthTab('login'); } catch (e) {} return false; }
                    let expired = false;
                    try { expired = sessionStorage.getItem('ae_guest_preview_expired') === '1'; } catch (e) {}
                    if (!currentUser && !expired) { showGuestApp(); return false; }
                    // গেস্ট সময় শেষ: লগইন বাধ্যতামূলক, তাই ভেতরে ফেরানো যাবে না → বের হওয়ার নিয়ম
                    return confirmExit();
                }
                // ৮) আগের পেজে (ট্যাবে) ফেরা
                while (tabStack.length > 1) {
                    tabStack.pop();
                    const target = tabStack[tabStack.length - 1];
                    internalNav = true;
                    try { window.switchTab(target.tab); } catch (e) {}
                    internalNav = false;
                    if (currentTab === target.tab) { scrollTo(target.scroll); return false; }
                }
                // ৯) স্ট্যাক ফাঁকা কিন্তু হোমে নেই (যেমন সরাসরি শেষ দেখা ট্যাবে খুলেছে) → হোমে
                if (currentTab !== TAB_HOME) {
                    internalNav = true;
                    try { window.switchTab(TAB_HOME); } catch (e) {}
                    internalNav = false;
                    tabStack = [{ tab: TAB_HOME, scroll: 0 }];
                    if (currentTab === TAB_HOME) { scrollTo(0); return false; }
                }
                // ১০) হোম পেজ: ২ বার ব্যাক চাপলে তবেই বের হবে
                return confirmExit();
            }
            function confirmExit() {
                const now = Date.now();
                if (now - lastHomeBackAt <= EXIT_WINDOW_MS) { lastHomeBackAt = 0; return true; }
                lastHomeBackAt = now;
                toastSafe('বের হতে আবার ব্যাক চাপুন', 'log-out', 'text-slate-300');
                return false;
            }

            // --- ব্রাউজার হিস্টরি গার্ড ---
            function arm() {
                if (armed) return;
                try {
                    if (history.state && history.state.ae === 'app') { armed = true; return; }
                    history.replaceState({ ae: 'guard' }, '', location.href);
                    history.pushState({ ae: 'app' }, '', location.href);
                    armed = true;
                } catch (e) {}
            }
            ['pointerdown', 'touchstart', 'keydown', 'click'].forEach(ev => {
                window.addEventListener(ev, function once() {
                    arm();
                    if (armed) window.removeEventListener(ev, once, true);
                }, { capture: true, passive: true });
            });
            // পেজ রিলোডের পর আগের গার্ড থাকলে সেটিই ব্যবহার হবে
            try { if (history.state && history.state.ae === 'app') armed = true; } catch (e) {}

            window.addEventListener('popstate', (e) => {
                const st = e.state;
                if (!st || st.ae !== 'guard') return;   // শুধু গার্ড এন্ট্রিতে ফেরাই "ব্যাক"
                let exit = false;
                try { exit = handleBack(); } catch (err) { console.warn('back handler', err); }
                if (exit) {
                    armed = false;
                    try { history.back(); } catch (err) {}
                } else {
                    try { history.pushState({ ae: 'app' }, '', location.href); } catch (err) {}
                }
            });

            // --- ট্যাব পরিবর্তনের ইতিহাস রাখা ---
            const origSwitchTab = window.switchTab;
            if (typeof origSwitchTab === 'function') {
                window.switchTab = function (tabName, ...rest) {
                    const before = currentTab;
                    const scrollBefore = window.scrollY || 0;
                    const result = origSwitchTab.call(this, tabName, ...rest);
                    if (!internalNav && currentTab !== before) {
                        if (currentTab === TAB_HOME) {
                            tabStack = [{ tab: TAB_HOME, scroll: 0 }];
                        } else {
                            if (tabStack.length) tabStack[tabStack.length - 1].scroll = scrollBefore;
                            tabStack.push({ tab: currentTab, scroll: 0 });
                            if (tabStack.length > 40) tabStack.shift();
                        }
                    }
                    return result;
                };
            }
            window.__aeNavReset = () => { tabStack = [{ tab: TAB_HOME, scroll: 0 }]; lastHomeBackAt = 0; };
        })();




/* ---------- Firebase Cloud Messaging সার্ভিস ওয়ার্কার রেজিস্ট্রেশন (অপরিবর্তিত) ---------- */
        // Service Worker: শুধু http/https এ এবং ফাইলটি সত্যিই থাকলে রেজিস্টার হবে (প্রিভিউ/ফাইল মোডে TypeError আসবে না)
        if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
            window.addEventListener('load', async () => {
                try {
                    const swUrl = '/firebase-messaging-sw.js';
                    const res = await fetch(swUrl, { method: 'GET', cache: 'no-store' });
                    const type = (res.headers.get('content-type') || '').toLowerCase();
                    if (!res.ok || (type && !/javascript|ecmascript/.test(type))) {
                        console.info('SW skipped: firebase-messaging-sw.js not found at root');
                        return;
                    }
                    const registration = await navigator.serviceWorker.register(swUrl);
                    console.log('SW Registered with scope: ', registration.scope);
                } catch (err) {
                    console.info('SW not registered:', (err && err.message) || err);
                }
            });
        }


/* ---------- প্যাকেজ সেকশনে স্ক্রল করা ---------- */
        function scrollToPackages() {
            var el = document.getElementById('packagesSectionTitle');
            if (!el) return;
            var y = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - 90;
            try { window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' }); }
            catch (e) { window.scrollTo(0, Math.max(0, y)); }
        }

// module স্কোপে থাকায় onclick="scrollToPackages()" কাজ করার জন্য window এ এক্সপোজ করা আবশ্যক
window.scrollToPackages = scrollToPackages;

// ========== NEWS (খবর) ==========
const NEWS_API = 'https://script.google.com/macros/s/AKfycbzlhp2lCR99K__qkaRX2BwzWFlWLwD6QOrGt910i6rXR0o6b41lur1ay1APaRKfZKCy/exec';
let newsCat = 'bd';
let newsReqId = 0;
const newsCache = {};

function newsTimeAgo(ms) {
    if (!ms) return '';
    const en = currentLang === 'en';
    const bn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
    const m = Math.floor(Math.max(0, Date.now() - ms) / 60000);
    if (m < 1) return en ? 'Just now' : 'এইমাত্র';
    if (m < 60) return en ? `${m} min ago` : `${bn(m)} মিনিট আগে`;
    const h = Math.floor(m / 60);
    if (h < 24) return en ? `${h} hr ago` : `${bn(h)} ঘণ্টা আগে`;
    const d = Math.floor(h / 24);
    return en ? `${d} day ago` : `${bn(d)} দিন আগে`;
}
function newsSafeUrl(u) { return /^https?:\/\//i.test(u || '') ? u : ''; }

function newsRender(items) {
    const box = document.getElementById('newsList');
    if (!box) return;
    if (!items || !items.length) {
        box.innerHTML = `<div class="info-card p-6 text-center text-xs text-slate-400">${esc(t('news.empty'))}</div>`;
        return;
    }
    box.innerHTML = items.map(n => {
        const link = newsSafeUrl(n.link), img = newsSafeUrl(n.img);
        return `<a href="${esc(link)}" target="_blank" rel="noopener noreferrer" class="info-card flex gap-3 p-3">
            ${img ? `<img src="${esc(img)}" loading="lazy" referrerpolicy="no-referrer" alt="" class="w-24 h-24 rounded-xl object-cover shrink-0" onerror="this.remove()">` : ''}
            <div class="min-w-0 flex-1">
                <h4 class="text-sm font-bold text-slate-100 leading-snug line-clamp-3">${esc(n.title)}</h4>
                ${n.summary ? `<p class="text-[11px] text-slate-400 mt-1 line-clamp-2">${esc(n.summary)}</p>` : ''}
                <p class="text-[10px] text-emerald-400 mt-1.5 font-semibold">${esc(n.source)} · <span class="text-slate-500 font-normal">${esc(newsTimeAgo(n.time))}</span></p>
            </div>
        </a>`;
    }).join('');
}

function newsShowUpdated(at) {
    const el = document.getElementById('newsUpdated');
    if (!el || !at) return;
    el.textContent = (currentLang === 'en' ? 'Updated ' : 'আপডেট: ') + newsTimeAgo(at);
}

async function newsLoad(force) {
    const box = document.getElementById('newsList');
    if (!box) return;
    const cat = newsCat;
    const myReq = ++newsReqId;
    let cached = newsCache[cat];
    if (!cached) {
        try { cached = JSON.parse(localStorage.getItem('ae-news-' + cat) || 'null'); } catch (e) {}
        if (cached) newsCache[cat] = cached;
    }
    if (cached) { newsRender(cached.items); newsShowUpdated(cached.at); }
    if (cached && !force && Date.now() - cached.at < 10 * 60 * 1000) return;
    if (!cached) box.innerHTML = `<div class="info-card p-6 text-center text-xs text-slate-400">${esc(t('news.loading'))}</div>`;
    try {
        const res = await fetch(`${NEWS_API}?cat=${cat}`);
        const data = await res.json();
        const fresh = { items: Array.isArray(data.items) ? data.items : [], at: Date.now() };
        newsCache[cat] = fresh;
        try { localStorage.setItem('ae-news-' + cat, JSON.stringify(fresh)); } catch (e) {}
        if (myReq === newsReqId && cat === newsCat) { newsRender(fresh.items); newsShowUpdated(fresh.at); }
    } catch (e) {
        if (myReq === newsReqId && !cached) {
            box.innerHTML = `<div class="info-card p-6 text-center space-y-3"><p class="text-xs text-slate-400">${esc(t('news.error'))}</p><button type="button" onclick="newsLoad(true)" class="news-cat-btn active">${esc(t('news.retry'))}</button></div>`;
        }
    }
}

window.newsLoad = newsLoad;
window.newsSetCat = (cat) => {
    newsCat = cat === 'world' ? 'world' : 'bd';
    document.getElementById('news-cat-bd')?.classList.toggle('active', newsCat === 'bd');
    document.getElementById('news-cat-world')?.classList.toggle('active', newsCat === 'world');
    newsLoad(false);
};
function newsOnOpen() { newsLoad(false); }

// ========== LAUNCH SCHEDULE (লঞ্চের সময়সূচী) ==========
// নতুন রুট যোগ করতে LAUNCH_ROUTES এ আরেকটি { id, from, to, list: [...] } যোগ করুন।
// প্রতিটি লঞ্চ: n = নাম, d = দেখানোর সময়, t = ২৪ ঘণ্টার সময় (HH:MM), p = মোবাইল নম্বর (ফাঁকা থাকলে কল বাটন আসবে না)
const LAUNCH_UPDATED = '২৫ নভেম্বর ২০২৬';
const LAUNCH_ROUTES = [
    {
        id: 'chd-dhk', from: 'চাঁদপুর', to: 'ঢাকা', fromEn: 'Chandpur', toEn: 'Dhaka',
        list: [
            { n: 'সোনার তরী/বাঘের হাট', d: 'সকাল ৬:৪৫', t: '06:45', p: '' },
            { n: 'এম.ভি সোনার তরী', d: 'সকাল ৭:২০', t: '07:20', p: '' },
            { n: 'এম.ভি মেঘনারানী', d: 'সকাল ৮:০০', t: '08:00', p: '' },
            { n: 'এম.ভি মেঘনা রাণী', d: 'সকাল ৮:০০', t: '08:00', p: '' },
            { n: 'এম.ভি বোগদাদীয়া ৭', d: 'সকাল ৮:৩০', t: '08:30', p: '' },
            { n: 'এম.ভি আব এ জমজম-১ / এম.ভি তাকওয়া', d: 'সকাল ৯:১৫', t: '09:15', p: '' },
            { n: 'এম.ভি মিতালী-২', d: 'সকাল ৯:৫০', t: '09:50', p: '' },
            { n: 'এম.ভি স্বর্ণদ্বীপ-৮', d: 'সকাল ১০:১৫', t: '10:15', p: '' },
            { n: 'এম.ভি ইমাম হাসান-২', d: 'সকাল ১১:০০', t: '11:00', p: '' },
            { n: 'এম.ভি ইমাম হাসান-৫', d: 'সকাল ১১:৪৫', t: '11:45', p: '' },
            { n: 'এম.ভি ময়ূর-২', d: 'দুপুর ১২:৩০', t: '12:30', p: '' },
            { n: 'এম.ভি ময়ূর-৭', d: 'দুপুর ১:৩০', t: '13:30', p: '' },
            { n: 'এম.ভি ঈগল-২/৩', d: 'দুপুর ২:৩০', t: '14:30', p: '' },
            { n: 'এম.ভি রফ রফ', d: 'দুপুর ৩:৩০', t: '15:30', p: '' },
            { n: 'এম.ভি ঈগল-৭', d: 'বিকাল ৪:৩০', t: '16:30', p: '' },
            { n: 'এম.ভি সোনারতরী-১', d: 'বিকাল ৫:২০', t: '17:20', p: '' },
            { n: 'এম.ভি নিউ আল বোরাক', d: 'বিকাল ৬:৪৫', t: '18:45', p: '' },
            { n: 'এম.ভি রিপল / সোনার তরী', d: 'বিকাল ৭:৪৫', t: '19:45', p: '' },
            { n: 'এম.ভি আব এ জমজম', d: 'রাত ১১:৩০', t: '23:30', p: '' },
            { n: 'এম.ভি রফরফ', d: 'রাত ১২:০০', t: '00:00', p: '' },
            { n: 'এম.ভি শম্পা / এম.ভি প্রিন্স অব রাসেল-৩', d: 'রাত ১২:৩০', t: '00:30', p: '' }
        ]
    }
];

let launchRouteIdx = 0, launchFilter = 'all', launchQuery = '', launchShellLang = '';

function launchL(bn, en) { return currentLang === 'en' ? en : bn; }
function launchDigits(v) { return currentLang === 'en' ? String(v) : String(v).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]); }
function launchMin(t) { const p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
// রাত ১২টার পরের লঞ্চগুলোকে আগের দিনের সার্ভিসের শেষে ধরা হয়
function launchKey(m) { return m < 240 ? m + 1440 : m; }
function launchNowMin() { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); }

function launchTimeParts(item) {
    if (currentLang === 'en') {
        const m = launchMin(item.t), h = Math.floor(m / 60), mm = m % 60;
        return { time: `${h % 12 || 12}:${String(mm).padStart(2, '0')}`, period: h < 12 ? 'AM' : 'PM' };
    }
    const sp = item.d.indexOf(' ');
    return { time: item.d.slice(sp + 1), period: item.d.slice(0, sp) };
}
function launchGroup(item) {
    const m = launchMin(item.t);
    if (m >= 240 && m < 720) return 'morning';
    if (m >= 720 && m < 1080) return 'afternoon';
    return 'night';
}
function launchEta(diff) {
    const h = Math.floor(diff / 60), m = diff % 60;
    if (diff <= 0) return launchL('এখনই', 'Now');
    if (h === 0) return launchL(`${launchDigits(m)} মিনিট পরে`, `in ${m} min`);
    if (m === 0) return launchL(`${launchDigits(h)} ঘণ্টা পরে`, `in ${h} hr`);
    return launchL(`${launchDigits(h)} ঘণ্টা ${launchDigits(m)} মিনিট পরে`, `in ${h} hr ${m} min`);
}
function launchRoute() { return LAUNCH_ROUTES[launchRouteIdx] || LAUNCH_ROUTES[0]; }

function launchBuildShell() {
    const root = document.getElementById('launchRoot');
    if (!root) return;
    const r = launchRoute();
    const routeName = launchL(`${r.from} → ${r.to}`, `${r.fromEn || r.from} → ${r.toEn || r.to}`);
    const routeChips = LAUNCH_ROUTES.length > 1
        ? `<div class="flex gap-2 overflow-x-auto pb-1">${LAUNCH_ROUTES.map((x, i) => `<button type="button" onclick="launchSetRoute(${i})" class="news-cat-btn ${i === launchRouteIdx ? 'active' : ''} whitespace-nowrap">${esc(launchL(`${x.from} → ${x.to}`, `${x.fromEn || x.from} → ${x.toEn || x.to}`))}</button>`).join('')}</div>`
        : '';
    const filters = [['all', 'সব', 'All'], ['morning', 'সকাল', 'Morning'], ['afternoon', 'দুপুর-বিকাল', 'Afternoon'], ['night', 'সন্ধ্যা-রাত', 'Night']]
        .map(f => `<button type="button" data-lf="${f[0]}" onclick="launchSetFilter('${f[0]}')" class="news-cat-btn ${launchFilter === f[0] ? 'active' : ''} whitespace-nowrap">${esc(launchL(f[1], f[2]))}</button>`).join('');
    root.innerHTML = `
    <div class="space-y-4 pb-8">
        <div class="info-card p-4 space-y-3">
            <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 shrink-0"><i data-lucide="ship" class="w-5 h-5"></i></div>
                <div class="min-w-0 flex-1">
                    <h3 class="text-sm sm:text-base font-bold text-slate-100">${esc(launchL('লঞ্চের সময়সূচী', 'Launch Schedule'))}</h3>
                    <p class="text-[11px] text-slate-400">${esc(routeName)} · ${esc(launchL(`হালনাগাদ: ${LAUNCH_UPDATED}`, 'Updated: ' + LAUNCH_UPDATED))}</p>
                </div>
            </div>
            ${routeChips}
            <div class="lc-search">
                <i data-lucide="search" class="w-4 h-4"></i>
                <input id="launchSearch" type="text" value="${esc(launchQuery)}" oninput="launchSetQuery(this.value)" placeholder="${esc(launchL('লঞ্চের নাম খুঁজুন...', 'Search launch name...'))}" autocomplete="off">
            </div>
            <div id="launchFilters" class="flex gap-2 overflow-x-auto pb-1">${filters}</div>
        </div>
        <div id="launchHero"></div>
        <div id="launchList" class="space-y-2.5"></div>
        <div class="lc-note">
            <i data-lucide="info" class="w-4 h-4 shrink-0"></i>
            <p>${esc(launchL('আবহাওয়া ও অন্যান্য কারণে লঞ্চের সময়সূচি পরিবর্তিত হতে পারে। যাত্রার আগে লঞ্চের কাউন্টার বা কাস্টমার কেয়ারে ফোন করে সময় নিশ্চিত করুন।', 'Schedules may change due to weather or other reasons. Please confirm the departure time with the launch counter or customer care before travelling.'))}</p>
        </div>
    </div>`;
    launchShellLang = currentLang;
    try { lucide.createIcons(); } catch (e) {}
}

function launchRenderDynamic() {
    const listEl = document.getElementById('launchList'), heroEl = document.getElementById('launchHero');
    if (!listEl || !heroEl) return;
    const r = launchRoute();
    const now = launchNowMin(), nowKey = launchKey(now);

    // পরবর্তী লঞ্চ (সবচেয়ে কাছের ছাড়ার সময়, রাত পেরিয়ে পরদিনও ধরে)
    let next = null, nextDiff = 1e9;
    r.list.forEach(it => {
        const diff = (launchMin(it.t) - now + 1440) % 1440;
        if (diff < nextDiff) { nextDiff = diff; next = it; }
    });
    if (next) {
        const p = launchTimeParts(next);
        const soon = nextDiff <= 30;
        heroEl.innerHTML = `<div class="lc-hero ${soon ? 'soon' : ''}">
            <div class="flex items-center justify-between gap-2">
                <span class="lc-pill">${esc(launchL('পরবর্তী লঞ্চ', 'Next launch'))}</span>
                <span class="lc-eta">${esc(launchEta(nextDiff))}</span>
            </div>
            <div class="lc-hero-time">${esc(p.period)} ${esc(p.time)}</div>
            <div class="lc-hero-name">${esc(next.n)}</div>
            ${next.p ? `<a href="tel:${esc(next.p)}" class="lc-hero-call"><i data-lucide="phone" class="w-4 h-4"></i> ${esc(launchL('কল করুন', 'Call'))}</a>` : ''}
        </div>`;
    }

    const q = launchQuery.trim().toLowerCase();
    const rows = r.list.filter(it => (launchFilter === 'all' || launchGroup(it) === launchFilter) && (!q || it.n.toLowerCase().includes(q)));
    if (!rows.length) {
        listEl.innerHTML = `<div class="info-card p-6 text-center text-xs text-slate-400">${esc(launchL('কোনো লঞ্চ পাওয়া যায়নি', 'No launches found'))}</div>`;
    } else {
        listEl.innerHTML = rows.map(it => {
            const p = launchTimeParts(it);
            const passed = launchKey(launchMin(it.t)) < nowKey;
            const isNext = it === next;
            return `<div class="lc-row ${passed ? 'passed' : ''} ${isNext ? 'is-next' : ''}">
                <div class="lc-time"><b>${esc(p.time)}</b><small>${esc(p.period)}</small></div>
                <div class="lc-info">
                    <h4>${esc(it.n)}</h4>
                    <p>${esc(launchL(`${r.from} থেকে ${r.to}`, `${r.fromEn || r.from} to ${r.toEn || r.to}`))}${isNext ? ' · <span class="lc-tag">' + esc(launchL('পরবর্তী', 'Next')) + '</span>' : (passed ? ' · ' + esc(launchL('ছেড়ে গেছে', 'Departed')) : '')}</p>
                </div>
                ${it.p ? `<a href="tel:${esc(it.p)}" class="lc-call" aria-label="Call"><i data-lucide="phone" class="w-4 h-4"></i></a>` : ''}
            </div>`;
        }).join('');
    }
    try { lucide.createIcons(); } catch (e) {}
}

window.launchSetQuery = (v) => { launchQuery = v || ''; launchRenderDynamic(); };
window.launchSetFilter = (f) => {
    launchFilter = f;
    document.querySelectorAll('#launchFilters [data-lf]').forEach(b => b.classList.toggle('active', b.getAttribute('data-lf') === f));
    launchRenderDynamic();
};
window.launchSetRoute = (i) => { launchRouteIdx = i; launchBuildShell(); launchRenderDynamic(); };
function launchOnOpen() {
    if (!document.getElementById('launchSearch') || launchShellLang !== currentLang) launchBuildShell();
    launchRenderDynamic();
}
// খোলা থাকলে প্রতি ৩০ সেকেন্ডে "পরবর্তী লঞ্চ" আপডেট
setInterval(() => {
    const v = document.getElementById('view-launch');
    if (v && !v.classList.contains('hidden')) launchRenderDynamic();
}, 30000);

/* ============================================================
   লাইভ ম্যাপ (Live Map) — সেবাসমূহ > লাইভ ম্যাপ
   OpenStreetMap + Leaflet.js — সম্পূর্ণ ফ্রি, কোনো পেইড API বা key লাগে না।
   খোঁজা: Nominatim · কাছের জায়গা: Overpass · দিকনির্দেশ: openstreetmap.org
   Leaflet শুধু প্রথমবার ম্যাপ খুললে লোড হয়, তাই বাকি ওয়েবসাইট ধীর হয় না।
   ============================================================ */
const LM_JS_SRC = ['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js', 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js'];
const LM_CSS_SRC = ['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css', 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css'];
const LM_OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
const LM_BD_CENTER = [23.685, 90.356];
const LM_CATS = [
    { id: 'hospital', icon: 'hospital', bn: 'হাসপাতাল', en: 'Hospitals', color: '#e11d48', f: [[['amenity', 'hospital']], [['amenity', 'clinic']]] },
    { id: 'pharmacy', icon: 'pill', bn: 'ফার্মেসি', en: 'Pharmacies', color: '#059669', f: [[['amenity', 'pharmacy']]] },
    { id: 'restaurant', icon: 'utensils', bn: 'রেস্টুরেন্ট', en: 'Restaurants', color: '#ea580c', f: [[['amenity', 'restaurant']], [['amenity', 'fast_food']], [['amenity', 'cafe']]] },
    { id: 'bank', icon: 'landmark', bn: 'ব্যাংক / ATM', en: 'Banks & ATMs', color: '#2563eb', f: [[['amenity', 'bank']], [['amenity', 'atm']]] },
    { id: 'mosque', icon: 'moon-star', bn: 'মসজিদ', en: 'Mosques', color: '#0d9488', f: [[['amenity', 'place_of_worship'], ['religion', 'muslim']]] },
    { id: 'school', icon: 'graduation-cap', bn: 'স্কুল-কলেজ', en: 'Schools', color: '#7c3aed', f: [[['amenity', 'school']], [['amenity', 'college']], [['amenity', 'university']]] },
    { id: 'fuel', icon: 'fuel', bn: 'ফিলিং স্টেশন', en: 'Fuel', color: '#ca8a04', f: [[['amenity', 'fuel']]] }
];
const LM_TX = {
    loading: ['ম্যাপ লোড হচ্ছে…', 'Loading map…'],
    search: ['এখানে খুঁজুন', 'Search here'],
    back: ['ফিরে যান', 'Back'],
    clear: ['মুছুন', 'Clear'],
    searchBtn: ['খুঁজুন', 'Search'],
    layer: ['ম্যাপের ধরন বদলান', 'Change map type'],
    zin: ['জুম ইন', 'Zoom in'],
    zout: ['জুম আউট', 'Zoom out'],
    locate: ['আমার অবস্থান', 'My location'],
    dir: ['দিকনির্দেশ', 'Directions'],
    st_search: ['আপনার অবস্থান খোঁজা হচ্ছে… অনুমতি চাইলে “Allow” দিন', 'Finding your location… tap “Allow” if asked'],
    st_live: ['লাইভ লোকেশন চালু', 'Live location is on'],
    st_weak: ['জিপিএস সিগন্যাল দুর্বল — খোলা জায়গায় যান', 'Weak GPS signal — move to an open area'],
    st_off: ['লোকেশন বন্ধ আছে', 'Location is off'],
    acc: ['নির্ভুলতা', 'Accuracy'],
    spd: ['গতি', 'Speed'],
    pos: ['স্থানাঙ্ক (কপি)', 'Coordinates (copy)'],
    unitM: ['মি', 'm'],
    unitKm: ['কিমি', 'km'],
    unitKmh: ['কিমি/ঘ', 'km/h'],
    copied: ['স্থানাঙ্ক কপি হয়েছে', 'Coordinates copied'],
    searching: ['খোঁজা হচ্ছে…', 'Searching…'],
    res_none: ['কিছু পাওয়া যায়নি। অন্য নামে খুঁজুন।', 'Nothing found. Try another name.'],
    res_err: ['খোঁজা যায়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন।', 'Search failed. Check your connection and try again.'],
    poi_none: ['এই এলাকায় কিছু পাওয়া যায়নি। ম্যাপ সরিয়ে বা জুম করে আবার দেখুন।', 'Nothing found here. Move or zoom the map and try again.'],
    poi_err: ['তথ্য আনা যায়নি। একটু পরে আবার চেষ্টা করুন।', 'Could not load places. Try again shortly.'],
    pick_first: ['আগে ম্যাপে একটি জায়গা বেছে নিন', 'Pick a place on the map first'],
    layer_osm: ['সাধারণ ম্যাপ', 'Standard map'],
    layer_topo: ['ভূসংস্থান ম্যাপ', 'Terrain map'],
    unnamed: ['নামহীন জায়গা', 'Unnamed place'],
    found: ['টি পাওয়া গেছে', 'found'],
    retry: ['আবার চেষ্টা করুন', 'Try again'],
    mapOnly: ['শুধু ম্যাপ দেখুন', 'Just view the map']
};
const LM_GUIDE = {
    denied: {
        t: ['লোকেশনের অনুমতি দেওয়া নেই', 'Location permission is blocked'],
        p: ['লাইভ ম্যাপে আপনার অবস্থান দেখাতে ব্রাউজারে লোকেশনের অনুমতি দিতে হবে।', 'To show your position on the live map, allow location access in your browser.'],
        steps: [
            ['Android (Chrome): ঠিকানা বারের বামের আইকনে চাপুন → অনুমতি → লোকেশন → “অনুমতি দিন”।', 'Android (Chrome): tap the icon left of the address bar → Permissions → Location → Allow.'],
            ['iPhone (Safari): সেটিংস → প্রাইভেসি ও সিকিউরিটি → লোকেশন সার্ভিস → Safari Websites → “অ্যাপ ব্যবহারের সময়”।', 'iPhone (Safari): Settings → Privacy & Security → Location Services → Safari Websites → While Using.'],
            ['অ্যাপ (APK) ব্যবহার করলে: ফোনের সেটিংস → অ্যাপ → আমার এলাকা → অনুমতি → লোকেশন।', 'In the app (APK): phone Settings → Apps → Amar Elaka → Permissions → Location.'],
            ['ফোনের লোকেশন (GPS) চালু আছে কিনা দেখে নিন, তারপর নিচের বোতামে চাপুন।', 'Make sure phone Location (GPS) is on, then tap the button below.']
        ]
    },
    unavailable: {
        t: ['জিপিএস সিগন্যাল পাওয়া যাচ্ছে না', 'No GPS signal'],
        p: ['আপনার অবস্থান নির্ধারণ করা যায়নি।', 'Your position could not be determined.'],
        steps: [
            ['ফোনের লোকেশন (GPS) চালু করুন এবং “উচ্চ নির্ভুলতা” মোড বেছে নিন।', 'Turn on phone Location (GPS) and choose the high-accuracy mode.'],
            ['খোলা আকাশের নিচে বা জানালার কাছে যান।', 'Go outdoors or near a window.'],
            ['ফ্লাইট মোড বন্ধ আছে কিনা দেখুন।', 'Check that airplane mode is off.']
        ]
    },
    insecure: {
        t: ['নিরাপদ সংযোগ (HTTPS) দরকার', 'Secure connection (HTTPS) required'],
        p: ['ব্রাউজার শুধু https:// লিংকে লোকেশন দেয়। ওয়েবসাইটটি https://www.amarelaka.shop ঠিকানায় খুলুন।', 'Browsers share location only on https:// pages. Open the site at https://www.amarelaka.shop.'],
        steps: []
    },
    unsupported: {
        t: ['এই ব্রাউজারে লোকেশন সাপোর্ট নেই', 'Location is not supported in this browser'],
        p: ['Chrome বা Safari-র নতুন সংস্করণে ওয়েবসাইটটি খুলুন।', 'Open the website in a recent version of Chrome or Safari.'],
        steps: []
    },
    loadfail: {
        t: ['ম্যাপ লোড হয়নি', 'Map failed to load'],
        p: ['ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।', 'Check your internet connection and try again.'],
        steps: []
    }
};

let lmMap = null, lmLayers = {}, lmLayerKey = 'osm';
let lmMeMarker = null, lmAccCircle = null, lmWatchId = null;
let lmFollow = true, lmHasFix = false, lmLast = null, lmPrev = null, lmStatus = 'searching';
let lmPoiLayer = null, lmPinMarker = null, lmSelected = null, lmCat = null;
let lmResultItems = [], lmSearchCtl = null, lmPoiCtl = null, lmSearching = false;
let lmLibPromise = null, lmPermBound = false, lmGuideKind = null, lmGlobalBound = false, lmResizeTimer = null;

const lmL = (bnText, enText) => (currentLang === 'en' ? enText : bnText);
const lmNum = (n) => { const s = String(n); return currentLang === 'en' ? s : s.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]); };
const lmTx = (k) => { const v = LM_TX[k]; return v ? lmL(v[0], v[1]) : k; };
function lmDist(a, b) {
    const R = 6371000, rad = Math.PI / 180;
    const dLat = (b[0] - a[0]) * rad, dLng = (b[1] - a[1]) * rad;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(x)));
}
function lmFmtDist(m) {
    return m < 1000 ? `${lmNum(Math.round(m))} ${lmTx('unitM')}` : `${lmNum((m / 1000).toFixed(1))} ${lmTx('unitKm')}`;
}

// ---------- Leaflet লাইব্রেরি (প্রথমবার খুললে লোড) ----------
function lmLoadCss(i = 0) {
    return new Promise(resolve => {
        if (document.querySelector('link[data-lm-css]')) return resolve();
        const l = document.createElement('link');
        l.rel = 'stylesheet'; l.href = LM_CSS_SRC[i]; l.setAttribute('data-lm-css', '1');
        l.onload = () => resolve();
        l.onerror = () => { l.remove(); if (i + 1 < LM_CSS_SRC.length) lmLoadCss(i + 1).then(resolve); else resolve(); };
        document.head.appendChild(l);
    });
}
function lmLoadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src; s.async = true;
        s.onload = () => resolve();
        s.onerror = () => { s.remove(); reject(new Error('leaflet load failed')); };
        document.head.appendChild(s);
    });
}
function lmEnsureLeaflet() {
    if (window.L && window.L.map) return Promise.resolve();
    if (lmLibPromise) return lmLibPromise;
    const js = (async () => {
        for (const src of LM_JS_SRC) {
            try { await lmLoadScript(src); if (window.L && window.L.map) return; } catch (e) {}
        }
        throw new Error('leaflet unavailable');
    })();
    lmLibPromise = Promise.all([lmLoadCss(), js]).then(() => {}).catch(err => { lmLibPromise = null; throw err; });
    return lmLibPromise;
}

// ---------- ইন্টারফেস ----------
function lmBuildShell() {
    const root = document.getElementById('lmRoot');
    if (!root || root.getAttribute('data-built')) return;
    root.setAttribute('data-built', '1');
    root.innerHTML = `
    <div class="lm-stage" id="lmStage">
        <div class="lm-mapwrap">
            <div id="lmMap" class="lm-map"></div>
            <div id="lmLoading" class="lm-loading"><div class="lm-spinner"></div><p data-lm="loading"></p></div>

            <div class="lm-top">
                <form class="lm-search" id="lmSearchForm" autocomplete="off">
                    <button type="button" class="lm-ib" onclick="switchTab('services')" data-lm-aria="back"><i data-lucide="arrow-left"></i></button>
                    <input id="lmSearchInput" type="search" enterkeyhint="search" autocomplete="off" autocapitalize="off" spellcheck="false" data-lm-ph="search">
                    <button type="button" id="lmSearchClear" class="lm-ib hidden" onclick="lmClearSearch()" data-lm-aria="clear"><i data-lucide="x"></i></button>
                    <button type="submit" class="lm-ib lm-ib-go" data-lm-aria="searchBtn"><i data-lucide="search"></i></button>
                </form>
                <div id="lmResults" class="lm-results hidden"></div>
                <div id="lmChips" class="lm-chips hide-scrollbar"></div>
            </div>

            <div class="lm-side">
                <button type="button" class="lm-round" onclick="lmToggleLayer()" data-lm-aria="layer"><i data-lucide="layers"></i></button>
                <div class="lm-zoom">
                    <button type="button" onclick="lmZoom(1)" data-lm-aria="zin"><i data-lucide="plus"></i></button>
                    <button type="button" onclick="lmZoom(-1)" data-lm-aria="zout"><i data-lucide="minus"></i></button>
                </div>
            </div>

            <div class="lm-fabs">
                <button type="button" id="lmLocateBtn" class="lm-fab" onclick="lmLocate()" data-lm-aria="locate"><i data-lucide="locate-fixed"></i></button>
                <button type="button" class="lm-fab lm-fab-primary" onclick="lmDirections()" data-lm-aria="dir"><i data-lucide="corner-up-right"></i></button>
            </div>

            <div id="lmGuide" class="lm-guide hidden"></div>
        </div>
        <div class="lm-sheet" id="lmSheet">
            <div class="lm-grab"></div>
            <div id="lmSheetBody"></div>
        </div>
    </div>`;
    const form = document.getElementById('lmSearchForm');
    form.addEventListener('submit', (e) => { e.preventDefault(); lmSearchSubmit(); });
    const input = document.getElementById('lmSearchInput');
    input.addEventListener('input', () => document.getElementById('lmSearchClear').classList.toggle('hidden', !input.value));
    refreshIcons();
}
function lmApplyTexts() {
    document.querySelectorAll('#lmRoot [data-lm]').forEach(el => { el.textContent = lmTx(el.getAttribute('data-lm')); });
    document.querySelectorAll('#lmRoot [data-lm-ph]').forEach(el => { el.setAttribute('placeholder', lmTx(el.getAttribute('data-lm-ph'))); });
    document.querySelectorAll('#lmRoot [data-lm-aria]').forEach(el => {
        const v = lmTx(el.getAttribute('data-lm-aria'));
        el.setAttribute('aria-label', v); el.setAttribute('title', v);
    });
}
function lmRenderChips() {
    const box = document.getElementById('lmChips');
    if (!box) return;
    box.innerHTML = LM_CATS.map(c =>
        `<button type="button" class="lm-chip ${lmCat === c.id ? 'active' : ''}" onclick="lmPickCat('${c.id}')"><i data-lucide="${c.icon}"></i><span>${esc(lmL(c.bn, c.en))}</span></button>`
    ).join('');
    refreshIcons();
}
function lmRenderSheet() {
    const box = document.getElementById('lmSheetBody');
    if (!box) return;
    let html = '';
    if (lmSelected) {
        const s = lmSelected;
        html += `<div class="lm-place">
            <div class="lm-place-ic" style="--c:${esc(s.color || '#ea4335')}"><i data-lucide="map-pin"></i></div>
            <div class="lm-place-tx"><b>${esc(s.name)}</b><small>${esc(s.sub || '')}</small></div>
            <button type="button" class="lm-ib" onclick="lmClearSelected()" aria-label="${esc(lmTx('clear'))}"><i data-lucide="x"></i></button>
        </div>
        <div class="lm-actions"><button type="button" class="lm-btn lm-btn-primary" onclick="lmDirections()"><i data-lucide="corner-up-right"></i><span>${esc(lmTx('dir'))}</span></button></div>`;
    }
    const cls = lmStatus === 'live' ? 'live' : (lmStatus === 'off' ? 'off' : 'wait');
    const label = lmTx('st_' + (lmStatus === 'live' ? 'live' : lmStatus === 'weak' ? 'weak' : lmStatus === 'off' ? 'off' : 'search'));
    html += `<div class="lm-status"><span class="lm-dot ${cls}"></span><b>${esc(label)}</b></div>`;
    if (lmLast) {
        html += `<div class="lm-stats">
            <div><small>${esc(lmTx('acc'))}</small><b id="lmStatAcc">—</b></div>
            <div><small>${esc(lmTx('spd'))}</small><b id="lmStatSpd">—</b></div>
            <button type="button" onclick="lmCopyCoords()"><small>${esc(lmTx('pos'))}</small><b id="lmStatPos">—</b></button>
        </div>`;
    }
    box.innerHTML = html;
    refreshIcons();
    lmUpdateStats();
}
function lmUpdateStats() {
    if (!lmLast) return;
    const acc = document.getElementById('lmStatAcc'), spd = document.getElementById('lmStatSpd'), pos = document.getElementById('lmStatPos');
    if (acc) acc.textContent = `±${lmNum(Math.round(lmLast.acc || 0))} ${lmTx('unitM')}`;
    if (spd) spd.textContent = `${lmNum(Math.round((lmLast.speed || 0) * 3.6))} ${lmTx('unitKmh')}`;
    if (pos) pos.textContent = `${lmLast.lat.toFixed(5)}, ${lmLast.lng.toFixed(5)}`;
}
function lmSetStatus(s) {
    if (lmStatus === s) return;
    lmStatus = s;
    lmRenderSheet();
}
function lmUpdateLocateBtn() {
    const b = document.getElementById('lmLocateBtn');
    if (b) b.classList.toggle('is-follow', !!(lmFollow && lmHasFix));
}

// ---------- ম্যাপ ----------
async function lmInitMap() {
    if (lmMap) return true;
    const load = document.getElementById('lmLoading');
    if (load) load.classList.remove('hidden');
    try { await lmEnsureLeaflet(); }
    catch (e) { if (load) load.classList.add('hidden'); lmShowGuide('loadfail'); return false; }
    if (lmMap) return true;
    const el = document.getElementById('lmMap');
    if (!el) return false;
    lmMap = L.map(el, { zoomControl: false, attributionControl: false, minZoom: 3, maxZoom: 19, wheelPxPerZoomLevel: 80 });
    lmLayers.osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, keepBuffer: 4,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'
    });
    lmLayers.topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17, subdomains: 'abc', keepBuffer: 4,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>, <a href="https://opentopomap.org" target="_blank" rel="noopener noreferrer">OpenTopoMap</a>'
    });
    lmLayers[lmLayerKey].addTo(lmMap);
    L.control.attribution({ position: 'bottomright', prefix: false }).addTo(lmMap);
    L.control.scale({ position: 'bottomleft', imperial: false, maxWidth: 110 }).addTo(lmMap);
    lmPoiLayer = L.layerGroup().addTo(lmMap);
    lmMap.setView(LM_BD_CENTER, 7);
    lmMap.on('dragstart', () => { if (lmFollow) { lmFollow = false; lmUpdateLocateBtn(); } });
    lmMap.on('click', () => { lmHideResults(); const i = document.getElementById('lmSearchInput'); if (i) i.blur(); });
    const hide = () => { const l = document.getElementById('lmLoading'); if (l) l.classList.add('hidden'); };
    lmLayers[lmLayerKey].once('load', hide);
    setTimeout(hide, 3500);
    if (lmLast) { lmUpdateMarker({ latitude: lmLast.lat, longitude: lmLast.lng, accuracy: lmLast.acc }); }
    return true;
}
function lmUpdateMarker(c) {
    if (!lmMap) return;
    const ll = [c.latitude, c.longitude];
    if (!lmMeMarker) {
        lmMeMarker = L.marker(ll, {
            icon: L.divIcon({ className: 'lm-me-wrap', html: '<div class="lm-me"><span class="lm-me-pulse"></span><span class="lm-me-arrow"></span><span class="lm-me-dot"></span></div>', iconSize: [22, 22], iconAnchor: [11, 11] }),
            interactive: false, keyboard: false, zIndexOffset: 1000
        }).addTo(lmMap);
        lmAccCircle = L.circle(ll, { radius: c.accuracy || 30, weight: 1, color: '#1a73e8', fillColor: '#1a73e8', fillOpacity: 0.12, interactive: false }).addTo(lmMap);
    } else {
        lmMeMarker.setLatLng(ll);
        lmAccCircle.setLatLng(ll);
        lmAccCircle.setRadius(c.accuracy || 30);
    }
    const root = lmMeMarker.getElement && lmMeMarker.getElement();
    const me = root && root.querySelector('.lm-me');
    if (me) {
        const moving = Number.isFinite(c.heading) && (c.speed || 0) > 0.8;
        me.classList.toggle('has-heading', moving);
        const arrow = me.querySelector('.lm-me-arrow');
        if (arrow && moving) arrow.style.transform = `rotate(${c.heading}deg)`;
    }
}

// ---------- লাইভ GPS ----------
function lmOnPos(pos) {
    if (currentTab !== 'map') { lmStopWatch(); return; }
    const c = pos.coords;
    let speed = Number.isFinite(c.speed) && c.speed >= 0 ? c.speed : null;
    if (speed === null && lmPrev) {
        const dt = (pos.timestamp - lmPrev.ts) / 1000;
        if (dt >= 0.5 && dt <= 30 && (c.accuracy || 0) < 60) speed = lmDist([lmPrev.lat, lmPrev.lng], [c.latitude, c.longitude]) / dt;
    }
    if (speed !== null && speed < 0.5) speed = 0;
    lmPrev = lmLast;
    lmLast = { lat: c.latitude, lng: c.longitude, acc: c.accuracy, speed: speed || 0, heading: c.heading, ts: pos.timestamp };
    lmHideGuide();
    const weak = (c.accuracy || 0) > 150;
    const wasStatus = lmStatus;
    lmStatus = weak ? 'weak' : 'live';
    if (wasStatus !== lmStatus || !document.getElementById('lmStatAcc')) lmRenderSheet(); else lmUpdateStats();
    if (!lmMap) return;
    lmUpdateMarker({ latitude: c.latitude, longitude: c.longitude, accuracy: c.accuracy, heading: c.heading, speed: speed || 0 });
    const ll = [c.latitude, c.longitude];
    if (!lmHasFix) {
        lmHasFix = true; lmFollow = true;
        lmMap.setView(ll, Math.max(lmMap.getZoom(), 16), { animate: true });
        lmUpdateLocateBtn();
    } else if (lmFollow) {
        lmMap.panTo(ll, { animate: true, duration: 0.8, easeLinearity: 0.5 });
    }
}
function lmOnPosErr(err) {
    if (currentTab !== 'map') return;
    if (err && err.code === 1) { lmStopWatch(); lmStatus = 'off'; lmRenderSheet(); lmShowGuide('denied'); return; }
    if (err && err.code === 2 && !lmHasFix) { lmStatus = 'weak'; lmRenderSheet(); lmShowGuide('unavailable'); return; }
    lmSetStatus(lmHasFix ? 'weak' : 'searching');
}
function lmStartWatch() {
    if (lmWatchId !== null) return;
    if (!lmLast) lmSetStatus('searching');
    try {
        lmWatchId = navigator.geolocation.watchPosition(lmOnPos, lmOnPosErr, { enableHighAccuracy: true, maximumAge: 1000, timeout: 20000 });
    } catch (e) { lmShowGuide('unsupported'); }
}
function lmStopWatch() {
    if (lmWatchId !== null) { try { navigator.geolocation.clearWatch(lmWatchId); } catch (e) {} lmWatchId = null; }
}
async function lmWatchPermission() {
    try {
        if (!navigator.permissions || !navigator.permissions.query) return null;
        const st = await navigator.permissions.query({ name: 'geolocation' });
        if (!lmPermBound) {
            lmPermBound = true;
            st.addEventListener('change', () => {
                if (currentTab !== 'map') return;
                if (st.state === 'granted') { lmHideGuide(); lmStopWatch(); lmStartWatch(); }
                else if (st.state === 'denied') { lmStopWatch(); lmStatus = 'off'; lmRenderSheet(); lmShowGuide('denied'); }
            });
        }
        return st.state;
    } catch (e) { return null; }
}
async function lmStartTracking() {
    if (!window.isSecureContext) { lmStatus = 'off'; lmRenderSheet(); lmShowGuide('insecure'); return; }
    if (!('geolocation' in navigator)) { lmStatus = 'off'; lmRenderSheet(); lmShowGuide('unsupported'); return; }
    const perm = await lmWatchPermission();
    if (currentTab !== 'map') return;
    if (perm === 'denied') { lmStatus = 'off'; lmRenderSheet(); lmShowGuide('denied'); return; }
    lmHideGuide();
    lmStartWatch();
}

// ---------- নির্দেশনা (পারমিশন না দিলে) ----------
function lmShowGuide(kind) {
    const g = document.getElementById('lmGuide');
    const d = LM_GUIDE[kind];
    if (!g || !d) return;
    lmGuideKind = kind;
    const icon = kind === 'loadfail' ? 'wifi-off' : (kind === 'unavailable' ? 'satellite' : 'map-pin-off');
    const steps = d.steps.length ? `<ol>${d.steps.map(s => `<li>${esc(lmL(s[0], s[1]))}</li>`).join('')}</ol>` : '';
    g.innerHTML = `<div class="lm-guide-card" role="alertdialog" aria-live="polite">
        <div class="lm-guide-ic"><i data-lucide="${icon}"></i></div>
        <h3>${esc(lmL(d.t[0], d.t[1]))}</h3>
        <p>${esc(lmL(d.p[0], d.p[1]))}</p>
        ${steps}
        <div class="lm-guide-actions">
            <button type="button" class="lm-btn lm-btn-primary" onclick="lmRetry()"><i data-lucide="refresh-cw"></i><span>${esc(lmTx('retry'))}</span></button>
            ${kind === 'loadfail' ? '' : `<button type="button" class="lm-btn" onclick="lmHideGuide()"><span>${esc(lmTx('mapOnly'))}</span></button>`}
        </div>
    </div>`;
    g.classList.remove('hidden');
    const load = document.getElementById('lmLoading'); if (load) load.classList.add('hidden');
    refreshIcons();
}
function lmHideGuide() {
    const g = document.getElementById('lmGuide');
    if (g) g.classList.add('hidden');
    lmGuideKind = null;
}

// ---------- খোঁজা (Nominatim) ----------
function lmHideResults() { const r = document.getElementById('lmResults'); if (r) r.classList.add('hidden'); }
function lmShowResults(items, heading) {
    const r = document.getElementById('lmResults');
    if (!r) return;
    lmResultItems = items;
    r.innerHTML = (heading ? `<div class="lm-res-head"><span>${esc(heading)}</span><button type="button" class="lm-ib" onclick="lmHideResults()" aria-label="${esc(lmTx('clear'))}"><i data-lucide="x"></i></button></div>` : '') +
        items.map((it, i) => `<button type="button" class="lm-res" onclick="lmPickResult(${i})">
            <span class="lm-res-ic" style="--c:${esc(it.color || '#64748b')}"><i data-lucide="${esc(it.icon || 'map-pin')}"></i></span>
            <span class="lm-res-tx"><b>${esc(it.name)}</b><small>${esc(it.sub || '')}</small></span>
            ${it.dist != null ? `<span class="lm-res-d">${esc(lmFmtDist(it.dist))}</span>` : ''}
        </button>`).join('');
    r.classList.remove('hidden');
    refreshIcons();
}
function lmShowMessage(text) {
    const r = document.getElementById('lmResults');
    if (!r) return;
    lmResultItems = [];
    r.innerHTML = `<div class="lm-res-msg">${esc(text)}</div>`;
    r.classList.remove('hidden');
}
async function lmSearchSubmit() {
    const input = document.getElementById('lmSearchInput');
    const q = (input && input.value || '').trim();
    if (!q || lmSearching || !lmMap) return;
    input.blur();
    lmSearching = true;
    lmShowMessage(lmTx('searching'));
    if (lmSearchCtl) lmSearchCtl.abort();
    lmSearchCtl = new AbortController();
    const signal = lmSearchCtl.signal;
    try {
        const base = 'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=7&accept-language=' + encodeURIComponent(currentLang === 'en' ? 'en' : 'bn,en') + '&q=' + encodeURIComponent(q);
        const get = async (url) => { const r = await fetch(url, { signal }); if (!r.ok) throw new Error('http ' + r.status); return r.json(); };
        let data = await get(base + '&countrycodes=bd');
        if (!data.length) data = await get(base);
        if (!data.length) { lmShowMessage(lmTx('res_none')); return; }
        lmShowResults(data.map(r => ({
            kind: 'place', lat: +r.lat, lng: +r.lon,
            name: (r.name || String(r.display_name || '').split(',')[0] || lmTx('unnamed')).trim(),
            sub: r.display_name || '',
            bbox: Array.isArray(r.boundingbox) ? r.boundingbox.map(Number) : null,
            icon: 'map-pin', color: '#ea4335'
        })));
    } catch (e) {
        if (e && e.name === 'AbortError') return;
        lmShowMessage(lmTx('res_err'));
    } finally { lmSearching = false; }
}
function lmSelectPlace(p, opts = {}) {
    if (!lmMap) return;
    lmSelected = p;
    if (lmPinMarker) { lmMap.removeLayer(lmPinMarker); lmPinMarker = null; }
    lmPinMarker = L.marker([p.lat, p.lng], {
        icon: L.divIcon({ className: 'lm-pin-wrap', html: `<div class="lm-pin" style="--c:${esc(p.color || '#ea4335')}"></div>`, iconSize: [26, 26], iconAnchor: [13, 28] }),
        keyboard: false, zIndexOffset: 800
    }).addTo(lmMap);
    lmFollow = false; lmUpdateLocateBtn();
    const b = p.bbox;
    if (!opts.noFit && b && b.length === 4 && b.every(Number.isFinite) && (b[1] - b[0]) > 0.002) {
        lmMap.fitBounds([[b[0], b[2]], [b[1], b[3]]], { maxZoom: 17, padding: [40, 40] });
    } else if (opts.noFit) {
        lmMap.panTo([p.lat, p.lng], { animate: true });
    } else {
        lmMap.flyTo([p.lat, p.lng], Math.max(lmMap.getZoom(), 17), { duration: 0.8 });
    }
    lmHideResults();
    lmRenderSheet();
}
window.lmPickResult = (i) => { const it = lmResultItems[i]; if (it) lmSelectPlace(it, { noFit: it.kind === 'poi' }); };
window.lmHideResults = lmHideResults;
window.lmClearSearch = () => {
    const i = document.getElementById('lmSearchInput');
    if (i) { i.value = ''; i.focus(); }
    const c = document.getElementById('lmSearchClear'); if (c) c.classList.add('hidden');
    lmHideResults();
};
window.lmClearSelected = () => {
    lmSelected = null;
    if (lmPinMarker && lmMap) { lmMap.removeLayer(lmPinMarker); lmPinMarker = null; }
    lmRenderSheet();
};

// ---------- কাছের জায়গা (Overpass) ----------
window.lmPickCat = async (id) => {
    const cat = LM_CATS.find(c => c.id === id);
    if (!cat || !lmMap) return;
    if (lmCat === id) { lmCat = null; lmPoiLayer.clearLayers(); lmHideResults(); lmRenderChips(); return; }
    lmCat = id; lmRenderChips();
    lmPoiLayer.clearLayers();
    lmShowMessage(lmTx('searching'));
    if (lmPoiCtl) lmPoiCtl.abort();
    lmPoiCtl = new AbortController();
    const signal = lmPoiCtl.signal;
    const center = lmMap.getCenter(), z = lmMap.getZoom();
    const r = z >= 16 ? 1200 : z >= 15 ? 2200 : z >= 14 ? 3500 : 5000;
    const parts = cat.f.map(pairs => `nwr${pairs.map(([k, v]) => `["${k}"="${v}"]`).join('')}(around:${r},${center.lat.toFixed(5)},${center.lng.toFixed(5)});`).join('');
    const body = 'data=' + encodeURIComponent(`[out:json][timeout:20];(${parts});out center 80;`);
    let data = null;
    for (const ep of LM_OVERPASS) {
        try {
            const res = await fetch(ep, { method: 'POST', body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, signal });
            if (!res.ok) continue;
            data = await res.json();
            break;
        } catch (e) { if (e && e.name === 'AbortError') return; }
    }
    if (lmCat !== id) return;
    if (!data) { lmShowMessage(lmTx('poi_err')); return; }
    const ref = lmLast ? [lmLast.lat, lmLast.lng] : [center.lat, center.lng];
    const seen = new Set();
    const items = [];
    (data.elements || []).forEach(el => {
        const lat = el.lat != null ? el.lat : (el.center && el.center.lat), lng = el.lon != null ? el.lon : (el.center && el.center.lon);
        if (lat == null || lng == null) return;
        const key = el.type + el.id;
        if (seen.has(key)) return; seen.add(key);
        const tg = el.tags || {};
        const name = (currentLang === 'en' ? (tg['name:en'] || tg.name || tg['name:bn']) : (tg['name:bn'] || tg.name || tg['name:en'])) || lmL(cat.bn, cat.en);
        const sub = [tg['addr:street'], tg['addr:city'] || tg['addr:suburb']].filter(Boolean).join(', ') || tg.operator || '';
        items.push({ kind: 'poi', lat, lng, name, sub, color: cat.color, icon: cat.icon, dist: lmDist(ref, [lat, lng]) });
    });
    if (!items.length) { lmShowMessage(lmTx('poi_none')); return; }
    items.sort((a, b) => a.dist - b.dist);
    const top = items.slice(0, 60);
    top.forEach((it, i) => {
        const m = L.marker([it.lat, it.lng], {
            icon: L.divIcon({ className: 'lm-pin-wrap', html: `<div class="lm-pin" style="--c:${cat.color}"></div>`, iconSize: [26, 26], iconAnchor: [13, 28] }),
            title: it.name, keyboard: false
        });
        m.on('click', () => lmSelectPlace(it, { noFit: true }));
        lmPoiLayer.addLayer(m);
    });
    lmShowResults(top.slice(0, 10), `${lmL(cat.bn, cat.en)} · ${lmNum(top.length)} ${lmTx('found')}`);
};

// ---------- বাটন ----------
window.lmZoom = (d) => { if (lmMap) { d > 0 ? lmMap.zoomIn() : lmMap.zoomOut(); } };
window.lmToggleLayer = () => {
    if (!lmMap) return;
    lmMap.removeLayer(lmLayers[lmLayerKey]);
    lmLayerKey = lmLayerKey === 'osm' ? 'topo' : 'osm';
    lmLayers[lmLayerKey].addTo(lmMap);
    showToast(lmTx(lmLayerKey === 'osm' ? 'layer_osm' : 'layer_topo'), 'layers', 'text-emerald-400');
};
window.lmLocate = () => {
    if (!lmMap) return;
    if (lmLast) {
        lmFollow = true;
        lmMap.flyTo([lmLast.lat, lmLast.lng], Math.max(lmMap.getZoom(), 16), { duration: 0.8 });
        lmUpdateLocateBtn();
    } else {
        window.lmRetry();
    }
};
window.lmRetry = () => {
    if (lmGuideKind === 'loadfail') { lmHideGuide(); mapOnOpen(); return; }
    lmHideGuide(); lmStopWatch(); lmStartTracking();
};
window.lmHideGuide = lmHideGuide;
window.lmDirections = () => {
    if (!lmSelected) { showToast(lmTx('pick_first'), 'map-pin', 'text-amber-400'); return; }
    const to = `${lmSelected.lat.toFixed(6)},${lmSelected.lng.toFixed(6)}`;
    const from = lmLast ? `${lmLast.lat.toFixed(6)},${lmLast.lng.toFixed(6)}` : '';
    window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${from};${to}`, '_blank', 'noopener');
};
window.lmCopyCoords = () => {
    if (!lmLast) return;
    const txt = `${lmLast.lat.toFixed(6)}, ${lmLast.lng.toFixed(6)}`;
    const done = () => showToast(lmTx('copied'), 'copy', 'text-emerald-400');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done).catch(() => {});
    else done();
};

// ---------- ট্যাব খোলা/বন্ধ ----------
function lmBindGlobal() {
    if (lmGlobalBound) return;
    lmGlobalBound = true;
    const fix = () => {
        clearTimeout(lmResizeTimer);
        lmResizeTimer = setTimeout(() => { if (lmMap && currentTab === 'map') lmMap.invalidateSize(); }, 150);
    };
    window.addEventListener('resize', fix);
    window.addEventListener('orientationchange', fix);
    // ব্যাটারি বাঁচাতে: অ্যাপ/ব্রাউজার ব্যাকগ্রাউন্ডে গেলে GPS বন্ধ, ফিরলে আবার চালু
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) lmStopWatch();
        else if (currentTab === 'map' && lmMap) lmStartTracking();
    });
}
async function mapOnOpen() {
    lmBuildShell();
    lmBindGlobal();
    lmApplyTexts();
    lmRenderChips();
    lmRenderSheet();
    lmUpdateLocateBtn();
    const ok = await lmInitMap();
    if (!ok || currentTab !== 'map') return;
    setTimeout(() => { try { lmMap.invalidateSize(); } catch (e) {} }, 60);
    setTimeout(() => { try { lmMap.invalidateSize(); } catch (e) {} }, 400);
    if (lmLast && lmFollow) lmMap.setView([lmLast.lat, lmLast.lng], Math.max(lmMap.getZoom(), 16), { animate: false });
    lmStartTracking();
}
function mapOnClose() { lmStopWatch(); }
