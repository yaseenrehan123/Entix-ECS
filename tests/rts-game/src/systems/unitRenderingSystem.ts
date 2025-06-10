import { EntityManager } from "entix";
import { Game } from "../game.ts";
import { Position } from "../components/generalComponents.ts";
import { UnitCircleVisual, UnitRectVisual, UnitSelected, UnitVisuals } from "../components/unitComponents.js";

export function unitRenderingSystem(game: Game) {
    const em: EntityManager = game.em;
    const ctx: CanvasRenderingContext2D | null = game.ctx ?? null;

    em.query('All', {
        pos: Position,
        unitVisuals: UnitVisuals,
        unitSelected: UnitSelected
    }, (id, { pos, unitVisuals, unitSelected }) => {

        if (!ctx) throw new Error("CTX NULL IN UNIT RENDERING SYSTEM");

        ctx.save();

        ctx.fillStyle = unitVisuals.shapeColor;
        if (unitSelected.enabled) {
            ctx.strokeStyle = unitVisuals.selectedOutlineColor;
            ctx.lineWidth = unitVisuals.selectedOutlineWidth;
        }
        ctx.beginPath();

        switch (unitVisuals.shapeType) {

            case 'rect': {

                const unitRectVisual: UnitRectVisual | null = em.getComponent(id, UnitRectVisual) ?? null;
                if (!unitRectVisual) throw new Error(`UNIT RECT VISUAL NOT FOUND IN UNITRENDERING SYSTEM,ENTITY: ${id}`);
                const x: number = pos.x;
                const y: number = pos.y;
                const w: number = unitRectVisual.width;
                const h: number = unitRectVisual.height;
                const cx: number = x + w / 2;//centered x
                const cy: number = y + h / 2;//centered y

                ctx.rect(cx, cy, w, h);

                ctx.fill();
                if (unitSelected.enabled) {// draw outline if it's selected
                    ctx.beginPath();
                    ctx.rect(cx, cy, w, h);
                    ctx.stroke();
                }
                break;
            }
            case 'circle': {

                const unitCircleVisual: UnitCircleVisual | null = em.getComponent(id, UnitCircleVisual) ?? null;
                if (!unitCircleVisual) throw new Error(`UNIT CIRCLE VISUAL NOT FOUND IN UNITRENDERING SYSTEM,ENTITY: ${id}`);
                const x: number = pos.x;
                const y: number = pos.y;
                const r: number = unitCircleVisual.radius;

                ctx.arc(x, y, r, 0, Math.PI * 2);

                ctx.fill();

                if (unitSelected.enabled) {// draw outline if it's selected
                    ctx.strokeStyle = unitSelected.selectedOutlineColor;
                    ctx.lineWidth = unitSelected.selectedOutlineWidth;

                    ctx.beginPath();
                    ctx.arc(x,y,r,0,Math.PI * 2);
                    ctx.stroke();
                }
                break;
            }

        };
        ctx.restore();

    });

};