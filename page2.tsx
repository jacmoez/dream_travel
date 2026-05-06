'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import "./globals.css";

const HomePage: React.FC = () => {
  // --- Modal States ---
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState({ title: '', duration: '', description: '' });
  const [bookingPackageName, setBookingPackageName] = useState('');

  // --- Category State ---
  const [activeCategory, setActiveCategory] = useState<'travel' | 'golf'>('travel');

  // --- Carousel State ---
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = 4;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Refs for package carousels ---
  const travelCarouselRef = useRef<HTMLDivElement>(null);
  const golfCarouselRef = useRef<HTMLDivElement>(null);

  // --- Helper to create URL-friendly slug from package title ---
  const getPackageSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[&]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  // --- Golf Places Data with Images ---
  const golfPlaces = [
    {
      name: "Luang Prabang Golf Club",
      location: "Luang Prabang, Laos",
      holes: "18 Holes",
      yards: "7,200 yards",
      description: "A scenic riverside course surrounded by mountains, offering a relaxing yet challenging golf experience.",
      mapLink: "https://maps.google.com/?q=Luang+Prabang+Golf+Club",
      images: [
        "https://images.unsplash.com/photo-1592919505780-303950717480",
        "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa",
        "https://images.unsplash.com/photo-1505842465776-3d90f616310f",
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12"
      ]
    },
    {
      name: "Long Vien Golf Club",
      location: "Vientiane, Laos",
      holes: "18 Holes",
      yards: "6,850 yards",
      description: "One of the best maintained golf courses in Laos, featuring wide fairways and modern facilities.",
      mapLink: "https://maps.google.com/?q=Long+Vien+Golf+Club",
      images: [
        "https://images.unsplash.com/photo-1551524164-6cf2ac3fcb5b",
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
        "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
        "https://images.unsplash.com/photo-1603570419884-1b2c6d9c4c52"
      ]
    },
    {
      name: "SEA Games Golf Club",
      location: "Vientiane, Laos",
      holes: "27 Holes",
      yards: "7,100 yards",
      description: "Built for international tournaments, this course offers a challenging layout with wide greens.",
      mapLink: "https://maps.google.com/?q=SEA+Games+Golf+Club+Laos",
      images: [
        "https://images.unsplash.com/photo-1517649763962-0c623066013b",
        "https://images.unsplash.com/photo-1570111838200-3a3f1e8f9c89",
        "https://images.unsplash.com/photo-1603570419884-1b2c6d9c4c52",
        "https://images.unsplash.com/photo-1505842465776-3d90f616310f"
      ]
    },
    {
      name: "Dansavanh Golf & Country Club",
      location: "Vientiane Province, Laos",
      holes: "18 Holes",
      yards: "7,000 yards",
      description: "Located near the Laos–Thailand border, this course offers a peaceful environment with beautiful views.",
      mapLink: "https://maps.google.com/?q=Dansavanh+Golf+Club",
      images: [
        "https://images.unsplash.com/photo-1592919505780-303950717480",
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12",
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
        "https://images.unsplash.com/photo-1551524164-6cf2ac3fcb5b"
      ]
    },
    {
      name: "Lao Country Club",
      location: "Vientiane, Laos",
      holes: "18 Holes",
      yards: "6,500 yards",
      description: "One of the oldest golf courses in Laos, popular with both locals and tourists.",
      mapLink: "https://maps.google.com/?q=Lao+Country+Club",
      images: [
        "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
        "https://images.unsplash.com/photo-1505842465776-3d90f616310f",
        "https://images.unsplash.com/photo-1570111838200-3a3f1e8f9c89",
        "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa"
      ]
    },
    {
      name: "Lakeview Vientiane Golf Club",
      location: "Vientiane, Laos",
      holes: "18 Holes",
      yards: "7,300 yards",
      description: "A modern course with water hazards and scenic lake views, great for experienced players.",
      mapLink: "https://maps.google.com/?q=Lakeview+Vientiane+Golf+Club",
      images: [
        "https://images.unsplash.com/photo-1603570419884-1b2c6d9c4c52",
        "https://images.unsplash.com/photo-1551524164-6cf2ac3fcb5b",
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12"
      ]
    }
  ];

  // --- Travel Packages Data ---
  const travelPackages = [
    { title: "3 DAYS 2 NIGHTS VIENTIANE - LUANGPRABANG", duration: "3 DAYS 2 NIGHTS", img: "https://via.placeholder.com/280x160?text=Travel+Package" },
    { title: "4 DAYS 3 NIGHTS VIENTIANE – LUANG PRABANG", duration: "4 DAYS 3 NIGHTS", img: "https://via.placeholder.com/280x160?text=Travel+Package" },
    { title: "2 DAYS 1 NIGHT VTE - VV", duration: "2 DAYS 1 NIGHT", img: "https://media.nomadicmatt.com/2022/vangvieng1.jpeg" },
    { title: "4 DAYS 3 NIGHTS LPQ-VV-VTE", duration: "4 DAYS 3", img: "https://media.worldnomads.com/explore/laos/5-things-laos-social.jpg" },
    { title: "2 DAYS 1 NIGHT VTE - MF - VTE", duration: "2 DAYS 1 NIGHT", img: "https://www.golaos.tours/wp-content/uploads/2025/07/Laos-Travel-Budget-guide.jpg" },
    { title: "5 DAYS 4 NIGHTS HUX-PK-LPQ", duration: "5 DAYS 4 NIGHTS", img: "https://s27363.pcdn.co/wp-content/uploads/2024/11/Laos-Header-Image.jpg.webp" }
  ];

  // Map travel package title to the ID used in package detail component
  const travelPackageIdMap: Record<string, string> = {
    "3 DAYS 2 NIGHTS VIENTIANE - LUANGPRABANG": "three_days_two_nights_vte_lpq",
    "4 DAYS 3 NIGHTS VIENTIANE – LUANG PRABANG": "four_days_three_nights_vte_lpq",
    "2 DAYS 1 NIGHT VTE - VV": "two_days_one_night_vte_vv",
    "4 DAYS 3 NIGHTS LPQ-VV-VTE": "four_days_three_nights_lpq_vv_vte",
    "2 DAYS 1 NIGHT VTE - MF - VTE": "two_days_one_night_vte_mf",
    "5 DAYS 4 NIGHTS HUX-PK-LPQ": "five_days_four_nights_hux_pk_lpq",
  };

  // --- Golf Packages Data ---
  const golfPackages = [
    { title: "LP Golf Getaway", duration: "2 Rounds", desc: "Enjoy 2 rounds of golf at Luang Prabang Golf Club. Includes green fees, caddie, golf cart, and luxury accommodation.", img: "https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2018/06/06/5b172fb47abc957b64518a7b_GettyImages-942686126.jpg.rend.hgtvcom.966.644.suffix/1573243603510.jpeg" },
    { title: "Premium Golf Experience", duration: "3 Rounds", desc: "Premium golf experience with 3 rounds at top courses, luxury resort accommodation, spa treatment.", img: "https://media.npr.org/assets/img/2023/03/01/gettyimages-1410422468_wide-f64095a661d8b05ad0433ef9da08b1f83dd23d24.jpg" },
    { title: "Resort Golf Package", duration: "2N + 2R", desc: "Combine luxury resort stay with 2 rounds of golf. Includes accommodation, breakfast, green fees, and club rental.", img: "https://www.pgaresort.com/images/content/homepageclubslidersmallimg/palm-harbor---innisbrook-resort---golf---2024-folklore-films-_12-1-.jpg" },
  ];

  // Map golf package titles to the actual package ID (all point to the new 8‑day golf package)
  const golfPackageIdMap: Record<string, string> = {
    "LP Golf Getaway": "eight_days_seven_nights_golf_leisure",
    "Premium Golf Experience": "eight_days_seven_nights_golf_leisure",
    "Resort Golf Package": "eight_days_seven_nights_golf_leisure",
  };

  // Golf club ID mapping (used for dynamic routes)
  const golfClubIdMap: Record<string, string> = {
    "Luang Prabang Golf Club": "luang-prabang-golf-club",
    "Long Vien Golf Club": "long-vien-golf-club",
    "SEA Games Golf Club": "sea-games-golf-club",
    "Dansavanh Golf & Country Club": "dansavanh-golf-country-club",
    "Lao Country Club": "lao-country-club",
    "Lakeview Vientiane Golf Club": "lakeview-vientiane-golf-club"
  };

  // --- Popular Golf Packages Data ---
  const popularGolfData = [
    {
      title: "Family Golf Getaway",
      duration: "2 Rounds + Junior Clinic",
      desc: "2 rounds for adults + free junior clinic (ages 6-12). Family resort with pool, kids menu, and family tee times.",
      priceTag: "2 Rounds + Child Clinic",
      img: "https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2018/06/06/5b172fb47abc957b64518a7b_GettyImages-942686126.jpg.rend.hgtvcom.966.644.suffix/1573243603510.jpeg"
    },
    {
      title: "Premium Golf & Family",
      duration: "3 Rounds + Kids Camp",
      desc: "3 rounds at top courses, 2-night luxury stay, supervised kids golf camp (4+ hours) and family spa.",
      priceTag: "3 Rounds + Kids Camp",
      img: "https://media.npr.org/assets/img/2023/03/01/gettyimages-1410422468_wide-f64095a661d8b05ad0433ef9da08b1f83dd23d24.jpg"
    },
    {
      title: "Resort Stay & Play",
      duration: "2N + 2R + Child Meals",
      desc: "Luxury resort stay with 2 rounds of golf, complimentary child meals, and family-friendly activities.",
      priceTag: "2N + 2R + Child Meals",
      img: "https://www.pgaresort.com/images/content/homepageclubslidersmallimg/palm-harbor---innisbrook-resort---golf---2024-folklore-films-_12-1-.jpg"
    },
    {
      title: "Championship Junior",
      duration: "2R + Pro Lesson",
      desc: "2 championship rounds, professional caddie, plus free junior rental set and 1-hour lesson with pro.",
      priceTag: "2R + Pro Lesson",
      img: "https://media.npr.org/assets/img/2023/03/01/gettyimages-1410422468_wide-f64095a661d8b05ad0433ef9da08b1f83dd23d24.jpg"
    }
  ];

  // Map popular golf package titles to the actual package ID
  const popularGolfIdMap: Record<string, string> = {
    "Family Golf Getaway": "eight_days_seven_nights_golf_leisure",
    "Premium Golf & Family": "eight_days_seven_nights_golf_leisure",
    "Resort Stay & Play": "eight_days_seven_nights_golf_leisure",
    "Championship Junior": "eight_days_seven_nights_golf_leisure",
  };

  // --- Carousel Handlers (Hero) ---
  const goToSlide = useCallback((newIndex: number) => {
    if (isTransitioning) return;
    let target = newIndex;
    if (target < 0) target = totalSlides - 1;
    if (target >= totalSlides) target = 0;
    setIsTransitioning(true);
    setCarouselIndex(target);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => goToSlide(carouselIndex + 1), [carouselIndex, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(carouselIndex - 1), [carouselIndex, goToSlide]);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  // --- Modal Handlers (travel packages only) ---
  const openDetailModal = (title: string, duration: string, description: string) => {
    setCurrentPackage({ title, duration, description });
    setDetailModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

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

  const bookFromDetail = () => {
    closeDetailModal();
    openBookingModal(currentPackage.title);
  };

  // --- Form Handlers ---
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    alert('Booking request sent! We will contact you within 24 hours.');
    closeBookingModal();
  };

  // --- Package Category Toggle ---
  const showPackages = (category: 'travel' | 'golf') => {
    setActiveCategory(category);
  };

  // --- Scroll Handlers for Package Carousels ---
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const container = ref.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollTo({
        left: direction === 'left'
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // --- Golf Place Card Component with Swipe Slider & Dynamic Link ---
  const GolfPlaceCard: React.FC<{ place: typeof golfPlaces[0] }> = ({ place }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const isDragging = useRef(false);
    const startTransform = useRef(0);

    const totalImages = place.images.length;

    const goToImage = (newIndex: number) => {
      if (newIndex < 0) newIndex = totalImages - 1;
      if (newIndex >= totalImages) newIndex = 0;
      setCurrentIndex(newIndex);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
      isDragging.current = true;
      if (sliderRef.current) {
        startTransform.current = -currentIndex * 100;
        sliderRef.current.style.transition = 'none';
      }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging.current || !sliderRef.current) return;
      const deltaX = e.touches[0].clientX - startX.current;
      const movePercent = (deltaX / sliderRef.current.offsetWidth) * 100;
      const newPercent = startTransform.current + movePercent;
      sliderRef.current.style.transform = `translateX(${newPercent}%)`;
    };

    const handleTouchEnd = () => {
      if (!isDragging.current || !sliderRef.current) {
        if (sliderRef.current) sliderRef.current.style.transition = '';
        isDragging.current = false;
        return;
      }
      isDragging.current = false;
      const currentTransform = sliderRef.current.style.transform;
      const match = currentTransform.match(/translateX\(([-\d.]+)%\)/);
      if (match) {
        let percent = parseFloat(match[1]);
        let newIndex = Math.round(-percent / 100);
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= totalImages) newIndex = totalImages - 1;
        if (newIndex !== currentIndex) setCurrentIndex(newIndex);
      }
      sliderRef.current.style.transition = '';
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Mouse events for desktop drag
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      startX.current = e.clientX;
      isDragging.current = true;
      if (sliderRef.current) {
        startTransform.current = -currentIndex * 100;
        sliderRef.current.style.transition = 'none';
      }
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !sliderRef.current) return;
      const deltaX = e.clientX - startX.current;
      const movePercent = (deltaX / sliderRef.current.offsetWidth) * 100;
      const newPercent = startTransform.current + movePercent;
      sliderRef.current.style.transform = `translateX(${newPercent}%)`;
    };

    const handleMouseUp = () => {
      if (!isDragging.current || !sliderRef.current) {
        if (sliderRef.current) sliderRef.current.style.transition = '';
        isDragging.current = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        return;
      }
      isDragging.current = false;
      const currentTransform = sliderRef.current.style.transform;
      const match = currentTransform.match(/translateX\(([-\d.]+)%\)/);
      if (match) {
        let percent = parseFloat(match[1]);
        let newIndex = Math.round(-percent / 100);
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= totalImages) newIndex = totalImages - 1;
        if (newIndex !== currentIndex) setCurrentIndex(newIndex);
      }
      sliderRef.current.style.transition = '';
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }, [currentIndex]);

    const clubSlug = golfClubIdMap[place.name];

    return (
      <div className="place-card">
        <div
          className="place-image-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          style={{ cursor: 'grab', touchAction: 'pan-y pinch-y', overflow: 'hidden', position: 'relative', height: '220px' }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <div
              ref={sliderRef}
              style={{ display: 'flex', transition: 'transform 0.3s ease-out', height: '100%', willChange: 'transform' }}
            >
              {place.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${place.name} view ${idx + 1}`}
                  style={{ minWidth: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }}
                />
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 15 }}>
              {place.images.map((_, idx) => (
                <span
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); goToImage(idx); }}
                  style={{
                    width: idx === currentIndex ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: idx === currentIndex ? '#ED6A02' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="place-content">
          <h3 className="place-title">{place.name}</h3>
          <a href={place.mapLink} target="_blank" rel="noopener noreferrer">
            <div className="place-location">
              <i className="fas fa-map-marker-alt"></i><span>{place.location}</span>
            </div>
          </a>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#2E7D32', fontWeight: 600 }}>
            <span><i className="fas fa-flag" style={{ color: '#ED6A02', marginRight: '0.25rem' }}></i>{place.holes}</span>
            <span><i className="fas fa-ruler" style={{ color: '#ED6A02', marginRight: '0.25rem' }}></i>{place.yards}</span>
          </div>
          <p className="place-description">{place.description}</p>
          <div className="flex gap-2 mt-3">
            <Link href={`/golf/${clubSlug}`} className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs hover:bg-[#ED6A02] transition inline-block text-center">
              Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // --- Popular Golf Card Component (updated to use unified detail page) ---
  const PopularGolfCard: React.FC<{ pkg: typeof popularGolfData[0] }> = ({ pkg }) => {
    const packageId = popularGolfIdMap[pkg.title];
    return (
      <div className="package-card-new" style={{ cursor: 'pointer' }}>
        <div className="package-card-new-image">
          <img src={pkg.img} alt={pkg.title} />
        </div>
        <div className="package-card-new-overlay"></div>
        <div className="package-card-new-content">
          <h3 className="package-card-new-title">{pkg.title}</h3>
          <div className="package-card-new-price">{pkg.priceTag}</div>
          <p className="package-card-new-desc">{pkg.desc}</p>
          <div className="package-card-buttons">
            <Link href={`/package/${packageId}`} className="card-details-btn" onClick={(e) => e.stopPropagation()}>
              <i className="fas fa-info-circle"></i> Details
            </Link>
            <button className="card-book-btn" onClick={(e) => { e.stopPropagation(); openBookingModal(pkg.title); }}>
              <i className="fas fa-bookmark"></i> Book
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        /* Base styles */
        body {
          background: #f0f7f0;
          font-family: 'Inter', system-ui, sans-serif;
          margin: 0;
          padding: 0;
        }
        .carousel-height {
          height: 65vh;
          min-height: 420px;
        }
        .main-carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 40;
          opacity: 0.8;
          transition: all 0.3s ease;
          color: white;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          pointer-events: auto;
        }
        .main-carousel-arrow:hover {
          opacity: 1;
          transform: translateY(-50%) scale(1.2);
        }
        .main-carousel-arrow-left { left: 20px; }
        .main-carousel-arrow-right { right: 20px; }
        .main-carousel-arrow i { font-size: 2.5rem; }
        @media (max-width: 768px) {
          .main-carousel-arrow { width: 36px; height: 36px; }
          .main-carousel-arrow i { font-size: 2rem; }
          .main-carousel-arrow-left { left: 10px; }
          .main-carousel-arrow-right { right: 10px; }
        }
        .popular-trips-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) { .popular-trips-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .popular-trips-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .popular-trips-grid { grid-template-columns: 1fr; } }
        .package-category-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }
        .category-btn {
          padding: 0.6rem 1.8rem;
          border-radius: 9999px;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, #511703 0%, #996515 100%);
          color: white;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .category-btn:hover {
          background: linear-gradient(135deg, #ed5002 0%, #D4AF37 100%);
          transform: scale(1.05);
          color: white;
        }
        .packages-slider-section {
          position: relative;
          margin: 2rem 0;
        }
        .packages-grid-carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 0.5rem 0.25rem 1rem 0.25rem;
        }
        .packages-grid-carousel::-webkit-scrollbar { display: none; }
        .package-mini-card {
          flex: 0 0 auto;
          width: 280px;
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .package-mini-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
        }
        .package-mini-image { height: 160px; overflow: hidden; }
        .package-mini-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .package-mini-card:hover .package-mini-image img { transform: scale(1.1); }
        .package-mini-content { padding: 1rem; }
        .package-mini-title { font-weight: bold; font-size: 1.1rem; color: #2E7D32; margin-bottom: 0.25rem; }
        .package-mini-duration-text { font-size: 0.8rem; color: #ED6A02; font-weight: 600; margin-bottom: 0.5rem; display: block; }
        .package-mini-footer { display: flex; gap: 0.5rem; justify-content: space-between; align-items: center; }
        .package-mini-footer .btn-details {
          background-color: #ED6A02; color: white; padding: 0.3rem 1rem; border-radius: 9999px; font-size: 0.8rem;
          cursor: pointer; border: none; transition: background 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .package-mini-footer .btn-details:hover { background-color: #2E7D32; }
        .package-mini-footer .btn-book {
          background-color: #2E7D32; color: white; padding: 0.3rem 1rem; border-radius: 9999px; font-size: 0.8rem;
          cursor: pointer; border: none; transition: background 0.3s;
        }
        .package-mini-footer .btn-book:hover { background-color: #ED6A02; }
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          color: #2E7D32;
          font-size: 1.2rem;
          transition: all 0.2s;
          border: 1px solid #2E7D32;
          pointer-events: auto;
        }
        .slider-arrow:hover { background: #2E7D32; color: white; transform: translateY(-50%) scale(1.1); }
        .slider-arrow-left { left: -15px; }
        .slider-arrow-right { right: -15px; }
        .places-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        @media (max-width: 1024px) { .places-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .places-grid { grid-template-columns: 1fr; } }
        .place-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .place-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
        .place-content { padding: 1.5rem; flex: 1; }
        .place-title { font-size: 1.5rem; font-weight: 700; color: #2E7D32; margin-bottom: 0.5rem; }
        .place-location { display: flex; align-items: center; color: #ED6A02; font-size: 0.9rem; margin-bottom: 0.75rem; cursor: pointer; }
        .place-location i { margin-right: 0.5rem; }
        .place-description { color: #4B5563; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem; }
        .section-header { text-align: center; margin-bottom: 2.5rem; }
        .section-header h2 { font-size: 2.5rem; font-weight: 700; color: #2E7D32; margin-bottom: 0.5rem; }
        .section-divider { width: 100px; height: 4px; background: #ED6A02; margin: 1rem auto; border-radius: 2px; }
        .popular-packages-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) { .popular-packages-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .popular-packages-cards { grid-template-columns: 1fr; } }
        .package-card-new {
          background: linear-gradient(135deg, #2E7D32 0%, #1a4f1e 100%);
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
          transition: all 0.5s ease;
          position: relative;
          height: 380px;
          cursor: pointer;
        }
        .package-card-new:hover { transform: translateY(-15px) rotate(2deg); box-shadow: 0 30px 35px -10px rgba(0, 0, 0, 0.3); }
        .package-card-new-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
        .package-card-new-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
        .package-card-new:hover .package-card-new-image img { transform: scale(1.2); }
        .package-card-new-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(46, 125, 50, 0.92) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.3) 100%);
          z-index: 2;
        }
        .package-card-new-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          z-index: 3;
          color: white;
        }
        .package-card-new-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 0.3rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.6); }
        .package-card-new-price {
          font-size: 0.9rem; font-weight: 600; color: #FFD700; margin-bottom: 0.5rem;
          display: inline-block; background: rgba(0,0,0,0.55); padding: 0.2rem 0.8rem; border-radius: 9999px;
        }
        .package-card-new-desc {
          font-size: 0.85rem; line-height: 1.4; margin-bottom: 0.8rem; opacity: 0.95;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .package-card-buttons { display: flex; gap: 0.75rem; margin-top: 0.25rem; }
        .card-details-btn, .card-book-btn {
          flex: 1; padding: 0.5rem 0.8rem; border-radius: 2rem; font-weight: 600; font-size: 0.8rem;
          text-align: center; cursor: pointer; transition: all 0.25s ease; border: none;
          background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); color: white;
          border: 1px solid rgba(255,255,255,0.5);
          text-decoration: none;
        }
        .card-details-btn { background: rgba(237,106,2,0.85); border-color: #ffb347; }
        .card-book-btn { background: rgba(46,125,50,0.9); border-color: #8bc34a; }
        .card-details-btn:hover, .card-book-btn:hover { transform: scale(1.02); }
        .card-details-btn:hover { background: #ED6A02; }
        .card-book-btn:hover { background: #2E7D32; }
        .videos-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        @media (max-width: 768px) { .videos-grid { grid-template-columns: 1fr; } }
        .video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 0.75rem; }
        .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .carousel-btn-container {
          position: absolute; bottom: 20%; left: 0; right: 0; display: flex; justify-content: center;
          gap: 1.2rem; z-index: 30; pointer-events: none;
        }
        .carousel-btn-container .category-btn { pointer-events: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .contact-card { background: white; border-radius: 1.5rem; }
        .contact-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; }
        .form-input { width: 100%; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; }
        
        /* --- MODAL STYLES --- */
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.8);
          z-index: 2147483647;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          overflow: hidden;
        }
        .modal.active {
          display: flex;
        }
        .modal-content {
          background: white;
          border-radius: 2rem;
          max-width: 550px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 2rem;
          position: relative;
          animation: modalSlideIn 0.3s ease;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          margin: 0;
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.95) translateY(-20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-close { position:absolute; top: 1rem; right: 1.2rem; font-size: 1.8rem; cursor: pointer; color: #9ca3af; transition: color 0.2s; z-index: 10; }
        .modal-close:hover { color: #ED6A02; }
        .modal-icon { text-align: center; font-size: 3rem; color: #2E7D32; margin-bottom: 1rem; }
        .modal-title { text-align: center; font-size: 1.8rem; font-weight: 700; color: #2E7D32; margin-bottom: 0.5rem; }
        .modal-subtitle { text-align: center; color: #6B7280; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .modal-details { margin: 1.5rem 0; padding: 1rem; background: #f8faf8; border-radius: 1rem; }
        .detail-item { display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid #e2e8f0; }
        .detail-label { font-weight: 600; color: #2E7D32; }
        .modal-description { line-height: 1.6; color: #374151; margin: 1rem 0; }
        .modal-close-btn {
          background: linear-gradient(135deg, #2E7D32, #1b5e20); color: white; font-weight: 600;
          padding: 0.8rem; width: 100%; border-radius: 3rem; border: none; cursor: pointer; transition: all 0.3s;
        }
        .modal-close-btn:hover { background: linear-gradient(135deg, #ED6A02, #c95a02); transform: translateY(-2px); }
        .modal-input, .modal-select {
          width: 100%; padding: 0.9rem 1rem; margin-bottom: 1rem; border: 1.5px solid #e2e8f0;
          border-radius: 1rem; font-size: 1rem; background: white;
        }
        .modal-input:focus, .modal-select:focus { outline: none; border-color: #ED6A02; box-shadow: 0 0 0 3px rgba(237,106,2,0.15); }
        .modal-btn {
          background: linear-gradient(135deg, #2E7D32, #1b5e20); color: white; font-weight: 700;
          padding: 0.9rem; width: 100%; border-radius: 3rem; border: none; cursor: pointer;
          font-size: 1rem; transition: all 0.3s; margin-top: 0.5rem;
        }
        .modal-btn:hover { background: linear-gradient(135deg, #ED6A02, #c95a02); transform: translateY(-2px); }
        .flag-select { position: relative; margin-bottom: 1rem; }
        .flag-select select {
          width: 100%; padding: 0.9rem 1rem 0.9rem 2.8rem; border: 1.5px solid #e2e8f0;
          border-radius: 1rem; font-size: 1rem; background: white; cursor: pointer; appearance: none;
        }
        .flag-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.2rem; pointer-events: none; }
        .popular-golf-section, .section-container, .video-section { padding-left: 2rem; padding-right: 2rem; }
        @media (max-width: 768px) { .popular-golf-section, .section-container, .video-section { padding-left: 1rem; padding-right: 1rem; } }
        @media (max-width: 640px) {
          .modal { padding: 0; } 
          .modal-content {
            width: 100%;
            height: 100%; 
            max-height: 100%; 
            border-radius: 0;
            padding: 1.5rem 1rem;
            overflow-y: auto;
          }
          .modal-title { font-size: 1.5rem; }
          .flex.items-center.gap-4.mb-3 {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }
          .vertical-text {
            text-align: left;
            width: 100%;
            font-weight: bold;
            color: #374151;
            margin-bottom: 0;
          }
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          white-space: nowrap;
          font-weight: bold;
          color: #2E7D32;
          font-size: 0.9rem;
        }
      `}</style>

      <main className="flex-1 flex flex-col w-full m-0 p-0 bg-[#f0f7f0]">
        {/* Hero Carousel */}
        <div className="relative w-full shadow-xl">
          <div className="main-carousel-arrow main-carousel-arrow-left" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="main-carousel-arrow main-carousel-arrow-right" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div
            className="flex carousel-slide will-change-transform"
            style={{ transform: `translateX(-${carouselIndex * 100}%)`, transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none' }}
          >
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img src="/slider_images/slider_4.png" alt="Mist over mountains" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent pointer-events-none"></div>
            </div>
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img src="/slider_images/slider_1.png" alt="Mist over mountains" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent pointer-events-none"></div>
            </div>
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img src="/slider_images/slider_2.png" alt="Mist over mountains" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent pointer-events-none"></div>
            </div>
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img src="/slider_images/slider_3.png" alt="Mist over mountains" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
          <div className="carousel-btn-container">
            <Link href="/packages" className="category-btn travel">Travel Packages</Link>
            <Link href="/packages" className="category-btn golf">Golf Packages</Link>
          </div>
          <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 z-10">
            {[...Array(totalSlides)].map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === carouselIndex ? 'bg-[#ED6A02] w-6' : 'bg-white/70'}`}
                onClick={() => goToSlide(idx)}
              />
            ))}
          </div>
        </div>

        {/* YouTube Videos */}
        <div className="video-section">
          <div className="w-full bg-white py-8">
            <div className="full-width mx-auto">
              <h2 className="text-2xl font-bold text-[#2E7D32] mb-6 text-center">Discover Laos Through Video</h2>
              <div className="videos-grid">
                <div className="video-container rounded-xl shadow-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/Qjnjg4_TgXY?autoplay=1&mute=1&loop=1&playlist=Qjnjg4_TgXY"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Laos Travel Video 1"
                  ></iframe>
                </div>
                <div className="video-container rounded-xl shadow-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/5EhJtgttLyI?autoplay=1&mute=1&loop=1&playlist=5EhJtgttLyI"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Laos Travel Video 2"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Trips */}
        <div className="section-container">
          <div className="w-full full-width mx-auto py-8">
            <h2 className="text-2xl font-semibold text-[#2E7D32] mb-6 text-center border-b-2 border-[#ED6A02] pb-2 inline-block mx-auto block w-fit px-8">
              Popular Trips in Laos
            </h2>
            <div className="popular-trips-grid mt-8">
              <div className="trip-card">
                <Link href="/city/luang-prabang" className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2 h-full">
                  <img src="https://s27363.pcdn.co/wp-content/uploads/2024/11/Laos-Header-Image.jpg.webp" alt="Luang Prabang" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-[#2E7D32]">Luang Prabang</h3>
                    <p className="text-sm text-gray-600 mt-1">Ancient temples & alms giving ceremony</p>
                    <div className="flex gap-2 mt-3">
                      <span className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs hover:bg-[#ED6A02] transition inline-block">Details</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="trip-card">
                <Link href="/city/vang-vieng" className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2 h-full">
                  <img src="https://media.nomadicmatt.com/2022/vangvieng1.jpeg" alt="Vang Vieng" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-[#2E7D32]">Vang Vieng</h3>
                    <p className="text-sm text-gray-600 mt-1">Karst mountains & blue lagoons</p>
                    <div className="flex gap-2 mt-3">
                      <span className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs hover:bg-[#ED6A02] transition inline-block">Details</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="trip-card">
                <Link href="/city/kuang-si-falls" className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2 h-full">
                  <img src="https://media.worldnomads.com/explore/laos/5-things-laos-social.jpg" alt="Kuang Si Falls" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-[#2E7D32]">Kuang Si Falls</h3>
                    <p className="text-sm text-gray-600 mt-1">Turquoise waterfalls & jungle pools</p>
                    <div className="flex gap-2 mt-3">
                      <span className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs hover:bg-[#ED6A02] transition inline-block">Details</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="trip-card">
                <Link href="/city/plain-of-jars" className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2 h-full">
                  <img src="https://www.golaos.tours/wp-content/uploads/2025/07/Laos-Travel-Budget-guide.jpg" alt="Plain of Jars" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-[#2E7D32]">Plain of Jars</h3>
                    <p className="text-sm text-gray-600 mt-1">Megalithic archaeological mystery</p>
                    <div className="flex gap-2 mt-3">
                      <span className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs hover:bg-[#ED6A02] transition inline-block">Details</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Our Services Section with Package Sliders */}
        <div className="section-container" id="our_services">
          <div className="w-full full-width mx-auto">
            <h3 className="text-3xl font-bold text-[#2E7D32] mb-2 text-center mt-5">Our Services</h3>
            <div className="package-category-buttons">
              <button
                className={`category-btn travel ${activeCategory === 'travel' ? 'active' : ''}`}
                onClick={() => showPackages('travel')}
                style={activeCategory === 'travel' ? { background: "linear-gradient(135deg, #ed5002 0%, #D4AF37 100%)" } : {}}
              >
                Travel Packages
              </button>
              <button
                className={`category-btn golf ${activeCategory === 'golf' ? 'active' : ''}`}
                onClick={() => showPackages('golf')}
                style={activeCategory === 'golf' ? { background: "linear-gradient(135deg, #ed5002 0%, #D4AF37 100%)" } : {}}
              >
                Golf Packages
              </button>
            </div>

            {/* Travel Packages Slider */}
            <div className="packages-slider-section" style={{ display: activeCategory === 'travel' ? 'block' : 'none' }}>
              <div className="slider-arrow slider-arrow-left" onClick={(e) => { e.stopPropagation(); scrollCarousel(travelCarouselRef, 'left'); }}>
                <i className="fas fa-chevron-left"></i>
              </div>
              <div ref={travelCarouselRef} className="packages-grid-carousel">
                {travelPackages.map((pkg, idx) => {
                  const packageId = travelPackageIdMap[pkg.title];
                  return (
                    <div key={idx} className="package-mini-card">
                      <div className="package-mini-image">
                        <img src={pkg.img} alt={pkg.title} />
                      </div>
                      <div className="package-mini-content">
                        <div className="package-mini-title">{pkg.title}</div>
                        <div className="package-mini-duration-text">{pkg.duration}</div>
                        <div className="package-mini-footer">
                          <Link href={`/package/${packageId}`} className="btn-details">Details</Link>
                          <button className="btn-book" onClick={() => openBookingModal(pkg.title)}>Book</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="slider-arrow slider-arrow-right" onClick={(e) => { e.stopPropagation(); scrollCarousel(travelCarouselRef, 'right'); }}>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>

            {/* Golf Packages Slider (now links to the same detail page) */}
            <div className="packages-slider-section" style={{ display: activeCategory === 'golf' ? 'block' : 'none' }}>
              <div className="slider-arrow slider-arrow-left" onClick={(e) => { e.stopPropagation(); scrollCarousel(golfCarouselRef, 'left'); }}>
                <i className="fas fa-chevron-left"></i>
              </div>
              <div ref={golfCarouselRef} className="packages-grid-carousel">
                {golfPackages.map((pkg, idx) => {
                  const packageId = golfPackageIdMap[pkg.title];
                  return (
                    <div key={idx} className="package-mini-card">
                      <div className="package-mini-image">
                        <img src={pkg.img} alt={pkg.title} />
                      </div>
                      <div className="package-mini-content">
                        <div className="package-mini-title">{pkg.title}</div>
                        <div className="package-mini-duration-text">{pkg.duration}</div>
                        <div className="package-mini-footer">
                          <Link href={`/package/${packageId}`} className="btn-details">Details</Link>
                          <button className="btn-book" onClick={() => openBookingModal(pkg.title)}>Book</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="slider-arrow slider-arrow-right" onClick={(e) => { e.stopPropagation(); scrollCarousel(golfCarouselRef, 'right'); }}>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/packages" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg">
              View All Packages
            </Link>
            <Link href="/contactus" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg text-red-700 ml-4">
              Customize Package
            </Link>
          </div>
        </div>

        {/* Golf Places in Laos */}
        <div className="max-w-6xl mx-auto px-4 py-12" id="places">
          <div className="section-header">
            <h2>Golf Places in Laos</h2>
            <p>Swipe left/right on images to see more views — drag to slide</p>
            <div className="section-divider"></div>
          </div>
          <div className="places-grid">
            {golfPlaces.map((place, idx) => (
              <GolfPlaceCard key={idx} place={place} />
            ))}
          </div>
        </div>

        {/* Popular Golf Packages - updated to use unified detail page */}
        <div className="popular-golf-section">
          <div className="w-full py-12 mt-8">
            <div className="full-width mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center text-[#2E7D32]">Popular Golf Packages</h2>
              <p className="text-center mb-8 max-w-2xl mx-auto">Family-friendly packages — Details & Book buttons always visible</p>
              <div className="popular-packages-cards">
                {popularGolfData.map((pkg, idx) => (
                  <PopularGolfCard key={idx} pkg={pkg} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/packages" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg">
                  View All Packages
                </Link>
                <Link href="/contactus" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg text-red-700 ml-4">
                  Customize Packages
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="w-full max-w-6xl mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-center text-[#2E7D32] mb-6 sm:mb-8 mt-4 sm:mt-5 tracking-tight">Contact Us</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Info Column */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#2E7D32]/20 contact-card">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2E7D32] mb-4 sm:mb-6 flex items-center">
                <i className="fas fa-circle-info text-[#ED6A02] mr-2 sm:mr-3"></i> Contact Information
              </h2>
              <div className="flex items-start mb-4 sm:mb-6 group hover:bg-[#f0f7f0] p-2 sm:p-3 rounded-xl transition">
                <div className="bg-[#2E7D32]/10 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 group-hover:bg-[#ED6A02]/10 contact-icon">
                  <i className="fas fa-phone-alt text-xl sm:text-2xl text-[#2E7D32] group-hover:text-[#ED6A02]"></i>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">+856 205 825 0515</p>
                </div>
              </div>
              <div className="flex items-start mb-4 sm:mb-6 group hover:bg-[#f0f7f0] p-2 sm:p-3 rounded-xl transition">
                <div className="bg-[#2E7D32]/10 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 group-hover:bg-[#ED6A02]/10 contact-icon">
                  <i className="fas fa-envelope text-xl sm:text-2xl text-[#2E7D32] group-hover:text-[#ED6A02]"></i>
                </div>
                <div style={{ wordBreak: 'break-word' }}>
                  <p className="text-xs sm:text-sm text-gray-500">Email</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-800">dreamdestination.vtelaos@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start mb-6 sm:mb-8 group hover:bg-[#f0f7f0] p-2 sm:p-3 rounded-xl transition">
                <div className="bg-[#2E7D32]/10 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 group-hover:bg-[#ED6A02]/10 contact-icon">
                  <i className="fas fa-map-marker-alt text-xl sm:text-2xl text-[#2E7D32] group-hover:text-[#ED6A02]"></i>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Head Office</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">123 Main Street, Yangon</p>
                  <p className="text-xs sm:text-sm text-gray-500">Laos</p>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#2E7D32] mb-3 sm:mb-4 flex items-center">
                <i className="fas fa-share-alt text-[#ED6A02] mr-2"></i> Follow Us
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href="https://wa.me/8562012345678" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 border-2 border-[#2E7D32] flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                  <i className="fab fa-whatsapp text-xl sm:text-2xl" style={{ color: '#2E7D32' }}></i>
                </a>
                <a href="https://facebook.com/dreamdestination" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                  <i className="fab fa-facebook-f text-xl sm:text-2xl text-white"></i>
                </a>
                <a href="https://instagram.com/dreamdestination" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#FCAF45] rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                  <i className="fab fa-instagram text-xl sm:text-2xl text-white"></i>
                </a>
                <a href="https://tiktok.com/@dreamdestination" target="_blank" rel="noopener noreferrer" className="bg-black rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                  <i className="fab fa-tiktok text-xl sm:text-2xl text-white"></i>
                </a>
                <a href="https://linkedin.com/company/dreamdestination" target="_blank" rel="noopener noreferrer" className="bg-[#0A66C2] rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                  <i className="fab fa-linkedin-in text-xl sm:text-2xl text-white"></i>
                </a>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 italic">We typically respond within 24 hours on business days.</p>
            </div>

            {/* Email Form Column */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#2E7D32]/20 contact-card">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2E7D32] mb-4 sm:mb-6 flex items-center">
                <i className="fas fa-paper-plane text-[#ED6A02] mr-2 sm:mr-3"></i> Send us a message
              </h2>
              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-extrabold mb-1">First Name <span className='text-red-700'>*</span></label>
                    <input type="text" name="firstName" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold mb-1">Last Name <span className='text-red-700'>*</span></label>
                    <input type="text" name="lastName" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-extrabold mb-1">Email Address <span className='text-red-700'>*</span></label>
                  <input type="email" id="email" name="email" required className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-1">Phone Number (optional)</label>
                  <input type="tel" id="phone" name="phone" className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-extrabold mb-1">Message <span className='text-red-700'>*</span></label>
                  <textarea id="message" name="message" rows={4} required className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition resize-none"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-[#2E7D32] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-[#ED6A02] transition duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1">
                    <i className="fas fa-paper-plane mr-2"></i> Send Message
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-3 sm:mt-4">We'll never share your information. By submitting, you agree to our privacy policy.</p>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal (for travel packages only) */}
      <div className={`modal ${detailModalOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeDetailModal(); }}>
        <div className="modal-content">
          <span className="modal-close" onClick={closeDetailModal}>&times;</span>
          <div className="modal-icon"><i className="fas fa-mountain"></i></div>
          <h3 className="modal-title">{currentPackage.title}</h3>
          <div className="modal-details">
            <div className="detail-item"><span className="detail-label">Duration:</span><span>{currentPackage.duration}</span></div>
            <div className="modal-description">{currentPackage.description}</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="modal-btn" onClick={bookFromDetail} style={{ flex: 1 }}>Book Now</button>
            <button className="modal-close-btn" onClick={closeDetailModal} style={{ flex: 1 }}>Close</button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <div className={`modal ${bookingModalOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeBookingModal(); }}>
        <div className="modal-content">
          <span className="modal-close sticky" onClick={closeBookingModal}>&times;</span>
          <div className="modal-icon"><i className="fas fa-envelope-open-text"></i></div>
          <h3 className="modal-title">Request a Booking</h3>
          <p className="modal-subtitle">Booking: {bookingPackageName}</p>
          <form onSubmit={handleBookingSubmit}>
            <input type="hidden" name="packageName" value={bookingPackageName} />
            <div className="flex flex-wrap gap-4 mb-3">
              <input type="text" className="modal-input flex-1 min-w-[120px]" placeholder="First Name" required />
              <input type="text" className="modal-input flex-1 min-w-[120px]" placeholder="Last Name" required />
            </div>
            <input type="email" className="modal-input mb-3" placeholder="Email Address" required />
            <input type="tel" className="modal-input mb-3" placeholder="Phone Number (optional)" />
            <input type="text" className="modal-input mb-3" placeholder="Nationality" required />
            <div className="flex items-center gap-4 mb-3">
              <p className="flex items-center h-10 mb-5">Arrival Date</p>
              <input type="date" className="modal-input flex-1" required />
            </div>
            <input type="number" className="modal-input mb-3" placeholder="Number of Travellers" required />
            <textarea className="modal-input mb-3" rows={3} placeholder="Additional requests or travel dates..."></textarea>
            <button type="submit" className="modal-btn"><i className="fas fa-paper-plane"></i> Send Booking Request</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;