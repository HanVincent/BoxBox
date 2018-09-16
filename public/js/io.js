const pressed = { forward: false, backward: false, right: false, left: false, change: false, attack: false }

function updateKeys(e) {
  const isPressed = e.type === "keydown";
  switch (e.keyCode) {
    case 81: // q
      if (!e.repeat) isPressed ? show(BOARD_TEXT) : hide(BOARD_TEXT);
      break;
    case 72: // h
      if (!e.repeat) isPressed ? show(HELP_TEXT) : hide(HELP_TEXT);
      break;
    case 87: // w
      pressed.forward = isPressed;
      break;
    case 83: // s
      pressed.backward = isPressed;
      break;
    case 65: // a
      pressed.left = isPressed;
      break;
    case 68: // d 
      pressed.right = isPressed;
      break;
    case 75: // k
      pressed.attack = isPressed;
      break;
    case 74: // j
      pressed.change = isPressed;
      break;
  }
  socket.emit("keypress", pressed);
}


let socket = null;
function setupSocket(name) {
  socket = io("", { query: `name=${name}` });

  socket.on("connect", () => {
    document.addEventListener("keydown", updateKeys);
    document.addEventListener("keyup", updateKeys);
  });

  socket.on("init", data => {
    console.log(data);
  });

  socket.on("boxes", players => {
    players.forEach(player => {
      (!boxes[player.id]) ? changeSprite(player, "box") : moveSprite(player);

      if (player.id === socket.id) {
        updateAbility(player);
      }
    })
  });

  socket.on("board", data => {
    BOARD_TEXT.text = formatBoard(data);
  });

  socket.on("attacks", attacks => {
    const [knives, bullets, bombs] = attacks;

    knives.forEach(knife => { knifeAttack(knife.x, knife.y); });
    bullets.forEach(bullet => { bullet.isGone ? removeSprite(bullet.id) : changeSprite(bullet, "bullet"); });
    bombs.forEach(bomb => { bombAttack(bomb.x, bomb.y); });
  });

  socket.on("deadAndReborn", ({ dead: deadBoxes = [], reborn: rebornBoxes = [] }) => {
    deadBoxes.forEach(box => { changeSprite(box, "blood"); });
    rebornBoxes.forEach(box => { changeSprite(box, "box"); });
  })

  socket.on("remove", id => {
    removeSprite(id);
  });
}

function padding(txt, length = 10) {
  return (Array(length).join(" ") + txt).slice(-length);
}

function formatBoard(board) {
  return board.reduce((acc, player) => {
    return (
      acc +
      padding(player.name) +
      padding(player.kill) +
      padding(player.dead) +
      "\n"
    );
  }, padding("Name") + padding("Kill") + padding("Dead") + "\n");
}
