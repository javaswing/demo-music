import { SongInfo } from '@/reducers/song';
import request from '@/utils/request';

export function getSongInfo(id: number) {
  return request<SongInfo[]>({ url: '/song/url', params: { id }, method: 'get' });
}
