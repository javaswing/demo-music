import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import BScroll from '@better-scroll/core';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';
import { delay } from 'lodash';
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
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<BScrollConstructor>(); // scroll 实例
  const [isTap, setIsTap] = useState<boolean>(false);

  useEffect(() => {
    if (scrollWrapperRef.current) {
      scrollRef.current = new BScroll(scrollWrapperRef.current, {});
      let timer: NodeJS.Timeout | null = null;
      scrollRef.current.on('beforeScrollStart', () => {
        setIsTap(true);
        timer && clearTimeout(timer);
      });
      scrollRef.current.on('touchEnd', () => {
        timer = setTimeout(() => {
          setIsTap(false);
        }, 2000);
      });
    }
    return () => {
      scrollRef.current?.destroy();
    };
  }, []);

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

  /**
   * 当前高亮索引
   */
  const currentIndex = useMemo(() => {
    const gtIndex = formatLrc.findIndex(e => e.totalSecounds > position);
    const safeIndex = gtIndex >= 1 ? gtIndex - 1 : gtIndex;
    return safeIndex;
  }, [formatLrc, position]);

  // TODO 处理加载中和加载出错的界面显示
  const renderLrc = useMemo(() => {
    return formatLrc.map((e, index) => (
      <div
        key={e.time}
        data-time={e.time}
        className={cls(styles.flag, {
          [styles.active]: currentIndex === index,
        })}
      >
        {e.lrc}
      </div>
    ));
  }, [currentIndex, formatLrc]);

  useEffect(() => {
    const scrollY = -lyrcLineHeight * currentIndex;
    !isTap && scrollRef.current?.scrollTo(0, scrollY, 500);
    return () => {};
  }, [currentIndex, isTap]);

  return (
    <div ref={scrollWrapperRef} className={cls(className, styles.listLrc)}>
      <div className={cls(styles.listBox)}>{renderLrc}</div>
    </div>
  );
};

export default React.memo(Lyric);
