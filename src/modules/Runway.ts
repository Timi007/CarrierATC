import { GameTime } from "./GameTime";
import { DEBUG } from "./Global";
import { IDrawable } from "./IDrawable";
import { IGameObject } from "./IGameObject";
import { Opacity } from "./Opacity";
import { drawLine } from "./util/DrawUtil";
import { TWO_PI } from "./util/MathUtil";
import { Vector2D } from "./util/Vector2D";

export class Runway implements IDrawable, IGameObject {
    public closed: boolean = false;
    public readonly start: Vector2D;
    public readonly end: Vector2D;
    public readonly maxLeftAzimuth: number;
    public readonly maxRightAzimuth: number;
    public readonly snapDistance: number;

    private readonly maxLeft: Vector2D;
    private readonly maxRight: Vector2D;

    private readonly opacity: Opacity = {
        step: 0.001,
        min: 0.1,
        max: 1,
        value: 1,
        direction: -1,
    };

    public constructor(start: Vector2D, end: Vector2D, snapDistance: number) {
        this.start = start;
        this.end = end;
        this.snapDistance = snapDistance;

        this.maxLeft = Vector2D.fromPolar(5 * Math.PI / 8, snapDistance).addSelf(start);
        this.maxRight = Vector2D.fromPolar(3 * Math.PI / 8, snapDistance).addSelf(start);

        this.maxLeftAzimuth = this.maxLeft.subtract(start).negateSelf().azimuth();
        this.maxRightAzimuth = this.maxRight.subtract(start).negateSelf().azimuth();
    }

    public update(gameTime: GameTime) {
        this.updateApproachOpacity(gameTime);
    }

    private updateApproachOpacity(gameTime: GameTime) {
        this.opacity.value += this.opacity.step * this.opacity.direction * gameTime.elapsed;
        if (this.opacity.value < this.opacity.min) {
            this.opacity.direction = 1;
        }
        if (this.opacity.value > this.opacity.max) {
            this.opacity.direction = -1;
        }
    }

    public draw(context: CanvasRenderingContext2D, drawRunwayApproch: boolean = false, hasWaypointConnection: boolean = false) {
        if (DEBUG) {
            context.globalAlpha = 0.1;
            context.strokeStyle = 'yellow';
            context.lineWidth = 30;
            drawLine(context, this.start, this.end);
        }

        if (drawRunwayApproch && !this.closed) {
            context.lineWidth = 5;
            if (hasWaypointConnection) {
                context.strokeStyle = 'green';
                context.globalAlpha = 1;
            } else {
                context.strokeStyle = 'darkgray';
                context.globalAlpha = this.opacity.value.clamp(this.opacity.min, this.opacity.max);
            }


            drawLine(context, this.maxLeft, this.start);
            drawLine(context, this.maxRight, this.start);

            let yOffset = 30;
            drawLine(context, this.maxLeft.add(new Vector2D(0, yOffset)), this.start.add(new Vector2D(0, yOffset)));
            drawLine(context, this.maxRight.add(new Vector2D(0, yOffset)), this.start.add(new Vector2D(0, yOffset)));

            drawLine(context, this.maxLeft.add(new Vector2D(0, yOffset * 2)), this.start.add(new Vector2D(0, yOffset * 2)));
            drawLine(context, this.maxRight.add(new Vector2D(0, yOffset * 2)), this.start.add(new Vector2D(0, yOffset * 2)));
        }

        context.globalAlpha = 1;
        context.fillStyle = this.closed ? 'red' : 'green';
        context.beginPath();
        context.arc(this.start.x - 25, this.start.y - 10, 2, 0, TWO_PI);
        context.fill();
    }
}
