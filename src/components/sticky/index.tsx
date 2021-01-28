import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import { useScrollParent } from '@/hook/useScrollParent';
import { isHidden } from '@/utils/dom/style';
import { getElementTop, getScrollTop } from '@/utils/dom/scroll';
import { unitToPx } from '@/utils/format';
import { noop } from '@/utils/base';
import { useVisibilityChange } from '@/hook/useVisibilityChange';
import styles from './style.module.scss';

export interface StickyProps {
  zIndex?: number | string;
  container?: HTMLElement;
  offsetTop?: number | string;
  children?: React.ReactNode;
  onScroll?: (scrollTop: number, isFixed: boolean) => void;
}

const Sticky = (props: StickyProps) => {
  const { children, offsetTop = 0, container, onScroll = noop } = props;
  const root = useRef<HTMLDivElement>(null);
  const scrollParent = useScrollParent(root);
  const [height, setHeight] = useState(0);
  const [fixed, setFixed] = useState(false);
  const [transform, setTransform] = useState(0);

  const parseOffsetTop = useMemo(() => unitToPx(offsetTop), [offsetTop]);

  const triggerScroll = useCallback(
    (scrollTop: number) => {
      onScroll(scrollTop, fixed);
    },
    [fixed, onScroll]
  );

  const handleScroll = useCallback(() => {
    if (!root.current || isHidden(root)) {
      return;
    }

    setHeight(root.current.offsetHeight);
    const scrollTop = getScrollTop(window);
    const topToPageTop = getElementTop(root.current); // get distance from element top to page top or scroller top

    // container处理
    if (container) {
      const bottomToPageTop = topToPageTop + container.offsetHeight;
      if (scrollTop + parseOffsetTop + height > bottomToPageTop) {
        const distanceToBottom = height + scrollTop - bottomToPageTop;
        if (distanceToBottom < height) {
          setFixed(true);
          setTransform(-(distanceToBottom + parseOffsetTop));
        } else {
          setFixed(false);
        }
        triggerScroll(scrollTop);
        return;
      }
    }

    if (scrollTop + parseOffsetTop > topToPageTop) {
      setFixed(true);
      setTransform(0);
    } else {
      setFixed(false);
    }
    triggerScroll(scrollTop);
  }, [container, height, parseOffsetTop, triggerScroll]);

  const rootStyles = useMemo(() => ({ height: fixed ? `${height}px` : undefined }), [fixed, height]);

  const wrapperStyles = useMemo(() => {
    if (!fixed) return;
    const top = parseOffsetTop ? `${parseOffsetTop}px` : undefined;
    const transformValue = transform ? `translate3d(0, ${transform}px, 0)` : undefined;
    return { top, transform: transformValue, zIndex: props.zIndex !== undefined ? +props.zIndex : undefined };
  }, [fixed, parseOffsetTop, props.zIndex, transform]);

  useEffect(() => {
    const targetElement = scrollParent.current;
    targetElement && targetElement.addEventListener('scroll', handleScroll, false);

    return () => {
      targetElement && targetElement.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, scrollParent]);

  useVisibilityChange(root, handleScroll);

  return (
    <div ref={root} style={rootStyles}>
      <div
        className={cls({
          [styles.fixed]: fixed,
        })}
        style={wrapperStyles}
      >
        {children}
      </div>
    </div>
  );
};

export default React.memo(Sticky);
