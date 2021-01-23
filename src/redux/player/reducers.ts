import { LyricRespone } from '@/services';
import { PlayerActionTypes } from './types';

/** 播放器用歌曲信息，包含歌曲lrcInfo */
export interface PlayerSongInfo extends SongInfo {
  lrcInfo?: LyricRespone;
  urlInfo?: BaseSongUrl;
}

export type PlayerList = {
  [key: number]: PlayerSongInfo;
};

export type PlayerModel = 'random' | 'listLoop' | 'singleLoop' | 'order';

export interface PlayerState {
  playerList: PlayerList;
  /** order:顺序 | singleLoop:单曲循环 | listLoop: 列表循环 | random:随机 */
  playerModel: PlayerModel;
  currentSongId: number;
}

const initialState: PlayerState = {
  playerList: [],
  playerModel: 'listLoop',
  currentSongId: 0,
};

export default function playerReducer(state = initialState, action: PlayerActionTypes) {
  switch (action.type) {
    case 'SET_PLAY_LIST': {
      const playerInfoList = action.payload;
      const oldPlayerList = { ...state.playerList };
      playerInfoList.forEach(item => {
        const songId = item.id;
        const info = oldPlayerList[songId];
        oldPlayerList[songId] = { ...info, ...item };
      });
      return {
        ...state,
        playerList: oldPlayerList,
      };
    }
    case 'UPDATE_SONG_INFO': {
      const info = action.payload;
      const newPlayerList = {
        ...state.playerList,
        [info.id]: info,
      };
      return {
        ...state,
        playerList: newPlayerList,
      };
    }
    case 'UPDADTE_SONG_LRC': {
      const { id, lrc } = action.payload;
      const oldInfo = state.playerList[id];
      const newList = {
        ...state.playerList,
        [id]: { ...oldInfo, lrcInfo: lrc },
      };
      return {
        ...state,
        playerList: newList,
      };
    }
    case 'SET_CURRENT_SONG': {
      const song = action.payload;
      return {
        ...state,
        currentSongId: song.id,
      };
    }
    case 'CHANGE_PLAYER_MODEL': {
      return {
        ...state,
        playerModel: action.payload,
      };
    }
    case 'UPDATE_SONG_URL': {
      const { id, urlInfo } = action.payload;
      const oldInfo = state.playerList[id];
      const newList = {
        ...state.playerList,
        [id]: { ...oldInfo, urlInfo },
      };
      return {
        ...state,
        playerList: newList,
      };
    }
    default:
      return state;
  }
}
