import React from 'react'

function Start() {
  return (
    <div className = 'h-[50rem] w-[30rem] bg-center bg-cover flex justify-center items-center rounded-xl' style={{ backgroundImage: "url('src/assets/10.png')" }}>
        <div className = 'h-[50rem] w-[30rem] bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url('src/assets/10.png')" }}>
        <div className = 'p-16 flex flex-col justify-center space-y-10 items-align h-[30rem] w-[25rem] bg-cover bg-center rounded-xl' style={{ backgroundImage: "url('src/assets/20.png')" }}>
            <div className = 'font-oswald text-3xl'>
                Start a Challenge
            </div>

            <a href = 'http://localhost:5173/challenge' className = 'text-gray-700 hover:text-white font-oswald text-2xl'>
                SOLO
            </a>
            <a href = '#' className = 'text-gray-700 hover:text-white font-oswald text-2xl'>
                MULTI
            </a>
        </div>
    </div>
    </div>
  )
}

export default Start
