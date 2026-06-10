'use client';
import React from 'react';

const AboutPage: React.FC = () => {
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

        /* Modal Styles (kept for consistency) */
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

        .modal-input,
        .modal-select {
          width: 100%;
          padding: 0.9rem 1rem;
          margin-bottom: 1rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 1rem;
          font-size: 1rem;
          background: white;
          box-sizing: border-box;
        }

        .modal-input:focus,
        .modal-select:focus {
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

        .flag-select {
          position: relative;
          margin-bottom: 1rem;
        }
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

        /* Mobile Fix */
        @media (max-width: 640px) {
          .modal-content {
            width: 95%;
            padding: 1rem 1.25rem;
            border-radius: 1.5rem;
            margin: 1rem auto;
            box-sizing: border-box;
          }
          .modal { backdrop-filter: none; background: rgba(0, 0, 0, 0.85); }
        }
        .fleur-de-leah-regular {
          font-family: "Pinyon Script", cursive;
          font-weight: 400;
          letter-spacing: 2px;
        }
      `}</style>

      <main className="flex-1 flex flex-col items-center p-6 bg-[#f0f7f0]">
        <div className="w-full max-w-6xl mx-auto">
          {/* Our Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4 flex items-center">
                <i className="fas fa-leaf text-[#ED6A02] mr-3"></i> Our Story
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-justify">
              ABOUT US: Our company is providing international standard for Tour,
              and Travel that is committed to providing the best service
              for customers with the slogan 2024 visit Laos Year
              campaign is “A paradise of Lao Cultural, Nature and
              History." which was established in 2024. And we offer
              comprehensive employee outsourcing services tailored to
              the needs of international companies, ensuring seamless
              integration and operational efficiency.
              Our services include local & international with lots of
              experience handling Government Agencies and
              Companies that are our partners with competitive prices,
              real time automatic 24 hour systems and negotiable.              </p>
              
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://i.imgur.com/bhpNAZe.jpeg" 
                className="rounded-2xl shadow-lg h-48 w-full object-cover" 
                alt="Travel scenery 1"
              />
              {/* <img 
                src="https://i.imgur.com/gkXBM9U.jpeg" 
                className="rounded-2xl shadow-lg h-48 w-full object-cover mt-8" 
                alt="Travel scenery 2"
              /> */}
             <hr />
              <img 
                src="https://i.imgur.com/gkXBM9U.jpeg" 
                className="rounded-2xl shadow-lg h-48 w-full object-cover " 
                alt="Travel scenery 4"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutPage;