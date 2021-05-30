import { clearCanvas, getCanvasCtx } from './util/canvas.js'
import { CarrierATCGame } from './CarrierATCGame.js';

const ctx = getCanvasCtx('canvas01');
const game = new CarrierATCGame(ctx);

function draw(time: DOMHighResTimeStamp) {
    clearCanvas(ctx);

    game.update(time);
    game.draw();

    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
