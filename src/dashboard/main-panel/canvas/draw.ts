
interface GridPosition {
  x: number;
  y: number;
  scale: number;
  selected: any;
  selector: any;
}

export function draw (ctx: any, canvasWidth: number, canvasHeight: number, gridPosition: GridPosition, map_: any) {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // ctx.strokeStyle = "#424242";
  ctx.strokeStyle = "#737373";

  for (let x = gridPosition.x; x <= (map_.width * gridPosition.scale) + gridPosition.x; x += gridPosition.scale) {
    ctx.beginPath();
    ctx.moveTo(x, gridPosition.y);
    ctx.lineTo(x, (map_.height * gridPosition.scale) + gridPosition.y);
    ctx.moveTo(x, gridPosition.y);
    ctx.closePath();
    ctx.stroke();
  }
  for (let y = gridPosition.y; y <= (map_.height * gridPosition.scale) + gridPosition.y; y += gridPosition.scale) {
    ctx.beginPath();
    ctx.moveTo(gridPosition.x, y);
    ctx.lineTo((map_.width * gridPosition.scale) + gridPosition.x, y);
    ctx.moveTo(gridPosition.x, y);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.strokeStyle = 'gold';
    ctx.beginPath();
    ctx.strokeRect(gridPosition.selected.x, gridPosition.selected.y, gridPosition.scale, gridPosition.scale)
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(gridPosition.selector.x + (gridPosition.scale*0.5), gridPosition.selector.y + (gridPosition.scale*0.5), gridPosition.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();
}