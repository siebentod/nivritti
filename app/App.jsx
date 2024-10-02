'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import './App.scss';
import Cookies from 'js-cookie';
import Modal from './Modal';
import TriangleMode from '../src/TriangleMode';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { yoga, wellDone, brahmaSatyam, gateParagate } from '../src/Words';
import { finalTime } from 'finalTime';

//Todo 1: Reducer
//Todo 2: Переместить square в отдельный компонент вместо triangle

const initialCounter = {
  countToday: '0',
  countWeek: '0',
  countAll: '0',
  minutesToday: '0',
  minutesWeek: '0',
  minutesAll: '0',
};

const getNextWeekDate = (date) => {
  const inAWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7
  );
  return new Date(inAWeek.getTime());
  // const timeOffset = inAWeek.getTimezoneOffset() * 60000;
  // return new Date(inAWeek.getTime() - timeOffset);
};

const getNextDayDate = (date) => {
  const inADay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );
  return new Date(inADay.getTime());
  // const timeOffset = inADay.getTimezoneOffset() * 60000;
  // return new Date(inADay.getTime() - timeOffset);
};

function extractDataFromCookieName(cookieName) {
  const match = cookieName.match(/GMT/);
  if (match) {
    return new Date(cookieName);
  }
  return null;
}

function isCookieCreatedToday(cookieDate) {
  const now = new Date();
  return now <= getNextDayDate(cookieDate);
}

function isCookieCreatedThisWeek(cookieDate) {
  const now = new Date();
  return now <= getNextWeekDate(cookieDate);
}

