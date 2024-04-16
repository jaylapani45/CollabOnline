"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useMutation } from "convex/react";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoard = () => {
    const router  = useRouter();
    const [pending,setPending]= useState(false);
    const {organization} = useOrganization();

    const create = useMutation(api.board.create);

    const onClick = ()=>{
        if(!organization) return;
        setPending(true);
        create({
            orgId:organization.id,
            title:"check",
        })
        .finally(()=>setPending(false))
        .then((id)=>{toast.success("board created");
        router.push(`/board/${id}`)
        })
        .catch((error)=>{toast.error(error)})

    }

    ({orgId:organization!.id,title:"check"})


    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
        <Image src="/note.svg" alt="empty" width={110} height={110} priority={true} />
        <h2 className="font-semibold text-2xl mt-6">Create your first board!</h2>
        <p className="text-muted-foreground textg-sm mt-2">Start by creating a board for your organization</p>
        <div className="mt-6">
        <Button size="lg" disabled={pending} onClick={onClick}>Create board</Button>
        </div>
        </div>
    )
}