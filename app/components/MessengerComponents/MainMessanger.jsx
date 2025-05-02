'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import Header from '../Header'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import useMessage from '../../store/useMessage'
import useSocket from '../../store/useSocket'
import { Loader, LoaderCircle, Plane, PlaneTakeoff, Search, Send } from 'lucide-react'
import './messenger.css'

const MainMessanger = () =>  {



  const searchparams = useSearchParams()

  const {openedmessage , setopenedmessage , openedmessageloaded , sendmessage , allmessages , setallprofiles , allprofiles , allmessagesloaded} = useMessage()

  const [messageboxvalue , setmessageboxvalue] = useState("")

  const messagelistref = useRef()

  const userid = searchparams.get("userid")

  useEffect(() => {
    if (messagelistref.current) {
      messagelistref.current.scrollTop = messagelistref.current.scrollHeight;
    }
  }, [allmessages])

  const {connecttoserver , onlineusers} = useSocket()

  useEffect(() => {
    if(userid && allmessagesloaded){
      setopenedmessage(userid)

  }

  },[userid , allmessagesloaded])


  useEffect(() => {

    if(userid){
        setopenedmessage(userid)

    }
    setallprofiles()

    
    connecttoserver()



  },[])

  useEffect(() => {
    console.log(onlineusers)
  },[onlineusers])




  return (
 <>

   <div className="main w-[100%]  flex justify-center ">
    <div className="mainframe h-[100vh] w-[100%]">

      <Header ></Header>


        <div style={{height:"calc(100vh - 95px)"}} className="messanger  flex items-center justify-center ">
        <div className="leftmessanger p-[20px] bg-gray-100 min-w-[320px] h-[100%]">
        
      <div className="searchframe flex items-center  mt-[20px]">
      <div className="search flex items-center justify-center w-[250px]  border-1  p-[10px] bg-white rounded-[5px]"><input className='outline-0' type="text" placeholder='Search Users..' /> <Search></Search></div>

      </div>
      <br />

      <h1 className=''>Chats</h1>
      <br />

      <div className="selecteduser">
    
   


          {allmessagesloaded ?     
        
            
            allprofiles.map((data,id) => {

         

            return   <Link href={`/Message?userid=${data.id}`} key={id}  className={`flex  p-[10px]  mt-[10px] items-center ${userid == data.id ? "bg-gray-300" : ''} gap-[10px] hover:bg-gray-300 `}>
            <div className="left">{data.profilepic == "noprofile" ? <div className='relative'><img className='w-[50px] h-[50px] p-[10px] border-1 border-gray-500' src="/noprofile.webp" alt="" /> {onlineusers?.includes(data.id) ? <div className="green absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] rounded-[50%] bg-teal-500"></div> : <div className="green absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] rounded-[50%] bg-gray-500"></div> }</div> : null}</div>
            <div className="right"><div className="firstline">{data.username}</div></div>
            
               </Link>
          })
         
            

  

       :  null}
  


           
         



      </div>
  
           

     </div>

      <div className="mainmessanger h-[100%] w-[100%]">
       {userid ? <>
       <div className="profileinfo flex items-center p-[20px] border-b-1 border-gray-100 justify-between w-[100%] h-[10%]">

<div> 
{openedmessageloaded ?    
 

 <div className='flex  items-center  gap-[10px]'>
<div className="left">{openedmessage.profilepic == "noprofile" ? <div className='relative'><img className='w-[50px] h-[50px] p-[10px] border-1 border-gray-300' src="/noprofile.webp" alt="" /> {onlineusers?.includes(openedmessage.id) ? <div className="green absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] rounded-[50%] bg-teal-500"></div> : <div className="green absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] rounded-[50%] bg-gray-500"></div> }</div> : null}</div>
<div className="right"><div className="firstline">{openedmessage.username}</div></div>

 </div>
:  null}

</div>




</div>

<div className="Messages bg-white w-[100%] h-[70%]">

 <div className="profileinfo flex items-center justify-center"> </div>
 <div ref={messagelistref} className="messageslist w-[90%]">
{openedmessageloaded ?  
allmessages.filter(filt => filt.messageto == userid || filt.messageby == userid).sort(
  (a, b) => new Date(a.sendtime) - new Date(b.sendtime)
).map((data,id) => {
 

if(data.sendbyme){
return <div key={id} className="mymessage sendbyme flex items-center justify-end"><div className="message p-[10px] gap-[10px] flex items-end rounded-[5px]">  <div className="msg p-[10px] rounded-[10px] max-w-[320px] bg-gray-200">{data.message}</div> {openedmessageloaded ?    


 <div className='flex  items-center  gap-[10px]'>
<div className="left">{openedmessage.profilepic == "noprofile" ? <div className='relative'><img className='w-[50px] h-[50px] p-[10px] border-1 border-gray-300' src="/noprofile.webp" alt="" /> {onlineusers?.includes(openedmessage.id) ? <div className="green absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] rounded-[50%] bg-teal-500"></div> : <div className="green absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] rounded-[50%] bg-gray-500"></div> }</div> : null}</div>
<div className="right"></div>

 </div>
:  null}</div></div>
}else{
return <div key={id} className="mymessage sendbyme flex items-center justify-start"><div className="message p-[10px] gap-[10px] flex items-end rounded-[5px]"> {openedmessageloaded ?    


<div className='flex  items-center  gap-[10px]'>
<div className="left">{openedmessage.profilepic == "noprofile" ? <div className='relative'><img className='w-[50px] h-[50px] p-[10px] border-1 border-gray-300' src="/noprofile.webp" alt="" /> {onlineusers?.includes(openedmessage.id) ? <div className="green absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] rounded-[50%] bg-teal-500"></div> : <div className="green absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] rounded-[50%] bg-gray-500"></div> }</div> : null}</div>
<div className="right"></div>

</div>
:  null}  <div className="msg p-[10px] rounded-[10px] max-w-[320px] bg-gray-200">{data.message}</div> </div></div>
}

})
: <div className="loaderframe  h-[200px] flex items-center justify-center "><div className='flex loader items-center h-[60px] justify-center '><LoaderCircle size={60} ></LoaderCircle></div></div> }

</div>



</div></> : null} 
{userid ?  <div className="Messangerbox flex items-center justify-center w-[100%] h-[20%]">
          <div className="inputs gap-[10px] flex items-center justify-center w-[100%]"><input value={messageboxvalue.length > 0 ? messageboxvalue : ""} onChange={(e) => setmessageboxvalue(e.target.value)} placeholder='Enter Text Here...' type="text" className='p-[10px] bg-gray-100 w-[50%] border-1 border-gray-300' /> <button onClick={() => sendmessage(messageboxvalue) | setmessageboxvalue('')} className="send cursor-pointer flex items-center justify-center gap-[5px] bg-blue-500 text-white border-1 border-blue-500 p-[10px]">Send <Send></Send></button></div>
        </div> : null}
      


      </div>

        </div>
         
    </div>

   </div>
  </>
  )
}


return (
<Suspense fallback={
  <div className='flex items-center justify-center h-[100vh]'>
    <LoaderCircle size={60} />
  </div>
}>
  <MainMessanger />
</Suspense>
)