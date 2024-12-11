import { useEffect, useRef } from 'react';
import { yoga, wellDone, brahmaSatyam, gateParagate } from '../Words';
import { finalTime } from '../../_utils/finalTime';
import { Bitter } from 'next/font/google';

const fontText = Bitter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

function TimerSection({
  color,
  timerState,
  time,
  currentTimer,
  handleSaveCounter,
}) {
  const buttonRef = useRef(null);

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
          <p className="time text-7xl select-none">{finalTime(time)}</p>
        ) : timerState === 'completed' ||
          timerState === 'saved' ||
          timerState === 'saving' ? (
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
          disabled={timerState === 'saving'}
        >
          Save in memory
        </button>
      ) : null}
    </div>
  );
}

export default TimerSection;
