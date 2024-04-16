"use client";

import { useOther } from "@/liveblocks.config";
import { MousePointer2 } from "lucide-react";
import { connectionIdtoColor } from "@/lib/utils";
import { memo } from "react";

interface CourserProps {
  connectionId: number;
}

export const Courser = memo(({ connectionId }: CourserProps) => {
  const info = useOther(connectionId, (user) => user.info);
  const courser = useOther(connectionId, (user) => user.presence.cursor);
  const conIdToColor = connectionIdtoColor(connectionId);
  const name = info?.name;

  if (!courser) {
    return null;
  }

  const { x, y } = courser;
  return (
    <foreignObject
      className="relative drop-shadow-md"
      height={50}
      width={name?.length! * 10 + 24}
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: conIdToColor,
          color: conIdToColor,
        }}
      />
      <div
        className="absolute left-5  px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: conIdToColor }}
      >
        {name}
      </div>
    </foreignObject>
  );
});
Courser.displayName = "Courser";
