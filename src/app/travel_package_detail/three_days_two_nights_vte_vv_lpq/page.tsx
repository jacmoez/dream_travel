"use client";

import { useState, useEffect } from "react";

export default function VteVvLpqTour() {
 const images = [
    "https://a.cdn-hotels.com/gdcs/production193/d674/35ae1968-d1d4-43cd-8637-42639f664e8a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium?w=800&h=500&fit=crop", // Vang Vieng mountains
    "https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Nam-Song-River-in-Vang-Vieng-Laos.jpg?w=800&h=500&fit=crop", // Nam Song River
    "https://images.travelandleisureasia.com/wp-content/uploads/sites/6/2025/04/14173201/Vang-Vieng-1.jpg?w=800&h=500&fit=crop", // Hot air balloon
    "https://i.pinimg.com/originals/f9/45/a0/f945a05e558a46483f9bfa6dcd794312.jpg?w=800&h=500&fit=crop", // Kayaking
    "https://cdn.getyourguide.com/img/location/5a086527d1738.jpeg/88.jpg?w=800&h=500&fit=crop", // Nang Fa Cave
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

      {/* Content wrapper – still centred but wider */}
      <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
        
        <p className="text-center text-gray-600 text-lg mb-8">Private Van: (1hr 30 minutes drive)</p>

        <section className="mb-8">
          <h3 className="text-2xl font-bold border-l-4 border-blue-600 pl-4 mb-6">Itinerary</h3>
          <div className="space-y-8">
            {/* Day 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3 text-blue-800">Day. 1 Vientiane to Vang Vieng</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Pickup from Watty airport.</li>
                <li>Meet and greet by Myanmarguide.</li>
                <li>Driving by VVIP van to Vang Vieng and city tour.</li>
                <li>Lunch at Nam Song river side.</li>
                <li>Check in Hotel</li>
                <li>Visit to blue langoon and angel cave.</li>
                <li>Activitie are (Optional) (Kayaking, Zipline and others)</li>
                <li>Back to hotel and night life at VV night market.</li>
              </ul>
            </div>

            {/* Day 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3 text-blue-800">Day. 2 VV to LPQ ancient city protect by UNESCO (By Train)</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Breakfast at hotel</li>
                <li>Send to VV train staion at 07:30am.</li>
                <li>Train deprture (08:55-09:46) arrive to LPQ</li>
                <li>Pickup from LPQ train station and visit to Kaung Si waterfall (Outskirt)</li>
                <li>Lunch at Bamboo house near by waterfall</li>
                <li>Back to town for visiting Wat Visoun, Wat Xieng Thong, Wat Sens…</li>
                <li>Mekong cruise and sunset. (Option)</li>
                <li>Dinner and night market</li>
                <li>Transfer to hotel</li>
              </ul>
            </div>

            {/* Day 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3 text-blue-800">Day. 3 Luang Prabang half day tour and send to airport.</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Giving alms to the monks at 5:30 am, visit to morning colorful market.</li>
                <li>Transfer to hotel for breakfast and 08:30am</li>
                <li>Check out hotel and transfer to airport</li>
                <li>Advise flight departure time (10:30-12:00) LPQ-Chiang Mai</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="text-xs text-gray-500 border-t pt-6 mt-6 text-center">
          * All information is subject to change without prior notice. Please confirm details at time of booking.
        </div>
      </div>
    </div>
  );
}