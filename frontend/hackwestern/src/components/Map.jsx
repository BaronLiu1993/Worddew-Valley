import React from 'react'
import M from './M'

function Map() {

    
  return (
    <>
    <div className = 'h-[50rem] w-[30rem] bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url('src/assets/10.png')" }}>
        <div className = 'p-16 flex flex-col justify-center items-align h-[40rem] w-[30rem] bg-cover bg-center rounded-xl' style={{ backgroundImage: "url('src/assets/20.png')" }}>
            <div className = 'font-oswald'>Map</div>
            <M className = 'h-[10rem]'/>
            <div>
                <button onClick={() => window.location.href = 'http://localhost:5173/start'}></button>
            </div>
        </div>
    </div>
    </>

    
  )
}

export default Map