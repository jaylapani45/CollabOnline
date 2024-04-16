import { Camera, Color, Points, Side, XYWH } from "@/types/canvas"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLOURS = [
  "#DC2626",
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#D7B981",

]

export function connectionIdtoColor(connectionId: number): string {
  return COLOURS[connectionId % COLOURS.length]

}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function PointerEventToCanvas (e:React.PointerEvent,camera:Camera){
  return{
    x:Math.round(e.clientX)-camera.x,
    y:Math.round(e.clientY) - camera.y
  }
}

export function colorToCss (color:Color){
  return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart(2,"0")}${color.b.toString(16).padStart(2,"0")}}`
}

export function resizeBounds(bounds:XYWH,corner:Side,point:Points):XYWH{
  const result = {
    x:bounds.x,
    y:bounds.y,
    width:bounds.width,
    height:bounds.height
  }
  if(corner&&Side.Left === Side.Left){
    result.x = Math.min(point.x,bounds.x+bounds.width)
    result.width = Math.abs(bounds.x+bounds.width - point.x)
  }

  if(corner&&Side.Right === Side.Right){
    result.x = Math.min(point.x,bounds.x)
    result.width = Math.abs(point.x - bounds.x)
  }

  if(corner&&Side.Top === Side.Top){
    result.y = Math.min(point.y,bounds.y+bounds.height)
    result.height = Math.abs(bounds.y+bounds.height - point.y)
  }

  if(corner&&Side.Bottom === Side.Bottom){
    result.y = Math.min(point.y,bounds.y)
    result.height = Math.abs(point.y - bounds.y)
  }
  return result
}