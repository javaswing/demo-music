/**
 * 格式化时间显示
 * @param time 时间单位为: S
 */
export function fomatSongTime(time: number | undefined) {
  if (time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  } else {
    return '00:00';
  }
}
