import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { useState } from "react";

interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasstate: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const ToolBar = ({
  canvasState,
  setCanvasstate,
  undo,
  redo,
  canRedo,
  canUndo,
}: ToolBarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col  gap-y-4">
      <div className="bg-white rounded-md flex flex-col items-center gap-y-1 shadow-md p-1.5">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => {
            setCanvasstate({ mode: CanvasMode.None });
          }}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.Resizing ||
            canvasState.mode === CanvasMode.SelectionNet
          }
        ></ToolButton>

        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => {
            setCanvasstate({ mode: CanvasMode.Inserting , layerType: LayerType.Text});
          }}
          isActive={canvasState.mode == CanvasMode.Inserting && canvasState.layerType == LayerType.Text}
        ></ToolButton>

        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() => { setCanvasstate({ mode: CanvasMode.Inserting , layerType: LayerType.Note});}}
          isActive={canvasState.mode == CanvasMode.Inserting && canvasState.layerType == LayerType.Note}
        ></ToolButton>

        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => { setCanvasstate({ mode: CanvasMode.Inserting , layerType: LayerType.Rectangle});}}
          isActive={ canvasState.mode == CanvasMode.Inserting && canvasState.layerType == LayerType.Rectangle}
        ></ToolButton>

        <ToolButton
          label="Circle"
          icon={Circle}
          onClick={() => { setCanvasstate({ mode: CanvasMode.Inserting , layerType: LayerType.Circle});}}
          isActive={ canvasState.mode == CanvasMode.Inserting && canvasState.layerType == LayerType.Circle}
        ></ToolButton>

        <ToolButton
          label="Pencil"
          icon={Pencil}
          onClick={() => { setCanvasstate({ mode: CanvasMode.Pencil});}}
          isActive={ canvasState.mode == CanvasMode.Pencil}
        ></ToolButton>
      </div>
      <div className="bg-white rounded-md flex flex-col items-center gap-y-1 shadow-md p-1.5">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isActive={false}
          isDisabled={!canUndo}
        ></ToolButton>

        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isActive={false}
          isDisabled={!canRedo}
        ></ToolButton>
      </div>
    </div>
  );
};
ToolBar.Skeleton = function ToolBarSkeleton() {
  return (
    <div className="w-[50px] absolute top-[50%] -translate-y-[50%] left-2 flex flex-col  gap-y-4">
      <div className="h-[100px] bg-white rounded-md  shadow-md">
        <Skeleton className="h-full w-full"></Skeleton>
      </div>

      <div className="h-[60px] bg-white rounded-md  shadow-md ">
        <Skeleton className="h-full w-full"></Skeleton>
      </div>
    </div>
  );
};
