import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { BankActions } from './components/BankActions';
import { TransactionHistory } from './components/TransactionHistory';
import { ResponseModal } from './components/RespModal';

Modal.setAppElement('#root');

export const BankModal = ({ user = {}, setUser, isOpen, onRequestClose }) => {
  const [amount, setAmount] = useState(0);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setIsResponseModalOpen(false);

      const today = new Date().toDateString();
      const lastSavedDate = sessionStorage.getItem('lastSavedDate');
      const savedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || [];

      if (lastSavedDate !== today) {
        sessionStorage.removeItem('transactions');
        sessionStorage.setItem('lastSavedDate', today);
        setTransactions([]);
      } else {
        setTransactions(savedTransactions);
      }
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Bank Modal">
        <h2 className='bg-slate-100 text-9xl text-center text-amber-300 shadow-md p-2'>El Banco</h2>
        <div className='pt-8 mb-4'>
          <label>Cantidad: </label>
          <input
            className='bg-slate-200 rounded-md p-1'
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <BankActions 
          user={user} 
          setUser={setUser} 
          amount={amount} 
          setAmount={setAmount} 
          setResponseMessage={setResponseMessage} 
          setIsResponseModalOpen={setIsResponseModalOpen} 
        />
        <button className='bg-zinc-500 text-white p-1 rounded-md' onClick={onRequestClose}>Cerrar</button>
        <TransactionHistory transactions={transactions} user={user} />
      </Modal>

      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        title='¡Hey, has recibido un mensaje del banco!'
        message={responseMessage}
      />
    </>
  );
};

export default BankModal;
