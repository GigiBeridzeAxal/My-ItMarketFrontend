"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../../store/useAuth";
import { Star } from "lucide-react";
import Link from "next/link";
import useSocket from "../../store/useSocket";
import Loading from "../Loading";
import PreLoader from "../MessengerComponents/PreLoader";

export default function FreelancerMain() {
  const { freelancersdata, getfreelancerusers, freelancerloading } = useAuth();
  const [openeddescription, setopeneddescription] = useState([]);

  const { connecttoserver } = useSocket();

  useEffect(() => {
    getfreelancerusers();
  }, []);

  return (
    <div className="freelancersmain p-[20px]">
      <div className="freelancersframe">
        {freelancerloading && freelancersdata[0] == undefined ? (
                <PreLoader preloaderlocat={"Freelancer"}></PreLoader>
        ) : null}

        {freelancersdata.map((data, id) => {
          let openeddesc = false;

          return (
            <div className="flex items-start gap-[15px]" key={id}>
              <div className="profile">
                {data.profilepic == "noprofile" ? (
                  <img
                    className="w-[150px] h-[150px] p-[10px] border-1 border-gray-100"
                    src="/noprofile.webp"
                  ></img>
                ) : (
                  <img
                    className="w-[150px] h-[150px] p-[10px] border-1 border-gray-100"
                    src={`https://itmarketbucket.s3.us-east-1.amazonaws.com/${data.profilepic}`}
                  ></img>
                )}
              </div>
              <div className="maindetails flex flex-col gap-[10px]">
                <div className="firstline  text-[24px]">
                  <div className="flex  items-center justify-between">
                    <div className="">
                      {data.username} |{" "}
                      <Link
                        href={`/profile?profileid=${data.id}`}
                        className="font-[400] text-[20px]"
                      >
                        @{data.email.split("@")[0]}{" "}
                      </Link>{" "}
                    </div>{" "}
                    <Link
                      href={`/Message?profileid=${data.id}`}
                      className="p-[10px] cursor-pointer bg-blue-500 text-white text-[16px] rounded-[3px]"
                    >
                      Contact
                    </Link>
                  </div>

                  <div className="secondline flex items-center gap-[10px]">
                    <div className="stars flex items-center gap-[15px]">
                      {" "}
                      <Star className="size-[30px]"></Star>{" "}
                      <Star className="size-[30px]"></Star>{" "}
                      <Star className="size-[30px]"></Star>{" "}
                      <Star className="size-[30px]"></Star>{" "}
                      <Star className="size-[30px]"></Star>{" "}
                      <span className="text-[24px] font-[500]">0.0</span> |{" "}
                      <span className="text-[20px]">Reviews: 0</span>
                    </div>
                  </div>

                  <div className="thirdline text-[16px] font-[700]">
                    {!data.headline ? "No Headline" : data.headline}
                  </div>

                  <button
                    onClick={() =>
                      setopeneddescription([...openeddescription, data.id])
                    }
                    className={`fourline ${
                      openeddescription.includes(data.id)
                        ? "whitespace-pre-line"
                        : ""
                    }  cursor-pointer text-start text-[16px] w-[650px]`}
                  >
                    {" "}
                    {!data.description
                      ? "No Description"
                      : data.description?.length > 80 &&
                        !openeddescription.includes(data.id)
                      ? data.description.slice(0, 80) + " ... More"
                      : data.description}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
