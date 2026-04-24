import React from 'react';

export default function MenuSection({
  styles,
  menuSlides,
  menuSlideIndex,
  setMenuSlideIndex,
  onOpenMenuModal,
  onPrev,
  onNext,
  onTouchStart,
  onTouchEnd,
}) {
  return (
    <section id="menu" style={styles.section}>
      <div style={styles.contentWrap}>
        <h3 style={styles.h3}>メニュー</h3>
        <div
          style={styles.menuScroller}
          aria-label="メニュー画像スライダー"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            style={{
              ...styles.menuTrack,
              transform: 'translateX(-' + menuSlideIndex * 100 + '%)',
            }}
          >
            {menuSlides.map((slide, index) => (
              <div key={index} style={styles.menuSlide}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  style={styles.menuImage}
                  loading="lazy"
                  onClick={() => onOpenMenuModal(index)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="前のメニュー"
            onClick={onPrev}
            style={{ ...styles.menuArrow, left: '0.5rem' }}
          >
            {'<'}
          </button>
          <button
            type="button"
            aria-label="次のメニュー"
            onClick={onNext}
            style={{ ...styles.menuArrow, right: '0.5rem' }}
          >
            {'>'}
          </button>
        </div>
        <div style={styles.menuDots} aria-label="メニューのインジケーター">
          {menuSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`メニュー ${index + 1} に移動`}
              onClick={() => setMenuSlideIndex(index)}
              style={{
                ...styles.menuDot,
                ...(index === menuSlideIndex ? styles.menuDotActive : {}),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

