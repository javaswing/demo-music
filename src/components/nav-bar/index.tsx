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

  const style = useMemo(() => {
    return {
      zIndex: zIndex !== undefined ? +zIndex : undefined, // +表示 string => number
    };
  }, [zIndex]);

  const targetArrowClassName = useMemo(() => {
    return isArrowDown && styles.arrowDown;
  }, [isArrowDown]);

  const renderLeft = useMemo(() => {
    if (React.isValidElement(left)) return left;
    return [leftArrow && <div className={cls(styles.arrow, targetArrowClassName)}></div>];
  }, [left, leftArrow, targetArrowClassName]);

  const renderRight = useMemo(() => {
    if (React.isValidElement(right)) return right;
    return right;
  }, [right]);

  const renderTitle = useMemo(() => {
    if (React.isValidElement(title)) return title;
    return title;
  }, [title]);

  return (
    <div className={cls(className, styles.navBar)} style={style}>
      <div className={styles.navBarContent}>
        {(left || leftArrow) && (
          <div onClick={onLeftClick} className={styles.navBarLeft}>
            {renderLeft}
          </div>
        )}
        <div className={cls(styles.navBarTitle, styles.navBarText)}>{renderTitle}</div>
        {right && (
          <div className={styles.navBarRight} onClick={onRightClick}>
            {renderRight}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
