import axios from "axios";
import { form } from "framer-motion/client";
import { toast } from "react-toastify";

import { create } from "zustand";


const useForum = create((set , get) => ({
    

    forumdata:[],

    
    getforumdata:async() => {

        const getforumdata = await axios.get(process.env.NEXT_PUBLIC_BACKEND + 'forum/getforumdata' , {withCredentials:true})
        
        console.log(getforumdata.data)
        if(getforumdata.status == 200){
            set({forumdata:getforumdata.data})
        }else{
            toast.error(getforumdata.data.message)
        }

    },

    createforumpost:async(params) => {

        const formdata = new FormData()
        formdata.append('file', params.forumfiles[0]);
        formdata.append('forumdesc' , params.forumdesc)

        try{
            const create = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'forum/createforumpost' , formdata , {withCredentials:true , headers:{'Content-Type':'multipart/form-data'}})
         
        

            console.log(create.status)
    
            if(create.status === 200){
                toast.success(create.data.message)
            }else{
                toast.error(create.data.message)
            }

        }catch(err){

            toast.error(err.response.data.message)

        }
      
      


    }


}))

export default useForum