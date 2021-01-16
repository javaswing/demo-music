import React from 'react';
import cls from 'classnames';
import { defaultDiskCover } from '@/constants/global';
import styles from './style.module.scss';

export interface DiskProps {
  diskCover?: string;
  isPlay?: boolean;
  rotate?: number;
}

const Disk = (props: DiskProps) => {
  const { diskCover = defaultDiskCover, isPlay = false, rotate = 0 } = props;

  return (
    <div className={cls('row row-justify-center', styles.cd)}>
      <div
        className={cls(styles.stick, {
          [styles['stick--pause']]: !isPlay,
        })}
      >
        {/* <div className={styles.crosshair}></div> */}
      </div>
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
