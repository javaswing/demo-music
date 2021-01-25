import React, { useMemo } from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export interface NavBarProps {
  className?: string;
  left?: React.ReactNode;
  leftArrow?: boolean;
  isArrowDown?: boolean;
  right?: string | React.ReactNode;
  title: string | React.ReactNode;
  zIndex?: number;
}

const NavBar = (props: NavBarProps) => {
  const { className, title, left, right, leftArrow = true, isArrowDown = false, zIndex = 1 } = props;

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
    <div className={cls(className, styles.navBar)} style={{ zIndex: zIndex }}>
      <div className={styles.navBarContent}>
        {(left || leftArrow) && <div className={styles.navBarLeft}>{renderLeft}</div>}
        <div className={cls(styles.navBarTitle, styles.navBarText)}>{renderTitle}</div>
        {right && <div className={styles.navBarRight}>{renderRight}</div>}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
