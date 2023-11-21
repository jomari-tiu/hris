"use client";

import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { AnimatePresence } from "framer-motion";

import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";

import { usePost } from "@/util/api";

import Button from "../../Button";
import { useGlobalState } from "../../Context/AppMangement";
import PromptMessage from "../../PromptMessage";

function Login() {
  const router = useRouter();
  const { setNotification, notification } = useGlobalState();

  const success = (response: any) => {
    setNotification(true, "success", `Login successfully!, Hello there.`);
    setCookie("user", response?.data?.data?.token);
    router.refresh();
  };

  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: loginLoading, mutate: Login } = usePost(
    success,
    error,
    "/api/login",
    false,
    "",
    true
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const submitHandler = (data: any) => {
    Login(data);
  };

  const googleLoginHandler = () => {};

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
        <li className=" border-l p-10 space-y-10 1366px:space-y-5 bg-gradient-to-b from-[#e5fe00] to-[#b3c415]">
          <div>
            <h2>User Login</h2>
            <p>Choose one of the option to go</p>
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
            <Controller
              name="password"
              control={control}
              rules={{
                required: "required",
              }}
              render={({ field }) => (
                <aside>
                  <input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className=" w-full"
                  />
                  {errors?.password?.message && (
                    <span className=" text-black">
                      {errors?.password?.message}
                    </span>
                  )}
                </aside>
              )}
            />
            <div className=" flex justify-between items-center">
              <Link href="/forgot-password"> Forgot password?</Link>
              <Button
                type="submit"
                appearance={"primary"}
                loading={loginLoading}
              >
                LOGIN
              </Button>
            </div>
          </form>

          <div className=" flex justify-center">
            <p>Or continue with</p>
          </div>

          <Button
            appearance={"default"}
            className=" w-full flex items-center justify-center"
            onClick={googleLoginHandler}
          >
            <div>
              <Image
                src="/images/logo/google-1.png"
                height={100}
                width={100}
                alt="google"
              />
            </div>
            Sign in with Google
          </Button>
        </li>
      </ul>
    </section>
  );
}

export default Login;
