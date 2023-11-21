"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

import AnimationContainer from "../Animation/animationContainer";
import { fadeIn } from "../Animation/animationVariants";

type Props = {
  isLoading: boolean;
};
function LoadingScreen({ isLoading }: Props) {
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <AnimationContainer
            variants={fadeIn}
            className=" fixed top-0 left-0 h-screen w-screen m-0 bg-white z-50 flex justify-center items-center flex-col"
          >
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              width={150}
              height={100}
              className=" animate-spin-slow"
            />
            <h3 className=" text-black font-medium motion-safe:animate-pulse mt-2 tracking-widest">
              Loading...
            </h3>
          </AnimationContainer>
        )}
      </AnimatePresence>
    </>
  );
}

export default LoadingScreen;
