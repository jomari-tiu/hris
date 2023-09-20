import React from "react";
import { create } from "zustand";
// gamitin ang persist para kahit mag reload di re-fresh ung data
import { persist, devtools } from "zustand/middleware";

type info = {
  name: string;
  age: number;
};

type GeneraState = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const useGenerationStore = create<GeneraState>()((set) => ({
  isLoading: false,
  setLoading: (isLoadingpr: boolean) => set({ isLoading: isLoadingpr }),
}));
