"use client";
import React from "react";
import Header from "../Header.jsx";
import LeftUsersBar from "./LeftUsersBar.jsx";
import "../MessengerComponents/messenger.css";
import MessageBox from "./MessageBox.jsx";

export default function MainMessanger() {
  return (
    <>
      <section className="h-[100%]">
        <Header></Header>

        <div className="messangerframe w-[100%] flex h-[100%] ">
          <div className="leftbar min-w-[320px]  w-[20%] h-[100%] ">
            <LeftUsersBar></LeftUsersBar>
          </div>

          <div className="messagesbox w-[100%]  ">
            <MessageBox></MessageBox>
          </div>
        </div>
      </section>
    </>
  );
}
