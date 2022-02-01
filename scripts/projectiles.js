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
    }

    move(frames){
        if(frames % 30 === 0){
            console.log(frames)
            this.projectiles.push(this.getNewProjectile())
        }

        this.projectiles.forEach((projectile)=>{
            projectile.y += projectile.vy;
            //if(projectile.y < this.ctx.canvas.height) this.projectiles = this.projectiles.filter((projectile)=>projectile);
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

        /*
        let randomColumn = Math.floor(Math.random() * 6);
        let randomRow = Math.floor(Math.random() * 4);

        let randomBrick = this.bricks.bricksArr[randomColumn][randomRow];

        if(randomBrick === undefined) this.randomShooterBrick;
        if(randomBrick.status === 0) this.randomShooterBrick;
        if(randomBrick.status === 1) return randomBrick;
        */

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
            }
        })
        
    }
};