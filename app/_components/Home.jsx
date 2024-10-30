'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import './Home.scss';
import TimeButtons from './TimeButtons';
import TimerSection from './TimerSection';
import StatsSection from './StatsSection';
import { getCookieNumbers, saveCookies } from '../_utils/cookies';
import { initialCounter } from '../_utils/initialCounter';
import {
  getData,
  moveDataFromCookiesAfterRegistration,
  updateData,
} from '../_lib/actions';
import { usePageStore } from '../_lib/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { processFetchedTotals } from '../_utils/processFetchedTotals';
import { getDataNumbers } from '../_utils/notcookies';
import { moveDataToDb } from '../_utils/moveCookiesToDb';
import { createTotalsAndSingularsFromCookies } from '../_utils/createTotalsAndSingularsFromCookies';
// import { getDataNumbers } from '../_utils/notcookies';
// import { usePageStore } from '../_lib/store';

function Home({ children, user_id }) {
  const counter = usePageStore((state) => state.counter);
  const setCounter = usePageStore((state) => state.setCounter);
  const setLoggedIn = usePageStore((state) => state.setLoggedIn);
  const loggedIn = usePageStore((state) => state.loggedIn);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [time, setTime] = useState(null);
  const intervalRef = useRef(null);
  const [timerState, setTimerState] = useState(null);
  const [color, setColor] = useState('whitesmoke');

  const [currentTimer, setCurrentTimer] = useState(null); // выбранный таймер
  const [manualTime, setManualTime] = useState(2); // время в инпуте

  // const [mode, setMode] = useState('triangle');
  const [isFocused, setIsFocused] = useState(true);

  const fetchAndProcessData = useCallback(
    async function (user_id) {
      const { singulars, totals } = await getData(user_id);
      const { total_mins, total_count, streak, activity } =
        processFetchedTotals(totals);

      // console.log('providers-activity', activity.length);
      setCounter(
        getDataNumbers(singulars, total_mins, total_count, streak, activity)
      );
      setLoggedIn(true);
    },
    [setCounter, setLoggedIn]
  );

  useEffect(() => {
    if (!user_id) {
      setCounter(getCookieNumbers(initialCounter));
      console.log('set cookie');
    } else {
      fetchAndProcessData(user_id);
    }
  }, [fetchAndProcessData, setCounter, user_id]);

  useEffect(() => {
    const tryToPushDataFromCookies = async (user_id) => {
      const { totals, singulars } = createTotalsAndSingularsFromCookies();
      console.log('num', singulars, totals);
      const { cookiesWereTransferred } =
        await moveDataFromCookiesAfterRegistration(totals, singulars, user_id);
      console.log('num2', cookiesWereTransferred);
      if (cookiesWereTransferred) {
        setCounter(
          getDataNumbers(
            singulars,
            totals.total_mins,
            totals.total_count,
            totals.streak
          )
        );
        console.log('Cookies were transferred');
      }
      await fetchAndProcessData(user_id);
    };

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
    if (searchParams.get('registration') === 'error') {
      toast.error('Error occured, please check your data or try again later');
      router.replace('/', undefined, { shallow: true });
    }
    if (searchParams.get('registration') === 'success') {
      toast.success("You've registered successfully!");
      tryToPushDataFromCookies(user_id);
    }
    if (searchParams.get('oauth') === 'success') {
      tryToPushDataFromCookies(user_id);
    }

    if (searchParams.get('login') === 'success') {
      tryToPushDataFromCookies(user_id);
    }
  }, [fetchAndProcessData, router, searchParams, setCounter, user_id]);

  useEffect(() => {
    if (
      loggedIn &&
      (searchParams.get('login') === 'success' ||
        searchParams.get('registration') === 'success' ||
        searchParams.get('oauth') === 'success')
    )
      router.replace('/');
  }, [loggedIn, router, searchParams]);

  const startTimer = useCallback((duration) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(duration);
    setTimerState('inProcess');

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimerState('completed');
          return 0;
        }
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseLeave = () => {
      if (timerState === 'inProcess') {
        stopTimer();
        setColor('#1a1a1a');
      }
    };

    const handleMouseMove = () => {
      if (timerState === 'inProcess') {
        startTimer(currentTimer);
        setColor('#1a1a1a');
        const timeoutId = setTimeout(() => {
          setColor('whitesmoke');
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    };

    const el = document.querySelector('main');
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);
    window.addEventListener('keydown', handleMouseMove);
    window.addEventListener('wheel', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('visibilitychange', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseMove);
      window.removeEventListener('keydown', handleMouseMove);
      window.removeEventListener('wheel', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('visibilitychange', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('blur', handleMouseLeave);
    };
  }, [timerState, currentTimer, startTimer, stopTimer]);

  const inputHandle = (e) => {
    e.preventDefault();
    if (manualTime > 0) {
      setCurrentTimer(manualTime * 60);
      startTimer(manualTime * 60);
    }
  };

  const handleSaveCounter = async () => {
    let singulars;
    let totals;
    let streak;
    let activity;

    const mins = currentTimer / 60;
    const newCounter = {
      countToday: +counter.countToday + 1,
      countWeek: +counter.countWeek + 1,
      countAll: +counter.countAll + 1,
      minutesToday: +counter.minutesToday + mins,
      minutesWeek: +counter.minutesWeek + mins,
      minutesAll: +counter.minutesAll + mins,
    };
    if (!user_id) {
      saveCookies(newCounter, mins);
      setCounter(newCounter);
    } else {
      console.log(user_id);
      ({ singulars, totals, streak, activity } = await updateData(
        mins,
        user_id
      ));
      setCounter(
        getDataNumbers(
          singulars,
          totals.total_mins,
          totals.total_count,
          streak,
          activity
        )
      );
    }
    setTimerState('saved');
  };

  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 5000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
      <main className={`grid h-full relative`}>
        {timerState !== 'inProcess' && (
          <>
            {children}
            <StatsSection timerState={timerState} user_id={user_id} />
          </>
        )}
        {/* {(timerState === 'completed' || timerState === 'saved') && (
          <ModeButtons setMode={setMode} />
        )} */}

        <TimerSection
          color={color}
          timerState={timerState}
          setTimerState={setTimerState}
          time={time}
          currentTimer={currentTimer}
          user_id={user_id}
          handleSaveCounter={handleSaveCounter}
        />

        {timerState !== 'inProcess' && (
          <TimeButtons
            manualTime={manualTime}
            setManualTime={setManualTime}
            setIsFocused={setIsFocused}
            inputHandle={inputHandle}
            setCurrentTimer={setCurrentTimer}
            startTimer={startTimer}
            isFocused={isFocused}
          />
        )}
      </main>
    </>
  );
}

export default Home;
