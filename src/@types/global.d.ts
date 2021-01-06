/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface BaseAlbum {
  id: number;
  name: string;
  picUrl?: string;
}

interface BaseSinger {
  id: number;
  name: string;
}

interface BaseSong {
  id?: number;
  name?: string;
  mv?: number;
  publishTime?: number;
}

interface BaseSongUrl {
  /** 播放地址 */
  url?: string;
  urlSource?: number;
  /** 歌曲类型 */
  type?: 'mp3' | 'm4a' | string;
  md5?: string;
  /** 大小 kb */
  size?: number;
}

type ResponseSong = BaseSong & { al?: BaseAlbum; ar?: BaseSinger[] };

/** 通用后端响应字段 */
interface BaseResponse<T = any> {
  code: number;
  data: T;
  message?: string;
}
