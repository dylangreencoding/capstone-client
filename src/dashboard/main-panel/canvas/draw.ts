
interface GridPosition {
  x: number;
  y: number;
  scale: number;
}

export function draw (ctx: any, canvasWidth: number, canvasHeight: number, gridPosition: GridPosition) {
  // to be replaced by user settings
  const mapWidth = 20
  const mapHeight = 10

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // ctx.strokeStyle = "#424242";
  ctx.strokeStyle = "#737373";

  for (let x = gridPosition.x; x <= (mapWidth * gridPosition.scale) + gridPosition.x; x += gridPosition.scale) {
    ctx.beginPath();
    ctx.moveTo(x, gridPosition.y);
    ctx.lineTo(x, (mapHeight * gridPosition.scale) + gridPosition.y);
    ctx.moveTo(x, gridPosition.y);
    ctx.closePath();
    ctx.stroke();
  }
  for (let y = gridPosition.y; y <= (mapHeight * gridPosition.scale) + gridPosition.y; y += gridPosition.scale) {
    ctx.beginPath();
    ctx.moveTo(gridPosition.x, y);
    ctx.lineTo((mapWidth * gridPosition.scale) + gridPosition.x, y);
    ctx.moveTo(gridPosition.x, y);
    ctx.closePath();
    ctx.stroke();
  }
}