import { arrayOfZeros, isLeapYear } from './arrayOfZeros';

export function processFetchedTotals(totals) {
  let total_mins;
  let total_count;
  let streak;
  let activity;
  if (totals[0]) {
    total_mins = totals[0].total_mins;
    total_count = totals[0].total_count;
    streak = totals[0].streak;
    activity = isLeapYear ? totals[0].activity_leap : totals[0].activity;
  } else {
    total_mins = 0;
    total_count = 0;
    streak = 0;
    activity = arrayOfZeros;
  }
  return { total_mins, total_count, streak, activity };
}