const getCounter = () => {
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

function App() {
  const [time, setTime] = useState(null);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [timerState, setTimerState] = useState(null);
  const [counter, setCounter] = useState(getCounter);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const intervalRef = useRef(null);
  const [color, setColor] = useState('whitesmoke');
  const [mode, setMode] = useState('triangle');
  const [manual, setManual] = useState(2);
  const [isFocused, setIsFocused] = useState(true);
  const buttonRef = useRef(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleYes = () => {
    clearCookies();
    closeModal();
  };

  const saveCookies = (counter) => {
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
    Cookies.set(currentTime, JSON.stringify(currentTimer / 60), {
      expires: getNextWeekDate(currentTime),
      sameSite: 'strict',
      secure: true,
    });
  };

  const clearCookies = () => {
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
      Cookies.remove(cookieName);
    }
    setCounter(initialCounter);
  };

  const handleSaveCounter = () => {
    const newCounter = {
      countToday: +counter.countToday + 1,
      countWeek: +counter.countWeek + 1,
      countAll: +counter.countAll + 1,
      minutesToday: +counter.minutesToday + currentTimer / 60,
      minutesWeek: +counter.minutesWeek + currentTimer / 60,
      minutesAll: +counter.minutesAll + currentTimer / 60,
    };
    saveCookies(newCounter);
    setCounter(newCounter);
    setTimerState('saved');
  };

  const startTimer = useCallback((duration) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(duration);
    setTimerState('inProcess');

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
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

  useEffect(() => {
    if (timerState === 'completed') {
      buttonRef.current.focus();
    }
  }, [timerState]);

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

  const textStyle = {
    color: color,
    transition: color === '#1a1a1a' ? 'none' : 'color 1s ease-in',
  };

  function ModeButtons() {
    return (
      <div className="modeButtons">
        <button onClick={() => setMode('square')}>
          <svg viewBox="0 0 24 24" fill="none">
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
              stroke="#000000"
              strokeWidth="2"
            />
          </svg>
        </button>
        <button onClick={() => setMode('triangle')}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              stroke="#000000"
              strokeWidth="2"
              d="M11.125 2.584a1 1 0 011.75 0l8.805 15.932A1 1 0 0120.805 20H3.195a1 1 0 01-.875-1.484l8.805-15.932z"
            ></path>
          </svg>
        </button>
        <button onClick={() => setMode('circle')}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    );
  }

  const inputHandle = (e) => {
    e.preventDefault();
    if (manual > 0) {
      setCurrentTimer(manual * 60);
      startTimer(manual * 60);
    }
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={closeModal} onYes={handleYes} />
      <main className={mode}>
        {timerState !== 'inProcess' && (
          <div className="links">
            <div className="link link__github">
              <a href="https://github.com/siebentod/">
                Github{' '}
                <i
                  className="fa-solid fa-arrow-up-right-from-square"
                  style={{ fontSize: '9px' }}
                ></i>
              </a>
            </div>
            <div className="link link__about">
              <Link to="/about">About</Link>
            </div>
          </div>
        )}
        {(timerState === 'completed' || timerState === 'saved') && (
          <ModeButtons />
        )}
        <div className="timerSection">
          <div className="timer" style={textStyle}>
            {timerState === 'inProcess' ? (
              <p className="time">{finalTime(time)}</p>
            ) : timerState === 'completed' || timerState === 'saved' ? (
              currentTimer === 300 ? (
                brahmaSatyam
              ) : currentTimer === 180 ? (
                gateParagate[0]
              ) : currentTimer === 240 ? (
                gateParagate[1]
              ) : currentTimer === 360 ? (
                gateParagate[2]
              ) : currentTimer === 420 ? (
                gateParagate[3]
              ) : currentTimer === 480 ? (
                gateParagate[4]
              ) : currentTimer === 540 ? (
                gateParagate[5]
              ) : currentTimer >= 600 ? (
                gateParagate[6]
              ) : currentTimer > 180 ? (
                brahmaSatyam
              ) : (
                wellDone
              )
            ) : (
              yoga
            )}
          </div>
          {timerState === 'completed' ? (
            <button
              className="saveResult"
              onClick={handleSaveCounter}
              ref={buttonRef}
            >
              Save in memory
            </button>
          ) : null}
        </div>

        {timerState !== 'inProcess' && (
          <div className="chooseButtons">
            {mode === 'triangle' ? (
              <TriangleMode
                inputHandle={inputHandle}
                manual={manual}
                setManual={setManual}
                timerState={timerState}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
              />
            ) : (
              <>
                <button
                  autoFocus
                  className="chooseTime"
                  onClick={() => {
                    setCurrentTimer(120);
                    startTimer(120);
                  }}
                >
                  2 min
                </button>
                <button
                  className="chooseTime"
                  onClick={() => {
                    setCurrentTimer(300);
                    startTimer(300);
                  }}
                >
                  5 min
                </button>
                <button
                  className="chooseTime"
                  onClick={() => {
                    setCurrentTimer(600);
                    startTimer(600);
                  }}
                >
                  10 min
                </button>
              </>
            )}
          </div>
        )}

        {/* {(timerState === 'completed' || timerState === 'saved') && ( */}
        {timerState !== 'inProcess' && (
          <div className="statsSection">
            <div className="stats">
              {timerState === 'completed' || timerState === 'saved' ? (
                <button
                  className="statsButton"
                  onClick={counter !== initialCounter ? openModal : null}
                >
                  Clear memory
                </button>
              ) : null}
              {/* <p>You&#39;ve held yourself:</p> You&#39;ve succeded: */}{' '}
              <p>Succesfully done nothing:</p>
              <p>
                Today{' '}
                <span className="yellow">
                  {Math.round(counter.countToday * 10) / 10}
                </span>{' '}
                {Math.round(counter.countToday * 10) / 10 === 1
                  ? 'time'
                  : 'times'}
                ,{' '}
                <span className="yellow">
                  {Math.round(counter.minutesToday * 10) / 10}
                </span>{' '}
                min.
              </p>
              <p>
                Last seven days{' '}
                <span className="yellow">
                  {Math.round(counter.countWeek * 10) / 10}
                </span>{' '}
                {Math.round(counter.countWeek * 10) / 10 === 1
                  ? 'time'
                  : 'times'}
                ,{' '}
                <span className="yellow">
                  {Math.round(counter.minutesWeek * 10) / 10}
                </span>{' '}
                min.
              </p>
              <p>
                Total{' '}
                <span className="yellow">
                  {Math.round(counter.countAll * 10) / 10}
                </span>{' '}
                {Math.round(counter.countAll * 10) / 10 === 1
                  ? 'time'
                  : 'times'}
                ,{' '}
                <span className="yellow">
                  {Math.round(counter.minutesAll * 10) / 10}
                </span>{' '}
                min.
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
