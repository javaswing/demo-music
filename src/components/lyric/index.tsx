import React, { useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import BScroll from '@better-scroll/core';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { initCurrentSongLrc } from '@/redux/player/action';
import styles from './style.module.scss';

export interface LyricProps {
  isPlaying?: boolean;
  className?: string;
  position?: number;
  loading?: boolean;
  error?: boolean;
}

const lyrcLineHeight = 35;

const Lyric = (props: LyricProps) => {
  const { className, position = 0, isPlaying } = props;
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<BScrollConstructor>(); // scroll 实例
  const [isTap, setIsTap] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const { currentSongId, playerList } = useSelector((state: RootState) => state.player);
  const currentSong = useMemo(() => playerList[currentSongId] ?? {}, [currentSongId, playerList]);

  useEffect(() => {
    dispatch(initCurrentSongLrc(currentSongId));
    return () => {};
  }, [currentSongId, dispatch]);

  const lyricStr = useMemo(() => currentSong.lrcInfo?.lrc?.lyric, [currentSong.lrcInfo?.lrc?.lyric]);

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

  const currentIndex = useMemo(() => {
    const gtIndex = formatLrc.findIndex(e => e.totalSecounds > position);
    const safeIndex = gtIndex >= 1 ? gtIndex - 1 : gtIndex;
    return safeIndex;
  }, [formatLrc, position]);

  useEffect(() => {
    if (scrollWrapperRef.current) {
      scrollRef.current = new BScroll(scrollWrapperRef.current, { click: true });
      scrollRef.current.on('beforeScrollStart', () => {
        if (!isPlaying) return;
        setIsTap(true);
        timerRef.current && clearTimeout(timerRef.current);
      });
      scrollRef.current.on('touchEnd', () => {
        timerRef.current = setTimeout(() => {
          setIsTap(false);
        }, 2000);
      });
    }
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
      scrollRef.current?.destroy();
    };
  }, [currentIndex, isPlaying]);

  // TODO 处理加载中和加载出错的界面显示
  const renderLrc = useMemo(() => {
    if (!lyricStr) {
      return <div className={cls(styles.flag)}>纯音乐，无歌词</div>;
    }
    return formatLrc.map((e, index) => (
      <div
        key={e.time + e.lrc}
        className={cls(styles.flag, {
          [styles.active]: currentIndex === index,
        })}
      >
        {e.lrc}
      </div>
    ));
  }, [currentIndex, formatLrc, lyricStr]);

  useEffect(() => {
    if (!lyricStr) return;
    const scrollY = -lyrcLineHeight * currentIndex;
    !isTap && scrollRef.current?.scrollTo(0, scrollY, 500);
    return () => {};
  }, [currentIndex, isTap, lyricStr]);

  return (
    <div ref={scrollWrapperRef} className={cls(className, styles.listLrc)}>
      <div className={cls(styles.listBox)}>{renderLrc}</div>
    </div>
  );
};

export default React.memo(Lyric);
