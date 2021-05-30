import { GameTime } from "./GameTime";

export interface IGameObject {
    update(gameTime: GameTime): void;
}
