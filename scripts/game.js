class Game {
    constructor(ctx, background, bricks, player, ball){
        this.ctx = ctx;
        this.background = background;
        this.bricks = bricks;
        this.player = player;
        this.ball = ball;
        this.frames = 0;
        this.scores = 0;
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
        if(this.checkCollision()) this.gameOver;
        
    }
};