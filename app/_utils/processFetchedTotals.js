import { arrayOfZeros, isLeapYear } from './arrayOfZeros';

export function processFetchedTotals(totals) {
  let total_mins;
  let total_count;
  let streak;
  let activity;
  let last_timer_used;
  if (totals[0]) {
    total_mins = totals[0].total_mins;
    total_count = totals[0].total_count;
    streak = totals[0].streak;
    activity = isLeapYear ? totals[0].activity_leap : totals[0].activity;
    last_timer_used = isFinite(totals[0].last_timer_used)
      ? totals[0].last_timer_used
      : 2;
  } else {
    total_mins = 0;
    total_count = 0;
    streak = 0;
    activity = arrayOfZeros;
    last_timer_used = 2;
  }
  return { total_mins, total_count, streak, activity, last_timer_used };
}
