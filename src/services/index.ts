import request from '@/utils/request';

export interface BaseLrc {
  version?: number;
  lyric?: string;
}

export interface LyricRespone {
  sgc?: boolean;
  sfy?: boolean;
  qfy?: boolean;
  lrc?: BaseLrc;
  klyric?: BaseLrc;
  tlyric?: BaseLrc;
}

export function getSongUrl(id: number) {
  return request<BaseSongUrl[]>({ url: '/song/url', params: { id }, method: 'get' });
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
 * @param s 默认值为：8 歌单最近的s个收藏者
 */
export function getPayListById(id: number, s = 8) {
  return request({ url: '/playlist/detail', params: { id, s }, method: 'get' });
}

/**
 * 获取歌词
 * @param id
 */
export function getLyricById(id: number) {
  return request({ url: '/lyric', params: { id }, method: 'get' });
}
