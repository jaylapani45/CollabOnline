"use client";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { Link2 } from "lucide-react"
import { Trash } from "lucide-react"

import { DropdownMenu,DropdownMenuContent,DropdownMenuSeparator,DropdownMenuTrigger,DropdownMenuItem } from "./ui/dropdown-menu"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import {v} from "convex/values"
import { useApiMutation } from "@/hooks/use-api-mutation";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";

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
            <DropdownMenuContent side="right" sideOffset={sideOffset} className="w-60" onClick={(e)=>e.stopPropagation()}>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={copyLink}>
                    <Link2 className="h-4 w-4 mr-2" />Copy board link
                </DropdownMenuItem>
                
                {/* <DropdownMenuItem className="p-3 cursor-pointer"> */}
                <ConfirmModal onConfirm={removeBoard} tittle="Delete board?" description="This will delete your board" >
                    <Button className="h-full w-full flex justify-start" variant="ghost">
                    <Trash className="h-4 w-4 mr-2" />Delete borad
                    </Button>
                </ConfirmModal>
                {/* </DropdownMenuItem> */}
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}