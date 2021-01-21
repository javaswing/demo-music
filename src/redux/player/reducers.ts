import { PlayerActionTypes } from './types';

export interface PlayerState {
  playerList: [];
  /** order:顺序  singleLoop:单曲循环 listLoop: 列表循环 random:随机 */
  playerModel: 'random' | 'listLoop' | 'singleLoop' | 'order';
  currentSongId: number | string;
  nextSongId: number;
  prevSongId: number;
}

const initialState: PlayerState = {
  playerList: [],
  playerModel: 'listLoop',
  currentSongId: 0,
  nextSongId: 0,
  prevSongId: 0,
};

export default function playerReducer(state = initialState, action: PlayerActionTypes) {
  switch (action.type) {
    default:
      return state;
  }
}
