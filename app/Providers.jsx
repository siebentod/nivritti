'use client';

import { useEffect } from 'react';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

import { getData } from './_lib/actions';
import { usePageStore } from './_lib/store';
import { getDataNumbers } from './_utils/notcookies';
import { getCookieNumbers } from './_utils/cookies';
import { initialCounter } from './_utils/initialCounter';
import { arrayOfZeros, isLeapYear } from './_utils/arrayOfZeros';
import { moveDataToDb } from './_utils/moveCookiesToDb';

async function refreshData(user_id, setCounter) {
  const { singulars, total_mins, total_count, streak, cookiesWereTransferred } =
    await moveDataToDb(user_id);
  if (cookiesWereTransferred) {
    setCounter(getDataNumbers(singulars, total_mins, total_count, streak));
    console.log('Cookies were transferred');
  }
}

const fetchData = async (user_id, setCounter, setLoggedIn) => {
  console.log('start fetch', user_id);
  const { singulars, totals } = await getData(user_id);

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
  // console.log('providers-activity', activity.length);
  setCounter(
    getDataNumbers(singulars, total_mins, total_count, streak, activity)
  );
  setLoggedIn(true);
};

export function Providers({ children, user_id }) {
  const setCounter = usePageStore((state) => state.setCounter);
  const setLoggedIn = usePageStore((state) => state.setLoggedIn);
  const loggedIn = usePageStore((state) => state.loggedIn);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!user_id) {
      setCounter(getCookieNumbers(initialCounter));
      console.log('set cookie');
    } else {
      fetchData(user_id, setCounter, setLoggedIn);
    }
  }, [setCounter, setLoggedIn, user_id]);

  useEffect(() => {
    if (searchParams.get('error') === 'error') {
      toast.error('Error occured, please try again later.');
      router.replace('/', undefined, { shallow: true });
    }
    if (searchParams.get('login') === 'error') {
      toast.error('Error occured, please try again later.');
      router.replace('/', undefined, { shallow: true });
    }
    if (searchParams.get('registration') === 'email-sent') {
      toast.success('Please activate your account through email!');
      router.replace('/', undefined, { shallow: true });
    }
    if (searchParams.get('registration') === 'success') {
      toast.success("You've registered successfully!");
      refreshData(user_id, setCounter);
      router.replace('/', undefined, { shallow: true });
    }
    if (searchParams.get('oauth') === 'success') {
      console.log('refreshed');
      refreshData(user_id, setCounter);
      router.replace('/', undefined, { shallow: true });
    }

    if (searchParams.get('login') === 'success') {
      refreshData(user_id, setCounter);
      fetchData(user_id, setCounter, setLoggedIn);
    }
  }, [router, searchParams, setCounter, setLoggedIn, user_id]);

  useEffect(() => {
    if (loggedIn && searchParams.get('login') === 'success')
      router.replace('/');
  }, [loggedIn, router, searchParams]);

  return children;
}
