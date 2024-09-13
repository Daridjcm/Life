import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import Game from './Game';

function Welcome() {
  const isRegistered = localStorage.getItem('userProfile') !== null;
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        setShowGame(true);
      }, 3000); // Espera 3 segundos (3000 milisegundos)

      // Limpiar el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [isRegistered]);

  const renderContent = () => {
    if (showGame) {
      return <Game />;
    }
    return <UserForm />;
  };

  return (
    <div id="Game">
      {renderContent()}
    </div>
  );
}

export default Welcome;
