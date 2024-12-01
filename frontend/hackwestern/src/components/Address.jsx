import React from 'react'

function Address() {
  return (
    <>
    <div className = 'h-[50rem] w-[30rem] bg-center bg-cover flex flex-col justify-center items-center' style={{ backgroundImage: "url('src/assets/18.png')" }}>
        <div className = 'p-16 flex flex-col justify-center items-align h-[30rem] w-[25rem] bg-cover bg-center' style={{ backgroundImage: "url('src/assets/20.png')" }}>
            <form className = 'bg-transparent'>
                <input className = 'text-gray-700 font-oswald outline-none bg-transparent h-[5rem] w-[18rem] bg-cover bg-center' style={{ backgroundImage: "url('src/assets/23.png')" }}>
                </input>
                <input className = 'text-gray-700 font-oswald outline-none bg-transparent h-[5rem] w-[18rem] bg-cover bg-center ' style={{ backgroundImage: "url('src/assets/23.png')" }}>
                </input>  
            </form>
        </div>
        <button className = 'h-[3rem] w-[10rem] bg-cover bg-center' style={{ backgroundImage: "url('src/assets/23.png')" }}>Done</button>
    </div>
    </>
  )
}

export default Address
