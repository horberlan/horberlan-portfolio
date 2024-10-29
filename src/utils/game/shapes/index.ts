function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x,
  y,
  size,
  fillColor,
  strokeWidth,
  strokeColor
) {
  ctx.fillStyle = fillColor;
  roundRect(ctx, x, y, size, size, size / 2);
  ctx.fill();

  if (strokeWidth && strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    roundRect(ctx, x, y, size, size, size / 5);
    ctx.stroke();
  }
}

export function drawDiamond(
  ctx: CanvasRenderingContext2D,
  x,
  y,
  size,
  fillColor,
  strokeWidth,
  strokeColor
) {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y);
  ctx.lineTo(x + size, y + size / 2);
  ctx.lineTo(x + size / 2, y + size);
  ctx.lineTo(x, y + size / 2);
  ctx.closePath();
  ctx.fill();

  if (strokeWidth && strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y);
    ctx.lineTo(x + size, y + size / 2);
    ctx.lineTo(x + size / 2, y + size);
    ctx.lineTo(x, y + size / 2);
    ctx.closePath();
    ctx.stroke();
  }
}

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  x,
  y,
  size,
  fillColor,
  strokeWidth,
  strokeColor
) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, size, size);

  if (strokeWidth && strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeRect(x, y, size, size);
  }
}
