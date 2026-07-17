"use client";

import { useState, useEffect, SetStateAction } from "react";

export default function LuangPrabangGolfCultureTour() {
  // Slideshow images – using the same set as provided (Long Vien, Lakeview, SEA Games)
  const images = [
   "https://i.imgur.com/B2fjoxj.jpeg",
   "https://i.imgur.com/1Rjk8vT.jpeg",
   "https://i.imgur.com/meYhsb6.jpeg",
   "https://i.imgur.com/AZ5Vr3F.jpeg",
  ];

  const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const goToSlide = (index: SetStateAction<number>) => setCurrentIndex(index);

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
      <h1 className="text-3xl font-bold text-center mb-2">
        Luang Prabang Golf &amp; Culture Tour
      </h1>

      <Slideshow />

      <p className="text-center text-2xl font-semibold text-blue-700 my-2">
        From USD 310/person
      </p>

      <p className="package-card-new-desc text-center my-3 text-red-700 font-medium">
        minimum player - 4
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> 4 Days / 3 Nights
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Golf Course:</span> Luang Prabang Golf Club
        </div>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">
          Itinerary
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold">
              Day 1: Arrival – Luang Prabang International Airport
            </h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Airport pickup</li>
              <li>Hotel check-in</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">
              Day 2: Golf in Luang Prabang Club
            </h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Transfer to Luang Prabang Golf Club</li>
              <li>18 holes of golf (green fee included)</li>
              <li>Return transfer to hotel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">
              Day 3: Luang Prabang City &amp; Heritage Tour
            </h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Guided tour of Luang Prabang&apos;s UNESCO World Heritage sites</li>
              <li>Visit the Royal Palace Museum, Wat Xieng Thong, and other cultural landmarks</li>
              <li>Explore the Old Town</li>
              <li>Return transfer to hotel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 4: Departure</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Transfer to Luang Prabang International Airport</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="font-semibold">Exclusions:</p>
        <p>meals, flight ticket, insurance</p>
      </div>

      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}