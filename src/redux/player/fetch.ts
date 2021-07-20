import { createAsyncThunk } from '@reduxjs/toolkit';
import { SongInfoResponse, SongLrcResponse } from '@/container/detail';
import { getLyricById, getSongInfo } from '@/services';

export const fetchLrc = createAsyncThunk('player/lrc', async (songId: number) => {
  const lyricJson = (await getLyricById(songId)) as SongLrcResponse;
  return lyricJson;
});

export const fetchSongInfo = createAsyncThunk('player/song', async (songId: number) => {
  const detail = ((await getSongInfo(songId)) as unknown) as SongInfoResponse;
  return detail;
});
