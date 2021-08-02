import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import cls from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useAudioPlayer } from 'react-use-audio-player';
import { DetailContent, ControlBar, NavBar } from '@/components';
import { LyricRespone } from '@/services';
import { RootState } from '@/store';
import { cutImg } from '@/utils/base';
import { changSongDetailVisible } from '@/redux/app';
import { playerSelecters } from '@/redux/player';
import { Privilege } from '../play-list/types';
import styles from './style.module.scss';

export type SongLrcResponse = BaseResponse & Partial<LyricRespone>;

export type SongInfoResponse = Pick<BaseResponse, 'code'> & {
  privileges: Privilege[];
  songs: SongInfo[];
};

export default function Detail() {
  const dispatch = useDispatch();
  const { playing, loading, load, togglePlayPause, player } = useAudioPlayer({
    autoplay: false,
  });

  const playerState = useSelector((state: RootState) => state.player);
  const { currentSongId } = playerState;
  const [isDiskModel, setIsDiskModel] = useState<boolean>(true);

  const currentSong = useMemo(() => playerSelecters.selectById(playerState, currentSongId), [
    currentSongId,
    playerState,
  ]);

  const timeRef = useRef<boolean>(false);

  useEffect(() => {
    const song = playerSelecters.selectById(playerState, playerState.currentSongId);
    if (!song?.urlInfo?.url) {
      console.log('没有该歌曲播放信息');
      return;
    }
    if (!player) {
      load({ src: [song?.urlInfo?.url] });
      timeRef.current = true;
    } else if (song && player && player._src !== song?.urlInfo?.url && playing) {
      load({ src: [song?.urlInfo?.url] });
      timeRef.current = true;
    }
  }, [load, player, playerState, playing]);

  // 定时刷新
  useEffect(() => {
    let id: NodeJS.Timeout | null = null;
    id && clearInterval(id);
    if (!timeRef.current) {
      id && clearInterval(id);
      return;
    }
    function watch() {
      if (playing) {
        timeRef.current = false;
        id && clearInterval(id);
        return;
      }
      // hack 这个库有问题，如果Load之后判断ready执行play会在第二首歌的时候播放不出来
      player.play();
    }
    id = setInterval(watch, 1000);
    return () => {
      id && clearInterval(id);
    };
  }, [player, playing]);

  const singerName = useMemo(() => {
    return currentSong?.songInfo?.ar?.[0]?.name;
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
      setIsDiskModel(!isDiskModel);
    },
    [isDiskModel]
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
              <div className={styles.songName}>{currentSong?.songInfo?.name}</div>
              <div className={styles.singerName}>{singerName}</div>
            </>
          }
          className={styles.playerNavBar}
        />
        <DetailContent
          onClick={toggleDetail}
          isPlay={playing}
          isDiskModel={isDiskModel}
          coverImg={currentSong?.songInfo?.al?.picUrl}
          className={styles.playerContent}
        />
        <ControlBar isPlay={playing} onControl={togglePlayPause} isLoading={loading} className={styles.playerControl} />
      </div>
      <div className={styles.mask}>
        <div className={styles.maskAlbum} style={albumStyle}></div>
      </div>
    </div>
  );
}
