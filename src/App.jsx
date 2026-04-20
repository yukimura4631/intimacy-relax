import React, { useEffect, useRef, useState } from 'react';

import { X, Menu } from 'lucide-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminNews from './AdminNews';
import { isSupabaseConfigured, supabase, supabaseConfigWarning } from './supabaseClient';

function MainSite() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
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
    // { name: '施術イメージ', id: 'image' },
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
  const navHeight = isMobile ? 64 : 80;

  const styles = {
    nav: {
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: isMobile ? '0.25rem 0.5rem' : '1rem 1.5rem',
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
      marginTop: `${navHeight+8}px`,
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
    h1: {
      fontSize: isMobile ? '2.25rem' : '3.5rem',
      fontWeight: 300,
      color: '#4c1d95',
      marginBottom: '1rem',
      letterSpacing: '0.05em',
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
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? 240 : 300}px, 1fr))`,
      gap: '2rem',
    },
    newsScroller: {
      // display: 'column',
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
      // padding: '1rem 0 2rem',
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
    menuModalTrack: {
      display: 'flex',
      transition: 'transform 0.4s ease',
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
      paddingTop: isMobile ? '76px' : '88px',
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

  return (
    <div
      style={{
        backgroundColor: 'white',
        backgroundImage: "url('/images/marble-bg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        minHeight: '100%',
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div className="w-full mx-auto h-[74px] flex items-center justify-between px-4 md:px-2 gap-6 relative">
        {/* ロゴアイコン + タイトル */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              src="/images/INTIMACY.png"
              alt="INTIMACY Logo Icon"
              style={{
                  height: '54px',
                  width: 'auto',
                  objectFit: 'contain',
                  marginTop: '0.4rem',
                }}
            />
          </div>
        </div>
          {!isMobile ? (
            <div style={{ display: 'flex', gap: '2rem' }}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    fontSize: '0.875rem',
                    color: '#374151',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          ) : null}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobile && mobileMenuOpen ? (
        <div style={styles.mobileMenuBackdrop} onClick={() => setMobileMenuOpen(false)}>
          <div style={styles.mobileMenuPanel} onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <button type="button" style={styles.mobileMenuItem} onClick={() => scrollToSection(item.id)}>
                  {item.name}
                </button>
                {index === menuItems.length - 1 ? null : <div style={styles.mobileMenuDivider} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : null}

      <section style={styles.hero}>
        <div style={styles.heroMedia}>
          <img src={heroImageSrcs[currentSlide]} alt="" style={styles.heroImage} />
        </div>
      </section>

      <section id="news" style={{ ...styles.section }}>
        <div style={styles.contentWrap}>
          <h3 style={styles.h3}>お知らせ</h3>
          {newsLoading ? (
            <p style={{ margin: '-2rem 0 1.25rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
              読み込み中…
            </p>
          ) : null}
          {newsLoadError ? (
            <p style={{ margin: '-2rem 0 1.25rem', textAlign: 'center', fontSize: '0.875rem', color: '#b91c1c' }}>
              {newsLoadError}
            </p>
          ) : null}
          {!newsLoading && !newsLoadError && supabaseConfigWarning ? (
            <p style={{ margin: '-2rem 0 1.25rem', textAlign: 'center', fontSize: '0.875rem', color: '#b91c1c' }}>
              {supabaseConfigWarning}
            </p>
          ) : null}
          <div style={styles.newsViewport}>
            <div style={styles.newsScroller} aria-label="お知らせ一覧">
              {newsItems.map((item, index) => (
                <div key={item.id ?? index} style={{ ...styles.card, ...styles.newsCard }}>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#6b21a8' }}>{item.date}</p>
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: '#4c1d95',
                      marginBottom: '0.75rem',
                      lineHeight: 1.5,
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.title || '（タイトル未設定）'}
                  </h4>
                  {item.image_url ? (
                    <div style={styles.newsImageWrap} onClick={() => openNewsImageModal(item.image_url, item.title)}>
                      <img src={item.image_url} alt={item.title ?? ''} style={styles.newsImage} loading="lazy" />
                    </div>
                  ) : null}
                  <p
                    style={{
                      color: '#4b5563',
                      fontSize: '0.875rem',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.content || ''}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section id="menu" style={styles.section}>
        <div style={styles.contentWrap}>
          <h3 style={styles.h3}>メニュー</h3>
          <div
            style={styles.menuScroller}
            aria-label="メニュー画像スライダー"
            onTouchStart={handleMenuTouchStart}
            onTouchEnd={handleMenuTouchEnd}
          >
            <div
              style={{
                ...styles.menuTrack,
                transform: 'translateX(-' + menuSlideIndex * 100 + '%)',
              }}
            >
              {menuSlides.map((slide, index) => (
                <div key={index} style={styles.menuSlide}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    style={styles.menuImage}
                    loading="lazy"
                    onClick={() => openMenuModal(index)}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              aria-label="前のメニュー"
              onClick={goMenuPrev}
              style={{ ...styles.menuArrow, left: '0.5rem' }}
            >
              {'<'}
            </button>
            <button
              type="button"
              aria-label="次のメニュー"
              onClick={goMenuNext}
              style={{ ...styles.menuArrow, right: '0.5rem' }}
            >
              {'>'}
            </button>
          </div>
          <div style={styles.menuDots} aria-label="メニューのインジケーター">
            {menuSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`メニュー ${index + 1} に移動`}
                onClick={() => setMenuSlideIndex(index)}
                style={{
                  ...styles.menuDot,
                  ...(index === menuSlideIndex ? styles.menuDotActive : {}),
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="therapist" style={{ ...styles.section }}>
        <div style={styles.contentWrap}>
          <h3 style={styles.h3}>セラピスト</h3>
          <div
            style={{
              maxWidth: '512px',
              margin: '0 auto 2rem',
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src="/images/profile.jpg"
              alt="ユキムラのプロフィール"
              style={{ width: '160px', height: '240px', objectFit: 'cover', borderRadius: '30px', marginBottom: '' }}
            />
            <h4 style={{ fontSize: '1.4rem', fontWeight: 400, color: '#4c1d95', margin: '0.5rem 0 0' }}>ユキムラ</h4>
            <p style={{ color: '#6b21a8', margin: '0 0 1rem' }}>オーナー</p>
            <p style={{ color: '#374151', lineHeight: 1.25 }}>独自の手技で「もみ返しがないのにほぐれる」施術が得意。</p>
            <p style={{ color: '#374151', lineHeight: 1.25 }}>男性セラピストならではの圧と丁寧さで心身をケアします。</p>
          </div>
        </div>
      </section>

      <section id="philosophy" style={styles.section}>
        <div style={styles.contentWrap}>
          <h3 style={styles.h3}>理念とこだわり</h3>
          <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            <div
              style={{
                backgroundColor: 'white',
                padding: '1rem 1rem 1.5rem 1rem',
                marginBottom: '2rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#4c1d95', margin: '0 0.5rem 1rem' }}>INTIMACYの想い</h4>
              <p style={{ color: '#374151', lineHeight: 1.625, marginBottom: '1rem', padding: '0 1rem'  }}>
                店名のINTIMACYには「寄り添い」という意味を込めています。疲れた時や癒されたい時に、気兼ねなく足を運んでいただける空間を大切にしています。
              </p>
              <p style={{ color: '#374151', lineHeight: 1.625, padding: '0 1rem' }}>
                あなたの心と身体の声に耳を傾け、その日のお悩みに寄り添った施術をご提供します。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...styles.section }}>
        <div style={styles.contentWrap}>
          <h3 style={styles.h3}>よくある質問</h3>
          <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            {faq.map((item, index) => (
              <details
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <summary style={{ padding: '1.5rem', cursor: 'pointer', color: '#4c1d95', fontWeight: 300 }}>
                  {item.q}
                </summary>
                <div
                  style={{
                    padding: '1.5rem',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#f3f0ff',
                    color: '#374151',
                    fontSize: '0.875rem',
                    lineHeight: 1.625,
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="access" style={styles.section}>
        <div style={styles.contentWrap}>
          <h3 style={styles.h3}>アクセス</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? 240 : 300}px, 1fr))`,
              gap: '2rem',
            }}
          >
            <div style={{ backgroundColor: '#f3f0ff', padding: '2rem', borderRadius: '0.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4
                  style={{
                    fontSize: '0.875rem',
                    color: '#6b21a8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}
                >
                  住所
                </h4>
                <p style={{ color: '#1f2937' }}>千葉県松戸市新松戸３丁目２９２<br />曙マンション 201</p>
                <iframe title="INTIMACY 新松戸 アクセスマップ" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d808.7511892265369!2d139.9144871!3d35.824358999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60189b366916aaab%3A0xb152d33377805ed6!2z5puZ44Oe44Oz44K344On44Oz!5e0!3m2!1sja!2sjp!4v1776670436066!5m2!1sja!2sjp" 
                width="100%"
                height="50%"
                style={{ border: 0, borderRadius: '0.5rem', marginTop: '1rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4
                  style={{
                    fontSize: '0.875rem',
                    color: '#6b21a8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}
                >
                  電車
                </h4>
                <p style={{ color: '#1f2937' }}>JR新松戸駅より徒歩9分</p>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '0.875rem',
                    color: '#6b21a8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}
                >
                  営業時間
                </h4>
                <p style={{ color: '#1f2937' }}>10:00～24:00 （最終受付 21:00）</p>
              </div>
            </div>


            <div
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              <h4 style={{ fontSize: '1.25rem', fontWeight: 400, color: '#4c1d95', marginBottom: '1.5rem' }}>
                ご予約・ご相談
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <a
                    href="https://lin.ee/wJ21xSXg"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.button, backgroundColor: '#10b981', textAlign: 'center', textDecoration: 'none' }}
                  >
                    LINE で予約
                  </a>
                  <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    友達追加後、メッセージで可能。
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    相談もお気軽にどうぞ！
                  </p>
                </div>
                <div>
                  <a
                    href="https://beauty.hotpepper.jp/kr/slnH000785676/coupon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.button, textAlign: 'center', textDecoration: 'none', display: 'block' }}
                  >
                    ホットペッパーで予約
                  </a>
                  <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    割引クーポンが豊富です。
                  </p>
                </div>
                {/* <a
                  href="tel:047-xxx-xxxx"
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#f3f0ff',
                    color: '#4c1d95',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                >
                  電話予約
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {menuModalOpen && (
        <div style={styles.menuModalBackdrop} onClick={closeMenuModal}>
          <div
            style={styles.menuModalBody}
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleMenuTouchStart}
            onTouchEnd={handleMenuTouchEnd}
          >
            <button type="button" aria-label="閉じる" onClick={closeMenuModal} style={styles.menuModalClose}>
              ✕
            </button>
            <div style={styles.menuModalSlide}>
              <img
                src={menuSlides[menuSlideIndex]?.src}
                alt={menuSlides[menuSlideIndex]?.alt}
                style={styles.menuModalImage}
              />
            </div>
            <button
              type="button"
              aria-label="前のメニュー"
              onClick={goMenuPrev}
              style={{ ...styles.menuModalArrow, left: '-12px' }}
            >
              {'<'}
            </button>
            <button
              type="button"
              aria-label="次のメニュー"
              onClick={goMenuNext}
              style={{ ...styles.menuModalArrow, right: '-12px' }}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}

      {newsImageModalOpen && newsImageModalUrl ? (
        <div style={styles.menuModalBackdrop} onClick={closeNewsImageModal}>
          <div style={styles.menuModalBody} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              aria-label="閉じる"
              onClick={closeNewsImageModal}
              style={styles.menuModalClose}
            >
              ×
            </button>
            <div style={styles.menuModalSlide}>
              <img src={newsImageModalUrl} alt={newsImageModalAlt} style={styles.menuModalImage} />
            </div>
          </div>
        </div>
      ) : null}

      <footer style={{ background: 'linear-gradient(to bottom, #3f0f5c, #371e5c)', color: 'white', padding: '1rem', textAlign: 'center' }}>
        <div style={styles.contentWrap}>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 300 }}>INTIMACY</h4>
            <p style={{ color: '#c4b5fd', fontSize: '0.875rem' }}>新松戸</p>
          </div>
          <p style={{ color: '#c4b5fd', fontSize: '0.875rem' }}>&copy; 2025 INTIMACY 新松戸. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminNews />} />
      <Route path="/" element={<MainSite />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
