import React, { useCallback, useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import { doubleRaf, raf } from '@/utils/raf';

export interface MarqueeProps {
  text?: string | React.ReactNode;
  scrollable?: boolean;
  delay?: number | string;
  speed?: number | string;
}

const Marquee = (props: MarqueeProps) => {
  const { delay = 1, speed = 50, scrollable, text } = props;
  const [offset, setOffset] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [wrapWidth, setWrapWidth] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(0);

  const wrapRef = useRef(null);
  const contentRef = useRef(null);

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

  return (
    <div ref={wrapRef} role="marquee">
      <div ref={contentRef} onTransitionEnd={onTransitionEnd}>
        {text}
      </div>
    </div>
  );
};

export default React.memo(Marquee);
