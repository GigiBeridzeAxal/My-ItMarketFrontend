'use client'
import { ArrowDownNarrowWide, MoveDown } from 'lucide-react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavHeader() {
  const path = usePathname()

  const splited = path.split('/')

  console.log(splited.length)


  return (
    <div className="navheader  p-[20px] w-[100%] flex">

      <div className="rightnavheader flex items-center gap-[35px]">

        <Link href={'/dashboard'} className={`flex items-center ${splited.length === 2 ?    path.includes('/dashboard') ? 'activatednavsetting' : '' : ''} text-[20px] cursor-pointer gap-[5px]`}>Dashboard</Link>

        
        <Link href={'/dashboard/Work'} className={`flex items-center ${path.includes('Work') ? 'activatednavsetting' : ''} text-[20px] cursor-pointer gap-[5px]`}>Find Work</Link>
        
        <Link href={'/dashboard/Freelancers'} className={`flex items-center ${path.includes('Freelancers') ? 'activatednavsetting' : ''} text-[20px] cursor-pointer gap-[5px]`}>Freelancers</Link>
      
        
      </div>
     
     <div className="leftnavheader">

     </div>

    </div>
  )
}
