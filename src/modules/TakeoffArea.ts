import { Box } from "./util/Box";
import { Vector2D } from "./util/Vector2D";

export class TakeoffArea extends Box {
    public readonly startWidth: number;
    public readonly endWidth: number;

    public constructor(completeArea: Box, startWidth: number, endWidth: number) {
        super(completeArea.center, completeArea.width, completeArea.height, completeArea.angle);

        if (this.width < startWidth + endWidth) {
            throw new Error("Start and end width exceed the complete area width");
        }

        this.startWidth = startWidth;
        this.endWidth = endWidth;
    }

    public isInsideStart(position: Vector2D): boolean {
        let localPosition = this.transformPosition(position);

        let minW = -this.width / 2;
        let maxW = minW + this.startWidth;

        // Origin is at the center of the rectangle in the local coordinate system
        return localPosition.x.between(minW, maxW, true) && this.isYInside(localPosition.y);
    }

    public isInsideEnd(position: Vector2D): boolean {
        let localPosition = this.transformPosition(position);

        let maxW = this.width / 2;
        let minW = maxW - this.endWidth;

        // Origin is at the center of the rectangle in the local coordinate system
        return localPosition.x.between(minW, maxW, true) && this.isYInside(localPosition.y);
    }

    public draw(context: CanvasRenderingContext2D) {
        context.globalAlpha = 0.5;
        context.fillStyle = 'red';

        super.draw(context);

        context.save();
        context.setTransform(this.transformation);

        context.fillStyle = 'orange';
        context.fillRect(-this.width / 2, -this.height / 2, this.startWidth, this.height);
        context.fillRect(this.width / 2 - this.endWidth, -this.height / 2, this.endWidth, this.height);

        context.restore();
    }
}
