'use client'
import React, { Suspense, useEffect, useState } from 'react'
import {usePathname , useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import NavHeader from '../../components/NavHeader'
import Work from '../../components/WorkComponents/Work'
import Forum from '../../components/ForumComponent/Forum'
import FreelancerMain from '../../components/FreelancersComponent/FreelancerMain'
import { LoaderCircle } from 'lucide-react'



const PageContent = () => {

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



export default function page() {
  return (
<Suspense fallback={
    <div className="loaderframe  h-[200px] flex items-center justify-center "><div className='flex loader items-center h-[60px] justify-center '><LoaderCircle size={60} ></LoaderCircle></div></div>
      }>
        
        <PageContent></PageContent>

</Suspense>


  )
}



