'use client';

import { useState } from 'react';
import StatsTable from '../_components/StatsTable';
import StatsTableSkeleton from '../_components/StatsTableSkeleton';
import { usePageStore } from '../_lib/store';
import { initialCounter } from '../_utils/initialCounter';
import Modal from '../_components/Modal';
import { clearData } from '../_lib/actions';

function AccountStats(user_id) {
  const counter = usePageStore((state) => state.counter);
  const setCounter = usePageStore((state) => state.setCounter);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const onModalOpen = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleYesModal = async () => {
    console.log('user_id', user_id);
    await clearData(user_id);
    setCounter(initialCounter);
    closeModal();
  };

  return (
    <>
      <Modal
        modalIsOpen={modalIsOpen}
        handleYesModal={handleYesModal}
        closeModal={closeModal}
      />
      <div className="m-auto">
        <div>
          <p>Succesfully done nothing:</p>
          {!isNaN(counter.countToday) ? (
            <StatsTable counter={counter} user_id={user_id} />
          ) : (
            <StatsTableSkeleton />
          )}
        </div>
        <div>
          Current streak:{' '}
          {!isNaN(counter.streak) ? (
            <span className="text-yellow">{counter.streak}</span>
          ) : (
            <div className="skeleton h-3.5 w-3 inline-block bg-zinc-700 rounded-sm align-text-top"></div>
          )}
        </div>
        <button
          onClick={counter !== initialCounter ? onModalOpen : null}
          className="py-2 px-6 bg-[#1a1a1a] shadow-md hover:shadow-[0_0_0_1px_#292929]"
        >
          Reset all stats
        </button>
      </div>
    </>
  );
}

export default AccountStats;
