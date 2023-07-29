const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 1;
const JUMP_FORCE = 35;
const FRICTION = 0.8; // Friction to slow down movement at hard borders

let isJumping = false;
let isHardMode = false; // Flag for hard mode
let player = {
  x: 50,
  y: canvas.height - 140, // Adjusted Mario's initial position to match the increased size
  width: 45, // Increased width to 45 (original width * zoom level)
  height: 45, // Increased height to 45 (original height * zoom level)
  speed: 3,
  velocityX: 0,
  velocityY: 0,
};

let marioImage = new Image();
marioImage.src = "mario.png";

marioImage.onload = function () {
  update();
};

let obstacles = [
  { x: 250, y: canvas.height - 80, width: 100, height: 50 },
  { x: 400, y: canvas.height - 120, width: 80, height: 60 },
  // Add more obstacles here as needed
];

let powerUpBoxes = [
  { x: 500, y: canvas.height - 150, width: 40, height: 40 },
  // Add more power-up boxes here as needed
];

function drawPlayer() {
  ctx.drawImage(marioImage, player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = "brown";
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.strokeStyle = "black"; // Add black border
    ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function drawPowerUpBoxes() {
  ctx.fillStyle = "yellow";
  powerUpBoxes.forEach((box) => {
    ctx.fillRect(box.x, box.y, box.width, box.height);
  });
}

function checkCollision(rect1, rect2) {
  // Adjust the obstacle's boundaries based on Mario's size
  const rect2Adjusted = {
    x: rect2.x - (player.width - 32) / 2, // Adjust the x-coordinate based on the difference in widths
    y: rect2.y - (player.height - 32) / 2, // Adjust the y-coordinate based on the difference in heights
    width: rect2.width + (player.width - 32), // Adjust the width based on the difference in widths
    height: rect2.height + (player.height - 32), // Adjust the height based on the difference in heights
  };

  return (
    rect1.x < rect2Adjusted.x + rect2Adjusted.width &&
    rect1.x + rect1.width > rect2Adjusted.x &&
    rect1.y < rect2Adjusted.y + rect2Adjusted.height &&
    rect1.y + rect1.height > rect2Adjusted.y
  );
}

function handleCollisions() {
  let isOnGround = false;
  let nextX = player.x + player.velocityX;
  let nextY = player.y + player.velocityY;

  obstacles.forEach((obstacle) => {
    if (
      nextX + player.width >= obstacle.x &&
      nextX <= obstacle.x + obstacle.width &&
      nextY + player.height >= obstacle.y &&
      nextY <= obstacle.y + obstacle.height
    ) {
      // Handle collision with obstacle
      player.velocityX *= -FRICTION; // Bounce back with friction

      // If Mario's bottom is above the obstacle top, consider him on the ground
      if (
        player.y + player.height <= obstacle.y &&
        player.velocityY >= 0 &&
        player.y + player.height + player.velocityY >= obstacle.y - GRAVITY * 2 // Adjusted tolerance for collision detection
      ) {
        isOnGround = true;
        player.velocityY = 0;
        player.y = obstacle.y - player.height;
      }
    }
  });

  // If Mario is not on the ground, apply gravity
  if (!isOnGround) {
    player.velocityY += GRAVITY;
  }

  powerUpBoxes.forEach((box) => {
    if (checkCollision(player, box)) {
      // Handle collision with power-up box
      box.x = -100; // Move the box off-screen (remove it)
      // Add logic to give Mario power-up, increase score, etc.
    }
  });
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

  handleCollisions();

  // Update canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();
  drawPowerUpBoxes();

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
  } else if (event.key === "h") {
    // Toggle hard mode with 'h' key
    isHardMode = !isHardMode;
    player.velocityY = 0; // Reset vertical velocity when toggling
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    player.velocityX = 0;
  }
});
