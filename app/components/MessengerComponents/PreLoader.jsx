import React from 'react'

export default function PreLoader({preloaderlocat}) {
  return (
    <div className=" mt-[10px]">
        <div className="preloaderframe flex flex-col gap-[25px]">

            <div className={`preloaderline border-1 border-gray-800 ${preloaderlocat == "Messanger" ? 'preloader' : ''} overflow-hidden p-[10px] ${preloaderlocat == "Forum" ? '' : ''} flex gap-[10px] ${preloaderlocat == "Freelancer" ? 'max-w-[815px]' : ''} rounded-[5px] w-[100%]  bg-gray-200`}>
              {preloaderlocat !== "Freelancer" ?    <div className="textline preloader mt-[20px] rounded-[50%] overflow-hidden  w-[50px] p-[5px] h-[50px] bg-gray-300"></div> : null}
                
                {preloaderlocat == "Freelancer" ?  <div className={`ball preloader overflow-hidden rounded-[5px] w-[30px] ${preloaderlocat == "Freelancer" ? 'h-[150px] w-[150px]' : ''} h-[30px] bg-gray-300`}></div> : null}

                <div className="nextline w-[90%]">

                {preloaderlocat == "Messanger" ?        
                      <>
                      <div className="textline preloader overflow-hidden  w-[80%] p-[5px] h-[15px] bg-gray-300"></div>  

                      </>
                      : null}

                    {preloaderlocat == "Freelancer" ?        
                      <>

                      <div className="textline preloader overflow-hidden  w-[40%] p-[5px] h-[15px] bg-gray-300"></div>  


                      <div className="textline preloader mt-[20px] overflow-hidden  w-[50%] p-[5px] h-[15px] bg-gray-300"></div>

                        <div className="textline preloader mt-[20px] overflow-hidden  w-[20%] p-[5px] h-[15px] bg-gray-300"></div>    
                        <div className="textline preloader mt-[20px] overflow-hidden  w-[70%] p-[5px] h-[15px] bg-gray-300"></div>
                      </>
                      : null}

                    {preloaderlocat == "Forum" ?        
                      <>
                      <div className="textline preloader overflow-hidden mt-[20px] w-[80%] p-[5px] h-[15px] bg-gray-300"></div>  

                      <div className="textline preloader overflow-hidden mt-[20px] w-[70%] p-[5px] h-[15px] bg-gray-300"></div>  

                      <div className="textline preloader overflow-hidden mt-[20px] w-[60%] p-[5px] h-[15px] bg-gray-300"></div>  
                      
                      <div className="photopreloader mt-[20px] preloader overflow-hidden bg-gray-300 w-[50%] h-[200px]">

                      </div>
                      </>
                      : null}
       
                </div>
            </div>

            <div className={`preloaderline border-1 border-gray-800 ${preloaderlocat == "Messanger" ? 'preloader' : ''} overflow-hidden p-[10px] ${preloaderlocat == "Forum" ? '' : ''} flex gap-[10px] ${preloaderlocat == "Freelancer" ? 'max-w-[815px]' : ''} rounded-[5px] w-[100%]  bg-gray-200`}>
              {preloaderlocat !== "Freelancer" ?    <div className="textline preloader mt-[20px] rounded-[50%] overflow-hidden  w-[50px] p-[5px] h-[50px] bg-gray-300"></div> : null}
                
                {preloaderlocat == "Freelancer" ?  <div className={`ball preloader overflow-hidden rounded-[5px] w-[30px] ${preloaderlocat == "Freelancer" ? 'h-[150px] w-[150px]' : ''} h-[30px] bg-gray-300`}></div> : null}

                <div className="nextline w-[90%]">

                {preloaderlocat == "Messanger" ?        
                      <>
                      <div className="textline preloader overflow-hidden  w-[80%] p-[5px] h-[15px] bg-gray-300"></div>  

                      </>
                      : null}

                    {preloaderlocat == "Freelancer" ?        
                      <>

                      <div className="textline preloader overflow-hidden  w-[40%] p-[5px] h-[15px] bg-gray-300"></div>  


                      <div className="textline preloader mt-[20px] overflow-hidden  w-[50%] p-[5px] h-[15px] bg-gray-300"></div>

                        <div className="textline preloader mt-[20px] overflow-hidden  w-[20%] p-[5px] h-[15px] bg-gray-300"></div>    
                        <div className="textline preloader mt-[20px] overflow-hidden  w-[70%] p-[5px] h-[15px] bg-gray-300"></div>
                      </>
                      : null}

                    {preloaderlocat == "Forum" ?        
                      <>
                      <div className="textline preloader overflow-hidden mt-[20px] w-[80%] p-[5px] h-[15px] bg-gray-300"></div>  

                      <div className="textline preloader overflow-hidden mt-[20px] w-[70%] p-[5px] h-[15px] bg-gray-300"></div>  

                      <div className="textline preloader overflow-hidden mt-[20px] w-[60%] p-[5px] h-[15px] bg-gray-300"></div>  
                      
                      <div className="photopreloader mt-[20px] preloader overflow-hidden bg-gray-300 w-[50%] h-[200px]">

                      </div>
                      </>
                      : null}
       
                </div>
            </div>
            <div className={`preloaderline border-1 border-gray-800 ${preloaderlocat == "Messanger" ? 'preloader' : ''} overflow-hidden p-[10px] ${preloaderlocat == "Forum" ? '' : ''} flex gap-[10px] ${preloaderlocat == "Freelancer" ? 'max-w-[815px]' : ''} rounded-[5px] w-[100%]  bg-gray-200`}>
              {preloaderlocat !== "Freelancer" ?    <div className="textline preloader mt-[20px] rounded-[50%] overflow-hidden  w-[50px] p-[5px] h-[50px] bg-gray-300"></div> : null}
                
                {preloaderlocat == "Freelancer" ?  <div className={`ball preloader overflow-hidden rounded-[5px] w-[30px] ${preloaderlocat == "Freelancer" ? 'h-[150px] w-[150px]' : ''} h-[30px] bg-gray-300`}></div> : null}

                <div className="nextline w-[90%]">

                {preloaderlocat == "Messanger" ?        
                      <>
                      <div className="textline preloader overflow-hidden  w-[80%] p-[5px] h-[15px] bg-gray-300"></div>  

                      </>
                      : null}

                    {preloaderlocat == "Freelancer" ?        
                      <>

                      <div className="textline preloader overflow-hidden  w-[40%] p-[5px] h-[15px] bg-gray-300"></div>  


                      <div className="textline preloader mt-[20px] overflow-hidden  w-[50%] p-[5px] h-[15px] bg-gray-300"></div>

                        <div className="textline preloader mt-[20px] overflow-hidden  w-[20%] p-[5px] h-[15px] bg-gray-300"></div>    
                        <div className="textline preloader mt-[20px] overflow-hidden  w-[70%] p-[5px] h-[15px] bg-gray-300"></div>
                      </>
                      : null}

                    {preloaderlocat == "Forum" ?        
                      <>
                      <div className="textline preloader overflow-hidden mt-[20px] w-[80%] p-[5px] h-[15px] bg-gray-300"></div>  

                      <div className="textline preloader overflow-hidden mt-[20px] w-[70%] p-[5px] h-[15px] bg-gray-300"></div>  

                      <div className="textline preloader overflow-hidden mt-[20px] w-[60%] p-[5px] h-[15px] bg-gray-300"></div>  
                      
                      <div className="photopreloader mt-[20px] preloader overflow-hidden bg-gray-300 w-[50%] h-[200px]">

                      </div>
                      </>
                      : null}
       
                </div>
            </div>


        </div>
    </div>
  )
}
