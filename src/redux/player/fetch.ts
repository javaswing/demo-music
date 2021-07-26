import { createAsyncThunk } from '@reduxjs/toolkit';
import { pick, reject } from 'lodash';
import { AxiosError } from 'axios';
import resolve from 'resolve';
import { SongInfoResponse } from '@/container/detail';
import { getSongInfo, getSongUrl } from '@/services';
import { PlayerSongInfo } from '.';

export interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

const fetchInfo = async (songId: number) => {
  const detail = ((await getSongInfo(songId)) as unknown) as SongInfoResponse;
  const { data: songUrlData } = await getSongUrl(songId);
  const [song] = detail.songs;
  const [songUrl] = songUrlData;
  const targetSongUrl = pick(songUrl, 'url', 'urlSource', 'type', 'md5', 'size');
  return { urlInfo: targetSongUrl, songInfo: song } as PlayerSongInfo;
};

export const fetchSongInfoAndUrlInfo = createAsyncThunk<
  PlayerSongInfo,
  number,
  {
    rejectValue: ValidationErrors;
  }
>('player/song', async (songId: number, { rejectWithValue }) => {
  try {
    const data = await fetchInfo(songId);
    return data;
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // TODO验证异常
    return rejectWithValue(error.response.data);
  }
});
