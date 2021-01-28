import { useEffect, useRef } from 'react';

/**
 * useScrollParent
 * @description 获取滚动的父元素
 * @see https://github.com/youzan/vant/blob/cb8a8e64e4ec7297dbb771ea7e0dec8d35c0f57f/packages/vant-use/src/useScrollParent/index.ts
 *
 * */

type ScrollElement = HTMLElement | Window;

const overflowScrollReg = /scroll|auto/i;

function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
}

export function getScrollParent(el: Element, root: ScrollElement = window) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode as Element;
  }
  return root;
}

export function useScrollParent(el: React.RefObject<HTMLDivElement | undefined>, root: ScrollElement = window) {
  const scrollParent = useRef<Element | Window>();

  useEffect(() => {
    if (el.current) {
      scrollParent.current = getScrollParent(el.current, root);
    }
  }, [el, root]);
  return scrollParent;
}
