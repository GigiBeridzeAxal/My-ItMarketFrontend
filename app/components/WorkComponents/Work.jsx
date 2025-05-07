import React, { useEffect } from 'react'
import useWorks from '../../store/useWorks'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import Loading from '../Loading'

export default function Work() {
    const {getworks , works , workloading} = useWorks()

    useEffect(() => {

        getworks()

        console.log(works)


    },[])


  return (
    
    <div className="work p-[20px] w-[100%]">
        <div className="workframe">

            <div className="welcome text-[20px]">Find Oportunity Form All Over World</div>

            <div className="totalprojects mt-[10px]">Totalprojects:{works?.length}</div>

            <br />

            <div className="projects flex flex-col gap-[15px]">
              {workloading && works[0] == undefined ? <Loading></Loading> : null}
                {works ? 

                works?.map((data , id) => {

                  const now = new Date();
                  const postTime = new Date(data.projectposttime);
              
                  const diffInMs = now - postTime;
                  const diffInSeconds = Math.floor(diffInMs / 1000);
                  const diffInMinutes = Math.floor(diffInSeconds / 60);
                  const diffInHours = Math.floor(diffInMinutes / 60);
                  const diffInDays = Math.floor(diffInHours / 24);
              
                  let timeAgo = ""
              
                  if (diffInSeconds < 60) {
                      timeAgo = `${diffInSeconds} seconds ago`;
                    } else if (diffInMinutes < 60) {
                      timeAgo = `${diffInMinutes} minutes ago`;
                    } else if (diffInHours < 24) {
                      timeAgo = `${diffInHours} hours ago`;
                    } else {
                      timeAgo = `${diffInDays} days ago`;
                    }
                  



                    return <div key={id} className="projectbox flex flex-col gap-[15px] w-[70%] bg-gray-100 p-[20px]">
                    <div className="lineone flex w-[100%] justify-between items-center">

                    <div className="projectfirstline">  
                    <div className="date">Posted: {timeAgo}</div>
                    <div className="projecttittle text-[20px] font-[700]">{data.projectittle}</div>
                    <div className="projectprice mt-[5px]">Budget: {data.projectprice}$</div>
                 
                    </div>
                 
                    <div className="actions flex items-end flex-col justify-center gap-[15px]">
                      <div className="mainactions flex items-center justify-center gap-[15px]"><button className='p-[10px] rounded-[5px] bg-gray-200'><Heart></Heart></button>
                      <Link href={`/projects?projectid=${data.id}`} className='bg-blue-400 text-white rounded-[5px] p-[10px]'>Send Application</Link></div>
                    <div className="hired">0 Hired</div>
                    </div>
                    </div>
                    <div className="projectdesc text-gray-500">{data.projectdescription}</div>
                    <div className="Tags flex items-center gap-[10px]">
                      {data.projecttags.map((data,id) => (
              <div key={id} className="tager p-[10px] bg-gray-100 border-1 text-blue-500 rounded-[5px]">
                        <div  className="tag">{data}</div>
                        </div>
                       ))}
                    </div>


                    <div className="projectowner">

                        

                    </div>


                </div>
                    
                })

                

                : null}
            </div>

               

        </div>
    </div>


  )
}
