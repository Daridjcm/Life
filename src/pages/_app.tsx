import React, { createContext, useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  handleGoToWork: () => void;
  handleClearLocalStorage: () => void;
  isButtonDisabled: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    const lastWorkTime = localStorage.getItem('LastWorkTime');
    const now = new Date().getTime();

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      if (lastWorkTime) {
        const lastWorkTimeMs = parseInt(lastWorkTime, 10);
        const hoursPassed = (now - lastWorkTimeMs) / (1000 * 60 * 60); // Convert milliseconds to hours

        if (hoursPassed >= 12) {
          // Reiniciar horas trabajadas del día
          userData.hoursPerDay = 0;
          localStorage.setItem('User', JSON.stringify(userData));
        }

        setIsButtonDisabled(hoursPassed < 12);
      } else {
        setIsButtonDisabled(false); // Si no hay registro de última hora de trabajo
      }
    } else {
      setIsButtonDisabled(false); // Si no hay usuario almacenado
    }
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('LastWorkTime');
    setUser(null);
    setIsButtonDisabled(false);
    alert('User data has been cleared.');
  };

  const handleGoToWork = () => {
    if (user) {
      const now = new Date().getTime();
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
        localStorage.setItem('LastWorkTime', now.toString()); // Actualizar la hora del último trabajo
      }

      const hoursPassed = (now - parseInt(localStorage.getItem('LastWorkTime') || '0', 10)) / (1000 * 60 * 60);
      setIsButtonDisabled(hoursPassed >= 12);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleGoToWork, handleClearLocalStorage, isButtonDisabled }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
