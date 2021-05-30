import { Vector2D } from "./util/Vector2D.js";

export class FlyZone {
    public readonly topLeft: Vector2D;
    public readonly bottomRight: Vector2D;
    public readonly width: number;
    public readonly height: number;

    public constructor(x: number, y: number, w: number, h: number) {
        this.topLeft = new Vector2D(x, y);
        this.bottomRight = new Vector2D(x + w, y + h);
        this.width = w;
        this.height = h;
    }

    public isHitboxOutside(position: Vector2D, radius: number): boolean {
        return (
            position.x + radius < this.topLeft.x ||
            position.x - radius > this.bottomRight.x ||
            position.y + radius < this.topLeft.y ||
            position.y - radius > this.bottomRight.y
        );
    }

    public isPositionOutside(position: Vector2D): boolean {
        return (
            position.x < this.topLeft.x ||
            position.x > this.bottomRight.x ||
            position.y < this.topLeft.y ||
            position.y > this.bottomRight.y
        );
    }
}
