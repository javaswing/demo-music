import request from '@/utils/request';

export function getSongInfo(id: number) {
  return request.get('/song/url', { params: { id } });
}
