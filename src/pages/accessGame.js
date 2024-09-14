import React, { useEffect, useState } from 'react';

export default function AccessGame() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [user] = useState(() => {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRedirecting(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isRedirecting) {
      window.location.href = '/game';
    }
  }, [isRedirecting]);

  return (
    <div className='flex items-center justify-center h-screen text-center'>
      <h1 className='text-5xl text-blue-500 '>
        {isRedirecting ? 'Redireccionando al juego...' : `Has regresado, ${user.name || 'Guest'}`}
      </h1>
    </div>
  );
}
