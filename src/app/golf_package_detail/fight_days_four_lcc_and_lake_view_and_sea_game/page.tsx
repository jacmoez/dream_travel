
"use client";

import { useState, useEffect } from "react";

export default function GolfPackageVientianeTriple() {
  const images = [
    "https://i.imgur.com/2Hy3Co0.jpeg",   // Lao Country Club (LCC)
    "https://i.imgur.com/d9PqrYs.jpeg",   // Lakeview Golf Club (main)
    "https://i.imgur.com/APhNiLp.jpeg",   // Lakeview Golf Club (alternate)
    "https://i.imgur.com/OFl4wo2.jpeg",   // SEA Games Golf Club (main)
    "https://i.imgur.com/qQR01GL.jpeg",   // SEA Games Golf Club (alternate)
  ];

  const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    const goToSlide = (index: number) => setCurrentIndex(index);

    useEffect(() => {
      if (!autoPlay) return;
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }, [autoPlay]);

    return (
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg mt-5 mb-5">
        <div className="relative h-64 md:h-96">
          <img
            src={images[currentIndex]}
            alt={`Golf course view ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Left arrow – high z-index, ensure clickable */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition z-[100] cursor-pointer w-10 h-10 flex items-center justify-center text-xl shadow-lg"
          style={{ pointerEvents: "auto" }}
          aria-label="Previous slide"
        >
          ❮
        </button>
        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition z-[100] cursor-pointer w-10 h-10 flex items-center justify-center text-xl shadow-lg"
          style={{ pointerEvents: "auto" }}
          aria-label="Next slide"
        >
          ❯
        </button>
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-[100]">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                idx === currentIndex ? "bg-white scale-110" : "bg-gray-400 hover:bg-gray-300"
              } cursor-pointer`}
              style={{ pointerEvents: "auto" }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-2">
        5D4N Golf Package – LCC, Lake View &amp; SEA Games Course
      </h1>
      <Slideshow />
       <p className="package-card-new-desc text-center my-3 text-red-700">minium player : 4</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> 5 Days / 4 Nights
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Courses:</span> Lao Country Club (LCC), Lake View Golf Club, SEA Games Golf Course
        </div>
      </div>

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

      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}