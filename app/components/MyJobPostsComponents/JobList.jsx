'use client'
import React, { useEffect, useState } from 'react'
import useMyJobPosts from '../../store/useMyJobPosts'
import { Star, Ticket, Timer } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function JobList() {

    
        const {myjobpostsdata , myjobpostsloaded , getjobpostsdata , getjobinfo , projectisready , jobinfo , lastprojectid} = useMyJobPosts()

        const searchparams = useSearchParams()

        const [openeddescription , setopeneddescription] = useState([])

        const projectid = searchparams.get('projectid')

        useEffect(() => {
          console.log("Hello32")
          if(lastprojectid !== projectid){
            console.log("Hello2")
            if(projectid){
              getjobinfo(projectid)
            }
          }

        },[projectid])



        useEffect(() => {
            
            getjobpostsdata()

            console.log(jobinfo)
         


        },[])


        
        if(projectid){



          return(

            <div className="jobproposals mt-[30px] p-[20px]">

              <span className=''>Total Proposals: {jobinfo?.length}</span>

{jobinfo?.map((data,id) => {

let openeddesc = false


return <div className='flex items-start gap-[15px] mt-[20px] w-[70%]' key={id}>
        <div className="profile">
            {data.profilepic == 'noprofile' ? <img className='w-[150px] h-[150px] p-[10px] border-1 border-gray-100' src='/noprofile.webp' ></img> : null}
        </div>
        <div className="maindetails flex flex-col gap-[10px] w-[90%]">
            
        <div  className="firstline  text-[24px]">

        <div className='flex  items-center justify-between'><div className='' >{data.username} | <Link href={`/profile?profileid=${data.id}`} className='font-[400] text-[20px]'>@{data.email.split('@')[0]} </Link> </div> <div className='flex items-center gap-[10px]'> <button className='p-[10px]  cursor-pointer bg-blue-500 text-white text-[16px] rounded-[3px]'>Hire</button> <button className='p-[10px] cursor-pointer bg-blue-500 text-white text-[16px] rounded-[3px]'>Contact</button></div></div>

        <div className="secondline flex items-center gap-[10px] w-[100%] flex justify-between">

             <div className="stars flex items-center gap-[15px]"> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <span  className='text-[24px] font-[500]'>0.0</span> | <span className='text-[20px]'>Reviews: 0</span> 
          
             </div>

             <div className="projectprice text-[16px]">$ {data.bidprice.toFixed(2)} USD </div>


        </div>

        <div className="thirdline flex w-[100%] items-center justify-between text-[16px] font-[700]">
        {!data.headline ? "No Headline" : data.headline}
        <div className="projectprice text-[16px] font-[500] flex items-center gap-[5px]"> {data.bidtime} Days </div>
        </div>

        <button  onClick={() => setopeneddescription([...openeddescription , data.id])} className={`fourline ${openeddescription.includes(data.id) ? 'whitespace-pre-line' : ''}  cursor-pointer text-start text-[16px] w-[650px]`}> { !data.description  ? "No Description" : data.description?.length > 80 && !openeddescription.includes(data.id) ? data.description.slice(0,80) + ' ... More' : data.description}</button>
        
  
        </div>

        </div>
</div>

}  )}

            </div>

          )

        }else{
          return (
            <div className="joblist p-[20px] ">
             <div className="joblistframe">
         
            <div className="joblistinfo p-[10px] flex items-center justify-between">
            <div className="jobname flex justify-start w-[33%]">Project Name</div>
                     <div className="jobname flex justify-center w-[33%]">Project Price</div>
                     <div className="jobname flex justify-end  w-[33%]">Hired</div>
         
            </div>
            {myjobpostsloaded ?    myjobpostsdata.map((data,id) => (
                 <Link href={`/MyJobPosts?projectid=${data.id}`} className='p-[15px] mt-[10px] cursor-pointer bg-gray-100 flex items-center justify-between w-[100%]' key={id} >
                     <div className="jobname flex justify-start w-[33%]">{data.projectittle.slice(0.40)}</div>
                     <div className="jobname flex justify-center w-[33%]">{data.projectprice} $</div>
                     <div className="jobname flex justify-end  w-[33%]">{data.hired == null ? 0 : data.hired.length}</div>
                 </Link>
               )) : null}
         
                 
         
             </div>
            </div>
           )
        }

 
}
