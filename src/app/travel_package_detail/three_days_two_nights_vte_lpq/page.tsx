"use client";

import { useState, useEffect } from "react";

interface PricingData {
  threeStars: Record<number | "SS", number>;
  fourStars: Record<number | "SS", number>;
}

interface PricingTableProps {
  data: PricingData;
}

export default function VientianeLuangPrabang3DaysTour() {
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

  // Slideshow images – replace with actual images for Luang Prabang
  const images = [
    "https://faszination-suedostasien.de/wp-content/uploads/2019/09/vientiane-goldener-buddha-413489188.jpg?w=800&h=500&fit=crop", // Kuang Si
    "https://topmekongcruises.com/uploads/vientiane_4.jpg?w=800&h=500&fit=crop", // Pak Ou
    "https://cdn.pixabay.com/photo/2016/07/21/12/01/laos-1532354_1280.jpg?w=800&h=500&fit=crop", // Mount Phousi
    "https://cdn.audleytravel.com/1050/750/79/502464-wat-that-luang-vientiane-laos.jpg?w=800&h=500&fit=crop", // Alms giving
    "https://a.cdn-hotels.com/gdcs/production65/d368/02537589-5c16-4e2c-ada7-9a6a53286b57.jpg?w=800&h=500&fit=crop", // Wat Xieng Thong
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
      <h1 className="text-3xl font-bold text-center mb-2">3 DAYS 2 NIGHTS</h1>
      <Slideshow />
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">VIENTIANE – LUANG PRABANG</h2>

      {/* Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">DAY 1: Vientiane – Luang Prabang. Pick up with Guide (Lunch)</h4>
            <p className="mt-1">
              Begin your journey with a transfer from your hotel or airport in Vientiane to the high-speed train station.
              Enjoy a comfortable train ride to Luang Prabang (approximately 2 hours).
              Upon arrival, meet your local guide and proceed to the beautiful Kuang Si Waterfall, one of Laos’ most iconic natural attractions.
              Enjoy lunch at a local restaurant near the waterfall or along the Mekong River.
              In the afternoon, return to the city and explore Luang Prabang’s cultural highlights, including the National Museum (Royal Palace),
              Wat Xieng Thong, Wat Visoun, Wat Mai, and Haw Phra Bang.
              In the evening, enjoy dinner and explore the lively night market.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 2: Full Day City Tour in LPQ</h4>
            <p className="mt-1">
              Start early with the traditional Alms Giving Ceremony, followed by a visit to the morning market.
              After breakfast, take a scenic Mekong River cruise to the famous Pak Ou Caves, home to thousands of Buddha statues.
              Enjoy lunch on board with traditional Lao cuisine.
              In the afternoon, return to town and climb Mount Phousi for panoramic sunset views.
              Explore the night market before returning to your hotel.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
            <p className="mt-1 text-xs italic text-gray-500">
              Notes: Optional: Cruise boat by return trip from Pak Ou cave can be arranged. (Extra charge: USD 30 per person)
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 3: HALF Day Tour in LPQ (B/L)</h4>
            <p className="mt-1">
              After breakfast, explore the UNESCO-listed old town and revisit the National Museum if desired.
              Check out and transfer to the train station for your return journey to Vientiane.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Vientiane</p>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Rate Is Per Person Based on Twin or Double Sharing</h3>
        <div className="mb-6">
          <h4 className="font-semibold text-md mb-2">{pricingPeriod1.title}</h4>
          <PricingTable data={pricingPeriod1} />
        </div>
        <div className="mb-6">
          <h4 className="font-semibold text-md mb-2">{pricingPeriod2.title}</h4>
          <PricingTable data={pricingPeriod2} />
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm mt-4">
          <p className="font-semibold">Some notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The itinerary may be changed due to weather conditions, tide levels, or operating conditions.</li>
            <li>Special request (dietary or vegetarian requirements, etc.) should be informed in advance before your departure date.</li>
            <li>A surcharge of USD 30 per person applies if the travel date falls on Lunar New Year.</li>
          </ul>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">Tour inclusive of:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Accommodation based on double/twin sharing (01 pax based on single room)</li>
            <li>Private pick-up without guide on the first and last day</li>
            <li>Full-day tour in LPQ city with lunch</li>
            <li>Entrance fee for all sightseeing activities as mentioned in the itinerary</li>
            <li>Complimentary mineral water</li>
            <li>High-speed train tickets</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Tour exclusive of:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>International & domestic flight tickets</li>
            <li>Visa stamping fee at the airport (USD 40 single entry to Vietnam, payable in cash at the airport)</li>
            <li>Meals not specified in the itinerary</li>
            <li>Tipping for guides and drivers</li>
            <li>Travel insurance (we highly recommend purchase adequate insurance)</li>
            <li>All other services not specified in the itinerary</li>
          </ul>
        </div>
      </div>

      {/* Hotel List */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">HOTEL LIST OR SIMILARS</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Area</th>
                <th className="border p-2 text-left">First Class (3*)</th>
                <th className="border p-2 text-left">Area</th>
                <th className="border p-2 text-left">Superior (4*)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">LPQ</td>
                <td className="border p-2">
                  Sankeo Boutique & Spa hotel – Classic<br />
                  <a href="http://www.sanakeoboutiquelpb.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.sanakeoboutiquelpb.com</a><br />
                  OR<br />
                  Senglao Boutique hotel – Classic
                </td>
                <td className="border p-2 font-semibold">LPQ</td>
                <td className="border p-2">
                  Souphattra Hotel – Deluxe<br />
                  <a href="http://www.souphattra.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.souphattra.com</a><br />
                  OR<br />
                  Kiridara Hotel – Classic room<br />
                  <a href="http://www.souphattra.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.souphattra.com</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}