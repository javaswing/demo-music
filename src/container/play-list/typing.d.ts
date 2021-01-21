/** 特权 TODO: 暂时不定义类型，不知道用在哪里*/
export interface Privilege {
  id: number;
  pl: number;
  playMaxbr: number;
  maxbr: number;
}

/** 创作者 */
export interface Creator {
  userId: number;
  userType: number;
  vipType: number;
  /** 签名 */
  signature: string;
  remarkName: string | null;
  /** 省份ID */
  province: number;
  city: number;
  /** 生日：格式为时间戳 */
  birthday: number;
  nickname: string;
  /** 1-> 男 TODO:其它需要进行测试确定 */
  gender: 1;
  /** 是否相互关注 */
  mutual: boolean;
  /** 是否关注 */
  followed: boolean;
  /** 是否使用默认头像 */
  defaultAvatar: boolean;
  /** 用户头像背景 */
  backgroundUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  /** 用户头像 */
  avatarUrl: string;
  avatarImgId: number;
  avatarImgIdStr: string;
  /** 头像详情，TODO: 暂时不确定 */
  avatarDetail: null | string;
  /** 权威 */
  authority: number;
  authenticationTypes: number;
  authStatus: number;
  anchor: boolean;
  accountStatus: number;
}

export interface PlayList {
  id: number;
  name: string;
  creator: Creator;
  createTime: number;
  updateTime: number;
  description: string;
  coverImgUrl: string;
  coverImgId: number;
  coverImgId_str: string;
  /** 播放次数 */
  playCount: number;
  /** 分享次数 */
  shareCount: number;
  /** 评论数 */
  commentCount: number;
  commentThreadId: string;
  /** 订阅数 */
  subscribedCount: number;
  /** 是否订阅过 */
  subscribed: boolean;
  subscribers: Creator[];
  tags: string[];
  userId: number;
  /** 更新频率 TODO: 数据测试 */
  updateFrequency: null | string;
  videoIds: null | [];
  /** 是否高品质 */
  highQuality: boolean;
  /** 歌曲总数 */
  trackCount: number;
  /** 歌曲更新时间 */
  trackNumberUpdateTime: number;
  tracks: SongObj[];
}

export interface PlayListResponse extends BaseResponse {
  playlist: PlayList;
  privileges: Privilege[];
  urls: null | string;
  relatedVideos: null | string;
}
