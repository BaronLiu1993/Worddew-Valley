import React, { useState } from 'react';

function Access() {
  // State to handle form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
      } else {
        setError(data.message || 'Invalid credentials, please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div 
        className='h-[50rem] w-[30rem] bg-center bg-cover flex justify-center items-center' 
        style={{ backgroundImage: "url('src/assets/18.png')" }}
      >
        <div 
          className='p-16 flex flex-col justify-center items-center h-[30rem] w-[25rem] bg-cover bg-center' 
          style={{ backgroundImage: "url('src/assets/20.png')" }}
        >
          <form className='bg-transparent' onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="text-white font-oswald">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='text-gray-700 font-oswald outline-none bg-transparent h-[5rem] w-[18rem] bg-cover bg-center'
                style={{ backgroundImage: "url('src/assets/23.png')" }}
                
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="text-white font-oswald">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='text-gray-700 font-oswald outline-none bg-transparent h-[5rem] w-[18rem] bg-cover bg-center'
                style={{ backgroundImage: "url('src/assets/23.png')" }}
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button 
              type="submit"
              className='h-[4rem] w-[10rem] bg-cover bg-center' 
              style={{ backgroundImage: "url('src/assets/23.png')" }}
              onClick={() => window.location.href = 'http://localhost:5173/'}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Access;

