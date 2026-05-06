'use client';   // Required for App Router if using client-side state

import React, { useState } from 'react';

interface BookingModalProps {
  bookingModalOpen: boolean;
  closeBookingModal: () => void;
  bookingPackageName: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  bookingModalOpen,
  closeBookingModal,
  bookingPackageName,
}) => {
  const [loading, setLoading] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      nationality: formData.get('nationality'),
      arrivalDate: formData.get('arrivalDate'),
      travellers: formData.get('travellers'),
      requests: formData.get('requests'),
      packageName: formData.get('packageName'),
    };

    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert('Booking request sent! We will contact you within 24 hours.');
        closeBookingModal();
        form.reset();
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send booking request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingModalOpen) return null;

  return (
    <div className={`modal active`} onClick={(e) => { if (e.target === e.currentTarget) closeBookingModal(); }}>
      <div className="modal-content">
        <span className="modal-close sticky" onClick={closeBookingModal}>&times;</span>
        <div className="modal-icon"><i className="fas fa-envelope-open-text"></i></div>
        <h3 className="modal-title">Request a Booking</h3>
        <p className="modal-subtitle">Booking: {bookingPackageName}</p>

        <form onSubmit={handleBookingSubmit}>
          <input type="hidden" name="packageName" value={bookingPackageName} />

          <div className="flex flex-wrap gap-4 mb-3">
            <input type="text" name="firstName" className="modal-input flex-1 min-w-[120px]" placeholder="First Name" required />
            <input type="text" name="lastName" className="modal-input flex-1 min-w-[120px]" placeholder="Last Name" required />
          </div>

          <input type="email" name="email" className="modal-input mb-3" placeholder="Email Address" required />
          <input type="tel" name="phone" className="modal-input mb-3" placeholder="Phone Number (optional)" />
          <input type="text" name="nationality" className="modal-input mb-3" placeholder="Nationality" required />

          <div className="flex items-center gap-4 mb-3">
            <p className="flex items-center h-10 mb-5">Arrival Date</p>
            <input type="date" name="arrivalDate" className="modal-input flex-1" required />
          </div>

          <input type="number" name="travellers" className="modal-input mb-3" placeholder="Number of Travellers" required />
          <textarea name="requests" className="modal-input mb-3" rows={3} placeholder="Additional requests or travel dates..."></textarea>

          <button type="submit" className="modal-btn" disabled={loading}>
            <i className="fas fa-paper-plane"></i> {loading ? 'Sending...' : 'Send Booking Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;