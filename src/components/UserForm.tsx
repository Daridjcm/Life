import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Importa useRouter desde next/router

interface UserFormProps {
  gender: string;
}

const UserForm: React.FC<UserFormProps> = ({ gender }) => {
  const [name, SetName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [married, setMarried] = useState<string>('');
  const router = useRouter();  // Inicializa useRouter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name,
      userName,
      age,
      gender,
      money: 0,
      workExp: 0,
      health: 100,
      married,
    };
    localStorage.setItem('User', JSON.stringify(userData));
    router.push('/game');  // Redirige a la ruta /game
  };

  return (
    <div className="bg-slate-100 p-5 shadow-lg rounded-lg">
      <h1 className="text-center text-neutral-800 font-bold">Welcome to
        <span className="font-bold text-yellow-300 hover:text-yellow-400 transition-all cursor-pointer">myLife</span>
      , please fill the form.
      </h1>
      <form className="flex flex-col gap-5 pt-5" onSubmit={handleSubmit}>
        <label>
          Name: 
          <input type="text" value={name} onChange={(e) => SetName(e.target.value)} required />
        </label>
        <label>
          Username: 
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </label>
        <label>
          Age: 
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min="1" max="100" required />
        </label>
        <label>
          Gender selected: 
          <input type="text" value={gender} readOnly />
        </label>
        <label>
          Married:
          <div className="pr-2">
            <input type="radio" checked={married === 'Yes'} value="Yes" onChange={() => setMarried('Yes')} />Yes
          </div>
          <div className="pr-2">
            <input type="radio" value="No" checked={married === 'No'} onChange={() => setMarried('No')} />No
          </div>
        </label>
        <button
          className="bg-green-500 text-white px-5 py-1 shadow-md rounded-lg hover:bg-green-600 transition-all"
          type="submit"
          title="Submit data"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
