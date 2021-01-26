import React, { useCallback, useEffect } from 'react';
import cls from 'classnames';
// import NavBar from '@/components/nav-bar';
import { getPlayListById } from '@/services';

import { PlayListResponse } from './types';
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
      <div className={styles.stickyContainer}>
        <div className={styles.sticky}>sticky</div>
      </div>
      {/* <NavBar
        title={
          <>
            <div>歌单</div>
          </>
        }
        isArrowDown
        zIndex={3}
      />
      <section className={styles.topBox}>
        <section
          className={cls(styles.top, styles.topBg, styles.placeholder)}
          style={{
            backgroundImage: 'url(//music.163.com/api/img/blur/109951165661631177?param=170y170',
          }}
        ></section>
        <div className={cls('row', styles.topMain)}>
          <div className={styles.coverBox}>
            <img
              className={styles.img}
              src="https://p1.music.126.net/xuNuN4G6ZgtwNKgemO07rQ==/109951165661631177.jpg?imageView=1&type=webp&thumbnail=252x0"
              alt=""
            />
          </div>
          <div className={cls(styles.infoBox, 'flex-1')}>
            <div className={cls(styles.title, 'txt-ellipsis--l2')}>
              Hi 这里有一个树洞Hi 这里有一个树洞Hi 这里有一个树洞Hi 这里有一个树洞Hi 这里有一个树洞Hi 这里有一个树洞Hi
              这里有一个树洞
            </div>
          </div>
        </div>
      </section>*/}
    </div>
  );
}
