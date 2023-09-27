import React from "react";
import { create } from "zustand";
// gamitin ang persist para kahit mag reload di re-fresh ung data
import { persist, devtools } from "zustand/middleware";

type info = {
  name: string;
  age: number;
};

type globalState = {
  isAppLoading: boolean;
  setAppLoading: (isLoading: boolean) => void;
  // SAMPLE OF OBJECT TYPE
  // info: info;
  // setInfo: (name: string, age: number) => void;
};

export const useGlobalState = create<globalState>()((set) => ({
  isAppLoading: false,
  setAppLoading: (isAppLoadingpr: boolean) =>
    set({ isAppLoading: isAppLoadingpr }),
  // info: { name: "", age: 0 },
  // setInfo: (name: string, age: number) => set({ info: { name, age } }),
}));

// how call in component/pages
// const { info, setInfo } = useGlobalState();
