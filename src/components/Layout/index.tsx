"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BiDownArrow } from "react-icons/bi";

import { CgMenuRight } from "react-icons/cg";

import { MdKeyboardArrowDown } from "react-icons/md";
import { useQueryClient } from "react-query";
import { CircleLoader, SyncLoader } from "react-spinners";

import { useFetch } from "@/util/api";

import AnimationContainer from "../Animation/animationContainer";
import { fadeDown } from "../Animation/animationVariants";
import { useGlobalState } from "../Context/AppMangement";
import PromptMessage from "../PromptMessage";
import { SideMenuLinks, SideMenuLinksType } from "./SideMenuUrls";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { notification, setNotification } = useGlobalState();
  const [isTab, setTab] = useState(undefined);
  const [profileMenu, setProfileMenu] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const [menu, setMenu] = useState(true);

  const { data: profile, isLoading } = useFetch(
    "user-profile",
    ["user-profile"],
    `/api/profile`
  );

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

  const SignOutHandler = async () => {
    try {
      const token = getCookie("user");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotification(true, "success", `Successfully Logout!`);
        queryClient.removeQueries();
        deleteCookie("user");
        window.localStorage.clear();
        router.refresh();
      } else if (response.status === 401) {
        setNotification(true, "error", "Authentication failed");
      }
    } catch (error) {
      setNotification(true, "error", "Something went Wront");
      deleteCookie("user");
      router.refresh();
    }
  };

  return (
    <main className=" w-full h-screen flex flex-wrap ">
      <AnimatePresence mode="wait">
        {notification.toggle && <PromptMessage />}
      </AnimatePresence>
      <section
        className={` ${
          !menu && "ml-[-20rem] 820px:ml-[-15rem]"
        }  duration-200 w-[20rem] 1024px:w-[15rem] relative h-full bg-white0 text-gray-400 flex flex-col items-center py-5 space-y-7`}
      >
        <aside className=" cursor-pointer duration-500 ease-in-out p-2 bg-ccgreen  text-white absolute top-0 left-full hover:shadow-lg hover:bg-ccgreen5 hover:text-black">
          <CgMenuRight onClick={() => setMenu(!menu)} />
        </aside>
        <Image src="/images/logo/logo.png" alt="logo" width={80} height={80} />
        <div className=" w-full overflow-auto ">
          <ul className=" w-full px-5 space-y-2">
            {SideMenuLinks.map((item, index) => (
              <Menu key={index} itemMenu={item} isTab={isTab} setTab={setTab} />
            ))}
          </ul>
        </div>
      </section>
      <section className=" h-full overflow-auto flex-1 border border-blue-500 p-10 820px:p-5 820px:pt-0 pt-0 bg-ccbgsecondary">
        <nav className=" flex justify-end py-5 820px:py-2 mb-5 820px:mb-3">
          <div
            className=" flex items-center gap-3 cursor-pointer relative"
            onClick={() => setProfileMenu(!profileMenu)}
          >
            <aside className=" relative h-10 aspect-square overflow-hidden rounded-full bg-gold">
              <Image
                src="/images/logo/logo.png"
                alt="profile picture"
                fill
                className=" object-cover"
              />
            </aside>
            <div className=" flex items-center space-x-3 cursor-pointer">
              {isLoading ? (
                <ul className=" text-lg animate-pulse flex gap-2">
                  <li className=" w-2 h-2 animate-pulse rounded-full bg-ccgreen"></li>
                  <li className=" w-2 h-2 animate-pulse rounded-full bg-ccgreen"></li>
                  <li className=" w-2 h-2 animate-pulse rounded-full bg-ccgreen"></li>
                </ul>
              ) : (
                profile?.data?.data?.name
              )}
              <MdKeyboardArrowDown className=" text-xl" />
            </div>
            {profileMenu && (
              <ul className=" absolute top-full right-0 w-[200px] shadow-md bg-white0">
                <Link href="/edit-profile">
                  <li className=" px-3 py-2 hover:bg-cchovergray duration-150 text-right">
                    Change Password
                  </li>
                </Link>
                <li
                  className=" px-3 py-2 hover:bg-cchovergray duration-150  text-right cursor-pointer"
                  onClick={SignOutHandler}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </nav>
        <section className=" space-y-5">{children}</section>
      </section>
    </main>
  );
}

export default Layout;

type MenuProps = {
  itemMenu: SideMenuLinksType;
  isTab: string | undefined;
  setTab: Function;
};
const Menu = ({ itemMenu, isTab, setTab }: MenuProps) => {
  const pathname = usePathname();
  return (
    <motion.li>
      {itemMenu.submenu ? (
        <motion.div
          onClick={() => {
            if (itemMenu.title === isTab) {
              setTab(undefined);
            } else {
              setTab(itemMenu.title);
            }
          }}
          className={` cursor-pointer gap-3 flex items-center justify-between rounded-md w-full font-medium text-black py-4 px-5 duration-200 ease-in-out ${
            pathname.includes(itemMenu.url)
              ? "bg-cchovergray text-black font-semibold"
              : "hover:bg-cchovergray text-black"
          }`}
        >
          <div className=" flex items-start gap-3">
            <div className=" aspect-square bg-ccgreen text-white p-1 rounded-md">
              {itemMenu.icon}
            </div>
            {itemMenu.title}
          </div>
          <BiDownArrow
            className={`duration-300 ease-in-out ${
              isTab === itemMenu.title && "rotate-180"
            }`}
          />
        </motion.div>
      ) : (
        <Link href={itemMenu.url} className=" w-full inline-block">
          <div
            className={` gap-3 flex items-center rounded-md w-full  text-black py-4 px-5 duration-200 ease-in-out ${
              pathname.includes(itemMenu.url)
                ? "bg-cchovergray text-black font-semibold"
                : "hover:bg-cchovergray text-black"
            }`}
          >
            <span className=" aspect-square bg-ccgreen text-white p-1 rounded-md">
              {itemMenu.icon}
            </span>
            {itemMenu.title}
          </div>
        </Link>
      )}

      {isTab === itemMenu.title && (
        <AnimationContainer variants={fadeDown}>
          {itemMenu?.submenu?.map((item, index) => (
            <Link href={item.url} key={index}>
              <motion.div
                className={` mt-2 gap-3 flex items-center rounded-md w-full  text-black py-4 px-5 pl-[3.5rem] duration-200 ease-in-out ${
                  pathname.includes(item.url)
                    ? "bg-cchovergray text-black font-semibold"
                    : "hover:bg-cchovergray text-black"
                }`}
              >
                {item.title}
              </motion.div>
            </Link>
          ))}
        </AnimationContainer>
      )}
    </motion.li>
  );
};
