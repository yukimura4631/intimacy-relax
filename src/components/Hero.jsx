import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero({ setBookingModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    'linear-gradient(135deg, rgba(245, 241, 237, 0.95) 0%, rgba(232, 223, 216, 0.95) 100%)',
    'linear-gradient(135deg, rgba(237, 232, 227, 0.95) 0%, rgba(221, 210, 202, 0.95) 100%)',
    'linear-gradient(135deg, rgba(240, 233, 226, 0.95) 0%, rgba(224, 213, 204, 0.95) 100%)',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-20 relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 transition-all duration-1000" style={{ background: heroImages[currentSlide] }} />
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-50 rounded-full opacity-20 blur-3xl" />
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h2 className="text-6xl md:text-7xl font-light text-purple-900 mb-4 tracking-wider">INTIMACY</h2>
        <p className="text-xl md:text-2xl text-purple-700 mb-6 font-light">寄り添いの癒し</p>
        <p className="text-gray-700 mb-8 leading-relaxed">疲れた時に気兼ねなく足を運べる空間。<br />あなたの心と身体に寄り添う、完全個室のリラクゼーション。</p>
        <button onClick={() => setBookingModal(true)} className="px-8 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition-all shadow-lg hover:shadow-xl text-sm tracking-wide">予約する</button>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-purple-700' : 'w-2 bg-purple-300'}`} />
        ))}
      </div>
      <div className="absolute bottom-8 right-8 animate-bounce">
        <ChevronDown size={24} className="text-purple-700" />
      </div>
    </section>
  );
}
