import React, { useState } from 'react'

function Registration() {
  // State to handle form values
  const [location, setLocation] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', { location, input2, input3 });
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
              <label htmlFor="location" className="text-white font-oswald">Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='text-gray-700 font-oswald outline-none bg-transparent h-[5rem] w-[18rem] bg-cover bg-center'
                style={{ backgroundImage: "url('src/assets/23.png')" }}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="input2" className="text-white font-oswald">Name</label>
              <input
                id="input2"
                type="text"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className='text-gray-700 font-oswald outline-none bg-transparent h-[5rem] w-[18rem] bg-cover bg-center'
                style={{ backgroundImage: "url('src/assets/23.png')" }}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="input3" className="text-white font-oswald">How do you feel about HackWestern?</label>
              <input
                id="input3"
                type="text"
                value={input3}
                onChange={(e) => setInput3(e.target.value)}
                className='text-gray-700 font-oswald outline-none bg-transparent h-[5rem] w-[18rem] bg-cover bg-center'
                style={{ backgroundImage: "url('src/assets/23.png')" }}
             
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className='font-oswald h-[2rem] w-[8rem] bg-cover bg-center' 
              style={{ backgroundImage: "url('src/assets/23.png')" }}
              onClick={() => window.location.href = 'http://localhost:5173/'}
            >
              NEXT
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;
