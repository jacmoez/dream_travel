// app/golf/[clubId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// ----- Golf Club Data (same as in HomePage) -----
interface GolfClub {
  name: string;
  location: string;
  holes: string;
  yards: string;
  description: string;
  mapLink: string;
  images: string[];
}

const golfClubs: Record<string, GolfClub> = {
  'luang-prabang-golf-club': {
    name: 'Luang Prabang Golf Club',
    location: 'Luang Prabang, Laos',
    holes: '18 Holes',
    yards: '7,200 yards',
    description: 'A scenic riverside course surrounded by mountains, offering a relaxing yet challenging golf experience.',
    mapLink: 'https://maps.google.com/?q=Luang+Prabang+Golf+Club',
    images: [
      'https://images.unsplash.com/photo-1592919505780-303950717480',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
      'https://images.unsplash.com/photo-1505842465776-3d90f616310f',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12'
    ]
  },
  'long-vien-golf-club': {
    name: 'Long Vien Golf Club',
    location: 'Vientiane, Laos',
    holes: '18 Holes',
    yards: '6,850 yards',
    description: 'One of the best maintained golf courses in Laos, featuring wide fairways and modern facilities.',
    mapLink: 'https://maps.google.com/?q=Long+Vien+Golf+Club',
    images: [
      'https://images.unsplash.com/photo-1551524164-6cf2ac3fcb5b',
      'https://images.unsplash.com/photo-1521412644187-c49fa049e84d',
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e',
      'https://images.unsplash.com/photo-1603570419884-1b2c6d9c4c52'
    ]
  },
  'sea-games-golf-club': {
    name: 'SEA Games Golf Club',
    location: 'Vientiane, Laos',
    holes: '27 Holes',
    yards: '7,100 yards',
    description: 'Built for international tournaments, this course offers a challenging layout with wide greens.',
    mapLink: 'https://maps.google.com/?q=SEA+Games+Golf+Club+Laos',
    images: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b',
      'https://images.unsplash.com/photo-1570111838200-3a3f1e8f9c89',
      'https://images.unsplash.com/photo-1603570419884-1b2c6d9c4c52',
      'https://images.unsplash.com/photo-1505842465776-3d90f616310f'
    ]
  },
  'dansavanh-golf-country-club': {
    name: 'Dansavanh Golf & Country Club',
    location: 'Vientiane Province, Laos',
    holes: '18 Holes',
    yards: '7,000 yards',
    description: 'Located near the Laos–Thailand border, this course offers a peaceful environment with beautiful views.',
    mapLink: 'https://maps.google.com/?q=Dansavanh+Golf+Club',
    images: [
      'https://images.unsplash.com/photo-1592919505780-303950717480',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12',
      'https://images.unsplash.com/photo-1521412644187-c49fa049e84d',
      'https://images.unsplash.com/photo-1551524164-6cf2ac3fcb5b'
    ]
  },
  'lao-country-club': {
    name: 'Lao Country Club',
    location: 'Vientiane, Laos',
    holes: '18 Holes',
    yards: '6,500 yards',
    description: 'One of the oldest golf courses in Laos, popular with both locals and tourists.',
    mapLink: 'https://maps.google.com/?q=Lao+Country+Club',
    images: [
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e',
      'https://images.unsplash.com/photo-1505842465776-3d90f616310f',
      'https://images.unsplash.com/photo-1570111838200-3a3f1e8f9c89',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa'
    ]
  },
  'lakeview-vientiane-golf-club': {
    name: 'Lakeview Vientiane Golf Club',
    location: 'Vientiane, Laos',
    holes: '18 Holes',
    yards: '7,300 yards',
    description: 'A modern course with water hazards and scenic lake views, great for experienced players.',
    mapLink: 'https://maps.google.com/?q=Lakeview+Vientiane+Golf+Club',
    images: [
      'https://images.unsplash.com/photo-1603570419884-1b2c6d9c4c52',
      'https://images.unsplash.com/photo-1551524164-6cf2ac3fcb5b',
      'https://images.unsplash.com/photo-1521412644187-c49fa049e84d',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12'
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