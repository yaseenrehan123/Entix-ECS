import { Game } from "../game.ts";
export class Input {
    private game: Game;
    private x: number = 0;
    private y: number = 0;
    private justPressed: boolean = false;//just pressed, used to detect clicks
    private pressed: boolean = false;// currently pressing
    private justReleased: boolean = false;//just released, used to detect mouse leaves
    constructor(game: Game) {
        this.game = game;

        this.start();
    };
    start() {
        this.game.addUpdateFn(this.update.bind(this));
        this.addListeners();
    };
    update() {
        //console.log("JUST PRESSED:", this.justPressed);
        //console.log("PRESSED:", this.pressed);
        //console.log("JUST RELEASED", this.justReleased);
        //console.log("POS", this.x, this.y);
        
    };
    updatePos(clientX: number, clientY: number) {
        const canvas: HTMLCanvasElement | null = this.game.canvas ?? null;
        if (!canvas) throw new Error("CANVAS NULL IN INPUT UPDATE POS!");
        const rect: DOMRect = canvas.getBoundingClientRect();
        if (!rect) throw new Error("RECT NULL IN INPUT UPDATE POS!");
        this.x = clientX - rect.left;
        this.y = clientY - rect.top;
    };
    addListeners() {
        const pressedListeners = ['mousedown', 'touchstart'];
        const moveListeners = ['mousemove', 'touchmove'];
        const releasedListeners = ['mouseup', 'touchend'];

        pressedListeners.forEach((event) => {
            this.game.canvas?.addEventListener(event, (e: Event) => {
                if (e instanceof MouseEvent) {
                    this.updatePos(e.clientX, e.clientY);
                }
                else if (e instanceof TouchEvent) {
                    this.updatePos(e.touches[0].clientX, e.touches[0].clientY);
                }
                this.justPressed = true;
                this.pressed = true;
            }, { passive: true });
        });

        moveListeners.forEach((event) => {// dont change press bools
            this.game.canvas?.addEventListener(event, (e: Event) => {
                if (e instanceof MouseEvent) {
                    this.updatePos(e.clientX, e.clientY);
                }
                else if (e instanceof TouchEvent) {
                    this.updatePos(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: true });
        });

        releasedListeners.forEach((event) => {// dont change press bools
            this.game.canvas?.addEventListener(event, () => {
                this.justReleased = true;
                this.pressed = false;
            });
        });
    };
    resetStates() {
        this.justPressed = false;//reset
        this.justReleased = false;//reset
    }
    getX(): number {
        return this.x;
    };
    getY(): number {
        return this.y;
    };
    getJustPressed(): boolean {
        return this.justPressed;
    };
    getPressed(): boolean {
        return this.pressed;
    };
    getJustReleased(): boolean {
        return this.justReleased;
    };
};