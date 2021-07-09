import React from 'react';
import cls from 'classnames';
import Disk from '@/components/disk';
import Lyric from '@/components/lyric';
import { noop } from '@/utils/base';

export interface DetailContentProps {
  isDiskModel?: boolean;
  className?: string;
  coverImg?: string;
  isPlay?: boolean;
  position?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DetailContent = (props: DetailContentProps) => {
  const { isDiskModel = true, className, coverImg, isPlay, position = 0, onClick = noop } = props;

  return (
    <div className={cls(className)} onClick={onClick}>
      <Disk isHiden={!isDiskModel} isPlay={isPlay} diskCover={coverImg} />
      {!isDiskModel && <Lyric position={position} />}
    </div>
  );
};

export default React.memo(DetailContent);
