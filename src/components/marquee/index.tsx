import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { doubleRaf, raf } from '@/utils/raf';
import cls from 'classnames';
import { isDef, noop } from '@/utils/base';
import { isEqual } from 'lodash';
import styles from './style.module.scss';
export interface MarqueeProps {
  /** 显示的文字 */
  text?: string;
  children?: React.ReactNode;
  /** 是否开启滚动播放，内容长度溢出时默认开启 */
  scrollable?: boolean;
  /** 动画延迟时间 (s) , 默认值1s*/
  delay?: number | string;
  /** 滚动速率 (px/s) */
  speed?: number | string;
  /** 每当滚动栏重新开始滚动时触发 */
  onReplay?: () => void;
}

interface State {
  offset?: number;
  duration?: number;
}

const defaultState = { offset: 0, duration: 0 };

const Marquee = (props: MarqueeProps) => {
  const { delay = 1, speed = 50, text, scrollable = false, children, onReplay = noop } = props;
  const [state, setState] = useState<State>(defaultState);

  const wrapWidth = useRef(0);
  const contentWidth = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startTimer = useRef<NodeJS.Timeout>();

  const style = useMemo(() => {
    const { offset, duration } = state;
    return { transform: offset ? `translateX(${offset}px)` : '', transitionDuration: `${duration}s` };
  }, [state]);

  const ellipsis = useMemo(() => {
    return scrollable === false;
  }, [scrollable]);

  const triggerState = useCallback((params: State) => {
    setState(prev => ({ ...prev, ...params }));
  }, []);

  const handleTransitionEnd = useCallback(() => {
    triggerState({ offset: wrapWidth.current, duration: 0 }); // render

    raf(() => {
      // use double raf to ensure animation can start
      doubleRaf(() => {
        triggerState({ offset: -contentWidth.current, duration: (contentWidth.current + wrapWidth.current) / +speed }); // render
        onReplay();
      });
    });
  }, [contentWidth, onReplay, speed, triggerState, wrapWidth]);

  const reset = useCallback(() => {
    wrapWidth.current = 0;
    contentWidth.current = 0;
    triggerState({ duration: 0, offset: 0 });
  }, [triggerState]);

  // improvement need reset  for render
  const checkNeedReset = useMemo(() => {
    return wrapWidth.current !== 0 && contentWidth.current !== 0 && isEqual(state, defaultState);
  }, [state]);

  const start = useCallback(() => {
    const ms = isDef(delay) ? +delay * 1000 : 0;
    checkNeedReset && reset(); // render
    startTimer.current && clearTimeout(startTimer.current);

    startTimer.current = setTimeout(() => {
      if (!wrapRef.current || !contentRef.current) {
        return;
      }
      const wrapRefWidth = wrapRef.current ? wrapRef.current.getBoundingClientRect().width : 0;
      const contentRefWidth = contentRef.current ? contentRef.current.getBoundingClientRect().width : 0;
      if (scrollable || contentRefWidth > wrapRefWidth) {
        doubleRaf(() => {
          wrapWidth.current = wrapRefWidth;
          contentWidth.current = contentRefWidth;
          triggerState({ duration: contentRefWidth / +speed, offset: -contentRefWidth }); // render
        });
      }
    }, ms);
  }, [checkNeedReset, delay, reset, scrollable, speed, triggerState]);

  useEffect(() => {
    start();
  }, [start]);

  /**
   * fix cache issues with forwards and back history in safari
   * @see: https://guwii.com/cache-issues-with-forwards-and-back-history-in-safari/
   **/
  useEffect(() => {
    window.addEventListener('pageshow', start);
    return () => {
      window.removeEventListener('pageshow', start);
    };
  }, [start]);

  return (
    <div ref={wrapRef} role="marquee" className={styles.marqueeWrapper}>
      <div
        ref={contentRef}
        style={style}
        className={cls(styles.marqueeContent, {
          [`txt-ellipsis`]: ellipsis,
        })}
        onTransitionEnd={handleTransitionEnd}
      >
        {children ? children : text}
      </div>
    </div>
  );
};

export default React.memo(Marquee);
