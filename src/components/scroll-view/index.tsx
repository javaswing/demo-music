import React, { FC, useCallback, useEffect, useRef } from 'react';
import cls from 'classnames';
import BScroll, { Behavior } from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

interface ScrollInfo {
  x: Behavior['currentPos'];
  y: Behavior['currentPos'];
}

export interface ScrollViewProps {
  className?: string;
  wrapHeight: string;
  scrollX?: boolean;
  onPullUp?: () => void;
  onScroll?: (info: ScrollInfo) => void;
  refreshDelay?: number;
}

const ScrollView: FC<ScrollViewProps> = props => {
  const { children, className, onScroll, wrapHeight, onPullUp, refreshDelay = 500 } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const bscroll = useRef<BScrollConstructor | null>(null);

  const hanldePullUp = useCallback(() => {
    onPullUp && onPullUp();
    setTimeout(() => {
      bscroll.current?.refresh();
    }, refreshDelay);
  }, [onPullUp, refreshDelay]);

  useEffect(() => {
    if (containerRef.current) {
      BScroll.use(Pullup);
      bscroll.current = new BScroll(containerRef.current, {
        //probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
        probetype: 3,
        //  可以使用原生的点击
        click: true,
        //  检测dom变化
        observeDOM: true,
        pullUpLoad: true,
      });
      onScroll && bscroll.current.on('scroll', onScroll);
    }
    return () => {
      bscroll.current && bscroll.current.destroy();
    };
  }, [onScroll]);

  useEffect(() => {
    if (bscroll.current) {
      bscroll.current?.off('pullingUp');
      bscroll.current?.once('pullingUp', hanldePullUp);
    }
    return () => {};
  }, [hanldePullUp]);

  return (
    <div ref={containerRef} className={cls(className)} style={{ height: wrapHeight, overflow: 'hidden' }}>
      <div>{children}</div>
    </div>
  );
};

export default ScrollView;
