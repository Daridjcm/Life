import React, { useState, useEffect } from 'react';
import BankModal from '../methods/Bank/BankModal';
import MyBtnWork  from '../methods/Work/BtnWork';

export default function Game() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
    return { money: 0, health: 100, userName: 'N/A', name: 'N/A', age: 'N/A', workExp: 'N/A', gender: 'N/A', maritalStatus: 'N/A' };
  });
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('userProfile');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error('Error parsing user data from localStorage:', e);
        }
      } else {
        setUser({ money: 0, health: 100, userName: 'N/A', name: 'N/A', age: 'N/A', workExp: 'N/A', gender: 'N/A', maritalStatus: 'N/A' });
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleGoToBank = () => {
    setIsBankModalOpen(true);
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('User');
    setUser({ money: 0, health: 0, userName: 'N/A', name: 'N/A', age: 'N/A', workExp: 'N/A', gender: 'N/A', maritalStatus: 'N/A' });
    setTimeout(() => {
      window.location.href = './UserForm.js'
    }, 2000)
  };

  return (
    <div className="bg-slate-50">
      <aside>
        <div className="flex flex-row bg-slate-200 w-full shadow-sm justify-end items-center gap-20 p-3">
          <div className="flex flex-col">
            <ul className="flex flex-row gap-10 text-xl">
              <li>
                <span className="icon-[hugeicons--health] text-red-700" /> Salud: <p className='text-red-700'>{user.health ?? 'N/A'}</p>
              </li>
              <li>
                <span className="icon-[hugeicons--money-add-02] text-green-700"/> Dinero: <p className='text-green-700'>${user.money ?? 'N/A'}</p>
              </li>
            </ul>
          </div>
          <div className="flex flex-row gap-1.5 items-center">
            <div className="flex flex-col">
              <img
                className="rounded-full w-9"
                src="https://i.pinimg.com/564x/6a/ed/90/6aed90bd19661b5d17fdeafa201cac5f.jpg"
                alt="Profile"
              />
            </div>
            <div className="flex flex-col pr-5">
              <h2 className="text-2xl">{user.userName}</h2>
            </div>
          </div>
        </div>
        <aside className="bg-slate-100 text-center p-5 lg:w-1/5 md:w-1/3 sm:w-full h-fit rounded-sm">
          <img
            className="m-auto rounded-full w-2/3"
            src="https://i.pinimg.com/564x/6a/ed/90/6aed90bd19661b5d17fdeafa201cac5f.jpg"
            alt="Icon Profile"
          />
          <h1 className="text-3xl p-auto">Perfil</h1>
          <div
            className="flex flex-col justify-center bg-slate-200 m-auto w-3/4 h-1/4 p-2 rounded-md shadow-md"
            id="infoUser"
          >
            <ul>
              <li className="pb-3">Nombre: {user.name}</li>
              <li className="pb-3">Edad: {user.age}</li>
              <li className="pb-3">Experiencia laboral: {user.workExp}</li>
              <li className="pb-3">
                Género:
                <span className={`${user.gender === 'Femenina' ? 'text-pink-700 pl-1' : user.gender === 'Masculino' ? 'text-blue-700 pl-1' : 'text-cyan-700'}`}>
                  <span className={`${user.gender === 'Femenina' ? 'icon-[ph--gender-female-bold]' : user.gender === 'Masculino' ? 'icon-[ph--gender-male-bold]' : user.gender === 'Otro' ? 'icon-[ph--gender-intersex]' : '' }`}/> {user.gender}
                </span>
              </li>
              <li className="pb-3">
              Estado Civil: 
              <span className={`${user.maritalStatus === 'Casado/a' ? 'text-[#e11d48] pl-1' : ''} ${user.maritalStatus === 'Soltero/a' ? 'text-[#e11d48] pl-1' : ''} ${user.maritalStatus === 'Divorciado/a' ? 'text-[#e11d48] pl-1' : ''}${user.maritalStatus === 'Viudo/a' ? 'text-gray-700 pl-1' : 'pl-1'}`}>
                <span 
                  className={`iconGender ${user.maritalStatus === 'Casado/a' ? 'icon-[emojione-monotone--wedding]' 
                  : user.maritalStatus === 'Soltero/a' ? 'icon-[emojione-monotone--kiss-mark]' 
                  : user.maritalStatus === 'Divorciado/a' ? 'icon-[emojione-monotone--broken-heart]' 
                  : user.maritalStatus === 'Viudo/a' ? 'icon-[emojione-monotone--funeral-urn]' 
                  : ''}`}/> {user.maritalStatus}
              </span>
            </li>
            </ul>
          </div>
        </aside>
        <div className="flex flex-row p-4 gap-5">
          <div className="bg-slate-200 rounded-lg shadow-md">
            <img src='../assets/images/Work.jpg' alt='Work'/>
            <MyBtnWork />
          </div>
          <div className="bg-slate-200 rounded-lg shadow-md">
            <img src='../assets/images/Bank.jpg' alt='Bank'/>
            <button
              className="bg-slate-100 p-2 rounded-md flex items-center"
              type="button"
              onClick={handleGoToBank}>
              Ir al banco
            </button>
          </div>

          <div className="bg-slate-200 rounded-lg shadow-md">
            <button
              className="bg-red-500 p-2 text-white rounded-md flex items-center"
              type="button"
              onClick={handleClearLocalStorage}>
              Eliminar datos
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
}
