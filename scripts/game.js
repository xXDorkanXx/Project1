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
        this.themeAudio = new Audio("/sounds/theme.mp3");
        this.bounceAudio = new Audio("/sounds/bounce.wav");
        this.shootAudio = new Audio("/sounds/shoot.wav");
        this.hitAudio = new Audio("/sounds/hit.wav");
        this.explosionAudio = new Audio("/sounds/explosion.wav");
        this.gameboard = document.getElementById("gameboard");
        this.menu = document.getElementById("menu");
        this.startButton = document.getElementById("start-button");
        this.title = document.getElementById("title");

        window.addEventListener(
            "keydown",
            (event)=>{
                switch(event.key){
                    case " ":
                        this.ball.move();
                        this.gameState = 1;
                        this.bounceAudio.play();
                        break;
                }
            }
        )
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
        this.background.init();
        this.bricks.init();
        this.player.init();
        this.ball.init();
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
        this.player.draw();
        this.ball.draw();
        this.bricks.draw();
        this.projectiles.draw();
        this.drawScore();
        this.drawLifes();
    }

    drawScore(){
        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.font = "normal 26px pixelFont";
        this.ctx.fillText(`Score: ${this.score} pts`, 20, 32);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeText(`Score: ${this.score} pts`, 20, 32);
        this.ctx.restore();
    }

    drawLifes(){
        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.font = "normal 26px pixelFont";
        this.ctx.fillText(`Lifes: ${this.lifes}`, this.ctx.canvas.width - 100, 32);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeText(`Lifes: ${this.lifes}`, this.ctx.canvas.width - 100, 32);
        this.ctx.restore();
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

        //player-walls collisions
        if(leftOfPlayer <= this.ball.r){leftOfPlayer = 0}; //prevents player go off screen by left side
        if(rightOfPlayer >= this.ctx.canvas.width){leftOfPlayer = this.ctx.canvas.width - this.player.width}; //prevents player go off screen by left side

        //ball-bricks collisions
        for(let column = 0; column < this.bricks.brickColumns; column++){
            for(let row = 0; row < this.bricks.brickRows; row++){
                
                let currentBrick = this.bricks.bricksArr[column][row];
                let topOfCurrentBrick = currentBrick.y;
                let bottomOfCurrentBrick = currentBrick.y + this.bricks.brickHeight;
                let leftOfCurrentBrick = currentBrick.x;
                let rightOfCurrentBrick = currentBrick.x + this.bricks.brickWidth;

                if(currentBrick.status > 0){
                    if(bottomOfBall > topOfCurrentBrick && topOfBall < topOfCurrentBrick && leftOfBall > leftOfCurrentBrick && rightOfBall < rightOfCurrentBrick ||
                        bottomOfBall > bottomOfCurrentBrick && topOfBall < bottomOfCurrentBrick && leftOfBall > leftOfCurrentBrick && rightOfBall < rightOfCurrentBrick){ //ball bounce top and bottom of bricks
                            this.ball.vy = -(this.ball.vy + 1);
                            currentBrick.status--;
                            this.score++;
                            this.bricks.bricksArr.forEach((arr)=>{arr.filter((brick)=> {brick.status > 0})});
                            this.shootAudio.play();
                        };
                    if(bottomOfBall < bottomOfCurrentBrick && topOfBall > topOfCurrentBrick && leftOfBall < leftOfCurrentBrick && rightOfBall > leftOfCurrentBrick ||
                        bottomOfBall < bottomOfCurrentBrick && topOfBall > topOfCurrentBrick && leftOfBall < rightOfCurrentBrick && rightOfBall > rightOfCurrentBrick){ //ball bounce left and right of bricks
                            this.ball.vx = -this.ball.vx;
                            currentBrick.status--;
                            this.score++;
                            this.bricks.bricksArr.forEach((arr)=>{arr.filter((brick)=> {brick.status > 0})});
                            this.shootAudio.play();
                        };
                    if(bottomOfBall > topOfCurrentBrick && topOfBall < topOfCurrentBrick && leftOfBall < leftOfCurrentBrick && rightOfBall > leftOfCurrentBrick ||
                        bottomOfBall > topOfCurrentBrick && topOfBall < topOfCurrentBrick && leftOfBall < rightOfCurrentBrick && rightOfBall > rightOfCurrentBrick ||
                        topOfBall < bottomOfCurrentBrick && bottomOfBall > bottomOfCurrentBrick && leftOfBall < leftOfCurrentBrick && rightOfBall > leftOfCurrentBrick ||
                        topOfBall < bottomOfCurrentBrick && bottomOfBall > bottomOfCurrentBrick && leftOfBall < rightOfCurrentBrick && rightOfBall > rightOfCurrentBrick){ //ball bounce corners of bricks
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

        //ball-walls collisions
        if(topOfBall < 0){this.ball.vy = -this.ball.vy}; //ball bounce at top of screen
        if(rightOfBall > this.ctx.canvas.width || leftOfBall < 0) {this.ball.vx = -this.ball.vx}; //ball bounce at both sides of screen
        
        //ball-player collisions
        if(bottomOfBall > topOfPlayer && topOfBall < topOfPlayer && leftOfBall > leftOfPlayer && rightOfBall < rightOfPlayer){ //ball bounce when collides with top of player
            this.ball.vy = -(this.ball.vy + 1);
            this.bounceAudio.play();
            if(rightOfBall < (this.player.x + (this.player.width / 2))){ //left side makes vx of ball negative
               if(this.ball.vx  >= 0 && this.ball.vx < 3){this.ball.vx += -7};
               if(this.ball.vx  > -4){this.ball.vx += -4};
            }
            if(leftOfBall > (this.player.x + (this.player.width / 2))){ //right side makes vx of ball positive
               if(this.ball.vx <= 0  && this.ball.vx > -3){this.ball.vx += 7};
               if(this.ball.vx  < 4){this.ball.vx += 4};
            }
        };

        if(rightOfBall > leftOfPlayer && leftOfBall < leftOfPlayer && topOfBall > topOfPlayer && bottomOfBall < bottomOfPlayer ||
            leftOfBall < rightOfPlayer && rightOfBall > rightOfPlayer && topOfBall > topOfPlayer && bottomOfBall < bottomOfPlayer){ //lateral player bounce
            this.ball.vx = -this.ball.vx;
            this.bounceAudio.play();
        };

        if(rightOfBall > leftOfPlayer && leftOfBall < leftOfPlayer && topOfBall < topOfPlayer && bottomOfBall > topOfPlayer ||
            leftOfBall < rightOfPlayer && rightOfBall > rightOfPlayer && topOfBall < topOfPlayer && bottomOfBall > topOfPlayer){ //corner player bounce
            this.ball.vx = -(this.ball.vx + 3);
            this.bounceAudio.play();
        };
        
        //projectiles-player collisions
        this.projectiles.projectiles.forEach((projectile)=>{
            let leftOfProjectile = projectile.x - projectile.r;
            let rightOfProjectile = projectile.x + projectile.r;
            let topOfProjectile = projectile.y - projectile.r;
            let bottomOfProjectile = projectile.y + projectile.r;
            if(projectile.status > 0){
                if(bottomOfProjectile > topOfPlayer && topOfProjectile < topOfPlayer && leftOfProjectile > leftOfPlayer && rightOfProjectile < rightOfPlayer){
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
        }
    }
};