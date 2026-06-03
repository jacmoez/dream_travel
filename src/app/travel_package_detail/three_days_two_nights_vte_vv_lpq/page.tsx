"use client";

import { useState, useEffect } from "react";

// Pricing data structure
interface PricingData {
  threeStars: Record<number | "SS", number>;
  fourStars: Record<number | "SS", number>;
}

interface PricingTableProps {
  data: PricingData;
}

export default function VteVvLpqTour() {
  // First validity period (1 Jan 2026 – 30 Sep 2027, except CNY)
  const pricingPeriod1: PricingData & { title: string } = {
    title: "Validity from 1 Jan 2026 – 30 Sep 2027 (except Chinese New Year from 28 Jan to 03 Feb 2027)",
    threeStars: { 1: 586, 2: 336, 3: 279, 4: 251, 5: 234, 6: 223, SS: 80 },
    fourStars: { 1: 686, 2: 386, 3: 329, 4: 301, 5: 284, 6: 273, SS: 130 },
  };

  // Second validity period (1 May 2027 – 30 Sep 2027)
  const pricingPeriod2: PricingData & { title: string } = {
    title: "Validity from 1 May 2027 – 30 Sep 2027",
    threeStars: { 1: 566, 2: 326, 3: 269, 4: 241, 5: 224, 6: 213, SS: 70 },
    fourStars: { 1: 626, 2: 356, 3: 299, 4: 271, 5: 254, 6: 243, SS: 100 },
  };

  const PricingTable = ({ data }: PricingTableProps) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">1</th>
            <th className="border p-2 text-left">2</th>
            <th className="border p-2 text-left">3</th>
            <th className="border p-2 text-left">4</th>
            <th className="border p-2 text-left">5</th>
            <th className="border p-2 text-left">6</th>
            <th className="border p-2 text-left">SS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 font-semibold">Three Stars</td>
            <td className="border p-2">{data.threeStars[1]}</td>
            <td className="border p-2">{data.threeStars[2]}</td>
            <td className="border p-2">{data.threeStars[3]}</td>
            <td className="border p-2">{data.threeStars[4]}</td>
            <td className="border p-2">{data.threeStars[5]}</td>
            <td className="border p-2">{data.threeStars[6]}</td>
            <td className="border p-2">{data.threeStars.SS}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2 font-semibold">Four Stars</td>
            <td className="border p-2">{data.fourStars[1]}</td>
            <td className="border p-2">{data.fourStars[2]}</td>
            <td className="border p-2">{data.fourStars[3]}</td>
            <td className="border p-2">{data.fourStars[4]}</td>
            <td className="border p-2">{data.fourStars[5]}</td>
            <td className="border p-2">{data.fourStars[6]}</td>
            <td className="border p-2">{data.fourStars.SS}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-1">
        Rate Is Per Person Based on Twin or Double Sharing
      </p>
    </div>
  );

  // ----- Package Selection Component -----
  const PackageSelection = () => {
    // Use first validity period rates for 2 persons (twin sharing) and single supplement
    const threeStarsTwin = pricingPeriod1.threeStars[2];
    const threeStarsSingleSupplement = pricingPeriod1.threeStars.SS;
    const threeStarsSingleRoom = threeStarsTwin + threeStarsSingleSupplement;

    const fourStarsTwin = pricingPeriod1.fourStars[2];
    const fourStarsSingleSupplement = pricingPeriod1.fourStars.SS;
    const fourStarsSingleRoom = fourStarsTwin + fourStarsSingleSupplement;

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
                <td className="border p-2 font-semibold">3-Star Package</td>
                <td className="border p-2">First Class (3*) hotels – e.g., Riverside Hotel, Khamair Hotel</td>
                <td className="border p-2 font-semibold">USD {threeStarsTwin}</td>
                <td className="border p-2 font-semibold">USD {threeStarsSingleRoom}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">4-Star Package</td>
                <td className="border p-2">Superior (4*) hotels – e.g., Crowne Plaza, Amari Vang Vieng</td>
                <td className="border p-2 font-semibold">USD {fourStarsTwin}</td>
                <td className="border p-2 font-semibold">USD {fourStarsSingleRoom}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Pricing based on the validity period <strong>{pricingPeriod1.title}</strong>. For other travel dates, please refer to the detailed pricing tables below.
        </p>
      </section>
    );
  };

  // Slideshow images – improved for Vientiane, Vang Vieng, Luang Prabang
  const images = [
    "https://cdn.pixabay.com/photo/2018/07/31/22/43/vang-vieng-3577176_1280.jpg?w=800&h=500&fit=crop", // Vang Vieng karsts
    "https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Nam-Song-River-in-Vang-Vieng-Laos.jpg?w=800&h=500&fit=crop", // Nam Song River
    "https://images.travelandleisureasia.com/wp-content/uploads/sites/6/2025/04/14173201/Vang-Vieng-1.jpg?w=800&h=500&fit=crop", // Hot air balloon
    "https://cdn.getyourguide.com/img/location/5a086527d1738.jpeg/88.jpg?w=800&h=500&fit=crop", // Blue Lagoon
    "https://a.cdn-hotels.com/gdcs/production65/d368/02537589-5c16-4e2c-ada7-9a6a53286b57.jpg?w=800&h=500&fit=crop", // Luang Prabang temples
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition text-xl"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition text-xl"
        >
          ❯
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-center mb-5 mt-5">VTE-VV-LPQ (3D2N)</h1>
      {/* Full‑width hero slider */}
      <Slideshow />

      {/* Content wrapper */}
      <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
        <p className="text-center text-gray-600 text-lg mb-8">Private Van: (1hr 30 minutes drive)</p>

        {/* Package Selection Table */}
        <PackageSelection />

        {/* Itinerary */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold border-l-4 border-blue-600 pl-4 mb-6">Itinerary</h3>
          <div className="space-y-8">
            {/* Day 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3 text-blue-800">Day. 1 Vientiane to Vang Vieng</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Pickup from Wattay airport.</li>
                <li>Meet and greet by Myanmarguide.</li>
                <li>Driving by VVIP van to Vang Vieng and city tour.</li>
                <li>Lunch at Nam Song river side.</li>
                <li>Check in Hotel</li>
                <li>Visit to blue lagoon and angel cave.</li>
                <li>Activities are (Optional) (Kayaking, Zipline and others)</li>
                <li>Back to hotel and night life at VV night market.</li>
              </ul>
            </div>

            {/* Day 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3 text-blue-800">Day. 2 VV to LPQ ancient city protected by UNESCO (By Train)</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Breakfast at hotel</li>
                <li>Send to VV train station at 07:30am.</li>
                <li>Train departure (08:55-09:46) arrive to LPQ</li>
                <li>Pickup from LPQ train station and visit to Kuang Si waterfall (Outskirt)</li>
                <li>Lunch at Bamboo house near by waterfall</li>
                <li>Back to town for visiting Wat Visoun, Wat Xieng Thong, Wat Sens…</li>
                <li>Mekong cruise and sunset. (Optional)</li>
                <li>Dinner and night market</li>
                <li>Transfer to hotel</li>
              </ul>
            </div>

            {/* Day 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3 text-blue-800">Day. 3 Luang Prabang half day tour and send to airport.</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Giving alms to the monks at 5:30 am, visit to morning colorful market.</li>
                <li>Transfer to hotel for breakfast at 08:30am</li>
                <li>Check out hotel and transfer to airport</li>
                <li>Advise flight departure time (10:30-12:00) LPQ-Chiang Mai</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Pricing Tables */}
        {/* <section className="mb-8">
          <h3 className="text-2xl font-bold border-l-4 border-blue-600 pl-4 mb-6">Rates (USD per person)</h3>
          <div className="mb-6">
            <h4 className="font-semibold text-md mb-2">{pricingPeriod1.title}</h4>
            <PricingTable data={pricingPeriod1} />
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-md mb-2">{pricingPeriod2.title}</h4>
            <PricingTable data={pricingPeriod2} />
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm mt-4">
            <p className="font-semibold">Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>The itinerary may be changed due to weather conditions, tide levels, or operating conditions.</li>
              <li>Special requests (dietary or vegetarian requirements, etc.) should be informed in advance before your departure date.</li>
              <li>A surcharge of USD 30 per person applies if the travel date falls on Lunar New Year.</li>
              <li>Optional activities (kayaking, zipline, Mekong cruise) are available at extra cost – please enquire.</li>
            </ul>
          </div>
        </section> */}

        {/* Inclusions & Exclusions (optional but good to have) */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-green-800 mb-2">Inclusions</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Accommodation based on double/twin sharing (2 nights)</li>
              <li>Private VVIP van transfers as per itinerary</li>
              <li>Train tickets: Vang Vieng → Luang Prabang</li>
              <li>English‑speaking guide</li>
              <li>Entrance fees for all sightseeing (Blue Lagoon, Kuang Si, temples)</li>
              <li>Complimentary mineral water</li>
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-red-800 mb-2">Exclusions</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>International & domestic flights</li>
              <li>Visa fees</li>
              <li>Meals not specified (only breakfasts mentioned)</li>
              <li>Optional activities (kayaking, zipline, Mekong cruise)</li>
              <li>Tipping for guide and driver</li>
              <li>Travel insurance</li>
              <li>Personal expenses</li>
            </ul>
          </div>
        </div>

        <div className="text-xs text-gray-500 border-t pt-6 mt-6 text-center">
          * All information is subject to change without prior notice. Please confirm details at time of booking.
        </div>
      </div>
    </div>
  );
}