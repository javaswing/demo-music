import { SongInfo } from '@/reducers/song';
import request from '@/utils/request';
import { AxiosResponse } from 'axios';

export function getSongInfo(id: number): Promise<AxiosResponse<BaseResponse<SongInfo[]>>> {
  return request.get<BaseResponse<SongInfo[]>>('/song/url', { params: { id } });
}
