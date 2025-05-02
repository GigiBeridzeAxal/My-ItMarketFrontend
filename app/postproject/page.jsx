import React from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import MainPost from '../components/projectpostcomponents/MainPost'

export default function page() {
  return (
    <>
   
      <div className="main h-[100vh] w-[100%] flex justify-center ">
       <div className="mainframe h-[100%] w-[80%]">
            <Header></Header>
            <NavHeader></NavHeader>
            <br />
            <MainPost></MainPost>
           

            

            
       </div>
   
      </div>
     </>
  )
}
