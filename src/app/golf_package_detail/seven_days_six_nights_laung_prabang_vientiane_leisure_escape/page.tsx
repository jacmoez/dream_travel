"use client";

import { useState, useEffect } from "react";

export default function VientianeGolfLeisureEscape() {
  // Slideshow images – real golf course photos (Long Vien, Lakeview, SEA Games)
  const images = [
    "https://i.imgur.com/M7rWEZK.jpeg",   // Long Vien Golf Club
    "https://i.imgur.com/LInxA73.jpeg",   // Lakeview Golf Club
    "https://i.imgur.com/pPznpWU.jpeg",   // SEA Games Golf Club
    "https://i.imgur.com/dMtUbXk.jpeg",   
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
      <h1 className="text-3xl font-bold text-center mb-2">Vientiane Golf &amp; Leisure Escape – 7 Days / 6 Nights</h1>
      
      {/* Slideshow */}
      <Slideshow />
                  <p className="package-card-new-desc text-center my-3 text-red-700">minium player : 4</p>

      {/* Overview */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 italic text-gray-700">
        A well-balanced golf holiday in Vientiane combining championship golf courses, cultural discovery, and leisure time. Ideal for golfers who want both play &amp; relaxation in one seamless journey.
      </div>

      {/* Duration & Pax */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold"> Duration:</span> 7 Days / 6 Nights
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold"> Pax:</span> 2 – 12 golfers
        </div>
      </div>

      {/* Detailed Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4"> Detailed Itinerary</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold">Day 1 – Arrival Vientiane</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Arrival at Wattay International Airport</li>
              <li>Meet &amp; greet by local representative</li>
              <li>Private transfer to hotel &amp; check-in</li>
              <li>Trip briefing &amp; golf schedule overview</li>
            </ul>
            <div className="text-sm text-gray-500 mt-1">Overnight in Vientiane</div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Day 2 – Golf at Long Vien Golf Club</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Transfer to Long Vien Golf Club</li>
              <li>Tee time: ~09:00 – Play 18 holes</li>
              <li> Green fee |  Caddie |  Golf cart</li>
              <li>Afternoon free at leisure</li>
            </ul>
            <div className="text-sm text-gray-500 mt-1">Overnight in Vientiane</div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Day 3 – Leisure / Rest Day</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Full day at leisure</li>
              <li>Optional activities: Spa &amp; massage, Mekong riverside café, Shopping &amp; local markets</li>
            </ul>
            <div className="text-sm text-gray-500 mt-1">Overnight in Vientiane</div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Day 4 – Vientiane City Tour</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Half-day / full-day city tour</li>
              <li>Visit: Pha That Luang, Patuxai, Wat Sisaket, Buddha Park</li>
              <li>Optional sunset at Mekong riverside</li>
            </ul>
            <div className="text-sm text-gray-500 mt-1">Overnight in Vientiane</div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Day 5 – Golf at Lakeview Golf Club</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Transfer to Lakeview Vientiane Golf Club</li>
              <li>Tee time: ~09:00 – Play 18 holes</li>
              <li> Green fee |  Caddie |  Golf cart</li>
              <li>Afternoon at leisure</li>
            </ul>
            <div className="text-sm text-gray-500 mt-1">Overnight in Vientiane</div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Day 6 – Golf at SEA Games Golf Club</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Transfer to SEA Games Golf Club</li>
              <li>Play 18 holes on championship 27-hole layout</li>
              <li> Cart &amp; caddie included</li>
              <li>Afternoon free</li>
            </ul>
            <div className="text-sm text-gray-500 mt-1">Overnight in Vientiane</div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Day 7 – Departure</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Breakfast at hotel</li>
              <li>Free time until transfer</li>
              <li>Private transfer to airport</li>
              <li>Departure</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Package notes */}
      <div className="bg-gray-50 p-4 rounded-md mb-4 text-sm text-gray-700">
        <span className="font-semibold"> Package Includes:</span> Airport transfers, 6 nights accommodation with daily breakfast, green fees + caddie + cart for 3 golf rounds (Long Vien, Lakeview, SEA Games), half-day city tour. <br />
        <span className="font-semibold"> Excludes:</span> International flights, meals not mentioned, personal expenses, optional activities (spa, extra tours), travel insurance.
      </div>

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}