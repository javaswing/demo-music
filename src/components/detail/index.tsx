import React from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export default function Detail() {
  return (
    <div className={styles.content}>
      <div className={styles['player-wrapper']}>
        <div className={styles['player__nav-bar']}></div>
        <div className={styles.player__content}>
          <div className={cls(styles['cd-wrapper'], 'row row-justify-center row-align-center')}>
            <div className={styles.stick}></div>
            <div className={cls('row row-justify-center row-align-center', styles['disk-box'])}>
              <img
                className={styles.img}
                src="http://p1.music.126.net/dREm6MLlitjPHtUMD8l7bQ==/109951163849833537.jpg?param=500y500"
              />
            </div>
          </div>
        </div>
        <div className={styles.player__control}></div>
      </div>
      <div className={styles.mask}>
        <div className={styles.mask__album}></div>
        <div className={styles.mask__cover}></div>
      </div>
    </div>
  );
}
