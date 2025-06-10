import type { UnitShapeType } from "../types.js";
export class Unit{// A tag class

};
interface UnitVisualOptions{
    shapeType?: UnitShapeType,
    shapeColor?: string,
};
export class UnitVisuals{
    public shapeType:UnitShapeType;
    public shapeColor:string;

    readonly selectedOutlineColor:string = 'rgb(0, 212, 250)';
    readonly selectedOutlineWidth:number = 0.7;
    constructor(options:UnitVisualOptions){
        this.shapeType = options.shapeType ?? 'rect';
        this.shapeColor = options.shapeColor ?? 'white';
    };
};
interface UnitRectVisualOptions{
    width:number,
    height:number
};
export class UnitRectVisual{
    public width:number;
    public height:number;
    constructor(options:UnitRectVisualOptions){
        this.width = options.width;
        this.height = options.height;
    };
};
interface UnitCircleVisualOptions{
    radius:number
};
export class UnitCircleVisual{
    public radius:number;
    constructor(options:UnitCircleVisualOptions){
        this.radius = options.radius;
    };
};
interface UnitMoverOptions{
    targetX?:number,
    targetY?:number,
    moveSpeed?:number
};
export class UnitMover{
    public targetX:number;
    public targetY:number;
    public moveSpeed:number
    constructor(options:UnitMoverOptions){
        this.targetX = options.targetX ?? 0;
        this.targetY = options.targetY ?? 0;
        this.moveSpeed = options.moveSpeed ?? 0;
    };
};
interface UnitSelectedOptions{
    enabled?:boolean
};
export class UnitSelected{
    public enabled:boolean = false;
    constructor(options:UnitSelectedOptions){
        this.enabled = options.enabled ?? false;
    };
};