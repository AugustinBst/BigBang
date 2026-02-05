import { Agent } from '../domain/Agent';
import { Solde } from '../domain/Solde';
import { GameLoop } from './GameLoop';
import { SaveManager } from './SaveManager';

export class GameEngine {
  private loop: GameLoop;
  public agents: Agent[] = [];
  public solde!: Solde;
  private ctx: CanvasRenderingContext2D;
  private bgImage: HTMLImageElement;
  private bgPattern: CanvasPattern | null = null;
  private timerAutoSave: number = 0;

  constructor(public canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error("Impossible de récupérer le contexte 2D du canvas");
    }

    this.ctx = context;

    this.bgImage = new Image();
    this.bgImage.src = '/assets/ground.jpg';
    this.bgImage.onload = () => {
        const tileWidth = 400;
        const tileHeight = 190;

        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = tileWidth;
        offscreenCanvas.height = tileHeight;
        const offCtx = offscreenCanvas.getContext('2d');
        if (!offCtx) return;

        offCtx.drawImage(this.bgImage, 0, 0, tileWidth, tileHeight);
        this.bgPattern = this.ctx.createPattern(offscreenCanvas, "repeat");
    };

    this.loop = new GameLoop(
        (dt) => this.update(dt),
        () => this.render()
    );

    const save = SaveManager.load(this.canvas);

    if (save) {
      console.log("✅  Save found !");

      this.solde = new Solde(this.canvas);
      this.solde.money = save.money;
      this.agents = save.agents;
    } else {
        console.log("✨ New Game !");
        this.initObjectsGames();
    }
  }

  private initObjectsGames() {
    this.solde = new Solde(this.canvas)

    this.agents.push(new Agent(this.canvas, 128, 256, 10, 0, 'green','/assets/dev1.png', 10 / 60)); // Vie en min (10/60) = 10segonde
    this.agents.push(new Agent(this.canvas, 128, 256, 290, 0, 'blue','/assets/dev2.png', 1));
  }


  public start() {
    console.log("Moteur démarré");
    this.loop.start();
  }

  public stop() {
    this.loop.stop();
  }

  private update(dt: number) {
    this.timerAutoSave += dt;



    if (this.timerAutoSave >= 5000) {
      console.log("Auto save !")
      this.timerAutoSave = 0;
      SaveManager.save(this.solde, this.agents);
    }


    for (let i = this.agents.length - 1; i >= 0; i--) {
        const agent = this.agents[i];

        const moneyMade = agent.update(dt);

        if (moneyMade > 0) {
            this.solde.add(moneyMade);
        }
        if (agent.isDead) {
            this.agents.splice(i, 1);
        }
    }
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.bgPattern) {
        this.ctx.fillStyle = this.bgPattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.solde.draw()
    this.agents.forEach(agent => {
        agent.draw();
    });
  }
}
