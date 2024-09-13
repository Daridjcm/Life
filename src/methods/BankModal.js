import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Asegúrate de que esto apunta al id del elemento principal de tu aplicación

const BankModal = ({ user, setUser, isOpen, onRequestClose }) => {
  const [amount, setAmount] = useState(0);

  const handleDeposit = () => {
    const updatedUser = {
      ...user,
      money: user.money + amount,
    };
    setUser(updatedUser);
    localStorage.setItem('User', JSON.stringify(updatedUser));
    onRequestClose();
  };

  const handleWithdraw = () => {
    if (user.money >= amount) {
      const updatedUser = {
        ...user,
        money: user.money - amount,
      };
      setUser(updatedUser);
      localStorage.setItem('User', JSON.stringify(updatedUser));
      onRequestClose();
    } else {
      alert('No tienes suficiente dinero para retirar.');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Bank Modal">
      <h2 className='bg-slate-100 text-9xl text-center text-amber-300 shadow-md p-2'>El Banco</h2>
      <div className='pt-8'>
        <label>Cantidad: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <button onClick={handleDeposit}>Depositar</button>
      <button onClick={handleWithdraw}>Retirar</button>
      <button className='bg-red-500 text-white px-2 rounded-md' onClick={onRequestClose}>Cerrar</button>
    </Modal>
  );
};

export default BankModal;
