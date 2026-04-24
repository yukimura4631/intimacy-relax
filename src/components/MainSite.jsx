'use client';

import React, { useEffect, useRef, useState } from 'react';

import AccessSection from './sections/AccessSection';
import FaqSection from './sections/FaqSection';
import FooterSection from './sections/FooterSection';
import HeroSection from './sections/HeroSection';
import ImageModal from './sections/ImageModal';
import MenuModal from './sections/MenuModal';
import MenuSection from './sections/MenuSection';
import MobileMenuOverlay from './sections/MobileMenuOverlay';
import NavBar from './sections/NavBar';
import NewsSection from './sections/NewsSection';
import PhilosophySection from './sections/PhilosophySection';
import TherapistSection from './sections/TherapistSection';
import FloatingBookingButton from './FloatingBookingButton';
import { isSupabaseConfigured, supabase, supabaseConfigWarning } from '../supabaseClient';

export default function MainSite() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuSlideIndex, setMenuSlideIndex] = useState(0);
  const menuTouchStartX = useRef(null);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [newsImageModalOpen, setNewsImageModalOpen] = useState(false);
  const [newsImageModalUrl, setNewsImageModalUrl] = useState('');
  const [newsImageModalAlt, setNewsImageModalAlt] = useState('');

  const heroImageSrcs = ['/images/NewTop.png', '/images/TopSecond.png', '/images/TopThird.png'];

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);

    if (typeof media.addEventListener === 'function') media.addEventListener('change', onChange);
    else media.addListener(onChange);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImageSrcs.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', onChange);
      else media.removeListener(onChange);
    };
  }, [heroImageSrcs.length]);

  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  const menuItems = [
    { name: 'お知らせ', id: 'news' },
    { name: 'メニュー', id: 'menu' },
    { name: 'セラピスト', id: 'therapist' },
    { name: '理念', id: 'philosophy' },
    { name: 'アクセス', id: 'access' },
    { name: '予約', id: 'booking' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const menuSlides = [
    { src: '/images/menu.png', alt: 'メニュー' },
    { src: '/images/AromaMenu.png', alt: 'アロマメニュー' },
    { src: '/images/90m.png', alt: '90分メニュー' },
    { src: '/images/120m.png', alt: '120分メニュー' },
    { src: '/images/150m.png', alt: '150分メニュー' },
  ];

  const goMenuPrev = () => {
    setMenuSlideIndex((prev) => (prev - 1 + menuSlides.length) % menuSlides.length);
  };

  const goMenuNext = () => {
    setMenuSlideIndex((prev) => (prev + 1) % menuSlides.length);
  };

  const handleMenuTouchStart = (event) => {
    menuTouchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleMenuTouchEnd = (event) => {
    if (menuTouchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? menuTouchStartX.current;
    const deltaX = endX - menuTouchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        goMenuPrev();
      } else {
        goMenuNext();
      }
    }
    menuTouchStartX.current = null;
  };

  const openMenuModal = (slideIndex) => {
    setMenuSlideIndex(slideIndex);
    setMenuModalOpen(true);
  };

  const closeMenuModal = () => {
    setMenuModalOpen(false);
  };

  const openNewsImageModal = (url, alt) => {
    setNewsImageModalUrl(url || '');
    setNewsImageModalAlt(alt || '');
    setNewsImageModalOpen(Boolean(url));
  };

  const closeNewsImageModal = () => {
    setNewsImageModalOpen(false);
    setNewsImageModalUrl('');
    setNewsImageModalAlt('');
  };

  const [newsItems, setNewsItems] = useState(() => [
    {
      date: '2026-4-20',
      title: 'HP完成',
      content: '女性専用リラクゼーションサロン「INTIMACY」',
    },
  ]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsLoadError, setNewsLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadNews = async () => {
      if (!isSupabaseConfigured || !supabase) return;
      setNewsLoading(true);
      setNewsLoadError('');

      const { data, error } = await supabase
        .from('news')
        .select('id,date,title,content,sort_order,image_url')
        .order('sort_order', { ascending: true, nullsFirst: true })
        .order('date', { ascending: false });

      if (cancelled) return;
      if (error) {
        setNewsLoadError('お知らせの読み込みに失敗しました。時間をおいて再度お試しください。');
        setNewsLoading(false);
        return;
      }

      if (Array.isArray(data) && data.length > 0) setNewsItems(data);
      setNewsLoading(false);
    };

    loadNews();
    return () => {
      cancelled = true;
    };
  }, []);

  const faq = [
    {
      q: '初めてなんですが、予約の時に何か準備が必要ですか？',
      a: '特に準備は必要ありません。手ぶらでご利用いただけます。',
    },
    {
      q: '当日予約は可能ですか？',
      a: 'はい。当日予約大歓迎です。お気軽にご連絡ください。',
    },
    {
      q: '駐車場はありますか？',
      a: 'ご用意がありません。恐れ入りますが、近隣コインパーキングのご利用をお願いいたします。',
    },
    {
      q: 'メンズでも利用できますか？',
      a: '当店は女性専用サロンとさせていただいております。',
    },
  ];

  const pageWidth = isMobile ? '92vw' : '70vw';
  const navHeight = isMobile ? 52 : 64;
  const [bookingInView, setBookingInView] = useState(false);
  const [menuPassed, setMenuPassed] = useState(false);

  const styles = {
    nav: {
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: isMobile ? '0.15rem 0.5rem' : '0.65rem 1.25rem',
    },
    navContainer: {
      width: pageWidth,
      margin: '0 auto',
      padding: isMobile ? 0 : '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: isMobile ? '0.75rem' : undefined,
    },
    contentWrap: {
      width: pageWidth,
      margin: '0 auto',
      padding: isMobile ? '0 0.75rem' : '0 1rem',
    },
    hero: {
      marginTop: `${navHeight + 8}px`,
      position: 'relative',
      minHeight: isMobile ? 'auto' : `calc(100svh - ${navHeight}px)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    heroMedia: {
      width: pageWidth,
      margin: '0 auto',
      padding: isMobile ? '1.5rem 0' : '1rem 0',
      display: 'flex',
      justifyContent: 'center',
    },
    heroImage: {
      width: '100%',
      maxWidth: isMobile ? 'min(92vw, 520px)' : 'min(70vw, 860px)',
      height: 'auto',
      maxHeight: isMobile ? `calc(56svh - ${navHeight}px)` : `calc(70svh - ${navHeight}px)`,
      objectFit: 'contain',
      display: 'block',
    },
    h3: {
      fontSize: isMobile ? '1.25rem' : '2rem',
      fontWeight: 400,
      color: '#4c1d95',
      marginBottom: isMobile ? '1rem' : '2rem',
      textAlign: 'center',
    },
    section: {
      padding: isMobile ? '1rem 0' : '5rem 0',
      scrollMarginTop: `${navHeight + 8}px`,
    },
    newsScroller: {
      flexDirection: 'column',
      gap: '1.25rem',
      height: '100%',
      overflowY: 'auto',
      paddingRight: '0.5rem',
      paddingBottom: '0.25rem',
      WebkitOverflowScrolling: 'touch',
      overscrollBehaviorY: 'contain',
      scrollbarGutter: 'stable',
      scrollbarWidth: 'thin',
      touchAction: 'pan-y',
      marginBottom: '2rem',
    },
    newsViewport: {
      height: 'clamp(320px, 60svh, 720px)',
      overflow: 'hidden',
      borderRadius: '0.75rem',
    },
    newsCard: {
      width: '100%',
    },
    newsImageWrap: {
      width: '100%',
      height: 'clamp(180px, 32vh, 420px)',
      overflow: 'hidden',
      borderRadius: '0.75rem',
      border: '1px solid rgba(0,0,0,0.06)',
      backgroundColor: '#f5f3ff',
      marginBottom: '1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    newsImage: {
      maxWidth: '90%',
      maxHeight: '90%',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
      display: 'block',
    },
    menuScroller: {
      position: 'relative',
      overflow: 'hidden',
    },
    menuTrack: {
      display: 'flex',
      transition: 'transform 0.5s ease',
    },
    menuSlide: {
      minWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    menuImage: {
      width: isMobile ? 'min(100%)' : 'min(60vw, 480px)',
      height: 'auto',
      display: 'block',
      borderRadius: '0.75rem',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      backgroundColor: 'white',
      cursor: 'pointer',
    },
    menuArrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: isMobile ? '36px' : '40px',
      height: isMobile ? '36px' : '40px',
      borderRadius: '9999px',
      border: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4c1d95',
      fontSize: isMobile ? '1.1rem' : '1.25rem',
    },
    menuDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      margin: '1rem 0 2rem',
    },
    menuDot: {
      width: '8px',
      height: '8px',
      borderRadius: '9999px',
      border: 'none',
      backgroundColor: '#d6c7e6',
      cursor: 'pointer',
      padding: 0,
    },
    menuDotActive: {
      backgroundColor: '#4c1d95',
    },
    menuModalBackdrop: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    },
    menuModalBody: {
      position: 'relative',
      maxWidth: '500px',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1rem',
      boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
    },
    menuModalSlide: {
      minWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    menuModalImage: {
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: '0.75rem',
    },
    menuModalClose: {
      position: 'absolute',
      top: '-14px',
      right: '-14px',
      width: '36px',
      height: '36px',
      borderRadius: '9999px',
      border: 'none',
      backgroundColor: '#4c1d95',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1.1rem',
      boxShadow: '0 8px 18px rgba(0, 0, 0, 0.2)',
    },
    menuModalArrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
      borderRadius: '9999px',
      border: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4c1d95',
      fontSize: '1.25rem',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s ease',
      margin: '0.5rem 0',
    },
    mobileMenuBackdrop: {
      position: 'fixed',
      inset: 0,
      zIndex: 55,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      paddingTop: `${navHeight + (isMobile ? 12 : 8)}px`,
    },
    mobileMenuPanel: {
      width: 'min(92vw, 520px)',
      margin: '0 auto',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '1rem',
      boxShadow: '0 18px 50px rgba(0,0,0,0.18)',
      overflow: 'hidden',
    },
    mobileMenuItem: {
      width: '100%',
      padding: '0.95rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '1rem',
      color: '#374151',
    },
    mobileMenuDivider: {
      height: 1,
      backgroundColor: '#f3f4f6',
    },
    button: {
      display: 'block',
      padding: '0.75rem 2rem',
      backgroundColor: '#6b21a8',
      color: 'white',
      border: 'none',
      borderRadius: '9999px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      letterSpacing: '0.05em',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
  };

  useEffect(() => {
    const booking = document.getElementById('booking');
    if (!booking) return;
    if (typeof IntersectionObserver !== 'function') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setBookingInView(Boolean(entry?.isIntersecting));
      },
      { root: null, threshold: 0.15 }
    );

    observer.observe(booking);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const menu = document.getElementById('menu');
    if (!menu) return;
    if (typeof IntersectionObserver !== 'function') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) return;

        if (entry.boundingClientRect.bottom < 0) setMenuPassed(true);
        if (entry.boundingClientRect.top > 0) setMenuPassed(false);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(menu);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div
      style={{
        backgroundColor: 'white',
        backgroundImage: `url('${isMobile ? '/images/bg-tate.png' : '/images/marble-bg.png'}')`,
        backgroundRepeat: isMobile ? 'repeat-y' : 'no-repeat',
        backgroundSize: isMobile ? '100% auto' : 'cover',
        backgroundPosition: isMobile ? 'top center' : 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100%',
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      <NavBar
        styles={styles}
        isMobile={isMobile}
        navHeight={navHeight}
        menuItems={menuItems}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onNavClick={scrollToSection}
      />

      <MobileMenuOverlay
        styles={styles}
        open={isMobile && mobileMenuOpen}
        menuItems={menuItems}
        onBackdropClick={() => setMobileMenuOpen(false)}
        onNavClick={scrollToSection}
      />

      <HeroSection styles={styles} heroImageSrcs={heroImageSrcs} currentSlide={currentSlide} />

      <NewsSection
        styles={styles}
        newsItems={newsItems}
        newsLoading={newsLoading}
        newsLoadError={newsLoadError}
        supabaseConfigWarning={supabaseConfigWarning}
        onOpenImageModal={openNewsImageModal}
      />

      <MenuSection
        styles={styles}
        menuSlides={menuSlides}
        menuSlideIndex={menuSlideIndex}
        setMenuSlideIndex={setMenuSlideIndex}
        onOpenMenuModal={openMenuModal}
        onPrev={goMenuPrev}
        onNext={goMenuNext}
        onTouchStart={handleMenuTouchStart}
        onTouchEnd={handleMenuTouchEnd}
      />

      <TherapistSection styles={styles} />

      <PhilosophySection styles={styles} />

      <FaqSection styles={styles} faq={faq} />

      <AccessSection styles={styles} isMobile={isMobile} />

      <FloatingBookingButton
        visible={
          isMobile &&
          menuPassed &&
          !bookingInView &&
          !mobileMenuOpen &&
          !menuModalOpen &&
          !(newsImageModalOpen && newsImageModalUrl)
        }
        onClick={() => scrollToSection('booking')}
      />

      <MenuModal
        styles={styles}
        open={menuModalOpen}
        menuSlides={menuSlides}
        menuSlideIndex={menuSlideIndex}
        onClose={closeMenuModal}
        onPrev={goMenuPrev}
        onNext={goMenuNext}
        onTouchStart={handleMenuTouchStart}
        onTouchEnd={handleMenuTouchEnd}
      />

      <ImageModal
        styles={styles}
        open={newsImageModalOpen}
        url={newsImageModalUrl}
        alt={newsImageModalAlt}
        onClose={closeNewsImageModal}
      />

      <FooterSection styles={styles} />
    </div>
  );
}

