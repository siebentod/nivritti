export const finalTime = (time) => {
  const minutes = Math.trunc(time / 60);
  const seconds = time % 60;
  if (seconds < 0) return '00:00';
  return `${String(Math.round(minutes)).padStart(2, '0')}:${String(
    Math.round(seconds)
  ).padStart(2, '0')}`;
};
