import axios from "axios";
import { form } from "framer-motion/client";
import { toast } from "react-toastify";

import { create } from "zustand";


const useForum = create((set , get) => ({
    

    forumdata:[],
    forumpostisprocessing:false,
    forumloading:true,

    
    getforumdata:async() => {

        const getforumdata = await axios.get(process.env.NEXT_PUBLIC_BACKEND + 'forum/getforumdata' , {withCredentials:true})
        
        console.log(getforumdata.data)
        if(getforumdata.status == 200){
            set({forumdata:getforumdata.data})
            set({forumloading:false})
        }else{
            set({forumloading:false})
            toast.error(getforumdata.data.message)
        }

    },

    createforumpost:async(params) => {

        params.forumdesc === undefined ? params.forumdesc = "" : params.forumdesc = params.forumdesc

        if(get().forumpostisprocessing){
            toast.error('Please wait for the previous post to be processed')
            return
        }
        if(params.forumfiles?.length === 0 && params.forumdesc === ""){
            
            return toast.error('Please add a description or a file')
        }

        console.log(params.forumdesc)
        const loading = toast.loading('Creating your post...')

        set({forumpostisprocessing:true})


        const formdata = new FormData()
        formdata.append('file', params.forumfiles[0]);
        formdata.append('forumdesc' , params.forumdesc)

        try{


            const create = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'forum/createforumpost' , formdata , {withCredentials:true , headers:{'Content-Type':'multipart/form-data'}})
         
        

            console.log(create.status)
    
            if(create.status === 200){
                toast.success(create.data.message)
                toast.dismiss(loading)
                set({forumpostisprocessing:false})
            }else{
                toast.error(create.data.message)
                toast.dismiss(loading)
                set({forumpostisprocessing:false})
            }

        }catch(err){
            toast.dismiss(loading)
            set({forumpostisprocessing:false})
            toast.error(err.response.data.message)

        }
      
      


    }


}))

export default useForum