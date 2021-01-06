import React, { useCallback, useEffect, useState } from 'react';
import DetailContent from '@/components/detail-content';
import ControlBar from '@/components/control-bar';
// import cls from 'classnames';
import { getSongInfo, getSongUrl } from '@/services';
import { pick } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSongInfo } from '@/actions';
import { RootState } from '@/reducers';
import styles from './style.module.scss';

export type SongInfoResponse = BaseResponse & { songs?: ResponseSong[] };

export default function Detail() {
  const dispatch = useDispatch();
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const init = useCallback(async () => {
    const songId = 468513829;
    const songInfoJson = (await getSongInfo(songId)) as SongInfoResponse;
    const { data: songUrlData } = await getSongUrl(songId);
    const [songUrl] = songUrlData;
    const [firtSong] = songInfoJson.songs ?? [];
    const targetSongUrl = pick(songUrl, 'url', 'urlSource', 'type', 'md5', 'size');
    dispatch(setSongInfo({ ...targetSongUrl, ...firtSong }));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  const { song } = useSelector((state: RootState) => state.song);

  return (
    <div className={styles.content}>
      <div className={styles['player-wrapper']}>
        <div className={styles['player__nav-bar']}>{song?.name}</div>
        <DetailContent isPlay={isPlay} coverImg={song?.al?.picUrl} className={styles.player__content} />
        <ControlBar toggleStatus={setIsPlay} className={styles.player__control} />
      </div>
      <div className={styles.mask}>
        <div className={styles.mask__album}></div>
        <div className={styles.mask__cover}></div>
      </div>
    </div>
  );
}
