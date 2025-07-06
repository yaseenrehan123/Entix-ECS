import type { EntityId } from "entix-ecs";
import { EntityManager } from "entix-ecs";

class Position {
    public value: Vector2;
    constructor(value: PositionOptions = {}) {
        this.value = value.positon ?? { x: 0, y: 0 };
    };
};
//TYPES
type Vector2 = { x: 0, y: 0 };
//COMPONENT OPTIONS
type PositionOptions = {
    positon?: Vector2
};
const em: EntityManager = new EntityManager();
const id: EntityId = em.createEntity();
em.addComponent(id, Position, new Position())
requestAnimationFrame(update.bind(this));

function update() {
    em.query('All', {
        position: Position
    }, (id, { position }) => {
        position.value.x++;
        console.log("ENTITY DESTROYED!");
        em.removeEntity(id);
        console.log(position.value.x, position.value.y);
    });
    requestAnimationFrame(update);
}