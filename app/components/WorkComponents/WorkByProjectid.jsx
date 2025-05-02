
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import useProjects from '../../store/useProjects'
import { CreditCard, DollarSign, IdCard, LoaderCircle, Mail, Star, Timer } from 'lucide-react'
import useAuth from '../../store/useAuth'
import Link from 'next/link'


const WorkByProjectidcontent = () => {

    const path = useSearchParams()

    const {getprojectdetails , projectdetails ,bidusers , clientinfo , placebid , getprojectbids , projectbids ,checkalreadybid , alreadybid , bidsloaded} = useProjects()

    const {userdata} = useAuth()

    const [selectedmenu , setselectedmenu] = useState(0)

    const [bidprice , setbidprice] = useState(20)
    const [biddays , setbiddays] = useState(7)

    const [openeddescription ,setopeneddescription] = useState([])

    const projectid = path.get('projectid')

    useEffect(() => {

        getprojectdetails(projectid)
        

        
        

    },[])

    useEffect(() => {

      if(bidsloaded && userdata){

        checkalreadybid(userdata.id)

      }

    } , [projectbids , userdata])

    useEffect(() => {

      if(projectdetails.projectprice){
        setbidprice(Number(projectdetails.projectprice?.split('-')[0]))
      }

      if(projectdetails.id){
        getprojectbids()
      }

    },[projectdetails])

 
  return (
    <div className="projectbyid w-[100%] p-[20px]">
      <div className="projectbyidframe">

        <div className="selectmenu flex items-center gap-[30px] mb-[20px]">
          <button onClick={() => setselectedmenu(0)} className={`${selectedmenu == 0 ? 'activated' : ''} cursor-pointer`} >Project Details</button>
          <button onClick={() => setselectedmenu(1)} className={`${selectedmenu == 1 ? 'activated' : ''} cursor-pointer`}>Proposals</button>
        </div>


        {selectedmenu == 0 ? <>
          <div className="clientinfo p-[20px] bg-gray-100 border-gray-200 border-1 w-[100%]">
        
        <h1 >Client Info</h1>

        <div className="userprofiledetails flex items-center justify-between mt-[10px]">

         <div className="identify flex items-center gap-[10px]  font-[700]"> <IdCard className='size-[34px]'></IdCard> Identify Verify </div>

         <div className="identify flex items-center gap-[10px] text-teal-500 font-[700] "> <Mail className='size-[34px]'></Mail> Email Verify </div>


         <div className="identify flex items-center gap-[10px]  font-[700]"> <CreditCard className='size-[34px]'></CreditCard> Deposit Made </div>


        </div>



        

        </div>

        <div className="projectdetails mt-[20px] bg-gray-100/70 p-[20px] border-1 border-gray-200" >
        <h1 className='text-[24px] '>Project Details</h1>
          <div className="projecttagline text-[24px] font-[600]">{projectdetails.projectittle}</div>
          <div className="projectbudget">Budget: {projectdetails.projectprice} $</div>

          <div className="projectdescription mt-[100px]">
            <div className="dsec whitespace-pre-line max-w-[70%]">{projectdetails.projectdescription}</div>
          </div>

          <div className="skills mt-[20px]">
            <h1 className='font-[700] '>Skills Required</h1>
            

            <div className="skilllist mt-[15px] flex items-center gap-[10px]">
            {projectdetails.projecttags?.map((data,id) => (
              <div key={id} className="tager p-[10px] bg-gray-100 border-1 text-blue-500 rounded-[5px]">
                        <div  className="tag">{data}</div>
                        </div>
                       ))}
            </div>

          </div>

        </div>


        <div className="bidmanager flex items-center justify-between gap-[50px] mt-[20px] p-[20px] bg-gray-100/70 border-1 border-gray-200">

         <div className="div flex items-center gap-[50px]">
         <div className="bidprice text-[20px] rounded-[5px] flex items-center justify-between gap-[5px] w-[325px] p-[10px] border-blue-200 bg-white border-1"> <div className="input flex items-center gap-[5px]"><div className="dolar">$</div> <input type="number"  className='border-0 outline-0'  value={bidprice} onChange={(e) => setbidprice(e.target.value)} /> </div> <div className="usd">USD</div>  </div>

<div className="bidprice text-[20px] rounded-[5px] flex items-center justify-between min-w-[320px] gap-[5px] p-[10px] border-blue-200 bg-white border-1"> <div className="input  flex items-center gap-[5px] "><div className="dolar"><Timer></Timer></div> <input  min={1} max={60} type="number" className='border-0 outline-0 w-[200px]'  value={biddays} onChange={(e) => setbiddays(e.target.value)} /> </div> <div className="usd">Days</div>  </div>
<div className="bids">Bids Left: {userdata.bids}</div>
         </div>

         

         <button onClick={() => placebid({bidprice , biddays})} className="placebid p-[10px] bg-purple-500 border-1 border-purple-700 cursor-pointer text-white rounded-[3px] w-[200px]"> {alreadybid == null ? "Please Wait..."  : alreadybid == true ? "You Already Bid" : "Place Bid"}   </button>

        </div>
        </> : 
        
        <div className="userswhobid">

       <span className='mb-[15px]'> You are ranked {bidusers.findIndex(bid => bid.id == userdata.id ) + 1} out of {bidusers.length} proposals.
       </span>

{bidusers.map((data,id) => {

let openeddesc = false


return <div className='flex mt-[15px] items-start gap-[15px]' key={id}>
        <div className="profile">
            {data.profilepic == 'noprofile' ? <img className='w-[150px] h-[150px] p-[10px] border-1 border-gray-100' src='/noprofile.webp' ></img> : null}
        </div>
        <div className="maindetails flex flex-col gap-[10px]">
            
        <div  className="firstline  text-[24px]">

        <div className='flex  items-center justify-between'><div className='' >{data.username} | <Link href={`/profile?profileid=${data.id}`}className='font-[400] text-[20px]'>@{data.email.split('@')[0]} </Link> </div></div>

        <div className="secondline flex items-center gap-[10px]">

             <div className="stars flex items-center gap-[15px]"> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <Star className='size-[30px]'></Star> <span  className='text-[24px] font-[500]'>0.0</span> | <span className='text-[20px]'>Reviews: 0</span></div>



        </div>

        <div className="thirdline text-[16px] font-[700]">
            {!data.headline ? "No Headline" : data.headline}
        </div>

        <button  onClick={() => setopeneddescription([...openeddescription , data.id])} className={`fourline ${openeddescription.includes(data.id) ? 'whitespace-pre-line' : ''}  cursor-pointer text-start text-[16px] w-[650px]`}> { !data.description  ? "No Description" : data.description?.length > 80 && !openeddescription.includes(data.id) ? data.description.slice(0,80) + ' ... More' : data.description}</button>
        
        </div>
        </div>
</div>

}  )}




        </div>
        
        }

      

        

      </div>
    </div>
  )
}



export default function WorkByProjectid() {
  return (<Suspense fallback={
    <div className="loaderframe  h-[200px] flex items-center justify-center "><div className='flex loader items-center h-[60px] justify-center '><LoaderCircle size={60} ></LoaderCircle></div></div>
      }>
        <WorkByProjectidcontent />
      </Suspense>
        )
}
