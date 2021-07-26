import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { SongLrcResponse } from '@/container/detail';
import { BaseLrc, getLyricById } from '@/services';

export const fetchLrc = createAsyncThunk('player/lrc', async (songId: number, { rejectWithValue }) => {
  try {
    const lyricJson = (await getLyricById(songId)) as SongLrcResponse;
    return { ...lyricJson, songId };
  } catch (error) {
    console.log('fetchLrc error: ' + error);
    return rejectWithValue(error);
  }
});

type LrcInfo = { songId: number } & BaseLrc;

const lrcAdapter = createEntityAdapter<LrcInfo>({
  selectId: lrc => lrc.songId,
});

export interface LrcState {
  error: null | string | undefined;
  loading: 'loading' | 'idle';
}

const lrcSlice = createSlice({
  name: 'lrc',
  initialState: lrcAdapter.getInitialState<LrcState>({ error: null, loading: 'idle' }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLrc.pending, state => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchLrc.fulfilled, (state, action) => {
        action.payload.lrc && lrcAdapter.addOne(state, { ...action.payload.lrc, songId: action.payload.songId });
        state.loading = 'idle';
      })
      .addCase(fetchLrc.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const {} = lrcSlice.actions;

export const lrcSelecters = lrcAdapter.getSelectors();

export default lrcSlice.reducer;
