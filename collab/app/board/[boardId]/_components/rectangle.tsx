import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps{
    id:string,
    layer:RectangleLayer;
    onLayerPointerDown:(e:React.PointerEvent,layerId:string)=>void;
    selectionColor?:string;
}

export const Rectangle = ({id,layer,onLayerPointerDown,selectionColor}:RectangleProps) => {
    const {x,y,width,height,fill} = layer

    return(
        <rect
        className="drop-shdow-md"
        onPointerDown={(e)=>onLayerPointerDown(e,id)}
        style={{transform:`translate(${x}px,${y}px)`}}
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={1}
        fill={fill? colorToCss(fill):"#ccc"}
        stroke={selectionColor ||"transparent" }
        />
    )
}