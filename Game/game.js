const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 1;
const JUMP_FORCE = 15;

let isJumping = false;
let player = {
  x: 50,
  y: canvas.height - 100,
  width: 32,
  height: 32,
  speed: 5,
  velocityX: 0,
  velocityY: 0,
};

let marioImage = new Image();
marioImage.src = "mario.png";

marioImage.onload = function () {
  update();
};

function drawPlayer() {
  ctx.drawImage(marioImage, player.x, player.y, player.width, player.height);
}

function update() {
  // Update player's velocity and position
  player.velocityY += GRAVITY;
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Prevent player from falling through the ground
  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    isJumping = false;
  }

  // Update canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    player.velocityX = player.speed;
  } else if (event.key === "ArrowLeft") {
    player.velocityX = -player.speed;
  } else if (event.key === "ArrowUp" && !isJumping) {
    isJumping = true;
    player.velocityY -= JUMP_FORCE;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    player.velocityX = 0;
  }
});
update(;)