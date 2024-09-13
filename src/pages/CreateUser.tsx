import React, { useState } from 'react';
import GenderSelection from '../components/GenderSelection';
import UserForm from '../components/UserForm';

const CreateUser: React.FC = () => {
  const [gender, setGender] = useState<string>('');

  return (
    <div>
      {!gender ? (
        <GenderSelection onGenderSelect={setGender} />
      ) : (
        <UserForm gender={gender} />
      )}
    </div>
  );
};

export default CreateUser;
