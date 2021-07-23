import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { pick } from 'lodash';
import { getLyricById, getSongInfo, getSongUrl, LyricRespone } from '@/services';
import { SongInfoResponse, SongLrcResponse } from '@/container/detail';

import { RootState } from '@/store';
import { PlayerSongInfo } from './reducers';
import {
  PlayerActionTypes,
  SET_CURRENT_SONG,
  SET_PLAY_LIST,
  UPDADTE_SONG_LRC,
  UPDATE_SONG_INFO,
  UPDATE_SONG_URL,
} from './types';

/**
 * 更新歌曲信息
 * @param info
 */
export const updateSongInfo = (info: SongInfo): PlayerActionTypes => {
  return {
    type: UPDATE_SONG_INFO,
    payload: info,
  };
};

/**
 * 设置播放列表
 * @param info
 */
export const setPlayerList = (info: PlayerSongInfo[]): PlayerActionTypes => {
  return {
    type: SET_PLAY_LIST,
    payload: info,
  };
};

/**
 * 更新歌词
 * @param id
 * @param lrc
 */
export const updateSongLrc = (id: number, lrc: LyricRespone): PlayerActionTypes => {
  return {
    type: UPDADTE_SONG_LRC,
    payload: { id, lrc },
  };
};

export const updateSongUrl = (id: number, urlInfo: BaseSongUrl): PlayerActionTypes => {
  return {
    type: UPDATE_SONG_URL,
    payload: { id, urlInfo },
  };
};

export const setCurrentSong = (info: SongInfo): PlayerActionTypes => {
  return {
    type: SET_CURRENT_SONG,
    payload: info,
  };
};

/**
 * 异步action
 * @param id 歌曲ID
 */
export const initCurrentSong = (songId: number): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  const detail = ((await getSongInfo(songId)) as unknown) as SongInfoResponse;
  const { data: songUrlData } = await getSongUrl(songId);
  const [song] = detail.songs;
  const [songUrl] = songUrlData;
  const targetSongUrl = pick(songUrl, 'url', 'urlSource', 'type', 'md5', 'size');
  // 提交 action
  targetSongUrl && dispatch(updateSongUrl(songId, targetSongUrl));
  song && dispatch(updateSongInfo(song));
};

/**
 * 异步初始化歌词
 * @param songId
 * @returns
 */
export const initCurrentSongLrc = (
  songId: number
): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  const lyricJson = (await getLyricById(songId)) as SongLrcResponse;
  lyricJson && dispatch(updateSongLrc(songId, lyricJson));
};
