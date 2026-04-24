import React from 'react';

export default function HeroSection({ styles, heroImageSrcs, currentSlide }) {
  return (
    <section style={styles.hero}>
      <div style={styles.heroMedia}>
        <img src={heroImageSrcs[currentSlide]} alt="" style={styles.heroImage} />
      </div>
    </section>
  );
}

