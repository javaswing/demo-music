import React, { useMemo } from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export interface LoadingProps {
  className?: string;
  size?: number | string;
  color?: string;
  vertical?: boolean;
  textSize?: number | string;
  textColor?: string;
}

const LoadingIcon = (
  <svg>
    <rect width="3" height="100" transform="translate(0) rotate(180 3 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="30; 100; 30"
        repeatCount="indefinite"
      ></animate>
    </rect>
    <rect x="17" width="3" height="100" transform="translate(0) rotate(180 20 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="30; 100; 30"
        repeatCount="indefinite"
        begin="0.1s"
      ></animate>
    </rect>
    <rect x="40" width="3" height="100" transform="translate(0) rotate(180 40 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="30; 100; 30"
        repeatCount="indefinite"
        begin="0.3s"
      ></animate>
    </rect>
    <rect x="60" width="3" height="100" transform="translate(0) rotate(180 58 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="30; 100; 30"
        repeatCount="indefinite"
        begin="0.5s"
      ></animate>
    </rect>
    <rect x="80" width="3" height="100" transform="translate(0) rotate(180 76 50)">
      <animate
        attributeName="height"
        attributeType="XML"
        dur="1s"
        values="30; 100; 30"
        repeatCount="indefinite"
        begin="0.1s"
      ></animate>
    </rect>
  </svg>
);

export default function Loading(props: LoadingProps) {
  const { color = 'red' } = props;
  const style = useMemo(() => {
    return { color };
  }, [color]);
  return (
    <div className={styles.loading}>
      <span>{LoadingIcon}</span>
    </div>
  );
}
