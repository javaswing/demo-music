import React, { useEffect, useRef } from 'react';
import cls from 'classnames';
import { cutImg } from '@/utils/base';
import styles from './style.module.scss';

export interface DiskProps {
  diskCover?: string;
  isPlay?: boolean;
  isHiden?: boolean;
}

const Disk = (props: DiskProps) => {
  const { diskCover, isPlay = false, isHiden = false } = props;
  const [count, setCount] = React.useState(0);
  const animationRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      setCount(prevCount => prevCount + 0.1);
    }
    previousTimeRef.current = time;
    if (isPlay) animationRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    if (isPlay) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current && window.cancelAnimationFrame(animationRef.current);
    }
    return () => {
      animationRef.current && window.cancelAnimationFrame(animationRef.current);
    };
  }, [animate, isPlay]);

  return (
    <div
      className={cls('row row-justify-center', styles.cd)}
      style={{
        display: isHiden ? 'none' : 'flex',
      }}
    >
      <div
        className={cls(styles.stick, {
          [styles.stickPause]: !isPlay,
        })}
      >
        {/* <div className={styles.crosshair}></div> */}
      </div>
      <div className={cls('row row-justify-center row-align-center', styles.disk)}>
        <div
          className={cls('row row-justify-center row-align-center', styles.diskCover)}
          style={{
            transform: `rotate(${count}deg)`,
          }}
        >
          <div className={styles.imgContainer}>
            <img className={styles.img} src={cutImg(diskCover, 300)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Disk);
