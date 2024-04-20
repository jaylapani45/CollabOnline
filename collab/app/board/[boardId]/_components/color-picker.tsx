"use client"

import { Input } from "@/components/ui/input";
import { colorPickerToColor, colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";
import { Plus } from "lucide-react";

interface ColorPickerProps {
    onChange: (color: Color) => void,
}

export const ColorPicker = ({ onChange}: ColorPickerProps) => {
    return(
        <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2  border-r border-neutral-300">
           <ColorButton color={{r:243,g:82,b:35}} onClick={onChange} />
            <ColorButton color={{r:255,g:177,b:37}} onClick={onChange} />
           <ColorButton color={{r:255,g:249,b:177}} onClick={onChange} />
            <ColorButton color={{r:16,g:185,b:129}} onClick={onChange} />
            <ColorButton color={{r:0,g:0,b:0}} onClick={onChange} />
            <ColorButton color={{r:39,g:142,b:237}} onClick={onChange} />
            <div className=" w-8 h-8 flex justify-center items-center border rounded-md m-0 p-0">
            <Plus  className="absolute w-7 h-7" />
            <Input type="color" className=" border-none m-0 p-0 opacity-0" onChange={(e)=>onChange(colorPickerToColor(e.target.value))} />
            </div>


        </div>
    )
}

interface ColorButtonProps {
    color:Color,
    onClick: (color: Color) => void

}

export const ColorButton = ({color,onClick}:ColorButtonProps) => {
    return(
    <button className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition" onClick={()=>onClick(color)}>
        <div className="w-8 h-8 rounded-md border border-neutral-300" 
        style={{background:colorToCss(color)}}/>
    </button>
    )
}