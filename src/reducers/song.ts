import { SetSongAction } from '@/actions';
import { SET_SONG } from '@/constants';

export interface SongInfo {
  id?: number;
  url?: string;
  type?: 'mp3' | 'm4a' | string;
  md5?: string;
  coverImg?: string;
}

export interface SongInfoState {
  song?: SongInfo;
  currentTime?: number;
  totalTime?: number;
}

const initialState: SongInfoState = {
  song: {},
  currentTime: 0,
  totalTime: 0,
};

const songReducer = (state = initialState, action: SetSongAction): SongInfoState => {
  switch (action.type) {
    case SET_SONG: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default songReducer;
