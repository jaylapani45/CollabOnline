"use client"
import { Dialog,DialogContent,DialogTrigger,DialogHeader,DialogFooter,DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useState } from "react";
import { AlertDialog,AlertDialogCancel,AlertDialogDescription,AlertDialogHeader,AlertDialogTrigger,AlertDialogTitle, AlertDialogAction,AlertDialogContent , AlertDialogFooter} from "@/components/ui/alert-dialog"
import { ConfirmModal } from "@/components/confirm-modal";
import { Input } from "@/components/ui/input";

interface renameBoardProps {
    children:React.ReactNode;
    id:string;
    title:string
}

export const RenameBoard = ({children,id,title}:renameBoardProps) =>{

    const [newTitle,setTitle] = useState(title)

    const {mutate,pending} = useApiMutation(api.board.edit)

     const Rename = () =>{
        console.log(newTitle)
        mutate({id:id,title:newTitle})
        .then(()=>toast.success("Board edited"))
        .catch((e)=>console.log("Failed to edit board"+e))
        
    }

    return (
        <div>
            {/* <Dialog>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename Board</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        
                        <input type="text" id="input" onChange={(e)=>setTitle(e.target.value)} value={newTitle} />
                        <DialogFooter>    
                        <button onClick={Rename}>Rename</button>
                        <DialogClose>
                            <button>Cancel</button>
                        </DialogClose>
                        </DialogFooter>
                        
                    </DialogDescription>
                </DialogContent>
            </Dialog> */}

<AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle><p>Rename board</p></AlertDialogTitle>
                <AlertDialogDescription><Input type="text"  onChange={(e)=>setTitle(e.target.value)} value={newTitle}/></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={!newTitle} onClick={Rename}>Rename</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
        </div>
    )
}