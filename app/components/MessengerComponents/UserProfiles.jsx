"use client";
import React, { Suspense, useEffect } from "react";
import useSocket from "../../store/useSocket";
import useMessage from "../../store/useMessage";
import useAuth from "../../store/useAuth";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import PreLoader from "./PreLoader";

const UserProfilescontent = () => {
  const { onlineusers } = useSocket();

  const { allprofiles, setallprofiles, allmessages, allmessagesloaded , allprofilesloading } =
    useMessage();

  const searchparams = useSearchParams();

  const profileid = searchparams.get("profileid");

  useEffect(() => {
    setallprofiles(profileid);
  }, []);

  return (
    <div className="userprofiles flex flex-col gap-[10px]">
      {allprofilesloading ? <PreLoader preloaderlocat={'Messanger'}></PreLoader> : null}
      { allprofilesloading == false && allprofiles
        .sort((a, b) => {
          const lastMessageA = allmessages
            .filter(
              (filt) =>
                (filt?.messageby !== undefined && filt.messageby == a.id) ||
                (filt?.messageto !== undefined && filt?.messageto == a.id)
            )
            .at(-1);
          const lastMessageB = allmessages
            .filter(
              (filt) => 
              (filt?.messageby !== undefined && filt?.messageby == b.id) || 
              (filt?.messageto !== undefined && filt?.messageto == b.id)
            )
            .at(-1);

          const dateA = lastMessageA
            ? new Date(lastMessageA.sendtime).getTime()
            : 0;
          const dateB = lastMessageB
            ? new Date(lastMessageB.sendtime).getTime()
            : 0;

          return dateB - dateA;
        })
        .map((profile, id) => {
          return (
            <Link
              href={`/Message?profileid=${profile.id}`}
              key={id}
              className={`profile p-[10px] flex ${
                profileid == profile.id ? "bg-gray-200" : ""
              } gap-[10px]`}
            >
              <div className="profileimage relative">
                <div className="isonline">
                  {onlineusers.includes(profile.id) ? (
                    <div className="w-[10px] z-[14] h-[10px] bg-teal-500 rounded-full absolute right-0 bottom-[0px]"></div>
                  ) : (
                    <div className="w-[10px] z-[14] h-[10px] bg-gray-500 rounded-full absolute right-[-3px] bottom-[-2px]"></div>
                  )}
                </div>

                {profile.profilepic == "noprofile" ? (
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
                      src={`https://itmarketbucket.s3.us-east-1.amazonaws.com/${profile.profilepic}`}
                      alt=""
                    />
                  </div>
                )}
              </div>

              <div className="info flex-col ">
                <div className="profilename">{profile.username}</div>

                <div className="lastmessage">
                {(() => {
    const lastMessage = allmessages
      .filter(
        (filt) =>
          filt &&
          (filt?.messageby === profile.id || filt?.messageto === profile.id)
      )
      .at(-1);

    if (!lastMessage) return "No messages yet.";

    const isSentByYou = lastMessage.messageby !== profile.id;
    const senderName = isSentByYou
      ? "You:"
      : `${profile.username?.split(" ")[0]?.slice(0, 10) || "User"}:`;

    const preview = lastMessage.message?.slice(0, 15) || "";

    return `${senderName} ${preview}`;
  })()}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default function UserProfiles() {
  return (
    <Suspense>
      <UserProfilescontent></UserProfilescontent>
    </Suspense>
  );
}
