"use client";

import { useState, useEffect } from "react";

interface PricingData {
  threeStars: Record<number | "SS", number>;
  fourStars: Record<number | "SS", number>;
}

interface PricingTableProps {
  data: PricingData;
}

export default function VientianeMuangFeuangTour() {
  // First validity period (1 Jan 2026 – 30 Sep 2027, except CNY)
  const pricingPeriod1: PricingData & { title: string } = {
    title: "Validity from 1 Jan 2026 – 30 Sep 2027 (except Chinese New Year from 28 Jan to 03 Feb 2027)",
    threeStars: { 1: 450, 2: 240, 3: 177, 4: 145, 5: 126, 6: 113, SS: 20 },
    fourStars: { 1: 475, 2: 253, 3: 189, 4: 158, 5: 139, 6: 126, SS: 33 },
  };

  // Second validity period (1 May 2027 – 30 Sep 2027)
  const pricingPeriod2: PricingData & { title: string } = {
    title: "Validity from 1 May 2027 – 30 Sep 2027",
    threeStars: { 1: 445, 2: 238, 3: 174, 4: 143, 5: 124, 6: 111, SS: 18 },
    fourStars: { 1: 460, 2: 245, 3: 182, 4: 150, 5: 131, 6: 118, SS: 25 },
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

  // Slideshow images – replace with actual images of Muang Feuang / countryside
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
          <img src={images[currentIndex]} alt={`Muang Feuang slide ${currentIndex + 1}`} className="w-full h-full object-cover" />
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
      <h1 className="text-3xl font-bold text-center mb-2">2 DAYS 1 NIGHT</h1>
      <Slideshow />
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">VIENTIANE – MUANG FEUANG – VIENTIANE</h2>

      {/* Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">DAY 1: ARRIVE VIENTIANE</h4>
            <p className="mt-1">
              Meet your guide and travel to Muang Feuang, a peaceful countryside destination.
              Check in at resort and enjoy dinner. Optional group BBQ and relaxation.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Dinner</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Muang Feuang</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 2: Half-day tour at MF and back to VTE</h4>
            <p className="mt-1">
              Early morning alms giving and scenic boat ride along the river.
              After lunch, return to Vientiane.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
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
                <th className="border p-2 text-left">First Class (3.5*)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">MF</td>
                <td className="border p-2">
                  Riverside 2 Resort – Classic<br />
                  <a href="http://www." className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.</a><br />
                  OR<br />
                  AK Resort – Classic
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