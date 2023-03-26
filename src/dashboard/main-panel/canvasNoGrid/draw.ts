

export function draw (ctx: any, canvasWidth: number, canvasHeight: number, selector: any, map_: any, savedMap: any) {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  ctx.fillStyle = "#2c2c2c";
  ctx.fillRect(map_.x, map_.y, map_.width * map_.scale, map_.height * map_.scale);
  
  ctx.strokeStyle = "#737373";
  ctx.lineWidth = 1;

  // draw lines
  for (const line of savedMap.lines) {
    ctx.strokeStyle = '#e0e0e0a';
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.moveTo(line.aX, line.aY);
    ctx.lineTo(line.bX, line.bY);
    ctx.moveTo(line.aX, line.aY);
    ctx.closePath();
    ctx.stroke();
  }

  // draw locations
  for (const location of savedMap.locations) {
    ctx.fillStyle = '#a00000';
    ctx.beginPath();
    ctx.arc(location.x, location.y, map_.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }

  // draw selected/selector tools
  if (savedMap.tool === 'none') {
    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(map_.selected.x, map_.selected.y, map_.scale*0.5, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(selector.x, selector.y, map_.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

  } else if (savedMap.tool === 'add line') {
    ctx.fillStyle = '#e0e0e0a6';
    
    ctx.beginPath();
    ctx.fillRect(map_.selected.x - map_.scale*0.25, map_.selected.y - map_.scale*0.25, map_.scale*0.5, map_.scale*0.5)
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(selector.x, selector.y, map_.scale*0.3, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#e0e0e0a6';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(map_.selected.x, map_.selected.y);
    ctx.lineTo(selector.x, selector.y);
    ctx.moveTo(map_.selected.x, map_.selected.y);
    ctx.closePath();
    ctx.stroke();

  } else if (savedMap.tool === 'add location') {
    ctx.strokeStyle = '#a00000';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(map_.selected.x, map_.selected.y, map_.scale*0.5, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(selector.x, selector.y, map_.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();
  }
  
}