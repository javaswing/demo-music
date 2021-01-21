import { LyricRespone } from '@/services';

// -------------------------------------- constant types ----------------------//
export const SET_SONG = 'SET_SONG';
export const SET_LRC = 'SET_LRC';

//--------------------------------------- state types --------------------------//
export type SongInfo = SongObj & BaseSongUrl;

//--------------------------------------- action types ---------------------------//
interface SetSongAction {
  type: typeof SET_SONG;
  payload: SongInfo;
}

interface SetSongLrcAction {
  type: typeof SET_LRC;
  payload: LyricRespone;
}

export type SongActionTypes = SetSongAction | SetSongLrcAction;
