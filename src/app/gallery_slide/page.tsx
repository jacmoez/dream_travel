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
    image: "https://golfaurea.com/uploads/laos-golf/441499286-956565899589006-3158131433977066534-n.jpg",
  },
  {
    image: "https://www.golfsavers.com/assets/image/luang-prabang-golf-club-green-2.jpg",
  },
  {
    image: "https://cdn.golflux.com/wp-content/uploads/2023/02/Luang-Prabang-Golf-Club-1-4.jpg",
  },
  {
    image: "https://golftreks.com.au/wp-content/uploads/2025/12/imageedit_2_8073057567.jpg",
  },
  // Laos city / cultural images
  {
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&h=-1&s=1",
  },
  {
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
  },
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  {
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80",
  },
  {
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
  },
  {
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/5d/3c.jpg",
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