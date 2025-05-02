import axios from "axios";
import { create } from "zustand";



const useMessage = create((set,get) => ({

    openedmessage:null,
    openedmessageloaded:false,
    allmessages:[],
    allprofiles:[],
    allmessagesloaded:false,

    setopenedmessage:async(userid) => {

        set({ openedmessageloaded:false , allmessages:[] })

        const openeduserdata = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'User/getuserbyid' ,{userid:userid} , {withCredentials:true})

        console.log(openeduserdata.data)

        console.log(get().allprofiles , "All Profiles")


        const allids = get().allprofiles[0] == undefined ? null :   get().allprofiles.map(data => data.id)

        set({openedmessage:openeduserdata.data , openedmessageloaded:true })

        if(get().allprofiles[0] == undefined){
            set({openedmessage:openeduserdata.data , openedmessageloaded:true , allprofiles:[openeduserdata.data] })
        }else{
            if(!allids.includes(openeduserdata.data.id)){
                set({openedmessage:openeduserdata.data  , allprofiles:[...get().allprofiles , openeduserdata.data] })
            }

        }







        get().getallmessages()

        
    },

    setallprofiles:async() => {

        const allprofiles =await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'Message/getallprofiles' , {} , {withCredentials:true})

        console.log(allprofiles.data)

        if(allprofiles.status == 200){

     

            set({allprofiles:allprofiles.data , allmessagesloaded:true})
        }


    },

    addmessage:(message) => {set({allmessages:[...get().allmessages , message]})},

    getallmessages:async() => {

        const messagesforopeneduser = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'Message/GetAllMessages' , {userid:get().openedmessage.id} , {withCredentials:true})
        console.log(messagesforopeneduser.data , "All Messages")



        set({allmessages:messagesforopeneduser.data})
        
    },
// 
    sendmessage:async(message) => {

        const sendmessage = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'Message/SendMessage' , {message:message , receiverid:get().openedmessage.id} , {withCredentials:true})

        const allmessages = get().allmessages





    }
    


}))



export default useMessage