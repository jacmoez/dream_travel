"use client";

import { useState, useEffect } from "react";

export default function SouthernLaos4000IslandsEscape() {
  // Slideshow images – real Southern Laos (4,000 Islands, waterfalls, Mekong)
  const images = [
    "https://www.visithalongbay.com/wp-content/uploads/2020/08/khone-phapheng-falls-laos-4.jpg?w=800&h=500&fit=crop", // Khone Phapheng Falls
    "https://www.roughguides.com/wp-content/uploads/2019/11/AdobeStock_237613184-1024x683.jpeg?w=800&h=500&fit=crop", // 4,000 Islands
    "https://www.responsibletravel.com/imagesClient/laos-4000-islands-2.jpg?w=800&h=500&fit=crop", // Don Khone
    "https://www.thepoortraveller.com/wp-content/uploads/2019/01/Irrawaddy-Dolphins-Laos-1.jpg?w=800&h=500&fit=crop", // Mekong dolphins
    "https://www.laos-travel-guide.com/images/tad-lo-waterfall-laos-2.jpg?w=800&h=500&fit=crop", // Tad Lo Waterfall
  ];

  // ----- Package Selection Component -----
  const PackageSelection = () => {
    // Prices based on 2-person rate from the detailed table
    const standardTwin = 350;      // 2 pax price (3★)
    const standardSingleSupplement = 100;
    const standardSingle = standardTwin + standardSingleSupplement;

    const deluxeTwin = 420;        // estimated 4★
    const deluxeSingleSupplement = 160;
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
                <td className="border p-2">4★ hotels / riverside bungalow</td>
                <td className="border p-2 font-semibold">USD {deluxeTwin}</td>
                <td className="border p-2 font-semibold">USD {deluxeSingle}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Pricing based on the standard validity period (1 Jan 2026 – 30 Sep 2027). For exact hotel names and seasonal surcharges, please refer to the detailed pricing table below.
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
          <img src={images[currentIndex]} alt={`Southern Laos slide ${currentIndex + 1}`} className="w-full h-full object-cover" />
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
      <h1 className="text-3xl font-bold text-center mb-2">Southern Laos & 4,000 Islands Escape</h1>
      <h2 className="text-xl text-center text-gray-600 mb-2">4 Days / 3 Nights</h2>
      <Slideshow />

      {/* Short Description */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center italic">
        Explore the untouched beauty of southern Laos, from the Bolaven Plateau’s waterfalls to the serene islands of Si Phan Don (4,000 Islands) in the Mekong River.
      </div>

      {/* Duration & Destinations */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> 4 Days / 3 Nights
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Destinations Covered:</span> Pakse – Bolaven Plateau – 4,000 Islands (Don Khone, Don Det) – Champasak
        </div>
      </div>

      {/* Highlights */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3">Highlights</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Visit the mighty Khone Phapheng Falls – the largest waterfall in Southeast Asia</li>
          <li>Relax on Don Khone and Don Det islands, connected by the old French bridge</li>
          <li>Cycle through local fishing villages and see the rare Irrawaddy dolphins</li>
          <li>Explore the Bolaven Plateau’s coffee plantations and Tad Lo waterfall</li>
          <li>Discover the pre‑Angkorian temple of Wat Phou (optional)</li>
        </ul>
      </section>

      {/* New Package Selection Table */}
      <PackageSelection />

      {/* Detailed Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold">Day 1: Arrival Pakse – Bolaven Plateau (Lunch)</h4>
            <p className="mt-1">
              Meet your guide at Pakse International Airport. Drive to the Bolaven Plateau, known for its cool climate, coffee plantations, and waterfalls. Visit Tad Lo Waterfall and a local coffee farm. After lunch, transfer to Champasak and check into your hotel.
            </p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Champasak or Pakse</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 2: Champasak – 4,000 Islands (Breakfast, Lunch)</h4>
            <p className="mt-1">
              Morning visit to Wat Phou (UNESCO World Heritage site). Then drive to Nakasang village and take a long‑tail boat to Don Khone Island. In the afternoon, cycle or take a tuk‑tuk to see the old French railway, Liphi Waterfall, and look for the rare Irrawaddy dolphins.
            </p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Don Khone (basic bungalow with fan – upgrade available)</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 3: 4,000 Islands – Khone Phapheng Falls (Breakfast, Lunch)</h4>
            <p className="mt-1">
              Morning boat trip to Don Det island, then visit the largest waterfall in Southeast Asia – Khone Phapheng Falls. Enjoy a picnic lunch near the falls. Afternoon free to relax or explore more of the islands. Return to Don Khone.
            </p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Don Khone</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 4: Return to Pakse – Departure (Breakfast)</h4>
            <p className="mt-1">
              Morning boat back to Nakasang village. Drive to Pakse with a stop at a local market. Transfer to Pakse Airport for your departure flight.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Pricing Table (uncommented) */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Price (USD per person)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Pax</th>
                <th className="border p-2 text-left">Price (3★)</th>
                <th className="border p-2 text-left">Price (4★)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">1</td><td className="border p-2">$480</td><td className="border p-2">$580</td></tr>
              <tr><td className="border p-2">2</td><td className="border p-2">$350</td><td className="border p-2">$420</td></tr>
              <tr><td className="border p-2">3–4</td><td className="border p-2">$310</td><td className="border p-2">$380</td></tr>
              <tr><td className="border p-2">5+</td><td className="border p-2">$280</td><td className="border p-2">$340</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          * Rate is per person based on twin/double sharing. Single supplement: add $100 (3★) or $160 (4★).
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm mt-3">
          <p className="font-semibold">Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Accommodation on Don Khone is basic (fan bungalow) – upgrade to air‑conditioned bungalow available (+$20/night).</li>
            <li>The itinerary may be adjusted due to weather, water levels, or local conditions.</li>
            <li>A surcharge of USD 30 per person applies for travel during Lao New Year (April) or Chinese New Year.</li>
          </ul>
        </div>
      </section>

      {/* Inclusions & Exclusions (detailed) */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">Inclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Accommodation as per itinerary (twin/double sharing)</li>
            <li>Private air‑conditioned transport</li>
            <li>English‑speaking guide</li>
            <li>Boat trips as mentioned (4,000 Islands, Khone Phapheng)</li>
            <li>Meals: 3 breakfasts, 3 lunches (day 1,2,3)</li>
            <li>All entrance fees and sightseeing tickets</li>
            <li>Complimentary mineral water</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Exclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>International & domestic flights</li>
            <li>Visa fees</li>
            <li>Dinners and meals not specified</li>
            <li>Tipping for guide and driver (suggested $5–8/day per person)</li>
            <li>Travel insurance (highly recommended)</li>
            <li>Personal expenses (souvenirs, drinks, etc.)</li>
            <li>Optional activities (coffee plantation tour, kayaking)</li>
          </ul>
        </div>
      </div>

      {/* Optional Add-ons */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Optional Add-ons (with surcharge)</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Full‑day Bolaven Plateau coffee tour (Tad Lo, Paksong, ethnic villages) – $45/person</li>
          <li>Kayaking around Don Khone & Don Det – $25/person (2 hours)</li>
          <li>Sunset cruise on the Mekong (Pakse) – $15/person</li>
          <li>Upgrade to air‑conditioned bungalow on Don Khone – $20/night</li>
        </ul>
      </section>

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}