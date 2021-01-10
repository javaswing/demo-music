import React, { useCallback, useMemo, useState, useEffect } from 'react';
import cls from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { fomatSongTime } from '@/utils/format';
import { rem } from '@/utils/base';
import styles from './style.module.scss';

export interface ControlBarProps {
  className?: string;
  onControl: () => void;
  onSeek?: (value: number) => void;
  duration?: number;
  position?: number;
  isPlay?: boolean;
  isLoading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const ControlBar = (props: ControlBarProps) => {
  const { className, isPlay, duration = 0, position = 0, onControl, onSeek = noop } = props;
  const [currentValue, setCurrentValue] = useState<number>(duration);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const playControlClassName = useMemo(() => {
    return isPlay ? styles['d-play'] : styles['d-pause'];
  }, [isPlay]);

  const currentTime = useMemo(() => {
    return fomatSongTime(currentValue);
  }, [currentValue]);

  const totalTime = useMemo(() => {
    return fomatSongTime(duration);
  }, [duration]);

  useEffect(() => {
    if (!isDragging) {
      setCurrentValue(position);
    }
  }, [isDragging, position]);

  const handleBeforChange = useCallback((value: number) => {
    setIsDragging(true);
  }, []);

  const handleAfterChange = useCallback(
    (value: number) => {
      setIsDragging(false);
      onSeek(value);
    },
    [onSeek]
  );

  const handleOnChange = useCallback((value: number) => {
    setCurrentValue(value);
  }, []);

  const dotStyleObj = useMemo(() => {
    const target = {
      borderColor: 'rgba(0,0,0, .2)',
      borderWidth: `${rem(1)}`,
      width: `${rem(10)}`,
      height: `${rem(10)}`,
      marginTop: `-${rem(3.5)}`,
    };
    return target;
  }, []);

  return (
    <div className={cls(className)}>
      <div className={cls('row row-justify-space-around row-align-center', styles['progress-bar'])}>
        <div className={styles.time}>{currentTime}</div>
        <div className={styles.slider}>
          <Slider
            handleStyle={dotStyleObj}
            max={duration}
            min={0}
            trackStyle={{
              backgroundColor: 'rgba(255, 255,255, .4)',
              height: `${rem(2)}`,
            }}
            railStyle={{
              backgroundColor: 'rgba(255, 255,255, .2)',
              height: `${rem(2)}`,
            }}
            value={currentValue}
            onChange={handleOnChange}
            onBeforeChange={handleBeforChange}
            onAfterChange={handleAfterChange}
          />
        </div>
        <div className={styles.time}>{totalTime}</div>
      </div>
      <div className={cls('row row-justify-space-around row-align-center', styles['control-bar'])}>
        <div className={cls(styles.btn, styles['d-model'])}></div>
        <div className={cls(styles.btn, styles['btn--mini'], styles['d-prev'])}></div>
        <div onClick={onControl} className={cls(styles.btn, playControlClassName)}></div>
        <div className={cls(styles.btn, styles['btn--mini'], styles['d-next'])}></div>
        <div className={cls(styles.btn, styles['btn--mini'], styles['d-list'])}></div>
      </div>
    </div>
  );
};

export default React.memo(ControlBar);
