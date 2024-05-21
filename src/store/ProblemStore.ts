import { create } from "zustand";

interface ProblemState {
  problemStatement: string,
  problemLevel:string,
  changeStatement: (statement:string) => void;
}

export const useProblemStore = create<ProblemState>((set)=>({
    problemStatement:"",
    problemLevel:"",
    changeStatement:(statement:string)=>set({problemStatement:statement})
}))
