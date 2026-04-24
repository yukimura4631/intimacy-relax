import React from 'react';

export default function NewsSection({
  styles,
  newsItems,
  newsLoading,
  newsLoadError,
  supabaseConfigWarning,
  onOpenImageModal,
}) {
  return (
    <section id="news" style={{ ...styles.section }}>
      <div style={styles.contentWrap}>
        <h3 style={styles.h3}>お知らせ</h3>
        {newsLoading ? (
          <p style={{ margin: '-2rem 0 1.25rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            読み込み中…
          </p>
        ) : null}
        {newsLoadError ? (
          <p style={{ margin: '-2rem 0 1.25rem', textAlign: 'center', fontSize: '0.875rem', color: '#b91c1c' }}>
            {newsLoadError}
          </p>
        ) : null}
        {!newsLoading && !newsLoadError && supabaseConfigWarning ? (
          <p style={{ margin: '-2rem 0 1.25rem', textAlign: 'center', fontSize: '0.875rem', color: '#b91c1c' }}>
            {supabaseConfigWarning}
          </p>
        ) : null}
        <div style={styles.newsViewport}>
          <div style={styles.newsScroller} aria-label="お知らせ一覧">
            {newsItems.map((item, index) => (
              <div key={item.id ?? index} style={{ ...styles.card, ...styles.newsCard }}>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontSize: '0.75rem', color: '#6b21a8' }}>{item.date}</p>
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: '#4c1d95',
                      marginBottom: '0.75rem',
                      lineHeight: 1.5,
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.title || '（タイトル未設定）'}
                  </h4>
                  {item.image_url ? (
                    <div
                      style={styles.newsImageWrap}
                      onClick={() => onOpenImageModal(item.image_url, item.title)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') onOpenImageModal(item.image_url, item.title);
                      }}
                    >
                      <img src={item.image_url} alt={item.title ?? ''} style={styles.newsImage} loading="lazy" />
                    </div>
                  ) : null}
                  <p
                    style={{
                      color: '#4b5563',
                      fontSize: '0.875rem',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.content || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

