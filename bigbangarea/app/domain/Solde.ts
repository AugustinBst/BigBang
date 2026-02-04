

export class Solde {
  private ctx: CanvasRenderingContext2D | null = null;
  public isDead: boolean = false;

  constructor(
    public canvas: HTMLCanvasElement,
    public solde: number = 200,
  ) {
    this.ctx = canvas.getContext('2d');
  }

  draw() {
        if (!this.ctx) {
            return
        }
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(this.canvas.width * 0.7, 0, this.canvas.width * 0.3, this.canvas.height * 0.1)
        let position_x = this.canvas.width * 0.7
        let position_y = 0


        const centerX = position_x + ((this.canvas.width * 0.3) / 2);
        const centerY = position_y + ((this.canvas.height * 0.1) / 2);
        this.ctx.font = "bold 16px Arial";
        this.ctx.fillStyle = "green"
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(String(this.solde), centerX, centerY, 100)

    return;
  }


  add(money: number) {
    this.solde += money
    return;
  }

  kill() {
    this.isDead = true;
  }
}