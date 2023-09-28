import React from "react";
import { create } from "zustand";
// gamitin ang persist para kahit mag reload di re-fresh ung data
import { persist, devtools } from "zustand/middleware";

type globalState = {
  isAppLoading: boolean;
  setAppLoading: (isLoading: boolean) => void;
  notification: {
    toggle: boolean;
    type: "success" | "error" | "warning";
    message: any;
  };
  setNotification: (
    toggle: boolean,
    type: "success" | "error" | "warning",
    message: any
  ) => void;
};

export const useGlobalState = create<globalState>()((set) => ({
  isAppLoading: false,
  setAppLoading: (isAppLoadingpr: boolean) =>
    set({ isAppLoading: isAppLoadingpr }),
  notification: { toggle: false, type: "success", message: "" },
  setNotification: (
    toggle: boolean,
    type: "success" | "error" | "warning",
    message: any
  ) => set({ notification: { toggle, type, message } }),
}));

// how call in component/pages
// const { info, setInfo } = useGlobalState();
