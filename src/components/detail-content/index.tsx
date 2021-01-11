import React, { useMemo } from 'react';
import cls from 'classnames';
import Disk from '@/components/disk';
import Lyric from '@/components/lyric';
import { noop } from '@/utils/base';

export interface DetailContentProps {
  isDiskModel?: boolean;
  className?: string;
  coverImg?: string;
  isPlay?: boolean;
  duration?: number;
  position?: number;
  lyric?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DetailContent = (props: DetailContentProps) => {
  const { isDiskModel = true, className, coverImg, isPlay, duration = 0, position = 0, lyric, onClick = noop } = props;

  const rotate = useMemo(() => {
    // 10倍的正常速度
    return (position / duration) * 100 * 3.6 * 10 || 0;
  }, [duration, position]);

  return (
    <div className={cls(className)} onClick={onClick}>
      {isDiskModel ? (
        <Disk rotate={rotate} isPlay={isPlay} diskCover={coverImg} />
      ) : (
        <Lyric position={position} lyricStr={lyric} />
      )}
    </div>
  );
};

export default React.memo(DetailContent);
