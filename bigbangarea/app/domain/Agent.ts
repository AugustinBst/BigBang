

export class Agent {
  public starter = Date.now();
  public ctx: CanvasRenderingContext2D | null = null;

  constructor(
    public canvas: HTMLCanvasElement,
    public height: number,
    public width: number,
    public position_x: number,
    public position_y: number,
    public color: string,
    public timer: number
  ) {
    this.ctx = canvas.getContext('2d');
  }

  draw() {
        if (!this.ctx) {
            return
        }
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.position_x, this.position_y, this.width, this.height)
    return;
  }

  resetTimer() {
    if (this.timer == 35) {
        this.timer += 3
    }
    return;
  }
}