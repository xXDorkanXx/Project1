class Game {
    constructor(ctx, background, bricks, player, ball){
        this.ctx = ctx;
        this.background = background;
        this.bricks = bricks;
        this.player = player;
        this.ball = ball;
        this.frames = 0;
        this.lifes = 3;
        this.score = 0;

        document.addEventListener(
            "keydown",
            (event)=>{
                switch(event.key){
                    case "ArrowLeft":
                        this.player.leftMove();
                        break;
                    case "ArrowRight":
                        this.player.rightMove();
                        break;
                }
            }
        )

        document.addEventListener(
            "keyup",
            ()=>{
                this.player.vx = 0;
            }
        )
    }

    startGame(){
        this.init();
        this.player();
    }

    init(){
        if(this.frames) this.stop();
        this.frames = 0;
        this.background.init();
        this.bricks.init();
        this.player.init();
        this.ball.init();
    }

    play(){
        this.moves();
        this.draw();
        this.checkScore();
        this.checkGameOver();
        if(this.frames !== null){
            this.frames = requestAnimationFrame(this.play.bind(this));
        }
    }

    stop(){
        cancelAnimationFrame(this.frames);
        this.frames = null;
    }

    move(){
        this.ball.move();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.background.draw();
        this.bricks.draw();
        this.player.draw();
        this.ball.draw();
        this.drawScore();
        this.drawLifes();
    }

    drawScore(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 24px sans-serif";
        this.ctx.fillText(`Score: ${this.score} pts`, 20, 40);
        this.ctx.restore();
    }

    drawLifes(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 24px sans-serif";
        this.ctx.fillText(`Score: ${this.lifes} pts`, this.ctx.canvas.width - 40, 40);
        this.ctx.restore();
    }

    checkScore(){
        this.score = 24 - bricksArr.length;
    }

    checkGameOver(){
        if(this.lifes <= 0){
            this.stop();
            this.ctx.saves();
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.font = "bold 32px sans-serif";
            this.ctx.fillText(
                "Game Over",
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2
            );
            this.ctx.restore();
        }
    }
};