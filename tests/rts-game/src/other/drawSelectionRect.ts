import { Game } from "../game.ts";
import { UnitSelectionRect } from "./unitSelectionRect.ts";

export function drawSelectionRect(game:Game){
    const unitSelectionRect:UnitSelectionRect = game.getUnitSelectionRect();
    if(!unitSelectionRect.getEnabled()) return;

    const ctx:CanvasRenderingContext2D | null = game.ctx ?? null;
    if(!ctx) throw new Error("CTX NULL IN DRAW SELECTION RECT");

    const {x,y,width,height} = unitSelectionRect.getScreenSelectionRect();

    ctx.save();

    ctx.fillStyle = unitSelectionRect.rectColor;
    ctx.globalAlpha = unitSelectionRect.rectAlpha;

    ctx.beginPath();
    
    ctx.rect(x,y,width,height);

    ctx.fill();

    ctx.restore();
}