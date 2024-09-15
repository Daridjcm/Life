// Work.js
import { useState, useEffect } from 'react';

const useWorkHandler = () => {
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (e) {
        console.error('Error parsing userProfile data from localStorage:', e);
      }
    }
    return {
      name: '',
      username: '',
      age: '',
      gender: '',
      maritalStatus: '',
      workExp: 0,
      health: 100,
      money: 0,
      ClickCount: 0,
      LastWorkTime: 0,
      hoursPerDay: 0,
      debtAmount: 0, // Agregar esta propiedad si no está ya en el objeto
    };
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [nextAvailableTime, setNextAvailableTime] = useState(null);

  useEffect(() => {
    const now = new Date().getTime();
    const lastWorkTime = parseInt(userProfile.LastWorkTime || '0', 10);
    const hoursPassed = (now - lastWorkTime) / (1000 * 60 * 60);

    if (userProfile.ClickCount >= 8) {
      if (hoursPassed >= 12) {
        setIsButtonDisabled(false);
        setUserProfile(prev => ({
          ...prev,
          ClickCount: 0,
          LastWorkTime: now.toString(),
        }));
        localStorage.setItem('userProfile', JSON.stringify({
          ...userProfile,
          ClickCount: 0,
          LastWorkTime: now.toString(),
        }));
        setNextAvailableTime(null); // Reset nextAvailableTime
      } else {
        setIsButtonDisabled(true);
        setNextAvailableTime(lastWorkTime + (12 * 60 * 60 * 1000)); // 12 hours in milliseconds
      }
    } else {
      setIsButtonDisabled(false);
      setNextAvailableTime(null); // No need to wait
    }
  }, [userProfile]);

  useEffect(() => {
    if (nextAvailableTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = Math.max(nextAvailableTime - now, 0);
        if (timeLeft <= 0) {
          setIsButtonDisabled(false);
          setNextAvailableTime(null);
          clearInterval(interval);
        } else {
          setNextAvailableTime(nextAvailableTime); // Ensure interval updates correctly
        }
      }, 1000); // Actualiza cada segundo

      return () => clearInterval(interval);
    }
  }, [nextAvailableTime]);

  const handleGoToWork = () => {
    if (userProfile) {
      const now = new Date().getTime();
      const maxHoursPerDay = 8;
      const moneyPerHour = 5;

      if (userProfile.hoursPerDay < maxHoursPerDay && !isButtonDisabled) {
        let newMoney = userProfile.money + moneyPerHour;
        let newDebtAmount = userProfile.debtAmount;

        // Deduce money for debts if any
        if (newDebtAmount > 0) {
          if (newMoney >= newDebtAmount) {
            newMoney -= newDebtAmount; // Pay off debt
            newDebtAmount = 0; // Clear debt
          } else {
            newDebtAmount -= newMoney; // Reduce debt by remaining money
            newMoney = 0; // All money is used to pay debt
          }
        }

        const updatedProfile = {
          ...userProfile,
          money: newMoney,
          debtAmount: newDebtAmount,
          hoursPerDay: userProfile.hoursPerDay + 1,
          ClickCount: (userProfile.ClickCount || 0) + 1,
          LastWorkTime: now.toString(), // Actualizar la hora del último trabajo
        };

        setUserProfile(updatedProfile);
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

        // Si se alcanzaron los 8 clics, bloquear el botón
        if (updatedProfile.ClickCount >= 8) {
          setIsButtonDisabled(true);
          const nextAvailable = now + (12 * 60 * 60 * 1000); // 12 hours in milliseconds
          setNextAvailableTime(nextAvailable);
          localStorage.setItem('userProfile', JSON.stringify({
            ...updatedProfile,
            LastWorkTime: nextAvailable.toString(),
          }));
        }
      }
    }
  };

  return { handleGoToWork, isButtonDisabled, nextAvailableTime, userProfile };
};

export default useWorkHandler;
