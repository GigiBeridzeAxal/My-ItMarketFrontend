import {create} from 'zustand'
import axios from 'axios'
import { toast } from 'react-toastify';




const useAuth = create((set , get) => ({

    isUserLogin:undefined,
    userdata:[],
    profileview:[],
    editprofile:false,
    
    freelancersdata:[],


    
   checkeditableprofile:async(userid) => {


    if(get().userdata.id == userid) {
        console.log("sadawd")
        set({editprofile:true , profileview:get().userdata}) 
    
    }else{

        const finduser = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'User/getuserbyid' , {userid:userid} , {withCredentials:true})
    
        set({profileview:finduser.data})
    }



    


   },

   changeprofileiamge:async(image) => {
    
   },

   edituser:async(param) => {

    try{
        const loading = toast.loading("Please Wait")
        const send = await axios.patch(process.env.NEXT_PUBLIC_BACKEND + 'User/edituser' , param , {withCredentials:true})
        toast.dismiss(loading)
        if(send.status == 200){toast.success("Your Profile Updated")}
        set({profileview:send.data})

    }catch(err){

        toast.error(err.response.data)

    }

   },

   getfreelancerusers:async() => {


    const getfreelancers = await axios.get(process.env.NEXT_PUBLIC_BACKEND + 'user/getallfreelancerusers')

    
    set({freelancersdata:getfreelancers.data})




   },


    checkuserlogin:async() => {

        const userlogin = get().isUserLogin

        if(userlogin) return;

        const getuserdata = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'user/userdata', {} , {withCredentials:true})
        

        if(getuserdata.status !== 200) {
            set({isUserLogin:false})
        }else{
      console.log(getuserdata.data)

        set({isUserLogin:true})
        set({userdata:getuserdata.data})


        }

  

    },

    login:async(params) => {



        const loading = toast.loading("Please Wait")
    
        const auth = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'user/login' , {
            ...params
           } , {
               withCredentials:true
           })

           toast.dismiss(loading)
   
           if(auth.status == 200){
            toast.success("You Siggned In Sucesfully")
              window.location = '/'
           }else{
            toast.error(auth.data)
           }
   

    },

    register:async(params) => {

        const loading = toast.loading("Please Wait")
    
        const reg = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'user/CreateUser' , {
            ...params
           } , {
               withCredentials:true
           })

           toast.dismiss(loading)
   
           if(reg.status == 200){
            toast.success("You Siggned In Sucesfully")
              window.location = '/'
           }else{
            toast.error(reg.data)
           }




    }



 


}))


export default useAuth