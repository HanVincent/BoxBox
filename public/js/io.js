const VALID_KEYS = ["w", "s", "a", "d", "j", "k", "h", "q"]; // TODO: 要換成 keyCode
const pressed = new Set();

function isKeyValid(key) {
  return VALID_KEYS.includes(key);
}

function updateKeys(e) {
  if (isKeyValid(e.key)) {
    // TODO: refactor shit code
    if (e.key === "q") {
      if (!e.repeat) e.type === "keydown" ? show(BOARD_TEXT) : hide(BOARD_TEXT);
    } else if (e.key === "h") {
      if (!e.repeat) e.type === "keydown" ? show(HELP_TEXT) : hide(HELP_TEXT);
    } else {
      if (e.type === "keyup") {
        pressed.delete(e.key);
      } else {
        pressed.add(e.key);
        socket.emit("keypress", [...pressed], () => { });
      }
    }
  }
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
