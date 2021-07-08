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
  nolyric?: boolean;
}

export interface CheckMusicResponse {
  success: boolean;
  message: string;
}

/**
 * 获取音乐URL
 * @param id
 * @description 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
 */
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
 * 检测音乐是否可用
 * @param id 歌曲ID
 */
export function checkMusic(id: number) {
  return request<CheckMusicResponse>({ url: '/check/music', params: { id } });
}

/**
 * 获取歌单详情
 * @param id 歌单ID
 * @param s 默认值为：8 歌单最近的s个收藏者
 */
export function getPlayListById(id: number, s = 8) {
  return request({ url: '/playlist/detail', params: { id, s }, method: 'get' });
}

/**
 * 歌单详情动态
 * @param id 歌单 id
 * @returns
 */
export function getPlayListDynamicDetailById(id: number) {
  return request({ url: '/playlist/detail/dynamic', params: { id }, method: 'get' });
}

/**
 * 获取歌词
 * @param id
 */
export function getLyricById(id: number) {
  return request({ url: '/lyric', params: { id }, method: 'get' });
}
