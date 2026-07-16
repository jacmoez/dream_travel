"use client";

import { useState, useEffect } from "react";

export default function LuangPrabangVangViengExplorer() {
  const images = [
    "https://i.imgur.com/4HTtNcg.jpeg",
    "https://i.imgur.com/ZQdmvVd.jpeg",
    "https://i.imgur.com/CqBAdf4.jpeg",
    "https://i.imgur.com/B6vdCe4.jpeg",
    "https://i.imgur.com/oCAOEjp.jpeg"



  ];

  // ----- New Package Selection Component -----
  const PackageSelection = () => {
    // Estimated twin sharing and single supplement based on typical 3★/4★ rates for this tour
    const standardTwin = 390;     // from 2-person price in the table
    const standardSingleSupplement = 120;
    const standardSingle = standardTwin + standardSingleSupplement;

    const deluxeTwin = 480;       // estimated (4★)
    const deluxeSingleSupplement = 195;
    const deluxeSingle = deluxeTwin + deluxeSingleSupplement;

    return (
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Package Selection (Hotels & Pricing)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Package</th>
                <th className="border p-2 text-left">Hotel Category</th>
                <th className="border p-2 text-left">Twin Sharing (per person)</th>
                <th className="border p-2 text-left">Single Room</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Standard Package</td>
                <td className="border p-2">3★ hotels (standard room)</td>
                <td className="border p-2 font-semibold">USD {standardTwin}</td>
                <td className="border p-2 font-semibold">USD {standardSingle}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">Deluxe Package</td>
                <td className="border p-2">4★ hotels (deluxe room)</td>
                <td className="border p-2 font-semibold">USD {deluxeTwin}</td>
                <td className="border p-2 font-semibold">USD {deluxeSingle}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Pricing is based on the standard validity period. For exact hotel names and seasonal surcharges, please refer to the detailed pricing table below.
        </p>
      </section>
    );
  };

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
      <h1 className="text-3xl font-bold text-center mb-2">Luang Prabang & Vang Vieng Explorer</h1>
      <h2 className="text-xl text-center text-gray-600 mb-2">4 Days / 3 Nights</h2>
      <Slideshow />
      <div className="ackage-mini-duration-text text-red-700 text-center my-3">minium : 2 person</div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center italic">
        Combine culture and adventure with this multi-destination journey across Laos’ most iconic destinations.
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> 4 Days / 3 Nights
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Destinations Covered:</span> Vientiane – Vang Vieng – Luang Prabang
        </div>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3">Highlights</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Laos-China high-speed train experience</li>
          <li>Vang Vieng adventure</li>
          <li>Luang Prabang heritage</li>
          <li>Kuang Si waterfall</li>
        </ul>
      </section>

      {/* New Package Selection Table */}
      {/* <PackageSelection /> */}

      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Day 1: Vientiane → Vang Vieng</li>
          <li>Day 2: Vang Vieng exploration</li>
          <li>Day 3: Train to Luang Prabang + city tour</li>
          <li>Day 4: Kuang Si + departure</li>
        </ul>
      </section>

      {/* Detailed Pricing Table (uncommented) */}
      {/* <section className="mb-8">
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
              <tr><td className="border p-2">1</td><td className="border p-2">$520</td></tr>
              <tr><td className="border p-2">2</td><td className="border p-2">$390</td></tr>
              <tr><td className="border p-2">3–4</td><td className="border p-2">$350</td></tr>
              <tr><td className="border p-2">5+</td><td className="border p-2">$320</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          * Rate is per person based on twin/double sharing. Single supplement applies for solo traveller (add $120 for Standard, $195 for Deluxe).
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm mt-3">
          <p className="font-semibold">Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Itinerary may change due to weather or local conditions.</li>
            <li>Special requests (dietary, etc.) must be made before departure.</li>
            <li>A surcharge of USD 30 per person applies during Lunar New Year (28 Jan – 3 Feb 2027).</li>
          </ul>
        </div>
      </section> */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">Inclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Train tickets (Vientiane → Vang Vieng → Luang Prabang)</li>
            <li>Accommodation based on twin/double sharing</li>
            <li>Private transport with air‑conditioning</li>
            <li>English‑speaking guide</li>
            <li>Entrance fees for sightseeing</li>
            <li>Complimentary mineral water</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Exclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>International & domestic flights</li>
            <li>Visa fees</li>
            <li>Meals not mentioned</li>
            <li>Tipping for guide/driver</li>
            <li>Travel insurance</li>
            <li>Personal expenses</li>
          </ul>
        </div>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Optional Add-ons</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Hot air balloon over Vang Vieng – USD 85/person</li>
          <li>Luxury train seat upgrade – USD 30/person (one way)</li>
          <li>Kuang Si Waterfall private boat – USD 20/person</li>
        </ul>
      </section>

      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}