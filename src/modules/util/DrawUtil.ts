import { Vector2D } from "./Vector2D";

/**
 * Draws a line from point start to end.
 * @param ctx The context of the canvas to draw on.
 * @param start The start point of the line.
 * @param end The end point of the line.
 */
export function drawLine(ctx: CanvasRenderingContext2D, start: Vector2D, end: Vector2D) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}
