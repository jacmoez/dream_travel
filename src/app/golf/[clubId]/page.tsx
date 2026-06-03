// app/golf/[clubId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// ----- Golf Club Data (same as in HomePage) -----
interface GolfClub {
  name: string;
  location: string;
  city:string,
  holes: string;
  yards: string;
  description: string;
  mapLink: string;
  images: string[];
}

const golfClubs: Record<string, GolfClub> = {
  'dansavanh_golf_club': {
    name: 'Dansavanh Golf Club',
    city: 'Vientiane Province',
    location: 'Dansavanh Golf Club, Vientiane Province, Laos',
    holes: '18 Holes',
    yards: '7,200 yards',
    description: 'A scenic riverside course surrounded by mountains, offering a relaxing yet challenging golf experience.',
    mapLink: 'https://maps.google.com/?q=Dansavanh+Golf+Club+Laos',
    images: [
      "https://i.imgur.com/GK6YDQS.jpeg",
      "https://i.imgur.com/zERBoU8.jpeg",
      "https://i.imgur.com/yXi9Auv.jpeg",
      "https://i.imgur.com/l97b1KP.jpeg",
      "https://i.imgur.com/G2Ao1wE.jpeg"
    ]
  },
  'luang-prabang-golf-club': {
    name: 'Luang Prabang Golf Club',
    city: 'Luang Prabang',
    location: 'Luang Prabang Golf Club, Luang Prabang, Laos',
    holes: '18 Holes',
    yards: '7,200 yards',
    description: 'A highland course set in the historic UNESCO town of Luang Prabang, with stunning mountain views and a tranquil atmosphere.',
    mapLink: 'https://maps.google.com/?q=Luang+Prabang+Golf+Club',
    images: [
      "https://i.imgur.com/meYhsb6.jpeg",
      "https://i.imgur.com/AZ5Vr3F.jpeg",
      "https://i.imgur.com/B2fjoxj.jpeg",
      "https://i.imgur.com/1Rjk8vT.jpeg",
     
    ]
  },
  'long-vien-golf-club': {
    name: 'Long Vien Golf Club',
    city: 'Vientiane',
    location: 'Long Vien Golf Club, Vientiane, Laos',
    holes: '18 Holes',
    yards: '6,850 yards',
    description: 'One of the best maintained golf courses in Laos, featuring wide fairways and modern facilities.',
    mapLink: 'https://maps.google.com/?q=Long+Vien+Golf+Club+Vientiane',
    images: [
      "https://i.imgur.com/M7rWEZK.jpeg",
      "https://i.imgur.com/LInxA73.jpeg",
      "https://i.imgur.com/XOoIy8Z.jpeg",
      "https://i.imgur.com/pPznpWU.jpeg",
      "https://i.imgur.com/dMtUbXk.jpeg",
    ]
  },
  'sea-games-golf-club': {
    name: 'SEA Games Golf Club',
    city: 'Vientiane',
    location: 'SEA Games Golf Club, Vientiane, Laos',
    holes: '27 Holes',
    yards: '7,100 yards',
    description: 'Built for international tournaments, this course offers a challenging layout with wide, undulating greens.',
    mapLink: 'https://maps.google.com/?q=SEA+Games+Golf+Club+Vientiane',
    images: [
      "https://i.imgur.com/rDMj7bS.jpeg",
      "https://i.imgur.com/xosYclE.jpeg",
      "https://i.imgur.com/OFl4wo2.jpeg",
      "https://i.imgur.com/jWfX6zh.jpeg",
    ]
  },
  'lao-country-club': {
    name: 'Lao Country Club',
    city: 'Vientiane',
    location: 'Lao Country Club, Vientiane, Laos',
    holes: '18 Holes',
    yards: '6,500 yards',
    description: 'One of the oldest golf courses in Laos, this club is popular with both locals and tourists for its classic layout and friendly vibe.',
    mapLink: 'https://maps.google.com/?q=Lao+Country+Club+Vientiane',
    images: [
      "https://i.imgur.com/x4A7hpH.jpeg",
      "https://i.imgur.com/K6gOupW.jpeg",
      "https://i.imgur.com/2Hy3Co0.jpeg",
      "https://i.imgur.com/94IpoFP.jpeg",
      "https://i.imgur.com/ZEWk4Y9.jpeg"
    ]
  },
  'lakeview-vientiane-golf-club': {
    name: 'Lakeview Vientiane Golf Club',
    city: 'Vientiane',
    location: 'Lakeview Vientiane Golf Club, Vientiane, Laos',
    holes: '18 Holes',
    yards: '7,300 yards',
    description: 'A modern course with numerous water hazards and scenic lake views, ideal for experienced players seeking a challenge.',
    mapLink: 'https://maps.google.com/?q=Lakeview+Vientiane+Golf+Club',
    images: [
      "https://i.imgur.com/nZqSXz6.jpeg",
      "https://i.imgur.com/GlDTwZb.jpeg",
      "https://i.imgur.com/mYjfy1N.jpeg",
      "https://i.imgur.com/gjbL5Oc.jpeg",
      "https://i.imgur.com/yxOOhmp.jpeg",
    ]
  },
  'mekong_golf_club': {
    name: 'Mekong Golf Club',
    city: 'Vientiane',
    location: 'Mekong Golf Club, Vientiane, Laos',
    holes: '18 Holes',
    yards: '7,300 yards',
    description: 'A championship layout along the Mekong River, featuring wide fairways, water hazards, and stunning sunset views.',
    mapLink: 'https://maps.google.com/?q=Mekong+Golf+Club+Vientiane',
    images: [
      "https://i.imgur.com/kVV2Z5z.jpeg",
      "https://i.imgur.com/z9EKxKj.jpeg",
      "https://i.imgur.com/ybN2iVO.jpeg",
      "https://i.imgur.com/CzXtMuo.jpeg"
    ]
  },
  'vang_vieng_golf_club': {  // Fixed typo: was 'vang_vieng_golf_glub'
    name: 'Vang Vieng Golf Club',
    city: 'Vang Vieng',
    location: 'Vang Vieng Golf Club, Vang Vieng, Laos',
    holes: '18 Holes',
    yards: '7,300 yards',
    description: 'A picturesque course set among limestone karsts and rice paddies, offering a unique and scenic golf experience.',
    mapLink: 'https://maps.google.com/?q=Vang+Vieng+Golf+Club+Laos',
    images: [
      "https://i.imgur.com/BIHfV2W.jpeg",
      "https://i.imgur.com/ogbD8od.jpeg",
      "https://i.imgur.com/R1QftN1.jpeg",
      "https://i.imgur.com/80KeW1U.jpeg",
      "https://i.imgur.com/oTpnEBS.jpeg",
    ]
  }
};
const defaultClub = golfClubs['luang-prabang-golf-club'];

export default function GolfClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clubId = params?.clubId as string;
  const club = golfClubs[clubId] || defaultClub;

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = club.images.length;

  useEffect(() => {
    setCurrentSlide(0);
  }, [clubId]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <main className="bg-slate-50 text-slate-800 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
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
              {club.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${club.name} - ${idx + 1}`}
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
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
              {club.images.map((_, idx) => (
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
              {club.name}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <i className="fas fa-map-marker-alt text-[#ED6A02] mr-2"></i>
              <span>{club.location}</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-[#2E7D32]/10 text-[#2E7D32] px-3 py-1 rounded-full text-sm font-semibold">
                <i className="fas fa-flag mr-1"></i> {club.holes}
              </span>
              <span className="bg-[#ED6A02]/10 text-[#ED6A02] px-3 py-1 rounded-full text-sm font-semibold">
                <i className="fas fa-ruler mr-1"></i> {club.yards}
              </span>
            </div>
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">
                About this golf course
              </h2>
              <p className="text-gray-700 mb-6">{club.description}</p>
              <a
                href={club.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#ED6A02] text-white px-5 py-2 rounded-full hover:bg-[#2E7D32] transition shadow-md"
              >
                <i className="fas fa-map-marked-alt mr-2"></i> View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}