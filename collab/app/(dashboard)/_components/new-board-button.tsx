import { Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { error } from "console";

interface NewBoardButtonProps{
  orgId:string,
  disabled?:boolean
}

export const NewBoardButton = ({orgId,disabled}:NewBoardButtonProps) => {
  const [pending , setPending] = useState(false)
  const router = useRouter();
  const create = useMutation(api.board.create);
  const onClick = () => {
    setPending(true);
    create(
      { title: "untitled", orgId }
      
      )
      .finally(()=>setPending(false))
      .then((id)=>{ toast.success("Board created");
      router.push(`/board/${id}`)
    })
      .catch((error)=>toast.error("Something went wrong"))
      
  };
  return (
    <button
      className={cn("aspect-[100/127] bg-blue-600 rounded-lg flex flex-col justify-center items-center hover:bg-blue-800", (disabled||pending) && ("opacity-75 hover:bg-blue-600 curser-not-allowed"))}
      onClick={onClick}
      disabled={ pending || disabled}
    >
      <Plus className="text-white stroke-1 h-12 w-12" />
      <p className="text-white text-xs">New board</p>
    </button>
  );
};
