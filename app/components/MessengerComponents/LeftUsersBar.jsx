"use client";
import { SearchIcon } from "lucide-react";
import React, { useEffect } from "react";
import UserProfiles from "./UserProfiles";

export default function LeftUsersBar() {
  return (
    <div className="leftuserbar h-[100%]    w-[100%] bg-gray-100">
      <div className="search p-[10px]">
        <div className="searchframe p-[10px] flex items-center justify-between bg-white border-1 border-gray-300 rounded-[5px]">
          <input
            className="w-[100%] outline-0"
            type="text"
            placeholder="Search"
          />
          <SearchIcon></SearchIcon>
        </div>
      </div>

      <div className="userslist p-[10px] w-[100%]">
        <h1>Chats</h1>

        <UserProfiles></UserProfiles>
      </div>
    </div>
  );
}
