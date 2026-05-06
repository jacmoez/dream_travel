// app/golf-package/[slug]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ----- Golf Package Data (same structure as before) -----
interface GolfPackage {
  title: string;
  duration: string;
  description: string;
  priceTag?: string;
  images: string[];
  includes?: string[];
}

const golfPackageData: Record<string, GolfPackage> = {
  // Regular golf packages
  'lp-golf-getaway': {
    title: 'LP Golf Getaway',
    duration: '2 Rounds',
    description: 'Enjoy 2 rounds of golf at Luang Prabang Golf Club. Includes green fees, caddie, golf cart, and luxury accommodation.',
    images: ['https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2018/06/06/5b172fb47abc957b64518a7b_GettyImages-942686126.jpg.rend.hgtvcom.966.644.suffix/1573243603510.jpeg'],
    includes: ['2 rounds green fees', 'Caddie & golf cart', 'Luxury accommodation', 'Breakfast']
  },
  'premium-golf-experience': {
    title: 'Premium Golf Experience',
    duration: '3 Rounds',
    description: 'Premium golf experience with 3 rounds at top courses, luxury resort accommodation, spa treatment.',
    images: ['https://media.npr.org/assets/img/2023/03/01/gettyimages-1410422468_wide-f64095a661d8b05ad0433ef9da08b1f83dd23d24.jpg'],
    includes: ['3 rounds green fees', 'Luxury resort stay', 'Spa treatment', 'Daily breakfast']
  },
  'resort-golf-package': {
    title: 'Resort Golf Package',
    duration: '2N + 2R',
    description: 'Combine luxury resort stay with 2 rounds of golf. Includes accommodation, breakfast, green fees, and club rental.',
    images: ['https://www.pgaresort.com/images/content/homepageclubslidersmallimg/palm-harbor---innisbrook-resort---golf---2024-folklore-films-_12-1-.jpg'],
    includes: ['2 nights accommodation', '2 rounds green fees', 'Club rental', 'Daily breakfast']
  },
  // Popular golf packages
  'family-golf-getaway': {
    title: 'Family Golf Getaway',
    duration: '2 Rounds + Junior Clinic',
    description: '2 rounds for adults + free junior clinic (ages 6-12). Family resort with pool, kids menu, and family tee times.',
    priceTag: '2 Rounds + Child Clinic',
    images: ['https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2018/06/06/5b172fb47abc957b64518a7b_GettyImages-942686126.jpg.rend.hgtvcom.966.644.suffix/1573243603510.jpeg'],
    includes: ['2 rounds for adults', 'Free junior clinic', 'Family resort with pool', 'Kids menu']
  },
  'premium-golf-family': {
    title: 'Premium Golf & Family',
    duration: '3 Rounds + Kids Camp',
    description: '3 rounds at top courses, 2-night luxury stay, supervised kids golf camp (4+ hours) and family spa.',
    priceTag: '3 Rounds + Kids Camp',
    images: ['https://media.npr.org/assets/img/2023/03/01/gettyimages-1410422468_wide-f64095a661d8b05ad0433ef9da08b1f83dd23d24.jpg'],
    includes: ['3 rounds green fees', '2 nights luxury stay', 'Supervised kids golf camp', 'Family spa access']
  },
  'resort-stay-play': {
    title: 'Resort Stay & Play',
    duration: '2N + 2R + Child Meals',
    description: 'Luxury resort stay with 2 rounds of golf, complimentary child meals, and family-friendly activities.',
    priceTag: '2N + 2R + Child Meals',
    images: ['https://www.pgaresort.com/images/content/homepageclubslidersmallimg/palm-harbor---innisbrook-resort---golf---2024-folklore-films-_12-1-.jpg'],
    includes: ['2 nights luxury stay', '2 rounds green fees', 'Complimentary child meals', 'Family activities']
  },
  'championship-junior': {
    title: 'Championship Junior',
    duration: '2R + Pro Lesson',
    description: '2 championship rounds, professional caddie, plus free junior rental set and 1-hour lesson with pro.',
    priceTag: '2R + Pro Lesson',
    images: ['https://media.npr.org/assets/img/2023/03/01/gettyimages-1410422468_wide-f64095a661d8b05ad0433ef9da08b1f83dd23d24.jpg'],
    includes: ['2 championship rounds', 'Professional caddie', 'Free junior rental set', '1-hour pro lesson']
  }
};

const defaultPackage = golfPackageData['lp-golf-getaway'];

