import { Dialog,DialogContent,DialogTrigger } from "@/components/ui/dialog";;
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrganizationProfile } from "@clerk/nextjs";

export const InviteMember = () => {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus />
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent max-w-[880px]">
                <div className="flex justify-center m-0">
                    <OrganizationProfile
                      />
                    </div>
            </DialogContent>

        </Dialog>
        // <></>
    )
}