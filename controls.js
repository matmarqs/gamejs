function keyupHandling(game, ev) {
  switch (ev.code) {
    case "KeyW":
      game.inputUp = false;
      break;
    case "KeyS":
      game.inputDown = false;
      break;
    case "KeyD":
      game.inputRight = false;
      break;
    case "KeyA":
      game.inputLeft = false;
      break;
    default:
      break;
  }
}

function keydownHandling(game, ev) {
  const player = game.player;
  switch (ev.code) {
    case "KeyW":
      if (player.onTheGround)
        player.onTheGround = false;
      game.inputUp = true;
      break;
    case "KeyS":
      game.inputDown = true;
      break;
    case "KeyD":
      game.inputRight = true;
      break;
    case "KeyA":
      game.inputLeft = true;
      break;
    default:
      break;
  }
}
