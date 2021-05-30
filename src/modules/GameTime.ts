export class GameTime {
    private _lastUpdate: DOMHighResTimeStamp = 0;
    private _elapsed: DOMHighResTimeStamp = 0;

    public update(now: DOMHighResTimeStamp) {
        this._elapsed = now - this._lastUpdate;
        this._lastUpdate = now;
    }

    public get elapsed() {
        return this._elapsed;
    }

    public get lastUpdate() {
        return this._lastUpdate;
    }
}
