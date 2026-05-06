"use client";

import { useState, useEffect } from "react";

export default function VangViengAdventureDayTrip() {
  // Slideshow images (real Vang Vieng landscapes, Blue Lagoon, Angel Cave)
  const images = [
    "https://a.cdn-hotels.com/gdcs/production193/d674/35ae1968-d1d4-43cd-8637-42639f664e8a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium?w=800&h=500&fit=crop", // Vang Vieng mountains
    "https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Nam-Song-River-in-Vang-Vieng-Laos.jpg?w=800&h=500&fit=crop", // Nam Song River
    "https://images.travelandleisureasia.com/wp-content/uploads/sites/6/2025/04/14173201/Vang-Vieng-1.jpg?w=800&h=500&fit=crop", // Hot air balloon
    "https://i.pinimg.com/originals/f9/45/a0/f945a05e558a46483f9bfa6dcd794312.jpg?w=800&h=500&fit=crop", // Kayaking
    "https://cdn.getyourguide.com/img/location/5a086527d1738.jpeg/88.jpg?w=800&h=500&fit=crop", // Nang Fa Cave
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
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="w-full h-full object-cover" />
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
        >
          ❯
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition ${idx === currentIndex ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-2">Vang Vieng Adventure Day Trip</h1>
      <h2 className="text-xl text-center text-gray-600 mb-2">Full Day</h2>
      <Slideshow />

      {/* Short Description */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center italic">
        {`A perfect escape from Vientiane to explore dramatic limestone landscapes, caves, and lagoons in Vang Vieng.`}
      </div>

      {/* Duration & Destinations */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> Full Day
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Destinations Covered:</span> Vang Vieng – Blue Lagoon – Angel Cave
        </div>
      </div>

      {/* Highlights */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3">Highlights</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Swim at Blue Lagoon 2</li>
          <li>Explore Angel Cave</li>
          <li>Scenic mountain views</li>
          <li>Optional kayaking</li>
        </ul>
      </section>

      {/* Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-3">
          <div>
            <span className="font-semibold">Morning:</span> Depart Vientiane to Vang Vieng (approx. 2 hours)
          </div>
          <div>
            <span className="font-semibold">Midday:</span> Visit Blue Lagoon, relax and swim
          </div>
          <div>
            <span className="font-semibold">Afternoon:</span> Explore Angel Cave, return to Vientiane
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Price (USD per person)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Pax</th>
                <th className="border p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">1</td><td className="border p-2">$140</td></tr>
              <tr><td className="border p-2">2</td><td className="border p-2">$95</td></tr>
              <tr><td className="border p-2">3–4</td><td className="border p-2">$80</td></tr>
              <tr><td className="border p-2">5+</td><td className="border p-2">$70</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">Inclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>✔ Transport (round trip)</li>
            <li>✔ Guide</li>
            <li>✔ Entrance fees</li>
            <li>✔ Drinking water</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Exclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>✘ Meals</li>
            <li>✘ Optional activities</li>
          </ul>
        </div>
      </div>

      {/* Optional Add-ons */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Optional Add-ons</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Kayaking</li>
          <li>Zipline</li>
          <li>ATV ride</li>
        </ul>
      </section>

      {/* Footer note (optional, can be removed if not wanted) */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}