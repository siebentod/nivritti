import { initialCounter } from '../../_utils/initialCounter';
import StatsTable from './StatsTable';
import { usePageStore } from '../../_lib/store';
import StatsTableSkeleton from './StatsTableSkeleton';
import Modal from '../Modal';
import { useState } from 'react';
import { clearCookies } from '../../_utils/cookies';

function StatsSection({ timerState, user_id }) {
  const counter = usePageStore((state) => state.counter);
  const setCounter = usePageStore((state) => state.setCounter);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const onModalOpen = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleYesModal = () => {
    clearCookies(setCounter, initialCounter);
    closeModal();
  };

  return (
    <>
      <Modal
        modalIsOpen={modalIsOpen}
        handleYesModal={handleYesModal}
        closeModal={closeModal}
      />
      {user_id && !isNaN(counter.streak) && (
        <div className="absolute text-sm statsSection left-2 top-2 py-2 px-3 rounded-lg">
          <div>
            Days in a row: <span className="font-bold">{counter.streak}</span>
          </div>
        </div>
      )}
      <div className="absolute text-sm statsSection left-2 bottom-2">
        <div>
          {!user_id &&
          (timerState === 'completed' || timerState === 'saved') ? (
            <button
              className="statsButton"
              onClick={counter !== initialCounter ? onModalOpen : null}
            >
              Clear memory
            </button>
          ) : null}
          {/* <p>You&#39;ve held yourself:</p> You&#39;ve succeded: */}{' '}
          <div className="py-2 px-4  rounded-lg relative">
            {!isNaN(counter.countToday) ? (
              <StatsTable counter={counter} user_id={user_id} />
            ) : (
              <StatsTableSkeleton />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsSection;
