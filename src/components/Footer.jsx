import React from 'react';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
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
  );
}
