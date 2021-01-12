import React, { useCallback, useMemo, useState } from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export interface LyricProps {
  lyricStr?: string;
  className?: string;
  position?: number;
  loading?: boolean;
  error?: boolean;
}

const defaultTranlateY = 150;
const lyrcLineHeight = 35;

const Lyric = (props: LyricProps) => {
  const { className, lyricStr, position = 0 } = props;
  const [translateY, setTranslateY] = useState<number>(0);

  const formatLrc = useMemo(() => {
    const lyricArr = lyricStr?.split('\n') ?? [];

    return lyricArr.map(item => {
      const endIndex = item.lastIndexOf(']');
      const time = item.substring(1, endIndex); // 03:36.310
      const totalSecounds = time.split(':').reduce((pre, cur) => {
        return pre + (cur.indexOf('.') > -1 ? parseFloat(cur) : parseFloat(cur) * 60);
      }, 0);
      const lrc = item.substring(endIndex + 1).trim();
      return { totalSecounds, time, lrc };
    });
  }, [lyricStr]);

  const isActive = useCallback(
    (index: number) => {
      const gtIndex = formatLrc.findIndex(e => e.totalSecounds > position);
      const safeIndex = gtIndex >= 1 ? gtIndex - 1 : gtIndex;
      const result = safeIndex === index;
      result && setTranslateY(index * lyrcLineHeight);
      return result;
    },
    [formatLrc, position]
  );

  // TODO 处理加载中和加载出错的界面显示
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
