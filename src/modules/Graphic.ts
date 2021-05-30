import { Vector2D } from "./util/Vector2D";

export class Graphic {
    public readonly image: CanvasImageSource;
    private isLoaded: boolean = false;

    private width: number = 0;
    private height: number = 0;

    public constructor(image: string) {
        this.image = new Image();
        this.image.src = image;

        let that = this;
        this.image.onload = function () {
            that.isLoaded = true;
            that.width = <number>that.image.width;
            that.height = <number>that.image.height;
        };
    }

    public draw(context: CanvasRenderingContext2D, position: Vector2D, rotation: number, scale: number, alpha: number = 1) {
        if (!this.isLoaded) {
            return;
        }

        context.save();

        context.translate(position.x, position.y);
        context.rotate(rotation);

        let w = this.width * scale;
        let h = this.height * scale;

        context.globalAlpha = alpha;
        context.drawImage(this.image, -w / 2, -h / 2, w, h);

        context.restore();
    }
}
