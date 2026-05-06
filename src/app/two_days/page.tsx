'use client';
import React, { useState, useEffect, useCallback } from 'react';

const PackageVTE_MF_VTE: React.FC = () => {
  // Image slider state
  const [slideIndex, setSlideIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1542367592-8849eb950fd9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559244153-33f6ba1c1a7a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80"
  ];

  const showSlide = useCallback((index: number) => {
    let newIndex = index;
    if (newIndex >= images.length) newIndex = 0;
    if (newIndex < 0) newIndex = images.length - 1;
    setSlideIndex(newIndex);
  }, [images.length]);

  const changeSlide = (direction: number) => {
    showSlide(slideIndex + direction);
  };

  const currentSlide = (index: number) => {
    showSlide(index);
  };

  // Auto-advance every 5 seconds (optional, uncomment if desired)
  // useEffect(() => {
  //   const interval = setInterval(() => changeSlide(1), 5000);
  //   return () => clearInterval(interval);
  // }, [changeSlide, slideIndex]);

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: #f8fafc; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
        .fleur-de-leah-regular {
          font-family: "Pinyon Script", cursive;
          font-weight: 400;
          letter-spacing: 2px;
        }
        /* Slider Styles */
        .slider-container {
          position: relative;
          max-width: 1280px;
          margin: 1.5rem auto 0 auto;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .slider-img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          transition: opacity 0.5s ease;
        }
        @media (min-width: 768px) {
          .slider-img { height: 420px; }
        }
        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0,0,0,0.5);
          color: white;
          border: none;
          font-size: 1.5rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 9999px;
          transition: background 0.2s;
          z-index: 10;
        }
        .slider-btn:hover { background-color: rgba(0,0,0,0.8); }
        .prev { left: 10px; }
        .next { right: 10px; }
        .dots {
          position: absolute;
          bottom: 16px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          z-index: 10;
        }
        .dot {
          width: 12px;
          height: 12px;
          background-color: rgba(255,255,255,0.6);
          border-radius: 50%;
          cursor: pointer;
          transition: 0.2s;
        }
        .dot.active {
          background-color: white;
          transform: scale(1.2);
        }
      `}</style>

      <header className="bg-emerald-900 text-white py-10 text-center shadow-md">
        <h1 className="text-3xl font-bold">PACKAGE 5: 2 DAYS 1 NIGHT VTE-MF-VTE</h1>
      </header>

      {/* Image Slider */}
      <div className="slider-container">
        <img className="slider-img" src={images[slideIndex]} alt="Mekong river Laos" />
        <button className="slider-btn prev" onClick={() => changeSlide(-1)}>&#10094;</button>
        <button className="slider-btn next" onClick={() => changeSlide(1)}>&#10095;</button>
        <div className="dots">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === slideIndex ? 'active' : ''}`}
              onClick={() => currentSlide(idx)}
            ></span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* DAY 1 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-emerald-600 text-white px-6 py-4">
            <h2 className="font-bold text-xl">DAY 1: ARRIVE VIENTIANE</h2>
          </div>
          <div className="p-6 text-slate-600 space-y-3">
            <p>Meet your guide and travel to Muang Feuang, a peaceful countryside destination. Check in at resort and enjoy dinner. Optional group BBQ and relaxation.</p>
            <p className="font-semibold text-slate-800">Meal: Dinner<br />Overnight: Muang Feuang</p>
          </div>
        </div>

        {/* DAY 2 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-emerald-600 text-white px-6 py-4">
            <h2 className="font-bold text-xl">DAY 2: Half-day tour at MF and back to VTE</h2>
          </div>
          <div className="p-6 text-slate-600 space-y-3">
            <p>Early morning alms giving and scenic boat ride along the river. After lunch, return to Vientiane.</p>
            <p className="font-semibold text-slate-800">Meal: Breakfast, Lunch</p>
          </div>
        </div>

        {/* RATES SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-xl mb-2">Rate Is Per Person Based on Twin or Double Sharing</h2>
          <p>Validity from 1 Jan 2026 – 30. Sep 2027</p>
          <p>Except the Chinese New Year from 28 Jan to 03 Feb 2027</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-center border">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="p-2">Category</th>
                  <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>SS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td>Three Stars</td>
                  <td>450</td><td>240</td><td>177</td><td>145</td><td>126</td><td>113</td><td>20</td>
                </tr>
                <tr className="border bg-slate-50">
                  <td>Four Stars</td>
                  <td>475</td><td>253</td><td>189</td><td>158</td><td>139</td><td>126</td><td>33</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">Validity from 1 May 2027 - 30 Sep 2027</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-center border">
              <thead className="bg-emerald-800 text-white">
                <tr>
                  <th className="p-2">Category</th>
                  <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>SS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td>Three Stars</td>
                  <td>445</td><td>238</td><td>174</td><td>143</td><td>124</td><td>111</td><td>18</td>
                </tr>
                <tr className="border bg-slate-50">
                  <td>Four Stars</td>
                  <td>460</td><td>245</td><td>182</td><td>150</td><td>131</td><td>118</td><td>25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* INCLUDE / EXCLUDE */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
            <h2 className="font-bold text-xl mb-2">Tour inclusive of:</h2>
            <p>- Accommodation based on double/twin sharing</p>
            <p>- (01pax based on Single room)</p>
            <p>- Private pick-up without guide on the first and last day</p>
            <p>- Full-day tour in LPQ city with lunch</p>
            <p>- Entrance fee for all sightseeing activities as mentioned in the itinerary.</p>
            <p>- Complimentary mineral water</p>
            <p>- High speed train tickets</p>
          </div>

          <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 shadow-sm">
            <h2 className="font-bold text-xl mb-2">Tour exclusive of:</h2>
            <p>- International & domestic flight tickets</p>
            <p>- Visa stamping fee at the airport (USD 40 single entry to Vietnam, payable in cash at the airport)</p>
            <p>- Meals not specified in the itinerary</p>
            <p>- Tipping for guides and drivers</p>
            <p>- Travel insurance (we highly recommend purchase adequate insurance)</p>
            <p>- All other services not specified in the itinerary</p>
          </div>
        </div>

        {/* HOTELS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">
          <h2 className="font-bold text-xl mb-4">HOTEL LIST OR SIMILARS</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm text-left">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="p-3 border">Area</th>
                  <th className="p-3 border">First Class (3.5*)</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border bg-white">
                  <td className="p-3 border font-semibold">MF</td>
                  <td className="p-3 border">
                    Riverside 2 Resort<br />
                    Classic<br />
                    www.<br /><br />
                    OR<br /><br />
                    AK Resort Classic
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageVTE_MF_VTE;