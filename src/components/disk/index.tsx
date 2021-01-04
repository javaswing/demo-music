import React, { useMemo } from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export interface DiskProps {
  diskCover?: string;
  status?: 'playing' | 'pause';
  rotate?: number;
}

const Disk = (props: DiskProps) => {
  const {
    diskCover = 'http://p1.music.126.net/dREm6MLlitjPHtUMD8l7bQ==/109951163849833537.jpg?param=500y500',
    status = 'pause',
    rotate = 0,
  } = props;

  const isPause = useMemo(() => {
    return status === 'pause';
  }, [status]);

  return (
    <div className={cls('row row-justify-center row-align-center', styles.cd)}>
      <div
        className={cls(styles.stick, {
          [styles['stick--pause']]: isPause,
        })}
      ></div>
      <div
        className={cls('row row-justify-center row-align-center', styles.disk)}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <img className={styles.img} src={diskCover} />
      </div>
    </div>
  );
};

export default React.memo(Disk);
