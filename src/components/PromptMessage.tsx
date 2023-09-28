"use client";

import React, { useEffect } from "react";

import AnimationContainer from "./Animation/animationContainer";
import { fadeDown } from "./Animation/animationVariants";
import { useGlobalState } from "./Context/AppMangement";

function PromptMessage() {
  const { setNotification, notification } = useGlobalState();
  useEffect(() => {
    const intervalPrompt = setInterval(
      () => {
        setNotification(false, notification.type, notification.message);
      },
      notification.type === "error" ? 6000 : 3000
    );
    return () => clearInterval(intervalPrompt);
  }, [notification.toggle]);

  return (
    <AnimationContainer
      variants={fadeDown}
      className={`${
        notification.type === "success" && "bg-[#65c85c] flex flex-col"
      } ${notification.type === "error" && "bg-red-2"} ${
        notification.type === "warning" && "bg-[#cf9846]"
      } transition duration-75 min-w-[15rem] fixed top-10 right-10 480px:top-5 480px:right-5 z-[99999999] 820px:p-3 opacity-90 p-4 shadow-lg`}
    >
      <p className=" capitalize text-white text-lg mb-1">{notification.type}</p>

      {typeof notification.message === "object" ? (
        <>
          {notification?.message?.map((item: string, index: number) => (
            <p key={index} className=" text-white">
              {item}
            </p>
          ))}
        </>
      ) : (
        <p className=" text-white">{notification.message}</p>
      )}
    </AnimationContainer>
  );
}

export default PromptMessage;
