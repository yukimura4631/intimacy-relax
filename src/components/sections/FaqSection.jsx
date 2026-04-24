import React from 'react';

export default function FaqSection({ styles, faq }) {
  return (
    <section style={{ ...styles.section }}>
      <div style={styles.contentWrap}>
        <h3 style={styles.h3}>よくある質問</h3>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          {faq.map((item, index) => (
            <details
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <summary style={{ padding: '1.5rem', cursor: 'pointer', color: '#4c1d95', fontWeight: 300 }}>
                {item.q}
              </summary>
              <div
                style={{
                  padding: '1.5rem',
                  borderTop: '1px solid #e5e7eb',
                  backgroundColor: '#f3f0ff',
                  color: '#374151',
                  fontSize: '0.875rem',
                  lineHeight: 1.625,
                }}
              >
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
