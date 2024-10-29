import Cookies from 'js-cookie';
import { moveDataFromCookiesAfterRegistration } from '../_lib/actions';

const getSingulars = (allCookies, singulars, user_id) => {
  for (const cookieName in allCookies) {
    if (cookieName.match(/GMT/)) {
      const formattedDate = new Date(cookieName).toISOString();
      const formattedNumber = Number(allCookies[cookieName]);
      singulars.push({ date: formattedDate, mins: formattedNumber, user_id });
    }
  }
};

export const moveDataToDb = async (user_id) => {
  const allCookies = Cookies.get();
  let totals;
  if (allCookies?.total) totals = JSON.parse(allCookies?.total) || null;
  const total_mins = totals?.minutesAll || 0;
  const total_count = totals?.countAll || 0;
  const streak = 0;
  totals = [{ total_mins: total_mins, total_count: total_count }];

  let singulars = [];
  getSingulars(allCookies, singulars, user_id);

  const { totalsError, singularsError, cookiesWereTransferred } =
    await moveDataFromCookiesAfterRegistration(totals, singulars, user_id);

  return { singulars, total_mins, total_count, streak, cookiesWereTransferred };
};
