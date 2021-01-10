import React, { useMemo } from 'react';
import cls from 'classnames';
import Disk from '@/components/disk';
import Lyric from '@/components/lyric';

export interface DetailContentProps {
  model?: 'disk' | 'lyric';
  className?: string;
  coverImg?: string;
  isPlay?: boolean;
  duration?: number;
  position?: number;
  lyric?: string;
}

const DetailContent = (props: DetailContentProps) => {
  const { model = 'lyric', className, coverImg, isPlay, duration = 0, position = 0, lyric } = props;
  const isDiskModel = useMemo(() => {
    return model === 'disk';
  }, [model]);

  const rotate = useMemo(() => {
    // 10倍的正常速度
    return (position / duration) * 100 * 3.6 * 10 || 0;
  }, [duration, position]);

  return (
    <div className={cls(className)}>
      {isDiskModel ? (
        <Disk rotate={rotate} isPlay={isPlay} diskCover={coverImg} />
      ) : (
        <Lyric position={position} lyricStr={lyric} />
      )}
    </div>
  );
};

export default React.memo(DetailContent);
