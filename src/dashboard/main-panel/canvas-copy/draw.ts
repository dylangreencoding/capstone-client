

export function draw (ctx: any, canvasWidth: number, canvasHeight: number, mouse: any, savedMap: any) {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = "#252525";
  ctx.lineWidth = 1;

  // draw grid
  for (let x = savedMap.x - savedMap.scale/2; x <= (savedMap.width * savedMap.scale) + savedMap.x; x += savedMap.scale) {
    ctx.beginPath();
    ctx.moveTo(x, savedMap.y - savedMap.scale/2);
    ctx.lineTo(x, (savedMap.height * savedMap.scale) + savedMap.y - savedMap.scale/2);
    ctx.moveTo(x, savedMap.y - savedMap.scale/2);
    ctx.closePath();
    ctx.stroke();
  }
  for (let y = savedMap.y - savedMap.scale/2; y <= (savedMap.height * savedMap.scale) + savedMap.y; y += savedMap.scale) {
    ctx.beginPath();
    ctx.moveTo(savedMap.x - savedMap.scale/2, y);
    ctx.lineTo((savedMap.width * savedMap.scale) - savedMap.scale/2 + savedMap.x, y);
    ctx.moveTo(savedMap.x - savedMap.scale/2, y);
    ctx.closePath();
    ctx.stroke();
  }

  // draw selectables
  for (const key of Object.keys(savedMap.selectFrom)) {
    savedMap.selectFrom[key].type === 'location' ? 
    ctx.fillStyle = 'darkgreen' : 
    ctx.fillStyle = 'blue';
    
    ctx.beginPath();
    ctx.arc(savedMap.selectFrom[key].x, savedMap.selectFrom[key].y, savedMap.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }

  // draw lines
  for (const line of savedMap.lines) {
    ctx.strokeStyle = '#737373';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(line.aX, line.aY);
    ctx.lineTo(line.bX, line.bY);
    ctx.moveTo(line.aX, line.aY);
    ctx.closePath();
    ctx.stroke();
  }

  // draw selected/selector tools
  if (savedMap.tool === 'none') {
    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.strokeRect(savedMap.selected.x - savedMap.scale*0.5, savedMap.selected.y - savedMap.scale*0.5, savedMap.scale, savedMap.scale)

    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

  } else if (savedMap.tool === 'add line') {
    ctx.fillStyle = '#e0e0e0a6';
    
    ctx.beginPath();
    ctx.fillRect(savedMap.selected.x - savedMap.scale*0.25, savedMap.selected.y - savedMap.scale*0.25, savedMap.scale*0.5, savedMap.scale*0.5)
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.3, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#e0e0e0a6';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
    ctx.lineTo(mouse.selector.x, mouse.selector.y);
    ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
    ctx.closePath();
    ctx.stroke();

  } else if (savedMap.tool === 'add location') {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.strokeRect(savedMap.selected.x - savedMap.scale*0.5, savedMap.selected.y - savedMap.scale*0.5, savedMap.scale, savedMap.scale)
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

  } else if (savedMap.tool === 'move') {
    ctx.lineWidth = 1;
    
    if (mouse.canGoHere) {
      ctx.strokeStyle = 'gold';
      ctx.beginPath();
      ctx.strokeRect(savedMap.selected.x - savedMap.scale*0.5, savedMap.selected.y - savedMap.scale*0.5, savedMap.scale, savedMap.scale)
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.lineTo(mouse.selector.x, mouse.selector.y);
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.35, 0, Math.PI*2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouse.selector.x - savedMap.scale*0.35, mouse.selector.y);
      ctx.lineTo(mouse.selector.x + savedMap.scale*0.35, mouse.selector.y);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouse.selector.x, mouse.selector.y - savedMap.scale*0.35);
      ctx.lineTo(mouse.selector.x, mouse.selector.y + savedMap.scale*0.35);
      ctx.closePath();
      ctx.stroke();
      
    } else if (!mouse.canGoHere) {

      ctx.strokeStyle = "gold"
      ctx.beginPath();
      ctx.strokeRect(savedMap.selected.x - savedMap.scale*0.5, savedMap.selected.y - savedMap.scale*0.5, savedMap.scale, savedMap.scale)
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = "#e0e0e0a6"
      ctx.beginPath();
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.lineTo(mouse.selector.x, mouse.selector.y);
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = "#a00000"
      ctx.beginPath();
      ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.3, 0, Math.PI*2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouse.selector.x - savedMap.scale*0.3, mouse.selector.y);
      ctx.lineTo(mouse.selector.x + savedMap.scale*0.3, mouse.selector.y);
      ctx.closePath();
      ctx.stroke();
    }

  } else if (savedMap.tool === 'shoot') {
    ctx.lineWidth = 1;
    
    if (mouse.canGoHere) {
      ctx.strokeStyle = "#e0e0e0a6"
      
      ctx.beginPath();
      ctx.strokeRect(savedMap.selected.x - savedMap.scale*0.5, savedMap.selected.y - savedMap.scale*0.5, savedMap.scale, savedMap.scale)
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = "#f00000"

      ctx.beginPath();
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.lineTo(mouse.selector.x, mouse.selector.y);
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.35, 0, Math.PI*2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouse.selector.x - savedMap.scale*0.35, mouse.selector.y);
      ctx.lineTo(mouse.selector.x + savedMap.scale*0.35, mouse.selector.y);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouse.selector.x, mouse.selector.y - savedMap.scale*0.35);
      ctx.lineTo(mouse.selector.x, mouse.selector.y + savedMap.scale*0.35);
      ctx.closePath();
      ctx.stroke();

    } else if (!mouse.canGoHere) {
      ctx.strokeStyle = "#e0e0e0a6"
      
      ctx.beginPath();
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.lineTo(mouse.selector.x, mouse.selector.y);
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.closePath();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.strokeRect(savedMap.selected.x - savedMap.scale*0.5, savedMap.selected.y - savedMap.scale*0.5, savedMap.scale, savedMap.scale)
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#a00000"
      ctx.beginPath();
      ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.3, 0, Math.PI*2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouse.selector.x - savedMap.scale*0.3, mouse.selector.y);
      ctx.lineTo(mouse.selector.x + savedMap.scale*0.3, mouse.selector.y);
      ctx.closePath();
      ctx.stroke();
    }
  } else if (savedMap.tool.length > 20) {
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.35, 0, Math.PI*2);
      ctx.closePath();
      ctx.stroke();
  }
  
    // chatmessages
    if (savedMap.messages) {
      ctx.font = "18px monospace";
      ctx.fillStyle = '#e0e0e0a6';
      let line = canvasHeight - 18;
      for (let i = savedMap.messages.length -1; i >= 0; i--) {
        ctx.fillText(savedMap.messages[i], 10, line);
        line -= 18;
      }
    }
}