import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSongInfoAndUrlInfo } from './fetch';

/** 播放器用歌曲信息，包含歌曲lrcInfo */
export interface PlayerSongInfo {
  urlInfo?: BaseSongUrl;
  songInfo: SongInfo;
}

const playerAdapter = createEntityAdapter<PlayerSongInfo>({
  selectId: song => song.songInfo.id,
});

/** order:顺序 | singleLoop:单曲循环 | listLoop: 列表循环 | random:随机 */
export type PlayerModel = 'random' | 'listLoop' | 'singleLoop' | 'order';

export interface PlayerState {
  playerModel: PlayerModel;
  currentSongId: number;
  error: null | string | undefined;
  loading: 'loading' | 'idle';
}

const playerSlice = createSlice({
  name: 'player',
  initialState: playerAdapter.getInitialState<PlayerState>({
    playerModel: 'listLoop',
    currentSongId: 0,
    error: null,
    loading: 'idle',
  }),
  reducers: {
    changePlayerModel: (state, action: PayloadAction<PlayerModel>) => {
      state.playerModel = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSongInfoAndUrlInfo.pending, state => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchSongInfoAndUrlInfo.fulfilled, (state, action) => {
        console.log('fulfilled');
        playerAdapter.addOne(state, action.payload);
        state.currentSongId = action.payload.songInfo.id;
        state.loading = 'idle';
      })
      .addCase(fetchSongInfoAndUrlInfo.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const { changePlayerModel } = playerSlice.actions;

export const playerSelecters = playerAdapter.getSelectors();

export default playerSlice.reducer;
