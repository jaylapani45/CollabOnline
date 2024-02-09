"use client";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";

interface DashBoardProps {
    searchParams:{
        search?: string;
        favorite?: boolean;

    }
}
export default function DashBoard({searchParams}: DashBoardProps) {
    const {organization} = useOrganization();
    return (
        <div className="h-[calc(100%-80px)] flax-1 p-6">
            
            {!organization ? (
            <EmptyOrg />
            ):(
            <BoardList 
            orgId={organization.id}
            query={searchParams}
            /> 
            )}
        </div>
    );
}
