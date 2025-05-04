import axios from 'axios'
import {create} from 'zustand'


const useWorks = create((set,get) => ({

    works:[],

    getworks:async() => {


        const getprojects = await axios.get(process.env.NEXT_PUBLIC_BACKEND + 'projects/getprojects' , {withCredentials:true})


        set({works:getprojects.data})




    }




}))




export default useWorks