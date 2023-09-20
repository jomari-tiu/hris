"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    title: "Employee Management",
    url: "/employee-management",
  },
  {
    title: "Timekeeping",
    url: "/timekeeping",
  },
  {
    title: "Leave Records",
    url: "/leave-records",
  },
  {
    title: "Performance Management",
    url: "/performance-management",
  },
  {
    title: "HR Analytics and Reports",
    url: "/hr-analytics-and-report",
  },
  {
    title: "Admin Settings",
    url: "/admin-settings",
  },
  {
    title: "System Settings",
    url: "/system-settings",
  },
];

function Layout({ children }: Props) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(true);
  useEffect(() => {
    const HandlerResize = () => {
      if (window.innerWidth <= 820) {
        setMenu(false);
      } else {
        setMenu(true);
      }
    };
    window.addEventListener("resize", HandlerResize);
    HandlerResize();
    return () => {
      window.removeEventListener("resize", HandlerResize);
    };
  }, []);
  return (
    <main className=" w-full h-screen flex flex-wrap ">
      <section
        className={` ${
          !menu && "ml-[-20rem] 820px:ml-[-15rem]"
        }  duration-200 w-[20rem] 1024px:w-[15rem] relative h-full bg-blue-3 text-white flex flex-col items-center py-5 space-y-5`}
      >
        <aside className=" cursor-pointer duration-500 ease-in-out p-2 bg-black text-white absolute top-0 left-full hover:shadow-lg hover:bg-white hover:text-black">
          <CgMenuRight onClick={() => setMenu(!menu)} />
        </aside>
        <aside className=" w-[20%] border border-black aspect-square flex justify-center items-center">
          HR
        </aside>
        <div className=" w-full overflow-auto ">
          <ul className=" w-full bg-blue ">
            {SideMenuLinks.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className=" w-full inline-block"
              >
                <li
                  className={` border-b border-blue-3 w-full text-white py-4 px-5 duration-200 ease-in-out ${
                    pathname === item.url ? "bg-blue-3" : "hover:bg-blue-2"
                  }`}
                >
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
      <section className=" h-full overflow-auto flex-1 border border-blue-500 p-10">
        {children}
      </section>
    </main>
  );
}

export default Layout;
