let socket = null;

function setupSocket(name) {
  socket = io("", { query: `name=${name}` });

  socket.on("connect", () => {
    console.log("Connected to server. EventListener is on");

    document.addEventListener("keydown", updateKeys);
    document.addEventListener("keyup", updateKeys);
  });

  socket.on("boxes", data => {
    players = data;
  });

  socket.on("board", data => {
    BOARD_TEXT.text = formatBoard(data);
  });
  
  socket.on("attacks", attacks => {
    const [knives, bombs] = attacks;

    for (let knife of knives) {
      knifeAttack(knife.x, knife.y);
    }
    for (let bomb of bombs) {
      bombAttack(bomb.x, bomb.y);
    }
  });

  socket.on("remove", id => {
    removeSprite(id);
  });
}
