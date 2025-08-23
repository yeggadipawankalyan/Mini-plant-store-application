import React from 'react';

const Modal = ({ title, onClose, children }) => {
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <header className="modal-header">
              <h2 id="modal-title" className="modal-title h5">{title}</h2>
              <button onClick={onClose} type="button" className="btn-close" aria-label="Close"></button>
            </header>
            <main className="modal-body">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
