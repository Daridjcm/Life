import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useRouter } from 'next/router';
import BankModal from '../components/BankModal';

const GamePage: React.FC = () => {
  const context = useContext(UserContext);
  const router = useRouter();
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  useEffect(() => {
    if (context && context.user === null) {
      router.push('/CreateUser');
    }
  }, [context, router]);

  if (!context) {
    throw new Error('GamePage must be used within a UserProvider');
  }
  
  const { user, handleGoToWork, handleClearLocalStorage, setUser } = context;

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-50">
      <aside>
        <div className="flex flex-row bg-slate-200 w-full shadow-sm justify-end items-center gap-20 p-3">
          <div className="flex flex-col">
            <ul className="flex flex-row gap-10 text-xl">
              <li><span className="icon-[hugeicons--health]" /> Health: <p>{user.health ?? 'N/A'}</p></li>
              <li>Money: <p>{user.money ?? 'N/A'}</p></li>
            </ul>
          </div>
          <div className="flex flex-row gap-1.5 items-center">
            <div className="flex flex-col">
              <img className="rounded-full w-9" src="https://i.pinimg.com/564x/6a/ed/90/6aed90bd19661b5d17fdeafa201cac5f.jpg" alt="Profile photo" />
            </div>
            <div className="flex flex-col pr-5">
              <h2 className="text-2xl">{user.userName}</h2>
            </div>
          </div>
        </div>
        <aside className="bg-slate-100 text-center p-5 lg:w-1/5 md:w-1/3 sm:w-full h-fit rounded-sm">
          <img className="m-auto rounded-full w-2/3" src="https://i.pinimg.com/564x/6a/ed/90/6aed90bd19661b5d17fdeafa201cac5f.jpg" alt="Icon Profile" />
          <h1 className="text-3xl p-auto">Profile</h1>
          <div className="flex flex-col justify-center bg-slate-200 m-auto w-3/4 h-1/4 p-2 rounded-md shadow-md" id="infoUser">
            <ul>
              <li className="pb-3">Name: {user.name}</li>
              <li className="pb-3">Age: {user.age}</li>
              <li className="pb-3">Work Experience: {user.workExp}</li>
              <li className="pb-3">Gender: <span className="iconGender">{user.gender}</span></li>
              <li className="pb-3">Married: {user.married}</li>
            </ul>
          </div>
        </aside>
        <div className="flex flex-row p-4 gap-5">
          <div className="bg-slate-200 rounded-lg shadow-md">
            <button id="btnWork" className="bg-slate-100 p-2 rounded-md" type="button" onClick={handleGoToWork}>
              Go to work
            </button>
          </div>
          <div className="bg-slate-200 rounded-lg shadow-md">
            <button className="bg-slate-100 p-2 rounded-md" type="button" onClick={() => setIsBankModalOpen(true)}>
              Go to bank
            </button>
          </div>
          <div className="bg-slate-200 rounded-lg shadow-md">
            <button className="bg-red-500 p-2 text-white rounded-md" type="button" onClick={handleClearLocalStorage}>
              Delete user
            </button>
          </div>
        </div>
      </aside>
      <BankModal
        user={user}
        setUser={setUser}
        isOpen={isBankModalOpen}
        onRequestClose={() => setIsBankModalOpen(false)}
      />
    </div>
  );
};

export default GamePage;