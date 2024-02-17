import { Skeleton } from "@/components/ui/skeleton"

export const Info = () =>{
    return(
        <div className="absolute px-1.5 top-2 left-2 h-12  shadow-md bg-white rounded-md flex items-center">       
        TODO:give information about board
        </div>
    )
}
Info.Skeleton = function InfoSkeleton(){
    return(
        <div className=" absolute px-1.5 top-2 left-2 h-12  shadow-md bg-white rounded-md flex items-center">
            <Skeleton className="w-[300px]"></Skeleton>
        </div>       
    )
}