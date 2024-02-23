"use client"
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";

interface AllUserAvatarProps{
    src?:string,
    name?:string
    fallback?:string,
    borderColor?:string
}


export const AllUserAvatar = ({src,name,fallback,borderColor}:AllUserAvatarProps) =>{

    return(
        <div className="text-md flex flex-col items-center max-w-[60px]">
            <Avatar className="h-8 w-8 border-2" style={{borderColor}}>
                <AvatarImage src={src} />
                <AvatarFallback className="text-xs">
                    {fallback}
                </AvatarFallback>
            </Avatar>
                <span className="text-black text-center">{name}</span>
        </div>
    )

}