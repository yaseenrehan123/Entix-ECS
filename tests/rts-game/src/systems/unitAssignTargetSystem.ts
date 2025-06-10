import { EntityManager } from "entix";
import { Game } from "../game";
import { Input } from "../other/input";
import { UnitMover, UnitSelected } from "../components/unitComponents";

export function unitAssignTargetSystem(game: Game) {
    const em: EntityManager = game.em;
    const input: Input = game.getInput();

    if (input.getJustPressed()) {
        em.query('All', {
            unitMover: UnitMover,
            unitSelected: UnitSelected
        }, (id, { unitMover,unitSelected }) => {
            if(!unitSelected.enabled) return;// return if it isnt selected
            console.log("UNIT TARGET ASSIGNED!");
            unitMover.targetX = input.getX();
            unitMover.targetY = input.getY();
        });
    };


}