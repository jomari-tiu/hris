"use client";

import React from "react";
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
    <section className="fixed top-0 left-0 h-screen w-screen bg-blue-2 flex justify-center items-center ">
      <div className=" bg-white w-full max-w-[40rem] space-y-2">
        <aside className=" w-full px-5 py-2 bg-blue-3 text-center">
          <h2 className=" text-white text-center tracking-wider">LOGIN</h2>
        </aside>
        <form onSubmit={handleSubmit(submitHandler)} className=" space-y-5 p-5">
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
                  <span className=" text-red">{errors?.username?.message}</span>
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
                  <span className=" text-red">{errors?.password?.message}</span>
                )}
              </aside>
            )}
          />
          <div className=" flex justify-between items-center">
            <p className=" cursor-pointer hover:underline">Forgot password?</p>
            <Button type="submit" appearance={"primary"}>
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
