class Ball{
    constructor(ctx){
        this.ctx = ctx;
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height - 150;
        this.r = 10;
        this.stAng = 0;
        this.endAng = Math.PI * 2;
        this.vx = parseInt(Math.random() * (12) - 6); //Math.random() * (max - min) + min
        this.vy = -7;
        this.status = 0;
    }

    init(){
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height - 150;
        this.vx = parseInt(Math.random() * (12) - 6);
        this.vy = -7;
        this.status = 0;
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
        this.status = 1;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, this.stAng, this.endAng);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
}