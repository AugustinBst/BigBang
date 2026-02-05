type UpdateCallback = (deltaTime: number) => void;
type RenderCallback = () => void;

export class GameLoop {
    private lastFrameTime: number = 0;
    private animationFrameId: number | null = null;
    private isRunning: boolean = false;

    constructor(
    private onUpdate: UpdateCallback,
    private onRender: RenderCallback
    ) {}

    public start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastFrameTime = performance.now();

        this.loop(this.lastFrameTime);
    }

    public stop() {
        this.isRunning = false;
        if (this.animationFrameId !== null) {
          cancelAnimationFrame(this.animationFrameId);
        }
    }


    private loop = (currentTime: number) => {
        if (!this.isRunning) return;


        const deltaTime = currentTime - this.lastFrameTime;

        this.lastFrameTime = currentTime;

        this.onUpdate(deltaTime);

        this.onRender();

        // 4. On demande la prochaine frame au navigateur
        this.animationFrameId = requestAnimationFrame(this.loop);
      };
}