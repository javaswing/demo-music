import { SET_SONG } from '@/constants';
import { SongInfo } from '@/reducers/song';

export type SongActionTypes = typeof SET_SONG;

export interface SetSongAction {
  type: SongActionTypes;
  payload: SongInfo;
}

export const setSongInfo = (info: SongInfo): SetSongAction => {
  return {
    type: SET_SONG,
    payload: info,
  };
};
