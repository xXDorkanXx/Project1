class Game{
    constructor(ctx, background, bricks, player, ball, projectiles){
        this.ctx = ctx;
        this.background = background;
        this.bricks = bricks;
        this.player = player;
        this.ball = ball;
        this.projectiles = projectiles;

        this.frames = 0;
        this.lifes = 4;
        this.score = 0;
        this.gameState = 0;

        this.img = new Image();
        this.img.src = "images/lifes_sprite.png";
        this.x = this.ctx.canvas.width - 140;
        this.y = 7;
        this.spriteColumns = 4;
        this.spriteRows = 1;
        this.spriteCol = 3;
        this.spriteRow = 0;
        this.spriteX = 0;
        this.spriteY = 0;
        this.spriteWidth = 480;
        this.spriteHeight = 960;

        this.themeAudio = new Audio("sounds/main_theme.mp3");
        this.bounceAudio = new Audio("sounds/bounce.wav");
        this.shootAudio = new Audio("sounds/player_shoot.wav");
        this.hitAudio = new Audio("sounds/hit.wav");
        this.explosionAudio = new Audio("sounds/explosion.wav");
        this.gameOverAudio = new Audio("sounds/gameover.wav");
        this.winAudio = new Audio("sounds/win.wav");

        this.gameboard = document.getElementById("gameboard");
        this.menu = document.getElementById("menu");
        this.startButton = document.getElementById("start-button");
        this.title = document.getElementById("title");
    }

    startGame(){
        this.init();
        this.play();
        this.themeAudio.play();
    }

    init(){
        if(this.frames) this.stop();
        this.frames = 0;

        this.lifes = 4;
        this.score = 0;

        this.spriteCol = 3;
        this.spriteRow = 0;
        this.spriteX = 0;
        this.spriteY = 0;

        this.background.init();
        this.bricks.init();
        this.player.init();
        this.ball.init();
        this.projectiles.init();
    }

    play(){
        this.move();
        this.draw();
        this.checkCollisions();
        this.checkWin();
        this.checkLifes();
        this.checkGameOver();
        if(this.frames !== null){
            this.frames = requestAnimationFrame(this.play.bind(this));
        }
    }

    setSprite(){
        this.spriteCol = this.lifes - 1;
        this.spriteX = (this.spriteWidth * this.spriteCol);
        this.spriteY = (this.spriteHeight * this.spriteRow);
    }

    move(){
        this.projectiles.move(this.frames);
        this.background.move();
        if(this.ball.status === 1){
            this.ball.move();
        }
    }

    stop(){
        cancelAnimationFrame(this.frames);
        this.frames = null;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.background.draw();
        this.bricks.draw();
        this.player.draw();
        this.ball.draw();
        this.projectiles.draw();
        this.drawScore();
        this.drawLifes();
    }

    drawScore(){
        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.font = "normal 26px pixelFont";
        this.ctx.fillText(`Score: ${this.score} pts`, 20, 37);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeText(`Score: ${this.score} pts`, 20, 37);
        this.ctx.restore();
    }

    drawLifes(){
        this.setSprite();
        this.ctx.drawImage(
            this.img,
            this.spriteX,
            this.spriteY,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            26,
            42
        );

        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.font = "normal 26px pixelFont";
        this.ctx.fillText(`Lifes: ${this.lifes}`, this.ctx.canvas.width - 100, 37);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeText(`Lifes: ${this.lifes}`, this.ctx.canvas.width - 100, 37);
        this.ctx.restore();
        this.setSprite();
    }


    checkCollisions(){

        let leftOfBall = this.ball.x - this.ball.r;
        let rightOfBall = this.ball.x + this.ball.r;
        let topOfBall = this.ball.y - this.ball.r;
        let bottomOfBall = this.ball.y + this.ball.r;

        let leftOfPlayer = this.player.x;
        let rightOfPlayer = this.player.x + this.player.width;
        let topOfPlayer = this.player.y;
        let bottomOfPlayer = this.player.y + this.player.height;

        //------ PLAYER-WALLS COLLISIONS ------

        // Prevents player go off screen by left side
        if(leftOfPlayer <= this.ball.r){leftOfPlayer = 0};
        // Prevents player go off screen by left side
        if(rightOfPlayer >= this.ctx.canvas.width){leftOfPlayer = this.ctx.canvas.width - this.player.width};


        //------ BALL-BRICKS COLLISIONS ------
        for(let column = 0; column < this.bricks.brickColumns; column++){
            for(let row = 0; row < this.bricks.brickRows; row++){
                
                let currentBrick = this.bricks.bricksArr[column][row];
                let topOfCurrentBrick = currentBrick.y;
                let bottomOfCurrentBrick = currentBrick.y + this.bricks.brickHeight;
                let leftOfCurrentBrick = currentBrick.x;
                let rightOfCurrentBrick = currentBrick.x + this.bricks.brickWidth;

                if(currentBrick.status > 0){

                    // Ball bounce top and bottom of bricks
                    if(bottomOfBall > topOfCurrentBrick && topOfBall < topOfCurrentBrick && leftOfBall > leftOfCurrentBrick && rightOfBall < rightOfCurrentBrick ||
                        bottomOfBall > bottomOfCurrentBrick && topOfBall < bottomOfCurrentBrick && leftOfBall > leftOfCurrentBrick && rightOfBall < rightOfCurrentBrick){
                            this.ball.vy = -(this.ball.vy + 1);
                            currentBrick.status--;
                            this.score++;
                            this.bricks.bricksArr.forEach((arr)=>{arr.filter((brick)=> {brick.status > 0})});
                            this.shootAudio.play();
                    };

                    // Ball bounce left and right of bricks
                    if(bottomOfBall < bottomOfCurrentBrick && topOfBall > topOfCurrentBrick && leftOfBall < leftOfCurrentBrick && rightOfBall > leftOfCurrentBrick ||
                        bottomOfBall < bottomOfCurrentBrick && topOfBall > topOfCurrentBrick && leftOfBall < rightOfCurrentBrick && rightOfBall > rightOfCurrentBrick){
                            this.ball.vx = -this.ball.vx;
                            currentBrick.status--;
                            this.score++;
                            this.bricks.bricksArr.forEach((arr)=>{arr.filter((brick)=> {brick.status > 0})});
                            this.shootAudio.play();
                    };
                    
                    // Ball bounce corners of bricks
                    if(bottomOfBall > topOfCurrentBrick && topOfBall < topOfCurrentBrick && leftOfBall < leftOfCurrentBrick && rightOfBall > leftOfCurrentBrick ||
                        bottomOfBall > topOfCurrentBrick && topOfBall < topOfCurrentBrick && leftOfBall < rightOfCurrentBrick && rightOfBall > rightOfCurrentBrick ||
                        topOfBall < bottomOfCurrentBrick && bottomOfBall > bottomOfCurrentBrick && leftOfBall < leftOfCurrentBrick && rightOfBall > leftOfCurrentBrick ||
                        topOfBall < bottomOfCurrentBrick && bottomOfBall > bottomOfCurrentBrick && leftOfBall < rightOfCurrentBrick && rightOfBall > rightOfCurrentBrick){
                            this.ball.vx = -this.ball.vx + 1;
                            this.ball.vy = -(this.ball.vy + 1);
                            currentBrick.status--;
                            this.score++;
                            this.bricks.bricksArr.forEach((arr)=>{arr.filter((brick)=> {brick.status > 0})});
                            this.shootAudio.play();
                    };
                }
            }
        };


        //------ BALL-WALLS COLLISIONS ------

        // Ball bounce at top of screen
        if(topOfBall < 0){this.ball.vy = -this.ball.vy};
        // Ball bounce at both sides of screen
        if(rightOfBall > this.ctx.canvas.width || leftOfBall < 0) {this.ball.vx = -this.ball.vx};
        

        //------ BALL-PLAYER COLLISIONS ------
        
        // Ball bounce when collides with top of player
        if(bottomOfBall > topOfPlayer && topOfBall < topOfPlayer && leftOfBall > leftOfPlayer && rightOfBall < rightOfPlayer){ 
            this.ball.vy = -(this.ball.vy + 1);
            this.bounceAudio.play();
            // Left side makes vx of ball negative
            if(rightOfBall < (this.player.x + (this.player.width / 2))){
               if(this.ball.vx  >= 0 && this.ball.vx < 3){this.ball.vx += -7};
               if(this.ball.vx  > -4){this.ball.vx += -4};
            }
            // Right side makes vx of ball positive
            if(leftOfBall > (this.player.x + (this.player.width / 2))){
               if(this.ball.vx <= 0  && this.ball.vx > -3){this.ball.vx += 7};
               if(this.ball.vx  < 4){this.ball.vx += 4};
            }
        };

        // Ball bounce when collides with lateral of player
        if(rightOfBall > leftOfPlayer && leftOfBall < leftOfPlayer && topOfBall > topOfPlayer && bottomOfBall < bottomOfPlayer ||
            leftOfBall < rightOfPlayer && rightOfBall > rightOfPlayer && topOfBall > topOfPlayer && bottomOfBall < bottomOfPlayer){
            this.ball.vx = -this.ball.vx;
            this.bounceAudio.play();
        };

        // Ball bounce when collides with corner of player
        if(rightOfBall > leftOfPlayer && leftOfBall < leftOfPlayer && topOfBall < topOfPlayer && bottomOfBall > topOfPlayer ||
            leftOfBall < rightOfPlayer && rightOfBall > rightOfPlayer && topOfBall < topOfPlayer && bottomOfBall > topOfPlayer){
            this.ball.vx = -(this.ball.vx + 3);
            this.bounceAudio.play();
        };
        

        //------ PROJECTILES-PLAYER COLLISIONS ------
        this.projectiles.projectiles.forEach((projectile)=>{

            let leftOfProjectile = projectile.x - projectile.r;
            let rightOfProjectile = projectile.x + projectile.r;
            let topOfProjectile = projectile.y - projectile.r;
            let bottomOfProjectile = projectile.y + projectile.r;

            if(projectile.status > 0){
                if(bottomOfProjectile > topOfPlayer && topOfProjectile < topOfPlayer && leftOfProjectile > leftOfPlayer && rightOfProjectile < rightOfPlayer ||
                    bottomOfProjectile < bottomOfPlayer && topOfProjectile > topOfPlayer && leftOfProjectile > leftOfPlayer && rightOfProjectile < rightOfPlayer){
                    this.lifes--;
                    projectile.status--;
                    this.hitAudio.play();
                }
            }
        })
    }

    checkLifes(){
        if(this.ball.y + this.ball.r > this.ctx.canvas.height){
            this.lifes--;
            this.explosionAudio.play();
            this.player.init();
            this.ball.init();
            this.gameState = 0;
        }
    }

    checkWin(){
        if(this.score === 24){
            this.stop();
            this.themeAudio.pause();
            this.winAudio.play();
            this.startButton.innerText = "Play Again";
            this.title.innerText = "You Win!";
            this.gameboard.classList.toggle("hidden");
            this.menu.classList.toggle("hidden");
        }
    }

    checkGameOver(){
        if(this.lifes <= 0){
            this.stop();
            this.themeAudio.pause();
            this.startButton.innerText = "Play Again";
            this.title.innerText = `Game Over \nScore: ${this.score}`;
            this.gameboard.classList.toggle("hidden");
            this.menu.classList.toggle("hidden");
            this.gameOverAudio.play();
        }
    }
};
