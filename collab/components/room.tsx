"use client"

import { RoomProvider } from "@/liveblocks.config";
import { Layer } from "@/types/canvas";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";

interface RoomProps {
    children: React.ReactNode;
    roomId: string;
    fallback:NonNullable<React.ReactNode> | null;
}

export const Room = ({ roomId, children,fallback }: RoomProps) => {
    return(
        <RoomProvider id={roomId} initialPresence={{cursor:null,selection:[],pencilDraft: null,pencilColor: null,}} initialStorage={{layers:new LiveMap<string,LiveObject<Layer>>(),layerIds:new LiveList()} }
        >
            <ClientSideSuspense fallback={fallback}>
                {()=>children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}