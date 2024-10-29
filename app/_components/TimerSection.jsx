import { useEffect, useRef } from 'react';
import { yoga, wellDone, brahmaSatyam, gateParagate } from './Words';
import { finalTime } from '../_utils/finalTime';
import { usePageStore } from '../_lib/store';
import { saveCookies } from '../_utils/cookies';
import { updateData } from '../_lib/actions';
import { getDataNumbers } from '../_utils/notcookies';
import { Bitter } from 'next/font/google';

const fontText = Bitter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

function TimerSection({
  color,
  timerState,
  setTimerState,
  time,
  currentTimer,
  user_id,
}) {
  const buttonRef = useRef(null);
  const counter = usePageStore((state) => state.counter);
  const setCounter = usePageStore((state) => state.setCounter);

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

      let total_mins;
      let total_count;
      if (totals) {
        total_mins = totals.total_mins;
        total_count = totals.total_count;
      } else {
        total_mins = 0;
        total_count = 0;
      }
      setCounter(
        getDataNumbers(singulars, total_mins, total_count, streak, activity)
      );
    }
    setTimerState('saved');
  };

  const timerColor = {
    color: color,
    // transition: color === '#1a1a1a' ? 'none' : 'color 1s ease-in',
    transition: color === '#1a1a1a' ? 'none' : 'color 0.9s',
  };

  useEffect(() => {
    if (timerState === 'completed') {
      buttonRef.current.focus();
    }
  }, [timerState]);

  return (
    <div className="grid self-end mt-20 text-center timerSection place-content-center">
      <div
        className={`timer text-7xl ${fontText.className}`}
        style={timerColor}
      >
        {timerState === 'inProcess' ? (
          <p className="time text-7xl">{finalTime(time)}</p>
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
          className="saveResult text-sm"
          onClick={handleSaveCounter}
          ref={buttonRef}
        >
          Save in memory
        </button>
      ) : null}
    </div>
  );
}

export default TimerSection;
