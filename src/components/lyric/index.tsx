import React from 'react';
import cls from 'classnames';
// import styles from './style.module.scss';

export interface LyricProps {
  lyricStr?: string;
  className?: string;
}

const Lyric = (props: LyricProps) => {
  const { className } = props;
  return <div className={cls(className)} />;
};

export default React.memo(Lyric);
