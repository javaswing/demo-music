import React, { FC, useCallback, useMemo } from 'react';
import cls from 'classnames';
import styles from './style.module.scss';

export interface NavBarProps {
  className: string;
  left: React.ReactNode;
  leftArrow: boolean;
  isArrowDown: boolean;
  right: string | React.ReactNode;
  title: string | React.ReactNode;
  zIndex: number | string;
  onLeftClick: (e: MouseEvent) => void;
  onRightClick: (e: MouseEvent) => void;
}

const defaultProps = {
  leftArrow: true,
  isArrowDown: false,
  onLeftClick: (e: MouseEvent) => {},
  onRightClick: (e: MouseEvent) => {},
} as NavBarProps;

const NavBar: FC<Partial<NavBarProps>> = props => {
  const { className, title, left, right, zIndex, leftArrow, isArrowDown, onLeftClick, onRightClick } = {
    ...defaultProps,
    ...props,
  };

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

  const handleLeftClick = useCallback(
    (e: any) => {
      onLeftClick && onLeftClick(e);
    },
    [onLeftClick]
  );

  const handleRightClick = useCallback(
    (e: any) => {
      onRightClick && onRightClick(e);
    },
    [onRightClick]
  );

  const renderLeft = useMemo(() => {
    if (left || leftArrow) {
      return (
        <div onClick={handleLeftClick} className={styles.navBarLeft}>
          {renderArrow}
          {left}
        </div>
      );
    }
  }, [handleLeftClick, left, leftArrow, renderArrow]);

  const renderRight = useMemo(() => {
    return (
      right && (
        <div className={styles.navBarRight} onClick={handleRightClick}>
          {right}
        </div>
      )
    );
  }, [handleRightClick, right]);

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

NavBar.defaultProps = defaultProps;

export default React.memo(NavBar);
