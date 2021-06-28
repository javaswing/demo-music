import request from '@/utils/request';

/**
 * 获取用户详情
 * @param uid 用户ID
 * @returns
 */
export function getUserInfo(uid: number) {
  return request({ url: '/user/detail', params: { uid }, method: 'get' });
}
