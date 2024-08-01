import './Modal.scss';

const Modal = ({ isOpen, onClose, onYes }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>Are you sure?</h2>
        <div className="modal__buttons">
          <button onClick={onYes}>Yes</button>
          <button onClick={onClose}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
