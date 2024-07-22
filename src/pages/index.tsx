import CreateUser from "./CreateUser";
import React, { useState } from 'react';
import BankModal from "../components/BankModal";

export function Home() {
  return (
    <>
      <CreateUser />
    </>
  );
}

interface User {
  money: number;
}

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

export default IndexPage;