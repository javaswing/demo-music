import { AppActionTypes, UPDATE_APP_SONG_DETAIL_VISIBLE } from './types';

export const updateAppSongDetailVisible = (show: boolean): AppActionTypes => {
  return {
    type: UPDATE_APP_SONG_DETAIL_VISIBLE,
    payload: show,
  };
};
