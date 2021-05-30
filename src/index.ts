import './styles.css';

import { clearCanvas, getCanvasCtx } from './modules/util/canvas'
import { CarrierATCGame } from './modules/CarrierATCGame';

const ctx = getCanvasCtx('canvas01');
const game = new CarrierATCGame(ctx);

function draw(time: DOMHighResTimeStamp) {
    clearCanvas(ctx);

    game.update(time);
    game.draw();

    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
