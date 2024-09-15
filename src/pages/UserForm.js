import { useState } from 'react';
import accessGame from './accessGame';
import {renderContent} from './Welcome';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    age: '',
    gender: '',
    maritalStatus: '',
    workExp: 0,
    health: 100,
    money: 0,
    hoursPerDay: 0,
    debtAmount: 0,
    ClickCount: 0,
    LastWorkTime: 0,
  });

  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(localStorage.getItem('userProfile') !== null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.age || isNaN(formData.age)) newErrors.age = 'Valid age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setIsRegistered(true);
  };

  return (
    <div className='m-auto lg:w-[700px] sm:w-auto' id="UserForm">
      {isRegistered ? (
        accessGame()
      ) : (
        <>
          <h1 className='text-2xl text-center font-semibold mt-28'>Bienvenido a Mi Vida!</h1>
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Edad</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Género</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Selección</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenina">Femenina</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado Civil</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Selección</option>
                <option value="Soltero/a">Soltero/a</option>
                <option value="Casado/a">Casado/a</option>
                <option value="Divorciado/a">Divorciado/a</option>
                <option value="Viudo/a">Viudo/a</option>
              </select>
              {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              onClick={renderContent}
            >
              Completar registro
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default UserForm;
