import React from 'react';
import { Menu, X } from 'lucide-react';

export default function NavBar({ styles, isMobile, navHeight, menuItems, mobileMenuOpen, onToggleMobileMenu, onNavClick }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <div className="w-full mx-auto flex items-center justify-between px-4 md:px-2 gap-6 relative" style={{ height: navHeight }}>
          <div className="flex items-center gap-3 shrink-0">
            <img
              src="/images/INTIMACY.png"
              alt="INTIMACY Logo Icon"
              style={{
                height: isMobile ? '42px' : '48px',
                width: 'auto',
                objectFit: 'contain',
                marginTop: '0.4rem',
              }}
            />
          </div>
        </div>
        {!isMobile ? (
          <div style={{ display: 'flex', gap: '2rem' }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                type="button"
              >
                {item.name}
              </button>
            ))}
          </div>
        ) : null}
        <button
          onClick={onToggleMobileMenu}
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
          aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          type="button"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
