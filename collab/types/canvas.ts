export type Color = {
    r:number,
    g:number,
    b:number
}
export type Camera={
    x:number,
    y:number
}

export enum LayerType {
    Text,
    Note,
    Path,
    Rectangle,
    Circle
}


export type RectangleLayer = {
    type:LayerType.Rectangle,
    x:number,
    y:number,
    width:number,
    height:number,
    fill:Color,
    value?:string

}

export type CircleLayer = {
    type:LayerType.Circle,
    x:number,
    y:number,
    width:number,
    height:number,
    fill:Color,
    value?:string
}

export type TextLayer = {
    type:LayerType.Text,
    x:number,
    y:number,
    width:number,
    height:number,
    value?:string,
    fill:Color
}

export type NoteLayer = {
    type:LayerType.Note,
    x:number,
    y:number,
    width:number,
    height:number,
    fill:Color,
    value?:string
}

export type PathLayer = {
    type:LayerType.Path,
    points:number[][],
    x:number,
    y:number,
    width:number,
    height:number,
    fill:Color,
    value?:string
}

export type Points ={
    x:number,
    y:number

}

export type XYWH = {
    x:number,
    y:number,
    width:number,
    height:number
}

export enum Side {
    Top=1,
    Bottom=2,
    Left=4,
    Right=8
}




export type CanvasState =
    | {
        mode:CanvasMode.None
    }
    | {
        mode:CanvasMode.Pressing,
        origin:Points
    }
    | {
        mode:CanvasMode.SelectionNet,
        origin:Points,
        current?:Points
    }
    | {
        mode:CanvasMode.Resizing,
        intialBounds:XYWH,
        corner:Side
    }
    | {
        mode:CanvasMode.Translating
        current:Points
    }
    | {
        mode:CanvasMode.Inserting,
        layerType:LayerType.Circle|LayerType.Rectangle|LayerType.Text|LayerType.Note
    }
    | {
        mode:CanvasMode.Pencil
    }
    


export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Resizing,
    Translating,
    Inserting,
    Pencil
}

export type Layer = RectangleLayer|CircleLayer|TextLayer|NoteLayer|PathLayer