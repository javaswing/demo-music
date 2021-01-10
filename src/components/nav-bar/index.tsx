import React from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export interface NavBarProps {
  className?: string;
  songName?: string;
  singer?: string;
}

const NavBar = (props: NavBarProps) => {
  const { className, songName = '歌名', singer = '歌手' } = props;
  return (
    <div className={cls(className, styles.box, 'row row-align-center')}>
      <div className={cls(styles.btn, styles.backBtn)}></div>
      <div className={cls(styles.info, 'flex-1')}>
        <div className={cls(styles.songName)}>{songName}</div>
        <div className={styles.singerName}>{singer}</div>
      </div>
      <div className={cls(styles.btn)}></div>
    </div>
  );
};

export default React.memo(NavBar);
