import React from 'react'

function Home() {
  return (
    <>
    <div className = 'rounded-[1rem]  h-[50rem] w-[30rem] bg-center bg-cover' style={{ backgroundImage: "url('src/assets/10.png')" }}>
        <div className = 'p-20 space-y-2'>
            <div className="text-black font-oswald">
                2024 DEC (SAT)
            </div>
            <div className = 'font-oswald text-4xl'>
                8:20 AM
            </div>
            <button onClick={() => window.location.href = 'http://localhost:5173/start'} className="h-[3rem] w-[10rem] font-oswald bg-brown-200 hover:shadow-l hover: bg-center bg-cover" style={{ backgroundImage: "url('src/assets/17.png')" }}>
              
            </button>
        </div>
    </div>
    </>
  )
}

export default Home
