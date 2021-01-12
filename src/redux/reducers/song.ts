import { LyricRespone } from '@/services';
import { SET_LRC, SET_SONG, SongActionTypes, SongInfo } from '../types';

export interface SongInfoState {
  song: SongInfo;
  songLrc: LyricRespone;
}

const initialState: SongInfoState = {
  song: {},
  songLrc: {},
};

const songReducer = (state = initialState, action: SongActionTypes): SongInfoState => {
  switch (action.type) {
    case SET_SONG: {
      return {
        ...state,
        song: action.payload,
      };
    }
    case SET_LRC: {
      return {
        ...state,
        songLrc: action.payload,
      };
    }
    default:
      return state;
  }
};

export default songReducer;
