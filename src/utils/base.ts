import { isNumber } from 'lodash';

export function noop() {}

/**
 * js 动态PX转 rem
 * @param val 单位是 PX
 */
export function rem(val?: number) {
  if (isNumber(val)) {
    return `${val / 75}rem`;
  } else {
    return '';
  }
}
