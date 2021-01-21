import React, { useCallback, useEffect } from 'react';
import cls from 'classnames';
import NavBar from '@/components/nav-bar';
import { getPlayListById } from '@/services';

import { PlayListResponse } from './typing';
import styles from './style.module.scss';

export interface PlayListProps {
  className?: string;
  playListId?: number;
}

const playListId = 5470484188;

export default function PlayList(props: PlayListProps) {
  const { className } = props;

  const initData = useCallback(async () => {
    const data = (await getPlayListById(playListId)) as PlayListResponse;
    console.log('data :>> ', data);
  }, []);

  useEffect(() => {
    initData();
    return () => {};
  }, [initData]);

  return (
    <div className={cls(className)}>
      <NavBar />
    </div>
  );
}
