import {EntityManager} from 'entix-ecs';
import type { EntityId } from 'entix-ecs';
interface PositionOptions{
    x?:number,
    y?:number
}
class Position{
    public x:number = 0;
    public y:number = 0;
    constructor(options:PositionOptions){
        this.x = options.x ?? 0;
        this.y = options.y ?? 0;
    }
}

const em = new EntityManager();

const entity:EntityId = em.createEntity();

em.addComponent(entity,Position,new Position({}));

const position:Position | undefined = em.getComponent(entity,Position);
if(!position) throw new Error("POSITION NOT FOUND ON ENTITY!");

position.x = 500;

console.log(position);
if(em.hasEntity(entity)){
    console.log("HAS ENTITY WORKS FINE!");
}
requestAnimationFrame(update.bind(this));


function update(){
    em.query('All',{
        position:Position
    },(id,{position})=>{
        void id;
        position.x++;
        console.log(position);
    });
    requestAnimationFrame(update);
}