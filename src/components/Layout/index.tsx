"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";

type Props = {
  children: React.ReactNode;
};

const SideMenuLinks = [
  {
    title: "HOME",
    url: "/",
  },
  {
    title: "HOME",
    url: "/",
  },
];

function Layout({ children }: Props) {
  const [menu, setMenu] = useState(true);
  return (
    <main className=" w-full min-h-screen flex flex-wrap border border-red-500">
      <section className=" relative w-[30rem] h-full border border-red-300 flex flex-col items-center py-10 overflow-auto space-y-5">
        <aside className=" cursor-pointer duration-500 ease-in-out p-2 bg-black text-white absolute top-0 right-0 hover:shadow-lg hover:bg-white hover:text-black">
          <CgMenuRight />
        </aside>
        <aside className=" w-[20%] border border-black aspect-square">
          LOGO
        </aside>
        <ul className=" w-full border">
          {SideMenuLinks.map((item, index) => (
            <Link
              href={item.url}
              className=" w-full  border border-blue-300 inline-block"
            >
              <li
                key={index}
                className=" w-full  border border-red-300 py-2 px-5"
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </section>
      <section className=" flex-1 border border-blue-500">{children}</section>
    </main>
  );
}

export default Layout;
