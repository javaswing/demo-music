import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  songDetailVisible: boolean;
}

const initialState: AppState = {
  songDetailVisible: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changSongDetailVisible: (state, action: PayloadAction<boolean>) => {
      state.songDetailVisible = action.payload;
    },
  },
});

export const { changSongDetailVisible } = appSlice.actions;

export default appSlice.reducer;
