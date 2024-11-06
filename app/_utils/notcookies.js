const getNextDayDate = (date) => {
  const inADay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );
  return new Date(inADay.getTime());
  // const timeOffset = inADay.getTimezoneOffset() * 60000;
  // return new Date(inADay.getTime() - timeOffset);
};

function isSingularCreatedToday(date) {
  if (!date) return false;
  const now = new Date();
  return now <= getNextDayDate(date);
}

export const getDataNumbers = (
  singulars,
  total_mins,
  total_count,
  streak,
  activity
) => {
  const pullCounter = {
    countToday: 0,
    countWeek: 0,
    countAll: total_count,
    minutesToday: 0,
    minutesWeek: 0,
    minutesAll: total_mins,
    streak: streak,
    activity: activity,
  };

  if (isNaN(total_mins) || isNaN(total_count)) {
    return null;
  } else {
    if (!singulars) return pullCounter;
  }
  // console.log('singulars', singulars);

  singulars.map((singular) => {
    const date = new Date(singular.date);
    // console.log('singular.date', singular.date);
    if (isSingularCreatedToday(date)) {
      pullCounter.countToday++;
      pullCounter.minutesToday =
        Number(pullCounter.minutesToday) + Number(singular.mins);
    }
    pullCounter.countWeek++;
    pullCounter.minutesWeek =
      Number(pullCounter.minutesWeek) + Number(singular.mins);
  });

  // console.log('pullCounter', pullCounter);
  return pullCounter;
};
