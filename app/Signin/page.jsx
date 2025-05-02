'use client'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import useAuth from '../store/useAuth'

export default function page() {

    const inputref = useRef()

    const {login} = useAuth()

    const handlelogin = async() => {

        if(!inputref.current.children[0].value){
            return toast.error("Email Are Required")
        } else if(!inputref.current.children[0].value.includes("@")){
            return  toast.error("Please Enter Valid Email Address")
        }
 
        if(!inputref.current.children[1].value){
            return toast.error("Password Are Required")
        }

        const params = {
            email:inputref.current.children[0].value,
            password:inputref.current.children[1].value
        }

        login(params)





    }


  return (
    <>


      <div className="login w-[100%] h-[100vh] flex items-center justify-center">
        <div className="loginframe flex-col gap-[25px] bg-gray-100 p-[30px] flex items-center justify-center">

            <div className="itmarketlogo">
                <img src="itmark.png" width={200} alt="" />
            </div>

            <div className="welcomemsg">Welcome Back To Biggest It Market</div>

            <div className="signinwithgoogle cursor-pointer flex items-center justify-center gap-[10px] p-[10px] bg-orange-400 w-[100%] text-white text-center"><img src="google.png" width={30} alt="" /> Countiniue With Google </div>

            <div className="lines flex items-center gap-[5px] w-[100%] justify-center">
                <div className="line1 bg-black h-[1px]  w-[40%]"></div>
                <div className="text">Sign In</div>
                <div className="line2 bg-black h-[1px]  w-[40%]"></div>
            </div>

            <div ref={inputref} className="inputs w-[350px] flex flex-col gap-[25px]">
                <input className='w-[100%] bg-gray-200 p-[10px]' placeholder='Enter Your Email' type="text" />

                <input className='w-[100%] bg-gray-200 p-[10px]' placeholder='Enter Your Password' type="password" />

                <button onClick={() => handlelogin()} className='bg-blue-500 p-[10px] text-white'>Sign In</button>
            </div>

            <div className="forgot">Forgot Password ? <a href="/" className='text-blue-500'>Click Here</a></div>

        </div>
    </div>
    </>
    
    


  )
}
