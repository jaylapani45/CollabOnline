import { Tooltip,TooltipTrigger,TooltipContent,TooltipProvider } from "@radix-ui/react-tooltip";

export interface HintProps {
    children: React.ReactNode;
    label: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}


export const Hint = ({children,label,side,align,sideOffset,alignOffset}:HintProps) =>{
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className="text-white bg-black border-black rounded-sm p-2 text-xs" side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
                {label}
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}