export default function GolfPackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const pkg = golfPackageData[slug] || defaultPackage;

  // Slider state (same as golf club detail)
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = pkg.images.length;

  // Reset slide when package changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [slug]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // --- Booking Modal State & Handlers (copied from homepage) ---
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPackageName, setBookingPackageName] = useState('');

  const openBookingModal = (packageName: string) => {
    setBookingPackageName(packageName);
    setBookingModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Booking request sent! We will contact you within 24 hours.');
    closeBookingModal();
  };

  return (
    <>
      <main className="bg-slate-50 text-slate-800 min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto px-4 py-8 w-full">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-[#2E7D32] hover:text-[#ED6A02] mb-4 transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Image Slider (same as golf club detail) */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {pkg.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${pkg.title} - ${idx + 1}`}
                    className="w-full flex-shrink-0 object-cover h-64 md:h-80"
                  />
                ))}
              </div>

              {/* Slider controls */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                    {pkg.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentSlide ? 'bg-white w-4' : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#2E7D32] mb-2">
                {pkg.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-[#ED6A02]/10 text-[#ED6A02] px-3 py-1 rounded-full text-sm font-semibold">
                  <i className="fas fa-clock mr-1"></i> {pkg.duration}
                </span>
                {pkg.priceTag && (
                  <span className="bg-[#2E7D32]/10 text-[#2E7D32] px-3 py-1 rounded-full text-sm font-semibold">
                    <i className="fas fa-tag mr-1"></i> {pkg.priceTag}
                  </span>
                )}
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">
                  About this package
                </h2>
                <p className="text-gray-700 mb-6">{pkg.description}</p>

                {pkg.includes && pkg.includes.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-[#2E7D32] mb-3">
                      Package includes:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => openBookingModal(pkg.title)}
                    className="bg-[#2E7D32] text-white px-6 py-2 rounded-full hover:bg-[#ED6A02] transition shadow-md"
                  >
                    <i className="fas fa-bookmark mr-2"></i> Book Now
                  </button>
                  <Link
                    href="/"
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal (exactly as on homepage) */}
      <div
        className={`fixed inset-0 bg-black/80 z-[2147483647] flex items-center justify-center p-4 overflow-hidden transition-all ${
          bookingModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeBookingModal();
        }}
      >
        <div className="bg-white rounded-2xl max-w-[550px] w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative animate-[modalSlideIn_0.3s_ease] shadow-2xl">
          <button
            onClick={closeBookingModal}
            className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-[#ED6A02] transition"
          >
            &times;
          </button>
          <div className="text-center text-4xl text-[#2E7D32] mb-4">
            <i className="fas fa-envelope-open-text"></i>
          </div>
          <h3 className="text-center text-2xl font-bold text-[#2E7D32] mb-2">
            Request a Booking
          </h3>
          <p className="text-center text-gray-500 text-sm mb-6">
            Booking: {bookingPackageName}
          </p>
          <form onSubmit={handleBookingSubmit}>
            <input type="hidden" name="packageName" value={bookingPackageName} />
            <div className="flex flex-wrap gap-4 mb-3">
              <input
                type="text"
                className="flex-1 min-w-[120px] p-3 border border-gray-200 rounded-xl focus:border-[#ED6A02] focus:ring-1 focus:ring-[#ED6A02] outline-none"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                className="flex-1 min-w-[120px] p-3 border border-gray-200 rounded-xl focus:border-[#ED6A02] focus:ring-1 focus:ring-[#ED6A02] outline-none"
                placeholder="Last Name"
                required
              />
            </div>
            <input
              type="email"
              className="w-full p-3 mb-3 border border-gray-200 rounded-xl focus:border-[#ED6A02] focus:ring-1 focus:ring-[#ED6A02] outline-none"
              placeholder="Email Address"
              required
            />
            <input
              type="tel"
              className="w-full p-3 mb-3 border border-gray-200 rounded-xl focus:border-[#ED6A02] focus:ring-1 focus:ring-[#ED6A02] outline-none"
              placeholder="Phone Number (optional)"
            />
            <input
              type="text"
              className="w-full p-3 mb-3 border border-gray-200 rounded-xl focus:border-[#ED6A02] focus:ring-1 focus:ring-[#ED6A02] outline-none"
              placeholder="Nationality"
              required
            />
            <div className="flex items-center gap-4 mb-3">
              <div className="vertical-text min-w-[40px] text-center font-bold text-[#2E7D32] text-sm">
                Arrival Date
              </div>
              <input
                type="date"
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:border-[#ED6A02] focus:ring-1 focus:ring-[#ED6A02] outline-none"
                required
              />
            </div>
            <input
              type="number"
              className="w-full p-3 mb-3 border border-gray-200 rounded-xl focus:border-[#ED6A02] focus:ring-1 focus:ring-[#ED6A02] outline-none"
              placeholder="Number of Travellers"
              required
            />
            <textarea
              className="w-full p-3 mb-4 border border-gray-200 rounded-xl focus:border-[#ED6A02] focus:ring-1 focus:ring-[#ED6A02] outline-none resize-none"
              rows={3}
              placeholder="Additional requests or travel dates..."
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2E7D32] to-[#1b5e20] text-white font-bold py-3 rounded-full hover:from-[#ED6A02] hover:to-[#c95a02] transition transform hover:-translate-y-0.5"
            >
              <i className="fas fa-paper-plane mr-2"></i> Send Booking Request
            </button>
          </form>
        </div>
      </div>

      {/* Add the missing keyframe animation for modal */}
      <style jsx global>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}