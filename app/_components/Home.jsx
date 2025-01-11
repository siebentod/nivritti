'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

import './Home.scss';
import TimeButtons from './timer-section/TimeButtons';
import TimerSection from './timer-section/TimerSection';
import StatsSection from './stats/StatsSection';
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
import { createTotalsAndSingularsFromCookies } from '../_utils/createTotalsAndSingularsFromCookies';
import { isLeapYear } from '../_utils/arrayOfZeros';

const userAudioEnabled = true; //todo

function Home({ children, user_id }) {
  const counter = usePageStore((state) => state.counter);
  const setCounter = usePageStore((state) => state.setCounter);
  const setLoggedIn = usePageStore((state) => state.setLoggedIn);
  // const loggedIn = usePageStore((state) => state.loggedIn);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cookiesHandeled, setCookiesHandeled] = useState(null);
  const [time, setTime] = useState(null);
  const intervalRef = useRef(null);
  const [timerState, setTimerState] = useState(null);

  const timerStateRef = useRef(timerState);
  const timeouts = useRef({ timeoutColor: null, timeoutTime: null });

  const [color, setColor] = useState('whitesmoke');

  const [currentTimer, setCurrentTimer] = useState(null); // выбранный таймер
  const [manualTime, setManualTime] = useState(2); // время в инпуте

  // const [mode, setMode] = useState('triangle');
  const [isFocused, setIsFocused] = useState(true);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    timerStateRef.current = timerState;
  }, [timerState]);

  const fetchAndProcessData = useCallback(
    async function (user_id) {
      const { singulars, totals } = await getData(user_id);
      const { total_mins, total_count, streak, activity, last_timer_used } =
        processFetchedTotals(totals);

      if (last_timer_used) setManualTime(last_timer_used);
      console.log(last_timer_used);
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
      setCookiesHandeled('in-process');
      const { totals, singulars } =
        createTotalsAndSingularsFromCookies(user_id);

      const { cookiesWereTransferred } =
        await moveDataFromCookiesAfterRegistration(totals, singulars, user_id);

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
      setCookiesHandeled('ready');
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
      cookiesHandeled === 'ready' &&
      (searchParams.get('login') === 'success' ||
        searchParams.get('registration') === 'success' ||
        searchParams.get('oauth') === 'success')
    )
      router.replace('/');
  }, [cookiesHandeled, router, searchParams]);

  function startTimer(duration) {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(duration);
    setTimerState('inProcess');

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 0) {
          if (timerStateRef.current !== 'paused') {
            return prevTime - 1;
          } else return prevTime;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimerState('completed');
          audioRef.current.pause();
          return 0;
        }
      });
    }, 1000);
  }

  useEffect(() => {
    // Переменная для отслеживания состояния мыши внутри сайта
    let isMouseInside = false;

    function handleMouseEvent(toPause) {
      if (timerState === 'inProcess' || timerState === 'paused') {
        setColor('#1a1a1a');
        setTimerState('paused');

        clearTimeout(timeouts.current.timeoutColor);
        clearTimeout(timeouts.current.timeoutTime);

        // Таймеры для изменения цвета и состояния
        timeouts.current.timeoutColor = setTimeout(() => {
          if (isMouseInside && document.visibilityState === 'visible') {
            setColor('whitesmoke');
          }
        }, 1000);

        timeouts.current.timeoutTime = setTimeout(() => {
          if (isMouseInside && document.visibilityState === 'visible') {
            setTimerState('inProcess');
          }
        }, 2000);

        if (toPause) {
          clearTimeout(timeouts.current.timeoutColor);
          clearTimeout(timeouts.current.timeoutTime);
        }

        return () => {
          clearTimeout(timeouts.current.timeoutColor);
          clearTimeout(timeouts.current.timeoutTime);
        };
      }
    }

    const handleMouseMove = () => {
      isMouseInside = true;
      handleMouseEvent(false);
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
      handleMouseEvent(true);
    };

    // Проверка видимости вкладки
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleMouseEvent(true); // Пауза при переключении вкладки
      } else if (document.visibilityState === 'visible' && isMouseInside) {
        handleMouseEvent(false); // Возобновление только если мышь внутри
      }
    };

    const el = document.querySelector('main');
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);
    window.addEventListener('keydown', handleMouseMove);
    window.addEventListener('wheel', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('visibilitychange', handleVisibilityChange); // Отслеживание видимости вкладки
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseMove);
      window.removeEventListener('keydown', handleMouseMove);
      window.removeEventListener('wheel', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [timerState]);

  async function inputHandle(e) {
    e.preventDefault();
    if (manualTime > 0) {
      setCurrentTimer(manualTime * 60);
      startTimer(manualTime * 60);
    }
  }

  async function handleSaveCounter() {
    setTimerState('saving');
    let singulars;
    let totals;

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
      ({ singulars, totals } = await updateData(mins, user_id));
      const activity = isLeapYear ? totals.activity_leap : totals.activity;
      setCounter(
        getDataNumbers(
          singulars,
          totals.total_mins,
          totals.total_count,
          totals.streak,
          activity
        )
      );
    }
    setTimerState('saved');
  }

  const submitHandle = function (e) {
    e.preventDefault();
    setIsFocused(false);
    inputHandle(e);
    if (userAudioEnabled) audioRef.current.play();
    setIsPlaying(true);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
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

      {timerState === 'paused' && (
        <button
          onClick={toggleAudio}
          className="absolute top-2 left-2 cursor-pointer z-10"
        >
          {isPlaying ? (
            <SpeakerWaveIcon height={20} />
          ) : (
            <SpeakerXMarkIcon height={20} />
          )}
        </button>
      )}
      {timerState !== 'inProcess' && timerState !== 'paused' && (
        <button
          onClick={toggleAudio}
          className="absolute bottom-2 right-2 cursor-pointer z-10"
        >
          {isPlaying ? (
            <SpeakerWaveIcon height={20} />
          ) : (
            <SpeakerXMarkIcon height={20} />
          )}
        </button>
      )}
      <audio
        ref={audioRef}
        src="/fire free 11.0.mp3"
        loop
        preload="auto"
        className="hidden"
      />

      <main className={`grid h-full relative`}>
        {timerState !== 'inProcess' && timerState !== 'paused' && (
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
          time={time}
          currentTimer={currentTimer}
          user_id={user_id}
          handleSaveCounter={handleSaveCounter}
        />

        {timerState !== 'inProcess' && timerState !== 'paused' && (
          <TimeButtons
            manualTime={manualTime}
            setManualTime={setManualTime}
            setIsFocused={setIsFocused}
            inputHandle={inputHandle}
            setCurrentTimer={setCurrentTimer}
            startTimer={startTimer}
            isFocused={isFocused}
            cookiesHandeled={cookiesHandeled}
            timerState={timerState}
            submitHandle={submitHandle}
          />
        )}
      </main>
      {/* <div className="c1">
        <div className="c2">
          <div className="c3">
            <div className="c4"></div>
          </div>
        </div>
      </div> */}
      {/* <div className="circle" /> */}
    </>
  );
}

export default Home;
