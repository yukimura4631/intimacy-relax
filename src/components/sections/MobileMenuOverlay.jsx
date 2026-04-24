import React from 'react';

export default function MobileMenuOverlay({ styles, open, menuItems, onBackdropClick, onNavClick }) {
  if (!open) return null;

  return (
    <div style={styles.mobileMenuBackdrop} onClick={onBackdropClick}>
      <div style={styles.mobileMenuPanel} onClick={(event) => event.stopPropagation()}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <button type="button" style={styles.mobileMenuItem} onClick={() => onNavClick(item.id)}>
              {item.name}
            </button>
            {index === menuItems.length - 1 ? null : <div style={styles.mobileMenuDivider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

