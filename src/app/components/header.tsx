"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) setIsServicesDropdownOpen(false);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  // Helper function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false); // also close submenu for better UX
  };

  return (
    <>
      {/* OVERLAY / BACKDROP */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* HEADER */}
      <header className="bg-emerald-900 text-white sticky top-0 z-50 shadow-md w-full">
        <div className="w-full px-2">
          <div className="flex justify-between items-center h-14">
            {/* LOGO */}
            <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
              <span 
                className="text-3xl fleur-de-leah-regular" 
                style={{  color: '#FFE0B2' }}
              >
                Dream Destination Travel
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center space-x-2">
               <Link href="/" className="hover:text-[#ED6A02] transition px-3 py-2 text-base">
                Home
              </Link>
              <Link href="/book-now" className="hover:text-[#ED6A02] transition px-3 py-2 text-base">
                Book Now
              </Link>
              <div className="relative group">
                <button className="px-3 py-2 text-base hover:text-[#ED6A02] flex items-center gap-1 focus:outline-none">
                  Our Services{' '}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-3 h-3 fill-current">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full w-48 bg-emerald-800 text-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50 border-t border-emerald-700">
                  <Link href="/packages?category=travel" className="block px-4 py-2 hover:bg-[#ED6A02] hover:text-black transition">
                    Travel Packages
                  </Link>
                  <Link href="/packages?category=golf" className="block px-4 py-2 hover:bg-[#ED6A02] hover:text-black transition">
                    Golf Packages
                  </Link>
                  <Link href="/contactus" className="block px-4 py-2 hover:bg-[#ED6A02] hover:text-black transition">
                    Customize Package
                  </Link>
                </div>
              </div>
              <Link href="/gallery" className="hover:text-[#ED6A02] transition px-3 py-2 text-base">
                Our Gallery
              </Link>
              <Link href="/contactus" className="hover:text-[#ED6A02] transition px-3 py-2 text-base">
                Contact Us
              </Link>
              <Link href="/about" className="hover:text-[#ED6A02] transition px-3 py-2 text-base">
                About
              </Link>
            </nav>

            {/* MOBILE BUTTON */}
            <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded hover:bg-[#1A1A1A]/20 text-white focus:outline-none" aria-label="Toggle Menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} fixed inset-x-0 top-14 z-[60] md:hidden flex-col bg-emerald-800 border-t border-emerald-700 transition-all duration-300`}>
          <Link href="/book-now" className="block px-4 py-3 border-b border-white/10 hover:bg-emerald-700" onClick={closeMobileMenu}>
            Book Now
          </Link>
          <div className="border-b border-white/10">
            <button onClick={toggleServicesDropdown} className="w-full flex justify-between items-center px-4 py-3 hover:bg-emerald-700 focus:outline-none">
              <span>Our Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-3 h-3 fill-current transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}>
                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </button>
            <div className={`${isServicesDropdownOpen ? 'block' : 'hidden'} bg-emerald-900/50`}>
              <Link href="/packages?category=travel" className="block px-8 py-3 text-sm hover:bg-emerald-700" onClick={closeMobileMenu}>
                • Travel Packages
              </Link>
              <Link href="/packages?category=golf" className="block px-8 py-3 text-sm hover:bg-emerald-700" onClick={closeMobileMenu}>
                • Golf Packages
              </Link>
              <Link href="/contactus" className="block px-8 py-3 text-sm hover:bg-emerald-700" onClick={closeMobileMenu}>
                • Customize Package
              </Link>
            </div>
          </div>
          <Link href="/gallery" className="block px-4 py-3 border-b border-white/10 hover:bg-emerald-700" onClick={closeMobileMenu}>
            Our Gallery
          </Link>
          <Link href="/contactus" className="block px-4 py-3 border-b border-white/10 hover:bg-emerald-700" onClick={closeMobileMenu}>
            Contact Us
          </Link>
          <Link href="/about" className="block px-4 py-3 hover:bg-emerald-700" onClick={closeMobileMenu}>
            About
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;