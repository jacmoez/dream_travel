'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import "./globals.css";
import GallerySliderRow from './gallery_slide/page';
import ContactUs from './contactus/page';

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
  const totalSlides = 5;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slideTexts = [
    'Trek through misty peaks',
    'Paddle across crystal-clear waters',
    'Wander along ancient woodland paths',
    'Watch the golden hour paint the sky',
    'Stroll along windswept cliffs'
  ];

  const travelCarouselRef = useRef<HTMLDivElement>(null);
  const golfCarouselRef = useRef<HTMLDivElement>(null);

  const getPackageSlug = (title: string) => {
    return title.toLowerCase().replace(/[&]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // --- Golf Places Data with SINGLE image ---
  const golfPlaces = [
    {
      name: "Long Vien Golf Club",
      city: "Vientiane",
      location: "Long Vien Golf Club, Vientiane, Laos",
      holes: "18 Holes",
      yards: "6,850 yards",
      description: "One of the best maintained golf courses in Laos, featuring wide fairways and modern facilities.",
      mapLink: "https://maps.google.com/?q=Long+Vien+Golf+Club+Vientiane",
      image: "https://i.imgur.com/M7rWEZK.jpeg"
    },
    {
      name: "Lakeview Vientiane Golf Club",
      city: "Vientiane",
      location: "Lakeview Vientiane Golf Club, Vientiane, Laos",
      holes: "18 Holes",
      yards: "7,300 yards",
      description: "A modern course with water hazards and scenic lake views, great for experienced players.",
      mapLink: "https://maps.google.com/?q=Lakeview+Vientiane+Golf+Club",
      image: "https://i.imgur.com/nZqSXz6.jpeg"
    },
    {
      name: "SEA Games Golf Club",
      city: "Vientiane",
      location: "SEA Games Golf Club, Vientiane, Laos",
      holes: "27 Holes",
      yards: "7,100 yards",
      description: "Built for international tournaments, this course offers a challenging layout with wide, undulating greens.",
      mapLink: "https://maps.google.com/?q=SEA+Games+Golf+Club+Vientiane",
      image: "https://i.imgur.com/rDMj7bS.jpeg"
    },
    {
      name: "Lao Country Club",
      city: "Vientiane",
      location: "Lao Country Club, Vientiane, Laos",
      holes: "18 Holes",
      yards: "6,500 yards",
      description: "One of the oldest golf courses in Laos, popular with both locals and tourists for its classic charm.",
      mapLink: "https://maps.google.com/?q=Lao+Country+Club+Vientiane",
      image: "https://i.imgur.com/x4A7hpH.jpeg"
    },
    {
      name: "Dansavanh Golf Club",
      city: "Vientiane Province",
      location: "Dansavanh Golf Club, Vientiane Province, Laos",
      holes: "18 Holes",
      yards: "7,200 yards",
      description: "A scenic riverside course surrounded by mountains, offering a relaxing yet challenging golf experience.",
      mapLink: "https://maps.google.com/?q=Dansavanh+Golf+Club+Laos",
      image: "https://i.imgur.com/GK6YDQS.jpeg"
    },
    {
      name: "Mekong Golf Club",
      city: "Vientiane",
      location: "Mekong Golf Club, Vientiane, Laos",
      holes: "18 Holes",
      yards: "7,300 yards",
      description: "A modern championship course along the Mekong River, with wide fairways and breathtaking sunset views.",
      mapLink: "https://maps.google.com/?q=Mekong+Golf+Club+Vientiane",
      image: "https://i.imgur.com/kVV2Z5z.jpeg"
    },
    {
      name: "Vang Vieng Golf Club",
      city: "Vang Vieng",
      location: "Vang Vieng Golf Club, Vang Vieng, Laos",
      holes: "18 Holes",
      yards: "6,500 yards",
      description: "A picturesque course set amid limestone karsts and rice paddies, perfect for a relaxed round in nature.",
      mapLink: "https://maps.google.com/?q=Vang+Vieng+Golf+Club+Laos",
      image: "https://i.imgur.com/BIHfV2W.jpeg"
    },
    {
      name: "Luang Prabang Golf Club",
      city: "Luang Prabang",
      location: "Luang Prabang Golf Club, Luang Prabang, Laos",
      holes: "18 Holes",
      yards: "7,200 yards",
      description: "A tranquil highland course surrounded by misty mountains and UNESCO heritage landscapes.",
      mapLink: "https://maps.google.com/?q=Luang+Prabang+Golf+Club",
      image: "https://i.imgur.com/B2fjoxj.jpeg"
    },
  ];

  // --- Travel Packages Data (with prices) ---
  const travelPackages = [
    { title: "Vientiane- Luang Prabang", duration: "3 DAYS 2 NIGHTS", price: "From USD 336 / person", img: "https://i.imgur.com/4QhvN7F.jpeg" },
    { title: "Vientiane - Luang Prabang", duration: "4 DAYS 3 NIGHTS", price: "From USD 486 / person", img: "https://i.imgur.com/TX7Xt7r.jpeg" },
    { title: "Vientiane- Vang Vieng ", duration: "2 DAYS 1 NIGHT", price: "From USD 463 / person", img: "https://i.imgur.com/J4OGK1a.jpeg" },
    { title: "Luang Prabang-Vang Vieng-Vientiane  ", duration: "4 DAYS 3 NIGHTS", price: "From USD 554 / person", img: "https://i.imgur.com/4HTtNcg.jpeg" },
    { title: "Vientiane-Mueng Fueng-Vientiane", duration: "2 DAYS 1 NIGHT", price: "From USD 240 / person", img: "https://i.imgur.com/SJlpWSx.jpeg" },
    { title: "Huay Xai-Pakbeng-Luang Prabang", duration: "5 DAYS 4 NIGHTS", price: "From USD 1334 / person", img: "https://i.imgur.com/V8TST5G.jpeg" },
    { title: "Vientiane-Vang Vieng-Luang Prabang", duration: "3 DAYS 2 NIGHTS", price: "From USD 336 / person", img: "https://i.imgur.com/UZI13Qj.jpeg" },
    { title: "Luang Prabang-Heritage Escape", duration: "3 DAYS 2 NIGHTS", price: "From USD 240 / person", img: "https://i.imgur.com/pd2ByH1.jpeg" },
    { title: "Vang Vieng Adventrue Day Trip", duration: "FULL DAY", price: "From USD 95 / person", img: "https://i.imgur.com/4AvfdfO.jpeg" },
    { title: "Vientiane Capital Discovery", duration: "FULL DAY", price: "From USD 95 / person", img: "https://i.imgur.com/B6vdCe4.jpeg" },
    { title: "Luang Prabang-Vang Vieng Explorer", duration: "4 DAYS 3 NIGHTS", price: "From USD 390 / person", img: "https://i.imgur.com/sG5jnE9.jpeg" },
    { title: "Soouthern Laos & 4,000 Islands Escape", duration: "4 DAYS 3 NIGHTS", price: "From USD 350 / person", img: "https://i.imgur.com/7IjbO0Z.jpeg" },
  ];

  const travelPackageIdMap: Record<string, string> = {
    "Vientiane- Luang Prabang": "three_days_two_nights_vte_lpq",
    "Vientiane - Luang Prabang": "four_days_three_nights_vte_lpq",
    "Vientiane- Vang Vieng ": "two_days_one_night_vte_vv",
    "Luang Prabang-Vang Vieng-Vientiane  ": "four_days_three_nights_lpq_vv_vte",
    "Vientiane-Mueng Fueng-Vientiane": "two_days_one_night_vte_mf",
    "Huay Xai-Pakbeng-Luang Prabang": "five_days_four_nights_hux_pk_lpq",
    "Vientiane-Vang Vieng-Luang Prabang": "three_days_two_nights_vte_vv_lpq",
    "Luang Prabang-Heritage Escape": "three_day_two_nights_luangpraband_heritage_escape",
    "Vang Vieng Adventrue Day Trip": "vang_vieng_adventure_day_trip",
    "Vientiane Capital Discovery": "vientiane_capital_discovery",
    "Luang Prabang-Vang Vieng Explorer": "luang_prabang_vang_vieng_explorer",
    "Soouthern Laos & 4,000 Islands Escape": "southern_laos_4000_islands_escape",
  };

  // --- Golf Packages Carousel Data (with prices) ---
  const golfPackages = [
    {
      title: "Standard 2 Rounds in Vientiane",
      duration: "4 Days / 3 Nights  ( 2 Rounds )",
      price: "From USD 380/person ",
      img: "https://i.imgur.com/K6gOupW.jpeg"
    },
    {
      title: "Premium 2 Rounds in Vientiane",
      duration: "4 Days / 3 Nights  ( 2 Rounds ) ",
      price: "From USD 450/person",
      img: "https://i.imgur.com/rDMj7bS.jpeg"
    },
    {
      title: "Premium 3 Rounds in Vientiane",
      duration: "5 Days / 4 Nights  ( 3 Rounds )",
      price: "From USD 600/person", 
      img: "https://i.imgur.com/mYjfy1N.jpeg"
    },
    {
      title: "Vientiane & MountainsView 3 Rounds in Vientiane",
      duration: "5 Days / 4 Nights  ( 3 Rounds )",
      price: "From USD 600/person ",
      img: "https://i.imgur.com/d9PqrYs.jpeg"
    },
    {
      title: "Four Fairways 4 Rounds in Vientiane",
      duration: "6 Days / 5 Nights  ( 4 Rounds ) ",
      price: "From USD 750/person",
      img: "https://i.imgur.com/oCWj2un.jpeg"
    },
    {
      title: "Luang Prabang Golf & Culture Tour",
      duration: "4 Days / 3 Nights",
      price: "From USD 310/person",
      img: "https://i.imgur.com/B2fjoxj.jpeg"
    },
  ];

  const golfPackageIdMap: Record<string, string> = {
    "Standard 2 Rounds in Vientiane": "standard_two_rounds_in_vientiane",
    "Premium 2 Rounds in Vientiane": "premium_two_rounds_in_vientiane",
    "Premium 3 Rounds in Vientiane": "premium_three_rounds_in_vientiane",
    "Vientiane & MountainsView 3 Rounds in Vientiane": "vientiane_mountainsview_three_rounds_in_vientiane",
    "Four Fairways 4 Rounds in Vientiane": "four_fairways_four_rounds_in_vientiane",
    "Luang Prabang Golf & Culture Tour": "luang_prabang_golf_culture_tour",
  };

  // --- Golf Club ID Map (typo left unchanged as requested) ---
  const golfClubIdMap: Record<string, string> = {
    "Dansavanh Golf Club": "dansavanh_golf_club",
    "Luang Prabang Golf Club": "luang-prabang-golf-club",
    "Long Vien Golf Club": "long-vien-golf-club",
    "SEA Games Golf Club": "sea-games-golf-club",
    "Country Club": "dansavanh-golf-country-club",
    "Lao Country Club": "lao-country-club",
    "Lakeview Vientiane Golf Club": "lakeview-vientiane-golf-club",
    "Mekong Golf Club": "mekong_golf_club",
    "Vang Vieng Golf Club": "vang_vieng_golf_club"
  };

  // --- Popular Golf Packages List (UPDATED to match the actual golf packages) ---
  const golfPackagesList = [
    {
      name: "Standard 2 Rounds in Vientiane",
      slug: "standard_two_rounds_in_vientiane",
      image: "https://i.imgur.com/K6gOupW.jpeg",
      duration: "4 Days / 3 Nights (2 Rounds)",
      price: "From USD 380/person",
    },
    {
      name: "Premium 2 Rounds in Vientiane",
      slug: "premium_two_rounds_in_vientiane",
      image: "https://i.imgur.com/rDMj7bS.jpeg",
      duration: "4 Days / 3 Nights (2 Rounds)",
      price: "From USD 450/person",
    },
    {
      name: "Premium 3 Rounds in Vientiane",
      slug: "premium_three_rounds_in_vientiane",
      image: "https://i.imgur.com/mYjfy1N.jpeg",
      duration: "5 Days / 4 Nights (3 Rounds)",
      price: "From USD 600/person",
    },
    {
      name: "Vientiane & MountainsView 3 Rounds in Vientiane",
      slug: "vientiane_mountainsview_three_rounds_in_vientiane",
      image: "https://i.imgur.com/d9PqrYs.jpeg",
      duration: "5 Days / 4 Nights (3 Rounds)",
      price: "From USD 600/person",
    },
    {
      name: "Four Fairways 4 Rounds in Vientiane",
      slug: "four_fairways_four_rounds_in_vientiane",
      image: "https://i.imgur.com/oCWj2un.jpeg",
      duration: "6 Days / 5 Nights (4 Rounds)",
      price: "From USD 750/person",
    },
    {
      name: "Luang Prabang Golf & Culture Tour",
      slug: "luang_prabang_golf_culture_tour",
      image: "https://i.imgur.com/B2fjoxj.jpeg",
      duration: "4 Days / 3 Nights",
      price: "From USD 310/person",
    }
  ];

  const popularGolfIdMap: Record<string, string> = {};
  golfPackagesList.forEach(pkg => { popularGolfIdMap[pkg.name] = pkg.slug; });

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

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [nextSlide]);

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

  const [bookingFirstName, setBookingFirstName] = useState('');
  const [bookingLastName, setBookingLastName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingNationality, setBookingNationality] = useState('');
  const [bookingArrivalDate, setBookingArrivalDate] = useState('');
  const [bookingTravellers, setBookingTravellers] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBookingSubmitting(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: bookingFirstName,
          lastName: bookingLastName,
          email: bookingEmail,
          phone: bookingPhone,
          nationality: bookingNationality,
          arrivalDate: bookingArrivalDate,
          travellers: bookingTravellers,
          message: bookingMessage,
          packageName: bookingPackageName,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send booking request");
      alert("Booking request sent! We will contact you within 24 hours.");
      closeBookingModal();
      setBookingFirstName(''); setBookingLastName(''); setBookingEmail(''); setBookingPhone('');
      setBookingNationality(''); setBookingArrivalDate(''); setBookingTravellers(''); setBookingMessage('');
    } catch (error) {
      console.error("Booking form error:", error);
      alert(error instanceof Error ? error.message : "Failed to send booking request. Please try again later.");
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const showPackages = (category: 'travel' | 'golf') => { setActiveCategory(category); };

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const container = ref.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollTo({ left: direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  // --- Simplified GolfPlaceCard: static image, no slideshow ---
  const GolfPlaceCard: React.FC<{ place: typeof golfPlaces[0] }> = ({ place }) => {
    const clubSlug = golfClubIdMap[place.name];
    return (
      <div className="place-card">
        <div className="place-image" style={{ height: '220px', overflow: 'hidden' }}>
          <img src={place.image} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="place-content">
          <h3 className="place-title">{place.name}</h3>
          <a href={place.mapLink} target="_blank" rel="noopener noreferrer">
            <div className="place-location"><i className="fas fa-map-marker-alt"></i><span>{place.location}</span></div>
          </a>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#2E7D32', fontWeight: 600 }}>
            <span><i className="fas fa-flag" style={{ color: '#ED6A02', marginRight: '0.25rem' }}></i>{place.holes}</span>
            <span><i className="fas fa-ruler" style={{ color: '#ED6A02', marginRight: '0.25rem' }}></i>{place.yards}</span>
          </div>
          <p className="place-description">{place.description}</p>
          <div className="flex gap-2 mt-3">
            <Link href={`/golf/${clubSlug}`} className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs hover:bg-[#ED6A02] transition inline-block text-center">Details</Link>
          </div>
        </div>
      </div>
    );
  };

  const PopularGolfCard: React.FC<{ pkg: typeof golfPackagesList[0] }> = ({ pkg }) => {
    const packageId = popularGolfIdMap[pkg.name];
    return (
      <div className="package-card-new" style={{ cursor: 'pointer' }}>
        <div className="package-card-new-image"><img src={pkg.image} alt={pkg.name} /></div>
        <div className="package-card-new-overlay"></div>
        <div className="package-card-new-content text-center">
          <h3 className="package-card-new-title">{pkg.name}</h3>
          <div className="package-card-new-price text-center">{pkg.duration} <br></br> {pkg.price}</div>
          <p className="package-card-new-desc  text-center ">minium player : 4</p>
          <div className="package-card-buttons">
            <Link href={`/golf_package_detail/${packageId}`} className="card-details-btn" onClick={(e) => e.stopPropagation()}><i className="fas fa-info-circle"></i> Details</Link>
            <button className="card-book-btn" onClick={(e) => { e.stopPropagation(); openBookingModal(pkg.name); }}><i className="fas fa-bookmark"></i> Book</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        body { background: #f0f7f0; font-family: 'Inter', system-ui, sans-serif; margin: 0; padding: 0; }
        .carousel-height { height: 65vh; min-height: 420px; }
        .main-carousel-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 40; opacity: 0.8; transition: all 0.3s ease; color: white; text-shadow: 0 2px 5px rgba(0,0,0,0.3); pointer-events: auto; }
        .main-carousel-arrow:hover { opacity: 1; transform: translateY(-50%) scale(1.2); }
        .main-carousel-arrow-left { left: 20px; }
        .main-carousel-arrow-right { right: 20px; }
        .main-carousel-arrow i { font-size: 2.5rem; }
        @media (max-width: 768px) { .main-carousel-arrow { width: 36px; height: 36px; } .main-carousel-arrow i { font-size: 2rem; } .main-carousel-arrow-left { left: 10px; } .main-carousel-arrow-right { right: 10px; } }
        
        .popular-trips-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin: 0 auto; }
        .trip-card { flex: 0 0 calc(25% - 1.5rem); max-width: calc(25% - 1.5rem); }
        @media (max-width: 1200px) { .trip-card { flex: 0 0 calc(33.333% - 1.5rem); max-width: calc(33.333% - 1.5rem); } }
        @media (max-width: 992px) { .trip-card { flex: 0 0 calc(50% - 1.5rem); max-width: calc(50% - 1.5rem); } }
        @media (max-width: 768px) { .trip-card { flex: 0 0 calc(100% - 1.5rem); max-width: calc(100% - 1.5rem); } }
        
        .package-category-buttons { display: flex; justify-content: center; gap: 1rem; margin: 2rem 0; flex-wrap: wrap; }
        .category-btn { padding: 0.6rem 1.8rem; border-radius: 9999px; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; border: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background: linear-gradient(135deg, #511703 0%, #996515 100%); color: white; white-space: nowrap; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
        .category-btn:hover { background: linear-gradient(135deg, #ed5002 0%, #D4AF37 100%); transform: scale(1.05); color: white; }
        
        .packages-slider-section { position: relative; margin: 2rem 0; }
        .packages-grid-carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 0.5rem 0.25rem 1rem 0.25rem;
          align-items: stretch;
        }
        .packages-grid-carousel::-webkit-scrollbar { display: none; }
        .package-mini-card {
          flex: 0 0 auto;
          width: 280px;
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .package-mini-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
        }
        .package-mini-image { height: 160px; overflow: hidden; }
        .package-mini-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .package-mini-card:hover .package-mini-image img { transform: scale(1.1); }
        .package-mini-content {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          text-align: center;
        }
        .package-mini-title { font-weight: bold; font-size: 1.1rem; color: #2E7D32; margin-bottom: 0.25rem; }
        .package-mini-duration-text {
          font-size: 0.8rem;
          color: #ED6A02;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
          flex: 0 0 auto;
        }
        .package-mini-footer {
          margin-top: auto;
          display: flex;
          gap: 0.5rem;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.5rem;
          border-top: 1px solid #e5e7eb;
        }
        .package-mini-footer .btn-details {
          background-color: #ED6A02;
          color: white;
          padding: 0.3rem 1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          cursor: pointer;
          border: none;
          transition: background 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .package-mini-footer .btn-details:hover { background-color: #2E7D32; }
        .package-mini-footer .btn-book {
          background-color: #2E7D32;
          color: white;
          padding: 0.3rem 1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          cursor: pointer;
          border: none;
          transition: background 0.3s;
        }
        .package-mini-footer .btn-book:hover { background-color: #ED6A02; }
        
        .slider-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 20; box-shadow: 0 4px 8px rgba(0,0,0,0.2); color: #2E7D32; font-size: 1.2rem; transition: all 0.2s; border: 1px solid #2E7D32; pointer-events: auto; }
        .slider-arrow:hover { background: #2E7D32; color: white; transform: translateY(-50%) scale(1.1); }
        .slider-arrow-left { left: -15px; }
        .slider-arrow-right { right: -15px; }
        
        .places-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem; }
        @media (max-width: 1024px) { .places-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .places-grid { grid-template-columns: 1fr; } }
        
        .place-card { background: white; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); transition: all 0.3s ease; height: 100%; display: flex; flex-direction: column; }
        .place-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }
        .place-image { height: 220px; overflow: hidden; }
        .place-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .place-card:hover .place-image img { transform: scale(1.05); }
        .place-content { padding: 1.5rem; flex: 1; }
        .place-title { font-size: 1.5rem; font-weight: 700; color: #2E7D32; margin-bottom: 0.5rem; }
        .place-location { display: flex; align-items: center; color: #ED6A02; font-size: 0.9rem; margin-bottom: 0.75rem; cursor: pointer; }
        .place-location i { margin-right: 0.5rem; }
        .place-description { color: #4B5563; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem; }
        
        .section-header { text-align: center; margin-bottom: 2.5rem; }
        .section-header h2 { font-size: 2.5rem; font-weight: 700; color: #2E7D32; margin-bottom: 0.5rem; }
        .section-divider { width: 100px; height: 4px; background: #ED6A02; margin: 1rem auto; border-radius: 2px; }
        
        .popular-packages-cards {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          margin: 0 auto;
        }
        .popular-packages-cards .package-card-new {
          flex: 0 0 auto;
          width: 280px;
          height: 380px;
        }
        
        @media (max-width: 1024px) { .popular-packages-cards .package-card-new { width: calc(50% - 1rem); } }
        @media (max-width: 640px) { .popular-packages-cards .package-card-new { width: 100%; } }
        
        .package-card-new {
          background: linear-gradient(135deg, #2E7D32 0%, #1a4f1e 100%);
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
          transition: all 0.5s ease;
          position: relative;
          height: 380px;
          cursor: pointer;
        }
        .package-card-new:hover { transform: translateY(-15px) rotate(2deg); box-shadow: 0 30px 35px -10px rgba(0,0,0,0.3); }
        .package-card-new-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
        .package-card-new-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
        .package-card-new:hover .package-card-new-image img { transform: scale(1.2); }
        .package-card-new-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(46, 125, 50, 0.92) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.3) 100%); z-index: 2; }
        .package-card-new-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; z-index: 3; color: white; }
        .package-card-new-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 0.3rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.6); }
        .package-card-new-price { font-size: 0.9rem; font-weight: 600; color: #FFD700; margin-bottom: 0.5rem; display: inline-block; background: rgba(0,0,0,0.55); padding: 0.2rem 0.8rem; border-radius: 9999px; }
        .package-card-new-desc { font-size: 0.85rem; line-height: 1.4; margin-bottom: 0.8rem; opacity: 0.95; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .package-card-buttons { display: flex; gap: 0.75rem; margin-top: 0.25rem; }
        .card-details-btn, .card-book-btn { flex: 1; padding: 0.5rem 0.8rem; border-radius: 2rem; font-weight: 600; font-size: 0.8rem; text-align: center; cursor: pointer; transition: all 0.25s ease; border: none; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); color: white; border: 1px solid rgba(255,255,255,0.5); text-decoration: none; }
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
          position: absolute;
          bottom: 15%;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          z-index: 30;
          pointer-events: none;
          text-align: center;
          padding: 3rem 1rem;
        }
        .carousel-btn-container .slide-text {
          backdrop-filter: blur(2px);
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
          max-width: 80%;
          margin: 0 auto;
          pointer-events: auto;
          line-height: 1.5;
        }
        .carousel-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          pointer-events: auto;
        }
        .carousel-buttons .category-btn {
          background: linear-gradient(135deg, #511703 0%, #996515 100%);
          color: white;
          margin: 0;
        }
        
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); z-index: 2147483647; align-items: center; justify-content: center; padding: 1rem; overflow: hidden; }
        .modal.active { display: flex; }
        .modal-content { background: white; border-radius: 2rem; max-width: 550px; width: 100%; max-height: 85vh; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 2rem; position: relative; animation: modalSlideIn 0.3s ease; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); margin: 0; }
        @keyframes modalSlideIn { from { opacity: 0; transform: scale(0.95) translateY(-20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .modal-close { position:absolute; top: 1rem; right: 1.2rem; font-size: 1.8rem; cursor: pointer; color: #9ca3af; transition: color 0.2s; z-index: 10; }
        .modal-close:hover { color: #ED6A02; }
        .modal-icon { text-align: center; font-size: 3rem; color: #2E7D32; margin-bottom: 1rem; }
        .modal-title { text-align: center; font-size: 1.8rem; font-weight: 700; color: #2E7D32; margin-bottom: 0.5rem; }
        .modal-subtitle { text-align: center; color: #6B7280; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .modal-details { margin: 1.5rem 0; padding: 1rem; background: #f8faf8; border-radius: 1rem; }
        .detail-item { display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid #e2e8f0; }
        .detail-label { font-weight: 600; color: #2E7D32; }
        .modal-description { line-height: 1.6; color: #374151; margin: 1rem 0; }
        .modal-close-btn { background: linear-gradient(135deg, #2E7D32, #1b5e20); color: white; font-weight: 600; padding: 0.8rem; width: 100%; border-radius: 3rem; border: none; cursor: pointer; transition: all 0.3s; }
        .modal-close-btn:hover { background: linear-gradient(135deg, #ED6A02, #c95a02); transform: translateY(-2px); }
        .modal-input, .modal-select { width: 100%; padding: 0.9rem 1rem; margin-bottom: 1rem; border: 1.5px solid #e2e8f0; border-radius: 1rem; font-size: 1rem; background: white; }
        .modal-input:focus, .modal-select:focus { outline: none; border-color: #ED6A02; box-shadow: 0 0 0 3px rgba(237,106,2,0.15); }
        .modal-btn { background: linear-gradient(135deg, #2E7D32, #1b5e20); color: white; font-weight: 700; padding: 0.9rem; width: 100%; border-radius: 3rem; border: none; cursor: pointer; font-size: 1rem; transition: all 0.3s; margin-top: 0.5rem; }
        .modal-btn:hover { background: linear-gradient(135deg, #ED6A02, #c95a02); transform: translateY(-2px); }
        
        .popular-golf-section, .section-container, .video-section { padding-left: 2rem; padding-right: 2rem; }
        @media (max-width: 768px) { .popular-golf-section, .section-container, .video-section { padding-left: 1rem; padding-right: 1rem; } }
        @media (max-width: 640px) {
          .modal { padding: 0; }
          .modal-content { width: 100%; height: 100%; max-height: 100%; border-radius: 0; padding: 1.5rem 1rem; overflow-y: auto; }
          .modal-title { font-size: 1.5rem; }
          .carousel-btn-container .slide-text { font-size: 0.9rem; max-width: 95%; }
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
            style={{
              transform: `translateX(-${carouselIndex * 100}%)`,
              transition: isTransitioning
                ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                : 'none',
            }}
          >
            {/* Slide 1 */}
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img
                src="https://i.imgur.com/yrqYzbX.jpeg"
                alt="Mist over mountains"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0  pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 z-10">
                <h2 className="fleur-de-leah-regular text-2xl md:text-2xl font-bold text-orange-300 drop-shadow-lg">
                  {slideTexts[0]}
                </h2>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img
                src="https://i.imgur.com/HyLr96w.jpeg"
                alt="Mist over mountains"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 z-10">
                <h2 className="fleur-de-leah-regular text-2xl md:text-2xl font-bold text-orange-300 drop-shadow-lg">
                  {slideTexts[1]}
                </h2>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img
                src="https://i.imgur.com/BqQTJV4.jpeg"
                alt="Mist over mountains"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 z-10">
                <h2 className="fleur-de-leah-regular text-2xl md:text-2xl font-bold text-orange-300 drop-shadow-lg">
                  {slideTexts[2]}
                </h2>
              </div>
            </div>

            {/* Slide 4 */}
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img
                src="https://i.imgur.com/WhnDjDA.jpeg"
                alt="Mist over mountains"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 z-10">
                <h2 className="fleur-de-leah-regular text-2xl md:text-2xl font-bold text-orange-300 drop-shadow-lg">
                  {slideTexts[3]}
                </h2>
              </div>
            </div>

            {/* Slide 5 */}
            <div className="w-full flex-shrink-0 relative carousel-height">
              <img
                src="https://i.imgur.com/Ioye5Q6.jpeg"
                alt="Mist over mountains"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 z-10">
                <h2 className="fleur-de-leah-regular text-2xl md:text-2xl font-bold text-orange-300 drop-shadow-lg">
                  {slideTexts[4]}
                </h2>
              </div>
            </div>
          </div>

          {/* Buttons container */}
          <div className="carousel-btn-container">
            <div className="carousel-buttons">
              <Link href="/packages" className="category-btn travel">
                Travel Packages
              </Link>
              <Link href="/packages" className="category-btn golf">
                Golf Packages
              </Link>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 z-10">
            {[...Array(totalSlides)].map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === carouselIndex ? 'bg-[#ED6A02] w-6' : 'bg-white/70'
                }`}
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
                <div className="video-container rounded-xl shadow-lg overflow-hidden"><iframe src="https://www.youtube.com/embed/Qjnjg4_TgXY?autoplay=1&mute=1&loop=1&playlist=Qjnjg4_TgXY" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Laos Travel Video 1"></iframe></div>
                <div className="video-container rounded-xl shadow-lg overflow-hidden"><iframe src="https://www.youtube.com/embed/5EhJtgttLyI?autoplay=1&mute=1&loop=1&playlist=5EhJtgttLyI" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Laos Travel Video 2"></iframe></div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Trips */}
        <div className="section-container">
          <div className="w-full full-width mx-auto py-8">
            <h2 className="text-2xl font-semibold text-[#2E7D32] mb-6 text-center border-b-2 border-[#ED6A02] pb-2 inline-block mx-auto block w-fit px-8">Popular Trips in Laos</h2>
            <div className="popular-trips-grid mt-8">
              {[
                { href: "/city/vientiane", img: "https://i.imgur.com/TX7Xt7r.jpeg", title: "Vientiane", desc: "Laid-back capital with golden temples & French cafes", mapLink: "https://www.google.com/maps/search/?api=1&query=Vientiane+Laos" },
                { href: "/city/vang-vieng", img: "https://i.imgur.com/4AvfdfO.jpeg", title: "Vang Vieng", desc: "Karst mountains, blue lagoons & adventure sports", mapLink: "https://www.google.com/maps/search/?api=1&query=Vang+Vieng+Laos" },
                { href: "/city/luang-prabang", img: "https://i.imgur.com/J4OGK1a.jpeg", title: "Luang Prabang", desc: "UNESCO town, alms ceremony & turquoise waterfalls", mapLink: "https://www.google.com/maps/search/?api=1&query=Luang+Prabang+Laos" },
                { href: "/city/champasak", img: "https://i.imgur.com/4QhvN7F.jpeg", title: "Champasak", desc: "Gateway to Wat Phu temple & Mekong riverside charm", mapLink: "https://www.google.com/maps/search/?api=1&query=Champasak+Laos" },
                { href: "/city/pak-beng", img: "https://i.imgur.com/SJlpWSx.jpeg", title: "Pak Beng", desc: "Riverside stopover on the Mekong slow boat route", mapLink: "https://www.google.com/maps/search/?api=1&query=Pak+Beng+Laos" },
                { href: "/city/plain-of-jars", img: "https://i.imgur.com/pd2ByH1.jpeg", title: "Plain of Jars", desc: "Megalithic archaeological mystery in Xieng Khouang", mapLink: "https://www.google.com/maps/search/?api=1&query=Plain+of+Jars+Phonsavan+Laos" },
              ].map((trip) => (
                <div key={trip.title} className="trip-card">
                  <Link href={trip.href} className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2 h-full">
                    <img src={trip.img} alt={trip.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-[#2E7D32]">{trip.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{trip.desc}</p>
                      <div className="mt-2"><div onClick={(e) => { e.preventDefault(); window.open(trip.mapLink, '_blank', 'noopener,noreferrer'); }} className="text-sm text-[#ED6A02] hover:underline inline-flex items-center gap-1 cursor-pointer"><i className="fas fa-map-marker-alt"></i> {trip.title}</div></div>
                      <div className="flex gap-2 mt-3"><span className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs hover:bg-[#ED6A02] transition inline-block">Details</span></div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Services Section */}
        <div className="section-container" id="our_services">
          <div className="w-full full-width mx-auto">
            <h3 className="text-3xl font-bold text-[#2E7D32] mb-2 text-center mt-5">Our Services</h3>
            <div className="package-category-buttons">
              <button className={`category-btn travel ${activeCategory === 'travel' ? 'active' : ''}`} onClick={() => showPackages('travel')} style={activeCategory === 'travel' ? { background: "linear-gradient(135deg, #ed5002 0%, #D4AF37 100%)" } : {}}>Travel Packages</button>
              <button className={`category-btn golf ${activeCategory === 'golf' ? 'active' : ''}`} onClick={() => showPackages('golf')} style={activeCategory === 'golf' ? { background: "linear-gradient(135deg, #ed5002 0%, #D4AF37 100%)" } : {}}>Golf Packages</button>
            </div>

            <div className="packages-slider-section" style={{ display: activeCategory === 'travel' ? 'block' : 'none' }}>
              <div className="slider-arrow slider-arrow-left" onClick={(e) => { e.stopPropagation(); scrollCarousel(travelCarouselRef, 'left'); }}><i className="fas fa-chevron-left"></i></div>
              <div ref={travelCarouselRef} className="packages-grid-carousel">
                {travelPackages.map((pkg, idx) => {
                  const packageId = travelPackageIdMap[pkg.title];
                  return (<div key={idx} className="package-mini-card">
                    <div className="package-mini-image">
                      <img src={pkg.img} alt={pkg.title} /></div>
                      <div className="package-mini-content text-center">
                        <div className="package-mini-title">{pkg.title}</div>
                        <div className="package-mini-duration-text">{pkg.duration} <br></br> {pkg.price}</div>
                        <div className="ackage-mini-duration-text text-red-700 ">minium : 2 person</div>
                        <div className="package-mini-footer">
                          <Link href={`travel_package_detail/${packageId}`} className="btn-details">Details</Link>
                          <button className="btn-book" onClick={() => openBookingModal(pkg.title)}>Book</button>
                          </div></div></div>);
                })}
              </div>
              <div className="slider-arrow slider-arrow-right" onClick={(e) => { e.stopPropagation(); scrollCarousel(travelCarouselRef, 'right'); }}><i className="fas fa-chevron-right"></i></div>
            </div>

            {/*GolfPackagesSlider  */}
            <div className="packages-slider-section" style={{ display: activeCategory === 'golf' ? 'block' : 'none' }}>
              <div className="slider-arrow slider-arrow-left" onClick={(e) => { e.stopPropagation(); scrollCarousel(golfCarouselRef, 'left'); }}><i className="fas fa-chevron-left"></i></div>
              <div ref={golfCarouselRef} className="packages-grid-carousel">
                {golfPackages.map((pkg, idx) => {
                  const packageId = golfPackageIdMap[pkg.title];
                  return (<div key={idx} className="package-mini-card">
                    <div className="package-mini-image"><img src={pkg.img} alt={pkg.title} /></div>
                    <div className="package-mini-content text-center">
                      <div className="package-mini-title my-3">{pkg.title}</div>
                    <div className="package-mini-duration-text text-bold">{pkg.duration} <br></br> {pkg.price}          
                  <p className="package-card-new-desc text-center my-3 text-red-700">minium player : 4</p>
              </div><div className="package-mini-footer"><Link href={`/golf_package_detail/${packageId}`} className="btn-details">Details</Link><button className="btn-book" onClick={() => openBookingModal(pkg.title)}>Book</button></div></div></div>);
                })}
              </div>
              <div className="slider-arrow slider-arrow-right" onClick={(e) => { e.stopPropagation(); scrollCarousel(golfCarouselRef, 'right'); }}><i className="fas fa-chevron-right"></i></div>
            </div>
          </div>
          <div className="package-category-buttons">
            <Link href="/packages" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg">View All Packages</Link>
            <Link href="/contactus" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg text-red-700 ml-4">Customize Package</Link>
          </div>
        </div>

        {/* Golf Places in Laos */}
        <div className="max-w-6xl mx-auto px-4 py-12" id="places">
          <div className="section-header"><h2>Golf Places in Laos</h2><p>Discover the best golf courses across the country</p><div className="section-divider"></div></div>
          <div className="places-grid">{golfPlaces.map((place, idx) => (<GolfPlaceCard key={idx} place={place} />))}</div>
        </div>

        {/* Popular Golf Packages */}
        <div className="popular-golf-section">
          <div className="w-full py-12 mt-8">
            <div className="full-width mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center text-[#2E7D32]">Popular Golf Packages</h2>
              <p className="text-center mb-8 max-w-2xl mx-auto">Premium golf experiences across Laos – Book your perfect golf getaway</p>
              <div className="popular-packages-cards">
                {golfPackagesList.map((pkg, idx) => (<PopularGolfCard key={idx} pkg={pkg} />))}
              </div>
              <div className="package-category-buttons">
                <Link href="/packages" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg">&nbsp;View All Packages&nbsp;</Link>
                <Link href="/contactus" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg text-red-700 ml-4">Customize Package</Link>
              </div>
            </div>
          </div>
        </div>

        <GallerySliderRow />
        <div className="text-center py-2">
          <Link href="/gallery" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg">View All Gallery</Link>
        </div>
        <ContactUs />
      </main>

      {/* Modals */}
      <div className={`modal ${detailModalOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeDetailModal(); }}>
        <div className="modal-content"><span className="modal-close" onClick={closeDetailModal}>&times;</span><div className="modal-icon"><i className="fas fa-mountain"></i></div><h3 className="modal-title">{currentPackage.title}</h3><div className="modal-details"><div className="detail-item"><span className="detail-label">Duration:</span><span>{currentPackage.duration}</span></div><div className="modal-description">{currentPackage.description}</div></div><div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}><button className="modal-btn" onClick={bookFromDetail} style={{ flex: 1 }}>Book Now</button><button className="modal-close-btn" onClick={closeDetailModal} style={{ flex: 1 }}>Close</button></div></div>
      </div>

      <div className={`modal ${bookingModalOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeBookingModal(); }}>
        <div className="modal-content"><span className="modal-close sticky" onClick={closeBookingModal}>&times;</span><div className="modal-icon"><i className="fas fa-envelope-open-text"></i></div><h3 className="modal-title">Request a Booking</h3><p className="modal-subtitle">Booking: {bookingPackageName}</p>
          <form onSubmit={handleBookingSubmit}>
            <input type="hidden" name="packageName" value={bookingPackageName} />
            <div className="flex flex-wrap gap-4 mb-3"><input type="text" className="modal-input flex-1 min-w-[120px]" placeholder="First Name" required value={bookingFirstName} onChange={(e) => setBookingFirstName(e.target.value)} /><input type="text" className="modal-input flex-1 min-w-[120px]" placeholder="Last Name" required value={bookingLastName} onChange={(e) => setBookingLastName(e.target.value)} /></div>
            <input type="email" className="modal-input mb-3" placeholder="Email Address" required value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} />
            <input type="tel" className="modal-input mb-3" placeholder="Phone Number (optional)" value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} />
            <input type="text" className="modal-input mb-3" placeholder="Nationality" required value={bookingNationality} onChange={(e) => setBookingNationality(e.target.value)} />
            <div className="flex items-center gap-4 mb-3"><p className="flex items-center h-10 mb-5">Arrival Date</p><input type="date" className="modal-input flex-1" required value={bookingArrivalDate} onChange={(e) => setBookingArrivalDate(e.target.value)} /></div>
            <input type="number" className="modal-input mb-3" placeholder="Number of Travellers" required value={bookingTravellers} onChange={(e) => setBookingTravellers(e.target.value)} />
            <textarea className="modal-input mb-3" rows={3} placeholder="Additional requests or travel dates..." value={bookingMessage} onChange={(e) => setBookingMessage(e.target.value)}></textarea>
            <button type="submit" className="modal-btn" disabled={isBookingSubmitting}>{isBookingSubmitting ? <><i className="fas fa-spinner fa-spin mr-2"></i> Sending...</> : <><i className="fas fa-paper-plane"></i> Send Booking Request</>}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;