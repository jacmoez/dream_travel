"use client";

import { useState, useEffect } from "react";

export default function VangViengAdventureDayTrip() {
  // Improved slideshow images for Vang Vieng
  const images = [
  "https://i.imgur.com/MkfSakl.jpeg",
  "https://i.imgur.com/B6vdCe4.jpeg",
  "https://i.imgur.com/oCAOEjp.jpeg",
  "https://i.imgur.com/PodUv1U.jpeg",
  "https://i.imgur.com/HqX4UWX.jpeg",
  "https://i.imgur.com/qpvI54M.jpeg"

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

  // ----- Package Selection Component (Day Trip) -----
  const PackageSelection = () => {
    // Prices based on 2‑person rate from detailed table
    const standardPrice2Pax = 95;   // for 2 persons
    const deluxePrice2Pax = 125;    // includes lunch + kayaking

    return (
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Package Selection</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Package</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Price (per person, 2 persons)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Standard Package</td>
                <td className="border p-2">Private transport, guide, entrance fees, mineral water</td>
                <td className="border p-2 font-semibold">USD {standardPrice2Pax}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">Deluxe Package</td>
                <td className="border p-2">Standard inclusions + local lunch + 1‑hour kayaking on Nam Song River</td>
                <td className="border p-2 font-semibold">USD {deluxePrice2Pax}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Prices are per person and vary with group size. See detailed table below.
        </p>
      </section>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-2">Vang Vieng Adventure Day Trip</h1>
      <h2 className="text-xl text-center text-gray-600 mb-2">Full Day</h2>
      <Slideshow />
      <div className="ackage-mini-duration-text text-red-700 text-center my-3">minium : 2 person</div>

      {/* Short Description */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center italic">
        A perfect escape from Vientiane to explore dramatic limestone landscapes, caves, and lagoons in Vang Vieng.
      </div>

      {/* Duration & Destinations */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> Full Day (approx. 12 hours)
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Destinations Covered:</span> Vang Vieng – Blue Lagoon – Angel Cave – Nam Song River
        </div>
      </div>

      {/* Highlights */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3">Highlights</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Swim in the turquoise waters of Blue Lagoon 2</li>
          <li>Explore the mystical Angel Cave (Tham Theu)</li>
          <li>Enjoy stunning mountain and rice‑field views en route</li>
          <li>Optional kayaking, zipline, or ATV rides for extra adventure</li>
        </ul>
      </section>

      {/* Package Selection Table */}
      {/* <PackageSelection /> */}

      {/* Detailed Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">07:30 AM:</span> Pick up from your hotel in Vientiane.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">09:30 AM – 10:30 AM:</span> Drive to Vang Vieng via the new expressway (approx. 1.5 hours). Enjoy scenic views of limestone karsts and countryside.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">10:30 AM – 12:00 PM:</span> Visit Blue Lagoon 2 – swim, relax, or explore the surrounding area.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">12:00 PM – 01:00 PM:</span> Lunch break (own expense, or included in Deluxe Package).
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">01:00 PM – 02:30 PM:</span> Explore Angel Cave (Tham Theu) with its impressive stalactites and Buddha images.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">02:30 PM – 03:30 PM:</span> Optional kayaking on the Nam Song River (if selected in Deluxe Package or as add‑on).
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">03:30 PM – 05:30 PM:</span> Drive back to Vientiane. Drop off at your hotel.
          </div>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-4 text-sm">
          <p className="font-semibold">Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The itinerary can be adjusted based on your preferences and weather conditions.</li>
            <li>Comfortable walking shoes, swimsuit, towel, sunscreen, and insect repellent are recommended.</li>
          </ul>
        </div>
      </section>

      {/* Detailed Pricing Table (uncommented) */}
      {/* <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Price (USD per person)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Group Size (Pax)</th>
                <th className="border p-2 text-left">Standard Package</th>
                <th className="border p-2 text-left">Deluxe Package</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">1</td><td className="border p-2">$140</td><td className="border p-2">$170</td></tr>
              <tr className="bg-gray-50"><td className="border p-2">2</td><td className="border p-2">$95</td><td className="border p-2">$125</td></tr>
              <tr><td className="border p-2">3–4</td><td className="border p-2">$80</td><td className="border p-2">$110</td></tr>
              <tr className="bg-gray-50"><td className="border p-2">5+</td><td className="border p-2">$70</td><td className="border p-2">$100</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          * Rate per person, based on group size. Lunch is included only in Deluxe Package.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm mt-4">
          <p className="font-semibold">Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>A surcharge of USD 10 per person applies for hotel pick‑ups outside Vientiane city center.</li>
            <li>Lunar New Year surcharge: USD 15 per person (28 Jan – 3 Feb 2027).</li>
          </ul>
        </div>
      </section> */}

      {/* Inclusions & Exclusions (detailed) */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">Inclusions (both packages)</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Round‑trip private air‑conditioned vehicle from Vientiane</li>
            <li>English‑speaking guide</li>
            <li>Entrance fees for Blue Lagoon and Angel Cave</li>
            <li>Complimentary mineral water (2 bottles per person)</li>
            <li>All taxes and service charges</li>
          </ul>
          <p className="mt-2 font-semibold text-green-800">Deluxe Package adds:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Local lunch (Lao set menu)</li>
            <li>1‑hour kayaking on the Nam Song River (tandem kayak, life jacket included)</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Exclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Meals (unless specified in Deluxe Package)</li>
            <li>Optional activities (zipline, ATV, hot air balloon, etc.)</li>
            <li>Tipping for guide and driver</li>
            <li>Personal expenses (drinks, souvenirs, etc.)</li>
            <li>Travel insurance</li>
          </ul>
        </div>
      </div>

      {/* Optional Add-ons (with estimated prices) */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Optional Add-ons (pre‑booking recommended)</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Kayaking (1 hour) – USD 20/person (already included in Deluxe Package)</li>
          <li>Zipline over the Nam Song River – USD 35/person</li>
          <li>ATV ride (30 minutes) – USD 25/person</li>
          <li>Hot air balloon (sunrise or sunset) – USD 85/person</li>
          <li>Lunch upgrade to authentic Lao BBQ – add USD 12/person</li>
        </ul>
      </section>

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}