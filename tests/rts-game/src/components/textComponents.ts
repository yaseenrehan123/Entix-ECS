interface TextOptions{
    content?:string,
    size?:number,
    color?:string
}
export class Text{
    public content:string;
    public size:number;
    public color:string
    constructor(options:TextOptions){
        this.content = options.content ?? 'Text';
        this.size = options.size ?? 16;
        this.color = options.color ?? 'white';
    };
};