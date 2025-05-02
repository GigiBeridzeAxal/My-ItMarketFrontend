import { ArrowLeft, BotOff, HeartCrack } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ProjectNotfound() {
  return (
    <div className="projectnotfound flex items-center justify-center gap-[50px] mt-[50px] flex-col">

        <BotOff className='size-[250px]'></BotOff>

        <h1 className='text-gray-700 font-[700] text-[24px]'>Sorry This Project Didn't Exist</h1>
        <Link href={'/'} className='p-[10px] bg-gray-500 text-white rounded-[5px] w-[150px] flex items-center justify-center'>Return</Link>
    </div>
  )
}
