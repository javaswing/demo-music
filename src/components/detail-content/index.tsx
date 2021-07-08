import React from 'react';
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

  return (
    <div className={cls(className)} onClick={onClick}>
      <Disk isHiden={!isDiskModel} isPlay={isPlay} diskCover={coverImg} />
      {!isDiskModel && <Lyric position={position} noLyric={lyricInfo?.nolyric} lyricStr={lyricInfo?.lrc?.lyric} />}
    </div>
  );
};

export default React.memo(DetailContent);
