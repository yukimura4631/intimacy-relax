import React from 'react';

export default function Therapist() {
  const therapists = [
    { name: 'ユキムラ', title: '施術者・店長', description: '独自の手技で「もみ返しがないのにほぐれる」施術が得意。男性セラピストならではの圧と丁寧さで心身をケアします。' },
  ];

  return (
    <section id="therapist" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-4xl font-light text-purple-900 mb-12 text-center">セラピスト</h3>
        {therapists.map((therapist, index) => (
          <div key={index} className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 text-center">
              <h4 className="text-3xl font-light text-purple-900 mb-2">{therapist.name}</h4>
              <p className="text-purple-600 mb-6">{therapist.title}</p>
              <p className="text-gray-700 leading-relaxed">{therapist.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
