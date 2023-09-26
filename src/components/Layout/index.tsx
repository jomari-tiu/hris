"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiDownArrow } from "react-icons/bi";
import { CgMenuRight } from "react-icons/cg";

import { MdKeyboardArrowDown } from "react-icons/md";

import AnimationContainer from "../Animation/animationContainer";
import { fadeDown } from "../Animation/animationVariants";
import { SideMenuLinks, SideMenuLinksType } from "./SideMenuUrls";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const [isTab, setTab] = useState(undefined);

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
        }  duration-200 w-[20rem] 1024px:w-[15rem] relative h-full bg-white text-gray-400 flex flex-col items-center py-5 space-y-7`}
      >
        <aside className=" cursor-pointer duration-500 ease-in-out p-2 bg-red-2  text-white absolute top-0 left-full hover:shadow-lg hover:bg-red hover:text-red-2">
          <CgMenuRight onClick={() => setMenu(!menu)} />
        </aside>
        <Image
          src="/images/logo/sb-logo.png"
          alt="logo"
          width={150}
          height={100}
        />
        <div className=" w-full overflow-auto ">
          <ul className=" w-full px-5 space-y-2">
            {SideMenuLinks.map((item, index) => (
              <Menu key={index} itemMenu={item} isTab={isTab} setTab={setTab} />
            ))}
          </ul>
        </div>
      </section>
      <section className=" h-full overflow-auto flex-1 border border-blue-500 p-10 820px:p-5 820px:pt-0 pt-0">
        <nav className=" flex justify-end py-5 820px:py-2 mb-5 820px:mb-3">
          <div className=" flex items-center gap-3">
            <aside className=" relative h-10 aspect-square overflow-hidden rounded-full bg-gold">
              <Image
                src="/images/logo/logo.png"
                alt="profile picture"
                fill
                className=" object-cover"
              />
            </aside>
            <div className=" flex items-center space-x-3 cursor-pointer">
              <p>Jomari Tiu</p>
              <MdKeyboardArrowDown className=" text-xl" />
            </div>
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
          className={` cursor-pointer gap-3 flex items-center justify-between rounded-md w-full  text-gray-400 py-4 px-5 duration-200 ease-in-out ${
            pathname.includes(itemMenu.url)
              ? "bg-red text-red-2 font-bold"
              : "hover:bg-red text-gray-400"
          }`}
        >
          <div className=" flex items-start gap-3">
            <div className=" aspect-square bg-red-2 text-white p-1 rounded-md">
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
            className={` gap-3 flex items-center rounded-md w-full  text-gray-400 py-4 px-5 duration-200 ease-in-out ${
              pathname === itemMenu.url
                ? "bg-red text-red-2 font-bold"
                : "hover:bg-red text-gray-400"
            }`}
          >
            <span className=" aspect-square bg-red-2 text-white p-1 rounded-md">
              {itemMenu.icon}
            </span>
            {itemMenu.title}
          </div>
        </Link>
      )}

      <AnimatePresence mode="wait">
        {isTab === itemMenu.title && (
          <AnimationContainer variants={fadeDown}>
            {itemMenu?.submenu?.map((item, index) => (
              <Link href={item.url} key={index}>
                <motion.div
                  className={` mt-2 gap-3 flex items-center rounded-md w-full  text-gray-400 py-4 px-5 pl-[3.5rem] duration-200 ease-in-out ${
                    pathname === item.url
                      ? "bg-red text-red-2 font-bold"
                      : "hover:bg-red text-gray-400"
                  }`}
                >
                  {item.title}
                </motion.div>
              </Link>
            ))}
          </AnimationContainer>
        )}
      </AnimatePresence>
    </motion.li>
  );
};
