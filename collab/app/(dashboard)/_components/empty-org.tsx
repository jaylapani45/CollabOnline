import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"
export const EmptyOrg = ()=>{
    return(
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image src="/elements.svg" alt="loading"  width={200} height={200} priority={true}/>
            <h2 className="font-semibold text-2xl mt-6">Welcome to Board</h2>
            <p className="text-md mt-2">Create an organization to get started</p>
            <div className="mt-6 ">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" size="lg">Create organization</Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-none max-w-[480px] bg-transparent">
                    <CreateOrganization />
                </DialogContent>
            </Dialog>
            </div>
        </div>
    )
}