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
  'luang-prabang': {
    name: 'Luang Prabang',
    location: 'Luang Prabang Province, Northern Laos',
    description: [
      'Nestled at the confluence of the Mekong and Nam Khan rivers and encircled by misty mountains, Luang Prabang is a captivating UNESCO World Heritage town that blends centuries of spiritual heritage with French colonial elegance. The former royal capital\'s charm lies in its harmonious landscape of 34 historic temples with gleaming golden spires, traditional Lao architecture, and 19th-century colonial villas, creating a peaceful and unhurried atmosphere perfect for slow travel.',
      'The town is also famous for its daily alms-giving ceremony, vibrant night markets, and the nearby Kuang Si Falls. Whether you explore its golden temples, cruise the Mekong, or simply relax in a riverside café, Luang Prabang offers a timeless journey into Lao culture.'
    ],
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
    ]
  },
  'vang-vieng': {
    name: 'Vang Vieng',
    location: 'Vientiane Province, Central Laos',
    description: [
      'Once notorious as Southeast Asia\'s party capital, Vang Vieng has successfully reinvented itself as an eco-adventure paradise set against a breathtaking backdrop of dramatic karst limestone mountains and the winding Nam Song River. Today, the town focuses on its stunning natural assets, drawing travelers for a range of outdoor activities including exploring cool caves, kayaking on quiet rivers, trekking to bright blue lagoons, and touring picturesque rice paddies that stretch towards sheer cliffs.',
      'Sunrise hot air balloon rides, rock climbing, and tubing remain popular, but the atmosphere is now more relaxed and family-friendly. Vang Vieng is the perfect base for those seeking both adrenaline and serenity amid some of Laos’ most spectacular scenery.'
    ],
    images: [
      'https://images.unsplash.com/photo-1558121638-4712f0c8c9d9',
      'https://images.unsplash.com/photo-1560185009-8e5c6ea8a5f7',
      'https://images.unsplash.com/photo-1544731612-de7f96afe55f',
      'https://images.unsplash.com/photo-1539642932569-1e1352e48fe4'
    ]
  },
  'kuang-si-falls': {
    name: 'Kuang Si Falls',
    location: 'Near Luang Prabang, Northern Laos',
    description: [
      'Located about 30 kilometers south of Luang Prabang, Kuang Si Falls is a spectacular multi-tiered natural wonder, where turquoise, mineral-rich water cascades 50 meters down a lush jungle hillside. The falls are renowned for their surreal "Tiffany blue" pools, which are perfect for swimming, and the main drop creates a dramatic natural curtain of water.',
      'The surrounding park also features a well-regarded bear rescue center, making it a complete day-trip destination for both relaxation and wildlife conservation. Whether you climb to the top for panoramic views or cool off in the lower pools, Kuang Si Falls is an unforgettable highlight of any Laos itinerary.'
    ],
    images: [
      'https://images.unsplash.com/photo-1577561515701-f8d2f35598d1',
      'https://images.unsplash.com/photo-1583389505823-f3faab3cfbcc',
      'https://images.unsplash.com/photo-1528484902624-7c6b96be2ec0',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a'
    ]
  },
  'plain-of-jars': {
    name: 'Plain of Jars',
    location: 'Xieng Khouang Plateau, Northern Laos',
    description: [
      'Scattered across the grassy Xieng Khouang Plateau near the town of Phonsavan, the enigmatic Plain of Jars is one of Southeast Asia\'s most mysterious and least-visited UNESCO World Heritage Sites. This remarkable archaeological landscape features thousands of massive stone jars, some weighing up to 14 tons, which date back to the Iron Age (500 BC to 500 AD).',
      'Despite over a century of research, the original purpose of the jars—whether as giant funeral urns or vessels for celebratory rice wine—remains a mystery, a puzzle deepened by the site\'s rugged beauty and history of wartime bombing. Visitors can explore several jar sites, learn about UXO clearance efforts, and witness stunning sunrise views over the ancient plain.'
    ],
    images: [
      'https://images.unsplash.com/photo-1544935435-4f3e3e6ac4d8',
      'https://images.unsplash.com/photo-1584703998276-d4f9d7d4e9b3',
      'https://images.unsplash.com/photo-1566224564248-f6b8c0f9a0c6',
      'https://images.unsplash.com/photo-1576109931187-dfda1b7f9a9d'
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