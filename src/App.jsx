import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import News from './components/News';
import Menu from './components/Menu';
import Image from './components/Image';
import Therapist from './components/Therapist';
import Philosophy from './components/Philosophy';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Access from './components/Access';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);

  return (
    <div className="bg-white min-h-screen font-serif">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero setBookingModal={setBookingModal} />
      <News />
      <Menu />
      <Image />
      <Therapist />
      <Philosophy />
      <Reviews />
      <FAQ />
      <Access setBookingModal={setBookingModal} />
      <BookingModal bookingModal={bookingModal} setBookingModal={setBookingModal} />
      <Footer />
    </div>
  );
}
