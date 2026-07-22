"use client";

import { useState, useEffect, SetStateAction } from "react";

export default function GolfPackageVientianeTriple() {
  const images = [
   "https://i.imgur.com/K6gOupW.jpeg",
   "https://i.imgur.com/2Hy3Co0.jpeg",
   "https://i.imgur.com/94IpoFP.jpeg",
   "https://i.imgur.com/XOoIy8Z.jpeg",
   "https://i.imgur.com/pPznpWU.jpeg"  
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
    const goToSlide = (index: SetStateAction<number>) => setCurrentIndex(index);

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
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition z-[100] cursor-pointer w-10 h-10 flex items-center justify-center text-xl shadow-lg"
          style={{ pointerEvents: "auto" }}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition z-[100] cursor-pointer w-10 h-10 flex items-center justify-center text-xl shadow-lg"
          style={{ pointerEvents: "auto" }}
          aria-label="Next slide"
        >
          ❯
        </button>
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
        Standard 2 Rounds in Vientiane
      </h1>
      <Slideshow />

      <p className="text-center text-2xl font-semibold text-blue-700 my-2">
        From USD 380/person
      </p>

      <p className="package-card-new-desc text-center my-3 text-red-700 font-medium">
        minimum player - 4
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> 4 Days / 3 Nights (2 Rounds)
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Golf Course:</span> Lao Country Club, Long Vien Club
        </div>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">
          Itinerary
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">
              Day 1: Arrival – Wattay International Airport (Vientiane)
            </h4>
            <p className="mt-1">
              Upon arrival at Wattay International Airport, you will be met and transferred to your hotel for check‑in. The remainder of the day is free to relax or begin exploring Vientiane.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Overnight:</strong> Vientiane</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">
              Day 2: Golf in Lao Country Club (walking club – no buggy)
            </h4>
            <p className="mt-1">
              After breakfast, you will be transferred to Lao Country Golf Club for an 18‑hole round. This traditional walking course offers a classic golfing experience without buggies – perfect for those who enjoy the game on foot. Green fees are included. Return transfer to your hotel is provided after the round.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Vientiane</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">
              Day 3: Golf in Long Vien Club
            </h4>
            <p className="mt-1">
              Today you will be taken to Long Vien Golf Club for your second round. The 18‑hole course is known for its peaceful setting and challenging water hazards. Green fees are included. After play, return to your hotel.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Vientiane</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Day 4: Departure</h4>
            <p className="mt-1">
              Enjoy breakfast at the hotel before checking out. At the scheduled time, you will be transferred to Wattay International Airport for your departure flight.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast</p>
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