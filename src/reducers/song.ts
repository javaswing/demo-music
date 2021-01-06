import { SetSongAction } from '@/actions';
import { SET_SONG } from '@/constants';

export type SongInfo = ResponseSong & BaseSongUrl;

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
        song: action.payload,
      };
    }
    default:
      return state;
  }
};

export default songReducer;
