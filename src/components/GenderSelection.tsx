import React, { useState } from 'react';

interface GenderSelectionProps {
  onGenderSelect: (gender: string) => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ onGenderSelect }) => {
  const [gender, setGender] = useState<string>('');

  const handleGenderClick = (selectedGender: string) => {
    setGender(selectedGender);
    onGenderSelect(selectedGender);
  };

  return (
    <div className="bg-slate-100 p-5 shadow-lg rounded-lg">
      <h1 className="text-center text-neutral-800 font-semibold text-5xl pb-4">Start play, choose a gender</h1>
      <div className="flex flex-row gap-5 justify-center pt-3 pb-5 text-4xl">
        <button
          className="bg-blue-300 px-5 py-2 shadow-md rounded-lg hover:bg-blue-500 text-gray-100 transition-all"
          type="button"
          title="Gender: Man"
          onClick={() => handleGenderClick('Man')}
        >
          Man
        </button>
        <button
          className="bg-pink-400 px-3 py-2 shadow-md rounded-lg hover:bg-pink-500 text-gray-100 transition-all"
          type="button"
          title="Gender: Woman"
          onClick={() => handleGenderClick('Woman')}
        >
          Woman
        </button>
      </div>
      <p className="text-center pb-5 text-1xl">{gender && `Congratulations! You have chosen to be a ${gender}.`}</p>
    </div>
  );
};

export default GenderSelection;
