import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
  width: "narrow" | "wide" | "regular";
};

function Modal({ children, onClose, show, width }: Props) {
  const elementRef: any = useRef(null);
  const [isSameHeight, setIsSameHeight] = useState(false);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const elementHeight = elementRef?.current?.offsetHeight;
    const HandlerResize = () => {
      if (windowHeight - 50 <= elementHeight) {
        setIsSameHeight(true);
      } else {
        setIsSameHeight(false);
      }
    };
    window.addEventListener("resize", HandlerResize);
    HandlerResize();
    return () => {
      window.removeEventListener("resize", HandlerResize);
    };
  });
  return (
    <>
      {show && (
        <div
          style={{ margin: 0 }}
          className={` bg-[#0000002f] fixed top-0 left-0 h-screen w-screen flex justify-center ${
            isSameHeight ? " items-start" : "items-center"
          } overflow-auto`}
        >
          <section
            ref={elementRef}
            className={` p-5 bg-white-0 border border-gray-200 rounded-sm ${
              width === "wide" && "w-10/12 1024px:w-11/12"
            } ${width === "regular" && "w-7/12 1024px:w-9/12 820px:w-11/12"} ${
              width === "narrow" && " w-4/12 1024px:w-6/12 820px:w-10/12"
            }`}
          >
            <aside className=" w-full flex justify-end mb-2">
              <AiOutlineClose
                onClick={() => {
                  onClose();
                }}
                className=" text-lg text-gray-300 cursor-pointer"
              />
            </aside>
            {children}
          </section>
        </div>
      )}
    </>
  );
}

export default Modal;
