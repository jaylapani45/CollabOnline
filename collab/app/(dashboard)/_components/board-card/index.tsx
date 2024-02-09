import Image from "next/image"
import { Overlay } from "./overlay"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { CopyIcon, Edit, MenuIcon, MoreHorizontalIcon } from "lucide-react";


interface BoardCardProps {
    id:string,
    orgId:string
    title:string
    authorId:string
    authorName:string
    imageUrl:string
    time:number
    isFavorite:boolean

}
export const BoardCard = ({id,orgId,title,authorId,authorName,imageUrl,time,isFavorite}:BoardCardProps) =>{
    const {userId} = useAuth();

    const authorLabel = authorId===userId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(time,{
        addSuffix:true
    })
    
    return(
        <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] flex justify-between flex-col overflow-hidden rounded-md border border-black border-opacity-15">
            
            <div className="relative flex-1 bg-amber-50">
            <Image src={imageUrl} alt={title} fill className="object-fit"/>
            <Overlay />
            <Actions id={id} title={title} side="right">
                <button className="z-1 absolute top-3 right-3 opacity-0 group-hover:opacity-75 outline-none"><Edit className="stroke-1 h-5 w-5 opacity-75 hover:opacity-1000 hover:scale-125" /></button>
            </Actions>
            </div>
            <Footer
                isFavorite={isFavorite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createdAtLabel}
                onClick={()=>{}}
                disabled={true}
             />
        </div>
        </Link>
    )
}
BoardCard.Skeleton = function BoardCardSkeleton(){
    return(
    <div className="group aspect-[100/127] overflow-hidden rounded-md">
        <Skeleton className="h-full w-full"></Skeleton>
    </div>
    )
}