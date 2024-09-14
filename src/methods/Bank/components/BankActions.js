import React, { useState, useEffect } from 'react';

export const BankActions = ({ user, setUser, amount, setResponseMessage, setIsResponseModalOpen }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
  }, []);

  const updateSessionStorage = (updatedUser, newTransaction) => {
    setUser(updatedUser);
    sessionStorage.setItem('User', JSON.stringify(updatedUser));

    // Evita duplicar las transacciones
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    sessionStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handleWithdraw = () => {
    if (user.money >= amount) {
      const updatedUser = {
        ...user,
        money: user.money - amount,
      };
      updateSessionStorage(updatedUser, `Retirado: $${amount}`);
    } else {
      setResponseMessage('No tienes suficiente dinero para retirar.');
      setIsResponseModalOpen(true);
    }
  };

  const handleBorrow = () => {
    const updatedUser = {
      ...user,
      money: user.money + amount,
      debtAmount: (user.debtAmount || 0) + amount,
    };
    updateSessionStorage(updatedUser, `El banco te ha prestado: $${amount}`);
  };

  const handlePayBack = () => {
    const debtAmount = user.debtAmount || 0;

    if (amount <= 0) {
      setResponseMessage('La cantidad debe ser mayor a cero.');
      setIsResponseModalOpen(true);
      return;
    }

    if (amount < debtAmount) {
      const updatedUser = {
        ...user,
        money: Math.max(user.money - 5, 0),
        debtAmount: debtAmount + 5,
      };
      updateSessionStorage(updatedUser, `Monto insuficiente para pagar. Se ha aplicado una multa de 5 dólares.`);
      setResponseMessage('Monto insuficiente para pagar. Se ha aplicado una multa de 5 dólares.');
      setIsResponseModalOpen(true);
      return;
    }

    if (user.money >= amount) {
      const updatedUser = {
        ...user,
        money: user.money - amount,
        debtAmount: 0,
      };
      updateSessionStorage(updatedUser, `Deuda pagada: $${amount}`);
    } else {
      const updatedUser = {
        ...user,
        money: Math.max(user.money - 5, 0),
        debtAmount: debtAmount + 5,
      };
      updateSessionStorage(updatedUser, `No tienes suficiente dinero para pagar. Se ha aplicado una multa de 5 dólares.`);
      setResponseMessage('No tienes suficiente dinero para pagar. Se ha aplicado una multa de 5 dólares.');
      setIsResponseModalOpen(true);
    }
  };

  return (
    <>
      <button className='bg-yellow-500 p-1 mr-2 rounded-md' onClick={handleWithdraw}>Retirar dinero</button>
      <button className='bg-blue-500 p-1 mr-2 rounded-md' onClick={handleBorrow}>Prestar dinero</button>
      <button className='bg-red-500 text-white p-1 mr-2 rounded-md' onClick={handlePayBack}>Pagar deuda</button>
      
    </>
  );
};
