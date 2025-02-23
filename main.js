//import Background from "background.js";
//import Player from "player.js";
//import { keydownHandling, keyupHandling } from "controls.js";

const GRAVITY = 0.1;
const GROUND_PIXEL = 53;

class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.background = new Background(this);
    this.player = new Player(this);
    this.baseHeight = this.background.baseHeight;

    this.time = 0;

    // the following will be defined on resize events
    this.ratio;
    this.width;
    this.height;
    this.gravity;

    // resize the window initially
    this.resize(window.innerWidth, window.innerHeight);
    // listen to resize events and resize accordingly
    window.addEventListener('resize', e => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    // input variables
    this.inputUp = false;
    this.inputDown = false;
    this.inputRight = false;
    this.inputLeft = false;

    // listen to user keyboard
    document.addEventListener("keydown", (ev) => {
      keydownHandling(this, ev);
    });
    document.addEventListener("keyup", (ev) => {
      keyupHandling(this, ev);
    });
  }

  resize(width, height) {
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;

    this.ratio = this.height / this.baseHeight;
    this.gravity = GRAVITY * this.ratio;

    this.background.resize();
    this.player.resize();
  }

  update() {
    this.time += 1;
    this.background.update();
    this.player.update();
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);  // clear screen
    this.background.draw();
    this.player.draw();
  }

  baseGround(obj) {
    return this.height - obj.height - GROUND_PIXEL * this.ratio;
  }
}

// runned when loading the page
window.onload = function() {
  canvas = document.querySelector("#canvas");
  context = canvas.getContext("2d");

  const game = new Game(canvas, context);

  function loop() {
    game.update();
    game.render();
    requestAnimationFrame(loop);
  }

  loop();
}
