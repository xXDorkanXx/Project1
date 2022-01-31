class Ball {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.player = player;
    this.x = this.player.x + this.player.width / 2;
    this.y = this.player.y - 20;
    this.r = 10;
    this.stAng = 0;
    this.endAng = Math.PI * 2;
    this.vx = parseInt(Math.random() * 12 - 6); //Math.random() * (max - min) + min
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

  checkCollision() {
    let leftOfBall = this.x - this.r;
    let rightOfBall = this.x + this.r;
    let topOfBall = this.y - this.r;
    let bottomOfBall = this.y + this.r;

    var ballCheck = this.ctx.getImageData(
      leftOfBall,
      topOfBall,
      rightOfBall,
      bottomOfBall
    );

    for (var i = 0, n = ballCheck.data.length; i < n; i += 4) {
      var red = ballCheck.data[i];
      var green = ballCheck.data[i + 1];
      var blue = ballCheck.data[i + 2];
      var alpha = ballCheck.data[i + 3];
      if (red === 174 && green === 140 && blue === 0 && alpha === 255) {
        console.log("hit the wall");
      }
    }

    /*
        if(ballCheck.data[116] === 174 && ballCheck.data[117] === 140 && ballCheck.data[118] === 0){console.log("toco arriba")}
        if(ballCheck.data[336] === 174 && ballCheck.data[337] === 140 && ballCheck.data[338] === 0){console.log("toco esquina AI")}
        if(ballCheck.data[724] === 174 && ballCheck.data[725] === 140 && ballCheck.data[726] === 0){console.log("toco Izq")}

        */
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, this.stAng, this.endAng);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
