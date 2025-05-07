'use client'
import React, { useEffect , useState } from 'react'
import { motion , useMotionValue , useAnimationFrame , animate   } from 'framer-motion'

export default function Loading() {


       

 

  return (

<>
<div className="flex items-center m-[50px] justify-center flex-col gap-[20px]">
<div className="dotlist grid grid-cols-2 gap-4">
  <div className="alldot bg-slate-500"></div>
  <div className="alldot bg-gray-800"></div>
  <div className="alldot bg-gray-900"></div>
  <div className="alldot bg-slate-700"></div>
</div>
<h1 className='text-slate-500 font-[900]'>LOADING...</h1>
</div>

  
</>

    

  )
}
