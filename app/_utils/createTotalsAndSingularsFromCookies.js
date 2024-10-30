import Cookies from 'js-cookie';

const createSingularsFromCookies = (allCookies) => {
  let singulars = [];
  for (const cookieName in allCookies) {
    if (cookieName.match(/GMT/)) {
      const formattedDate = new Date(cookieName).toISOString();
      const formattedNumber = Number(allCookies[cookieName]);
      singulars.push({ date: formattedDate, mins: formattedNumber });
      //singulars.push({ date: formattedDate, mins: formattedNumber, user_id });
      // НУЖНО ЛИ ВСТАВЛЯТЬ USER_ID?
    }
  }
  return { singulars };
};

const createTotalsFromCookies = (allCookies) => {
  let totals;
  if (allCookies?.total) totals = JSON.parse(allCookies?.total) || null;
  const total_mins = totals?.minutesAll || 0;
  const total_count = totals?.countAll || 0;
  const streak = 0;
  totals = [
    { total_mins: total_mins, total_count: total_count, streak: streak },
  ];
  return { totals };
};

export function createTotalsAndSingularsFromCookies() {
  const allCookies = Cookies.get();
  const { totals } = createTotalsFromCookies(allCookies);
  const { singulars } = createSingularsFromCookies(allCookies);
  //const { singulars } = createSingularsFromCookies(allCookies, user_id);
  // НУЖНО ЛИ ВСТАВЛЯТЬ USER_ID?
  return { totals, singulars };
}
