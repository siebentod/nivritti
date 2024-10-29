export const getNextDayDate = (date) => {
  const inADay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );
  return new Date(inADay.getTime());
  // const timeOffset = inADay.getTimezoneOffset() * 60000;
  // return new Date(inADay.getTime() - timeOffset);
};

export const getNextWeekDate = (date) => {
  const inAWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7
  );
  return new Date(inAWeek.getTime());
  // const timeOffset = inAWeek.getTimezoneOffset() * 60000;
  // return new Date(inAWeek.getTime() - timeOffset);
};
