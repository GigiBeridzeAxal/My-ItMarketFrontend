'use client'
import React, { useEffect, useState } from 'react'


import useSocket from '../store/useSocket'
import Link from 'next/link'
import useAuth from '../store/useAuth'
import { Bell, CreditCard, Edit, Folder, FolderArchive, FolderCode, IdCard, LogOut, MessageCircle, MessageSquare, MessageSquareCode, MessageSquareDashed, MessageSquareDiff, MessageSquareLock, MessageSquareWarning, MessagesSquare, User, User2, User2Icon, UserCheck, UserCircle, Verified } from 'lucide-react'
import axios from 'axios'
import { usePathname } from 'next/navigation'


export default function Header() {

  const {connecttoserver , logsocketactivity , socket , Newprojects , lastprojectlength , setlastprojectlength} = useSocket()
  const {isUserLogin , checkuserlogin , userdata} = useAuth()
  const [profilemenu , setprofilemenu] = useState(false)
  const [messangernotif , setmessangernotif] = useState(false)
  const [newprojectsnotif  , setnewprojectsnotif] = useState(false)



  const path = usePathname()

  console.log(path)


  

  useEffect(() => {

    if(!socket){
          connecttoserver()
    }


    if(isUserLogin == undefined){

      checkuserlogin()

    }

    
  },[])

  useEffect(() => {



    if(socket !== null){
      logsocketactivity()
    }

  },[socket])

  const logout = async() => {

    const sendlogout = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'user/logout' , {} , {withCredentials:true})

    window.location = '/'

   


    
  }




  return (
   
     
    <div className={`header  p-[10px] w-[100%] ${path == "/Message" ? "bg-gray-100" : ''} `}>

       <div className="headerframe flex items-center justify-between w-[100%]">

        <div className="left">
          <Link href={'/'}><img  src="/itmarknobg.png" width={200} className='rounded-[10%]' alt="" /></Link>
            
        </div>

        <div  className="right flex items-center gap-[30px]">


        {isUserLogin == true ?
        <>
        <button  className="mypostforum cursor-pointer">My Forum Posts</button>
        <Link href={'/MyJobPosts'} className="mypostforum cursor-pointer">My Job Posts</Link>
           <div className="messagebox flex items-center justify-center gap-[20px]">
            
          <Link href={'/Message'}> <MessageSquare   className='size-[30px] '></MessageSquare></Link>

          <div onMouseEnter={() => setnewprojectsnotif(true) | setlastprojectlength(Newprojects?.length) } onMouseLeave={() => setnewprojectsnotif(false)} className='relative'>
           {lastprojectlength - Newprojects?.length !== 0 ? <div className="newprojectamount absolute bg-red-500 rounded-[50%] w-[18px] h-[18px] flex items-center justify-center text-white right-[-5px] bottom-[15px]">{Newprojects?.length - lastprojectlength}</div> : null} 
            <Folder  className='size-[30px]'></Folder>

            {newprojectsnotif ?   <>
                <div className="absolute z-[15] right-[0px] flex p-[10px] flex-col justify-between align-center  w-[350px]  h-[450px]  rounded-[5px]"> </div>

<div className="absolute z-[15] scrollable flex overflow-hidden overflow-y-auto  right-[0px] flex-col  align-center top-[55px] w-[300px] h-[400px] border-1 shadow bg-gray-100 rounded-[5px]">

 <div className="lastmsg flex items-center justify-center p-[10px]"> Project Notifications</div>

 {Newprojects.length > 0 ? Newprojects.slice().reverse().map((project , id) => 
 {return <div key={id} className="projectnotif">

  <Link href={`/projects?projectid=${project.id}`} className="flex items-center justify-start gap-[10px] p-[10px] hover:bg-gray-200 cursor-pointer">
    <FolderCode className="projectimg w-[35px] h-[35px] mr-[20px] text-blue-400 rounded-[5px]"></FolderCode>
    <div className="projectdetails flex flex-col justify-start items-start">
      <h1 className='text-[15px] font-[600]'>{project.projectittle}</h1>
      <p className='max-w-[320px] overflow-hidden h-[24px]'>{project.projecttags?.map((data,id) =>  {
        return <span key={id} className='text-[12px] text-gray-500'>{data} </span>
      })}</p>
      <div className="projectprice text-[14px] ">USD {project.projectprice} <span className=''>$</span> </div>
    </div>
  </Link>

 </div>


 }) : <div className="lastmsg flex items-center justify-center p-[10px]">No New Projects</div>}

  


</div>
        
        </> : null}
          
          </div>
        
       
           <div onMouseEnter={() => setmessangernotif(true)} onMouseLeave={() => setmessangernotif(false)} className="messangerheader relative">
           <Bell className='size-[30px] '></Bell>

           {messangernotif ?
        <>
                <div className="absolute z-[15] right-[0px] flex p-[10px] flex-col justify-between align-center  w-[350px] h-[450px]  rounded-[5px]"> </div>

<div className="absolute z-[15] flex  right-[0px] flex-col justify-between align-center top-[55px] w-[300px] h-[400px] bg-gray-100 rounded-[5px]">

 <div className="lastmsg flex items-center justify-center p-[10px]">Recent Notifications</div>

  


</div>
        
        </>

        
        : null}
           </div>



</div>

         <Link href={'/postproject'} className="postproject p-[10px] bg-indigo-500 text-white rounded-[5px]">Post Project</Link>
        
        </>
    : null}
     
         {isUserLogin == true ? 
         
        <div className="profile flex items-center gap-[10px] justify-center">

  
         <div className='text-end'>
         <div className="username font-[500]">@{userdata.email?.split('@')[0]} </div>
         <div className="funds  text-gray-800 font-[600]">USD {userdata.Funds?.toFixed(2)} <span className='text-teal-600'>$</span> </div>
         </div>
        
        <div onMouseEnter={() => setprofilemenu(true)} onMouseLeave={() => setprofilemenu(false)} className="profile relative  p-[10px] text-center w-[50px] flex items-center justify-center rounded-[50%] h-[50px] bg-gray-200"><User2Icon></User2Icon> 
       
        {profilemenu ?
        <>
                <div className="absolute z-[15] right-[0px] flex p-[10px] flex-col justify-between align-center  w-[350px] h-[450px]  rounded-[5px]"> </div>

<div className="absolute z-[15] flex  right-[0px] flex-col justify-between align-center top-[55px] w-[300px] h-[400px] bg-gray-100 rounded-[5px]">

  <section className='flex flex-col justify-start items-start p-[20px] gap-[10px]'>

    <h1 className='text-[20px] font-[600]'>Account</h1>

    <Link href={`/profile?profileid=${userdata.id}`} className="profile hover:text-blue-500 mt-[20px] cursor-pointer flex items-start justify-center gap-[10px]"><UserCircle></UserCircle>My Profile</Link>
  <div className="profile hover:text-blue-500 mt-[20px] cursor-pointer flex items-start justify-center gap-[10px]"><Edit></Edit> Edit Profile</div>
  <div className="profile mt-[20px] hover:text-blue-500 cursor-pointer flex items-center justify-center gap-[10px]"><User></User>Membership</div>
  <div className="profile mt-[20px] hover:text-blue-500 cursor-pointer flex items-center justify-center gap-[10px]"><IdCard></IdCard>Account Verification</div>

  <div className="profile mt-[20px] hover:text-blue-500 cursor-pointer flex items-center justify-center gap-[10px]"><CreditCard></CreditCard>Withdraw Funds</div>

  </section>


  <button onClick={() => logout()} className="logout cursor-pointer w-[100%] p-[10px] bg-red-100/20 flex text-red-500 font-[600] items-center justify-center gap-[10px]">Logout <LogOut className='text-red-500'></LogOut></button>

  


</div>
        
        </>

        
        : null}
        
        </div>

     

        </div>

         
         : isUserLogin == undefined ? null : <div className="auth flex items-center gap-[15px]">
            <a href='/Signin' className='p-[10px] cursor-pointer'>Sign In</a>
            <a href='/Signup' className='p-[10px] text-center cursor-pointer w-[150px] bg-blue-500 text-white font-[600]'>Sign Up</a>
          </div>}

        </div>


       </div>

    </div>

    
  )
}





