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
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DetailContent = (props: DetailContentProps) => {
  const { isDiskModel = true, className, coverImg, isPlay, onClick = noop } = props;

  return (
    <div className={cls(className)} onClick={onClick}>
      <Disk isHiden={!isDiskModel} isPlay={isPlay} diskCover={coverImg} />
      {!isDiskModel && <Lyric />}
    </div>
  );
};

export default React.memo(DetailContent);
