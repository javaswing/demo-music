import React from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export interface DiskProps {
  diskCover?: string;
  isPlay?: boolean;
  rotate?: number;
}

const Disk = (props: DiskProps) => {
  const {
    diskCover = 'http://p1.music.126.net/dREm6MLlitjPHtUMD8l7bQ==/109951163849833537.jpg?param=500y500',
    isPlay = false,
    rotate = 0,
  } = props;

  return (
    <div className={cls('row row-justify-center row-align-center', styles.cd)}>
      <div
        className={cls(styles.stick, {
          [styles['stick--pause']]: !isPlay,
        })}
      ></div>
      <div className={cls('row row-justify-center row-align-center', styles.disk)}>
        <div
          className={cls('row row-justify-center row-align-center', styles['disk-cover'])}
          style={{
            transform: `rotate(${rotate}deg)`,
          }}
        >
          <img className={styles.img} src={diskCover} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Disk);
