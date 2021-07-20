import React, { useCallback, useEffect, useState, useMemo } from 'react';
import cls from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player';
import { isEmpty } from 'lodash';
import { DetailContent, ControlBar, NavBar } from '@/components';
import { LyricRespone } from '@/services';
import { RootState } from '@/redux';
import { initCurrentSong } from '@/redux/player/action';
import { cutImg } from '@/utils/base';
import { changSongDetailVisible } from '@/redux/app';
import { fetchLrc } from '@/redux/player/lrc';
import { Privilege } from '../play-list/types';
import styles from './style.module.scss';

export type SongLrcResponse = BaseResponse & Partial<LyricRespone>;

export type SongInfoResponse = Pick<BaseResponse, 'code'> & {
  privileges: Privilege[];
  songs: SongInfo[];
};

export default function Detail() {
  const dispatch = useDispatch();
  const { load, playing, loading, ready, togglePlayPause } = useAudioPlayer();
  const { position, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  });

  const { currentSongId, playerList, playerModel } = useSelector((state: RootState) => state.player);
  const [isClickPlay, setIsClickPlay] = useState<boolean>(false);
  const [isDiskModel, setIsDiskModel] = useState<boolean>(true);

  const currentSong = useMemo(() => playerList[currentSongId] ?? {}, [currentSongId, playerList]);

  const init = useCallback(async () => {
    const songId = currentSongId;
    isEmpty(currentSong) && dispatch(initCurrentSong(songId));
  }, [currentSong, currentSongId, dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (currentSong && currentSong?.urlInfo && currentSong.urlInfo.url) {
      load({
        src: currentSong?.urlInfo.url,
      });
    }
  }, [currentSong, currentSong?.urlInfo, load]);

  const handlePlay = useCallback(() => {
    setIsClickPlay(true);
    if (ready) {
      togglePlayPause();
      setIsClickPlay(false);
    }
  }, [ready, togglePlayPause]);

  useEffect(() => {
    // loading完成自动继续执行播放
    if (!loading) {
      handlePlay();
    }
  }, [handlePlay, isClickPlay, loading]);

  const handleSeek = useCallback(
    (value: number) => {
      seek(value);
    },
    [seek]
  );

  const singerName = useMemo(() => {
    return currentSong.songInfo?.ar?.[0]?.name;
  }, [currentSong]);

  const albumStyle = useMemo(() => {
    if (currentSong) {
      return { backgroundImage: `url(${cutImg(currentSong.songInfo?.al?.picUrl, 50)})` };
    } else {
      return {
        backgroundImage: `linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)`,
        backgroundBlendMode: `multiply`,
      };
    }
  }, [currentSong]);

  const toggleDetail = useCallback(
    e => {
      if (!isDiskModel && currentSongId) {
        dispatch(fetchLrc(currentSongId));
      }
      setIsDiskModel(!isDiskModel);
    },
    [currentSongId, dispatch, isDiskModel]
  );

  const handleNavBack = useCallback(
    (e: MouseEvent) => {
      dispatch(changSongDetailVisible(false));
    },
    [dispatch]
  );

  return (
    <div className={styles.content}>
      <div className={cls(styles.playerWrapper, 'row')}>
        <NavBar
          isArrowDown
          onLeftClick={handleNavBack}
          title={
            <>
              <div className={styles.songName}>{currentSong.songInfo?.name}</div>
              <div className={styles.singerName}>{singerName}</div>
            </>
          }
          className={styles.playerNavBar}
        />
        <DetailContent
          onClick={toggleDetail}
          isPlay={playing}
          isDiskModel={isDiskModel}
          coverImg={currentSong.songInfo?.al?.picUrl}
          className={styles.playerContent}
        />
        <ControlBar
          position={position}
          duration={duration}
          isPlay={playing}
          onSeek={handleSeek}
          onControl={handlePlay}
          isLoading={loading}
          className={styles.playerControl}
        />
      </div>
      <div className={styles.mask}>
        <div className={styles.maskAlbum} style={albumStyle}></div>
      </div>
    </div>
  );
}
