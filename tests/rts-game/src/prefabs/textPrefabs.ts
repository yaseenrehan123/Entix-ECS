import { EntityId, EntityManager } from "entix-ecs";
import { Game } from "../game";
import { SpawnedPos } from "../interfaces";
import { Text } from "../components/textComponents";
import { Position } from "../components/generalComponents";
interface TextPrefabOptions{
    game:Game,
    spawnedPos?:SpawnedPos,
    content:string,
    size?:number,
    color?:string
}
export class TextPrefab{
    private game:Game;
    private em:EntityManager;
    private spawnedPos:SpawnedPos;
    private content:string;
    private size:number;
    private color:string
    constructor(options:TextPrefabOptions){
        this.game = options.game;
        this.em = this.game.em;
        this.spawnedPos = options.spawnedPos ?? {x:0,y:0};
        this.content = options.content;
        this.size = options.size ?? 16;
        this.color = options.color ?? 'white';

        this.init();
    };
    init(){
        const entity:EntityId = this.em.createEntity();
        this.em.addComponent(entity,Position,new Position({x:this.spawnedPos.x,y:this.spawnedPos.y}));
        this.em.addComponent(entity,Text,new Text({
            content:this.content,
            size:this.size,
            color:this.color
        }));
    }
}