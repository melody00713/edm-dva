import React from 'react';
import styles from './AnimateBackground.less';

function AnimateBackground() {
  return (
    <div className={styles.normal}>
      <div className={styles.slider}>
        <div className={styles.sliderItem} />
        <div className={styles.sliderItem} />
        <div className={styles.sliderItem} />
        <div className={styles.sliderItem} />
      </div>
    </div>
  );
}

export default AnimateBackground;
