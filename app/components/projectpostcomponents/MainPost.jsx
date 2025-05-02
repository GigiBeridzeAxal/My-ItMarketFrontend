'use client'
import { Stars } from 'lucide-react'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import useProjects from '../../store/useProjects'


export default function MainPost() {

    const [postdetailpage , setpostdetailpage] = useState(0) 
    const {createproject} = useProjects()

    const [projectparams , setprojectparams] = useState({
        projecttitle:'',
        projectdescription:'',
        projecttags:[],
        projectprice:"50-100",
    })



    const tagdata = [
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Go', 'Kotlin',
        'Dart', 'HTML', 'CSS', 'TypeScript', 'Rust', 'Scala', 'Perl', 'Lua', 'Shell', 'Bash',
        'Elixir', 'Haskell', 'R', 'Objective-C', 'MATLAB', 'Groovy', 'F#', 'Assembly', 'VBA',
        'Visual Basic', 'SQL', 'PL/SQL', 'SAS', 'Julia', 'COBOL', 'Fortran', 'Scheme', 'Lisp',
        'Erlang', 'Solidity', 'Prolog', 'Ada', 'VB.NET', 'Tcl', 'Crystal', 'OCaml', 'Delphi',
        'Powershell', 'Hack', 'Zig', 'Nim', 'Smalltalk', 'ActionScript', 'Verilog', 'VHDL',
        'Racket', 'PostScript', 'AWK', 'ColdFusion', 'ML', 'Common Lisp', 'ReScript', 'AssemblyScript',
        'ReactJS', 'NextJS', 'NodeJS', 'ExpressJS', 'NestJS', 'Svelte', 'VueJS', 'Angular',
        'EmberJS', 'BackboneJS', 'MeteorJS'
      ];
    const [projecttagnow , setprojecttagnow] = useState('')

  return (
   <div className="mainpost p-[20px]">
    <div className="mainpostframe ">
        
        <div className="progressbar flex items-center gap-[10px]">
            <button onClick={() => setpostdetailpage(perv => perv > 0 ? perv - 1 : 0)} className="back cursor-pointer rounded-[2px] border-[1px] p-[6px] bg-gray-400 w-[120px]">Back</button>
            <div className="progress bg-gray-100 w-[100%]">
                <div className={`progressfill ${postdetailpage == 0 ? "w-[50%]" : "w-[100%]"} h-[5px] bg-indigo-500`}></div>
            </div>
            <button onClick={() => postdetailpage == 1 ? createproject(projectparams) :  setpostdetailpage(perv => perv < 1 ? perv + 1 : 1)} className="back cursor-pointer rounded-[2px] border-[1px] border-blue-800 text-white p-[6px] bg-blue-500 w-[120px]">{postdetailpage == 1 ? "Finish" : "Next"} </button>
           


        </div>

        <div className="postdetails mt-[50px]">

            {postdetailpage == 0 ?
                <div className="postdetailsframe flex flex-col gap-[20px]">
                    <div className="welcome text-[54px] w-[550px]">Tell Us <span className='text-purple-500'>What You Want</span>  To <span className='text-indigo-700'>Build.</span></div>
                    <div className="title text-[34px]">Project Tittle</div>
                    <input onChange={(e) => setprojectparams(perv =>({...perv , projecttitle:e.target.value}))} placeholder='Enter Project Tittle' className='w-[100%] p-[10px]  border-[1px] border-gray-300'></input>

                    <div className="title text-[34px]">Project Description</div>
                    <textarea onChange={(e) => setprojectparams(perv =>({...perv , projectdescription:e.target.value}))} placeholder='Enter Project Description' className='w-[100%] p-[10px] h-[200px]  border-[1px] border-gray-300'></textarea>

                </div> 
            
            : null}

         {postdetailpage == 1 ?
 <div className="postdetailsframe flex flex-col gap-[20px]">
 <div className="welcome text-[54px] w-[550px]">Tell Us <span className='text-purple-500'>What You Want</span>  To <span className='text-indigo-700'>Build.</span></div>
 <div className="title text-[34px]">Project Price</div>
 <select value={projectparams.projectprice} onChange={(e) => setprojectparams(perv => ({...perv , projectprice:e.target.value})) || console.log(projectparams)} className='p-[10px] bg-gray-500 text-white' name="" id="">
    <option  value="50-100">50$ - 100$</option>
    <option  value="100 - 150">100$ - 150$</option>
    <option  value="150 - 200">150$ - 200$</option>
    <option  value="200 - 250">200$ - 250$</option>
    <option  value="250 - 300">250$ - 300$</option>
    <option  value="300 - 350">300$ - 350$</option>
    <option  value="350 - 400">350$ - 400$</option>
    <option  value="400-450">400$ - 450$</option>
    <option  value="500-550">500$ - 550$</option>
    <option  value="500-2500">500$ - 2500$</option>
    <option  value="2500-10000">2500$ - 10000$</option>
    <option  value="10000+">10000$+</option>
 </select>


 <div className="title text-[34px]">Project Skills</div>
 <button className="generatewithai w-[100%] text-start  cursor-pointer  flex items-center w-[170px] gap-[15px]">Generate With Ai <Stars className='size-[17px]'></Stars></button>
   <div className="div  flex items-center justify-center gap-[10px]">

   <input value={projecttagnow}  onChange={(e) => setprojecttagnow(e.target.value)} placeholder='Enter Project Skills' className='w-[100%] p-[10px]  border-[1px] border-gray-300'></input>

   
 

   </div>
   {projecttagnow.length > 0 ?
    
    <div className="customselect bg-gray-100 p-[10px] w-[100%]">
    <div className="taglist flex flex-col w-[100%] items-start justify-start flex-wrap gap-[10px]">
    {tagdata.filter(filt => filt.toLocaleLowerCase().includes(projecttagnow.toLocaleLowerCase())).map((data,id) => (
        <motion.button  onClick={() => setprojecttagnow('') || projectparams.projecttags.includes(data) ? toast.error("You Already Add This Tag") :  setprojectparams(perv => ({
            ...perv,
            projecttags:[...perv.projecttags , data]
        
           }))} className='cursor-pointer hover:bg-blue-500 hover:text-white p-[10px] w-[100%] text-start' key={id}>{data}</motion.button>
    ))}
    </div></div>
    
   : null}
    <div className="taglist flex items-center justify-start flex-wrap gap-[10px]"> {projectparams.projecttags.map((data,id) => (
    <div key={id} className="tags flex items-center p-[10px] bg-gray-500 text-white">{data}</div>
   ))}</div>
</div> 




        
         : null}

         


        </div>

    </div>
   </div>
  )
}
