
"use client";

import { useState, useEffect } from "react";

interface PricingData {
  threeStars: Record<number | "SS", number>;
  fourStars: Record<number | "SS", number>;
}

interface PricingTableProps {
  data: PricingData;
}

export default function LuangPrabangVangViengVientiane4DaysTour() {
  const pricingPeriod1: PricingData & { title: string } = {
    title: "Validity from 1 Jan 2026 – 30 Sep 2027 (except Chinese New Year from 28 Jan to 03 Feb 2027)",
    threeStars: { 1: 819, 2: 554, 3: 501, 4: 474, 5: 458, 6: 421, SS: 105 },
    fourStars: { 1: 969, 2: 629, 3: 576, 4: 549, 5: 533, 6: 496, SS: 180 },
  };

  const pricingPeriod2: PricingData & { title: string } = {
    title: "Validity from 1 May 2027 – 30 Sep 2027",
    threeStars: { 1: 759, 2: 524, 3: 471, 4: 444, 5: 428, 6: 391, SS: 75 },
    fourStars: { 1: 939, 2: 614, 3: 561, 4: 534, 5: 518, 6: 481, SS: 165 },
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

  // ----- REAL IMAGE URLs for the slideshow -----
 const images = [
    "https://th.bing.com/th/id/R.5961ddb3299d632d7df1e6b95a96ce3a?rik=hSrTXWFw0KMbSA&pid=ImgRaw&r=0?w=800&h=500&fit=crop", // That Luang
    "https://cdn.audleytravel.com/1050/750/79/502483-patuxai-monument-in-vientiane-laos.jpg?w=800&h=500&fit=crop", // Patuxai
    "https://cdn.audleytravel.com/1400/1000/60/532810-wat-that-luang-vientiane.jpg?w=800&h=500&fit=crop", // Wat Sisaket
    "https://www.tripsavvy.com/thmb/E30eKchTT0GoQ-w7vOopHMEBYvo=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-522372630-5a6f970aff1b780037c4bc2c.jpg?w=800&h=500&fit=crop", // Kuang Si
    "https://faszination-suedostasien.de/wp-content/uploads/2019/09/vientiane-goldener-buddha-413489188.jpg?w=800&h=500&fit=crop", // Wat Xieng Thong
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
          <img src={images[currentIndex]} alt={`Laos destination ${currentIndex + 1}`} className="w-full h-full object-cover" />
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
      <h1 className="text-3xl font-bold text-center mb-2">4 DAYS 3 NIGHTS</h1>
      <Slideshow />
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">LUANG PRABANG – VANG VIENG – VIENTIANE</h2>

      {/* Itinerary (unchanged, exactly as you provided) */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">DAY 1: At Luang Prabang</h4>
            <p className="mt-1">
              Arrival at Luang Prabang Airport. Meet your guide and transfer to hotel.
              In the evening, enjoy a Mekong sunset cruise and visit the night market.
            </p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 2: LPQ half-day tour and departure to Vang Vieng</h4>
            <p className="mt-1">
              Early morning alms giving and city tour of temples.
              Transfer to train station and travel to Vang Vieng. Upon arrival, check in and relax.
              In the late afternoon, enjoy hot air balloon experience (optional) followed by dinner.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Dinner</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Vang Vieng</p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-2 text-sm">
              <p className="font-semibold">Please take notes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>For activities, client can chose for what they like to do?</li>
                <li>The Drop-off and pick-up time for activities is follow to the service agent instruction.</li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 3: Half day tour in VV and transfer to Vientiane</h4>
            <p className="mt-1">
              Morning boat ride on Nam Song River and visit caves and Blue Lagoon.
              Transfer to Vientiane and check into hotel. Free time for leisure or night exploration.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Vientiane</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 4: Half day tour in VV and transfer to Vientiane</h4>
            <p className="mt-1">
              After breakfast, visit key temples and enjoy a short city tour.
              Transfer to airport for departure.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast</p>
          </div>
        </div>
      </section>

      {/* Pricing Tables (unchanged) */}
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

      {/* Inclusions & Exclusions (unchanged) */}
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

      {/* Hotel List (unchanged, exactly as you provided) */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">HOTEL LIST OR SIMILARS</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Area</th>
                <th className="border p-2 text-left">First Class (3*)</th>
                <th className="border p-2 text-left">Superior (4*)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Vientiane</td>
                <td className="border p-2">
                  Riverside Hotel – Superior<br />
                  <a href="mailto:Riverside62023@gmail.com" className="text-blue-600 underline">Riverside62023@gmail.com</a><br />
                  OR<br />
                  Grand Hotel – Deluxe<br />
                  <a href="http://www.granhotelvientiane.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.granhotelvientiane.com</a>
                </td>
                <td className="border p-2">
                  Crowne Plaza Hotel – Standard<br />
                  <a href="http://www.vientiane.crowneplaza.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.vientiane.crowneplaza.com</a><br />
                  OR<br />
                  Amari Hotel – Classic room<br />
                  <a href="https://www.amari.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://www.amari.com</a>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Vang Vieng</td>
                <td className="border p-2">
                  Khamair hotel – Deluxe<br />
                  OR<br />
                  Elephant crossing Hotel – Deluxe<br />
                  <a href="http://www.theelephantcrossinghotel.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.theelephantcrossinghotel.com</a>
                </td>
                <td className="border p-2">
                  Amari Vang Vieng Hotel – Superior Riverview<br />
                  <a href="https://www.amari.com/vang-vieng" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.amari.com/vang-vieng</a><br />
                  OR<br />
                  Riverside Boutique Resort – Classic room<br />
                  <a href="http://www.riversideboutique.vangvieng" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.riversideboutique.vangvieng</a>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Luang Prabang</td>
                <td className="border p-2">
                  Sankeo Boutique & Spa hotel – Classic<br />
                  <a href="http://www.sanakeoboutiquelpb.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.sanakeoboutiquelpb.com</a><br />
                  OR<br />
                  Senglao Boutique hotel – Classic
                </td>
                <td className="border p-2">
                  Souphattra Hotel – Deluxe<br />
                  <a href="http://www.souphattra.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.souphattra.com</a><br />
                  OR<br />
                  KIRIDARA HOTEL – Classic room<br />
                  <a href="http://www.souphattra.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.souphattra.com</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}