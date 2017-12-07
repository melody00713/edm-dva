import React, { Component } from 'react';
import styles from './CircleProgress.less';

class CircleProgress extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { delay, delaytime, name, active, onClick, durationtime } = this.props;
    const animationDuration = `${durationtime}s`;
    return (
      <div onClick={onClick} className={`${styles['CircleProgress']} ${delay? styles['delay'] : ''} ${active ? styles['active'] : ''}`}>
        <div className={styles['circleProgress_wrapper']}>
          <div className={`${styles.wrapper} ${styles.right}`}>
            <div className={`${styles.circleProgress} ${styles.rightcircle}`} style={{ 'animationDuration': animationDuration }} />
          </div>
          <div className={`${styles.wrapper} ${styles.left}`}>
            <div className={`${styles.circleProgress} ${styles.leftcircle}`} style={{ 'animationDuration': animationDuration }} />
          </div>
          <div className={styles['circleProgress_content']}>
            <p className={styles['circleProgress_delay']}><span>{delaytime}</span>s</p>
            {name}
          </div>
        </div>
      </div>
    );
  }
}

export default CircleProgress;
