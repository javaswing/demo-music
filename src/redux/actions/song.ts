import { SET_LRC, SET_SONG } from '@/redux/constants';
import { SongInfo } from '@/redux/reducers/song';
import { LyricRespone } from '@/services';

export type SongActionTypes = typeof SET_SONG | typeof SET_LRC;

export interface SetSongAction {
  type: SongActionTypes;
  payload: SongInfo | LyricRespone;
}

export const setSongInfo = (info: SongInfo): SetSongAction => {
  return {
    type: SET_SONG,
    payload: info,
  };
};

export const setSongLrc = (info: LyricRespone): SetSongAction => {
  return {
    type: SET_LRC,
    payload: info,
  };
};
