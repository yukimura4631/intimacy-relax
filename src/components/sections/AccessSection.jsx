import React from 'react';

export default function AccessSection({ styles, isMobile }) {
  return (
    <section id="access" style={styles.section}>
      <div style={styles.contentWrap}>
        <h3 style={styles.h3}>アクセス</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? 240 : 300}px, 1fr))`,
            gap: '2rem',
          }}
        >
          <div style={{ backgroundColor: '#f3f0ff', padding: '2rem', borderRadius: '0.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}
              >
                住所
              </h4>
              <p style={{ color: '#1f2937' }}>
                千葉県松戸市新松戸３丁目２９２
                <br />
                曙マンション 201
              </p>
              <iframe
                title="INTIMACY 新松戸 アクセスマップ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d808.7511892265369!2d139.9144871!3d35.824358999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60189b366916aaab%3A0xb152d33377805ed6!2z5puZ44Oe44Oz44K344On44Oz!5e0!3m2!1sja!2sjp!4v1776670436066!5m2!1sja!2sjp"
                width="100%"
                height="50%"
                style={{ border: 0, borderRadius: '0.5rem', marginTop: '1rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}
              >
                電車
              </h4>
              <p style={{ color: '#1f2937' }}>JR新松戸駅より徒歩9分</p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}
              >
                営業時間
              </h4>
              <p style={{ color: '#1f2937' }}>10:00～24:00 （最終受付 21:00）</p>
            </div>
          </div>

          <div
            id="booking"
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            <h4 style={{ fontSize: '1.25rem', fontWeight: 400, color: '#4c1d95', marginBottom: '1.5rem' }}>
              ご予約・ご相談
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <a
                  href="https://lin.ee/wJ21xSXg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...styles.button, backgroundColor: '#10b981', textAlign: 'center', textDecoration: 'none' }}
                >
                  LINE で予約
                </a>
                <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  友達追加後、メッセージで可能。
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  相談もお気軽にどうぞ！
                </p>
              </div>
              <div>
                <a
                  href="https://beauty.hotpepper.jp/kr/slnH000785676/coupon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...styles.button, textAlign: 'center', textDecoration: 'none', display: 'block' }}
                >
                  ホットペッパーで予約
                </a>
                <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  割引クーポンが豊富です。
                </p>
              </div>
              {/* <a
                href="tel:047-xxx-xxxx"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f3f0ff',
                  color: '#4c1d95',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                電話予約
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
