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
  "id": 1,
  "category": "Travel Images",
  "title": "Pak Beng",
  "img": "https://i.imgur.com/ask6IRG.jpeg",
 "subImages": ["https://i.imgur.com/ask6IRG.jpeg",
              "https://i.imgur.com/kmlSx4P.jpeg",
              "https://i.imgur.com/FNM2BjK.jpeg",
              "https://i.imgur.com/EWpEJqN.jpeg",
              "https://i.imgur.com/h0tuYMG.jpeg",
              "https://i.imgur.com/ZQKtUre.jpeg",
              "https://i.imgur.com/r4uIkFq.jpeg",
              "https://i.imgur.com/VI9wLjd.jpeg",
              "https://i.imgur.com/GwVFh0V.jpeg",
              "https://i.imgur.com/9rE4DTD.jpeg",
              "https://i.imgur.com/KFGXFMd.jpeg",
              "https://i.imgur.com/3xlmXwZ.jpeg",
              "https://i.imgur.com/OoEZmst.jpeg",
              "https://i.imgur.com/WFWu4e5.jpeg",
              "https://i.imgur.com/YggWjPc.jpeg",
              "https://i.imgur.com/VZBl9tU.jpeg",


]

    },
    {
      id: 2,
      category: 'Travel Images',
      title: 'Luang Prabang ',
      img: 'https://i.imgur.com/cznjozd.jpeg',
      subImages: [
              "https://i.imgur.com/cznjozd.jpeg",
              "https://i.imgur.com/MYpEtah.jpeg",
              "https://i.imgur.com/cCH9n9P.jpeg",
              "https://i.imgur.com/acUZuk0.jpeg",
              "https://i.imgur.com/ygrm2Sv.jpeg",
              "https://i.imgur.com/tGjM16t.jpeg",
              "https://i.imgur.com/zWNGHhM.jpeg",
              "https://i.imgur.com/HlWpwIW.jpeg",
              "https://i.imgur.com/DZZuQ3u.jpeg",
              "https://i.imgur.com/XXbavaS.jpeg",
              "https://i.imgur.com/fkZNE3x.jpeg",
              "https://i.imgur.com/FNepHPb.jpeg",
              "https://i.imgur.com/Ma1ghou.jpeg",
              "https://i.imgur.com/01SxE7h.jpeg",
              "https://i.imgur.com/WA9cbCj.jpeg",
              "https://i.imgur.com/nBcR0o8.jpeg",
              "https://i.imgur.com/FaE4k6M.jpeg",
              "https://i.imgur.com/tFStQhr.jpeg",
              "https://i.imgur.com/YVDOA0o.jpeg",
              "https://i.imgur.com/YrgMCAN.jpeg",
              "https://i.imgur.com/rbjHtqG.jpeg",
              "https://i.imgur.com/VWi3xrY.jpeg",
              "https://i.imgur.com/a5UoeFo.jpeg",
              "https://i.imgur.com/2OmcF39.jpeg",
              "https://i.imgur.com/OwFfaBX.jpeg", 
              "https://i.imgur.com/GIvYPLP.jpeg",
              "https://i.imgur.com/bthfIzH.jpeg",
              "https://i.imgur.com/pQe4itI.jpeg",
              "https://i.imgur.com/M3FTWux.jpeg",
              "https://i.imgur.com/jhTpvI1.jpeg",
              "https://i.imgur.com/ARnXy29.jpeg",
              "https://i.imgur.com/68Ws7Fg.jpeg",
              "https://i.imgur.com/qz2HoZo.jpeg",
              "https://i.imgur.com/yv0oX86.jpeg",
              "https://i.imgur.com/jXRoOx0.jpeg",
              "https://i.imgur.com/G7P8tFC.jpeg",
              "https://i.imgur.com/N2JvIjf.jpeg",
              "https://i.imgur.com/GYBpuLK.jpeg",
              "https://i.imgur.com/IfrezOn.jpeg",
              "https://i.imgur.com/g2qMtTH.jpeg",
              "https://i.imgur.com/slvDFMu.jpeg",
              "https://i.imgur.com/jn403u9.jpeg",
              "https://i.imgur.com/K7hFfTL.jpeg",
              "https://i.imgur.com/fB8aMF2.jpeg",
              "https://i.imgur.com/ewVIiEs.jpeg",
              "https://i.imgur.com/WQsj3gY.jpeg",
              "https://i.imgur.com/JWiv65g.jpeg",
              "https://i.imgur.com/eMrkN6W.jpeg",
              "https://i.imgur.com/mzxOH7o.jpeg",
              "https://i.imgur.com/4z6Jo3D.jpeg",
      ]
    },
    {
      id: 5,
      category: 'Travel Images',
      title: 'Vang Vieng',
      img: 'https://i.imgur.com/SUbg4Lb.jpeg',
      subImages: [
        "https://i.imgur.com/SUbg4Lb.jpeg",
        "https://i.imgur.com/Z5arzW4.jpeg",
        "https://i.imgur.com/s3x9huY.jpeg",
        "https://i.imgur.com/9poEEVl.jpeg",
        "https://i.imgur.com/1l6FKzI.jpeg",
        "https://i.imgur.com/MmhdQn6.jpeg",
        "https://i.imgur.com/Fhlo6gX.jpeg",
        "https://i.imgur.com/nMH1amA.jpeg",
        "https://i.imgur.com/CJ3Qu95.jpeg",
        "https://i.imgur.com/T5F1zGl.jpeg",
        "https://i.imgur.com/AA0uhkc.jpeg",
        "https://i.imgur.com/WEDivZq.jpeg",
        "https://i.imgur.com/IVcUEgd.jpeg",
        "https://i.imgur.com/R6bRdP2.jpeg",
        "https://i.imgur.com/mvca2EM.jpeg",
        "https://i.imgur.com/0sdLlrW.jpeg",
        "https://i.imgur.com/yc7feII.jpeg",
        "https://i.imgur.com/C3Wh9GP.jpeg",
        "https://i.imgur.com/Vq3zYMx.jpeg",
        "https://i.imgur.com/n0peyKI.jpeg",
        "https://i.imgur.com/fwzQ9Hx.jpeg",
        "https://i.imgur.com/kzmAXDR.jpeg",
        "https://i.imgur.com/69iPLXu.jpeg",
        "https://i.imgur.com/69iPLXu.jpeg",
        "https://i.imgur.com/dkoiZnj.jpeg",
        "https://i.imgur.com/g8qhIIG.jpeg",
        "https://i.imgur.com/pYIne6c.jpeg",
        "https://i.imgur.com/D5oLKnh.jpeg",
        "https://i.imgur.com/gC2jsNe.jpeg",
        "https://i.imgur.com/md7JTba.jpeg",
        "https://i.imgur.com/kfpKXzh.jpeg",
        "https://i.imgur.com/16nR5hH.jpeg",
        "https://i.imgur.com/25BnmCM.jpeg",
      ]
    },
    {
      id: 6,
      category: 'Travel Images',
      title: 'Champasak',
      img: 'https://i.imgur.com/CcqbEqO.jpeg',
      subImages: [
        "https://i.imgur.com/CcqbEqO.jpeg",
        "https://i.imgur.com/WcAkBMr.jpeg",
        "https://i.imgur.com/CJnmzDs.jpeg",
        "https://i.imgur.com/mYE7tIw.jpeg"
      ]
    },
    {
      id: 9,
      category: 'Travel Images',
      title: 'Vientiane',
      img: 'https://i.imgur.com/agPehZc.jpeg',
      subImages: [
        "https://i.imgur.com/agPehZc.jpeg",
        "https://i.imgur.com/b0jCu0S.jpeg",
        "https://i.imgur.com/i7Nd0zd.jpeg",
        "https://i.imgur.com/d6EQFbq.jpeg",
        "https://i.imgur.com/v7Nh7kn.jpeg",
        "https://i.imgur.com/U4ZpFdF.jpeg",
        "https://i.imgur.com/ibOzBVo.jpeg",
        "https://i.imgur.com/ExI3PBG.jpeg",
        "https://i.imgur.com/7vNuVm9.jpeg",
        "https://i.imgur.com/7wmxiNo.jpeg",
        "https://i.imgur.com/rYJO2LX.jpeg",
        "https://i.imgur.com/igRs76j.jpeg",
        "https://i.imgur.com/xUN2cae.jpeg",
      ]
    },
    
    // golf
    {
      id: 3,
      category: 'Golf Images',
      title: '',
      img: 'https://i.imgur.com/8GLWfNM.jpeg',
      subImages: [
        "https://i.imgur.com/8GLWfNM.jpeg",
        "https://i.imgur.com/gWt7Rav.jpeg",
        "https://i.imgur.com/pv1D9kn.jpeg",
        "https://i.imgur.com/e245TCA.jpeg",
        "https://i.imgur.com/JVPhgWk.jpeg",
        "https://i.imgur.com/x3Hi1cE.jpeg",
        "https://i.imgur.com/JUkGbSX.jpeg",
        "https://i.imgur.com/nPMJGmc.jpeg",
        "https://i.imgur.com/ZgpyWr7.jpeg",
        "https://i.imgur.com/jpYEbS8.jpeg",
        "https://i.imgur.com/SrPmRtD.jpeg",
        "https://i.imgur.com/XU1zWaH.jpeg",
        "https://i.imgur.com/XZvE8bz.jpeg",
        "https://i.imgur.com/yKLbHjP.jpeg",
        "https://i.imgur.com/aRon90B.jpeg",
        "https://i.imgur.com/LAjkAx8.jpeg",
        "https://i.imgur.com/ROl7cXI.jpeg",
        "https://i.imgur.com/BBj46pw.jpeg",
        "https://i.imgur.com/JXBibsR.jpeg",
        "https://i.imgur.com/tUDZpHK.jpeg",
        "https://i.imgur.com/DvCUwm4.jpeg",
        "https://i.imgur.com/HSCY4hR.jpeg",
        "https://i.imgur.com/Y7b37MJ.jpeg",
        "https://i.imgur.com/7s5pMGL.jpeg",
        "https://i.imgur.com/nvwDjla.jpeg",
        "https://i.imgur.com/qK8XEKt.jpeg",
        "https://i.imgur.com/4tIIfCr.jpeg",
        "https://i.imgur.com/sl2GMR9.jpeg",
        "https://i.imgur.com/xyF1dVM.jpeg",
        "https://i.imgur.com/i5mLMaT.jpeg",
        "https://i.imgur.com/Ks4taqi.jpeg",
        "https://i.imgur.com/yyzngAx.jpeg",
        "https://i.imgur.com/d4zYM75.jpeg",
        "https://i.imgur.com/K06xJJw.jpeg",
        "https://i.imgur.com/HP4egZI.jpeg",
        "https://i.imgur.com/jVsehmU.jpeg",
        "https://i.imgur.com/rMX1d06.jpeg",
        "https://i.imgur.com/YbSVjZR.jpeg",
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