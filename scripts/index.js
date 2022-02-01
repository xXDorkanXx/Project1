const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const background = new Background(ctx);
const bricks = new Bricks(ctx);
const player = new Player(ctx);
const ball = new Ball(ctx, player);


const game = new Game(ctx, background, bricks, player, ball);


const startButton = document.getElementById("start-button");
const gameboard = document.getElementById("gameboard");
const menu = document.getElementById("menu");
const general = document.getElementById("general");

let canvasX;

startButton.onclick = ()=> {
  startButton.blur();
  canvas.focus();
  gameboard.classList.toggle("hidden");
  menu.classList.toggle("hidden");
  game.startGame();
  canvasX = gameboard.getBoundingClientRect().left;
};

canvas.addEventListener(
  "mousemove",
  (event)=>{
      player.x = event.clientX - canvasX - (player.width / 2);
      console.log("event: ", event.clientX)
      console.log("player: ", player.x)
      if(player.x <= 0){player.x = 0};
      if(player.x + player.width > ctx.canvas.width){player.x = ctx.canvas.width - player.width};
      if(game.gameState === 0){ball.x = player.x + player.width / 2};
  }
)