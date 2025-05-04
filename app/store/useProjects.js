import { create } from "zustand";
import axios from 'axios'
import { toast } from "react-toastify";





const useProjects = create((set,get) => ({

    projectdetails:[],
    projectnotfound:false,
    clientinfo:[],
    bidplaced:false,
    alreadybid:null,
    projectbids:[],
    bidsloaded:false,
    bidusers:[],

    

    
    checkalreadybid:async(userid) => {

        console.log("Checking Already Bid")

        if(get().projectbids[0]){
            
        console.log("Checking Already Bid 2")
            get().projectbids.forEach((data , id) => {


 

                if(data.bidby === userid){
                    console.log("You Already Bid")
                    set({alreadybid:true})
                    
                }
                
                
              
    
                    if(get().projectbids.length === id + 1){
        
                        if(get().alreadybid == null){
                            set({alreadybid:false})
                        }
            
                    }
    
             
                
            });
        }else{
            set({alreadybid:false})
        }

       



    },

    getprojectbids:async() => {

        const getallbids = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'projects/getallbids' , {projectid:get().projectdetails.id} , {withCredentials:true})
        
        console.log(getallbids.data)

        set({projectbids:getallbids.data.Allbids , bidsloaded:true , bidusers:getallbids.data.bidusers})
    },

    getprojectdetails:async(projectid) => {

        console.log(projectid)

        if(!projectid) {set({projectnotfound:true})}

        const getproject = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'projects/getprojectdetailsbyid' , {projectid:projectid} , {withCredentials:true})

        if(getproject.status == 200){
            set({projectdetails:getproject.data.projectinfo , clientinfo:getproject.data.clientinfo})
        }

        console.log(getproject)




    },
    
    createproject:async(params) => {

        const sendcreatereq = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'projects/createproject' , params , {withCredentials:true})

        if(sendcreatereq.status == 200){
            toast.success("Your Project Succesfully Added")
        }

    },

    placebid:async(bidinfo) => {
        console.log(get().alreadybid)
        if(get().alreadybid == null) {return;}
        if(get().bidplaced){return toast.error("You Already Place Bid")}
        if(get().alreadybid == true ) {return;}
        
        if(!get().projectdetails.id){return toast.error("Project Not Defined")}
         // validations
        if(Number(bidinfo.bidprice) < Number(get().projectdetails.projectprice?.split('-')[0]) ) {return toast.error(`Min Project Price: ${get().projectdetails.projectprice?.split('-')[0]}  `)}
    

        const loadingbid = toast.loading("Please Wait")
 

try{

   

    const params = {
        ...bidinfo,
        projectid:get().projectdetails.id
    }

    console.log(params)

  
    set({bidplaced:true})
    const sendbid = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'projects/placebid' , params , {withCredentials:true})
    toast.dismiss(loadingbid)
    set({bidplaced:false})
    window.location = '/dashboard'
    toast.success(sendbid.data)
}catch(err){

    console.log(err)
    toast.error(err.response.data)
      
    set({bidplaced:false})
    toast.dismiss(loadingbid)
}
        
    }

}))



export default  useProjects