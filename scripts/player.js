class Player{
    constructor(ctx){
        this.ctx = ctx;
        this.width = 150;
        this.height = 30;
        this.x = (this.ctx.canvas.width / 2) - (this.width / 2);
        this.y = this.ctx.canvas.height - 50;
        this.vx = 0;
        this.img = new Image();
        this.img.src = "/images/satellite.png";
    }

    init(){
        this.x = (this.ctx.canvas.width / 2) - (this.width / 2);
        this.y = this.ctx.canvas.height - 50;
        this.vx = 0;
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