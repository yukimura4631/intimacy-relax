import React from 'react';

export default function FloatingBookingButton({ visible, onClick }) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="予約はこちら"
      style={{
        position: 'fixed',
        right: '16px',
        bottom: 'calc(16px + env(safe-area-inset-bottom))',
        zIndex: 70,
        border: 'none',
        borderRadius: '9999px',
        padding: '12px 16px',
        backgroundColor: '#10b981',
        color: 'white',
        fontSize: '0.95rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        boxShadow: '0 14px 34px rgba(0, 0, 0, 0.22)',
        cursor: 'pointer',
      }}
    >
      予約はこちら
    </button>
  );
}

