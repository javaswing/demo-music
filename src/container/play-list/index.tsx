import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { useDispatch } from 'react-redux';
import NavBar from '@/components/nav-bar';
import Sticky from '@/components/sticky';
import { getPlayListById, getPlayListDynamicDetailById } from '@/services';

import Loading from '@/components/loading';
import { getUserInfo } from '@/services/user';
import ScrollView from '@/components/scroll-view';
import { setCurrentSong } from '@/redux/player/action';
import { updateAppSongDetailVisible } from '@/redux/app/action';
import { PlayListResponse } from './types';
import styles from './style.module.scss';

export interface PlayListProps {
  className?: string;
  playListId?: number;
}

const playListId = 5464225647;

export default function PlayList(props: PlayListProps) {
  const { className } = props;
  const [currentPslayList, setCurrentPslayList] = useState<PlayListResponse | undefined>();

  const dispatch = useDispatch();

  const initData = useCallback(async () => {
    const data = (await getPlayListById(playListId)) as PlayListResponse;
    setCurrentPslayList(data);
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);

  const handleItemClick = useCallback(
    (e, info: SongInfo) => {
      dispatch(setCurrentSong({ id: info.id }));
      dispatch(updateAppSongDetailVisible(true));
    },
    [dispatch]
  );

  const renderList = useMemo(() => {
    if (currentPslayList?.playlist) {
      return currentPslayList.playlist.tracks.map((item, index) => (
        <div key={item.id} className={cls(styles.item, 'row row-align-center')} onClick={e => handleItemClick(e, item)}>
          <span className={styles.itemNum}>{index + 1}</span>
          <div className={cls('flex-1', styles.itemInfo)}>
            <div className={cls('txt-ellipsis', styles.name)}>
              {item.name}
              <span className={styles['tns-name']}>{(item.tns ?? [])[0]}</span>
            </div>
            <div className={cls('row', 'txt-ellipsis', styles.other)}>
              <div className={styles.tags}></div>
              <span className={cls('flex-1', styles.ar)}>
                {(item.ar ?? [])[0]?.name}-{item.al?.name}
              </span>
            </div>
          </div>
          <div className={styles.itemActions}></div>
        </div>
      ));
    } else {
      return (
        <div className={cls('row row-justify-center row-align-center')}>
          <Loading></Loading>
        </div>
      );
    }
  }, [currentPslayList?.playlist, handleItemClick]);

  return (
    <div className={cls(className)}>
      {/* <ScrollView wrapHeight="100vh"> */}
      <section className={styles.top}>
        {/* <NavBar title={currentPslayList?.playlist.name} zIndex={100} /> */}
        <div
          className={styles.topBg}
          style={{
            backgroundImage: `url(${currentPslayList?.playlist.coverImgUrl}?param=170y170`,
          }}
        ></div>
        <div className={cls('row', styles.topMain)}>
          <div className={styles.coverBox}>
            <i className={styles.count}>32342434</i>
            <img
              className={styles.img}
              src={`${currentPslayList?.playlist.coverImgUrl}?imageView=1&type=webp&thumbnail=252x0`}
              alt=""
            />
          </div>
          <div className={cls(styles.infoBox, 'flex-1')}>
            <div className={cls(styles.title, 'txt-ellipsis--l2')}>{currentPslayList?.playlist.name}</div>
            <div className={cls(styles.author, 'row row-align-center')}>
              <img className={styles.avart} src={currentPslayList?.playlist.creator.avatarUrl} alt="" />
              <span>{currentPslayList?.playlist.creator.nickname}</span>
            </div>
            <div className={cls('txt-ellipsis--l1', styles.slogan)}>{currentPslayList?.playlist.description}</div>
          </div>
        </div>
      </section>
      <section className={cls(styles.main)}>
        <div className={cls(styles.mainBar, 'row row-align-center', styles.padding10)}>
          <span className={styles.icon}></span>
          播放全部<span className={styles.num}>({currentPslayList?.playlist.trackCount})</span>
        </div>
        {renderList}
      </section>
      {/* </ScrollView> */}
    </div>
  );
}
