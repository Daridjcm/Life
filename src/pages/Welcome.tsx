import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import CreateUser from './CreateUser';

export const Welcome = () => {
  const context = useContext(UserContext);

  if (!context) {
    
  if (!context) {
    return console.log('WelcomePage: context is undefined. This should never happen. Please report this bug to the developer.');
    }
  }

  const { user, isUserSet } = context;

  return (
    <div>
      {isUserSet ? (
        <>
          <h1>Welcome {user.name}</h1>
          <p>Your data:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      ) : (
        <CreateUser  />
      )}
    </div>
  );
};