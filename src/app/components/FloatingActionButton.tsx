'use client';

import React, { useState, useEffect, useRef } from 'react';

const FloatingActionButton: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const copyEmailToClipboard = async () => {
    const email = 'dreamdestination@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPopupOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopupOpen]);

  return (
    <>
      <style jsx>{`
        .fab-container {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 10001;
        }
        .fab-main {
          width: 64px;
          height: 64px;
          background: linear-gradient(145deg, #2e7d32, #1b5e20);
          border-radius: 50%;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          outline: none;
          color: white;
        }
        .fab-main i {
          font-size: 32px;
          transition: transform 0.2s;
        }
        .fab-main:hover {
          transform: scale(1.06);
          background: linear-gradient(145deg, #ed6a02, #c95a02);
        }
        .fab-main:active {
          transform: scale(0.96);
        }
        .fab-popup {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 280px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          visibility: hidden;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          transition: visibility 0.2s, opacity 0.2s,
            transform 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          z-index: 10001;
        }
        .fab-popup.active {
          visibility: visible;
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .popup-header {
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          color: white;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }
        .popup-header i {
          font-size: 1.2rem;
        }
        .popup-header span {
          flex: 1;
        }
        .popup-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 1.4rem;
          cursor: pointer;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .popup-close:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .popup-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .popup-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: #f8fafc;
          border-radius: 48px;
          text-decoration: none;
          color: #1f2a3e;
          font-weight: 500;
          transition: all 0.2s;
          border: 1px solid #e2e8f0;
        }
        .popup-link:hover {
          background: #eef2ff;
          transform: translateX(-3px);
          border-color: #2e7d32;
        }
        .popup-link i:first-child {
          font-size: 20px;
          color: #2e7d32;
          width: 24px;
        }
        .popup-link span {
          flex: 1;
        }
        .popup-link i:last-child {
          font-size: 12px;
          color: #94a3b8;
        }
        .popup-copy {
          background: #f8fafc;
          border-radius: 48px;
          padding: 6px 12px 6px 16px;
          border: 1px solid #e2e8f0;
        }
        .copy-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .copy-row i:first-child {
          font-size: 20px;
          color: #2e7d32;
        }
        .copy-row span {
          flex: 1;
          font-size: 0.9rem;
          font-weight: 500;
          color: #1e293b;
          word-break: break-all;
        }
        .copy-btn {
          background: #2e7d32;
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 40px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .copy-btn:hover {
          background: #ed6a02;
        }
        .toast-msg {
          position: fixed;
          bottom: 110px;
          right: 28px;
          background: #1e293b;
          color: white;
          padding: 10px 20px;
          border-radius: 40px;
          font-size: 0.85rem;
          font-weight: 500;
          z-index: 11000;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(6px);
          background: rgba(0, 0, 0, 0.85);
          transition: opacity 0.2s;
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
        }
        .toast-msg.show {
          opacity: 1;
        }
        @media (max-width: 550px) {
          .fab-container {
            bottom: 20px;
            right: 20px;
          }
          .fab-main {
            width: 56px;
            height: 56px;
          }
          .fab-popup {
            width: 260px;
            right: 0;
            bottom: 70px;
          }
          .toast-msg {
            bottom: 95px;
            right: 20px;
            font-size: 0.75rem;
          }
        }
      `}</style>

      <div className="fab-container">
        <button
          ref={buttonRef}
          className="fab-main"
          onClick={togglePopup}
          aria-label="Open actions"
        >
          <i className="fas fa-comment-dots"></i>
        </button>

        <div ref={popupRef} className={`fab-popup ${isPopupOpen ? 'active' : ''}`}>
          <div className="popup-header">
            <i className="fas fa-headset"></i>
            <span>Contact & Support</span>
            <button className="popup-close" onClick={closePopup}>
              &times;
            </button>
          </div>
          <div className="popup-content">
            <a
              href="https://chat.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="popup-link"
            >
              <i className="fab fa-google"></i>
              <span>Open Google Chat</span>
              <i className="fas fa-external-link-alt"></i>
            </a>
            <div className="popup-copy">
              <div className="copy-row">
                <i className="fas fa-envelope"></i>
                <span id="emailText">dreamdestination@gmail.com</span>
                <button className="copy-btn" onClick={copyEmailToClipboard}>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`toast-msg ${toastVisible ? 'show' : ''}`}>
          Email copied to clipboard!
        </div>
      </div>
    </>
  );
};

export default FloatingActionButton;