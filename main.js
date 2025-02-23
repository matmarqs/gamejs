//board
let board;
let boardWidth = 1800;
let boardHeight = 640;
let context;

// main character
let playerWidth = 100;
let playerHeight = 100;
const ground = boardHeight - playerHeight - 40;
let playerX = boardWidth / 8;
let playerY = ground;
let playerImgs = [];

let player = {
  x: playerX,
  y: playerY,
  w: playerWidth,
  h: playerHeight,
  vx: 0,
  vy: 0,
  moving: false,
  facingRight: true,
  onTheGround: false,
  animation: 0,
}

// game variables
let time = 0;
let gravity = 0.1;
let gameOver = false;
let maxVelocity = 10;  // maximum velocity due to air resistance
const moveVelocity = 3;
const jumpVelocity = -8;

let inputUp = false;
let inputDown = false;
let inputRight = false;
let inputLeft = false;

let appleWidth = 20;
let appleHeight = 20;

const animationTime = 45;

// runned when loading the page
window.onload = function() {
  loadGame();
  requestAnimationFrame(updateFrame); // callback as an argument each frame
}

function loadGame() {
  // canvas element with id="board"
  board = document.querySelector("#board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  loadImages();

  // listen to user keyboard
  document.addEventListener("keydown", keydownHandling);
  document.addEventListener("keyup", keyupHandling);
}

function loadImages() {
  playerImgs[0] = new Image();
  playerImgs[0].src = "./img/gato_maca0.png";
  playerImgs[1] = new Image();
  playerImgs[1].src = "./img/gato_maca1.png";
  playerImgs[2] = new Image();
  playerImgs[2].src = "./img/gato_maca2.png";

  appleImage = new Image();
  appleImage.src = "./img/apple.png";
}

function updateFrame() {
  time += 1;

  if (gameOver) {
    context.fillText("GAME OVER", 5, 90);
    return;
  }

  context.clearRect(0, 0, board.width, board.height);

  // handling jump 
  if (inputUp && player.onTheGround) {
    player.vy = jumpVelocity;
  }

  // handling movement
  player.moving = true
  if (inputLeft && !inputRight) {
    player.vx = -moveVelocity;
    player.facingRight = false;
  }
  else if (!inputLeft && inputRight) {
    player.vx = moveVelocity;
    player.facingRight = true;
  }
  else {
    player.vx = 0;
    player.moving = false;
  }

  if (player.onTheGround) {
    if (!player.moving) {
      player.animation = 1;
    }
    else {
      player.animation = (time % animationTime < animationTime / 3) ? 0 :
        (time % animationTime < 2 * animationTime / 3) ? 1 : 2;
    }
  }
  else {
    player.animation = 0;
  }
  //player.animation = !player.moving ? 0 : (time % 30 < 15) ? 1 : 2;

  player.vy = Math.min(player.vy += gravity, maxVelocity);  // maxVelocity due to air resistance
  player.y += player.vy
  if (detectOnTheGround())
    player.y = ground;

  player.x += player.vx;

  drawToCanvas();

  requestAnimationFrame(updateFrame);
}

function detectOnTheGround() {
  return (player.onTheGround = (player.y >= ground));
}

//function firePower() {
//  context.save()
//  let angle = 2 * Math.PI * (time % 60);
//  context.rotate(angle);
//  context.drawImage(appleImage, -appleWidth / 2, -appleHeight / 2);
//}

function drawToCanvas() {
  // Flip image if facing left
  context.save();
  if (player.facingRight) {
    context.scale(-1, 1);
    context.drawImage(
      playerImgs[player.animation],
      -player.x - player.w,  // Adjust for flipped positioning
      player.y,
      player.w,
      player.h
    );
  } else {
    context.drawImage(playerImgs[player.animation], player.x, player.y, player.w, player.h);
  }
  context.restore();
}

function keyupHandling(ev) {
  switch (ev.code) {
    case "KeyW":
      inputUp = false;
      break;
    case "KeyS":
      inputDown = false;
      break;
    case "KeyD":
      inputRight = false;
      break;
    case "KeyA":
      inputLeft = false;
      break;
    default:
      break;
  }
}

function keydownHandling(ev) {
  switch (ev.code) {
    case "KeyW":
      if (player.onTheGround) {
        player.onTheGround = false;
      }
      inputUp = true;
      break;
    case "KeyS":
      inputDown = true;
      break;
    case "KeyD":
      inputRight = true;
      break;
    case "KeyA":
      inputLeft = true;
      break;
    //case "Space":
    //  firePower();
    default:
      break;
  }
}
