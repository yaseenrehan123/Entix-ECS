//LIBS
import { EntityManager } from "entix-ecs";
//TYPES
import type { EntityId } from "entix-ecs";
//COMPONENTS

//SYSTEMS
import { unitRenderingSystem } from "./systems/unitRenderingSystem.ts";
import { unitMoverSystem } from "./systems/unitMoverSystem.ts";
import { unitAssignTargetSystem } from "./systems/unitAssignTargetSystem.ts";
import { unitSelectionSystem } from "./systems/unitSelectionSystem.ts";
//OTHER
import { Input } from "./other/input.js";
import { UnitSelectionRect } from "./other/unitSelectionRect.ts";
import { drawSelectionRect } from "./other/drawSelectionRect.ts";
import { PlayerMeleeUnitPrefab, PlayerRangedUnitPrefab } from "./prefabs/playerUnitPrefabs.ts";
import { textRenderingSystem } from "./systems/textRenderingSystem.ts";
import { TextPrefab } from "./prefabs/textPrefabs.ts";

export class Game {
    readonly canvas: HTMLCanvasElement | null = document.querySelector('.game-canvas') ?? null;
    readonly ctx: CanvasRenderingContext2D | null = this.canvas?.getContext('2d') ?? null;
    readonly em: EntityManager = new EntityManager();

    private deltaTime: number = 0;
    private lastFrameTime: number = 0;
    private canvasWidth: number = 0;
    private canvasHeight: number = 0;
    private updateFnArr: Function[] = [];
    private input: Input | null = null;
    private unitSelectionRect:UnitSelectionRect | null = null;

    constructor() {
        this.init();
        this.start();
        requestAnimationFrame(this.update.bind(this));
    };
    init() {
        if (!this.canvas) throw new Error("CANVAS NOT FOUND");
        if (!this.ctx) throw new Error("CTX NOT FOUND");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.input = new Input(this)
        if (!this.input) throw new Error("INPUT NOT FOUND");
        this.unitSelectionRect = new UnitSelectionRect(this);
        if(!this.unitSelectionRect) throw new Error("UNIT SELECTION RECT NOT FOUND");
    };
    start() {
      new PlayerMeleeUnitPrefab(this,{x:500,y:500});
      new PlayerRangedUnitPrefab(this,{x:300,y:500});
      new TextPrefab({
        game:this,
        content:'Drag to select units',
        spawnedPos:{x:200,y:200},
        size:35,
      });
      new TextPrefab({
        game:this,
        content:'Click to Move Selected Units',
        spawnedPos:{x:200,y:400},
        size:50
      })
    };
    update(timeStamp: number) {
        this.deltaTime = (timeStamp - this.lastFrameTime) / 1000;
        this.lastFrameTime = timeStamp;

        this.ctx?.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.updateFnArr.forEach((fn) => {
            fn();
        });
      
        unitRenderingSystem(this);
        unitSelectionSystem(this);
        unitAssignTargetSystem(this);
        unitMoverSystem(this);
        textRenderingSystem(this);

        drawSelectionRect(this);

        this.input?.resetStates();
        this.unitSelectionRect?.resetStates();

        requestAnimationFrame(this.update.bind(this));
    };
    addUpdateFn(fn: Function) {
        this.updateFnArr.push(fn);
    };
    removeUpdateFn(fn: Function) {
        const index: number = this.updateFnArr.indexOf(fn);
        if (index > -1) {
            this.updateFnArr.splice(index, 1);
        }
    };
    getDeltaTime(): number {
        return this.deltaTime;
    };
    getInput(): Input {
        return this.input as Input;
    };
    getUnitSelectionRect() : UnitSelectionRect{
        return this.unitSelectionRect as UnitSelectionRect;
    }
};