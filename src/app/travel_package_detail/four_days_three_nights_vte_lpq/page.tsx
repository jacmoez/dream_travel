"use client";

import { useState, useEffect } from "react";

// Define the shape of pricing data for one period
interface PricingData {
  threeStars: Record<number | "SS", number>;
  fourStars: Record<number | "SS", number>;
}

interface PricingTableProps {
  data: PricingData;
}

export default function VientianeLuangPrabangTour() {
  // Pricing data for first validity period (1 Jan 2026 – 30 Sep 2027, except CNY)
  const pricingPeriod1: PricingData & { title: string } = {
    title: "Validity: 1 Jan 2026 – 30 Sep 2027 (except Chinese New Year 28 Jan – 3 Feb 2027)",
    threeStars: { 1: 871, 2: 486, 3: 398, 4: 354, 5: 327, 6: 309, SS: 120 },
    fourStars: { 1: 1021, 2: 561, 3: 473, 4: 429, 5: 402, 6: 384, SS: 195 },
  };

  // Pricing data for second validity period (1 May 2027 – 30 Sep 2027)
  const pricingPeriod2: PricingData & { title: string } = {
    title: "Validity: 1 May 2027 – 30 Sep 2027",
    threeStars: { 1: 566, 2: 326, 3: 269, 4: 241, 5: 224, 6: 213, SS: 105 },
    fourStars: { 1: 931, 2: 516, 3: 428, 4: 384, 5: 357, 6: 339, SS: 150 },
  };

  const PricingTable = ({ data }: PricingTableProps) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Category (pax)</th>
            <th className="border p-2 text-left">3 Stars (USD)</th>
            <th className="border p-2 text-left">4 Stars (USD)</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6].map((pax) => (
            <tr key={pax}>
              <td className="border p-2">{pax}</td>
              <td className="border p-2">{data.threeStars[pax]}</td>
              <td className="border p-2">{data.fourStars[pax]}</td>
            </tr>
          ))}
          <tr className="bg-gray-50">
            <td className="border p-2 font-semibold">Single Supplement (SS)</td>
            <td className="border p-2">{data.threeStars.SS}</td>
            <td className="border p-2">{data.fourStars.SS}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-1">
        * Rate is per person based on twin/double sharing. Single supplement applies for solo traveller.
      </p>
    </div>
  );

  // ----- New Package Selection Component -----
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
                <td className="border p-2">First Class (3*) hotels as listed below</td>
                <td className="border p-2 font-semibold">USD {threeStarsTwin}</td>
                <td className="border p-2 font-semibold">USD {threeStarsSingleRoom}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">4-Star Package</td>
                <td className="border p-2">Superior (4*) hotels as listed below</td>
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

  // ----- Slideshow Component -----
  const images = [
    "https://i.imgur.com/WMgocZ8.jpeg", 
    "https://i.imgur.com/CqBAdf4.jpeg", 
    "https://i.imgur.com/4HTtNcg.jpeg", 
    "https://i.imgur.com/RzxbuvD.jpeg", 
    "https://i.imgur.com/MExGgeh.jpeg", 
    
  ];
  const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number) => {
      setCurrentIndex(index);
    };

    useEffect(() => {
      if (!autoPlay) return;
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }, [autoPlay, currentIndex]);

    return (
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg mt-5 mb-5">
        <div className="relative h-64 md:h-96">
          <img
            src={images[currentIndex]}
            alt={`Tour slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
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
              className={`w-2 h-2 rounded-full transition ${
                idx === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Main return
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-2">4 DAYS 3 NIGHTS</h1>
      <Slideshow />
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        VIENTIANE – LUANG PRABANG
      </h2>

      {/* New Package Selection Table */}
      {/* <PackageSelection /> */}
      <div className="ackage-mini-duration-text text-red-700 text-center">minium : 2 person</div>


      {/* Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">DAY 1: Vientiane City Tour (Lunch)</h4>
            <p className="mt-1">
              Upon arrival at Wattay International Airport, meet your guide and begin a city tour of Vientiane.
              Visit major landmarks including: That Luang Stupa (national symbol), Wat Sisaket, and Haw Phra Keo Museum.
              After lunch, continue to Patuxai Monument and enjoy views of the Mekong River. In the evening, visit the night market.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Vientiane</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">DAY 2: Vientiane → Luang Prabang – Half Day City Tour (Breakfast, Lunch)</h4>
            <p className="mt-1">
              After breakfast, transfer to the train station and travel to Luang Prabang.
              Upon arrival, visit key temples including Wat Visoun, Wat Xieng Thong, and Wat Sens. Enjoy lunch at a local restaurant.
              In the afternoon, visit the National Museum and enjoy a coffee break at a heritage house. Evening at leisure with night market visit.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">DAY 3: Luang Prabang Ancient City Tour (UNESCO) (Breakfast, Lunch, Dinner)</h4>
            <p className="mt-1">
              Begin with alms giving and morning market visit.
              Continue to Kuang Si Waterfall and Pak Ou Caves. Enjoy lunch during the excursion.
              In the evening, explore Mount Phousi and the night market.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">DAY 4: Departure to Vientiane – Drop at Airport (Breakfast, Lunch)</h4>
            <p className="mt-1">
              After breakfast, check out and transfer to the train station.
              Arrive in Vientiane, enjoy lunch, and transfer to the airport for departure.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
          </div>
        </div>
      </section>

      {/* Pricing Tables (now uncommented) */}
      {/* <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Rates (USD per person)</h3>
        <p className="mb-2 text-sm">Rate is per person based on twin or double sharing.</p>
        <div className="mb-6">
          <h4 className="font-semibold text-md mb-2">{pricingPeriod1.title}</h4>
          <PricingTable data={pricingPeriod1} />
        </div>
        <div className="mb-6">
          <h4 className="font-semibold text-md mb-2">{pricingPeriod2.title}</h4>
          <PricingTable data={pricingPeriod2} />
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm">
          <p className="font-semibold">Some Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The itinerary may be changed due to weather conditions, tide levels, or operating conditions.</li>
            <li>Special request (dietary or vegetarian requirements, etc.) should be informed in advance before your departure date.</li>
            <li>A surcharge of USD 30 per person applies if the travel date falls on Lunar New Year (28 Jan – 3 Feb 2027).</li>
          </ul>
        </div>
      </section> */}

      {/* Inclusions & Exclusions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">Tour Inclusive</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Accommodation based on double/twin sharing (01 pax based on single room)</li>
            <li>Private pick‑up without guide on the first and last day</li>
            <li>Full‑day tour in Luang Prabang city with lunch</li>
            <li>Entrance fee for all sightseeing activities as mentioned in the itinerary</li>
            <li>Complimentary mineral water</li>
            <li>High‑speed train tickets</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Tour Exclusive</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>International & domestic flight tickets</li>
            <li>Visa stamping fee at the airport (USD 40 single entry to Vietnam, payable in cash at the airport)</li>
            <li>Meals not specified in the itinerary</li>
            <li>Tipping for guides and drivers</li>
            <li>Travel insurance (we highly recommend purchasing adequate insurance)</li>
            <li>All other services not specified in the itinerary</li>
          </ul>
        </div>
      </div>

      {/* Hotel List */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Hotel List or Similar</h3>
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
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">Vientiane</td>
                <td className="border p-2">
                  Riverside Hotel – Superior<br />
                  Grand Hotel – Deluxe<br />
                  <a href="http://www.granhotelvientiane.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.granhotelvientiane.com</a>
                </td>
                <td className="border p-2 font-semibold">Vientiane</td>
                <td className="border p-2">
                  Crowne Plaza Hotel – Standard<br />
                  <a href="http://www.vientiane.crowneplaza.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.vientiane.crowneplaza.com</a><br />
                  OR<br />
                  Amari Hotel – Classic room<br />
                  <a href="https://www.amari.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://www.amari.com</a>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Luang Prabang</td>
                <td className="border p-2">
                  Sankeo Boutique & Spa Hotel – Classic<br />
                  <a href="http://www.sanakeoboutiquelpb.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.sanakeoboutiquelpb.com</a><br />
                  OR<br />
                  Senglao Boutique Hotel – Classic
                </td>
                <td className="border p-2 font-semibold">Luang Prabang</td>
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