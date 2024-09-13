import { useState, useEffect } from 'react';

const useWorkHandler = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('User');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
    return null;
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [nextAvailableTime, setNextAvailableTime] = useState(null);

  useEffect(() => {
    const now = new Date().getTime();
    const lastWorkTime = parseInt(localStorage.getItem('LastWorkTime') || '0', 10);
    const hoursPassed = (now - lastWorkTime) / (1000 * 60 * 60);
    setIsButtonDisabled(hoursPassed < 12);

    if (hoursPassed < 12) {
      const nextAvailable = lastWorkTime + (12 * 60 * 60 * 1000); // 12 hours in milliseconds
      setNextAvailableTime(nextAvailable);
    }
  }, [user]);

  useEffect(() => {
    if (nextAvailableTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        if (now >= nextAvailableTime) {
          setIsButtonDisabled(false);
          setNextAvailableTime(null);
          clearInterval(interval);
        }
      }, 1000); // Check every second
      return () => clearInterval(interval);
    }
  }, [nextAvailableTime]);

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

  return { handleGoToWork, isButtonDisabled, nextAvailableTime };
};

export default useWorkHandler;
