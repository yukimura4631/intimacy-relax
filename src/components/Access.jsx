import React from 'react';
import { Phone } from 'lucide-react';

export default function Access({ setBookingModal }) {
  return (
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
  );
}
