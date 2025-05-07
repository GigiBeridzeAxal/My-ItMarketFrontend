"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import useSocket from "../../store/useSocket";
import useMessage from "../../store/useMessage";
import useAuth from "../../store/useAuth";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { img } from "framer-motion/client";
import Loading from "../Loading";

const MessageBoxcontent = () => {
  const searchparams = useSearchParams();

  const [alreadyscrooled , setalreadyscrolled] = useState(0)

  const [messageslength , setmessageslength] = useState(0)

  const [lastprofileid , setlastprofileid] = useState()

  const nowref = useRef()

  const profileid = searchparams.get("profileid");
  const {
    allmessages,
    sendmessage,
    setopenedmessage,
    openedusermessages,
    allmessagesloaded,
    openedmessage,
    loadnewmessages,
    inloadinglist,
    nomoremessages
  } = useMessage();

  const messageref = useRef();

  useEffect(() => {
    messageref?.current?.scrollIntoView();
    setlastprofileid(profileid)
  },[profileid , openedusermessages])


  useEffect(() => {
    if (messageref.current) {
      
      if(lastprofileid == profileid){
        nowref?.current?.scrollIntoView();
      }


      if(alreadyscrooled == 1){return ;}
      messageref?.current?.scrollIntoView();
      setalreadyscrolled(1)

    }


  }, [inloadinglist]);

  useEffect(() => {

    


    console.log(messageslength , openedusermessages.length)

    if(inloadinglist.includes(profileid)){
      setmessageslength(openedusermessages.length)
    }
  

      



  },[inloadinglist])


  useEffect(() => {

    const messanger =  document.querySelector(".controlloader");

    messanger.addEventListener("scroll", (e) => {

      console.log(e.target.scrollTop)
     
      if(e.target.scrollTop == 0){
        loadnewmessages();
      }
      
    })
 
  }, []);
  
  const { userdata, checkuserlogin } = useAuth();

  const [messagevalue, setmessagevalue] = useState("");


  useEffect(() => {
    checkuserlogin();
  });


  useEffect(() => {

    if (profileid && allmessagesloaded) {
      setopenedmessage(profileid);
    }
  }, [allmessagesloaded, profileid]);

  return (
    <div className="messagebox w-[100%] h-[98%] flex flex-col items-center justify-between">
      <div  className="center controlloader overflow-y-auto overflow-hidden max-h-[90%] p-[40px] flex flex-col gap-[30px] w-[100%]">
      {inloadinglist.includes(profileid) && !nomoremessages.includes(openedmessage.id)  ? <Loading></Loading> : null} 
       { profileid && openedusermessages.length > 0 ? openedusermessages.map((message, id) => {
          return (
            <motion.div ref={id == messageslength ? nowref : null} key={id} className={`messageline ${id == openedusermessages.length ? 'scrollpoint' : ''}`}>
              {message?.messageby == profileid ? (
                <div className="leftmessage w-[100%] gap-[10px] flex justify-start">
                  {openedmessage.profilepic == "noprofile" ? (
                    <div className="noprofile relative p-[10px] border-1 border-gray-300 w-[50px]">
                      <img
                        className="w-[30px] h-[30px]  "
                        src="/noprofile.webp"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="withprofile  w-[50px]">
                      <img
                        className="w-[50px] h-[50px]"
                        src={`https://itmarketbucket.s3.us-east-1.amazonaws.com/${openedmessage.profilepic}`}
                        alt=""
                      />
                    </div>
                  )}
                  <p className="message  max-w-[320px p-[10px] rounded-[5px] bg-gray-100">
                    {" "}
                    {message?.message}
                  </p>
                </div>
              ) : (
                <div className="rightmessage w-[100%] flex gap-[15px] justify-end">
                  <p className="message max-w-[320px] p-[10px] rounded-[5px] bg-gray-100">
                    {message?.message}
                  </p>
                  {userdata.profilepic == "noprofile" ? (
                    <div className="noprofile relative p-[10px] border-1 border-gray-300 w-[50px]">
                      <img
                        className="w-[30px] h-[30px]  "
                        src="/noprofile.webp"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="withprofile  w-[50px]">
                      <img
                        className="w-[50px] h-[50px]"
                        src={`https://itmarketbucket.s3.us-east-1.amazonaws.com/${userdata.profilepic}`}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              )}
              <div ref={messageref}></div>
            </motion.div>
          );
        }) : null}
      </div>

      <div className="bottom w-[100%] flex items-center justify-center">
        <input
          value={messagevalue}
          onChange={(e) => setmessagevalue(e.target.value)}
          className="w-[60%] p-[10px] bg-gray-200"
          type="text"
          placeholder="Enter Message"
        />
        <button
          onClick={() => sendmessage(messagevalue) | setmessagevalue("")}
          className="bg-blue-500 text-white p-[10px]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default function MessageBox() {
  return (
    <Suspense
      fallback={
        <div className="loaderframe  h-[200px] flex items-center justify-center ">
          <div className="flex loader items-center h-[60px] justify-center "></div>
        </div>
      }
    >
      <MessageBoxcontent></MessageBoxcontent>
    </Suspense>
  );
}
