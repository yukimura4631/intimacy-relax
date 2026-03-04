import React from 'react';

export default function Image() {
  return (
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
  );
}
