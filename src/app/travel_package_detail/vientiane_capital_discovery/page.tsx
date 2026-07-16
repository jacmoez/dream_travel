"use client";

import { useState, useEffect } from "react";

export default function VientianeCapitalDiscovery() {
  // Slideshow images – real Vientiane landmarks
  const images = [
    "https://i.imgur.com/TX7Xt7r.jpeg",
    "https://i.imgur.com/RzxbuvD.jpeg",
    "https://i.imgur.com/MExGgeh.jpeg",
    "https://i.imgur.com/x5qaByk.jpeg",
    "https://i.imgur.com/Yf9qVtG.jpeg"


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

  // ----- Package Selection Component -----
  const PackageSelection = () => {
    // Prices from the detailed table (2-person rate)
    const standardPrice2Pax = 65;   // for 2 persons
    const deluxePrice2Pax = 85;     // includes lunch + sunset stop

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
                <td className="border p-2">Private transport, English guide, entrance fees, mineral water</td>
                <td className="border p-2 font-semibold">USD {standardPrice2Pax}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">Deluxe Package</td>
                <td className="border p-2">Standard inclusions + local lunch + Mekong sunset stop + cold towel</td>
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
      <h1 className="text-3xl font-bold text-center mb-2">Vientiane Capital Discovery</h1>
      <h2 className="text-xl text-center text-gray-600 mb-2">Full Day</h2>
      <Slideshow />
          <div className="ackage-mini-duration-text text-red-700 text-center my-3">minium : 2 person</div>

      {/* Short Description */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center italic">
        Discover the peaceful charm of Vientiane with its golden temples, colonial monuments, and the quirky Buddha Park – a journey through Lao culture and history.
      </div>

      {/* Duration & Destinations */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> Full Day (approx. 8 hours)
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Destinations Covered:</span> Vientiane City – Buddha Park (Xieng Khuan)
        </div>
      </div>

      {/* Highlights */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3">Highlights</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Visit the iconic Pha That Luang – the national symbol of Laos</li>
          <li>Climb Patuxai Victory Monument for panoramic city views</li>
          <li>Explore ancient temples: Wat Sisaket, Wat Phra Keo, Wat Mixay</li>
          <li>Discover the surreal Buddha Park (Xieng Khuan) with over 200 Buddhist and Hindu statues</li>
          <li>Enjoy a sunset stroll along the Mekong Riverside</li>
        </ul>
      </section>

      {/* Package Selection Table */}
      {/* <PackageSelection /> */}

      {/* Detailed Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">08:30 AM:</span> Pick up from your hotel in Vientiane.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">09:00 AM – 10:30 AM:</span> Visit Pha That Luang – the great golden stupa, and the nearby That Luang Temple.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">10:30 AM – 11:30 AM:</span> Explore Patuxai Victory Monument – climb to the top for views.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">11:30 AM – 12:30 PM:</span> Temple tour: Wat Sisaket (oldest temple with thousands of Buddha images), Wat Phra Keo (former royal temple), and Wat Mixay.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">12:30 PM – 01:30 PM:</span> Lunch at a local restaurant (included only in Deluxe Package).
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">02:00 PM – 03:30 PM:</span> Drive to Buddha Park (Xieng Khuan) – 25 km southeast of the city. Explore hundreds of concrete statues depicting Buddhist and Hindu deities.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">03:30 PM – 04:30 PM:</span> Return to Vientiane. Stop at a local weaving village or COPE Visitor Centre (optional – time permitting).
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">04:30 PM – 05:30 PM:</span> Mekong Riverside sunset walk (included in Deluxe Package). Enjoy the view of the river and the Thai border.
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <span className="font-semibold text-lg">05:30 PM:</span> Drop off at your hotel.
          </div>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-4 text-sm">
          <p className="font-semibold">Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Dress code for temples: shoulders and knees must be covered. Remove shoes before entering temple buildings.</li>
            <li>The itinerary can be adjusted based on your preferences and weather conditions.</li>
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
              <tr><td className="border p-2">1</td><td className="border p-2">$90</td><td className="border p-2">$110</td></tr>
              <tr className="bg-gray-50"><td className="border p-2">2</td><td className="border p-2">$65</td><td className="border p-2">$85</td></tr>
              <tr><td className="border p-2">3–4</td><td className="border p-2">$55</td><td className="border p-2">$75</td></tr>
              <tr className="bg-gray-50"><td className="border p-2">5+</td><td className="border p-2">$50</td><td className="border p-2">$70</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          * Lunch and sunset stop are included only in Deluxe Package. Standard Package includes all entrance fees but no meals.
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
            <li>Private air‑conditioned vehicle for the whole day</li>
            <li>English‑speaking licensed guide</li>
            <li>All entrance fees: Pha That Luang, Patuxai, Wat Sisaket, Wat Phra Keo, Buddha Park</li>
            <li>Complimentary mineral water (2 bottles per person)</li>
            <li>All taxes and service charges</li>
          </ul>
          <p className="mt-2 font-semibold text-green-800">Deluxe Package adds:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Local Lao lunch (set menu with non‑alcoholic drink)</li>
            <li>Mekong Riverside sunset stop (30 minutes)</li>
            <li>Cold towel after Buddha Park visit</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Exclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Meals and drinks (unless specified in Deluxe Package)</li>
            <li>Optional activities (COPE Visitor Centre entrance – $3)</li>
            <li>Tipping for guide and driver</li>
            <li>Personal expenses (souvenirs, extra drinks, etc.)</li>
            <li>Travel insurance</li>
          </ul>
        </div>
      </div>

      {/* Optional Add-ons */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Optional Add-ons (pre‑booking recommended)</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>COPE Visitor Centre (UXO museum) – USD 3 entrance fee, free time (30 minutes)</li>
          <li>Sunset dinner cruise on the Mekong – USD 25/person (includes BBQ dinner, 2 hours)</li>
          <li>Traditional Lao massage (1 hour) – USD 15/person (at reputable spa near city centre)</li>
        </ul>
      </section>

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}