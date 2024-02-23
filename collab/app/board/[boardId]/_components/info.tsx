"use client";

import { RenameBoard } from "@/app/(dashboard)/_components/rename-board";
import { Actions } from "@/components/actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  boardId: string;
}
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export const Info = ({ boardId }: InfoProps) => {
  const board = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  if (!board) return <Info.Skeleton />;

  const TabSaprator = () => {
    return <span className="px-2 text-neutral-400">|</span>;
  };

  return (
    <div className="absolute px-1.5 top-2 left-2 h-12  shadow-md bg-white rounded-md flex items-center">
      <Button variant="board">
        <Hint label="Go to boards" side="bottom" sideOffset={10}>
          <Link href="/" className="flex flex-row items-center justify-center">
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <span
              className={cn(
                "ml-2 text-xl font-semibold text-black",
                font.className
              )}
            >
              Collab
            </span>
          </Link>
        </Hint>
      </Button>
      <TabSaprator />


      <RenameBoard id={boardId} title={board.title}>
        <div className="text-sm">
          <Hint label="Rename board" side="bottom" sideOffset={10}>
        <Button variant="board" className="text-xs">
            <span className="text-black font-base text-normal">
              {board.title}
            </span>
        </Button>
          </Hint>
          </div>
      </RenameBoard>
        <TabSaprator />

        <Actions id={board._id} title={board.title} side="bottom" sideOffset={10}>
            <div className="text-sm">
                <Hint label="Main menu" side="bottom" sideOffset={10}>
                <Button variant="board"size='icon'>
                    <Menu />
                    </Button>
                </Hint>
            </div>
        </Actions>




    </div>
  );
};
Info.Skeleton = function InfoSkeleton() {
  return (
    <div className=" absolute px-1.5 top-2 left-2 h-12  shadow-md bg-white rounded-md flex items-center">
      <Skeleton className="w-[300px]"></Skeleton>
    </div>
  );
};
