import React from 'react';
import cls from 'classnames';
import NavBar from '@/components/nav-bar';
import styles from './style.module.scss';

export interface PlayListProps {
  className?: string;
  playListId?: number;
}

export default function PlayList(props: PlayListProps) {
  const { className } = props;
  return (
    <div className={cls(className)}>
      <NavBar />
    </div>
  );
}
