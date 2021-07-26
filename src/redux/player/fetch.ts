import { createAsyncThunk } from '@reduxjs/toolkit';
import { SongInfoResponse } from '@/container/detail';
import { getSongInfo } from '@/services';

export const fetchSongInfo = createAsyncThunk('player/song', async (songId: number) => {
  const detail = ((await getSongInfo(songId)) as unknown) as SongInfoResponse;
  return detail;
});
