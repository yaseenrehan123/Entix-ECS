interface PositionOptions{
    x:number,
    y:number
}
export class Position{
    public x:number;
    public y:number;
    constructor(options:PositionOptions){
       this.x = options.x;
       this.y = options.y;
    }
}