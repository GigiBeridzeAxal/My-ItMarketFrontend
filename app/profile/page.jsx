'use client'
import React, { Suspense, useEffect, useState } from 'react'
import useAuth from '../store/useAuth'
import Header from '../components/Header'
import { useSearchParams } from 'next/navigation'
import { Edit, LoaderCircle, Star } from 'lucide-react'

const PageContent = () => {

    const {editprofile ,  userdata, profileinfo , profileview , checkeditableprofile , edituser , changeprofileiamge} = useAuth()

    const profileid = useSearchParams().get("profileid")

    const [headlinevalue , setheadlinevalue] = useState(profileview?.headline)

    
    const [descriptionvalue , setdescriptionvalue] = useState(profileview?.description)

    const [profileeditor , setprofileeditor] = useState(false)

    const [headlineeditor , setheadlineeditor] = useState(false)

    const [descriptioneditor , setdescriptioneditor] = useState(false)

    useEffect(() => {

      

       checkeditableprofile(profileid)

        console.log(profileview)
    },[userdata])

    useEffect(() => {

      console.log(profileview)


     if(profileview){
      setheadlinevalue(profileview.headline)
      setdescriptionvalue(profileview.description)
     }
    },[profileview])



  return (

     <>

     
    
       <div className="main w-[100%] flex justify-center ">
        <div className="mainframe w-[80%]">
             <Header></Header>



             <div className="profile">
        <div className="profileframe flex flex-col items-center">

           <div className="bannerandimage w-[100%] mb-[70px] relative">
            <input onChange={(e) => changeprofileiamge(e.target.files)} id='changeimage' className='hidden' type="file" />
           <img src='/defaultprofilebanner.jpg'  className="banner object-cover rounded-[20px]"></img>
         <label htmlFor="changeimage"> {profileview.profilepic !== 'noprofile' ?  <img className='w-[150px] bottom-[-50px] left-[50px] h-[150px] bg-gray-100  rounded-[5px] border-1 border-gray-300 absolute' src={`https://itmarketbucket.s3.us-east-1.amazonaws.com/${profileview.profilepic}`} alt="" /> :  <img className='w-[150px] bottom-[-50px] left-[50px] h-[150px] bg-gray-100 p-[10px] rounded-[5px] border-1 border-gray-300 absolute' src="noprofile.webp" alt="" />} </label>
           </div>

           <div className="firstline w-[94%] flex flex-col gap-[10px]">
           <h1 className='text-[34px] flex items-center justify-between '>{profileview.username} <span className='gap-[20px] flex items-center'> {editprofile ? <button onClick={() => profileeditor == true ? setprofileeditor(false) :  setprofileeditor(true)} className='text-[20px] p-[10px] bg-gray-200 cursor-pointer'>{profileeditor == true ? "Cancel" : "Edit Profile"}</button> : null} <button className="message text-[20px] p-[10px] bg-blue-500 text-white rounded-[3px] cursor-pointer">Message</button></span></h1>
           <div className="stars flex items-center gap-[15px]"> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <span  className='text-[24px] font-[500]'>0.0</span> | <span className='text-[24px]'>Reviews: 0</span></div>
           {headlineeditor && profileeditor ?
           

          <div className=' flex items-center gap-[10px] '><input className='w-[350px] border-gray-300 border-1 p-[10px] ' value={headlinevalue} onChange={(e) => setheadlinevalue(e.target.value) }  type="text" /> <button  onClick={() => edituser({headline:headlinevalue}) | setheadlineeditor(false)} className='p-[10px] bg-blue-500 text-white'>Save</button> <button onClick={() => setheadlineeditor(false)} className='p-[10px] bg-gray-500 text-white'>Cancel</button></div>
           

           : <div className="headline w-[100%] text-[36px] font-[600] flex items-center gap-[15px] ">{profileview.headline ? profileview.headline : "No Headline" } {profileeditor ? <Edit onClick={() => setheadlineeditor(true)} className='cursor-pointer'></Edit> : null}</div>}
           
           <h1 className='text-[24px] flex items-center gap-[15px]'>Description  {profileeditor ? <Edit onClick={() => descriptioneditor == true ? setdescriptioneditor(false) : setdescriptioneditor(true)} className='cursor-pointer'></Edit> : null}</h1>

           {descriptioneditor && profileeditor ?

            <div className=' flex items-center gap-[10px] '><textarea className='w-[100%] h-[300px] border-gray-300 border-1 p-[10px] ' value={descriptionvalue} onChange={(e) => setdescriptionvalue(e.target.value) }  type="text" /> 
            <button  onClick={() => edituser({description:descriptionvalue}) | setdescriptioneditor(false)} className='p-[10px] bg-blue-500 text-white'>Save</button> <button onClick={() => setdescriptioneditor(false)} className='p-[10px] bg-gray-500 text-white'>Cancel</button>
            </div>
           
           : <div className="description whitespace-pre-line w-[100%] text-[20px] font-[400]">{profileview.description ? profileview.description : "No Description" } </div>}
            
           
        
            
           </div>
   

        </div>
    </div>
             
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
        <PageContent />

        </Suspense>
  )

}
