"use client";

import React from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import Button from "../Button";

function Login() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<{ username: string; password: string }>();

  const submitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <section className=" h-screen w-screen bg-white flex justify-center items-center ">
      <ul className=" w-10/12 h-10/12 1024px:w-11/12 grid grid-cols-2 640px:grid-cols-1">
        <li className=" flex justify-center items-center">
          <aside className=" flex flex-wrap items-center justify-center gap-5 w-full">
            <Image
              src="/images/logo/logo.png"
              height={180}
              width={180}
              alt="Logo"
            />
            <Image
              src="/images/logo/logo-text.png"
              height={200}
              width={300}
              alt="Logo"
            />
          </aside>
        </li>
        <li className=" border-l p-10 space-y-10 1366px:space-y-5">
          <div>
            <h2>User Login</h2>
            <p>Choose one of the option to go</p>
          </div>
          <form onSubmit={handleSubmit(submitHandler)} className=" space-y-5">
            <Controller
              name="username"
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
                  {errors?.username?.message && (
                    <span className=" text-red">
                      {errors?.username?.message}
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
                    type="text"
                    placeholder="Password"
                    {...field}
                    className=" w-full"
                  />
                  {errors?.password?.message && (
                    <span className=" text-red">
                      {errors?.password?.message}
                    </span>
                  )}
                </aside>
              )}
            />
            <div className=" flex justify-between items-center">
              <p className=" cursor-pointer hover:underline">
                {/* Forgot password? */}
              </p>
              <Button type="submit" appearance={"primary"}>
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
