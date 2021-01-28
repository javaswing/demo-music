import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { doubleRaf, raf } from '@/utils/raf';
import cls from 'classnames';
import { isDef } from '@/utils/base';
import { useRect } from '@/hook/useRect';
export interface MarqueeProps {
  text?: string | React.ReactNode;
  scrollable?: boolean;
  delay?: number | string;
  speed?: number | string;
}

const Marquee = (props: MarqueeProps) => {
  const { delay = 1, speed = 50, text } = props;
  const [offset, setOffset] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [wrapWidth, setWrapWidth] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(0);

  const startTimer = useRef<NodeJS.Timeout>();

  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const ellipsis = useMemo(() => {
    return props.scrollable === false;
  }, [props.scrollable]);

  const style = useMemo(
    () => ({
      transform: offset ? `translateX(${offset}px)` : '',
      transitionDuration: `${duration}s`,
    }),
    [duration, offset]
  );

  const onTransitionEnd = useCallback(() => {
    setOffset(wrapWidth);
    setDuration(0);

    raf(() => {
      // use double raf to ensure animation can start
      doubleRaf(() => {
        setOffset(offset - contentWidth);
        setDuration((contentWidth + wrapWidth) / Number(speed));
      });
    });
  }, [contentWidth, offset, speed, wrapWidth]);

  const reset = useCallback(() => {
    setOffset(0);
    setDuration(0);
  }, []);
  const wrapRefWidth = useRect(wrapRef).width;
  const contentRefWidth = useRect(contentRef).width;

  const start = useCallback(() => {
    const ms = isDef(delay) ? +delay * 1000 : 0;

    reset();
    startTimer.current && clearTimeout(startTimer.current);

    startTimer.current = setTimeout(() => {
      if (!wrapRef.current || !contentRef.current || props.scrollable === false) {
        return;
      }

      if (props.scrollable || contentRefWidth > wrapRefWidth) {
        doubleRaf(() => {
          setWrapWidth(wrapRefWidth);
          setContentWidth(contentRefWidth);
          setOffset(-contentWidth);
          setDuration(contentWidth / +speed);
        });
      }
    }, ms);
  }, [contentRefWidth, contentWidth, delay, props.scrollable, reset, speed, wrapRefWidth]);

  useEffect(() => {
    if (wrapRef.current || contentRef.current) {
      start();
    }
  }, [start]);

  return (
    <div ref={wrapRef} role="marquee">
      <div
        ref={contentRef}
        style={style}
        className={cls({
          'txt-ellipsis': ellipsis,
        })}
        onTransitionEnd={onTransitionEnd}
      >
        {text}
      </div>
    </div>
  );
};

export default React.memo(Marquee);
