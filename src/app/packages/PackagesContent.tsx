'use client';
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Package {
  name: string;
  slug: string;
  type: 'golf' | 'travel';
  image: string;
  duration: string;
  description: string;
}

const GolfTravelPackages: React.FC = () => {
  // ---------- UPDATED PACKAGE DATA (same as HomePage) ----------
  const travelPackagesList: Package[] = [
    { name: '3 DAYS 2 NIGHTS VIENTIANE - LUANGPRABANG', slug: 'three_days_two_nights_vte_lpq', type: 'travel', image: 'https://a.cdn-hotels.com/gdcs/production107/d1830/2877c6eb-c1c6-43d0-a4dd-3dd31dab1c76.jpg', duration: '3 DAYS 2 NIGHTS', description: 'Immerse yourself in the spiritual heart of Laos. This heritage-focused journey takes you through Luang Prabang\'s gilded temples, the sacred alms-giving ritual at dawn, and the breathtaking Kuang Si Falls.' },
    { name: '4 DAYS 3 NIGHTS VIENTIANE – LUANG PRABANG', slug: 'four_days_three_nights_vte_lpq', type: 'travel', image: 'https://a.cdn-hotels.com/gdcs/production61/d1069/7edaacd7-d458-4b7e-9089-bff46a813fcd.jpg', duration: '4 DAYS 3 NIGHTS', description: 'For thrill-seekers and nature lovers, Vang Vieng is Laos\'s adventure capital. Towering karst mountains, crystal-blue lagoons, and vast cave systems set the stage for kayaking, zip-lining, hot air ballooning, and rock climbing.' },
    { name: '2 DAYS 1 NIGHT VTE - VV', slug: 'two_days_one_night_vte_vv', type: 'travel', image: 'https://a.cdn-hotels.com/gdcs/production61/d1069/7edaacd7-d458-4b7e-9089-bff46a813fcd.jpg', duration: '2 DAYS 1 NIGHT', description: 'A quick escape to Vang Vieng: explore the limestone karsts, Blue Lagoon, and Angel Cave. Optional kayaking or zip-lining.' },
    { name: '4 DAYS 3 NIGHTS LPQ-VV-VTE', slug: 'four_days_three_nights_lpq_vv_vte', type: 'travel', image: 'https://a.cdn-hotels.com/gdcs/production107/d1830/2877c6eb-c1c6-43d0-a4dd-3dd31dab1c76.jpg', duration: '4 DAYS 3 NIGHTS', description: 'Combine Luang Prabang’s UNESCO charm, Vang Vieng’s adventure, and Vientiane’s capital sights in one seamless journey.' },
    { name: '2 DAYS 1 NIGHT VTE - MF - VTE', slug: 'two_days_one_night_vte_mf', type: 'travel', image: 'https://www.golaos.tours/wp-content/uploads/2025/07/Laos-Travel-Budget-guide.jpg', duration: '2 DAYS 1 NIGHT', description: 'Peaceful countryside retreat to Muang Feuang. Alms giving, scenic boat ride, and relaxation.' },
    { name: '5 DAYS 4 NIGHTS HUX-PK-LPQ', slug: 'five_days_four_nights_hux_pk_lpq', type: 'travel', image: 'https://s27363.pcdn.co/wp-content/uploads/2024/11/Laos-Header-Image.jpg.webp', duration: '5 DAYS 4 NIGHTS', description: 'Mekong River cruise from Huay Xai to Pakbeng and Luang Prabang. Visit ethnic villages and Pak Ou Caves.' },
    { name: 'VTE-VV-LPQ (3D2N)', slug: 'three_days_two_nights_vte_vv_lpq', type: 'travel', image: 'https://southeastasiabackpacker.com/wp-content/uploads/2025/01/Gibbon-Experience-edited-1200x800.jpg', duration: '3 DAYS 2 NIGHTS', description: 'Efficient loop: Vientiane → Vang Vieng → Luang Prabang by private van and train. Includes Kuang Si Waterfall and temple tours.' },
    { name: '3 DAYS 2 NIGHTS LUANGPRABANG HERITAGE ESCAPE', slug: 'three_day_two_nights_luangpraband_heritage_escape', type: 'travel', image: 'https://s27363.pcdn.co/wp-content/uploads/2024/11/Laos-Header-Image.jpg.webp', duration: '3 DAYS 2 NIGHTS', description: 'UNESCO old town, Kuang Si Falls, Pak Ou Caves, and the famous alms-giving ceremony – all in a short heritage break.' },
    { name: 'VANG VIENG ADVENTURE DAY TRIP – FULL DAY', slug: 'vang_vieng_adventure_day_trip', type: 'travel', image: 'https://golaos.com/wp-content/uploads/2020/02/Huay-Xai-1-1.jpg', duration: 'FULL DAY', description: 'A perfect day trip from Vientiane to Vang Vieng: Blue Lagoon, Angel Cave, and stunning limestone views.' },
    { name: 'VIENTIANE CAPITAL DISCOVERY – FULL DAY', slug: 'vientiane_capital_discovery', type: 'travel', image: 'https://static2.tripoto.com/media/filter/tst/img/583082/TripDocument/1575279829_img_20191114_wa0012.jpg', duration: 'FULL DAY', description: 'Explore Pha That Luang, Patuxai, Buddha Park, and the Mekong riverside in a single day.' },
    { name: 'LUANG PRABANG & VANG VIENG EXPLORER – 4 DAYS / 3 NIGHTS', slug: 'luang_prabang_vang_vieng_explorer', type: 'travel', image: 'https://ilsvoyagent.fr/wp-content/uploads/2020/05/Fronti%C3%A8re-1024x576.jpg', duration: '4 DAYS 3 NIGHTS', description: 'Combine culture and adventure with high-speed train travel between Vientiane, Vang Vieng, and Luang Prabang.' },
    { name: 'SOUTHERN LAOS & 4,000 ISLANDS ESCAPE – 4 DAYS / 3 NIGHTS', slug: 'southern_laos_4000_islands_escape', type: 'travel', image: 'https://southeastasiabackpacker.com/wp-content/uploads/2025/01/Gibbon-Experience-edited-1200x800.jpg', duration: '4 DAYS 3 NIGHTS', description: 'Discover the Bolaven Plateau, Khone Phapheng Falls, and the tranquil 4,000 Islands in southern Laos.' }
  ];

  const golfPackagesList: Package[] = [
    { name: 'Vientiane Escape', slug: 'eight_days_seven_nights_golf_leisure', type: 'golf', image: 'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2018/06/06/5b172fb47abc957b64518a7b_GettyImages-942686126.jpg', duration: '4 Days / 3 Nights', description: '2 rounds at Long Vien & Lakeview courses. Includes luxury hotel, transfers, and temple tour.' },
    { name: 'Luang Prabang Adventure', slug: 'eight_days_seven_nights_golf_leisure', type: 'golf', image: 'https://media.npr.org/assets/img/2023/03/01/gettyimages-1410422468_wide-f64095a661d8b05ad0433ef9da08b1f83dd23d24.jpg', duration: '3 Days / 2 Nights', description: '1 round at Luang Prabang Golf Club + UNESCO city tour & Kuang Si Falls. Riverside hotel.' },
    { name: 'Vang Vieng Golf Retreat', slug: 'eight_days_seven_nights_golf_leisure', type: 'golf', image: 'https://www.pgaresort.com/images/content/homepageclubslidersmallimg/palm-harbor---innisbrook-resort---golf---2024-folklore-films-_12-1-.jpg', duration: '5 Days / 4 Nights', description: '3 rounds at Vang Vieng Golf Resort + hot air balloon, kayaking, and cave exploration.' },
    { name: 'Champasak Golf Tour', slug: 'eight_days_seven_nights_golf_leisure', type: 'golf', image: 'https://media.npr.org/assets/img/2023/03/01/gettyimages-1410422468_wide-f64095a661d8b05ad0433ef9da08b1f83dd23d24.jpg', duration: '6 Days / 5 Nights', description: '4 rounds + Vat Phou temple tour, Bolaven Plateau coffee visit. Luxury Mekong resort.' }
  ];

  const allPackages: Record<'golf' | 'travel', Package[]> = {
    golf: golfPackagesList,
    travel: travelPackagesList
  };

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
  const [isFading, setIsFading] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({ transform: 'translateX(0)', width: '0px' });

  const btnGolfRef = useRef<HTMLButtonElement>(null);
  const btnTravelRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const revealElementsRef = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const addToRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealElementsRef.current.includes(el)) {
      revealElementsRef.current.push(el);
      if (observerRef.current) observerRef.current.observe(el);
    }
  }, []);

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

  const renderCards = useCallback((category: 'golf' | 'travel') => {
    setIsFading(true);
    setTimeout(() => setIsFading(false), 300);
  }, []);

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
  }, []);

  const sendBookingEmail = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking Request Sent for: ${bookingPackage}`);
    closeBookingModal();
  }, [bookingPackage, closeBookingModal]);

  // Effects
  useEffect(() => {
    const urlCategory = getCategoryFromUrl();
    if (urlCategory !== currentCategory) {
      setCurrentCategory(urlCategory);
      renderCards(urlCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoryFromUrl, renderCards]);

  useEffect(() => {
    updateSliderPosition();
    window.addEventListener('resize', updateSliderPosition);
    return () => window.removeEventListener('resize', updateSliderPosition);
  }, [updateSliderPosition]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealElementsRef.current.forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const todayDate = new Date().toISOString().split('T')[0];

  // Helper to get detail link based on package type
  const getDetailLink = (pkg: Package) => {
    if (pkg.type === 'travel') {
      return `/travel_package_detail/${pkg.slug}`;
    } else {
      return `/package/${pkg.slug}`;
    }
  };

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
        .fleur-de-leah-regular {
          font-family: "Pinyon Script", cursive;
          font-weight: 400;
          letter-spacing: 2px;
        }
        h1, h2, h3, h4, .font-display { font-weight: 600; }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .golf-card {
          background: var(--card);
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
          display: flex;
          flex-direction: column;
        }
        .golf-card:hover { transform: translateY(-10px); box-shadow: 0 20px 50px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06); }
        .golf-card .card-img-wrap { position: relative; overflow: hidden; }
        .golf-card .card-img-wrap img { transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); width: 100%; height: 220px; object-fit: cover; }
        .golf-card:hover .card-img-wrap img { transform: scale(1.08); }
        .golf-card .card-img-wrap::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to top, rgba(27,67,50,0.5), transparent);
          pointer-events: none;
        }
        .travel-card .card-img-wrap::after { background: linear-gradient(to top, rgba(120,80,40,0.5), transparent); }
        .btn-primary, .btn-accent, .modal-btn, .cat-toggle-btn { font-family: inherit; }
        .btn-primary {
          background: var(--emerald-deep); color: white; padding: 10px 20px; border-radius: 10px;
          font-weight: 600; font-size: 0.85rem; border: none; cursor: pointer; transition: all 0.3s ease;
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          text-decoration: none; width: 100%;
        }
        .btn-primary:hover { background: var(--emerald-mid); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(27,67,50,0.3); }
        .btn-accent {
          background: linear-gradient(135deg, var(--accent), var(--accent-light)); color: white;
          padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 0.85rem;
          border: none; cursor: pointer; transition: all 0.3s ease;
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          text-decoration: none; width: 100%;
        }
        .btn-accent:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(200,96,42,0.35); }
        .divider-ornament { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 1rem auto 0; }
        .divider-ornament span { display: block; height: 2px; width: 40px; background: var(--border); border-radius: 2px; }
        .divider-ornament i { color: var(--gold); font-size: 0.55rem; }
        .cat-toggle {
          display: inline-flex; background: white; border-radius: 16px; padding: 5px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px var(--border); position: relative;
        }
        .cat-toggle-btn {
          position: relative; z-index: 2; padding: 12px 28px; border-radius: 12px;
          font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: color 0.3s ease;
          border: none; background: transparent; display: flex; align-items: center; gap: 8px; white-space: nowrap;
        }
        .cat-toggle-btn.active { color: white; }
        .cat-toggle-btn:not(.active) { color: var(--muted); }
        .cat-toggle-btn:not(.active):hover { color: var(--fg); }
        .cat-slider {
          position: absolute; top: 5px; left: 5px; height: calc(100% - 10px); border-radius: 12px;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
        }
        .cat-slider.golf { background: linear-gradient(135deg, var(--emerald-deep), var(--emerald-light)); box-shadow: 0 4px 16px rgba(27,67,50,0.35); }
        .cat-slider.travel { background: linear-gradient(135deg, var(--accent), var(--accent-light)); box-shadow: 0 4px 16px rgba(200,96,42,0.35); }
        .pkg-grid { transition: opacity 0.3s ease, transform 0.3s ease; }
        .pkg-grid.fading { opacity: 0; transform: translateY(12px); }
        .card-appear { animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
        @keyframes cardIn { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .price-tag {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          font-weight: 700; font-size: 1.5rem; letter-spacing: -0.01em;
        }
        html { scroll-behavior: smooth; }
        @media (max-width: 480px) { .cat-toggle-btn { padding: 10px 18px; font-size: 0.8rem; } }
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
        .flag-select { position: relative; margin-bottom: 1rem; }
        .flag-select select {
          width: 100%; padding: 0.9rem 1rem 0.9rem 2.8rem; border: 1.5px solid #e2e8f0;
          border-radius: 1rem; font-size: 1rem; background: white; cursor: pointer; appearance: none;
        }
        .flag-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.2rem; pointer-events: none; }
        @media (max-width: 640px) {
          .modal-content { width: 95%; padding: 1rem 1.25rem; border-radius: 1.5rem; margin: 1rem auto; max-height: 90vh; overflow-y: auto; box-sizing: border-box; }
          .modal-input, .modal-select { padding: 0.8rem 1rem; font-size: 1rem; }
          .flag-select select { padding: 0.8rem 1rem 0.8rem 2.5rem; }
          body.modal-open { overflow-x: hidden; position: fixed; width: 100%; }
          .modal { backdrop-filter: none; -webkit-backdrop-filter: none; background: rgba(0, 0, 0, 0.85); }
        }
      `}</style>

      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
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

        {/* Packages Section */}
        <section className="py-14 md:py-20 relative" id="packages">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-10 reveal" ref={addToRevealRef}>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)]">Choose Your Experience</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--emerald-deep)] mt-2 mb-1">Our Packages</h2>
              <p className="text-[var(--muted)] max-w-lg mx-auto text-sm leading-relaxed">Two paths, one unforgettable destination</p>
              <div className="divider-ornament mt-4"></div>
            </div>

            {/* Category Toggle */}
            <div className="flex justify-center mb-10 reveal" ref={addToRevealRef}>
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

            {/* Package Grid */}
            <div className={`pkg-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${isFading ? 'fading' : ''}`}>
              {allPackages[currentCategory].map((pkg, idx) => (
                <div
                  key={`${currentCategory}-${idx}`}
                  className={`${currentCategory === 'travel' ? 'travel-card' : 'golf-card'} card-appear`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="card-img-wrap">
                    <img src={pkg.image} alt={pkg.name} loading="lazy" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg text-[var(--emerald-deep)] leading-snug mb-2">{pkg.name}</h3>
                    <p className="text-[var(--muted)] text-xs leading-relaxed mb-4">{pkg.description.substring(0, 90)}...</p>
                    <div className="mt-auto">
                      <div className="flex items-end gap-1 mb-4"></div>
                      <div className="flex gap-2">
                        <button onClick={() => openBookingModal(pkg.name)} className="btn-primary flex-1">
                          <i className="fas fa-calendar-check text-xs"></i> Book
                        </button>
                        <Link href={getDetailLink(pkg)} className="btn-accent flex-1">
                          <i className="fas fa-eye text-xs"></i> Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <div className={`modal ${isModalOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && closeBookingModal()}>
        <div className="modal-content">
          <span className="modal-close" onClick={closeBookingModal}>&times;</span>
          <div className="modal-icon"><i className="fas fa-envelope-open-text"></i></div>
          <h3 className="modal-title">Request a Booking</h3>
          <p className="modal-subtitle">Booking: {bookingPackage}</p>
          <form onSubmit={sendBookingEmail}>
            <input type="hidden" name="packageName" value={bookingPackage} />
            <div className="flex flex-wrap gap-4 mb-3">
              <input type="text" className="modal-input flex-1 min-w-[120px]" placeholder="First Name" required />
              <input type="text" className="modal-input flex-1 min-w-[120px]" placeholder="Last Name" required />
            </div>
            <input type="email" className="modal-input mb-3" placeholder="Email Address" required />
            <input type="tel" className="modal-input mb-3" placeholder="Phone Number (optional)" />
            <div className="flag-select mb-3">
              <input type="text" className="modal-input mb-3" placeholder="Enter Nationality" required />
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <p className="flex items-center h-10 mb-5">Arrival Date</p>
              <input type="date" className="modal-input flex-1 min-w-[150px]" min={todayDate} required />
            </div>
            <div className="mb-3">
              <div className="flag-select mb-3">
                <input type="text" className="modal-input mb-3" placeholder="Number of Travellers" required />
              </div>
            </div>
            <textarea className="modal-input mb-3" rows={3} placeholder="Additional requests or travel dates..."></textarea>
            <button type="submit" className="modal-btn">
              <i className="fas fa-paper-plane"></i> Send Booking Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GolfTravelPackages;