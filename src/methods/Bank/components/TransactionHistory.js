import React from 'react';

export const TransactionHistory = ({ transactions, user }) => (
  <div className='mt-5' id='history'>
    <ul className='list-disc ml-8'>
      <li>Deuda: {user.debtAmount || 'No disponible'}</li>
      <li>Saldo actual: {user.money || 'No disponible'}</li>
    </ul>
    <h3 className='text-2xl mt-4'>Historial de Transacciones y Dudas</h3>
    <ul className='list-disc ml-8'>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))
      ) : (
        <li>No hay transacciones.</li>
      )}
    </ul>
  </div>
);
