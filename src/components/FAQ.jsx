import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function FAQ() {
  const faq = [
    { q: '初めてなんですが、予約の時に何か準備が必要ですか？', a: '特に準備は必要ありません。ご希望があれば、アロマの香りやお悩みについて事前にお聞かせください。' },
    { q: 'メンズでも利用できますか？', a: 'もちろんです！男性のお客様もたくさんいらっしゃいます。' },
    { q: '当日予約は可能ですか？', a: 'はい。当日予約大歓迎です。お気軽にご連絡ください。' },
    { q: '駐車場はありますか？', a: 'サロン敷近くのタイムズパーキングをおすすめしています。' },
  ];

  return (
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
  );
}
