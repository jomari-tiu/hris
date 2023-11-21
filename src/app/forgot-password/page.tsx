"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

import Link from "next/link";

import { Controller, useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import PromptMessage from "@/components/PromptMessage";
import { usePost } from "@/util/api";

function ForgotPassword() {
  const { setNotification, notification } = useGlobalState();

  const success = () => {
    setNotification(true, "success", `Email Successfully Sent!`);
  };

  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: loginLoading, mutate: Login } = usePost(
    success,
    error,
    "/api/forgot-password",
    false,
    "",
    true
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<{ email: string }>();

  const submitHandler = (data: any) => {
    Login(data);
  };

  return (
    <section className=" h-screen w-screen bg-white flex justify-center items-center ">
      <AnimatePresence mode="wait">
        {notification.toggle && <PromptMessage />}
      </AnimatePresence>
      <ul className=" w-8/12 h-10/12 1024px:w-11/12 grid grid-cols-2 640px:grid-cols-1">
        <li className=" flex justify-center items-center bg-white-0 py-10">
          <aside className=" flex flex-wrap items-center justify-center gap-5 w-full">
            <Image
              src="/images/logo/logo.png"
              height={200}
              width={200}
              alt="Logo"
            />
          </aside>
        </li>
        <li className=" flex flex-col justify-center border-l p-10 space-y-10 1366px:space-y-5 bg-gradient-to-b from-[#e5fe00] to-[#b3c415] min-h-[60vh]">
          <div>
            <h2>Enter new password</h2>
            <p>Please enter your account email</p>
          </div>
          <form onSubmit={handleSubmit(submitHandler)} className=" space-y-5">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "required",
              }}
              render={({ field }) => (
                <aside>
                  <input
                    type="text"
                    placeholder="Username"
                    {...field}
                    className=" w-full"
                  />
                  {errors?.email?.message && (
                    <span className=" text-black">
                      {errors?.email?.message}
                    </span>
                  )}
                </aside>
              )}
            />

            <div className=" flex justify-between items-center">
              <Button
                type="submit"
                appearance={"primary"}
                loading={loginLoading}
              >
                SEND EMAIL
              </Button>
            </div>
          </form>
        </li>
      </ul>
    </section>
  );
}

export default ForgotPassword;
