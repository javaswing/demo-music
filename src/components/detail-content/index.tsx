import React, { useMemo } from 'react';
import cls from 'classnames';
import Disk from '@/components/disk';
import Lyric from '@/components/lyric';

export interface DetailContentProps {
  model?: 'disk' | 'lyric';
  className?: string;
  coverImg?: string;
  isPlay?: boolean;
}

const DetailContent = (props: DetailContentProps) => {
  const { model = 'disk', className, coverImg, isPlay } = props;
  const isDiskModel = useMemo(() => {
    return model === 'disk';
  }, [model]);

  return (
    <div className={cls(className)}>{isDiskModel ? <Disk isPlay={isPlay} diskCover={coverImg} /> : <Lyric />}</div>
  );
};

export default React.memo(DetailContent);
