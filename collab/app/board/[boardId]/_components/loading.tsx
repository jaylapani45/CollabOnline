"use client"
import { Loader } from "lucide-react";
import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";

export const Loading = () => {
  return (
    <div className="h-full w-full">
      <main className="h-full w-full relative bg-neutral-100 touch-none flex justify-center items-center">
        <Loader className="h-6 w-6 animate-spin" />
      </main>
      <Info.Skeleton />
      <Participants.Skeleton />
      <ToolBar.Skeleton />
    </div>
  );
};
