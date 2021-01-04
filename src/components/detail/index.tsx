import React from 'react';
import DetailContent from '@/components/detail-content';
// import cls from 'classnames';
import styles from './style.module.scss';

export default function Detail() {
  return (
    <div className={styles.content}>
      <div className={styles['player-wrapper']}>
        <div className={styles['player__nav-bar']}></div>
        <DetailContent className={styles.player__content} />
        <div className={styles.player__control}></div>
      </div>
      <div className={styles.mask}>
        <div className={styles.mask__album}></div>
        <div className={styles.mask__cover}></div>
      </div>
    </div>
  );
}
