class Player{
    constructor(ctx){
        this.ctx = ctx;
        this.width = 100;
        this.height = 30;
        this.x = (this.ctx.canvas.width / 2) - 50;
        this.y = this.ctx.canvas.height - 130;
        this.vx = 0;
        this.img = new Image();
        this.img.src = "/images/player-bar.png"
    }

    init(){
        this.x = 400;
        this.y = this.ctx.canvas.height - 130;
        this.vx = 0;
    }

    leftMove(){
        this.vx = -5;
        this.x += this.vx;
    }

    rightMove(){
        this.vx = 5;
        this.x += this.vx;
    }

    draw(){
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
};