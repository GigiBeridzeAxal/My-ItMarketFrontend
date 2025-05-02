'use client'
import React, { useEffect, useState } from 'react'
import {usePathname , useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import NavHeader from '../../components/NavHeader'
import Work from '../../components/WorkComponents/Work'
import Forum from '../../components/ForumComponent/Forum'
import FreelancerMain from '../../components/FreelancersComponent/FreelancerMain'



export default function page() {

  const path = usePathname()




    
    
  return (
 <>

   <div className="main w-[100%] flex justify-center ">
    <div className="mainframe w-[80%]">
        <Header></Header>
        <NavHeader></NavHeader>

        {path.includes('Work') ? <Work></Work> : path.includes('/Freelancers') ? <FreelancerMain></FreelancerMain> : <Forum></Forum> }
        
       
    
         
    </div>

   </div>
  </>
  )
}


