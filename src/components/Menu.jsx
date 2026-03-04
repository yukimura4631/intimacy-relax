import React from 'react';

export default function Menu() {
  const services = [
    { title: '全身アロマリンパ', duration: '90分/120分', price: '¥9,800～¥12,000', description: '16種類以上の精油からあなたの香りをセレクト。心地よい圧で深層部のコリをほぐします。', image: 'linear-gradient(135deg, #d4c5d9 0%, #e8ddd2 100%)' },
    { title: 'ドライヘッドスパ', duration: '40分/60分', price: '¥3,800～¥5,800', description: 'PC作業で疲れた目と脳をリセット。眼精疲労と首肩の硬さを同時にケア。', image: 'linear-gradient(135deg, #e0d8d2 0%, #d4c5b8 100%)' },
    { title: '足のむくみケア', duration: '60分/90分', price: '¥6,500～¥9,800', description: '重だるい足のむくみや冷えを徹底ケア。贅沢な個室空間で自分を解放できます。', image: 'linear-gradient(135deg, #e8dfd8 0%, #dccfc8 100%)' },
    { title: 'セルフホワイトニング', duration: '20分', price: '¥2,000', description: 'アロマ香る空間でセルフホワイトニング。リラックスしながら歯を白くできます。', image: 'linear-gradient(135deg, #d9d0d4 0%, #e8dfd8 100%)' },
  ];

  return (
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
  );
}
