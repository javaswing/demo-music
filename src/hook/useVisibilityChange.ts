import React, { useEffect, useMemo } from 'react';
import { inBrowser } from '@/utils/base';

export function useVisibilityChange(
  target: React.RefObject<Element | undefined>,
  onChange: (visible: boolean) => void
) {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        entries => {
          onChange(entries[0].intersectionRatio > 0);
        },
        { root: document.body }
      ),
    [onChange]
  );

  useEffect(() => {
    if (!inBrowser || !window.IntersectionObserver) {
      return;
    }
    const targetElement = target.current;
    targetElement && observer.observe(targetElement);
    return () => {
      targetElement && observer.unobserve(targetElement);
    };
  }, [observer, target]);
}
