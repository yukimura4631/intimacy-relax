import React, { useState, useEffect } from 'react';


import { ChevronDown, Phone, Instagram, ChevronRight, X, Menu } from 'lucide-react';





export default function App() {


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const [bookingModal, setBookingModal] = useState(false);


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


  },);





  const menuItems = [


    { name: 'メニュー', id: 'menu' },


    { name: '施術イメージ', id: 'image' },


    { name: 'セラピスト', id: 'therapist' },


    { name: '理念', id: 'philosophy' },


    { name: 'お知らせ', id: 'news' },


    { name: 'アクセス', id: 'access' },


  ];





  const scrollToSection = (id) => {


    const element = document.getElementById(id);


    element?.scrollIntoView({ behavior: 'smooth' });


    setMobileMenuOpen(false);


  };





  const services = [


    { title: '全身アロマリンパ', duration: '90分/120分', price: '¥9,800～¥12,000', description: '16種類以上の精油からあなたの香りをセレクト。心地よい圧で深層部のコリをほぐします。', bgColor: '#d4c5d9' },


    { title: 'ドライヘッドスパ', duration: '40分/60分', price: '¥3,800～¥5,800', description: 'PC作業で疲れた目と脳をリセット。眼精疲労と首肩の硬さを同時にケア。', bgColor: '#e0d8d2' },


    { title: '足のむくみケア', duration: '60分/90分', price: '¥6,500～¥9,800', description: '重だるい足のむくみや冷えを徹底ケア。贅沢な個室空間で自分を解放できます。', bgColor: '#e8dfd8' },


    { title: 'セルフホワイトニング', duration: '20分', price: '¥2,000', description: 'アロマ香る空間でセルフホワイトニング。リラックスしながら歯を白くできます。', bgColor: '#d9d0d4' },


  ];





  const news = [


    { date: '2025-12-15', title: 'セルフホワイトニングメニューを新しくスタート！', content: 'アロマ香る空間での新しい体験。ホワイトニングでさらに美しく。' },


    { date: '2025-12-01', title: 'INTIMACY新松戸がOPEN致しました', content: '新しい施設で、さらに快適な環境でのご施術をご用意してお待ちしています。' },


  ];





  const faq = [


    { q: '初めてなんですが、予約の時に何か準備が必要ですか？', a: '特に準備は必要ありません。ご希望があれば、アロマの香りやお悩みについて事前にお聞かせください。' },


    { q: 'メンズでも利用できますか？', a: 'もちろんです！男性のお客様もたくさんいらっしゃいます。' },


    { q: '当日予約は可能ですか？', a: 'はい。当日予約大歓迎です。お気軽にご連絡ください。' },


    { q: '駐車場はありますか？', a: 'サロン敷近くのタイムズパーキングをおすすめしています。' },


  ];





  const styles = {


    nav: {


      position: 'fixed',


      width: '100%',


      top: 0,


      zIndex: 50,


      backgroundColor: 'rgba(255, 255, 255, 0.95)',


      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',


      padding: '1rem 1.5rem',


    },    navContainer: {
      width: '70vw',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contentWrap: {
      width: '70vw',
      margin: '0 auto',
      padding: '0 1rem',
    },


    hero: {


      paddingTop: '80px',


      position: 'relative',


      height: '100vh',


      display: 'flex',


      alignItems: 'center',


      justifyContent: 'center',


      overflow: 'hidden',


    },


    heroBg: {


      position: 'absolute',


      inset: 0,


      transition: 'background 1s ease',


      background: heroImages[currentSlide],


    },    heroContent: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      width: '70vw',
      margin: '0 auto',
      maxWidth: 'none',
      padding: '1rem',
    },


    h1: {


      fontSize: '3.5rem',


      fontWeight: 300,


      color: '#4c1d95',


      marginBottom: '1rem',


      letterSpacing: '0.05em',


    },


    h3: {


      fontSize: '2.25rem',


      fontWeight: 300,


      color: '#4c1d95',


      marginBottom: '3rem',


      textAlign: 'center',


    },    section: {
      padding: '5rem 0',
    },


    grid: {


      display: 'grid',


      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',


      gap: '2rem',


    },


    card: {


      backgroundColor: 'white',


      borderRadius: '0.5rem',


      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',


      overflow: 'hidden',


      transition: 'box-shadow 0.3s ease',


    },


    button: {


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


    <div style={{ backgroundColor: 'white', minHeight: '100vh', fontFamily: "'Noto Sans JP', sans-serif" }}>


      {/* Navigation */}


      <nav style={styles.nav}>


        <div style={styles.navContainer}>


          <div>


            <h1 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#6b21a8', margin: 0 }}>INTIMACY</h1>


            <p style={{ fontSize: '0.75rem', color: '#6b21a8', margin: 0 }}>新松戸</p>


          </div>


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


          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>


            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}


          </button>


        </div>


      </nav>





      {/* Hero */}


      <section style={styles.hero}>


        <div style={styles.heroBg} />


        <div style={styles.heroContent}>


          <h2 style={styles.h1}>INTIMACY</h2>


          <p style={{ fontSize: '1.25rem', color: '#6b21a8', marginBottom: '1.5rem', fontWeight: 300 }}>寄り添いの癒し</p>


          <p style={{ color: '#374151', marginBottom: '2rem', lineHeight: 1.625 }}>疲れた時に気兼ねなく足を運べる空間。<br />あなたの心と身体に寄り添う、完全個室のリラクゼーション。</p>


          <button onClick={() => setBookingModal(true)} style={styles.button}>


            予約する


          </button>


        </div>


      </section>





      {/* News */}


      <section id="news" style={{ ...styles.section, backgroundColor: '#f3f0ff' }}>
        <div style={styles.contentWrap}>


        <h3 style={styles.h3}>お知らせ</h3>


        <div style={styles.grid}>


          {news.map((item, index) => (


            <div key={index} style={styles.card}>


              <div style={{ padding: '1.5rem' }}>


                <p style={{ fontSize: '0.875rem', color: '#6b21a8', marginBottom: '0.5rem' }}>{item.date}</p>


                <h4 style={{ fontSize: '1.125rem', fontWeight: 300, color: '#4c1d95', marginBottom: '0.75rem' }}>{item.title}</h4>


                <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>{item.content}</p>


              </div>


            </div>


          ))}


        </div>


        </div>
      </section>





      {/* Menu */}


      <section id="menu" style={styles.section}>
        <div style={styles.contentWrap}>


        <h3 style={styles.h3}>メニュー</h3>


        <div style={styles.grid}>


          {services.map((service, index) => (


            <div key={index} style={styles.card}>


              <div style={{ height: '192px', backgroundColor: service.bgColor }} />


              <div style={{ padding: '1.5rem' }}>


                <h4 style={{ fontSize: '1.25rem', fontWeight: 300, color: '#4c1d95', marginBottom: '0.5rem' }}>{service.title}</h4>


                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b21a8', marginBottom: '0.75rem' }}>


                  <span>{service.duration}</span>


                  <span style={{ fontWeight: 600 }}>{service.price}</span>


                </div>


                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.625 }}>{service.description}</p>


              </div>


            </div>


          ))}


        </div>


        </div>
      </section>





      {/* Therapist */}


      <section id="therapist" style={{ ...styles.section, backgroundColor: '#f3f0ff' }}>
        <div style={styles.contentWrap}>


        <h3 style={styles.h3}>セラピスト</h3>


        <div style={{ maxWidth: '512px', margin: '0 auto', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>


          <h4 style={{ fontSize: '1.875rem', fontWeight: 300, color: '#4c1d95', marginBottom: '0.5rem' }}>ユキムラ</h4>


          <p style={{ color: '#6b21a8', marginBottom: '1.5rem' }}>施術者・店長</p>


          <p style={{ color: '#374151', lineHeight: 1.625 }}>独自の手技で「もみ返しがないのにほぐれる」施術が得意。男性セラピストならではの圧と丁寧さで心身をケアします。</p>


        </div>


        </div>
      </section>





      {/* Philosophy */}


      <section id="philosophy" style={styles.section}>
        <div style={styles.contentWrap}>


        <h3 style={styles.h3}>理念とこだわり</h3>


        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>


          <div style={{ backgroundColor: 'white', padding: '2rem', marginBottom: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>


            <h4 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#4c1d95', marginBottom: '1rem' }}>INTIMACYの想い</h4>


            <p style={{ color: '#374151', lineHeight: 1.625, marginBottom: '1rem' }}>店名のINTIMACYには「寄り添い」という意味を込めています。疲れた時や癒されたい時に、気兼ねなく足を運んでいただける空間を大切にしています。</p>


            <p style={{ color: '#374151', lineHeight: 1.625 }}>あなたの心と身体の声に耳を傾け、その日のお悩みに寄り添った施術をご提供します。</p>


          </div>


        </div>


        </div>
      </section>





      {/* FAQ */}


      <section style={{ ...styles.section, backgroundColor: '#f3f0ff' }}>
        <div style={styles.contentWrap}>


        <h3 style={styles.h3}>よくある質問</h3>


        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>


          {faq.map((item, index) => (


            <details key={index} style={{ backgroundColor: 'white', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>


              <summary style={{ padding: '1.5rem', cursor: 'pointer', color: '#4c1d95', fontWeight: 300 }}>


                {item.q}


              </summary>


              <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f3f0ff', color: '#374151', fontSize: '0.875rem', lineHeight: 1.625 }}>


                {item.a}


              </div>


            </details>


          ))}


        </div>


        </div>
      </section>





      {/* Access */}


      <section id="access" style={styles.section}>
        <div style={styles.contentWrap}>


        <h3 style={styles.h3}>アクセス</h3>


        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>


          <div style={{ backgroundColor: '#f3f0ff', padding: '2rem', borderRadius: '0.5rem' }}>


            <div style={{ marginBottom: '1.5rem' }}>


              <h4 style={{ fontSize: '0.875rem', color: '#6b21a8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>住所</h4>


              <p style={{ color: '#1f2937' }}>千葉県松戸市新松戸３丁目２９２<br />曙マンション 201</p>


            </div>


            <div style={{ marginBottom: '1.5rem' }}>


              <h4 style={{ fontSize: '0.875rem', color: '#6b21a8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>電車</h4>


              <p style={{ color: '#1f2937' }}>JR新松戸駅より徒歩9分</p>


            </div>


            <div>


              <h4 style={{ fontSize: '0.875rem', color: '#6b21a8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>営業時間</h4>


              <p style={{ color: '#1f2937' }}>10:00～21:00</p>


            </div>


          </div>


          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>


            <h4 style={{ fontSize: '1.25rem', fontWeight: 300, color: '#4c1d95', marginBottom: '1.5rem' }}>ご予約・ご相談</h4>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>


              <a href="https://lin.ee/wJ21xSXg" target="_blank" rel="noopener noreferrer" style={{ ...styles.button, backgroundColor: '#10b981', textAlign: 'center', textDecoration: 'none' }}>


                💬 LINE で予約


              </a>


              <button onClick={() => setBookingModal(true)} style={styles.button}>


                ホットペッパーで予約


              </button>


              <a href="tel:047-xxx-xxxx" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f3f0ff', color: '#4c1d95', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', textDecoration: 'none' }}>


                📞 電話予約


              </a>


            </div>


          </div>


        </div>


        </div>
      </section>





      {/* Booking Modal */}


      {bookingModal && (


        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>


          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', maxWidth: '512px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '2rem', position: 'relative' }}>


            <button onClick={() => setBookingModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>


              ✕


            </button>


            <h3 style={{ fontSize: '1.875rem', fontWeight: 300, color: '#4c1d95', marginBottom: '0.5rem' }}>ご予約方法</h3>


            <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '1.5rem' }}>ご都合に合わせてお選びください</p>


            <div style={{ backgroundColor: '#d1fae5', border: '2px solid #6ee7b7', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>


              <h4 style={{ fontWeight: 600, color: '#065f46', marginBottom: '0.5rem' }}>💬 LINE公式アカウント（推奨）</h4>


              <p style={{ color: '#374151', fontSize: '0.875rem', marginBottom: '1rem' }}>友達追加後、簡単なメッセージで予約完了。</p>


              <a href="https://lin.ee/wJ21xSXg" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#059669', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}>


                LINEで予約する →


              </a>


            </div>


            <div style={{ backgroundColor: '#f3f0ff', border: '2px solid #e9d5ff', padding: '1.5rem', borderRadius: '0.5rem' }}>


              <h4 style={{ fontWeight: 600, color: '#4c1d95', marginBottom: '0.5rem' }}>🌶️ ホットペッパービューティー</h4>


              <p style={{ color: '#374151', fontSize: '0.875rem', marginBottom: '1rem' }}>割引クーポンが豊富です。</p>


              <a href="https://beauty.hotpepper.jp/kr/slnH000785676/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#6b21a8', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}>


                ホットペッパーで予約 →


              </a>


            </div>


          </div>


        </div>


      )}





      {/* Footer */}


      <footer style={{ background: 'linear-gradient(to bottom, #3f0f5c, #371e5c)', color: 'white', padding: '4rem 1rem', textAlign: 'center' }}>


        <div style={styles.contentWrap}>


          <div style={{ marginBottom: '2rem' }}>


            <h4 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>INTIMACY</h4>


            <p style={{ color: '#c4b5fd', fontSize: '0.875rem' }}>新松戸</p>


          </div>


          <p style={{ color: '#c4b5fd', fontSize: '0.875rem' }}>&copy; 2025 INTIMACY 新松戸. All rights reserved.</p>


        </div>


      </footer>


    </div>


  );


}




