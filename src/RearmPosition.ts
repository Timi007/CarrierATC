import { Aircraft } from "./Aircraft.js";
import { DeckPosition } from "./DeckPosition.js";
import { Vector2D } from "./util/Vector2D.js";

export class RearmPosition extends DeckPosition {
    public readonly queue: DeckPosition[];

    public constructor(position: Vector2D, direction: number, queue: DeckPosition[]) {
        super(position, direction);
        this.queue = queue;
    }

    public hasQueueSpace(): boolean {
        return this.isEmpty() || this.queue.some(pos => pos.isEmpty());
    }

    public addToQueue(aircraft: Aircraft): DeckPosition | null {
        if (this.isEmpty()) {
            this.aircraft = aircraft;
            return this;
        }

        for (const position of this.queue) {
            if (position.isEmpty()) {
                position.aircraft = aircraft;
                return position;
            }
        }

        return null;
    }

    public shiftQueue(): DeckPosition[] {
        let newQueue: DeckPosition[] = [this, ...this.queue];

        this.aircraft = null;

        for (let i = 0; i < newQueue.length - 1; i++) {
            let position = newQueue[i];
            let nextPosition = newQueue[i + 1];

            if (position.isEmpty()) {
                position.aircraft = nextPosition.aircraft;
                nextPosition.aircraft = null;
            }
        }

        return newQueue;
    }
}
