import { useState, useEffect, useCallback, useRef } from 'react';
import './App.scss';
import Cookies from 'js-cookie';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
  const [mode, setMode] = useState('circle');
  const [manual, setManual] = useState(7);

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
    console.log(currentTime);
    console.log(currentTimer);
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
    setTimerState(null);
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
    // window.addEventListener('click', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // window.removeEventListener('click', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('blur', handleMouseLeave);
    };
  }, [timerState, currentTimer, startTimer, stopTimer]);

  const finalTime = (time) => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  const brahmaSatyam = (
    <p style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Brahma-Satyam Jagan-Mithyā
      <br />
      Jivo Brahmaiva Nāparaḥ
    </p>
  );
  const gateParagate = [
    <p key={0} style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Ruupam shuunyataa shuunyataiva ruupam
    </p>,
    <p key={1} style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Sarva-dharmaah shuunyataa-lakshanaa
    </p>,
    <p key={2} style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Shuunyaayaam na ruupam na vedanaa
      <br />
      Na samjnaa na samskaaraa na vijnaanaani
    </p>,
    <p key={3} style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Na duhkha-samudaya-nirodha-maargaa
    </p>,
    <p key={4} style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Na vidyaa, naavidyaa
    </p>,
    <p key={5} style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Na jnaanam, na praaptir apraaptitvena
    </p>,
    <p key={6} style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Gate Gate Pāragate
      <br />
      Pārasamgate Bodhi Svāhā
    </p>,
  ];
  const wellDone = (
    <p style={{ fontSize: '62px', lineHeight: '1.1' }}>Well Done!</p>
  );
  const yoga = (
    <p style={{ fontSize: '48px', lineHeight: '1.1' }}>
      Yogaś-citta-vṛtti-nirodhaḥ
    </p>
  );

  const textStyle = {
    color: color,
    transition: color === '#1a1a1a' ? 'none' : 'color 1s ease-in',
  };

  function ModeButtons() {
    return (
      <div className="modeButtons">
        <button onClick={() => setMode('square')}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></rect>{' '}
            </g>
          </svg>
        </button>
        <button onClick={() => setMode('triangle')}>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                stroke="#000000"
                strokeWidth="2"
                d="M11.125 2.584a1 1 0 011.75 0l8.805 15.932A1 1 0 0120.805 20H3.195a1 1 0 01-.875-1.484l8.805-15.932z"
              ></path>{' '}
            </g>
          </svg>
        </button>
        <button onClick={() => setMode('circle')}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{' '}
            </g>
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
            <form onSubmit={inputHandle}>
              <button className="chooseTime">{manual} min</button>
              <div className="inputContainer">
                <input
                  style={{
                    ...(manual <= 0 && {
                      backgroundColor: '#4b2727',
                    }),
                  }}
                  value={manual.toString()}
                  type="number"
                  onChange={(e) => setManual(+e.target.value)}
                />
              </div>
              {/* <input
                type="range"
                min="0"
                max="600"
                value={manual}
                onChange={(e) => setManual(e.target.value)}
              /> */}
            </form>
          ) : (
            <>
              <button
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
              Today <span className="yellow">{counter.countToday}</span>{' '}
              {counter.countToday === 1 ? 'time' : 'times'},{' '}
              <span className="yellow">{counter.minutesToday}</span> min.
            </p>
            <p>
              Last seven days{' '}
              <span className="yellow">{counter.countWeek}</span>{' '}
              {counter.countWeek === 1 ? 'time' : 'times'},{' '}
              <span className="yellow">{counter.minutesWeek}</span> min.
            </p>
            <p>
              Total <span className="yellow">{counter.countAll}</span>{' '}
              {counter.countAll === 1 ? 'time' : 'times'},{' '}
              <span className="yellow">{counter.minutesAll}</span> min.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
