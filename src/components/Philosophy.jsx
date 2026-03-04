import React from 'react';

export default function Philosophy() {
  return (
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
  );
}
