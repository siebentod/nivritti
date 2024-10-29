'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Toaster } from 'react-hot-toast';

import './Home.scss';
import ModeButtons from './ModeButtons';
import TimeButtons from './TimeButtons';
import TimerSection from './TimerSection';
import StatsSection from './StatsSection';
// import { getDataNumbers } from '../_utils/notcookies';
// import { usePageStore } from '../_lib/store';

function Home({ children, user_id }) {
  const [time, setTime] = useState(null);
  const intervalRef = useRef(null);
  const [timerState, setTimerState] = useState(null);
  const [color, setColor] = useState('whitesmoke');

  const [currentTimer, setCurrentTimer] = useState(null); // выбранный таймер
  const [manualTime, setManualTime] = useState(2); // время в инпуте

  const [mode, setMode] = useState('triangle');
  const [isFocused, setIsFocused] = useState(true);

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
      <main className={`${mode} grid h-full relative`}>
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
        />

        {timerState !== 'inProcess' && (
          <TimeButtons
            manualTime={manualTime}
            setManualTime={setManualTime}
            setIsFocused={setIsFocused}
            inputHandle={inputHandle}
            setCurrentTimer={setCurrentTimer}
            mode={mode}
            startTimer={startTimer}
            isFocused={isFocused}
          />
        )}
      </main>
    </>
  );
}

export default Home;
