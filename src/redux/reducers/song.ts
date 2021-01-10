import { SetSongAction } from '@/redux/actions';
import { LyricRespone } from '@/services';

export type SongInfo = ResponseSong & BaseSongUrl;

export interface SongInfoState {
  song?: SongInfo;
  songLrc?: LyricRespone;
}

const initialState: SongInfoState = {
  song: {},
  songLrc: {},
};

const songReducer = (state = initialState, action: SetSongAction): SongInfoState => {
  switch (action.type) {
    case 'SET_SONG': {
      return {
        ...state,
        song: action.payload as SongInfo,
      };
    }
    case 'SET_LRC': {
      return {
        ...state,
        songLrc: action.payload as LyricRespone,
      };
    }
    default:
      return state;
  }
};

export default songReducer;
