import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import Game from './Game';

let showGame1;
function Welcome() {
  const isRegistered = localStorage.getItem('userProfile') !== null;
  const [showGame, setShowGame] = useState(false);
  showGame1 = showGame;

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        setShowGame(true);
      }, 3000); // Espera 3 segundos (3000 milisegundos)

      // Limpiar el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [isRegistered]);

}

export const renderContent = () => {
  if (showGame1) {
    return <Game />;
  }
  return <UserForm />;
};
export default Welcome;
