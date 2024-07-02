import React, { useState } from 'react'
import { IoEye, IoEyeOff, IoPerson } from 'react-icons/io5'

const LogIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        setPassword('')
        setUsername('')
    }

    return (
        <div className='flex items-center justify-center h-screen w-full  ' style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2023/12/01/06/16/e-commerce-8422939_1280.jpg" )`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
            
        }} > 
            <form action="" className='  flex flex-col gap-2 w-80 h-96 items-center justify-center   bg-transparent border-[2px] border-[rgba(255,255,255,.5) ] rounded-lg backdrop-blur-[5px] shadow-[0_0_100px_rgba(255,255,255,.52)] ' onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold mb-5 flex items-center text-white gap-2 justify-center'> <IoPerson />  Login </h1>
                <input className='outline-none w-[80%] px-2 py-1 text-sm bg-white rounded-lg font-normal   ' name='username' placeholder='Username/Contact ' value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                
                <div className='w-full flex relative items-center justify-center'>
                    <input className='outline-none w-[80%]  px-2 py-1 text-sm bg-white rounded-lg font-normal   ' name="password" placeholder='Enter a Password ' value={password} onChange={(e) => setPassword(e.target.value)} type={`${showPassword ? "text" : "password"}`} />
                    <button className='cursor-pointer absolute right-10' type='button' onClick={() => setShowPassword(!showPassword)} >
                        { !showPassword ? <IoEyeOff /> : <IoEye />} 
                    </button>
                </div>
                <button className=' font-bold w-[80%] mt-2 cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                '>Submit</button>
            </form>

        </div>
    )
}

export default LogIn