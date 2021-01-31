import React, { useMemo } from 'react';
import cls from 'classnames';
import { getSizeStyle } from '@/utils/format';
import styles from './style.module.scss';

export interface LoadingProps {
  className?: string;
  size?: number | string;
  color?: string;
  vertical?: boolean;
  children?: React.ReactNode;
  textSize?: number | string;
  textColor?: string;
}

const LoadingIcon = (
  <svg viewBox="25 25 50 50" className={styles.loadingCircular}>
    <rect x="20" width="3" height="50" transform="translate(0) rotate(180 30 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="10; 50; 10"
        repeatCount="indefinite"
        begin="0.1s"
      ></animate>
    </rect>
    <rect x="30" width="3" height="50" transform="translate(0) rotate(180 40 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="10; 50; 10"
        repeatCount="indefinite"
        begin="0.3s"
      ></animate>
    </rect>
    <rect x="40" width="3" height="50" transform="translate(0) rotate(180 50 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="10; 50; 10"
        repeatCount="indefinite"
        begin="0.2s"
      ></animate>
    </rect>
    <rect x="50" width="3" height="50" transform="translate(0) rotate(180 60 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="10; 50; 10"
        repeatCount="indefinite"
        begin="0.4s"
      ></animate>
    </rect>
  </svg>
);

export default function Loading(props: LoadingProps) {
  const { color = 'red', size = 25, children = <>正在加载...</> } = props;
  const style = useMemo(() => {
    return { color, ...getSizeStyle(size) };
  }, [color, size]);

  const renderText = useMemo(() => {
    if (children) {
      return <span className={styles.loadingText}>{children}</span>;
    }
  }, [children]);

  return (
    <div className={cls(styles.loading, styles.loadingVertical)}>
      <span style={style}>{LoadingIcon}</span>
      {renderText}
    </div>
  );
}
