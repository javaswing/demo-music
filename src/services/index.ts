import { SongInfo } from '@/reducers/song';
import request from '@/utils/request';

export function getSongUrl(id: number) {
  return request<SongInfo[]>({ url: '/song/url', params: { id }, method: 'get' });
}

/**
 * 获取歌曲详情
 * @param ids ?ids=347230,or  /song/detail?ids=347230,347231
 */
export function getSongInfo(ids: number) {
  return request({ url: '/song/detail', params: { ids } });
}

/**
 * 获取歌单详情
 * @param id 歌单ID
 * @param s 歌单最近的s个收藏者
 */
export function getPayListById(id: number, s = 8) {
  return request({ url: '/playlist/detail', params: { id, s }, method: 'get' });
}
