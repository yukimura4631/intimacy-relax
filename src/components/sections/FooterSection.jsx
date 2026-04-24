import React from 'react';

export default function FooterSection({ styles }) {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(to bottom, #3f0f5c, #371e5c)',
        color: 'white',
        padding: '0.35rem 0',
        textAlign: 'center',
      }}
    >
      <div style={{ ...styles.contentWrap, padding: 0 }}>
        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.2 }}>INTIMACY｜新松戸</p>
        <p style={{ margin: '0.15rem 0 0', color: '#c4b5fd', fontSize: '0.75rem', lineHeight: 1.2 }}>
          &copy; {year} INTIMACY
        </p>
      </div>
    </footer>
  );
}
