import React, { useEffect } from 'react';
import DetailContent from '@/components/detail-content';
import ControlBar from '@/components/control-bar';
// import cls from 'classnames';
import { getSongInfo } from '@/service';
import styles from './style.module.scss';

export default function Detail() {
  useEffect(() => {
    async function init() {
      const json = await getSongInfo(33894312);
      console.log(json);
    }
    init();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles['player-wrapper']}>
        <div className={styles['player__nav-bar']}></div>
        <DetailContent className={styles.player__content} />
        <ControlBar className={styles.player__control} />
      </div>
      <div className={styles.mask}>
        <div className={styles.mask__album}></div>
        <div className={styles.mask__cover}></div>
      </div>
    </div>
  );
}
