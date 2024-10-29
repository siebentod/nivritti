import { useEffect } from 'react';
import './Modal.scss';

export default function Modal({ modalIsOpen, handleYesModal, closeModal }) {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          closeModal();
        }
      });
    };
  }, []);

  if (!modalIsOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-5"
      onClick={handleOverlayClick}
    >
      <div className="text-white bg-[#242424] p-5 rounded-lg shadow-lg max-w-lg w-full grid justify-center items-center z-10 animate-slide-up">
        <h2 className="text-center">Are you sure?</h2>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            className="py-2 px-6 bg-[#1a1a1a] shadow-md hover:shadow-[0_0_0_1px_#292929]"
            onClick={handleYesModal}
          >
            Yes
          </button>
          <button
            className="py-2 px-6 bg-[#1a1a1a] shadow-md hover:shadow-[0_0_0_1px_#292929]"
            onClick={closeModal}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
