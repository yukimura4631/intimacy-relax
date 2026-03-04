import React from 'react';

export default function Reviews() {
  const reviews = [
    { name: 'ゆーきさん', age: '40代女性', rating: 5, text: '心身ともに癒されるって初めて体感しました。男性セラピストに不安があったけど、それ以上に素晴らしい。' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">お客様の声</h3>
        {reviews.map((review, index) => (
          <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 mb-6">
            <div className="flex items-center mb-4">
              <div>
                <p className="font-semibold text-purple-900">{review.name}</p>
                <p className="text-sm text-purple-600">{review.age}</p>
              </div>
              <div className="ml-auto flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed italic">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
