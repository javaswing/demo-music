import { LyricRespone } from '@/services';
import { SET_LRC, SET_SONG, SongActionTypes, SongInfo } from './types';

export const setSongInfo = (info: SongInfo): SongActionTypes => {
  return {
    type: SET_SONG,
    payload: info,
  };
};

export const setSongLrc = (lrc: LyricRespone): SongActionTypes => {
  return {
    type: SET_LRC,
    payload: lrc,
  };
};
