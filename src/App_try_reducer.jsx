import { useState, useEffect, useCallback, useRef, useReducer } from 'react';
import './App.scss';
import Cookies from 'js-cookie';
import Modal from './Modal';
import TriangleMode from './TriangleMode';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { yoga, wellDone, brahmaSatyam, gateParagate } from './Words';

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

// const getMode = () => {
//   Cookies.get('mode')
//todo
//Нужно обрать это из очищения кук! }

const initialState = {
  time: null,
  currentTimer: null,
  timerState: null,
  counter: getCounter,
  modalIsOpen: false,
  intervalRef: null,
  color: 'whitesmoke',
  mode: 'circle', //todo
  manual: 7,
};

function reducer(state, action) {
  switch (action.type) {
    case 'modalIsOpen':
      return {
        ...state,
        modalIsOpen: action.payload,
      };
    case 'setCounter':
      return {
        ...state,
        counter: action.payload,
      };
    case 'setTimerState':
      return {
        ...state,
        timerState: action.payload,
      };
    case 'setColor':
      return {
        ...state,
        color: action.payload,
      };
    case 'getSecondTicker':
      return {
        ...state,
        price2: action.payload.price2,
        newDate2: action.payload.newDate2,
      };
    case 'setPrices':
      return {
        ...state,
        price1: action.payload.price1,
        newDate1: action.payload.newDate1,
        price2: action.payload.price2,
        newDate2: action.payload.newDate2,
        index: action.payload.index,
        status: 'loaded',
      };
    case 'status':
      return {
        ...state,
        status: action.payload,
      };
    case 'error':
      return {
        ...state,
        status: 'loadedWithError',
        message: action.payload,
      };
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [
    {
      time,
      currentTimer,
      timerState,
      counter,
      modalIsOpen,
      intervalRef,
      color,
      mode,
      manual,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const openModal = () => dispatch({ type: 'openModal', payload: true });
  const closeModal = () => dispatch({ type: 'openModal', payload: false });
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
    dispatch({ type: 'setCounter', payload: initialCounter });
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
    dispatch({ type: 'setCounter', payload: newCounter });
    dispatch({ type: 'setTimerState', payload: null });
  };

  const startTimer = useCallback((duration) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(duration);
    dispatch({ type: 'setTimerState', payload: 'inProcess' });

case "timer":
  return {
    ...state,
    secondsRemaining: state.secondsRemaining - 1,
    secondsRemaining: state.secondsRemaining > 0 ? state.secondsRemaining - 1 : 
  }}

  case 'timeOver':
    return {
      ...state,
      
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          dispatch({ type: 'setTimerState', payload: 'completed' });
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
        dispatch({ type: 'setColor', payload: '#1a1a1a' });
      }
    };

    const handleMouseMove = () => {
      if (timerState === 'inProcess') {
        startTimer(currentTimer);
        dispatch({ type: 'setColor', payload: '#1a1a1a' });
        const timeoutId = setTimeout(() => {
          dispatch({ type: 'setColor', payload: 'whitesmoke' });
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
    // window.addEventListener('click', handleMouseMove);
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
      // window.removeEventListener('click', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('blur', handleMouseLeave);
    };
  }, [timerState, currentTimer, startTimer, stopTimer]);

  const finalTime = (time) => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
    if (seconds < 0) return '00:00';
    return `${String(Math.round(minutes)).padStart(2, '0')}:${String(
      Math.round(seconds)
    ).padStart(2, '0')}`;
  };

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
      <Helmet>
        <title>Nivritti</title>
        <meta name="description" content="Simple Do-Nothing App" />
        <meta
          name="keywords"
          content="Meditation, Timer, Do Nothing, Buddhism, Vaisesika, Vaisheshika, Patanjali, Yoga, Advaita Vedanta"
        />
      </Helmet>
      <Modal isOpen={modalIsOpen} onClose={closeModal} onYes={handleYes} />
      <main className={mode}>
        <div className="links">
          <div className="link link__github">
            <a href="https://github.com/siebentod/nivritti">
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
        <ModeButtons />
        <div className="timerSection">
          <div className="timer" style={textStyle}>
            {timerState === 'inProcess' ? (
              <p className="time">{finalTime(time)}</p>
            ) : timerState === 'completed' ? (
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
            <button className="saveResult" onClick={handleSaveCounter}>
              Save in memory
            </button>
          ) : null}
        </div>
        <div className="chooseButtons">
          {mode === 'triangle' ? (
            <TriangleMode
              inputHandle={inputHandle}
              manual={manual}
              setManual={setManual}
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
        <div className="statsSection">
          <div className="stats">
            {timerState === 'completed' ? (
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
              {Math.round(counter.countWeek * 10) / 10 === 1 ? 'time' : 'times'}
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
              {Math.round(counter.countAll * 10) / 10 === 1 ? 'time' : 'times'},{' '}
              <span className="yellow">
                {Math.round(counter.minutesAll * 10) / 10}
              </span>{' '}
              min.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
