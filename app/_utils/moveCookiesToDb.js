import { moveDataFromCookiesAfterRegistration } from '../_lib/actions';
import { createTotalsAndSingularsFromCookies } from './createTotalsAndSingularsFromCookies';

export const moveDataToDb = async (user_id) => {
  const { totals, singulars } = createTotalsAndSingularsFromCookies();
  console.log('test2');
  console.log('test22');

  const { totalsError, singularsError, cookiesWereTransferred } =
    await moveDataFromCookiesAfterRegistration(totals, singulars, user_id);

  return {
    singulars,
    totals,
    cookiesWereTransferred,
    totalsError,
    singularsError,
  };
};
