import { useOrganization } from "@clerk/nextjs";
import { useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface itemProps {
    id: string;
    name: string;
    imageUrl: string;
}

;


export const Item = ({ id, name, imageUrl }: itemProps) => {

    const { organization } = useOrganization();
    const { setActive } = useOrganizationList()

    const isActive = organization?.id === id;

    const onClick = () => {
        if (!setActive) return;
        setActive({organization:id});
    }


    return (
        <>
        <div className="aspect-square relative">
        <Hint label={`${name}'s organization`} side="right" align="center" sideOffset={5} alignOffset={5}>
            <Image
                fill
                sizes="100%"
                src={imageUrl}
                alt={name}
                onClick={onClick}
                className={cn("cursor-pointer rounded-md opacity-60 hover:opacity-100 transition", isActive && "opacity-100")}

            />
        </Hint>
        </div>
        </>
    )
};