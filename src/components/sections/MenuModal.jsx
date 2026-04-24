import React from 'react';

export default function MenuModal({ styles, open, menuSlides, menuSlideIndex, onClose, onPrev, onNext, onTouchStart, onTouchEnd }) {
  if (!open) return null;

  return (
    <div style={styles.menuModalBackdrop} onClick={onClose}>
      <div
        style={styles.menuModalBody}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button type="button" aria-label="閉じる" onClick={onClose} style={styles.menuModalClose}>
          ✕
        </button>
        <div style={styles.menuModalSlide}>
          <img src={menuSlides[menuSlideIndex]?.src} alt={menuSlides[menuSlideIndex]?.alt} style={styles.menuModalImage} />
        </div>
        <button type="button" aria-label="前のメニュー" onClick={onPrev} style={{ ...styles.menuModalArrow, left: '-12px' }}>
          {'<'}
        </button>
        <button type="button" aria-label="次のメニュー" onClick={onNext} style={{ ...styles.menuModalArrow, right: '-12px' }}>
          {'>'}
        </button>
      </div>
    </div>
  );
}

