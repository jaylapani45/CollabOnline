"use client"

import { memo } from "react"
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config"
import { Courser } from "./courser"
import { shallow } from "@liveblocks/client"
import { Path } from "./path"
import { colorToCss } from "@/lib/utils"

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

const Draft = () => {
    const others = useOthersMapped(
      (other) => ({
        pencilDraft: other.presence.pencilDraft,
        pencilColor: other.presence.pencilColor,
      }),
      shallow
    );
  
    return (
      <>
        {others.map(([key, other]) => {
          if (other.pencilDraft) {
            return (
              <Path
                key={key}
                x={0}
                y={0}
                points={other.pencilDraft}
                fill={other.pencilColor ? colorToCss(other.pencilColor) : "#000"}
              />
            );
          }
          return null;
        })}
      </>
    );
  };

export const CoursersPresence = memo(() => {
    return (
        <>
        <Draft />
        <Coursers />
        </>
    )
})
CoursersPresence.displayName = "CoursersPresence"