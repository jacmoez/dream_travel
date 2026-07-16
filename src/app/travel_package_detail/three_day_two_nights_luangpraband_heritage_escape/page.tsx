"use client";

import { useState, useEffect } from "react";

export default function LuangPrabangHeritageEscape() {
  // Slideshow images – real Luang Prabang (temples, Kuang Si, Mekong)
  const images = [
  "https://i.imgur.com/J4OGK1a.jpeg",
  "https://i.imgur.com/WMgocZ8.jpeg",
  "https://i.imgur.com/4HTtNcg.jpeg",
  "https://i.imgur.com/ZQdmvVd.jpeg",
  "https://i.imgur.com/CqBAdf4.jpeg"


  ];

  // ----- Package Selection Component -----
  const PackageSelection = () => {
    // Prices based on 2-person rate from the detailed table
    const standardTwin = 220;      // 2 pax price (3★)
    const standardSingleSupplement = 80;
    const standardSingle = standardTwin + standardSingleSupplement;

    const deluxeTwin = 290;        // estimated 4★
    const deluxeSingleSupplement = 130;
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
                <td className="border p-2">3★ hotels (standard room) – e.g., Sankeo Boutique, Senglao</td>
                <td className="border p-2 font-semibold">USD {standardTwin}</td>
                <td className="border p-2 font-semibold">USD {standardSingle}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">Deluxe Package</td>
                <td className="border p-2">4★ hotels (deluxe room) – e.g., Souphattra, Kiridara, Amari</td>
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
          <img src={images[currentIndex]} alt={`Luang Prabang slide ${currentIndex + 1}`} className="w-full h-full object-cover" />
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
      <h1 className="text-3xl font-bold text-center mb-2">Luang Prabang Heritage Escape</h1>
      <h2 className="text-xl text-center text-gray-600 mb-2">3 Days / 2 Nights</h2>
      <Slideshow />
      <div className="ackage-mini-duration-text text-red-700 text-center my-3">minium : 2 person</div>

      {/* Short Description */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center italic">
        Experience the timeless charm of Luang Prabang, where ancient temples, French colonial streets, and natural wonders create the perfect cultural escape – a UNESCO World Heritage journey.
      </div>

      {/* Duration & Destinations */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Duration:</span> 3 Days / 2 Nights
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <span className="font-bold">Destinations Covered:</span> Luang Prabang – Kuang Si Waterfall – Pak Ou Caves – Mekong River
        </div>
      </div>

      {/* Highlights */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3">Highlights</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Explore the UNESCO-listed Old Town with its 33 temples and French colonial architecture</li>
          <li>Swim in the turquoise pools of Kuang Si Waterfall and visit the Bear Rescue Centre</li>
          <li>Take a scenic Mekong River cruise to the sacred Pak Ou Caves, filled with thousands of Buddha images</li>
          <li>Participate in the daily alms-giving ceremony (Tak Bat) – a unique spiritual tradition</li>
          <li>Climb Mount Phousi for panoramic sunset views over the Mekong and Nam Khan rivers</li>
          <li>Wander through the vibrant night market for local handicrafts and street food</li>
        </ul>
      </section>

      {/* New Package Selection Table */}
      {/* <PackageSelection /> */}

      {/* Detailed Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold">Day 1: Arrival in Luang Prabang – City Tour (Lunch)</h4>
            <p className="mt-1">
              Arrive at Luang Prabang International Airport. Meet your guide and transfer to your hotel. After check-in, begin a half-day city tour of this UNESCO World Heritage town. Visit the magnificent Wat Xieng Thong – the most revered temple, then explore the former Royal Palace (now the National Museum). Continue to Wat Mai and Wat Visoun. In the late afternoon, climb the 328 steps of Mount Phousi for a stunning sunset view over the Mekong River. After sunset, explore the famous Night Market (Phousi Market).
            </p>
            <p className="text-sm text-gray-600"><strong>Meal:</strong> Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 2: Kuang Si Waterfall & Local Villages (Breakfast, Lunch)</h4>
            <p className="mt-1">
              After breakfast, drive to the stunning Kuang Si Waterfall (approx. 1 hour). En route, visit a local Hmong village and the Buffalo Dairy Farm. At Kuang Si, you can swim in the turquoise pools, hike to the top of the falls, and visit the Free the Bears rescue centre. Enjoy a picnic lunch near the waterfall. In the afternoon, return to Luang Prabang with a stop at the Ock Pop Tok Living Crafts Centre to see traditional weaving. Evening free at leisure.
            </p>
            <p className="text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Day 3: Pak Ou Caves – Departure (Breakfast, Lunch)</h4>
            <p className="mt-1">
              Early risers can optionally join the alms-giving ceremony (Tak Bat) before breakfast. After breakfast, take a private boat on the Mekong River upstream to the sacred Pak Ou Caves, located in a limestone cliff. The caves contain thousands of small Buddha images left by pilgrims over centuries. On the way back, stop at Ban Xang Hai village, known as the “Whisky Village,” where you can sample local Lao Lao rice wine. Return to Luang Prabang for lunch. After lunch, transfer to the airport for your departure flight.
            </p>
            <p className="text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
          </div>
        </div>
      </section>

      {/* Detailed Pricing Table (uncommented) */}
      {/* <section className="mb-8">
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
              <tr><td className="border p-2">1</td><td className="border p-2">$320</td><td className="border p-2">$420</td></tr>
              <tr><td className="border p-2">2</td><td className="border p-2">$220</td><td className="border p-2">$290</td></tr>
              <tr><td className="border p-2">3–4</td><td className="border p-2">$190</td><td className="border p-2">$260</td></tr>
              <tr><td className="border p-2">5+</td><td className="border p-2">$170</td><td className="border p-2">$230</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          * Rate is per person based on twin/double sharing. Single supplement: add $80 (3★) or $130 (4★).
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm mt-3">
          <p className="font-semibold">Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The itinerary may be adjusted due to weather, water levels, or local conditions.</li>
            <li>Special dietary requests should be informed in advance.</li>
            <li>A surcharge of USD 30 per person applies for travel during Lao New Year (April) or Chinese New Year.</li>
            <li>Alms-giving ceremony is optional and requires waking up at 5:00–5:30 AM.</li>
          </ul>
        </div>
      </section> */}

      {/* Inclusions & Exclusions (detailed) */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">Inclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Accommodation based on twin/double sharing (2 nights)</li>
            <li>Private air‑conditioned transport for all tours and transfers</li>
            <li>English‑speaking licensed guide</li>
            <li>Boat trip on the Mekong River (private long-tail boat)</li>
            <li>Meals: 2 breakfasts, 2 lunches (days 1,2,3)</li>
            <li>All entrance fees and sightseeing tickets</li>
            <li>Complimentary mineral water during tours (1 bottle per person/day)</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Exclusions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>International & domestic flights</li>
            <li>Visa fees (on-arrival visa available for many nationalities)</li>
            <li>Dinners and meals not specified</li>
            <li>Alms-giving offering (sticky rice can be bought locally for ~$2)</li>
            <li>Tipping for guide and driver (suggested $5–8/day per person)</li>
            <li>Travel insurance (highly recommended)</li>
            <li>Personal expenses (souvenirs, drinks, extra snacks)</li>
          </ul>
        </div>
      </div>

      {/* Optional Add-ons */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Optional Add-ons (with surcharge)</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Sunset cruise on the Mekong (private boat) – $35/person (2 hours, includes snacks)</li>
          <li>Traditional Baci ceremony (Lao blessing ceremony) – $25/person (min 2)</li>
          <li>Luxury hotel upgrade – prices vary (please enquire)</li>
          <li>Private cooking class – $45/person (half day, market visit included)</li>
          <li>Zip-lining & kayaking combination at Kuang Si – $55/person</li>
        </ul>
      </section>

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}