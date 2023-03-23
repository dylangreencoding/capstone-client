

export function draw (ctx: any, canvasWidth: number, canvasHeight: number, selector: any, map_: any, savedMap: any) {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = "#737373";
  ctx.lineWidth = 1;

  // draw grid
  for (let x = map_.x; x <= (map_.width * map_.scale) + map_.x; x += map_.scale) {
    ctx.beginPath();
    ctx.moveTo(x, map_.y);
    ctx.lineTo(x, (map_.height * map_.scale) + map_.y);
    ctx.moveTo(x, map_.y);
    ctx.closePath();
    ctx.stroke();
  }
  for (let y = map_.y; y <= (map_.height * map_.scale) + map_.y; y += map_.scale) {
    ctx.beginPath();
    ctx.moveTo(map_.x, y);
    ctx.lineTo((map_.width * map_.scale) + map_.x, y);
    ctx.moveTo(map_.x, y);
    ctx.closePath();
    ctx.stroke();
  }

  // draw walls
  for (const wall of savedMap.walls) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(wall.aX, wall.aY);
    ctx.lineTo(wall.bX, wall.bY);
    ctx.moveTo(wall.aX, wall.aY);
    ctx.closePath();
    ctx.stroke();
  }

  // draw zombies
  for (const zombie of savedMap.zombies) {
    ctx.fillStyle = 'darkgreen';
    ctx.beginPath();
    ctx.arc(zombie.x + (map_.scale*0.5), zombie.y + (map_.scale*0.5), map_.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }

  // draw selected/selector tools
  if (savedMap.tool === 'none') {
    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.strokeRect(map_.selected.x, map_.selected.y, map_.scale, map_.scale)
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(selector.x + (map_.scale*0.5), selector.y + (map_.scale*0.5), map_.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

  } else if (savedMap.tool === 'add wall') {
    ctx.fillStyle = '#e0e0e0a6';
    
    ctx.beginPath();
    ctx.fillRect(map_.selected.x - map_.scale*0.25, map_.selected.y - map_.scale*0.25, map_.scale*0.5, map_.scale*0.5)
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(selector.x, selector.y, map_.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#e0e0e0a6';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(map_.selected.x, map_.selected.y);
    ctx.lineTo(selector.x, selector.y);
    ctx.moveTo(map_.selected.x, map_.selected.y);
    ctx.closePath();
    ctx.stroke();

  } else if (savedMap.tool === 'add zombie') {
    ctx.strokeStyle = 'darkgreen';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.strokeRect(map_.selected.x, map_.selected.y, map_.scale, map_.scale)
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(selector.x + (map_.scale*0.5), selector.y + (map_.scale*0.5), map_.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();
  }
  
}