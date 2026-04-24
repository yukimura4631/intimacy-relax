import React from 'react';

export default function TherapistSection({ styles }) {
  return (
    <section id="therapist" style={{ ...styles.section }}>
      <div style={styles.contentWrap}>
        <h3 style={styles.h3}>セラピスト</h3>
        <div
          style={{
            maxWidth: '512px',
            margin: '0 auto 2rem',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src="/images/profile.jpg"
            alt="ユキムラのプロフィール"
            style={{ width: '160px', height: '240px', objectFit: 'cover', borderRadius: '30px', marginBottom: '' }}
          />
          <h4 style={{ fontSize: '1.4rem', fontWeight: 400, color: '#4c1d95', margin: '0.5rem 0 0' }}>ユキムラ</h4>
          <p style={{ color: '#6b21a8', margin: '0 0 1rem' }}>オーナー</p>
          <p style={{ color: '#374151', lineHeight: 1.25 }}>独自の手技で「もみ返しがないのにほぐれる」施術が得意。</p>
          <p style={{ color: '#374151', lineHeight: 1.25 }}>男性セラピストならではの圧と丁寧さで心身をケアします。</p>
        </div>
      </div>
    </section>
  );
}

