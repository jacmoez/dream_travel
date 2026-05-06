'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  img: string;
  subImages: string[];
}

const GalleryPage: React.FC = () => {
  // ---------- Gallery Data ----------
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: 'Travel Images',
      title: 'Luang Prabang',
      img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
        'https://images.unsplash.com/photo-1545128485-c400e7702796?w=1200&q=80',
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
      ]
    },
    {
      id: 2,
      category: 'Travel Images',
      title: 'Vientiane City',
      img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
        'https://images.unsplash.com/photo-1590100576641-0cb2da3a7a53?w=1200&q=80'
      ]
    },
    {
      id: 3,
      category: 'Golf Images',
      title: 'Long Vien Golf Club',
      img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80',
        'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',
        'https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80',
        'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=1200&q=80'
      ]
    },
    {
      id: 4,
      category: 'Golf Images',
      title: 'Desert Safari Golf',
      img: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&q=80',
        'https://images.unsplash.com/photo-1593121925328-369cc8459c08?w=1200&q=80'
      ]
    },
    {
      id: 5,
      category: 'Travel Images',
      title: 'Vang Vieng Nature',
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80'
      ]
    },
    {
      id: 6,
      category: 'Travel Images',
      title: 'Ancient Temple',
      img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80',
        'https://images.unsplash.com/photo-1555902514-87f55256f525?w=1200&q=80',
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80'
      ]
    },
    {
      id: 7,
      category: 'Golf Images',
      title: 'Lao Golf Club',
      img: 'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=1200&q=80',
        'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80',
        'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80'
      ]
    },
    {
      id: 8,
      category: 'Golf Images',
      title: 'Night Golf',
      img: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80'
      ]
    },
    {
      id: 9,
      category: 'Travel Images',
      title: 'Mekong Sunset',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      subImages: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80'
      ]
    },
  ];

  // ---------- State ----------
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [currentSubImages, setCurrentSubImages] = useState<string[]>([]);
  const [lightboxImageLoaded, setLightboxImageLoaded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');

  // Refs for lightbox image and spinner
  const lbImageRef = useRef<HTMLImageElement>(null);
  const lbSpinnerRef = useRef<HTMLDivElement>(null);

  // Helper: get current item data
  const currentItem = galleryItems.find(item => item.id === currentItemId);

  // ---------- Filter Logic ----------
  const filteredItems = currentFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === currentFilter);

  const handleFilterClick = (filter: string) => {
    setCurrentFilter(filter);
  };

  // ---------- Lightbox Logic ----------
  const openLightbox = (id: number) => {
    const item = galleryItems.find(i => i.id === id);
    if (!item) return;
    setCurrentItemId(id);
    setCurrentSubImages(item.subImages);
    setCurrentSubIndex(0);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    setLightboxImageLoaded(false);
  };

  const loadSubImage = useCallback((index: number) => {
    if (!currentSubImages.length) return;
    if (index < 0) index = 0;
    if (index >= currentSubImages.length) index = currentSubImages.length - 1;
    setCurrentSubIndex(index);
    setLightboxImageLoaded(false);
    // The image onload event will set loaded true
  }, [currentSubImages]);

  const nextImage = useCallback(() => {
    if (currentSubIndex < currentSubImages.length - 1) {
      loadSubImage(currentSubIndex + 1);
    }
  }, [currentSubIndex, currentSubImages.length, loadSubImage]);

  const prevImage = useCallback(() => {
    if (currentSubIndex > 0) {
      loadSubImage(currentSubIndex - 1);
    }
  }, [currentSubIndex, loadSubImage]);

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
    setCurrentItemId(null);
    setCurrentSubImages([]);
    setCurrentSubIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, nextImage, prevImage]);

  // Image load handler
  const handleImageLoad = () => {
    setLightboxImageLoaded(true);
  };

  // ---------- Booking Modal Logic ----------
  const openBookingModal = (packageName?: string) => {
    if (packageName) setBookingPackage(packageName);
    setIsBookingModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    document.body.style.overflow = '';
    setBookingPackage('');
    setSelectedNationality('');
  };

  const sendBookingEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      alert('Booking Request Sent! We will contact you shortly.');
      closeBookingModal();
      btn.innerHTML = originalText;
      btn.disabled = false;
      form.reset();
    }, 1500);
  };

  const updateFlag = (value: string) => {
    const flag = value ? value.split(' ')[0] : '🌏';
    setSelectedNationality(value);
    // The flag icon is displayed via the span; we'll update it using a ref or just rely on state
  };

  // Set min date for date picker in modal
  const todayDate = new Date().toISOString().split('T')[0];

  // ---------- Render ----------
  return (
    <>
      <style>{`
        body { 
          background: #f0f7f0;
          font-family: 'Inter', system-ui, sans-serif; 
        }
        /* --- SAFETY NET FOR MOBILE MENU --- */
        @media (min-width: 768px) {
          #mobileMenu {
            display: none !important;
          }
        }
        .fleur-de-leah-regular {
          font-family: "Pinyon Script", cursive;
          font-weight: 400;
          letter-spacing: 2px;
        }
        /* Gallery & Lightbox Animation */
        .gallery-item {
          transition: all 0.4s ease-in-out;
          transform: scale(1);
          opacity: 1;
        }
        .gallery-item.hidden {
          display: none;
        }
        .gallery-item.fade-out {
          opacity: 0;
          transform: scale(0.9);
        }
        #lightbox {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .lb-thumb {
          opacity: 0.6;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        .lb-thumb:hover, .lb-thumb.active {
          opacity: 1;
          border-color: #ED6A02;
          transform: scale(1.05);
        }
        /* Modal Styles */
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          z-index: 10000;
          justify-content: center;
          align-items: center;
        }
        .modal.active {
          display: flex;
        }
        .modal-content {
          background: white;
          border-radius: 2rem;
          max-width: 550px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          padding: 2rem;
          position: relative;
          animation: modalSlideIn 0.3s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1.2rem;
          font-size: 1.8rem;
          cursor: pointer;
          color: #9ca3af;
          transition: color 0.2s;
        }
        .modal-close:hover { color: #ED6A02; }
        .modal-icon {
          text-align: center;
          font-size: 3rem;
          color: #2E7D32;
          margin-bottom: 1rem;
        }
        .modal-title {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 700;
          color: #2E7D32;
          margin-bottom: 0.5rem;
        }
        .modal-subtitle {
          text-align: center;
          color: #6B7280;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .modal-input, .modal-select {
          width: 100%;
          padding: 0.9rem 1rem;
          margin-bottom: 1rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 1rem;
          font-size: 1rem;
          background: white;
          box-sizing: border-box;
        }
        .modal-input:focus, .modal-select:focus {
          outline: none;
          border-color: #ED6A02;
          box-shadow: 0 0 0 3px rgba(237, 106, 2, 0.15);
        }
        .modal-btn {
          background: linear-gradient(135deg, #2E7D32, #1b5e20);
          color: white;
          font-weight: 700;
          padding: 0.9rem;
          width: 100%;
          border-radius: 3rem;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s;
          margin-top: 0.5rem;
        }
        .modal-btn:hover {
          background: linear-gradient(135deg, #ED6A02, #c95a02);
          transform: translateY(-2px);
        }
        .flag-select { position: relative; margin-bottom: 1rem; }
        .flag-select select {
          width: 100%;
          padding: 0.9rem 1rem 0.9rem 2.8rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 1rem;
          font-size: 1rem;
          background: white;
          cursor: pointer;
          appearance: none;
          box-sizing: border-box;
        }
        .flag-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .modal-content { width: 95%; padding: 1rem 1.25rem; border-radius: 1.5rem; margin: 1rem auto; box-sizing: border-box; }
          .modal { backdrop-filter: none; background: rgba(0, 0, 0, 0.85); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d2d2d;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ED6A02;
          border-radius: 10px;
        }
      `}</style>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl text-emerald-900 font-serif mb-3">Our Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Explore the World with Style & Precision. Click on a destination to view specific images.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => handleFilterClick('all')}
            className={`px-6 py-2 rounded-full border transition-all ${currentFilter === 'all' ? 'bg-emerald-700 text-white border-emerald-700' : 'border-emerald-700 text-emerald-700 hover:bg-emerald-50'}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterClick('Travel Images')}
            className={`px-6 py-2 rounded-full border transition-all ${currentFilter === 'Travel Images' ? 'bg-emerald-700 text-white border-emerald-700' : 'border-emerald-700 text-emerald-700 hover:bg-emerald-50'}`}
          >
            Travel Images
          </button>
          <button
            onClick={() => handleFilterClick('Golf Images')}
            className={`px-6 py-2 rounded-full border transition-all ${currentFilter === 'Golf Images' ? 'bg-emerald-700 text-white border-emerald-700' : 'border-emerald-700 text-emerald-700 hover:bg-emerald-50'}`}
          >
            Golf Images
          </button>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="far fa-sad-tear text-4xl mb-4"></i>
            <p>No destinations found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item group relative h-72 rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-200"
                onClick={() => openLightbox(item.id)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[#ED6A02] text-xs font-bold uppercase tracking-wider mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-white text-xl font-serif font-medium">{item.title}</h3>
                    <div className="mt-2 text-white/90 text-sm flex items-center gap-2">
                      <i className="fas fa-images"></i> View {item.subImages.length} Photos
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking CTA */}
        <div className="mt-20 bg-emerald-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#ED6A02] opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-emerald-400 opacity-20 rounded-full blur-2xl"></div>
          <h3 className="text-3xl md:text-4xl font-serif mb-4 relative z-10">Ready to Start Your Journey?</h3>
          <p className="mb-8 text-emerald-100 max-w-xl mx-auto relative z-10">Book your consultation today and let us craft a personalized itinerary just for you.</p>
          <button
            onClick={() => openBookingModal()}
            className="inline-block bg-[#ED6A02] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all transform hover:-translate-y-1 relative z-10 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </main>

      {/* LIGHTBOX MODAL */}
      <div
        id="lightbox"
        className={`fixed inset-0 z-[100] bg-black/95 ${isLightboxOpen ? 'flex' : 'hidden'} items-center justify-center transition-opacity duration-300 ${isLightboxOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.target === e.currentTarget && closeLightbox()}
      >
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white text-3xl md:text-4xl focus:outline-none z-[110] transition-colors bg-black/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-sm"
        >
          <i className="fas fa-times"></i>
        </button>
        <button
          onClick={prevImage}
          className="absolute left-2 md:left-6 text-white/60 hover:text-white text-4xl md:text-5xl focus:outline-none z-[110] transition-colors p-2 md:p-4 hover:bg-black/50 rounded-full"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 md:right-6 text-white/60 hover:text-white text-4xl md:text-5xl focus:outline-none z-[110] transition-colors p-2 md:p-4 hover:bg-black/50 rounded-full"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="relative w-full max-w-6xl h-[85vh] flex flex-col items-center justify-center p-4 md:p-8">
          <div className="relative w-full h-full max-h-[65vh] flex items-center justify-center bg-white/5 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
            <div
              ref={lbSpinnerRef}
              className={`absolute inset-0 flex items-center justify-center text-white ${lightboxImageLoaded ? 'hidden' : 'flex'}`}
            >
              <i className="fas fa-circle-notch fa-spin text-3xl"></i>
            </div>
            {currentItem && (
              <img
                ref={lbImageRef}
                src={currentSubImages[currentSubIndex]}
                alt={currentItem.title}
                className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${lightboxImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
              />
            )}
          </div>
          <div className="mt-6 w-full max-w-4xl flex flex-col items-center">
            <h3 className="text-white text-xl md:text-2xl font-serif drop-shadow-md mb-2">
              {currentItem?.title || ''}
            </h3>
            <p className="text-[#ED6A02] text-xs md:text-sm uppercase tracking-widest mb-4">
              {currentSubIndex + 1} / {currentSubImages.length}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full justify-center px-2 custom-scrollbar">
              {currentSubImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumb ${idx + 1}`}
                  className={`lb-thumb w-12 h-12 md:w-16 md:h-16 rounded object-cover cursor-pointer flex-shrink-0 ${idx === currentSubIndex ? 'active border-[#ED6A02]' : ''}`}
                  onClick={() => loadSubImage(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      <div className={`modal ${isBookingModalOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && closeBookingModal()}>
        <div className="modal-content">
          <span className="modal-close" onClick={closeBookingModal}>&times;</span>
          <div className="modal-icon"><i className="fas fa-envelope-open-text"></i></div>
          <h3 className="modal-title">Request a Booking</h3>
          <p className="modal-subtitle">{bookingPackage ? `Booking: ${bookingPackage}` : 'Fill in your details and we\'ll contact you'}</p>
          <form onSubmit={sendBookingEmail}>
            <input type="hidden" name="packageName" value={bookingPackage} />
            <input type="text" className="modal-input" placeholder="First Name" required />
            <input type="text" className="modal-input" placeholder="Last Name" required />
            <input type="email" className="modal-input" placeholder="Email Address" required />
            <input type="tel" className="modal-input" placeholder="Phone Number (optional)" />
            <input type="text" className="modal-input" placeholder="Nationality" required />
            <div className="flex flex-wrap items-center gap-4 mb-3">
                  <p className="flex items-center h-10 mb-5">Arrival Date</p>
                  <input
                    type="date"
                    className="modal-input flex-1 min-w-[150px]"
                    min={todayDate}
                    required
                  />
                </div>            
                <input type="number" className="modal-input" placeholder="Number of Travellers" required />
            <textarea className="modal-input" rows={3} placeholder="Additional requests or travel dates..."></textarea>
            <button type="submit" className="modal-btn"><i className="fas fa-paper-plane"></i> Send Booking Request</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;