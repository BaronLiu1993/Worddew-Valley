import React from 'react'

function Login() {
  return (
    <>
      <div className = 'flex flex-col p-[5rem] space-y-10 items-center rounded-[1rem]  h-[50rem] w-[30rem] bg-center bg-cover' style={{ backgroundImage: "url('src/assets/18.png')" }}>
          <div>
            <div className = 'font-oswald text-6xl text-white'>Workdew</div>
            <div className = 'font-oswald text-6xl text-white'>Valley</div> 
          </div>
          <div className = 'flex flex-col space-y-5'>
            <button className = 'h-[3rem] w-[10rem] bg-cover bg-center font-oswald text-gray-600' style={{ backgroundImage: "url('src/assets/19.png')" }}>Login</button>
            <button className = 'h-[3rem] w-[10rem] bg-cover bg-center font-oswald text-gray-600' style={{ backgroundImage: "url('src/assets/19.png')" }}>Sign Up</button>
          </div>
      </div>
    </>
  )
}

export default Login
