import { Skeleton } from "@/components/ui/skeleton"

export const Participants = () =>{
    return(
        <div className="absolute h-12 px-1.5 top-2 right-2 rounded-md shadow-md flex items-center bg-white">
            List of participants
        </div>
    )
}

Participants.Skeleton = function ParticipantsSkeleton(){
    return(
        <div className="w-[250px] absolute h-12 top-2 right-2 rounded-md shadow-md flex items-center bg-white">
            <Skeleton className="h-full w-full"></Skeleton>
        </div>
    )
}