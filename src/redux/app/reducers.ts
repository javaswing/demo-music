import { AppActionTypes } from './types';

export interface AppState {
  songDetailVisible: boolean;
}

const initialState: AppState = {
  songDetailVisible: false,
};

export default function appReducer(state = initialState, action: AppActionTypes) {
  switch (action.type) {
    case 'UPDATE_APP_SONG_DETAIL_VISIBLE': {
      return {
        ...state,
        songDetailVisible: action.payload,
      };
    }
    default:
      return state;
  }
}
