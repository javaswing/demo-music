import { LyricRespone } from '@/services';

export const SET_SONG_INFO = 'SET_SONG_INFO';
export const SET_SONG_LRC = 'SET_SONG_LRC';
export const SET_PLAY_LIST = 'SET_PLAY_LIST';

export type SongInfo = ResponseSong &
  BaseSongUrl & {
    lrc: LyricRespone;
  };

interface SetSongAction {
  type: typeof SET_SONG_INFO;
  payload: SongInfo;
}

interface SetSongLrc {
  type: typeof SET_SONG_LRC;
  payload: LyricRespone;
}

interface SetPlayList {
  type: typeof SET_PLAY_LIST;
  /**
   * TODO: 补全PlayList类型
   * 类似 {1: {id: 1, name: '歌曲名'}, 2: {id: 2, name: '歌曲名'}}
   */
  payload: any;
}

export type PlayerActionTypes = SetSongAction | SetSongLrc | SetPlayList;
