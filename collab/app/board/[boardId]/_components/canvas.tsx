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
import { SelectionTools } from "./selection-tools";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);

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


  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 255,
    b: 255,
  });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

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

  const translateSelectedLayer = useMutation(({storage,self},point:Points)=>{
    if(canvasState.mode !== CanvasMode.Translating){
      return;
    }
    const offset = {
      x:point.x - canvasState.current.x,
      y:point.y - canvasState.current.y
    
    };
    const liveLayers = storage.get("layers");
  
    for(const layerId of self.presence.selection){
      const layer = liveLayers.get(layerId);
      if(layer){
        layer.update({
          x:layer.get("x") + offset.x,
          y:layer.get("y")+ offset.y
        })
      }
    }
    setCanvasState({mode:CanvasMode.Translating,current:point})
  
  },[
    canvasState
  ]);

  const unSelectLayer = useMutation(({self,setMyPresence})=>{
    if(self.presence.selection.length > 0){
      setMyPresence({selection:[]},{addToHistory:true})
    }
  },[])
  

  
  
  const info = useSelf((me) => me.info);
  

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

const onResizeHandlePointerDown = useCallback((
  corner: Side,
  intialBounds: XYWH
)=>{
  history.pause();
  setCanvasState({
    mode:CanvasMode.Resizing,
    corner,
    intialBounds
  })
},[history])

const onWheel = useCallback((e: React.WheelEvent) => {
  setCamera((camera) => ({
    x: camera.x - e.deltaX,
    y: camera.y - e.deltaY,
  }));
}, []);


  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = PointerEventToCanvas(e, camera);

      if(canvasState.mode === CanvasMode.Translating){
        translateSelectedLayer(current);
      }else if(canvasState.mode === CanvasMode.Resizing){
        resizeSelectedLayer(current)
      }
      setMyPresence({ cursor: current });
    },
    [canvasState,resizeSelectedLayer,camera,translateSelectedLayer]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const point = PointerEventToCanvas(e, camera);
    if(canvasState.mode === CanvasMode.Inserting){
      return;
    }


    setCanvasState({ origin:point, mode: CanvasMode.Pressing });
  },[camera,canvasState.mode,setCanvasState])

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = PointerEventToCanvas(e, camera);

      if(canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing){
        unSelectLayer();
        setCanvasState({mode:CanvasMode.None})
      }else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer,unSelectLayer,setCanvasState]
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
  

  

  
  
  

  return (
    <div className="h-full w-full relative bg-neutral-100 touch-none">
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
      <SelectionTools
        camera={camera}
        setLastUsedColor={setLastUsedColor}
       />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
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
    </div>
  );
};
