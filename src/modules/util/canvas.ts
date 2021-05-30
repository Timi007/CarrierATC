import { Vector2D } from "./Vector2D";

/**
 * Returns the canvas context with the given id. Throws an error if canvas does not exist.
 * @param canvasId The canvas id.
 * @returns The context of the canvas with the given id.
 */
export function getCanvasCtx(canvasId: string) {
    const canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    if (!canvas)
        throw new Error(`Invalid canvas id ${canvasId}.`);

    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error(`Could not get context of canvas with id ${canvasId}.`);

    ctx.canvas.width = document.documentElement.clientWidth;
    ctx.canvas.height = document.documentElement.clientHeight;
    return ctx;
}

/**
 * Clears the canvas.
 * @param ctx The context of the canvas to clear.
 */
export function clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 * Returns the center of the canvas.
 * @param ctx The context of the canvas to clear.
 * @returns A vector representing the center of the canvas.
 */
export function getCanvasCenter(ctx: CanvasRenderingContext2D): Vector2D {
    return new Vector2D(ctx.canvas.width / 2, ctx.canvas.height / 2);
}
