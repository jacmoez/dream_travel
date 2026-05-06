'use client';

import React, { useState, useEffect, useRef } from 'react';
import { packagesData } from '../data/packages';

const PackageDetailPage: React.FC<{ packageId: keyof typeof packagesData }> = ({ packageId }) => {
  const pkg = packagesData[packageId];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoPlay && pkg?.images.length) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % pkg.images.length);
      }, 5000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, pkg?.images.length]);

  if (!pkg) {
    return <div className="text-center py-10 text-red-600">Package not found.</div>;
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const changeSlide = (direction: number) => {
    setCurrentSlide((prev) => (prev + direction + pkg.images.length) % pkg.images.length);
    setAutoPlay(false);
  };

  // --- Dynamic column detection: collect all paxN keys (pax1, pax2, ..., pax20) ---
  const getPaxKeys = (): string[] => {
    const keysSet = new Set<string>();
    pkg.rates.forEach(period => {
      period.categories.forEach(cat => {
        Object.keys(cat.prices).forEach(key => {
          if (key.startsWith('pax') && key !== 'ss') {
            keysSet.add(key);
          }
        });
      });
    });
    // Sort numerically: pax1, pax2, ..., pax20
    return Array.from(keysSet).sort((a, b) => {
      const numA = parseInt(a.replace('pax', ''), 10);
      const numB = parseInt(b.replace('pax', ''), 10);
      return numA - numB;
    });
  };

  const paxKeys = getPaxKeys();

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Image Slider (unchanged) */}
      <div className="relative max-w-6xl mx-auto mt-6 rounded-xl overflow-hidden shadow-lg">
        <div className="relative h-80 md:h-[420px]">
          {pkg.images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => changeSlide(-1)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 text-xl z-10"
        >
          &#10094;
        </button>
        <button
          onClick={() => changeSlide(1)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 text-xl z-10"
        >
          &#10095;
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
          {pkg.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? 'bg-white scale-125' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic content */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-emerald-700 border-b-2 border-emerald-200 pb-2">
          {pkg.title}
        </h1>

        {pkg.notes && pkg.notes.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md">
            <p className="font-semibold">Important Notes:</p>
            <ul className="list-disc list-inside text-sm">
              {pkg.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Itinerary */}
        <div className="space-y-4">
          {pkg.days.map((day) => (
            <div key={day.day} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-emerald-600 text-white px-6 py-4">
                <h2 className="font-bold text-xl">DAY {day.day}: {day.title}</h2>
              </div>
              <div className="p-6 text-slate-600 space-y-3">
                <p>{day.description}</p>
                <p className="font-semibold text-slate-800">
                  Meal: {day.meals || 'Not specified'}
                  {day.overnight && <><br />Overnight: {day.overnight}</>}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Rates Table - dynamically generated columns */}
        {pkg.rates.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-700">Rates (USD per person – twin/double sharing)</h2>
            {pkg.rates.map((period, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 font-semibold text-slate-700">Validity: {period.validity}</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-emerald-700 text-white">
                      <tr>
                        <th className="p-3 border">Category</th>
                        {paxKeys.map(pax => (
                          <th key={pax} className="p-3 border">{pax.replace('pax', '')}</th>
                        ))}
                        <th className="p-3 border">SS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {period.categories.map((cat, i) => (
                        <tr key={i} className="border-b even:bg-slate-50">
                          <td className="p-3 font-semibold">{cat.name}</td>
                          {paxKeys.map(pax => (
                            <td key={pax} className="p-3">
                              {(cat.prices as any)[pax] !== undefined ? (cat.prices as any)[pax] : '-'}
                            </td>
                          ))}
                          <td className="p-3">{cat.prices.ss}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-500 italic">* SS = Single Supplement</p>
          </div>
        )}

        {/* Inclusions / Exclusions (unchanged) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="font-bold text-xl mb-2 text-emerald-800">Tour inclusive of:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {pkg.inclusions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
            <h3 className="font-bold text-xl mb-2 text-rose-800">Tour exclusive of:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {pkg.exclusions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hotels (unchanged) */}
        {pkg.hotels.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="font-bold text-xl mb-4 text-emerald-700">HOTEL LIST OR SIMILARS</h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm text-left">
                <thead className="bg-emerald-700 text-white">
                  <tr>
                    <th className="p-3 border">Area</th>
                    <th className="p-3 border">Hotel Category & Name</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.hotels.map((hotel, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border font-semibold align-top">{hotel.area}</td>
                      <td className="p-3 border">
                        <span className="font-medium">{hotel.classCategory}</span>
                        <div className="mt-1 whitespace-pre-line">{hotel.hotelNames.join('\n')}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetailPage;