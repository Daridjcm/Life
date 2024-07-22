import React, { createContext, useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  handleGoToWork: () => void;
  handleClearLocalStorage: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.removeItem('User');
    setUser(null);  // Limpia el estado del usuario en el contexto
    alert('User data has been cleared.');
  };

  const handleGoToWork = () => {
    if (user) {
      const hoursPerDay = user.hoursPerDay || 0;
      const maxHoursPerDay = 8;
      const moneyPerHour = 5;

      if (hoursPerDay < maxHoursPerDay) {
        const updatedUser = {
          ...user,
          money: user.money + moneyPerHour,
          hoursPerDay: hoursPerDay + 1, // Incrementar las horas trabajadas
        };
        setUser(updatedUser);
        localStorage.setItem('User', JSON.stringify(updatedUser));
      }
    }
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, handleGoToWork, handleClearLocalStorage }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}


export default MyApp;
