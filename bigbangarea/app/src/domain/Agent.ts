

export class Agent {
  private ctx: CanvasRenderingContext2D | null = null;
  public timeLeft: number;
  public isDead: boolean = false;
  private timerMoney: number = 0;
  private img: HTMLImageElement;

  constructor(
    public canvas: HTMLCanvasElement,
    public height: number,
    public width: number,
    public position_x: number,
    public position_y: number,
    public color: string,
    public imgSrc: string,
    minutesToLive: number,

    public moneyProduction:number = 10,
  ) {
    this.ctx = canvas.getContext('2d');
    this.timeLeft = minutesToLive * 60 * 1000;
    this.img = new Image();
    this.img.src = this.imgSrc;
  }

  draw() {
        if (!this.ctx) {
            return
        }
        this.ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);

        const centerX = this.position_x + (this.width / 2);
        const centerY = this.position_y + (this.height / 2);

        this.ctx.font = "bold 16px Arial";
        this.ctx.fillStyle = "black"
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(String(this.moneyProduction), centerX, centerY * 2.5, 100)

    return;
  }


  update(dt: number) {
    this.timeLeft -= dt;
    if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.isDead = true;
    }
    this.timerMoney += dt;

    if (this.timerMoney >= 1000) {
      this.timerMoney -= 1000;
      return this.moneyProduction;
    }

    return 0;
  }

  kill() {
    this.isDead = true;
  }
}

