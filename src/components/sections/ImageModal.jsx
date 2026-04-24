import React from 'react';

export default function ImageModal({ styles, open, url, alt, onClose }) {
  if (!open || !url) return null;

  return (
    <div style={styles.menuModalBackdrop} onClick={onClose}>
      <div style={styles.menuModalBody} onClick={(event) => event.stopPropagation()}>
        <button type="button" aria-label="閉じる" onClick={onClose} style={styles.menuModalClose}>
          ×
        </button>
        <div style={styles.menuModalSlide}>
          <img src={url} alt={alt} style={styles.menuModalImage} />
        </div>
      </div>
    </div>
  );
}

