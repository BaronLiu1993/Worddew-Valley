import React from 'react'

const Select = () => {
  return (
    <>
     <div className = 'h-[50rem] w-[30rem] bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url('src/assets/10.png')" }}>
        <div className = 'p-16 flex flex-col justify-center space-y-10 items-align h-[30rem] w-[25rem] bg-cover bg-center rounded-xl' style={{ backgroundImage: "url('src/assets/20.png')" }}>
            <div className = 'font-oswald text-3xl'>
                Select Person
            </div>
            <div className = 'font-oswald flex space-x-6'>
                <div className = 'h-[5rem] w-[5rem] bg-cover bg-center' style={{ backgroundImage: "url('src/assets/25.png')" }}>

                </div>
                <div>
                    <a className = 'text-2xl'>
                        SARAH
                    </a>
                    <div>
                        4:58 PM
                    </div>
                </div>
            </div>
            <div className = 'font-oswald flex space-x-6'>
                <div className = 'h-[5rem] w-[5rem] bg-cover bg-center' style={{ backgroundImage: "url('src/assets/26.png')" }}>

                </div>
                <div>
                <a className = 'text-2xl'>
                        EMMA
                    </a>
                    <div>
                        5:00 PM
                    </div>
                </div>
            </div>
            <div className = 'font-oswald flex space-x-6'>
                <div className = 'h-[5rem] w-[5rem] bg-cover bg-center' style={{ backgroundImage: "url('src/assets/27.png')" }}>

                </div>
                <div>
                    <div className = 'text-2xl'>
                        VINCE
                    </div>
                    <div>
                        4:58
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Select
