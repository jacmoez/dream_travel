"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type GalleryItem = {
  image: string;
};

// Mix of Laos city & golf images
const galleryItems: GalleryItem[] = [
  // Golf images
  {
    image: "https://i.imgur.com/slvDFMu.jpeg",
  },
  {
    image:'https://i.imgur.com/FNM2BjK.jpeg'
  },
  {
    image:'https://i.imgur.com/9rE4DTD.jpeg'
  },
  {
    image:'https://i.imgur.com/HqX4UWX.jpeg'
  },
  {
    image:'https://i.imgur.com/UZI13Qj.jpeg'
  },
  {
    image: "https://i.imgur.com/sl2GMR9.jpeg",
  },
  {
    image: "https://i.imgur.com/GYBpuLK.jpeg",
  },
  {
    image: "https://i.imgur.com/i5mLMaT.jpeg",
  },
  // Laos city / cultural images
  {
    image: "https://i.imgur.com/agPehZc.jpeg",
  },
  {
    image: "https://i.imgur.com/b0jCu0S.jpeg",
  },
  {
    image: "https://i.imgur.com/CcqbEqO.jpeg",
  },
  {
    image: "https://i.imgur.com/dkoiZnj.jpeg",
  },
  {
    image: "https://i.imgur.com/D5oLKnh.jpeg",
  },
  {
    image: "https://i.imgur.com/mzxOH7o.jpeg",
  },
  {
    image: "https://i.imgur.com/Y7b37MJ.jpeg",
  },
  {
    image: "https://i.imgur.com/qK8XEKt.jpeg",
  },
  {
    image: "https://i.imgur.com/7s5pMGL.jpeg",
  },
];

export default function GallerySliderRow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const slides = container.querySelectorAll(".slide-card");
    if (slides.length === 0) return;
    const firstSlide = slides[0] as HTMLElement;
    const slideWidth = firstSlide.offsetWidth;
    const gap = 20; // matches gap-5 = 1.25rem = 20px
    const scrollAmount = slideWidth + gap;
    const newScrollLeft = container.scrollLeft + scrollAmount;
    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };

  const prevSlide = () => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const slides = container.querySelectorAll(".slide-card");
    if (slides.length === 0) return;
    const firstSlide = slides[0] as HTMLElement;
    const slideWidth = firstSlide.offsetWidth;
    const gap = 20;
    const scrollAmount = slideWidth + gap;
    const newScrollLeft = container.scrollLeft - scrollAmount;
    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };

  const updateIndexFromScroll = () => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const slides = container.querySelectorAll(".slide-card");
    if (slides.length === 0) return;
    const containerLeft = container.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;
    slides.forEach((slide, idx) => {
      const slideLeft = (slide as HTMLElement).offsetLeft;
      const distance = Math.abs(containerLeft - slideLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });
    if (closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
    }
  };

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;
    const handleScroll = () => updateIndexFromScroll();
    container.addEventListener("scroll", handleScroll);
    updateIndexFromScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  return (
    <div className="w-full mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#2E7D32]">Our Gallery</h2>
      <div className="relative flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={prevSlide}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-gray-700 hover:bg-blue-600 hover:text-white transition z-10"
          aria-label="Previous"
        >
          ❮
        </button>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          className="flex overflow-x-auto scroll-smooth gap-5 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400"
          style={{ scrollbarWidth: "thin", flex: 1 }}
        >
          {galleryItems.map((item, idx) => (
            <Link
              key={idx}
              href="/gallery"
              className="slide-card flex-shrink-0 w-72 snap-start group"
            >
              <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-transform duration-200 hover:-translate-y-1 cursor-pointer">
                <div className="relative w-full overflow-hidden" style={{ height: "280px" }}>
                  <img
                    src={item.image}
                    alt={`Gallery image ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                {/* No text – image only */}
              </div>
            </Link>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-gray-700 hover:bg-blue-600 hover:text-white transition z-10"
          aria-label="Next"
        >
          ❯
        </button>
      </div>
    </div>
  );
}