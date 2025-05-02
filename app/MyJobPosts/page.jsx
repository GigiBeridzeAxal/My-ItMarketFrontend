
import React from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import JobList from '../components/MyJobPostsComponents/JobList'
import useMyJobPosts from '../store/useMyJobPosts'

export default function page() {



  return (
 <>

   <div className="main w-[100%]  flex justify-center ">
    <div className="mainframe w-[80%]">
         <Header></Header>

         <JobList></JobList>


         
    </div>



   </div>
  </>
  )
}
