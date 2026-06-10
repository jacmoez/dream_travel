"use client";

import { useState, useEffect } from "react";

export default function GolfPackageLuangPrabang() {
  // Slideshow images – real Luang Prabang Golf Club photos (5 images total)
  const images = [

    "https://i.imgur.com/1Rjk8vT.jpeg",
    "https://i.imgur.com/meYhsb6.jpeg",
    "https://i.imgur.com/AZ5Vr3F.jpeg"


  ];

  const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const goToSlide = (index: number) => setCurrentIndex(index);

    useEffect(() => {
      if (!autoPlay) return;
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }, [autoPlay]);

    return (
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg mt-5 mb-5">
        <div className="relative h-64 md:h-96">
          <img src={images[currentIndex]} alt={`Luang Prabang Golf Club view ${currentIndex + 1}`} className="w-full h-full object-cover" />
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
          aria-label="Next slide"
        >
          ❯
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition ${idx === currentIndex ? "bg-white" : "bg-gray-400"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-2">4D3N Golf Package – Luang Prabang (LPQ)</h1>
      <Slideshow />

      {/* Duration & Course Info */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> 4 Days / 3 Nights
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Golf Course:</span> Luang Prabang Golf Club (18 holes, scenic mountain views)
        </div>
      </div>

      {/* Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold">Day 1: Arrival – Luang Prabang</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Airport pickup &amp; hotel check-in</li>
              <li>Free leisure time to relax or explore nearby areas</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 2: Golf in Luang Prabang</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Transfer to Luang Prabang Golf Club</li>
              <li>18 holes of golf (green fee included)</li>
              <li>Return transfer to hotel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 3: Leisure or Optional Golf</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Free day for personal leisure</li>
              <li>Optional: Second round of golf at Luang Prabang Golf Club (additional fee)</li>
              <li>Optional: Half-day UNESCO city tour – visit temples, royal palace, and traditional heritage sites (extra charge)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 4: Departure</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Transfer to Luang Prabang International Airport (LPQ)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Optional activities note */}
      <div className="bg-gray-50 p-4 rounded-md mb-4 text-sm text-gray-700">
        <span className="font-semibold"> Note:</span> Optional second golf round and UNESCO city tour on Day 3 can be arranged upon request. Please contact us for pricing and availability.
      </div>

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}