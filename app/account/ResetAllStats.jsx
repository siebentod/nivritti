'use client';

import { useState } from 'react';
import { usePageStore } from '../_lib/store';
import { initialCounter } from '../_utils/initialCounter';
import { clearData } from '../_lib/actions';
import Modal from '../_components/Modal';

function ResetAllStats({ user_id }) {
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
      <div className="m-auto mt-2">
        <button
          onClick={counter !== initialCounter ? onModalOpen : null}
          className="py-2 px-6 bg-zinc-800 border border-[#0a0a0a] hover:border-myhover rounded-lg"
        >
          Reset all stats
        </button>
      </div>
    </>
  );
}

export default ResetAllStats;
