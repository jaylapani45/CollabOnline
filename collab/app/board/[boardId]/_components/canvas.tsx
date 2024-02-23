"use client"

import { useSelf } from "@/liveblocks.config"
import { Info } from "./info"
import { Participants } from "./participants"
import { ToolBar } from "./toolbar"
import Image from "next/image"

interface CanvasProps {
        boardId:string;
}


export const Canvas = ({boardId}:CanvasProps) =>{
    const info = useSelf((me)=>me.info)
    console.log()
    return(
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants /> 
            <ToolBar />
            <div className="flex justify-center items-center">
            <h1 >hello {info?.name}</h1>
            </div>
        </main>
    )
}