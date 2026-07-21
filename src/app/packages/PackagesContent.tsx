'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Package {
  name: string;
  slug: string;
  type: 'golf' | 'travel';
  image: string;
  duration: string;
  price: string;
  description: string;
}

const GolfTravelPackages: React.FC = () => {
  // ---------- GOLF PACKAGES (same as HomePage) ----------
  const golfPackagesRaw = [
    {
      title: "Standard 2 Rounds in Vientiane",
      duration: "4 Days / 3 Nights  ( 2 Rounds )",
      price: "From USD 380/person",
      desc: "Two rounds at Lao Country Club (walking club) and Long Vien Club. Includes green fees and transfers.",
      img: "https://i.imgur.com/K6gOupW.jpeg"
    },
    {
      title: "Premium 2 Rounds in Vientiane",
      duration: "4 Days / 3 Nights  ( 2 Rounds )",
      price: "From USD 450/person",
      desc: "Play at Lakeview Club and Long Vien Club. Includes green fees and private transfers.",
      img: "https://i.imgur.com/rDMj7bS.jpeg"
    },
    {
      title: "Premium 3 Rounds in Vientiane",
      duration: "5 Days / 4 Nights  ( 3 Rounds )",
      price: "From USD 600/person",
      desc: "Three rounds across Lakeview, Sea Games, and Long Vien clubs. Comprehensive golf experience.",
      img: "https://i.imgur.com/mYjfy1N.jpeg"
    },
    {
      title: "Vientiane & MountainsView 3 Rounds in Vientiane",
      duration: "5 Days / 4 Nights  ( 3 Rounds )",
      price: "From USD 600/person",
      desc: "Play Lakeview, Vang Vieng (Lao Asia Club), and Long Vien. Mountain views and top courses.",
      img: "https://i.imgur.com/d9PqrYs.jpeg"
    },
    {
      title: "Four Fairways 4 Rounds in Vientiane",
      duration: "6 Days / 5 Nights  ( 4 Rounds )",
      price: "From USD 750/person",
      desc: "Four rounds: Lakeview, Vang Vieng, Sea Games, and Long Vien. The ultimate golf marathon.",
      img: "https://i.imgur.com/oCWj2un.jpeg"
    },
    {
      title: "Luang Prabang Golf & Culture Tour",
      duration: "4 Days / 3 Nights",
      price: "From USD 310/person",
      desc: "One round at Luang Prabang Golf Club plus a UNESCO heritage city tour. Culture meets fairways.",
      img: "https://i.imgur.com/B2fjoxj.jpeg"
    }
  ];

  const golfPackageIdMap: Record<string, string> = {
    "Standard 2 Rounds in Vientiane": "standard_two_rounds_in_vientiane",
    "Premium 2 Rounds in Vientiane": "premium_two_rounds_in_vientiane",
    "Premium 3 Rounds in Vientiane": "premium_three_rounds_in_vientiane",
    "Vientiane & MountainsView 3 Rounds in Vientiane": "vientiane_mountainsview_three_rounds_in_vientiane",
    "Four Fairways 4 Rounds in Vientiane": "four_fairways_four_rounds_in_vientiane",
    "Luang Prabang Golf & Culture Tour": "luang_prabang_golf_culture_tour",
  };

  const golfPackagesList: Package[] = golfPackagesRaw.map(pkg => ({
    name: pkg.title,
    slug: golfPackageIdMap[pkg.title],
    type: 'golf',
    image: pkg.img,
    duration: pkg.duration,
    price: pkg.price,
    description: pkg.desc
  }));

  // ---------- TRAVEL PACKAGES (same as HomePage) ----------
  const travelPackagesRaw = [
    { title: "Vientiane- Luang Prabang", duration: "3 DAYS 2 NIGHTS", price: "From USD 336 / person", desc: "Heritage-focused journey through Luang Prabang's temples and Kuang Si Falls.", img: "https://i.imgur.com/4QhvN7F.jpeg" },
    { title: "Vientiane - Luang Prabang", duration: "4 DAYS 3 NIGHTS", price: "From USD 486 / person", desc: "Extended stay with more time to explore Luang Prabang's UNESCO sites.", img: "https://i.imgur.com/TX7Xt7r.jpeg" },
    { title: "Vientiane- Vang Vieng ", duration: "2 DAYS 1 NIGHT", price: "From USD 463 / person", desc: "Quick escape to Vang Vieng's karst mountains and blue lagoons.", img: "https://i.imgur.com/J4OGK1a.jpeg" },
    { title: "Luang Prabang-Vang Vieng-Vientiane  ", duration: "4 DAYS 3 NIGHTS", price: "From USD 554 / person", desc: "Combine UNESCO charm, adventure, and capital sights in one trip.", img: "https://i.imgur.com/4HTtNcg.jpeg" },
    { title: "Vientiane-Mueng Fueng-Vientiane", duration: "2 DAYS 1 NIGHT", price: "From USD 240 / person", desc: "Peaceful countryside retreat with alms giving and scenic boat ride.", img: "https://i.imgur.com/SJlpWSx.jpeg" },
    { title: "Huay Xai-Pakbeng-Luang Prabang", duration: "5 DAYS 4 NIGHTS", price: "From USD 1334 / person", desc: "Mekong River cruise from Huay Xai to Luang Prabang, visiting ethnic villages.", img: "https://i.imgur.com/V8TST5G.jpeg" },
    { title: "Vientiane-Vang Vieng-Luang Prabang", duration: "3 DAYS 2 NIGHTS", price: "From USD 336 / person", desc: "Efficient loop: Vientiane → Vang Vieng → Luang Prabang by van and train.", img: "https://i.imgur.com/UZI13Qj.jpeg" },
    { title: "Luang Prabang-Heritage Escape", duration: "3 DAYS 2 NIGHTS", price: "From USD 240 / person", desc: "UNESCO old town, Kuang Si Falls, Pak Ou Caves, and alms-giving ceremony.", img: "https://i.imgur.com/pd2ByH1.jpeg" },
    { title: "Vang Vieng Adventrue Day Trip", duration: "FULL DAY", price: "From USD 95 / person", desc: "Day trip from Vientiane to Vang Vieng: Blue Lagoon, Angel Cave, and limestone views.", img: "https://i.imgur.com/4AvfdfO.jpeg" },
    { title: "Vientiane Capital Discovery", duration: "FULL DAY", price: "From USD 95 / person", desc: "Explore Pha That Luang, Patuxai, Buddha Park, and Mekong riverside.", img: "https://i.imgur.com/B6vdCe4.jpeg" },
    { title: "Luang Prabang-Vang Vieng Explorer", duration: "4 DAYS 3 NIGHTS", price: "From USD 390 / person", desc: "Culture and adventure with high-speed train travel between Vientiane, VV, and LPQ.", img: "https://i.imgur.com/sG5jnE9.jpeg" },
    { title: "Soouthern Laos & 4,000 Islands Escape", duration: "4 DAYS 3 NIGHTS", price: "From USD 350 / person", desc: "Bolaven Plateau, Khone Phapheng Falls, and tranquil 4,000 Islands.", img: "https://i.imgur.com/7IjbO0Z.jpeg" },
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

  const travelPackagesList: Package[] = travelPackagesRaw.map(pkg => ({
    name: pkg.title,
    slug: travelPackageIdMap[pkg.title],
    type: 'travel',
    image: pkg.img,
    duration: pkg.duration,
    price: pkg.price,
    description: pkg.desc
  }));

  // ---------- Popular Golf Packages (same as HomePage) ----------
  const popularGolfPackages = [
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
  popularGolfPackages.forEach(pkg => { popularGolfIdMap[pkg.name] = pkg.slug; });

  // ---------- Next.js hooks ----------
  const searchParams = useSearchParams();
  const router = useRouter();

  const getCategoryFromUrl = useCallback((): 'golf' | 'travel' => {
    const cat = searchParams.get('category');
    return cat === 'travel' ? 'travel' : 'golf';
  }, [searchParams]);

  // ---------- State ----------
  const [currentCategory, setCurrentCategory] = useState<'golf' | 'travel'>('golf');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState('');
  const [sliderStyle, setSliderStyle] = useState({ transform: 'translateX(0)', width: '0px' });

  const [bookingFirstName, setBookingFirstName] = useState('');
  const [bookingLastName, setBookingLastName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingNationality, setBookingNationality] = useState('');
  const [bookingArrivalDate, setBookingArrivalDate] = useState('');
  const [bookingTravellers, setBookingTravellers] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  const btnGolfRef = useRef<HTMLButtonElement>(null);
  const btnTravelRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = useCallback(() => {
    if (btnGolfRef.current && btnTravelRef.current && sliderRef.current) {
      if (currentCategory === 'golf') {
        setSliderStyle({
          transform: 'translateX(0)',
          width: `${btnGolfRef.current.offsetWidth}px`,
        });
      } else {
        setSliderStyle({
          transform: `translateX(${btnGolfRef.current.offsetWidth}px)`,
          width: `${btnTravelRef.current.offsetWidth}px`,
        });
      }
    }
  }, [currentCategory]);

  const switchCategory = useCallback((cat: 'golf' | 'travel') => {
    if (cat === currentCategory) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', cat);
    router.push(`/packages?${params.toString()}`, { scroll: false });
  }, [currentCategory, router, searchParams]);

  const openBookingModal = useCallback((pkgName: string) => {
    setBookingPackage(pkgName);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
    setBookingFirstName('');
    setBookingLastName('');
    setBookingEmail('');
    setBookingPhone('');
    setBookingNationality('');
    setBookingArrivalDate('');
    setBookingTravellers('');
    setBookingMessage('');
  }, []);

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
          packageName: bookingPackage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send booking request");
      }

      alert(`Booking request sent for ${bookingPackage}!\nWe'll contact you within 24 hours.`);
      closeBookingModal();
    } catch (error) {
      console.error("Booking error:", error);
      alert(error instanceof Error ? error.message : "Failed to send request. Please try again later.");
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  useEffect(() => {
    const urlCategory = getCategoryFromUrl();
    if (urlCategory !== currentCategory) {
      setCurrentCategory(urlCategory);
    }
  }, [getCategoryFromUrl, currentCategory]);

  useEffect(() => {
    updateSliderPosition();
    window.addEventListener('resize', updateSliderPosition);
    return () => window.removeEventListener('resize', updateSliderPosition);
  }, [updateSliderPosition]);

  const todayDate = new Date().toISOString().split('T')[0];

  const getDetailLink = (pkg: Package) => {
    if (pkg.type === 'travel') {
      return `/travel_package_detail/${pkg.slug}`;
    } else {
      return `/golf_package_detail/${pkg.slug}`;
    }
  };

  const allPackages = currentCategory === 'golf' ? golfPackagesList : travelPackagesList;

  // ---------- Render ----------
  return (
    <>
      <style>{`
        :root {
          --bg: #f4f1ec;
          --fg: #1a1a1a;
          --muted: #7a7265;
          --accent: #c8602a;
          --accent-light: #e8844a;
          --emerald-deep: #1b4332;
          --emerald-mid: #2d6a4f;
          --emerald-light: #40916c;
          --card: #ffffff;
          --border: #e0dbd3;
          --gold: #d4a853;
        }
        * { box-sizing: border-box; }
        body {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: var(--bg);
          color: var(--fg);
          margin: 0;
          overflow-x: hidden;
          font-weight: 400;
          line-height: 1.5;
        }
        body, body * { font-family: inherit; }
        
        .cat-toggle {
          display: inline-flex; background: white; border-radius: 20px; padding: 6px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px var(--border); position: relative;
        }
        .cat-toggle-btn {
          position: relative; z-index: 2; padding: 14px 32px; border-radius: 14px;
          font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: color 0.3s ease;
          border: none; background: transparent; display: flex; align-items: center; gap: 8px; white-space: nowrap;
        }
        .cat-toggle-btn.active { color: white; }
        .cat-toggle-btn:not(.active) { color: var(--muted); }
        .cat-toggle-btn:not(.active):hover { color: var(--fg); }
        .cat-slider {
          position: absolute; top: 6px; left: 6px; height: calc(100% - 12px); border-radius: 14px;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
        }
        .cat-slider.golf { background: linear-gradient(135deg, var(--emerald-deep), var(--emerald-light)); box-shadow: 0 4px 16px rgba(27,67,50,0.35); }
        .cat-slider.travel { background: linear-gradient(135deg, var(--accent), var(--accent-light)); box-shadow: 0 4px 16px rgba(200,96,42,0.35); }
        
        /* Grid layout – no arrows, no horizontal scroll */
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .package-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .package-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
        }
        .package-card-image { height: 180px; overflow: hidden; }
        .package-card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .package-card:hover .package-card-image img { transform: scale(1.05); }
        .package-card-content {
          padding: 1rem 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          text-align: center;
        }
        .package-card-title { font-weight: bold; font-size: 1.1rem; color: #2E7D32; margin-bottom: 0.25rem; }
        .package-card-duration { font-size: 0.85rem; color: #ED6A02; font-weight: 600; margin-bottom: 0.3rem; }
        .package-card-price { font-size: 0.9rem; font-weight: 700; color: #1b4332; margin-bottom: 0.5rem; }
        .package-card-min-players { font-size: 0.75rem; color: #b91c1c; font-weight: 500; margin-bottom: 0.75rem; }
        .package-card-footer {
          margin-top: auto;
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }
        .package-card-footer .btn-details {
          background-color: #ED6A02;
          color: white;
          padding: 0.4rem 1.2rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          cursor: pointer;
          border: none;
          transition: background 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .package-card-footer .btn-details:hover { background-color: #2E7D32; }
        .package-card-footer .btn-book {
          background-color: #2E7D32;
          color: white;
          padding: 0.4rem 1.2rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          cursor: pointer;
          border: none;
          transition: background 0.3s;
        }
        .package-card-footer .btn-book:hover { background-color: #ED6A02; }
        
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
        .package-card-new-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to top, rgba(46, 125, 50, 0.92) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.3) 100%);
          z-index: 2;
        }
        .package-card-new-content {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; z-index: 3; color: white;
        }
        .package-card-new-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 0.3rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.6); }
        .package-card-new-price {
          font-size: 0.9rem; font-weight: 600; color: #FFD700; margin-bottom: 0.5rem;
          display: inline-block; background: rgba(0,0,0,0.55); padding: 0.2rem 0.8rem; border-radius: 9999px;
        }
        .package-card-new-desc { font-size: 0.85rem; line-height: 1.4; margin-bottom: 0.8rem; opacity: 0.95; }
        .package-card-buttons { display: flex; gap: 0.75rem; margin-top: 0.25rem; }
        .card-details-btn, .card-book-btn {
          flex: 1; padding: 0.5rem 0.8rem; border-radius: 2rem; font-weight: 600; font-size: 0.8rem;
          text-align: center; cursor: pointer; transition: all 0.25s ease; border: none;
          background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); color: white;
          border: 1px solid rgba(255,255,255,0.5); text-decoration: none;
        }
        .card-details-btn { background: rgba(237,106,2,0.85); border-color: #ffb347; }
        .card-book-btn { background: rgba(46,125,50,0.9); border-color: #8bc34a; }
        .card-details-btn:hover, .card-book-btn:hover { transform: scale(1.02); }
        .card-details-btn:hover { background: #ED6A02; }
        .card-book-btn:hover { background: #2E7D32; }
        
        .package-category-buttons {
          display: flex; justify-content: center; gap: 1rem; margin: 2rem 0; flex-wrap: wrap;
        }
        .category-btn {
          padding: 0.6rem 1.8rem; border-radius: 9999px; font-weight: bold; font-size: 1rem;
          cursor: pointer; transition: all 0.3s ease; border: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          background: linear-gradient(135deg, #511703 0%, #996515 100%); color: white;
          white-space: nowrap; text-decoration: none; display: inline-flex; align-items: center; justify-content: center;
        }
        .category-btn:hover { background: linear-gradient(135deg, #ed5002 0%, #D4AF37 100%); transform: scale(1.05); color: white; }
        
        .modal {
          display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(5px); z-index: 10000;
          justify-content: center; align-items: center;
        }
        .modal.active { display: flex; }
        .modal-content {
          background: white; border-radius: 2rem; max-width: 550px; width: 90%; max-height: 85vh;
          overflow-y: auto; padding: 2rem; position: relative; animation: modalSlideIn 0.3s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        @keyframes modalSlideIn { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        .modal-close { position: absolute; top: 1rem; right: 1.2rem; font-size: 1.8rem; cursor: pointer; color: #9ca3af; transition: color 0.2s; }
        .modal-close:hover { color: #ED6A02; }
        .modal-icon { text-align: center; font-size: 3rem; color: #2E7D32; margin-bottom: 1rem; }
        .modal-title { text-align: center; font-size: 1.8rem; font-weight: 700; color: #2E7D32; margin-bottom: 0.5rem; }
        .modal-subtitle { text-align: center; color: #6B7280; font-size: 0.9rem; margin-bottom: 1.5rem; }
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
        @media (max-width: 640px) {
          .modal-content { width: 95%; padding: 1rem 1.25rem; border-radius: 1.5rem; margin: 1rem auto; max-height: 90vh; overflow-y: auto; box-sizing: border-box; }
          .modal-input, .modal-select { padding: 0.8rem 1rem; font-size: 1rem; }
          body.modal-open { overflow-x: hidden; position: fixed; width: 100%; }
          .modal { backdrop-filter: none; -webkit-backdrop-filter: none; background: rgba(0, 0, 0, 0.85); }
        }
      `}</style>

      <main className="flex-1 flex flex-col w-full">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#1b4332] py-16 md:py-20">
          <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 tracking-tight">
              Travel & <span className="text-[#d4a853]">Golf</span> Packages
            </h1>
            <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you seek the thrill of championship fairways or the wonder of ancient temples, waterfalls, and river journeys — Laos delivers both in extraordinary style.
            </p>
          </div>
        </section>

        {/* Category Toggle + Grid */}
        <section className="py-14 md:py-20 relative" id="packages">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)]">Choose Your Experience</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--emerald-deep)] mt-2 mb-1">Our Packages</h2>
              <p className="text-[var(--muted)] max-w-lg mx-auto text-sm leading-relaxed">Two paths, one unforgettable destination</p>
              <div className="divider-ornament mt-4"></div>
            </div>

            <div className="flex justify-center mb-10">
              <div className="cat-toggle">
                <div ref={sliderRef} className={`cat-slider ${currentCategory}`} style={sliderStyle}></div>
                <button
                  ref={btnGolfRef}
                  className={`cat-toggle-btn ${currentCategory === 'golf' ? 'active' : ''}`}
                  onClick={() => switchCategory('golf')}
                >
                  <i className="fas fa-golf-ball-tee"></i> Golf Packages
                </button>
                <button
                  ref={btnTravelRef}
                  className={`cat-toggle-btn ${currentCategory === 'travel' ? 'active' : ''}`}
                  onClick={() => switchCategory('travel')}
                >
                  <i className="fas fa-suitcase-rolling"></i> Travel Packages
                </button>
              </div>
            </div>

            {/* Grid – all cards shown, no arrows */}
            <div className="packages-grid">
              {allPackages.map((pkg, idx) => (
                <div key={`${currentCategory}-${idx}`} className="package-card">
                  <div className="package-card-image">
                    <img src={pkg.image} alt={pkg.name} loading="lazy" />
                  </div>
                  <div className="package-card-content">
                    <div className="package-card-title">{pkg.name}</div>
                    <div className="package-card-duration">{pkg.duration}</div>
                    <div className="package-card-price">{pkg.price}</div>
                    <div className="package-card-min-players">minium {pkg.type === 'golf' ? 'player : 4' : ' : 2'}</div>
                    <div className="package-card-footer">
                      <Link href={getDetailLink(pkg)} className="btn-details">Details</Link>
                      <button className="btn-book" onClick={() => openBookingModal(pkg.name)}>Book</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="package-category-buttons">
              <Link href="/packages" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg">
                View All Packages
              </Link>
              <Link href="/contactus" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg text-red-700 ml-4">
                Customize Package
              </Link>
            </div> */}
          </div>
        </section>

        {/* Popular Golf Packages */}
        {/* <section className="py-12 bg-[#f0f7f0]">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl font-bold mb-4 text-center text-[#2E7D32]">Popular Golf Packages</h2>
            <p className="text-center mb-8 max-w-2xl mx-auto">Premium golf experiences across Laos – Book your perfect golf getaway</p>
            <div className="popular-packages-cards">
              {popularGolfPackages.map((pkg, idx) => {
                const packageId = popularGolfIdMap[pkg.name];
                return (
                  <div key={idx} className="package-card-new" style={{ cursor: 'pointer' }}>
                    <div className="package-card-new-image"><img src={pkg.image} alt={pkg.name} /></div>
                    <div className="package-card-new-overlay"></div>
                    <div className="package-card-new-content text-center">
                      <h3 className="package-card-new-title">{pkg.name}</h3>
                      <div className="package-card-new-price text-center">{pkg.duration} <br /> {pkg.price}</div>
                      <p className="package-card-new-desc text-center">minium player : 4</p>
                      <div className="package-card-buttons">
                        <Link href={`/golf_package_detail/${packageId}`} className="card-details-btn" onClick={(e) => e.stopPropagation()}>
                          <i className="fas fa-info-circle"></i> Details
                        </Link>
                        <button className="card-book-btn" onClick={(e) => { e.stopPropagation(); openBookingModal(pkg.name); }}>
                          <i className="fas fa-bookmark"></i> Book
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="package-category-buttons">
              <Link href="/packages" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg">
                &nbsp;View All Packages&nbsp;
              </Link>
              <Link href="/contactus" className="inline-flex items-center bg-white text-[#2E7D32] px-6 py-2 rounded-full font-bold hover:bg-[#ED6A02] hover:text-white transition shadow-lg text-red-700 ml-4">
                Customize Package
              </Link>
            </div>
          </div>
        </section> */}
      </main>

      {/* Booking Modal */}
      <div className={`modal ${isModalOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && closeBookingModal()}>
        <div className="modal-content">
          <span className="modal-close" onClick={closeBookingModal}>&times;</span>
          <div className="modal-icon"><i className="fas fa-envelope-open-text"></i></div>
          <h3 className="modal-title">Request a Booking</h3>
          <p className="modal-subtitle">Booking: {bookingPackage}</p>
          <form onSubmit={handleBookingSubmit}>
            <input type="hidden" name="packageName" value={bookingPackage} />
            <div className="flex flex-wrap gap-4 mb-3">
              <input
                type="text"
                className="modal-input flex-1 min-w-[120px]"
                placeholder="First Name"
                required
                value={bookingFirstName}
                onChange={(e) => setBookingFirstName(e.target.value)}
              />
              <input
                type="text"
                className="modal-input flex-1 min-w-[120px]"
                placeholder="Last Name"
                required
                value={bookingLastName}
                onChange={(e) => setBookingLastName(e.target.value)}
              />
            </div>
            <input
              type="email"
              className="modal-input mb-3"
              placeholder="Email Address"
              required
              value={bookingEmail}
              onChange={(e) => setBookingEmail(e.target.value)}
            />
            <input
              type="tel"
              className="modal-input mb-3"
              placeholder="Phone Number (optional)"
              value={bookingPhone}
              onChange={(e) => setBookingPhone(e.target.value)}
            />
            <input
              type="text"
              className="modal-input mb-3"
              placeholder="Enter Nationality"
              required
              value={bookingNationality}
              onChange={(e) => setBookingNationality(e.target.value)}
            />
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <p className="flex items-center h-10 mb-5">Arrival Date</p>
              <input
                type="date"
                className="modal-input flex-1 min-w-[150px]"
                min={todayDate}
                required
                value={bookingArrivalDate}
                onChange={(e) => setBookingArrivalDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="modal-input mb-3"
                placeholder="Number of Travellers"
                required
                value={bookingTravellers}
                onChange={(e) => setBookingTravellers(e.target.value)}
              />
            </div>
            <textarea
              className="modal-input mb-3"
              rows={3}
              placeholder="Additional requests or travel dates..."
              value={bookingMessage}
              onChange={(e) => setBookingMessage(e.target.value)}
            ></textarea>
            <button type="submit" className="modal-btn" disabled={isBookingSubmitting}>
              {isBookingSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Send Booking Request
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GolfTravelPackages;