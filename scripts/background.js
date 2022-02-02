class Background{
    constructor(ctx){
        this.ctx = ctx;

        this.background = {
            img: new Image(),
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
            x: 0,
            y: 0,
            vy: 3
        };
        
        this.background.img.src = "/images/stars.jpg";
    }

    init(){
        this.background.x = 0;
        this.background.y = 0;
    }

    move(){
        this.background.y += this.background.vy;
        if(this.background.y - this.background.height >= 0) this.background.y = 0;
    }

    draw(){
        this.ctx.drawImage(
            this.background.img,
            this.background.x,
            this.background.y,
            this.background.width,
            this.background.height
        );

        this.ctx.drawImage(
            this.background.img,
            this.background.x,
            this.background.y - this.background.height,
            this.background.width,
            this.background.height
        );
    }
};