"use client";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { FileEdit, Link2 } from "lucide-react"
import { Trash } from "lucide-react"

import { DropdownMenu,DropdownMenuContent,DropdownMenuSeparator,DropdownMenuTrigger,DropdownMenuItem } from "./ui/dropdown-menu"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import {v} from "convex/values"
import { useApiMutation } from "@/hooks/use-api-mutation";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { RenameBoard } from "@/app/(dashboard)/_components/rename-board";

interface ActionProps{
    children:React.ReactNode
    id:string,
    title:string,
    side?:DropdownMenuContentProps["side"],
    sideOffset?:DropdownMenuContentProps["sideOffset"],
}

export const Actions=({children,id,title,side,sideOffset}:ActionProps)=>{
    const {mutate ,pending} = useApiMutation(api.board.remove)
    const copyLink = ()=>{
        navigator.clipboard.writeText(`${window.location.origin}/boards/${id}`)
        .finally(()=>toast.success("Link copied"))
        .catch(()=>toast.error("Failed to copy link"))
    }
    const removeBoard = () =>{
        mutate({id})
        .then(()=>toast.success("Board removed"))
        .catch(()=>toast.error("Failed to remove board"))
    }
    
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset} className="w-60" onClick={(e)=>e.stopPropagation()}>
                <DropdownMenuItem className="cursor-pointer m-0 p-0">
                <Button className="h-full w-full flex justify-start p-3 " variant="ghost" onClick={copyLink}>
                    <Link2 className="h-4 w-4 mr-2" /><span> Copy board link </span>
                </Button>
                </DropdownMenuItem>
                <RenameBoard id={id} title={title}>
                {/* <DropdownMenuItem> */}
                <Button className="h-full w-full flex justify-start p-3 " variant="ghost">
                    <FileEdit className="h-4 w-4 mr-2 " />Rename board
                </Button>
                {/* </DropdownMenuItem> */}
                </RenameBoard>
                
                {/* <DropdownMenuItem className="p-3 cursor-pointer"> */}
                <ConfirmModal onConfirm={removeBoard} tittle="Delete board?" description="This will delete your board" >
                    <Button className="h-full w-full flex justify-start p-3" variant="ghost">
                    <Trash className="h-4 w-4 mr-2" />Delete borad
                    </Button>
                </ConfirmModal>
                {/* </DropdownMenuItem> */}
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}