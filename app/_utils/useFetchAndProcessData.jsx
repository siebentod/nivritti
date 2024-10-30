import { getData } from '../_lib/actions';
import { getDataNumbers } from './notcookies';
import { processFetchedTotals } from './processFetchedTotals';
import { usePageStore } from '../_lib/store';

export const useFetchAndProcessData = () => {
  const counter = usePageStore((state) => state.counter);
  const setCounter = usePageStore((state) => state.setCounter);
  const setLoggedIn = usePageStore((state) => state.setLoggedIn);

  const fetchAndProcessData = async (user_id) => {
    try {
      const { singulars, totals } = await getData(user_id);
      const { total_mins, total_count, streak, activity } =
        processFetchedTotals(totals);

      setCounter(
        getDataNumbers(singulars, total_mins, total_count, streak, activity)
      );
      setLoggedIn(true);
    } catch (error) {
      console.error('Ошибка при получении и обработке данных:', error);
    }
  };

  return {
    counter,
    fetchAndProcessData,
  };
};
