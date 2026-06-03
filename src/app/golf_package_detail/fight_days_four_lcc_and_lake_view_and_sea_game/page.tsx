"use client";

import { useState, useEffect } from "react";

export default function GolfPackageVientianeTriple() {
  // Slideshow images – real golf course images from the provided sets
  const images = [
    "https://i.imgur.com/nZqSXz6.jpeg",     // Lakeview Golf Club
    "https://i.imgur.com/rDMj7bS.jpeg",     // SEA Games Golf Club
    "https://i.imgur.com/x4A7hpH.jpeg",     // Lao Country Club (LCC)
    "https://i.imgur.com/GlDTwZb.jpeg",     // Lakeview Golf Club (another view)
    "https://i.imgur.com/xosYclE.jpeg",     // SEA Games Golf Club (another view)
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
          <img src={images[currentIndex]} alt={`Golf course view ${currentIndex + 1}`} className="w-full h-full object-cover" />
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
      <h1 className="text-3xl font-bold text-center mb-2">5D4N Golf Package – LCC, Lake View &amp; SEA Games Course</h1>
      <Slideshow />

      {/* Duration & Courses */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> 5 Days / 4 Nights
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Courses:</span> Lao Country Club (LCC), Lake View Golf Club, SEA Games Golf Course
        </div>
      </div>

      {/* Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold">Day 1: Arrival – Vientiane</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Airport pickup and transfer to hotel</li>
              <li>Check-in at hotel</li>
              <li>Free time to relax</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 2: Golf at LCC</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Transfer to Lao Country Club (LCC)</li>
              <li>18 holes of golf (includes green fee)</li>
              <li>Return to hotel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 3: Golf at Lake View</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Transfer to Lake View Golf Club</li>
              <li>18 holes of golf</li>
              <li>Return to hotel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 4: Golf at SEA Games Course</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Transfer to SEA Games Golf Course</li>
              <li>18 holes of golf</li>
              <li>Return to hotel</li>
              <li>Free evening at leisure</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 5: Departure</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Transfer to airport for departure</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}