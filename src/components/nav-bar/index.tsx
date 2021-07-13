import React, { useMemo } from 'react';
import cls from 'classnames';
import { noop } from 'lodash';
import styles from './style.module.scss';

export interface NavBarProps {
  className?: string;
  left?: React.ReactNode;
  leftArrow?: boolean;
  isArrowDown?: boolean;
  right?: string | React.ReactNode;
  title: string | React.ReactNode;
  zIndex?: number | string;
  onLeftClick?: (e: MouseEvent) => void;
  onRightClick?: (e: MouseEvent) => void;
}

const NavBar = (props: NavBarProps) => {
  const {
    className,
    title,
    left,
    right,
    zIndex,
    leftArrow = true,
    isArrowDown = false,
    onLeftClick = noop,
    onRightClick = noop,
  } = props;

  const rootStyle = useMemo(() => {
    return {
      zIndex: zIndex !== undefined ? +zIndex : undefined, // +表示 string => number
    };
  }, [zIndex]);

  const renderArrow = useMemo(() => {
    return (
      leftArrow && (
        <div
          className={cls(styles.arrow, {
            [styles.arrowDown]: isArrowDown,
          })}
        ></div>
      )
    );
  }, [leftArrow, isArrowDown]);

  const renderLeft = useMemo(() => {
    if (left || leftArrow) {
      return (
        <div onClick={onLeftClick} className={styles.navBarLeft}>
          {renderArrow}
          {left}
        </div>
      );
    }
  }, [left, leftArrow, onLeftClick, renderArrow]);

  const renderRight = useMemo(() => {
    return (
      right && (
        <div className={styles.navBarRight} onClick={onRightClick}>
          {right}
        </div>
      )
    );
  }, [onRightClick, right]);

  const renderTitle = useMemo(() => {
    return <div className={cls(styles.navBarTitle, styles.navBarText)}>{title}</div>;
    return title;
  }, [title]);

  return (
    <div className={cls(className, styles.navBar)} style={rootStyle}>
      <div className={styles.navBarContent}>
        {renderLeft}
        {renderTitle}
        {renderRight}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
