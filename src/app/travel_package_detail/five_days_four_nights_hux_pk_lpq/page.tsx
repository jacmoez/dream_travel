

"use client";

import { useState, useEffect } from "react";

export default function HuayxaiPakbengLuangPrabangTour() {
  // Slideshow images updated to reflect Mekong, Pakbeng, Pak Ou Caves, Luang Prabang
 const images = [
    "https://th.bing.com/th/id/R.5961ddb3299d632d7df1e6b95a96ce3a?rik=hSrTXWFw0KMbSA&pid=ImgRaw&r=0?w=800&h=500&fit=crop", // That Luang
    "https://cdn.audleytravel.com/1050/750/79/502483-patuxai-monument-in-vientiane-laos.jpg?w=800&h=500&fit=crop", // Patuxai
    "https://cdn.audleytravel.com/1400/1000/60/532810-wat-that-luang-vientiane.jpg?w=800&h=500&fit=crop", // Wat Sisaket
    "https://www.tripsavvy.com/thmb/E30eKchTT0GoQ-w7vOopHMEBYvo=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-522372630-5a6f970aff1b780037c4bc2c.jpg?w=800&h=500&fit=crop", // Kuang Si
    "https://faszination-suedostasien.de/wp-content/uploads/2019/09/vientiane-goldener-buddha-413489188.jpg?w=800&h=500&fit=crop", // Wat Xieng Thong
  ];

  // Package selection component
  const Packages = () => {
    return (
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Package Selection (Hotels & Pricing)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Package</th>
                <th className="border p-2 text-left">Vientiane Hotel</th>
                <th className="border p-2 text-left">Luang Prabang Hotel</th>
                <th className="border p-2 text-left">Twin Sharing</th>
                <th className="border p-2 text-left">Single Room</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Package A</td>
                <td className="border p-2">
                  Sethta Palace Hotel (5★)<br />
                  <span className="text-xs text-gray-500">Standard Room</span>
                </td>
                <td className="border p-2">
                  Satri House (5★)<br />
                  <span className="text-xs text-gray-500">Deluxe Room</span>
                </td>
                <td className="border p-2 font-semibold">USD 1,651</td>
                <td className="border p-2 font-semibold">USD 2,298</td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Package B</td>
                <td className="border p-2">
                  Mintra Hotel (4★)<br />
                  <span className="text-xs text-gray-500">Deluxe Room</span>
                </td>
                <td className="border p-2">
                  Burasari Heritage (4★)<br />
                  <span className="text-xs text-gray-500">Superior / Deluxe Room</span>
                </td>
                <td className="border p-2 font-semibold">USD 1,334</td>
                <td className="border p-2 font-semibold">USD 1,721</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          * Pricing based on a minimum of 4 golfers traveling together (Net Tour Operator Pricing).
        </div>
        <div className="text-xs text-gray-500 mt-1">
          <strong>Hotels Information:</strong>{" "}
          <a href="https://setthapalace.com/" target="_blank" className="text-blue-600 underline" rel="noopener noreferrer">Sethta Palace Hotel (5★)</a>{" "}
          |{" "}
          <a href="https://mintrahotel.com/" target="_blank" className="text-blue-600 underline" rel="noopener noreferrer">Mintra Hotel (4★)</a>{" "}
          |{" "}
          <a href="https://www.satrihouse.com/" target="_blank" className="text-blue-600 underline" rel="noopener noreferrer">Satri House (5★)</a>{" "}
          |{" "}
          <a href="https://burasari.com/burasari-heritage-luang-prabang/" target="_blank" className="text-blue-600 underline" rel="noopener noreferrer">Burasari Heritage (4★)</a>
        </div>
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
      <h1 className="text-3xl font-bold text-center mb-2">5 DAYS 4 NIGHTS</h1>
      <Slideshow />
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        HOUAYXAI – PAKBENG – LUANG PRABANG (Mekong Cruise)
      </h2>

      {/* New Package Selection Table */}
      <Packages />

      {/* Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">DAY 1: Pick-up from Thai-Lao border (Huayxai)</h4>
            <p className="mt-1">
              Arrival at Thai-Lao border. Meet your guide and begin a 2-day Mekong River cruise.
              Visit local ethnic villages along the way. Arrive in Pakbeng and check into hotel.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Lunch, Dinner</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Pakbeng</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 2: Pakbeng – Luang Prabang (Downstream)</h4>
            <p className="mt-1">
              Continue cruise downstream to Luang Prabang.
              Visit Pak Ou Caves and Whisky Village before arriving in the evening.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 3: Luang Prabang Full Day Tour</h4>
            <p className="mt-1">
              Early morning alms giving followed by city tour.
              Visit temples, Royal Palace, and Mount Phousi for sunset.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 4: Luang Prabang Full Day Tour</h4>
            <p className="mt-1">
              Visit Kuang Si Waterfall and Bear Rescue Center. In the evening, enjoy a traditional cultural performance.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Luang Prabang</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 5: Departure</h4>
            <p className="mt-1">
              Free time before transfer to airport for departure.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast</p>
          </div>
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

      {/* Hotel List (as provided) */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">HOTEL LIST OR SIMILARS</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Area</th>
                <th className="border p-2 text-left">First Class (4*)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Pakbeng</td>
                <td className="border p-2">
                  Legrand Resort – Deluxe<br />
                  <a href="http://www.legrandresort.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.legrandresort.com</a><br />
                  OR<br />
                  Senctuary – Classic<br />
                  <a href="http://www.sanctuaryhotelsandresort.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.sanctuaryhotelsandresort.com</a>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Luang Prabang</td>
                <td className="border p-2">
                  Sankeo Boutique & Spa hotel – Classic<br />
                  <a href="http://www.sanakeoboutiquelpb.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.sanakeoboutiquelpb.com</a><br />
                  OR<br />
                  Senglao Boutique hotel – Classic<br /><br />
                  Deluxe<br />
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

      {/* Footer note */}
      <div className="text-xs text-gray-500 border-t pt-4 mt-4 text-center">
        * All information is subject to change without prior notice. Please confirm details at time of booking.
      </div>
    </div>
  );
}