import { EntityManager } from "entix-ecs";
import { Game } from "../game.ts";
import { UnitSelectionRect } from "../other/unitSelectionRect.ts";
import { Unit, UnitSelected } from "../components/unitComponents.ts";
import { Position } from "../components/generalComponents.ts";

export function unitSelectionSystem(game: Game) {
    const em: EntityManager = game.em;
    const unitSelectionRect: UnitSelectionRect = game.getUnitSelectionRect();

    if (unitSelectionRect.getJustDisabled()) {

        //console.log("UNIT SELECTION SYSTEM CALLED");

        const { x, y, width, height } = unitSelectionRect.getScreenSelectionRect();

        const inRect = (px: number, py: number) => {
            return px >= x && px <= x + width && py >= y && py <= y + height;
        };

        em.query('All', { //disable all
            unit: Unit,
            unitSelected: UnitSelected
        }, (id, { unit, unitSelected }) => {
            unitSelected.enabled = false;
        });

        em.query('All', { //enable only those who match in position
            unit: Unit,
            unitSelected: UnitSelected,
            pos: Position
        }, (id, { unit, unitSelected, pos }) => {
            if(inRect(pos.x,pos.y)){
                unitSelected.enabled = true;
                console.log(unitSelected.enabled);
            }
        });


    };
}