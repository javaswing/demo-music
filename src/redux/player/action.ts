import { LyricRespone } from '@/services';
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
