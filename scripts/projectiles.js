class Projectiles{
    constructor(ctx, bricks, frames){
        this.ctx = ctx;
        this.bricks = bricks;
        this.frames = frames;
        this.r = 3;
        this.stAng = 0;
        this.endAng = Math.PI * 2;
        this.x;
        this.y;
        this.vy = 5;
        this.projectiles = [];
        this.enemieShootAudio = new Audio("/sounds/enemie_shoot2.wav");
    }

    //init();

    move(frames){
        if(frames % 25 === 0){
            console.log(frames)
            this.projectiles.push(this.getNewProjectile());
        }

        this.projectiles.forEach((projectile)=>{
            projectile.y += projectile.vy;
        })
    }

    getNewProjectile(){

        let randomBrick = this.randomShooterBrick()
        let randomX = randomBrick.x + (this.bricks.brickWidth / 2);
        let randomY = randomBrick.y;
        let brickStatus = randomBrick.status;

        const newProjectile = {
            x: randomX,
            y: randomY,
            status: brickStatus,
            soundStatus: 1,
            vy: this.vy,
            r: this.r,
            stAng: this.stAng,
            endAng: this.endAng
        }

        return newProjectile;
    }

    randomShooterBrick(){

        let randomColumn = Math.floor(Math.random() * this.bricks.bricksArr.length);
        let randomRow = Math.floor(Math.random() * this.bricks.bricksArr[randomColumn].length);

        return this.bricks.bricksArr[randomColumn][randomRow];

    }

    draw(){
        this.projectiles.forEach((projectile)=>{
            if(projectile.status === 1){
                this.ctx.beginPath();
                this.ctx.arc(projectile.x, projectile.y, projectile.r, projectile.stAng, projectile.endAng);
                this.ctx.fillStyle = "lightgoldenrodyellow";
                this.ctx.fill();
                this.ctx.strokeStyle = "orange";
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                this.ctx.closePath();
                if(projectile.soundStatus === 1){
                    this.enemieShootAudio.play();
                    projectile.soundStatus = 0;
                }
            }
        })
        
    }
};