import { Vector2D } from "./Vector2D.js";

export class Box {
    public readonly center: Vector2D;
    public readonly width: number;
    public readonly height: number;
    public readonly angle: number;
    protected readonly transformation: DOMMatrix;
    protected readonly invTransformation: DOMMatrix;

    public constructor(center: Vector2D, w: number, h: number, angle: number = 0) {
        this.center = center;
        this.width = w;
        this.height = h;
        this.angle = angle;

        let transformation = new DOMMatrix();
        transformation.translateSelf(center.x, center.y);
        if (angle !== 0) {
            transformation.rotateSelf(angle * 180 / Math.PI);
        }
        this.transformation = transformation;

        this.invTransformation = this.transformation.inverse();
    }

    /**
     * Checks if the position is inside of the rotated box.
     * @param position The position to check.
     * @returns True if the position is inside the box; otherwise false.
     */
    public isInside(position: Vector2D): boolean {
        let localPosition = this.transformPosition(position);
        // Origin is at the center of the rectangle in the local coordinate system
        return this.isXInside(localPosition.x) && this.isYInside(localPosition.y);
    }

    /**
     * Transforms the coordinates of the position into the coordinates system of the rotated box.
     * @param position The position to transform.
     * @returns The position in the local coordinates system of the rotated box.
     */
    protected transformPosition(position: Vector2D): Vector2D {
        let transformedPosistion = this.invTransformation.transformPoint(new DOMPoint(position.x, position.y));

        return new Vector2D(transformedPosistion.x, transformedPosistion.y);
    }

    /**
     * Checks if the X coordinate of the transformed postion is inside the box.
     * @param x The transformed X coordinate.
     * @returns True if the transformed X coordinate is inside the box; otherwise false.
     */
    protected isXInside(x: number): boolean {
        return x.between(-this.width / 2, this.width / 2, true);
    }

    /**
     * Checks if the Y coordinate of the transformed postion is inside the box.
     * @param x The transformed Y coordinate.
     * @returns True if the transformed Y coordinate is inside the box; otherwise false.
     */
    protected isYInside(y: number): boolean {
        return y.between(-this.height / 2, this.height / 2, true);
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();

        context.setTransform(this.transformation);

        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        context.restore();
    }
}
