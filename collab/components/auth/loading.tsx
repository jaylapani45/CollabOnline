import Image from "next/image";

export const Loading = () =>{
    return(
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image src="/logo.gif" alt="loading" width={100} height={100} priority={true}/>
        </div>
    )
}