import { EntityManager } from "entix";
import type { EntityId } from "entix";
import { Game } from "../game";
import { Position } from "../components/generalComponents";
import { UnitVisuals,UnitRectVisual,UnitMover,UnitSelected,Unit, UnitCircleVisual } from "../components/unitComponents";
import { SpawnedPos } from "../interfaces";
export class PlayerMeleeUnitPrefab{
    private game:Game;
    private em:EntityManager;
    private spawnedPos:SpawnedPos;
    constructor(game:Game,spawnedPos:SpawnedPos){
        this.game = game;
        this.em = this.game.em;
        this.spawnedPos = spawnedPos;

        this.init();
    };
    init(){
        const entity: EntityId = this.em.createEntity();
        this.em.addComponent(entity, Position, new Position({ x: this.spawnedPos.x, y: this.spawnedPos.y }));
        this.em.addComponent(entity, UnitVisuals, new UnitVisuals({
            shapeType: 'rect',
            shapeColor: 'green'
        }));
        this.em.addComponent(entity, UnitRectVisual, new UnitRectVisual({
            width: 20,
            height: 40
        }));
        this.em.addComponent(entity, UnitMover, new UnitMover({
            moveSpeed: 40,
            targetX:this.spawnedPos.x,
            targetY:this.spawnedPos.y
        }));
        this.em.addComponent(entity,UnitSelected,new UnitSelected({}));
        this.em.addComponent(entity,Unit,new Unit());
    };
};

export class PlayerRangedUnitPrefab{
    private game:Game;
    private em:EntityManager;
    private spawnedPos:SpawnedPos;
    constructor(game:Game,spawnedPos:SpawnedPos){
        this.game = game;
        this.em = this.game.em;
        this.spawnedPos = spawnedPos;

        this.init();
    };
    init(){
        const entity:EntityId = this.em.createEntity();

        this.em.addComponent(entity,Position,new Position({x:this.spawnedPos.x,y:this.spawnedPos.y}));
        this.em.addComponent(entity,UnitVisuals,new UnitVisuals({
            shapeType:'circle',
            shapeColor:'green'
        }));
        this.em.addComponent(entity,UnitCircleVisual, new UnitCircleVisual({
            radius:20
        }));
        this.em.addComponent(entity,UnitMover,new UnitMover({
            moveSpeed:15,
            targetX:this.spawnedPos.x,
            targetY:this.spawnedPos.y
        }));
        this.em.addComponent(entity,Unit,new Unit());
        this.em.addComponent(entity,UnitSelected, new UnitSelected({}));
    };
}