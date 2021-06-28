import React, { useCallback, useEffect, useState, useMemo } from 'react';
import cls from 'classnames';
import { pick } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player';
import DetailContent from '@/components/detail-content';
import ControlBar from '@/components/control-bar';
import NavBar from '@/components/nav-bar';
import { getLyricById, getSongUrl, LyricRespone } from '@/services';
import { RootState } from '@/redux';
import { updateSongLrc, updateSongUrl } from '@/redux/player/action';
import styles from './style.module.scss';

export type SongLrcResponse = BaseResponse & Partial<LyricRespone>;

export default function Detail() {
  const dispatch = useDispatch();
  const { load, playing, loading, ready, togglePlayPause } = useAudioPlayer();
  const { position, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  });

  const { currentSongId, playerList, playerModel } = useSelector((state: RootState) => state.player);
  const [isClickPlay, setIsClickPlay] = useState<boolean>(false);

  const [isDiskModel, setIsDiskModel] = useState<boolean>(true);

  const currentSong = useMemo(() => playerList[currentSongId], [currentSongId, playerList]);

  const init = useCallback(async () => {
    const songId = currentSongId;
    const { data: songUrlData } = await getSongUrl(songId);
    const lyricJson = (await getLyricById(songId)) as SongLrcResponse;
    const [songUrl] = songUrlData;
    const targetSongUrl = pick(songUrl, 'url', 'urlSource', 'type', 'md5', 'size');

    dispatch(updateSongUrl(songId, targetSongUrl));
    dispatch(updateSongLrc(songId, lyricJson));
  }, [currentSongId, dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (currentSong.urlInfo) {
      load({
        src: currentSong?.urlInfo.url,
      });
    }
  }, [currentSong?.urlInfo, load]);

  const handlePlay = useCallback(() => {
    setIsClickPlay(true);
    if (ready) {
      togglePlayPause();
      setIsClickPlay(false);
    }
  }, [ready, togglePlayPause]);

  useEffect(() => {
    // loading完成自动继续执行播放
    if (!loading && isClickPlay) {
      handlePlay();
    }
  }, [handlePlay, isClickPlay, loading]);

  const handleSeek = useCallback(
    (value: number) => {
      seek(value);
    },
    [seek]
  );

  const singerName = useMemo(() => currentSong?.ar?.[0]?.name, [currentSong?.ar]);
  const albumStyle = useMemo(() => ({ backgroundImage: `url(${currentSong?.al?.picUrl})` }), [currentSong?.al?.picUrl]);

  const toggleDetail = useCallback(
    e => {
      setIsDiskModel(!isDiskModel);
    },
    [isDiskModel]
  );

  return (
    <div className={styles.content}>
      <div className={cls(styles.playerWrapper, 'row')}>
        <NavBar
          title={
            <>
              <div className={styles.songName}>{currentSong?.name}</div>
              <div className={styles.singerName}>{singerName}</div>
            </>
          }
          className={styles.playerNavBar}
        />
        <DetailContent
          onClick={toggleDetail}
          position={position}
          duration={duration}
          lyricInfo={currentSong?.lrcInfo}
          isPlay={playing}
          isDiskModel={isDiskModel}
          coverImg={currentSong?.al?.picUrl}
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
        <div className={styles.maskAlbum}></div>
      </div>
    </div>
  );
}
