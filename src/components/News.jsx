import React from 'react';

export default function News() {
  const news = [
    { date: '2025-12-15', title: 'セルフホワイトニングメニューを新しくスタート！', content: 'アロマ香る空間での新しい体験。ホワイトニングでさらに美しく。' },
    { date: '2025-12-01', title: 'INTIMACY新松戸がOPEN致しました', content: '新しい施設で、さらに快適な環境でのご施術をご用意してお待ちしています。' },
  ];

  return (
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
  );
}
