'use client'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useSearchParams } from 'next/navigation'
import ProjectNotfound from '../components/ProjectNotfound'
import WorkByProjectid from '../components/WorkComponents/WorkByProjectid'

export default function page() {


     const params = useSearchParams()


     useEffect(() => {



     console.log(params.get("projectid"))
    


     },[])

    


  return (
     <>
   
      <div className="main w-[100%] flex justify-center ">
       <div className="mainframe w-[80%]">
            <Header></Header>

            {params.get("projectid") ? 
             <WorkByProjectid  ></WorkByProjectid>
             : <ProjectNotfound></ProjectNotfound>}

            
       </div>
   
      </div>
     </>
  )
}
