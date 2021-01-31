import { isNumber } from 'lodash';
import { inBrowser, isDef } from './base';

/**
 * 格式化时间显示
 * @param time 时间单位为: S
 */
export function fomatSongTime(time: number | undefined) {
  if (time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  } else {
    return '00:00';
  }
}

export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined;
  }

  return isNumber(value) ? `${value}px` : String(value);
}

export function getSizeStyle(originSize?: string | number) {
  if (isDef(originSize)) {
    const size = addUnit(originSize);
    return {
      width: size,
      height: size,
    };
  }
}

// cache
let rootFontSize: number;

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;

    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value: string) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

function convertVw(value: string) {
  value = value.replace(/vw/g, '');
  return (+value * window.innerWidth) / 100;
}

function convertVh(value: string) {
  value = value.replace(/vh/g, '');
  return (+value * window.innerHeight) / 100;
}
export function unitToPx(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  if (inBrowser) {
    if (value.indexOf('rem') !== -1) {
      return convertRem(value);
    }
    if (value.indexOf('vw') !== -1) {
      return convertVw(value);
    }
    if (value.indexOf('vh') !== -1) {
      return convertVh(value);
    }
  }

  return parseFloat(value);
}
