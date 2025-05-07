'use client'
import React, { useEffect, useState } from 'react'
import useAuth from '../../store/useAuth'
import { Dot, DotSquare, Hand, Heart, LineChart, Plane, Settings, Upload, User2Icon } from 'lucide-react'
import useForum from '../../store/useForum'
import { img } from 'framer-motion/client'
import Loading from '../Loading'
import PreLoader from '../MessengerComponents/PreLoader'

export default function Forum() {

    const {checkuserlogin , userdata , isUserLogin} = useAuth()
    const {createforumpost , getforumdata , forumdata , forumloading} = useForum()
    const [projectdesc , setprojectdesc] = useState()
    const [uploadedfiles , setuploadedfiles] = useState([])
    const [selectedimage , setselectedimage] = useState([])
    

    const uploadhandle = (e) => {



        const filereader = new FileReader()


        filereader.readAsDataURL(e.target.files[0])


        filereader.onload = () => {
          setselectedimage([filereader.result])
            setuploadedfiles([e.target.files[0]])
        }

    }

    const createposthandle = () => {
        

        const params = {
            forumfiles:uploadedfiles,
            forumdesc:projectdesc
        }

        createforumpost(params)




    }

    useEffect(() => {

        getforumdata()

        console.log(forumdata)

    },[])


    const handleimagedelete = (id) => {

      setuploadedfiles(perv => perv.filter((data,index) => index !== id))


    }



    useEffect(() => {

        checkuserlogin()

        console.log(userdata)


    },[])


  return (
    <div className="forum p-[20px]">
        <div className="forumframe">

          {isUserLogin ? <div className="forumcreatepostframe p-[20px] bg-gray-100 w-[70%] rounded-[10px]">


<div className="firstline flex items-center gap-[15px]">
<div  className="profile relative  p-[10px] text-center w-[50px] flex items-center justify-center rounded-[50%] h-[50px] bg-gray-200"><User2Icon></User2Icon> 
 </div>
 <div className="username">{userdata?.username}</div>
 
    
</div>


<div className='p-[10px] mt-[10px]'>
<textarea onChange={(e) => setprojectdesc(e.target.value)} className='w-[100%] bg-gray-200 p-[10px]' cols={50} rows={5} name="" placeholder='Write About Day In Your Life' id=""></textarea>
</div>


<div className='p-[10px]'>
    <input id='Attach' onChange={(e) => uploadhandle(e)} className='hidden' type="file" />
 <label className='flex items-center gap-[10px] cursor-pointer ' htmlFor="Attach"><Upload></Upload> Attach Files</label>
 <div className='flex items-center flex-wrap gap-[15px]'>
    {selectedimage.map((data,id) => <img onClick={() => handleimagedelete(id)} className='object-cover p-[10px] bg-gray-200 mt-[10px] w-[420px] h-[320px]' width={300} key={id} src={data} ></img>)}
 </div>
</div>


<div className='p-[10px]'>
<button onClick={() => createposthandle()} className='w-[100%] text-white cursor-pointer flex items-center justify-center gap-[5px] p-[10px] bg-blue-500'>Post <Plane></Plane></button>
</div>





</div>
: null}  

            <div className="forumposts mt-[20px] w-[70%] flex flex-col gap-[20px]">
              {forumloading ? <PreLoader preloaderlocat="Forum" ></PreLoader>  : null}
            {  

forumdata.map((data , id) => {
    const now = new Date();
    const postTime = new Date(data.forumposttime);

    const diffInMs = now - postTime;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    let timeAgo = ""

    if (diffInSeconds < 60) {
        timeAgo = `${diffInSeconds} seconds ago`;
      } else if (diffInMinutes < 60) {
        timeAgo = `${diffInMinutes} minutes ago`;
      } else if (diffInHours < 24) {
        timeAgo = `${diffInHours} hours ago`;
      } else {
        timeAgo = `${diffInDays} days ago`;
      }
    


     return <div key={id} className="foruminformation  bg-gray-100 p-[10px]">


<div className="firstline flex items-center  gap-[10px]"> <div className="profilepic">
          
          {data.forumowner.profilepic == "noprofile" ?    <div  className="profile relative  p-[10px] text-center w-[50px] flex items-center justify-center rounded-[50%] h-[50px] bg-gray-200"><User2Icon></User2Icon> </div> :  <img className='w-[50px] min-w-[50px] h-[50px] rounded-[50%]' src={`https://itmarketbucket.s3.us-east-1.amazonaws.com/${data.forumowner.profilepic}`} alt="" />}

        </div> 
        
        <div className="name w-[100%] flex items-center justify-between ">{data.forumowner.username}  {timeAgo} </div>   <div className="dots flex items-center gap-[1px]"><Settings></Settings></div> </div>
    
        <div className="description whitespace-pre-line p-[10px] ">{data.forumdesc.length <= 0 ? data.forumdesc : null}</div>

        <div className="files flex items-center gap-[10px] flex-wrap">{data?.forumfiles?.length !== 0 ? data.forumfiles?.map((data,id) => (
           <div key={id} className='p-[10px] bg-gray-200/90 '> <img src={`https://itmarketbucket.s3.us-east-1.amazonaws.com/${data}`}  className='max-w-[800px] w-[420px] object-cover max-h-[400px]'></img></div>
        )) : null}</div>

        <div className="actions mt-[30px]">
            <div className="like flex items-center gap-[5px] "><Heart className=''></Heart> 0</div>
        </div>
</div>

      
})}
            </div>

        </div>
    </div>
  )
}
