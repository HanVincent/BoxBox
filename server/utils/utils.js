const { MAP, BOX } = require("../config/game");

function genLoc() {
  let x = Math.floor(Math.random() * (MAP.maxWidth - BOX.size));
  let y = Math.floor(Math.random() * (MAP.maxHeight - BOX.size));

  return [x, y];
}

function isAnyCollided(x, y, boxes) {
  if (boxes.length === 0) return false;

  const checkAll = boxes.map(el => isCollided(x, y, el.x, el.y));
  return checkAll.some(k => k);
}

function isCollided(x1, y1, x2, y2) {
  if (Math.abs(x1 - x2) > BOX.size || Math.abs(y1 - y2) > BOX.size)
    return false;
  if (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) < Math.pow(BOX.size, 2))
    return true;
  return false;
}

function isBombed(x1, y1, x2, y2) {
  if (Math.abs(x1 - x2) > 2 * BOX.size || Math.abs(y1 - y2) > 2 * BOX.size)
    return false;
  if (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) < Math.pow(2 * BOX.size, 2))
    return true;
  return false;
}


module.exports = { genLoc, isAnyCollided, isCollided,isBombed };
