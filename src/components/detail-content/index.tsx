import React, { useMemo } from 'react';
import cls from 'classnames';
import Disk from '@/components/disk';
import Lyric from '@/components/lyric';
import { noop } from '@/utils/base';
import { LyricRespone } from '@/services';

export interface DetailContentProps {
  isDiskModel?: boolean;
  className?: string;
  coverImg?: string;
  isPlay?: boolean;
  duration?: number;
  position?: number;
  lyricInfo?: LyricRespone;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DetailContent = (props: DetailContentProps) => {
  const {
    isDiskModel = true,
    className,
    coverImg,
    isPlay,
    duration = 0,
    position = 0,
    lyricInfo,
    onClick = noop,
  } = props;

  const rotate = useMemo(() => {
    // TODO: 优化，只能是初始角度依赖播放进度。10倍的正常速度
    return (position / duration) * 100 * 3.6 * 10 || 0;
  }, [duration, position]);

  return (
    <div className={cls(className)} onClick={onClick}>
      {isDiskModel ? (
        <Disk rotate={rotate} isPlay={isPlay} diskCover={coverImg} />
      ) : (
        <Lyric position={position} noLyric={lyricInfo?.nolyric} lyricStr={lyricInfo?.lrc?.lyric} />
      )}
    </div>
  );
};

export default React.memo(DetailContent);
