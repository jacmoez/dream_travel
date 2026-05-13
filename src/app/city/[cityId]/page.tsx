// app/city/[cityId]/page.tsx (App Router)
'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// ----- Type & Data (same as before) -----
interface CityData {
  name: string;
  location: string;
  description: string[];
  images: string[];
}

const cityDataMap: Record<string, CityData> = {
  'champasak': {
    name: 'Champasak',
    location: 'Champasak Province, Southern Laos',
    description: [
      'Located along the banks of the Mekong River in southern Laos, Champasak is a quiet, rustic town best known as the gateway to the ancient Khmer temple complex of Wat Phu, a UNESCO World Heritage Site. Unlike the bustle of larger cities, Champasak retains a slow, laid‑back charm with French colonial villas, riverside guesthouses, and a landscape dotted with palm trees and rice paddies.',
      'The main attraction, Wat Phu, dates back to the 11th–13th centuries and is dramatically set at the base of Mount Phu Khao, offering stunning views over the Mekong floodplain. Visitors can also explore the nearby Bolaven Plateau for its coffee plantations and waterfalls, take a boat trip to the 4,000 Islands (Si Phan Don), or cycle through the peaceful countryside dotted with traditional Lao villages.'
    ],
    images: [
      'https://i.imgur.com/4QhvN7F.jpeg',
      'https://i.imgur.com/SoUuIxH.jpeg',
      'https://i.imgur.com/6gw7SDG.jpeg',
      'https://i.imgur.com/sG5jnE9.jpeg',
      'https://i.imgur.com/Su8Mr90.jpeg'
    ]
  },
  'vientiane': {   // corrected spelling from 'vieataine'
    name: 'Vientiane',
    location: 'Vientiane Capital, Central Laos',
    description: [
      'Stretched along the lazy Mekong River, Vientiane is Southeast Asia’s most relaxed capital – a charming blend of Lao, Thai, Chinese, and French influences. Unlike bustling metropolises, this city of 800,000 offers wide, tree‑lined boulevards, sidewalk cafes, and a slow‑paced rhythm perfect for exploration by bicycle or on foot. The skyline is dominated by golden stupas and red‑tiled temple roofs, most notably the iconic Pha That Luang, a 16th‑century Buddhist monument covered in gleaming gold leaf.',
      'Visitors can explore the ancient Wat Sisaket with its thousands of tiny Buddha statues, the mysterious Patuxai Victory Monument (often called "Laos’ Arc de Triomphe"), and the quirky Buddha Park filled with surreal concrete sculptures. As the sun sets, the Mekong riverside promenade comes alive with night markets, street food stalls, and locals exercising. Vientiane offers a gentle introduction to Lao culture, combining colonial heritage with genuine Buddhist spirituality.'
    ],
    images: [
      'https://i.imgur.com/TX7Xt7r.jpeg',
      'https://i.imgur.com/RzxbuvD.jpeg',
      'https://i.imgur.com/MExGgeh.jpeg',
      'https://i.imgur.com/x5qaByk.jpeg',
      'https://i.imgur.com/Yf9qVtG.jpeg'
    ]
  },
  'luang-prabang': {   // corrected spelling from 'Laung Prabaung'
    name: 'Luang Prabang',
    location: 'Luang Prabang Province, Northern Laos',
    description: [
      'Nestled at the confluence of the Mekong and Nam Khan rivers and encircled by misty mountains, Luang Prabang is a captivating UNESCO World Heritage town that blends centuries of spiritual heritage with French colonial elegance. The former royal capital\'s charm lies in its harmonious landscape of 34 historic temples with gleaming golden spires, traditional Lao architecture, and 19th-century colonial villas, creating a peaceful and unhurried atmosphere perfect for slow travel.',
      'The town is also famous for its daily alms-giving ceremony, vibrant night markets, and the nearby Kuang Si Falls. Whether you explore its golden temples, cruise the Mekong, or simply relax in a riverside café, Luang Prabang offers a timeless journey into Lao culture.'
    ],
    images: [
      'https://i.imgur.com/J4OGK1a.jpeg',
      'https://i.imgur.com/WMgocZ8.jpeg',
      'https://i.imgur.com/4HTtNcg.jpeg',
      'https://i.imgur.com/ZQdmvVd.jpeg',
      'https://i.imgur.com/CqBAdf4.jpeg'
    ]
  },
  'pak-beng': {   // new entry
    name: 'Pak Beng',
    location: 'Oudomxay Province, Northern Laos',
    description: [
      'Tucked between steep jungle‑covered mountains on the banks of the Mekong River, Pak Beng is a tiny port town that serves as the traditional overnight stop for slow boats traveling between Luang Prabang (Laos) and Huay Xai (Thailand). Despite its small size, the town has developed a surprising number of comfortable guesthouses, riverside restaurants, and night markets that cater to the steady flow of backpackers and adventurers.',
      'Most visitors only stay one night, but the town’s serene atmosphere, friendly locals, and beautiful sunsets over the Mekong make it a memorable pause on the classic river journey. For those with extra time, short treks to nearby hill‑tribe villages or a dip in the Nam Beng River are rewarding detours.'
    ],
    images: [
      'https://i.imgur.com/SJlpWSx.jpeg',
      'https://i.imgur.com/mfuu9Ar.jpeg',
      'https://i.imgur.com/V8TST5G.jpeg',
      'https://i.imgur.com/965W9kt.jpeg',
      'https://i.imgur.com/UZI13Qj.jpeg',
      'https://i.imgur.com/C7vmBhu.jpeg'
    ]
  },
  'plain-of-jars': {   // corrected spelling
    name: 'Plain of Jars',
    location: 'Xieng Khouang Plateau, Northern Laos',
    description: [
      'Scattered across the grassy Xieng Khouang Plateau near the town of Phonsavan, the enigmatic Plain of Jars is one of Southeast Asia\'s most mysterious and least-visited UNESCO World Heritage Sites. This remarkable archaeological landscape features thousands of massive stone jars, some weighing up to 14 tons, which date back to the Iron Age (500 BC to 500 AD).',
      'Despite over a century of research, the original purpose of the jars—whether as giant funeral urns or vessels for celebratory rice wine—remains a mystery, a puzzle deepened by the site\'s rugged beauty and history of wartime bombing. Visitors can explore several jar sites, learn about UXO clearance efforts, and witness stunning sunrise views over the ancient plain.'
    ],
    images: [
      'https://i.imgur.com/pd2ByH1.jpeg',
      'https://i.imgur.com/O90k98P.jpeg',
      'https://i.imgur.com/iZ70kkR.jpeg'
    ]
  },
  'vang-vieng': {   // corrected spelling from 'Vang Ving'
    name: 'Vang Vieng',
    location: 'Vientiane Province, Central Laos',
    description: [
      'Once notorious as Southeast Asia\'s party capital, Vang Vieng has successfully reinvented itself as an eco‑adventure paradise set against a breathtaking backdrop of dramatic karst limestone mountains and the winding Nam Song River. Today, the town focuses on its stunning natural assets, drawing travelers for a range of outdoor activities including exploring cool caves, kayaking on quiet rivers, trekking to bright blue lagoons, and touring picturesque rice paddies that stretch towards sheer cliffs.',
      'Sunrise hot air balloon rides, rock climbing, and tubing remain popular, but the atmosphere is now more relaxed and family‑friendly. Vang Vieng is the perfect base for those seeking both adrenaline and serenity amid some of Laos’ most spectacular scenery.'
    ],
    images: [
      'https://i.imgur.com/4AvfdfO.jpeg',
      'https://i.imgur.com/MkfSakl.jpeg',
      'https://i.imgur.com/B6vdCe4.jpeg',
      'https://i.imgur.com/oCAOEjp.jpeg',
      'https://i.imgur.com/PodUv1U.jpeg',
      'https://i.imgur.com/HqX4UWX.jpeg',
      'https://i.imgur.com/qpvI54M.jpeg',
      'https://i.imgur.com/yLcw1z5.jpeg',
      'https://i.imgur.com/A4PqFsS.jpeg',
      'https://i.imgur.com/syg89ua.jpeg',
      'https://i.imgur.com/eqXBYaO.jpeg'
    ]
  }
};  

const defaultCity = cityDataMap['luang-prabang'];

export default function CityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cityId = params?.cityId as string;
  const city = cityDataMap[cityId] || defaultCity;

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = city.images.length;

  useEffect(() => {
    setCurrentSlide(0);
  }, [cityId]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <main className="bg-slate-50 text-slate-800 min-h-screen flex flex-col">
      {/* Optional header – reuse your existing header component */}
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-[#2E7D32] hover:text-[#ED6A02] mb-4 transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Slider */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {city.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${city.name} - ${idx + 1}`}
                  className="w-full flex-shrink-0 object-cover h-64 md:h-80"
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
              {city.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-white w-4' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2E7D32] mb-2">
              {city.name}
            </h1>
            <div className="flex items-center text-gray-600 mb-6">
              <i className="fas fa-map-marker-alt text-[#ED6A02] mr-2"></i>
              <span>{city.location}</span>
            </div>
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">
                About this location
              </h2>
              {city.description.map((para, idx) => (
                <p key={idx} className="text-gray-700 mb-4">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}