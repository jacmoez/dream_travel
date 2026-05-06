'use client';
import React, { useState, useEffect } from 'react';

const BookNowPage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interests: [] as string[],
    destinations: [] as string[],
    nationality: '',
    arrivalDate: '',
    departureDate: '',
    numberOfTravellers: '',
    message: '',
  });

  // Set min date for arrival/departure inputs
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    // We'll use state to set min attribute in JSX directly
    // So just store today's date in a constant for use in render
    // No need for DOM manipulation
  }, []);

  const todayDate = new Date().toISOString().split('T')[0];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const { value: checkboxValue, checked } = checkbox;
      if (name === 'interests') {
        setFormData(prev => ({
          ...prev,
          interests: checked
            ? [...prev.interests, checkboxValue]
            : prev.interests.filter(v => v !== checkboxValue),
        }));
      } else if (name === 'destinations') {
        setFormData(prev => ({
          ...prev,
          destinations: checked
            ? [...prev.destinations, checkboxValue]
            : prev.destinations.filter(v => v !== checkboxValue),
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send data to an API or email service
    // For now, show an alert with the collected data
    alert(`Booking request sent!\n\nWe'll get back to you within 24 hours.\n\nDetails:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nInterests: ${formData.interests.join(', ')}\nDestinations: ${formData.destinations.join(', ')}\nNationality: ${formData.nationality}\nArrival: ${formData.arrivalDate}\nDeparture: ${formData.departureDate}\nTravellers: ${formData.numberOfTravellers}\nMessage: ${formData.message}`);
    // Reset form if desired
    // setFormData(initialState);
  };

  return (
    <>
      <style>{`
        body {
          background: #f0f7f0;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Make the native date picker larger and more readable */
        input[type="date"] {
          min-height: 48px;
          font-size: 1rem;
          padding-right: 0.5rem;
        }

        /* Style the calendar popup for Chrome/Edge/Safari */
        input[type="date"]::-webkit-calendar-picker-indicator {
          width: 24px;
          height: 24px;
          padding: 4px;
          cursor: pointer;
          background-color: #f0f7f0;
          border-radius: 50%;
          transition: all 0.2s;
        }

        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          background-color: #2E7D32;
          filter: invert(1);
        }

        /* For Firefox, the popup is system default, but we ensure the input is large */
        @supports (-moz-appearance: none) {
          input[type="date"] {
            font-size: 1rem;
            padding: 0.75rem 1rem;
          }
        }

        /* Make the date input field visually consistent */
        input[type="date"]::-webkit-datetime-edit {
          padding: 0 0.25rem;
          font-size: 1rem;
        }

        /* Force the date picker popup to be larger where possible (WebKit/Blink) */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          ::-webkit-datetime-edit {
            font-size: 1.1rem;
          }

          ::-webkit-calendar-picker-indicator {
            scale: 1.2;
            margin-right: 4px;
          }
        }

        .fleur-de-leah-regular {
          font-family: "Fleur De Leah", cursive;
          font-weight: 400;
          font-style: italic;
        }

        .fleur-de-leah-regular {
          /* font-family: "Fleur De Leah", cursive; */
          font-family: "Pinyon Script", cursive;
          font-weight: 400;
          letter-spacing: 2px;
          /* font-style: italic; */
        }
      `}</style>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full bg-[#f0f7f0]">
        {/* Back Button (commented out as per original) */}
        {/* <a href="javascript:history.back()"
          className="inline-flex items-center text-[#2E7D32] hover:text-[#ED6A02] transition mb-4">
          <i className="fas fa-arrow-left mr-2"></i> Back
        </a> */}

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#2E7D32] mb-6 text-center">Book Your Dream Trip</h1>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT COLUMN: Contact Options */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">Contact Us Directly</h2>
            <p className="text-gray-600 mb-6">Choose your preferred way to reach us:</p>

            {/* Social Contact Buttons */}
            <div className="space-y-4">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#1877F2] transition group">
                <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-2xl">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Facebook</h3>
                  <p className="text-gray-500 text-sm">@dreamdestination.travel</p>
                </div>
                <i className="fas fa-arrow-right ml-auto text-gray-400 group-hover:text-[#1877F2]"></i>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#25D366] transition group">
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">WhatsApp</h3>
                  <p className="text-gray-500 text-sm">+856 205 825 0515</p>
                </div>
                <i className="fas fa-arrow-right ml-auto text-gray-400 group-hover:text-[#25D366]"></i>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#E4405F] transition group">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#FCAF45] via-[#E4405F] to-[#833AB4] rounded-full flex items-center justify-center text-white text-2xl">
                  <i className="fab fa-instagram"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Instagram</h3>
                  <p className="text-gray-500 text-sm">@dreamdestination.laos</p>
                </div>
                <i className="fas fa-arrow-right ml-auto text-gray-400 group-hover:text-[#E4405F]"></i>
              </a>

              {/* Telegram */}
              <a href="https://t.me/dreamdestination" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#0088cc] transition group">
                <div className="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center text-white text-2xl">
                  <i className="fab fa-telegram-plane"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Telegram</h3>
                  <p className="text-gray-500 text-sm">@dreamdestination</p>
                </div>
                <i className="fas fa-arrow-right ml-auto text-gray-400 group-hover:text-[#0088cc]"></i>
              </a>

              {/* Phone */}
              <a href="tel:+8562012345678"
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#2E7D32] transition group">
                <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center text-white text-2xl">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-gray-500 text-sm">+856 205 825 0515</p>
                </div>
                <i className="fas fa-arrow-right ml-auto text-gray-400 group-hover:text-[#2E7D32]"></i>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Email Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">Send us an Email</h2>
            <p className="text-gray-600 mb-6">We'll get back to you within 24 hours</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-extrabold  mb-1">First Name <span className='text-red-700'>*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold  mb-1">Last Name <span className='text-red-700'>*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-extrabold  mb-1">Email Address <span className='text-red-700'>*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-extrabold">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                />
              </div>

              {/* Interests (Travel/Golf) */}
              <div>
                <label className="block text-sm font-extrabold  mb-2">Interested In Laos <span className='text-red-700'>*</span></label>
                <div className="flex flex-row grid grid-cols-2 gap-4">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="interests"
                      value="Travel"
                      checked={formData.interests.includes('Travel')}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5 text-[#2E7D32] border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Travel Package</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="interests"
                      value="Golf"
                      checked={formData.interests.includes('Golf')}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5 text-[#2E7D32] border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Golf Package</span>
                  </label>
                </div>
              </div>

              {/* Destinations */}
              <div>
                <label className="block text-sm font-extrabold  mb-2">Interested Destinations <span className='text-red-700'>*</span></label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Luang Prabang', 'Vang Vieng', 'Kuang Si Falls', 'Plain of Jars',
                    'Mekong River', 'Bolaven Plateau', 'Vientiane', 'Nam Ou River',
                    'Phonsavan', 'Tham Chang Cave', 'Don Det (4000 Islands)', 'Wat Phu'
                  ].map(dest => (
                    <label key={dest} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="destinations"
                        value={dest}
                        checked={formData.destinations.includes(dest)}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-[#2E7D32] border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{dest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-sm font-extrabold  mb-1">Nationality <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name="nationality"
                  required
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                />
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1 font-extrabold">Arrival Date</label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                    min={todayDate}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                    style={{ minHeight: '52px', fontSize: '1.05rem' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-gray-700 mb-1">Departure Date</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    min={todayDate}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                    style={{ minHeight: '52px', fontSize: '1.05rem' }}
                  />
                </div>
              </div>

              {/* Number of Travelers */}
              <div>
                <label className="block text-sm font-extrabold text-gray-700 mb-1">Number of Travellers</label>
                <input
                  type="number"
                  name="numberOfTravellers"
                  value={formData.numberOfTravellers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-extrabold text-gray-700 mb-1">Message / Special Requests</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none transition"
                  placeholder="Tell us about your dream trip..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#ED6A02] text-white py-3 rounded-lg font-bold hover:bg-[#2E7D32] transition flex items-center justify-center gap-2 text-lg"
              >
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookNowPage;