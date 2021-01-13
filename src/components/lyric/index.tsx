import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
const miniMoveDistance = 10; // 最小的touch move距离

interface SwipeInfo {
  y: number;
  swiping?: boolean;
}

const defaultSwipedInfoValue = { y: 0, swiping: false };
const Lyric = (props: LyricProps) => {
  const { className, lyricStr, position = 0 } = props;
  const [translateY, setTranslateY] = useState<number>(0);
  const [swiped, setSwiped] = useState<boolean>(false); // 是否是快划
  const swipeInfo = useRef<SwipeInfo>(defaultSwipedInfoValue);

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
      result && !swiped && setTranslateY(index * lyrcLineHeight);
      return result;
    },
    [formatLrc, position, swiped]
  );

  // TODO 处理加载中和加载出错的界面显示
  // 监听touch事件来实现歌词的手势滑动效果
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

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    swipeInfo.current = { y: touch.clientY };
    setSwiped(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches.length) {
      swipeInfo.current.swiping = true;
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    const moveY = -(touch.clientY - swipeInfo.current.y);
    console.log(moveY);
    const absY = Math.abs(moveY);
    if (absY > miniMoveDistance) {
      setSwiped(true);
      setTranslateY(prev => prev + moveY);
    }
    swipeInfo.current = defaultSwipedInfoValue;
  }, []);

  useEffect(() => {
    if (swiped) {
      console.log('swiped');
    }
  }, [swiped]);

  return (
    <div className={cls(className, styles.listLrc)}>
      <div
        className={cls(styles.listBox, {
          [styles.transition]: !swiped,
        })}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${defaultTranlateY - translateY}px)` }}
      >
        {renderLrc}
      </div>
    </div>
  );
};

export default React.memo(Lyric);
