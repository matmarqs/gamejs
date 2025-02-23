const ANIMATION_TIME = 100; // in frames
const SPRITE_HEIGHT = 100;  // in pixels
const SPRITE_WIDTH = 100;   // in pixels
const JUMP_SPEED = -8;
const MOVE_SPEED = 5;
const MAXY_SPEED = 10;  // due to air resistance

let imageStrings = []
for (let i = 0; i < 3; i++) {
  imageStrings[i] = `./img/gato_maca${i}.png`;
}

class Player {
  constructor(game) {
    this.game = game;

    this.spriteWidth = SPRITE_WIDTH;
    this.spriteHeight = SPRITE_HEIGHT;

    // these variables are resized
    this.width;
    this.height;
    this.ground;
    this.jumpSpeed;
    this.moveSpeed;
    this.maxYSpeed;

    this.x;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    this.animationTime = ANIMATION_TIME;
    this.animation = 0;
    this.moving = false;
    this.facingRight = true;
    this.onTheGround = false;

    this.images = [];
    for (let i = 0; i < imageStrings.length; i++) {
      this.images[i] = new Image();
      this.images[i].src = imageStrings[i];
    }
  }

  resize() {
    const ratio = this.game.ratio
    this.x = this.game.width / 3;
    this.width = this.spriteWidth * ratio;
    this.height = this.spriteHeight * ratio;
    this.ground = this.game.baseGround(this);
    this.jumpSpeed = JUMP_SPEED * ratio;
    this.moveSpeed = MOVE_SPEED * ratio;
    this.maxYSpeed = MAXY_SPEED * ratio;
  }

  update() {
    const game = this.game;
    const onTheGround = this.isOnGround();

    // handling jump 
    if (game.inputUp && onTheGround) {
      this.vy = this.jumpSpeed;
    }

    // handling movement
    this.moving = true
    if (game.inputLeft && !game.inputRight) {
      this.vx = -this.moveSpeed;
      this.facingRight = false;
    }
    else if (!game.inputLeft && game.inputRight) {
      this.vx = this.moveSpeed;
      this.facingRight = true;
    }
    else {
      this.vx = 0;
      this.moving = false;
    }

    if (onTheGround) {
      if (!this.moving)
        this.animation = 1;
      else
        this.animation = (game.time % this.animationTime < this.animationTime / 4) ? 0 :
          (game.time % this.animationTime < 2 * this.animationTime / 4) ? 1 :
            (game.time % this.animationTime < 3 * this.animationTime / 4) ? 2 : 1;
    }
    else
      this.animation = 0;

    this.vy = Math.min(this.vy += game.gravity, this.maxYSpeed);  // maxYSpeed due to air resistance
    this.y += this.vy

    if (this.isOnGround())
      this.y = this.ground;

    //this.x += this.vx;
  }

  draw() {
    const context = this.game.context;
    // Flip image if facing left
    context.save();
    if (this.facingRight) {
      context.scale(-1, 1);
      context.drawImage(
        this.images[this.animation],
        -this.x - this.width, // adjust for flipped positioning
        this.y, this.width, this.height);
    } else {
      context.drawImage(this.images[this.animation], this.x, this.y, this.width, this.height);
    }
    context.restore();
  }

  isOnGround() {
    return (this.y >= this.ground);
  }
}
