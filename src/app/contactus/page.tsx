"use client";
import React, { useState } from "react";

const ContactUs: React.FC = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPackageName, setModalPackageName] = useState(
    "Fill in your details and we'll contact you"
  );

  // Booking form state (nationality removed)
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMessage, setUserMessage] = useState("");

  // Contact form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Loading state for contact form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal handlers
  const openBookingModal = (packageName?: string) => {
    if (packageName) {
      setModalPackageName(`Request booking for: ${packageName}`);
    } else {
      setModalPackageName("Fill in your details and we'll contact you");
    }
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setUserName("");
    setUserLastName("");
    setUserEmail("");
    setUserPhone("");
    setUserMessage("");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Request:", {
      name: userName,
      lastName: userLastName,
      email: userEmail,
      phone: userPhone,
      message: userMessage,
    });
    alert("Booking request sent! We will contact you within 24 hours.");
    closeBookingModal();
  };

  // UPDATED: Async submit handler with API call
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      alert("Message sent successfully! We will get back to you soon.");
      // Reset form on success
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Contact form error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

        /* Responsive form styles for small devices */
        @media (max-width: 375px) {
          .form-input {
            font-size: 16px !important;
            padding: 12px !important;
          }

          .contact-card {
            padding: 1rem !important;
          }

          .contact-icon {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.2rem !important;
          }

          .contact-text {
            font-size: 0.9rem !important;
          }

          .contact-text-lg {
            font-size: 1rem !important;
          }
        }

        .fleur-de-leah-regular {
          font-family: "Pinyon Script", cursive;
          font-weight: 400;
          letter-spacing: 2px;
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
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .modal-close:hover {
          color: #ED6A02;
        }

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

        /* Mobile Fix */
        @media (max-width: 640px) {
          .modal-content {
            width: 95%;
            padding: 1rem 1.25rem;
            border-radius: 1.5rem;
            margin: 1rem auto;
            box-sizing: border-box;
          }
          .modal {
            backdrop-filter: none;
            background: rgba(0, 0, 0, 0.85);
          }
        }
      `}</style>

      <main className="flex-1 flex flex-col items-center p-4 sm:p-6 bg-[#f0f7f0] min-h-screen">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-center text-[#2E7D32] mb-6 sm:mb-8 mt-4 sm:mt-5 tracking-tight">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* LEFT COLUMN: Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#2E7D32]/20 contact-card">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2E7D32] mb-4 sm:mb-6 flex items-center">
                <i className="fas fa-circle-info text-[#ED6A02] mr-2 sm:mr-3"></i>{" "}
                Contact Information
              </h2>
              {/* Phone */}
              <div className="flex items-start mb-4 sm:mb-6 group hover:bg-[#f0f7f0] p-2 sm:p-3 rounded-xl transition">
                <div className="bg-[#2E7D32]/10 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 group-hover:bg-[#ED6A02]/10 contact-icon">
                  <i className="fas fa-phone-alt text-xl sm:text-2xl text-[#2E7D32] group-hover:text-[#ED6A02]"></i>
                </div>
                <div className="contact-text">
                  <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800 contact-text-lg">
                    +856 20 55 609 634
                  </p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start mb-4 sm:mb-6 group hover:bg-[#f0f7f0] p-2 sm:p-3 rounded-xl transition">
                <div className="bg-[#2E7D32]/10 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 group-hover:bg-[#ED6A02]/10 contact-icon">
                  <i className="fas fa-envelope text-xl sm:text-2xl text-[#2E7D32] group-hover:text-[#ED6A02]"></i>
                </div>
                <div className="contact-text" style={{ wordBreak: "break-word" }}>
                  <p className="text-xs sm:text-sm text-gray-500">Email</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-800 contact-text-lg">
                     dreamdestination.laos28@gmail.com
                  </p>
                </div>
              </div>
              {/* Office */}
              <div className="flex items-start mb-6 sm:mb-8 group hover:bg-[#f0f7f0] p-2 sm:p-3 rounded-xl transition">
                <div className="bg-[#2E7D32]/10 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 group-hover:bg-[#ED6A02]/10 contact-icon">
                  <i className="fas fa-map-marker-alt text-xl sm:text-2xl text-[#2E7D32] group-hover:text-[#ED6A02]"></i>
                </div>
                <div className="contact-text">
                  <p className="text-xs sm:text-sm text-gray-500">Head Office</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800 contact-text-lg">
                    No.624, Nongbuathong Nuea,Vientiane,Lao 
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">Laos</p>
                </div>
              </div>
              {/* Social Media Links */}
              <h3 className="text-lg sm:text-xl font-semibold text-[#2E7D32] mb-3 sm:mb-4 flex items-center">
                <i className="fas fa-share-alt text-[#ED6A02] mr-2"></i> Follow
                Us
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://wa.me/8562012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 border-2 border-[#2E7D32] flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                >
                  <i
                    className="fab fa-whatsapp text-xl sm:text-2xl"
                    style={{ color: "#2E7D32" }}
                  ></i>
                </a>
                <a
                  href="https://www.facebook.com/share/1Sb6Kqto8S/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                >
                  <i className="fab fa-facebook-f text-xl sm:text-2xl text-white"></i>
                </a>
                <a
                  href="https://www.instagram.com/dreamdestinationtraveltour?igsh=aWhjZGo0aHhrb2du&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#FCAF45] rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                >
                  <i className="fab fa-instagram text-xl sm:text-2xl text-white"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@dream.destination28?_r=1&_t=ZS-97VE8ItpYal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                >
                  <i className="fab fa-tiktok text-xl sm:text-2xl text-white"></i>
                </a>

                <a
                  href="https://t.me/DDTLAOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0088cc] rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform duration-200 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                >
                  <i className="fab fa-telegram-plane text-xl sm:text-2xl text-white"></i>
                </a>
            
                
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 italic">
                We typically respond within 24 hours on business days.
              </p>
            </div>

            {/* RIGHT COLUMN: Send Email Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#2E7D32]/20 contact-card">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2E7D32] mb-4 sm:mb-6 flex items-center">
                <i className="fas fa-paper-plane text-[#ED6A02] mr-2 sm:mr-3"></i>{" "}
                Send us a message
              </h2>
              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-extrabold mb-1">
                      First Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold mb-1">
                      Last Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-extrabold mb-1">
                    Email Address <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-1">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-extrabold mb-1">
                    Message <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition resize-none"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2E7D32] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-[#ED6A02] transition duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i> Send Message
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-3 sm:mt-4">
                  We'll never share your information. By submitting, you agree
                  to our privacy policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      
    </>
  );
};

export default ContactUs;