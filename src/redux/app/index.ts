import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  songDetailVisible: boolean;
}

const initialState: AppState = {
  songDetailVisible: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});
