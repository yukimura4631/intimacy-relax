import React from 'react';

export default function PhilosophySection({ styles }) {
  return (
    <section id="philosophy" style={styles.section}>
      <div style={styles.contentWrap}>
        <h3 style={styles.h3}>理念とこだわり</h3>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '1rem 1rem 1.5rem 1rem',
              marginBottom: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h4 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#4c1d95', margin: '0 0.5rem 1rem' }}>
              INTIMACYの想い
            </h4>
            <p style={{ color: '#374151', lineHeight: 1.625, marginBottom: '1rem', padding: '0 1rem' }}>
              店名のINTIMACYには「寄り添い」という意味を込めています。疲れた時や癒されたい時に、気兼ねなく足を運んでいただける空間を大切にしています。
            </p>
            <p style={{ color: '#374151', lineHeight: 1.625, padding: '0 1rem' }}>
              あなたの心と身体の声に耳を傾け、その日のお悩みに寄り添った施術をご提供します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

