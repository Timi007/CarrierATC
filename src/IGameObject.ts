import { GameTime } from "./GameTime.js";

export interface IGameObject {
    update(gameTime: GameTime): void;
}
