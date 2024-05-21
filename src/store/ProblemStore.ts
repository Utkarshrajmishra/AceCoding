import { create } from "zustand";

interface ProblemState {
  statement: string;
  changeStatement: (problem:string) => void;
}

export const useProblemStore = create<ProblemState>((set)=>({
    statement:"",
    changeStatement:(problem:string)=>set({statement:problem})
}))
