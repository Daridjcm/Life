import React from 'react';
import Modal from 'react-modal';

export const ResponseModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Response Modal">
      <div className="bg-white lg:w-[500px] sm:w-auto h-auto px-5 py-10 rounded-lg shadow-lg m-auto">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="w-full p-2 border-gray-300 rounded bg-gray-100">{message}</p>
        <div className="flex justify-end items-center">
          <button onClick={onClose} className="px-4 py-2 mt-10 bg-blue-500 text-white rounded hover:bg-blue-600">
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};
