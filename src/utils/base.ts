import { isNumber } from 'lodash';

export function noop() {}

export const inBrowser = typeof window !== 'undefined';

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

export function cutImg(imgPath: string | undefined, val: number) {
  if (!imgPath) return;
  return `${imgPath}?param=${val}y${val}`;
}

/**
 * 检测当前值是否包含undefinded和val
 * @param val
 */
export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isObject(val: unknown): val is Record<any, any> {
  return typeof val !== null && typeof val === 'object';
}
