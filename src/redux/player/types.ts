import { LyricRespone } from '@/services';

export const SET_SONG_INFO = 'SET_SONG_INFO';
export const SET_SONG_LRC = 'SET_SONG_LRC';
export const SET_PLAY_LIST = 'SET_PLAY_LIST';

export type SongInfo = ResponseSong &
  BaseSongUrl & {
    lrc: LyricRespone;
  };
