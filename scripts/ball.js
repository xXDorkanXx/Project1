class Ball {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.player = player;
    this.x = this.player.x + this.player.width / 2;
    this.y = this.player.y - 20;
    this.r = 10;
    this.stAng = 0;
    this.endAng = Math.PI * 2;
    this.vx = parseInt(Math.random() * 12 - 6);
    this.vy = -7;
    this.status = 0;
  }

  init() {
    this.x = this.player.x + this.player.width / 2;
    this.y = this.player.y - 20;
    this.vx = parseInt(Math.random() * 12 - 6);
    this.vy = -7;
    this.status = 0;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.status = 1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, this.stAng, this.endAng);
    this.ctx.fillStyle = "lightgoldenrodyellow";
    this.ctx.fill();
    this.ctx.strokeStyle = "orange";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
