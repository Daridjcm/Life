import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isUserSet: boolean;
  handleGoToWork: () => void;
  handleClearLocalStorage: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isUserSet, setIsUserSet] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsUserSet(true);
      if (parsedUser) {
        router.push('/welcome');
      }
    }
  }, [router]);

  const handleClearLocalStorage = () => {
    localStorage.removeItem('User');
    setUser(null); // Limpia el estado del usuario en el contexto
    setIsUserSet(false);
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
    <UserContext.Provider value={{ user, setUser, isUserSet, handleGoToWork, handleClearLocalStorage }}>
      {children}
    </UserContext.Provider>
  );
};
