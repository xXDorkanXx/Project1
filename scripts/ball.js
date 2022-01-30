class Ball{
    constructor(ctx){
        this.ctx = ctx;
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height - 150;
        this.r = 10;
        this.stAng = 0;
        this.endAng = Math.PI * 2;
        this.vx = 5;
        this.vy = -7;
    }

    init(){
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height - 150;
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, this.stAng, this.endAng);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
}