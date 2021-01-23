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
  id: number;
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

/** 歌曲类型定义：包含专辑和歌手信息 */
type SongInfo = BaseSong & { al?: BaseAlbum; ar?: BaseSinger[] };
