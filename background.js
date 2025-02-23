class Background {
  constructor(game) {
    this.game = game;
    this.image = document.querySelector("#background");
    this.baseWidth = 360;
    this.baseHeight = 640;

    // have to be resized
    this.width;
    this.height
    this.x = 0; // to scroll horizontally
  }

  resize() {
    this.width = this.baseWidth * this.game.ratio;
    this.height = this.baseHeight * this.game.ratio;
    //this.x = 0;
  }

  update() {
    this.x -= this.game.player.vx;
    // cycle the background
    if (this.x <= -this.width) this.x = 0;
    if (this.x >= this.width) this.x = 0;
  }

  draw() {
    for (let i = -4; i <= 4; i++) {
      this.game.context.drawImage(this.image, this.x + i * this.width, 0, this.width, this.height);
    }
  }
}
