import { create } from "zustand";
import axios from 'axios'
import { toast } from "react-toastify";


const useMyJobPosts = create((set,get) => ({


    myjobpostsdata:[],
    myjobpostsloaded:false,
    jobinfo:null,
    projectisready:null,
    lastprojectid:null,




    getjobpostsdata:async() => {

        const getjobposts = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'User/getmyjobposts' , {} , {withCredentials:true})
        console.log(getjobposts.data)
        set({myjobpostsloaded:true , myjobpostsdata:getjobposts.data})

     
    },

    getjobinfo:async(projectid) => {

      try{
        console.log(projectid)
        const getinfo = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'User/getjobinfo' , {projectid:projectid} , {withCredentials:true})
        

        console.log(getinfo.data)

        if(getinfo){
            set({projectisready:true , jobinfo:getinfo.data , lastprojectid:projectid})
        }

        
      }catch(err){

        toast.error("You Dont Have Access")

        console.log(err)

        window.location = '/'

      }

    }



}))

  





export default useMyJobPosts