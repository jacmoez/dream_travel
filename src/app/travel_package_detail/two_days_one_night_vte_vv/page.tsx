"use client";

import { useState, useEffect } from "react";

interface PricingData {
  threeStars: Record<number | "SS", number>;
  fourStars: Record<number | "SS", number>;
}

interface PricingTableProps {
  data: PricingData;
}

export default function VientianeVangViengTour() {
  // First validity period (1 Jan 2026 – 30 Sep 2027, except CNY)
  const pricingPeriod1: PricingData & { title: string } = {
    title: "Validity: 1 Jan 2026 – 30 Sep 2027 (except Chinese New Year 28 Jan – 3 Feb 2027)",
    threeStars: { 1: 693, 2: 463, 3: 396, 4: 363, 5: 343, 6: 330, SS: 30 },
    fourStars: { 1: 743, 2: 488, 3: 421, 4: 388, 5: 368, 6: 355, SS: 55 },
  };

  // Second validity period (1 May 2027 – 30 Sep 2027)
  const pricingPeriod2: PricingData & { title: string } = {
    title: "Validity: 1 May 2027 – 30 Sep 2027",
    threeStars: { 1: 683, 2: 458, 3: 391, 4: 358, 5: 338, 6: 325, SS: 25 },
    fourStars: { 1: 728, 2: 481, 3: 414, 4: 381, 5: 361, 6: 347, SS: 48 },
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

  // ----- Package Selection Component -----
  const PackageSelection = () => {
    const threeStarsTwin = pricingPeriod1.threeStars[2];
    const threeStarsSingle = threeStarsTwin + pricingPeriod1.threeStars.SS;
    const fourStarsTwin = pricingPeriod1.fourStars[2];
    const fourStarsSingle = fourStarsTwin + pricingPeriod1.fourStars.SS;

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
                <td className="border p-2">First Class (3*) – e.g., Khamair Hotel, Elephant Crossing</td>
                <td className="border p-2 font-semibold">USD {threeStarsTwin}</td>
                <td className="border p-2 font-semibold">USD {threeStarsSingle}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">4-Star Package</td>
                <td className="border p-2">Superior (4*) – e.g., Amari Vang Vieng, Riverside Boutique</td>
                <td className="border p-2 font-semibold">USD {fourStarsTwin}</td>
                <td className="border p-2 font-semibold">USD {fourStarsSingle}</td>
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

  // Improved slideshow images for Vientiane and Vang Vieng
  const images = [
    "https://i.imgur.com/TX7Xt7r.jpeg", 
    "https://i.imgur.com/RzxbuvD.jpeg", 
    "https://i.imgur.com/MExGgeh.jpeg", 
    "https://i.imgur.com/MkfSakl.jpeg", 
    "https://i.imgur.com/B6vdCe4.jpeg",
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
      <h1 className="text-3xl font-bold text-center mb-2">2 DAYS 1 NIGHT</h1>
      <Slideshow />
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">VIENTIANE – VANG VIENG</h2>

      {/* Package Selection Table */}
      {/* <PackageSelection /> */}
      <div className="ackage-mini-duration-text text-red-700 text-center">minium : 2 person</div>

      {/* Itinerary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4">Itinerary</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">DAY 1: Arrive Vientiane – Transfer to Vang Vieng (Dinner)</h4>
            <p className="mt-1">
              Upon arrival in Vientiane, meet your guide and transfer to Vang Vieng via the new expressway
              (approx. 1.5 hours). In the afternoon, enjoy adventure activities such as hot air balloon,
              paramotor, or simply relax by the Nam Song River. Witness the stunning sunset over the limestone
              mountains. Dinner by the river and visit the night market.
            </p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Dinner</p>
            <p className="text-sm text-gray-600"><strong>Overnight:</strong> Vang Vieng</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">DAY 2: Vang Vieng Full Day Tour – Return to Vientiane (Breakfast, Lunch)</h4>
            <p className="mt-1">
              After breakfast, enjoy a half‑day outdoor adventure including:
            </p>
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>Visit Tham Chang (Nang Fa) Cave – a beautiful cave with a stream and swimming area</li>
              <li>Kayaking along the Nam Song River (approximately 1.5 hours)</li>
              <li>Option to visit Blue Lagoon (extra time permitting)</li>
            </ul>
            <p className="mt-2">After lunch, drive back to Vientiane. Drop‑off at your hotel or airport.</p>
            <p className="mt-1 text-sm text-gray-600"><strong>Meal:</strong> Breakfast, Lunch</p>
          </div>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-4 text-sm">
          <p className="font-semibold">Special Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>We drive on the new highway – travel time approx. 1 hour 30 minutes each way.</li>
            <li>Visitors should dress light and wear comfortable clothes during summertime.</li>
            <li>The itinerary can be adjusted due to weather conditions or local events.</li>
            <li>Hot air balloon and paramotor are optional activities with extra cost – please enquire.</li>
          </ul>
        </div>
      </section>

      {/* Detailed Pricing Tables (uncommented) */}
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
          <p className="font-semibold">Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>A surcharge of USD 30 per person applies if the travel date falls on Lunar New Year (28 Jan – 3 Feb 2027).</li>
          </ul>
        </div>
      </section> */}

      {/* Inclusions & Exclusions (corrected for no train) */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">Tour Inclusive</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Accommodation based on double/twin sharing (1 night in Vang Vieng)</li>
            <li>Private air‑conditioned vehicle for all transfers and tours</li>
            <li>English‑speaking guide</li>
            <li>Meals: 1 breakfast, 1 lunch, 1 dinner as per itinerary</li>
            <li>Entrance fees for Tham Chang Cave and kayaking equipment</li>
            <li>Complimentary mineral water during the tour</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">Tour Exclusive</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>International & domestic flight tickets</li>
            <li>Visa stamping fee at the airport (if applicable)</li>
            <li>Optional activities (hot air balloon, paramotor, etc.)</li>
            <li>Meals not specified in the itinerary</li>
            <li>Tipping for guides and drivers (suggested $5–8 per person/day)</li>
            <li>Travel insurance (highly recommended)</li>
            <li>Personal expenses (drinks, souvenirs, extra snacks)</li>
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
                <th className="border p-2 text-left">Superior (4*)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Vang Vieng</td>
                <td className="border p-2">
                  Khamair Hotel – Deluxe<br />
                  OR<br />
                  Elephant Crossing Hotel – Deluxe<br />
                  <a href="http://www.theelephantcrossinghotel.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    www.theelephantcrossinghotel.com
                  </a>
                </td>
                <td className="border p-2">
                  Amari Vang Vieng Hotel – Superior Riverview<br />
                  <a href="https://www.amari.com/vang-vieng" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    www.amari.com/vang-vieng
                  </a>
                  <br />
                  OR<br />
                  Riverside Boutique Resort – Classic room<br />
                  <a href="http://www.riversideboutique.vangvieng" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    www.riversideboutique.vangvieng
                  </a>
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