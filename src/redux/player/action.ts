import { LyricRespone } from '@/services';
import { PlayerActionTypes, SET_SONG_INFO, SET_SONG_LRC, SongInfo } from './types';

/**
 * 设置歌词信息
 * @param lrc
 */
export const setSongLrc = (lrc: LyricRespone): PlayerActionTypes => {
  return {
    type: SET_SONG_LRC,
    payload: lrc,
  };
};

/** 设置歌曲信息 */
export const setSongInfo = (info: SongInfo): PlayerActionTypes => {
  return {
    type: SET_SONG_INFO,
    payload: info,
  };
};
