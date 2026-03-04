import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  const menuItems = [
    { name: 'メニュー', id: 'menu' },
    { name: '施術イメージ', id: 'image' },
    { name: 'セラピスト', id: 'therapist' },
    { name: '理念', id: 'philosophy' },
    { name: 'お知らせ', id: 'news' },
    { name: 'アクセス', id: 'access' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-purple-800 tracking-wider">INTIMACY</h1>
          <p className="text-xs text-purple-600">新松戸</p>
        </div>
        <div className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-sm text-gray-700 hover:text-purple-700 transition-colors">
              {item.name}
            </button>
          ))}
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-purple-100">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-purple-50 border-b border-purple-50">
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
