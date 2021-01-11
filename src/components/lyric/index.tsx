import React, { useCallback, useMemo, useState } from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export interface LyricProps {
  lyricStr?: string;
  className?: string;
  position?: number;
}

const defaultTranlateY = 150;

const Lyric = (props: LyricProps) => {
  const { className, lyricStr, position = 0 } = props;
  const [translateY, setTranslateY] = useState<number>(0);

  const formatLrc = useMemo(() => {
    if (!lyricStr)
      return [
        {
          lrc: '歌词加载中..',
          time: '00:00.00',
          totalSecounds: 0,
        },
      ];
    const lyricArr = lyricStr.split('\n');

    return lyricArr.map(item => {
      const endIndex = item.lastIndexOf(']');
      const time = item.substring(1, endIndex); // 03:36.310
      const timeArr = time.split(':');
      const totalSecounds = timeArr.reduce((pre, cur) => {
        const sum = pre + (cur.indexOf('.') > -1 ? Number.parseFloat(cur) : Number.parseFloat(cur) * 60);
        return sum;
      }, 0);
      const lrc = item.substring(endIndex + 1).trim();
      return { totalSecounds, time, lrc };
    });
  }, [lyricStr]);

  const isActive = useCallback(
    (index: number) => {
      const gtIndex = formatLrc.findIndex(e => e.totalSecounds > position);
      if (gtIndex === -1) return false;
      const safeIndex = gtIndex >= 1 ? gtIndex - 1 : gtIndex;
      if (safeIndex === index) {
        setTranslateY(index * 35);
      }
      return safeIndex === index;
    },
    [formatLrc, position]
  );

  const renderLrc = useMemo(() => {
    return formatLrc.map((e, index) => (
      <div
        key={e.time}
        data-time={e.time}
        className={cls(styles.flag, {
          [styles.active]: isActive(index),
        })}
      >
        {e.lrc}
      </div>
    ));
  }, [formatLrc, isActive]);

  return (
    <div className={cls(className, styles.listLrc)}>
      <div className={styles.listBox} style={{ transform: `translateY(${defaultTranlateY - translateY}px)` }}>
        {renderLrc}
      </div>
    </div>
  );
};

export default React.memo(Lyric);
