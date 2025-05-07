import axios from "axios";
import { create } from "zustand";
import useAuth from "./useAuth";



const useMessage = create((set, get) => ({
  openedmessage: null,
  openedmessageloaded: false,
  allmessages: [],
  openedusermessages: [],
  allprofiles: [],
  allprofilesloading:true,
  allmessagesloaded: false,
  loader:[],
  inloadinglist: [],
  nomoremessages:[],

  setopenedmessage: async (userid) => {
    console.log(userid, "User ID");
    set({ openedmessageloaded: false , openedusermessages: [] });

    const openeduserdata = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND + "User/getuserbyid",
      { userid: userid },
      { withCredentials: true }
    );

    console.log(openeduserdata.data);

    const allmessagesforuser = get().allmessages.filter(filt => filt?.messageby == userid || filt?.messageto == userid)

    console.log(allmessagesforuser, "All Messages for User" , get().allmessages);
    
    set({
      openedmessage: openeduserdata.data,
      openedusermessages: [...get().openedusermessages, ...allmessagesforuser],
      openedmessageloaded: true,
    });

    //  get().getallmessages()
  },

  loadnewmessages: async() => {

    

    const profileid = get().openedmessage.id

    if(get().nomoremessages.includes(profileid)){return ; }

    const loadinglist = get().inloadinglist

    
 
    if(loadinglist.includes(get().openedmessage.id)) {return ; }

      console.log(loadinglist, "Loading IDs");

    set({inloadinglist:[...get().inloadinglist , profileid]} );
    console.log(get().loader, "Loader");

    const lastmessage = get().allmessages.filter(filt => filt?.messageby ==  get().openedmessage.id || filt?.messageto ==  get().openedmessage.id).at(0)

   const nextmessages = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "Message/getnextmessages", { profileid: get().openedmessage.id , lastmessagesendtime:lastmessage.sendtime }, { withCredentials: true });


   if(nextmessages.status == 201){
    set({nomoremessages:[...get().nomoremessages , profileid]})
   }

   if(nextmessages.status == 200){
    console.log(nextmessages.data, "Next Messages");

    set({ allmessages: [...nextmessages.data, ...get().allmessages] });
    set({inloadinglist:get().inloadinglist.filter(filt => filt !== get().openedmessage.id)})
    set({ openedusermessages: [...nextmessages.data, ...get().openedusermessages] });
   }

  },

  setallprofiles: async (profileid) => {
    const allprofiles = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND + "Message/getallprofiles",
      {profileid: profileid , allprofiles:get().allprofiles},
      { withCredentials: true }
    );

    console.log(allprofiles.data.users, allprofiles.data.lastmessages , get().allprofiles);

    const allidsfromserver = allprofiles.data.users.map(data => data.id)

    const allprofilesuserswithid = get().allprofiles.map(data => data.id)

    function filteralldata() {


      const ids = []
      

      for(const profileid of allidsfromserver){
  
        allprofilesuserswithid.includes(profileid) ? null : ids.push(profileid)
  
      }

      return ids
  
     }
  
     const filtered = filteralldata()
  
     console.log(filtered)

     const filteredprofiles = allprofiles.data.users.filter(data => filtered.includes(data.id))

     

    if (allprofiles.status == 200) {
      set({
        
        allprofiles:[...get().allprofiles, ...filteredprofiles],
        allmessages: allprofiles.data.lastmessages.reverse(),
        allmessagesloaded: true,
        allprofilesloading:false
      });
      console.log(allprofiles.data.users, allprofiles.data.lastmessages , get().allprofiles);
    }
  },

  addmessage: (message) => {
    console.log(message, "Message");
    set({ allmessages: [...get().allmessages, message] });

    const profs = get().allprofiles.map(data => data.id)

    if(!profs.includes(message.messageby) && message.messageby !== useAuth.getState().userdata.id ){
      get().setallprofiles(message.messageby)
    }

    if(get().openedmessage?.id == message.messageby || get().openedmessage?.id == message.messageto) {
      set({ openedusermessages: [...get().openedusermessages, message] });
    }

  },

  getallmessages: async () => {
    const messagesforopeneduser = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND + "Message/GetAllMessages",
      { userid: get().openedmessage.id },
      { withCredentials: true }
    );
    console.log(messagesforopeneduser.data, "All Messages");

    console.log(get().allmessages, "All Messages");

    set({ allmessages: messagesforopeneduser.data });
  },
  //
  sendmessage: async (message) => {
    const sendmessage = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND + "Message/SendMessage",
      { message: message, receiverid: get().openedmessage.id },
      { withCredentials: true }
    );

    const allmessages = get().allmessages;
  },
}));

export default useMessage;
