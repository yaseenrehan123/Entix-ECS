import { EntityManager } from "entix";
import { Game } from "../game.ts";
import { Position } from "../components/generalComponents.ts";
import { UnitMover } from "../components/unitComponents.ts";
export function unitMoverSystem(game:Game){
    const em:EntityManager = game.em;
    em.query('All',{
        pos:Position,
        unitMover:UnitMover
    },(id,{pos,unitMover})=>{
        const moveDirX:number = unitMover.targetX - pos.x;
        const moveDirY:number = unitMover.targetY - pos.y;
        const distance:number = Math.hypot(moveDirX,moveDirY);
        const deadzone:number = 1;
        if(distance > deadzone){
            const normalizedMoveDirX:number = moveDirX / distance;
            const normalizedMoveDirY:number = moveDirY / distance;

            const deltaTime:number = game.getDeltaTime();

            pos.x += normalizedMoveDirX * unitMover.moveSpeed * deltaTime;
            pos.y += normalizedMoveDirY * unitMover.moveSpeed * deltaTime;

        };
    });
}