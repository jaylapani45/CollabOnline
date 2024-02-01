"use client"
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog,DialogContent,DialogTrigger } from "@/components/ui/dialog";

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                <button className="flex items-center justify-center w-full h-full rounded-md bg-white/25 opacity-60 hover:opacity-100">
                    <Plus className="text-white" size={24} />
                </button>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
};  
