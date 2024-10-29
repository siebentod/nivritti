import Cookies from 'js-cookie';
import { getNextDayDate, getNextWeekDate } from './getDate';

export const saveCookies = (counter, mins) => {
  Cookies.set(
    'total',
    JSON.stringify({
      countAll: counter.countAll,
      minutesAll: counter.minutesAll,
    }),
    {
      expires: 3104,
      sameSite: 'strict',
      secure: true,
    }
  );

  const currentTime = new Date(new Date().getTime());
  Cookies.set(currentTime, JSON.stringify(mins), {
    expires: getNextWeekDate(currentTime),
    sameSite: 'strict',
    secure: true,
  });
};

export const clearCookies = (setCounter, initialCounter) => {
  const allCookies = Cookies.get();
  for (const cookieName in allCookies) {
    Cookies.remove(cookieName);
  }
  setCounter(initialCounter);
};

function isCookieCreatedToday(cookieDate) {
  const now = new Date();
  return now <= getNextDayDate(cookieDate);
}

function isCookieCreatedThisWeek(cookieDate) {
  const now = new Date();
  return now <= getNextWeekDate(cookieDate);
}

export function extractDataFromCookieName(cookieName) {
  const match = cookieName.match(/GMT/);
  if (match) {
    return new Date(cookieName);
  }
  return null;
}

export const getCookieNumbers = (initialCounter) => {
  const pullCounter = { ...initialCounter };
  const storedTotal = Cookies.get('total');
  if (storedTotal) {
    pullCounter.countAll = JSON.parse(storedTotal).countAll;
    pullCounter.minutesAll = JSON.parse(storedTotal).minutesAll;
  } else return initialCounter;

  const allCookies = Cookies.get();

  for (const cookieName in allCookies) {
    const cookieDate = extractDataFromCookieName(cookieName);
    if (cookieDate && isCookieCreatedToday(cookieDate)) {
      pullCounter.countToday++;
      pullCounter.minutesToday =
        Number(pullCounter.minutesToday) + Number(allCookies[cookieName]);
    }
    if (cookieDate && isCookieCreatedThisWeek(cookieDate)) {
      pullCounter.countWeek++;
      pullCounter.minutesWeek =
        Number(pullCounter.minutesWeek) + Number(allCookies[cookieName]);
    }
  }

  return pullCounter;
};
