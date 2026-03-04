import React from 'react';
import { X } from 'lucide-react';

export default function BookingModal({ bookingModal, setBookingModal }) {
  if (!bookingModal) return null;

  return (
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
  );
}
