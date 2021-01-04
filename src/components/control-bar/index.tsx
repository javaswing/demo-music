import React from 'react';
import cls from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './style.module.scss';

export interface ControlBarProps {
  className?: string;
}

const ControlBar = (props: ControlBarProps) => {
  const { className } = props;
  return (
    <div className={cls(className)}>
      <div className={cls('row row-justify-space-around row-align-center', styles['progress-bar'])}>
        <div className={styles.time}>00:00</div>
        <div className={styles.slider}>
          <Slider />
        </div>
        <div className={styles.time}>00:00</div>
      </div>
      <div className={cls('row row-justify-space-around row-align-center', styles['control-bar'])}>
        <div className={cls(styles.btn, styles['d-mode'])}></div>
        <div className={cls(styles.btn, styles['d-prev'])}></div>
        <div className={cls(styles.btn, styles['d-play'])}></div>
        <div className={cls(styles.btn, styles['d-next'])}></div>
        <div className={cls(styles.btn, styles['d-list'])}></div>
      </div>
    </div>
  );
};

export default React.memo(ControlBar);
