import { SET_SONG } from '@/redux/constants';
import { SongInfo } from '@/redux/reducers/song';

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
