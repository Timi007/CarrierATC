import { Aircraft } from "./Aircraft.js";
import { Vector2D } from "./util/Vector2D.js";

export class DeckPosition {
    public readonly position: Vector2D;
    public readonly direction: number;
    public aircraft: Aircraft | null;

    constructor(position: Vector2D, direction: number) {
        this.position = position;
        this.direction = direction;
        this.aircraft = null;
    }

    public isEmpty() {
        return this.aircraft === null;
    }
}
