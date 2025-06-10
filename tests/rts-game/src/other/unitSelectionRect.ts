import { Game } from "../game.ts";
import { Input } from "./input.ts";

export class UnitSelectionRect {
    private game: Game;
    private startX: number = 0;
    private startY: number = 0;
    private endX: number = 0;
    private endY: number = 0;
    private dragThreshold: number = 5;

    public justEnabled: boolean = false;//just got enabled
    public enabled: boolean = false;// currently enabled
    public justDisabled: boolean = false;//just got disabled

    readonly rectColor: string = 'rgb(0, 255, 51)';
    readonly rectAlpha: number = 0.4;
    constructor(game: Game) {
        this.game = game;

        this.start();
    }
    start() {
        this.game.addUpdateFn(this.update.bind(this));
    };
    update() {
        this.manageSelectionRect();
    };
    manageSelectionRect() {
        const input: Input = this.game.getInput();

        if (input.getJustPressed()) { //touch started
            this.startX = input.getX();
            this.startY = input.getY();
            this.endX = this.startX;
            this.endY = this.startY;
            this.justEnabled = false;
            this.enabled = false;
        };

        if (input.getPressed()) {// moving around
            this.endX = input.getX();
            this.endY = input.getY();

            const dx = this.endX - this.startX;
            const dy = this.endY - this.startY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (!this.enabled && distance > this.dragThreshold) {
                this.enabled = true;
                this.justEnabled = true;
            }
        };

        if (input.getJustReleased()) {
            this.justDisabled = this.enabled;
            this.enabled = false;
        };
        //console.log("START POS:", this.startX, this.startY);
        //console.log("END POS:", this.endX, this.endY);
    };
    getScreenSelectionRect(): { x: number; y: number; width: number; height: number } {
        const x = Math.min(this.startX, this.endX);
        const y = Math.min(this.startY, this.endY);
        const width = Math.abs(this.startX - this.endX);
        const height = Math.abs(this.startY - this.endY);

        return { x, y, width, height };
    };
    resetStates() {
        this.justEnabled = false;
        this.justDisabled = false;
    };
    getJustEnabled(): boolean {
        return this.justEnabled;
    };
    getEnabled(): boolean {
        return this.enabled;
    };
    getJustDisabled(): boolean {
        return this.justDisabled;
    };
}