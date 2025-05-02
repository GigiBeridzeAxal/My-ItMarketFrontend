
import { constrainedMemory } from 'process'
import { io } from 'socket.io-client'
import {create} from 'zustand'
import useMessage from './useMessage'
import { use } from 'react'


const useSocket = create((set,get) => ({

    Newprojects:[],
    socket:null,
    onlineusers:[],



    connecttoserver:() => {

        console.log("Connecting")

       const socket = io(process.env.NEXT_PUBLIC_BACKEND , {withCredentials:true})

       console.log(socket)

 
       set({socket})
       get().logsocketactivity()

     

    },

    
    logsocketactivity:() => {
      
        const socket = get().socket

 
 

        socket.on("OnlineUsers" , (users) => {
            set({onlineusers:Object.keys(users)})
          
         })
    socket.off('SendMessage')
         socket.on("SendMessage" , (message) => {

            console.log(message)
            
            useMessage.getState().addmessage(message)

        })
    
        
 

        socket.on("NewUser" , (usr) => {

   

            const onlineusers = get().onlineusers

            const onlineuserskeys = Object.keys(get().onlineusers)

            console.log(onlineusers , "ALl Users") 

    


                console.log(usr , "OneUser")
         

                set({onlineusers:[...onlineusers , usr]})
            
        })


        

   

        socket.on('AddnewProject' , (projectname) => {
            console.log("new Project")
        })

        socket.on('UserDisconnected' , (disconnecteduser) => {
            console.log(disconnecteduser , "Disconnected User")

            const onlineusers = get().onlineusers


            const remove = onlineusers.filter((user) => user !== disconnecteduser)

            set({onlineusers:remove})
        })

        

    }



}))


export default useSocket