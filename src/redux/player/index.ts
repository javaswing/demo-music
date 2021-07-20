import { createSlice } from '@reduxjs/toolkit';
import { LyricRespone } from '@/services';

/** 播放器用歌曲信息，包含歌曲lrcInfo */
export interface PlayerSongInfo {
  lrcInfo?: LyricRespone;
  urlInfo?: BaseSongUrl;
  songInfo?: SongInfo;
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

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = playerSlice.actions;

export default playerSlice.reducer;
