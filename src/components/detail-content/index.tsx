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
}

const DetailContent = (props: DetailContentProps) => {
  const { model = 'disk', className, coverImg, isPlay, duration = 0, position = 0 } = props;
  const isDiskModel = useMemo(() => {
    return model === 'disk';
  }, [model]);

  const rotate = useMemo(() => {
    // 10倍的正常速度
    return (position / duration) * 100 * 3.6 * 10 || 0;
  }, [duration, position]);

  return (
    <div className={cls(className)}>
      {isDiskModel ? <Disk rotate={rotate} isPlay={isPlay} diskCover={coverImg} /> : <Lyric />}
    </div>
  );
};

export default React.memo(DetailContent);
