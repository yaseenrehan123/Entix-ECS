import { EntityManager } from "entix-ecs";
import { Game } from "../game";
import { Position } from "../components/generalComponents";
import { Text } from "../components/textComponents";
export function textRenderingSystem(game:Game){
    const em:EntityManager = game.em;
    const ctx:CanvasRenderingContext2D | null = game.ctx ?? null;
    if(!ctx) throw new Error("CTX NULL IN TEXT RENDERING SYSTEM!");

    em.query('All',{
        pos:Position,
        text:Text
    },(id,{pos,text})=>{

        ctx.save();
     
        ctx.beginPath();

        ctx.font = `${text.size}px sans-serif`;
        ctx.strokeStyle = text.color;

        ctx.strokeText(text.content,pos.x,pos.y,400);

        ctx.restore();
    });
}