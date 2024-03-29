

export function draw (ctx: any, canvasWidth: number, canvasHeight: number, mouse: any, savedMap: any) {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = "#252525";
  ctx.lineWidth = 1;

  ///////////////////////////////////////
  // draw grid //////////////////////////
  // optimized to only draw the part of the grid that is within the canvas
  // probably less efficient for small maps
  // certainly more efficient with very large maps
  const verticalLineTop = savedMap.y >= 0 ? savedMap.y : 0 ;
  const verticalLineBottom = savedMap.y + (savedMap.height * savedMap.scale) <= canvasHeight ? (savedMap.y + savedMap.height * savedMap.scale) - savedMap.scale : canvasHeight ;

  const horizontalLineLeft = savedMap.x >= 0 ? savedMap.x : 0 ;
  const horizontalLineRight = savedMap.x + (savedMap.width * savedMap.scale) <= canvasWidth ? (savedMap.x + savedMap.width*savedMap.scale) - savedMap.scale : canvasWidth ;

  for (let x = savedMap.x; x <= (savedMap.x + savedMap.width*savedMap.scale) - savedMap.scale; x += savedMap.scale) {
    ctx.beginPath();
    ctx.arc(x, verticalLineTop, savedMap.scale*0.2, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, verticalLineBottom, savedMap.scale*0.2, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, verticalLineTop);
    ctx.lineTo(x, verticalLineBottom);
    ctx.moveTo(x, verticalLineTop);
    ctx.closePath();
    ctx.stroke();
  }
  for (let y = savedMap.y; y <= (savedMap.y + savedMap.height*savedMap.scale) - savedMap.scale; y += savedMap.scale) {
    ctx.beginPath();
    ctx.arc(horizontalLineLeft, y, savedMap.scale*0.2, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(horizontalLineRight, y, savedMap.scale*0.2, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(horizontalLineLeft, y);
    ctx.lineTo(horizontalLineRight, y);
    ctx.moveTo(horizontalLineLeft, y);
    ctx.closePath();
    ctx.stroke();
  }
  /////////////////////////////////
  /////////////////////////////////






  // draw entities
  for (const key of Object.keys(savedMap.entities)) {
    ctx.fillStyle = savedMap.entities[key].color;
    
    ctx.beginPath();
    ctx.arc(savedMap.entities[key].x + savedMap.x, savedMap.entities[key].y + savedMap.y, savedMap.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }






  // draw lines
  for (const line of savedMap.lines) {
    ctx.strokeStyle = '#737373';
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.moveTo(line.aX + savedMap.x, line.aY + savedMap.y);
    ctx.lineTo(line.bX + savedMap.x, line.bY + savedMap.y);
    ctx.moveTo(line.aX + savedMap.x, line.aY + savedMap.y);
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
    
    if (savedMap.selected.x === undefined || savedMap.selected.y === undefined) {
      ctx.beginPath();
      ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.3, 0, Math.PI*2);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(savedMap.selected.x, savedMap.selected.y, savedMap.scale*0.3, 0, Math.PI*2);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.strokeStyle = '#e0e0e0a6';
    ctx.lineWidth = 6;

    const diffX = savedMap.selected.x - mouse.selector.x;
    const diffY = savedMap.selected.y - mouse.selector.y;
    console.log('LINE', diffX, diffY)

    // horizontal line
    if (Math.abs(diffX) > 2 * Math.abs(diffY)) {
      ctx.beginPath();
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.lineTo(mouse.selector.x, savedMap.selected.y);
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.closePath();
      ctx.stroke();

    // vertical line
    } else if (Math.abs(diffY) > 2 * Math.abs(diffX)) {
      ctx.beginPath();
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.lineTo(savedMap.selected.x, mouse.selector.y);
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.closePath();
      ctx.stroke();

    // diagonal lines (quadrants II and IV)
    } else if ((diffX >= 0 && diffY >= 0) || (diffX < 0 && diffY < 0)) {
      ctx.beginPath();
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.lineTo(savedMap.selected.x + (mouse.selector.x - savedMap.selected.x), savedMap.selected.y + (mouse.selector.x - savedMap.selected.x));
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.closePath();
      ctx.stroke();

    // diagonal lines (quadrants I and III)
    } else if ((diffX >= 0 && diffY < 0) || (diffY >= 0 && diffX < 0)) {
      ctx.beginPath();
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.lineTo(savedMap.selected.x + (mouse.selector.x - savedMap.selected.x), savedMap.selected.y - (mouse.selector.x - savedMap.selected.x));
      ctx.moveTo(savedMap.selected.x, savedMap.selected.y);
      ctx.closePath();
      ctx.stroke();
    }
    

  } else if (savedMap.tool === 'add location') {
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.strokeRect(savedMap.selected.x - savedMap.scale*0.5, savedMap.selected.y - savedMap.scale*0.5, savedMap.scale, savedMap.scale)
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(mouse.selector.x, mouse.selector.y, savedMap.scale*0.35, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();

  } else if (savedMap.tool === 'move') {
    ctx.lineWidth = 1;
    
    if (mouse.canGoHere || savedMap.selected.x === undefined || savedMap.selected.y === undefined) {
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
    
    if (mouse.canGoHere || savedMap.selected.x === undefined || savedMap.selected.y === undefined) {
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
      ctx.strokeStyle = 'grey';
      ctx.lineWidth = 2;
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