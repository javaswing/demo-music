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
  currentRequestId: string | undefined;
}

const playerSlice = createSlice({
  name: 'player',
  initialState: playerAdapter.getInitialState<PlayerState>({
    playerModel: 'listLoop',
    currentSongId: 0,
    error: null,
    loading: 'idle',
    currentRequestId: undefined,
  }),
  reducers: {
    changePlayerModel: (state, action: PayloadAction<PlayerModel>) => {
      state.playerModel = action.payload;
    },
    setCurrentSongId: (state, action: PayloadAction<number>) => {
      state.currentSongId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSongInfoAndUrlInfo.pending, (state, action) => {
        state.loading = 'loading';
        state.error = null;
        // state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchSongInfoAndUrlInfo.fulfilled, (state, action) => {
        playerAdapter.addOne(state, action.payload);
        state.currentSongId = action.payload.songInfo.id;
        state.loading = 'idle';
        // state.currentRequestId = undefined;
      })
      .addCase(fetchSongInfoAndUrlInfo.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
        // state.currentRequestId = undefined;
      });
  },
});

export const { changePlayerModel, setCurrentSongId } = playerSlice.actions;

export const playerSelecters = playerAdapter.getSelectors();

export default playerSlice.reducer;
