import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Asegúrate de que esto apunta al id del elemento principal de tu aplicación

interface User {
  money: number;
}

interface BankModalProps {
  user: User;
  setUser: (user: User) => void;
  isOpen: boolean;
  onRequestClose: () => void;
}

const BankModal: React.FC<BankModalProps> = ({ user, setUser, isOpen, onRequestClose }) => {
  const [amount, setAmount] = useState<number>(0);

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

const IndexPage: React.FC = () => {
  const [user, setUser] = useState<User>({ money: 100 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoToBank = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Banco</h1>
      <p>Dinero: {user.money}</p>
      <button onClick={handleGoToBank}>Ir al banco</button>
      <BankModal
        user={user}
        setUser={setUser}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};


export default BankModal;
