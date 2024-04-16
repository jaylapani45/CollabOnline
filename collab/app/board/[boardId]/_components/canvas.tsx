"use client";

import {
  useSelf,
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@/liveblocks.config";
import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Points,
  Side,
  XYWH,
} from "@/types/canvas";
import { CoursersPresence } from "./courser-presence";
import { PointerEventToCanvas, connectionIdtoColor, resizeBounds } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { on } from "events";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      LayerType:
        | LayerType.Circle
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Points
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= 1000) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();

      const layer = new LiveObject({
        type: LayerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const selections = useOthersMapped((other)=>other.presence.selection) 
const layerIdsToColorSelection = useMemo(()=>{
  const layerIdsToColorSelection : Record<string,string> = {}

    for (const user of selections){
      const [connectionId,selection] = user;

      for (const layerId of selection){
        layerIdsToColorSelection[layerId] = connectionIdtoColor(connectionId)
      }
    }
    return layerIdsToColorSelection
  },[selections])

  
  const info = useSelf((me) => me.info);
  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  const resizeSelectedLayer = useMutation((
    {storage,self},
    point:Points
  )=>{
    if(canvasState.mode !== CanvasMode.Resizing){
      return;
    }

    const bounds = resizeBounds(canvasState.intialBounds,canvasState.corner,point);

    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0]);

    if(layer){
      layer.update(bounds)
    }
  },[canvasState]
)

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = PointerEventToCanvas(e, camera);

      if(canvasState.mode === CanvasMode.Resizing){
        resizeSelectedLayer(current)
      }
      setMyPresence({ cursor: current });
    },
    [canvasState,resizeSelectedLayer,camera]
  );



  const onLayerPointerDown = useMutation((
    
      {self,setMyPresence},
      e:  React.PointerEvent,
      layerId:string
  )=>{
    if(
      canvasState.mode === CanvasMode.Pencil ||
      canvasState.mode === CanvasMode.Inserting
    ){
      return;
    }

    history.pause();
    e.stopPropagation();

    const point = PointerEventToCanvas(e,camera)
      if(!self.presence.selection.includes(layerId)){
        setMyPresence({selection:[layerId]},{addToHistory:true})
      }
      setCanvasState({mode:CanvasMode.Translating,current:point})
  },[
    setCanvasState,
    camera,
    history,
    canvasState.mode
  ])
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = PointerEventToCanvas(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );

  const onResizeHandlePointerDown = useCallback((
    corner: Side,
    intialBounds: XYWH
  )=>{
    console.log({
      corner,
      intialBounds
    
    })
    history.pause();
    setCanvasState({
      mode:CanvasMode.Resizing,
      corner,
      intialBounds
    })
  },[history])

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar
        canvasState={canvasState}
        setCanvasstate={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canRedo={canRedo}
        canUndo={canUndo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px , ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
            onResizeHandlePointerDown={onResizeHandlePointerDown}
           />
          <CoursersPresence />
        </g>
      </svg>
      <div className="flex justify-center items-center">
        <h1>hello {info?.name}</h1>
      </div>
    </main>
  );
};
