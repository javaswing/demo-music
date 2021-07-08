export const UPDATE_APP_SONG_DETAIL_VISIBLE = 'UPDATE_APP_SONG_DETAIL_VISIBLE';

interface UpdateAppSongDetailVisible {
  type: typeof UPDATE_APP_SONG_DETAIL_VISIBLE;
  payload: boolean;
}

export type AppActionTypes = UpdateAppSongDetailVisible;
