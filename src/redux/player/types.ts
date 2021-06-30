import { LyricRespone } from '@/services';
import { PlayerModel, PlayerSongInfo } from './reducers';

export const UPDATE_SONG_INFO = 'UPDATE_SONG_INFO';
export const SET_PLAY_LIST = 'SET_PLAY_LIST';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const UPDADTE_SONG_LRC = 'UPDADTE_SONG_LRC';
export const UPDATE_SONG_URL = 'UPDATE_SONG_URL';
export const CHANGE_PLAYER_MODEL = 'CHANGE_PLAYER_MODEL';

interface UpdateSongInfo {
  type: typeof UPDATE_SONG_INFO;
  payload: SongInfo;
}
interface SetPlayList {
  type: typeof SET_PLAY_LIST;
  payload: PlayerSongInfo[];
}

interface SetCurretSong {
  type: typeof SET_CURRENT_SONG;
  payload: SongInfo;
}

interface UpdateSongLrc {
  type: typeof UPDADTE_SONG_LRC;
  payload: { id: number; lrc: LyricRespone };
}

interface ChangePlayerModel {
  type: typeof CHANGE_PLAYER_MODEL;
  payload: PlayerModel;
}

interface UpdateSongUrl {
  type: typeof UPDATE_SONG_URL;
  payload: { id: number; urlInfo: BaseSongUrl };
}

export type PlayerActionTypes =
  | UpdateSongInfo
  | SetPlayList
  | UpdateSongLrc
  | SetCurretSong
  | ChangePlayerModel
  | UpdateSongUrl;
