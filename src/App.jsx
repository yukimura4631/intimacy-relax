import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Phone, Instagram, ChevronRight, X, Menu } from 'lucide-react';

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
  }, []);

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
    { title: '全身アロマリンパ', duration: '90分/120分', price: '¥9,800～¥12,000', description: '16種類以上の精油からあなたの香りをセレクト。心地よい圧で深層部のコリをほぐします。', image: 'linear-gradient(135deg, #d4c5d9 0%, #e8ddd2 100%)' },
    { title: 'ドライヘッドスパ', duration: '40分/60分', price: '¥3,800～¥5,800', description: 'PC作業で疲れた目と脳をリセット。眼精疲労と首肩の硬さを同時にケア。', image: 'linear-gradient(135deg, #e0d8d2 0%, #d4c5b8 100%)' },
    { title: '足のむくみケア', duration: '60分/90分', price: '¥6,500～¥9,800', description: '重だるい足のむくみや冷えを徹底ケア。贅沢な個室空間で自分を解放できます。', image: 'linear-gradient(135deg, #e8dfd8 0%, #dccfc8 100%)' },
    { title: 'セルフホワイトニング', duration: '20分', price: '¥2,000', description: 'アロマ香る空間でセルフホワイトニング。リラックスしながら歯を白くできます。', image: 'linear-gradient(135deg, #d9d0d4 0%, #e8dfd8 100%)' },
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

  return (
    <div className="bg-white min-h-screen font-serif">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-light text-purple-800 tracking-wider">INTIMACY</h1>
            <p className="text-xs text-purple-600">新松戸</p>
          </div>
          <div className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-sm text-gray-700 hover:text-purple-700 transition-colors">
                {item.name}
              </button>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-purple-100">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-purple-50 border-b border-purple-50">
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
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

      {/* News */}
      <section id="news" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">お知らせ</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-purple-600 mb-2">{item.date}</p>
                <h4 className="text-lg font-light text-purple-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">メニュー</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all">
                <div className="h-48 bg-gradient-to-br" style={{ background: service.image }} />
                <div className="p-6 bg-white">
                  <h4 className="text-2xl font-light text-purple-900 mb-2">{service.title}</h4>
                  <div className="flex justify-between text-sm text-purple-600 mb-3">
                    <span>{service.duration}</span>
                    <span className="font-semibold">{service.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image */}
      <section id="image" className="py-20 bg-gradient-to-b from-white via-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">施術イメージ</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '個室での施術', desc: '完全プライベート空間で心身ともにリラックス' },
              { title: 'アロマセラピー', desc: '18種類のアロマから自分だけのブレンドを作成' },
              { title: '上質な時間', desc: 'あなたのための特別な癒しのひと時' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="h-64 rounded-lg mb-4 shadow-sm" style={{ background: `linear-gradient(135deg, ${['#e8dfd8', '#d4c5d9', '#e0d8d2'][index]} 0%, ${['#dccfc8', '#e8ddd2', '#d4c5b8'][index]} 100%)` }} />
                <h4 className="text-lg font-light text-purple-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapist */}
      <section id="therapist" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">セラピスト</h3>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 text-center">
              <h4 className="text-3xl font-light text-purple-900 mb-2">ユキムラ</h4>
              <p className="text-purple-600 mb-6">施術者・店長</p>
              <p className="text-gray-700 leading-relaxed">独自の手技で「もみ返しがないのにほぐれる」施術が得意。男性セラピストならではの圧と丁寧さで心身をケアします。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-purple-900 mb-8 text-center">理念とこだわり</h3>
          <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
            <h4 className="text-2xl font-light text-purple-900 mb-4">INTIMACYの想い</h4>
            <p className="text-gray-700 leading-relaxed mb-4">店名のINTIMACYには「寄り添い」という意味を込めています。疲れた時や癒されたい時に、気兼ねなく足を運んでいただける空間を大切にしています。</p>
            <p className="text-gray-700 leading-relaxed">あなたの心と身体の声に耳を傾け、その日のお悩みに寄り添った施術をご提供します。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '独自の手技', desc: 'もみ返しがないのにほぐれる、当店独自の施術法' },
              { title: 'オーダーメイド施術', desc: 'その日の状態に合わせた最適なケアをご提供' },
              { title: '完全個室', desc: '他のお客様と会わない完全プライベート空間' },
            ].map((item, index) => (
              <div key={index} className="bg-purple-50 rounded-lg p-6 text-center">
                <h5 className="text-lg font-light text-purple-900 mb-2">{item.title}</h5>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">お客様の声</h3>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 mb-6">
            <div className="flex items-center mb-4">
              <div>
                <p className="font-semibold text-purple-900">ゆーきさん</p>
                <p className="text-sm text-purple-600">40代女性</p>
              </div>
              <div className="ml-auto flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed italic">心身ともに癒されるって初めて体感しました。男性セラピストに不安があったけど、それ以上に素晴らしい。</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">よくある質問</h3>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <details key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <summary className="px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-purple-50">
                  <span className="font-light text-purple-900">{item.q}</span>
                  <ChevronRight size={20} className="text-purple-600" />
                </summary>
                <div className="px-6 py-4 border-t border-purple-100 bg-purple-50">
                  <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Access */}
      <section id="access" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">アクセス</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm text-purple-600 uppercase tracking-widest mb-2">住所</h4>
                  <p className="text-gray-800">千葉県松戸市新松戸３丁目２９２<br />曙マンション 201</p>
                </div>
                <div>
                  <h4 className="text-sm text-purple-600 uppercase tracking-widest mb-2">電車</h4>
                  <p className="text-gray-800">JR新松戸駅より徒歩9分</p>
                </div>
                <div>
                  <h4 className="text-sm text-purple-600 uppercase tracking-widest mb-2">営業時間</h4>
                  <p className="text-gray-800">10:00～21:00</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-purple-100">
                <h4 className="text-xl font-light text-purple-900 mb-6">ご予約・ご相談</h4>
                <div className="space-y-3">
                  <a href="https://lin.ee/wJ21xSXg" className="flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold w-full justify-center" target="_blank" rel="noopener noreferrer">
                    <span>💬 LINE で予約</span>
                  </a>
                  <button onClick={() => setBookingModal(true)} className="w-full px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-light">
                    ホットペッパーで予約
                  </button>
                  <a href="tel:047-xxx-xxxx" className="flex items-center gap-3 px-6 py-3 bg-purple-50 text-purple-900 rounded-lg hover:bg-purple-100 transition-colors">
                    <Phone size={18} />
                    <span>電話予約</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button onClick={() => setBookingModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <X size={24} />
            </button>
            <h3 className="text-3xl font-light text-purple-900 mb-2">ご予約方法</h3>
            <p className="text-gray-600 text-sm mb-6">ご都合に合わせてお選びください</p>
            <div className="bg-green-50 border-2 border-green-300 p-6 rounded-lg mb-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💬</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 mb-2">LINE公式アカウント（推奨）</h4>
                  <p className="text-gray-700 text-sm mb-4">友達追加後、簡単なメッセージで予約完了。</p>
                  <a href="https://lin.ee/wJ21xSXg" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold" target="_blank" rel="noopener noreferrer">
                    LINEで予約する →
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🌶️</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-purple-900 mb-2">ホットペッパービューティー</h4>
                  <p className="text-gray-700 text-sm mb-4">割引クーポンが豊富です。</p>
                  <a href="https://beauty.hotpepper.jp/kr/slnH000785676/" className="inline-block px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-semibold" target="_blank" rel="noopener noreferrer">
                    ホットペッパーで予約 →
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800"><strong>💡</strong> LINE予約なら24時間いつでも送信できます。</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <h4 className="text-2xl font-light mb-2">INTIMACY</h4>
              <p className="text-purple-200 text-sm">新松戸</p>
            </div>
            <div>
              <h5 className="font-light mb-4">営業時間</h5>
              <p className="text-purple-200 text-sm">10:00～21:00</p>
              <p className="text-purple-200 text-sm">定休日：不定休</p>
            </div>
            <div>
              <h5 className="font-light mb-4">フォロー</h5>
              <div className="flex gap-4">
                <a href="https://instagram.com/intimacy_shinmatsudo" className="text-purple-200 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-700 pt-8 text-center text-purple-300 text-sm">
            <p>&copy; 2025 INTIMACY 新松戸. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
