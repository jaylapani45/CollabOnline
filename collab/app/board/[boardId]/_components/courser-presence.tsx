"use client"

import { memo } from "react"
import { useOthersConnectionIds } from "@/liveblocks.config"
import { Courser } from "./courser"

export const Coursers = () => {
    const ids = useOthersConnectionIds()
    return(
        ids.map((connectionId)=>(
            <Courser
                key={connectionId}
                connectionId={connectionId}
            />
        ))
    )

}

export const CoursersPresence = memo(() => {
    return (
        <Coursers />
    )
})