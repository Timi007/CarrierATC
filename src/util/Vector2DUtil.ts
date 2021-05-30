import { randomInteger, randomNumber } from "./MathUtil.js";
import { Vector2D } from "./Vector2D.js";

export function getRandomPosition(context: CanvasRenderingContext2D, margin: number = 0): Vector2D {
    let x = randomInteger(0, context.canvas.width - margin);
    let y = randomInteger(0, context.canvas.height - margin);

    return new Vector2D(x, y);
}

export function getRandomVector(min: number, max: number) {
    let x = randomNumber(min, max);
    let y = randomNumber(min, max);

    return new Vector2D(x, y);
}
