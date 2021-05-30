import { DeckPosition } from "./DeckPosition.js";
import { Vector2D } from "./util/Vector2D.js";

export class TakeoffPosition extends DeckPosition {
    public readonly path: Vector2D[];

    public constructor(position: Vector2D, direction: number, takeoffPath: Vector2D[]) {
        super(position, direction);
        this.path = takeoffPath;
    }
}
