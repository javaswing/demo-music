import React, { useMemo } from 'react';
import cls from 'classnames';
import Disk from '@/components/disk';
import Lyric from '@/components/lyric';

export interface DetailContentProps {
  model?: 'disk' | 'lyric';
  className?: string;
}

const DetailContent = (props: DetailContentProps) => {
  const { model = 'disk', className } = props;
  const isDiskModel = useMemo(() => {
    return model === 'disk';
  }, [model]);

  return <div className={cls(className)}>{isDiskModel ? <Disk /> : <Lyric />}</div>;
};

export default React.memo(DetailContent);
