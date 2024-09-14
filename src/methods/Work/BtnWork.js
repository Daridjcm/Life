import React, { useState, useEffect } from 'react';
import useWorkHandler from './Work';

const MyBtnWork = () => {
  const { handleGoToWork, isButtonDisabled, nextAvailableTime } = useWorkHandler();
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (nextAvailableTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = Math.max(nextAvailableTime - now, 0);
        setRemainingTime(timeLeft);
        if (timeLeft <= 0) {
          setRemainingTime(0);
          clearInterval(interval);
        }
      }, 1000); // Actualiza cada segundo

      return () => clearInterval(interval);
    } else {
      setRemainingTime(0);
    }
  }, [nextAvailableTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
    <button
      onClick={handleGoToWork}
      disabled={isButtonDisabled}
      className={`p-2 rounded text-gray-300 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400'}`}
    >
      Ir a trabajar
    </button>

      {isButtonDisabled && (
        <div className='fixed bottom-0 right-0 m-4 p-4 bg-red-500 text-white rounded shadow-lg opacity-80'>
          <p>Necesitas esperar para volver a trabajar.</p>
          <p>Tiempo de espera: {formatTime(remainingTime)}</p>
        </div>
      )}
    </>
  );
};

export default MyBtnWork;
