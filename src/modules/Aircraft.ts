import { AircraftState } from "./AircraftState";
import { FlyZone } from "./FlyZone";
import { GameTime } from "./GameTime";
import { DEBUG } from "./Global";
import { Graphic } from "./Graphic";
import { IDrawable } from "./IDrawable";
import { IGameObject } from "./IGameObject";
import { Opacity } from "./Opacity";
import { drawLine } from "./util/DrawUtil";
import { TWO_PI } from "./util/MathUtil";
import { Vector2D } from "./util/Vector2D";

const aircraftImage = require('../../img/aircraft.svg');

interface AircraftConfig {
    readonly scale: {
        readonly flying: number,
        readonly taxiing: number,
    },
    readonly speed: {
        readonly flying: number,
        readonly taxiing: number,
    },
    readonly hitbox: {
        readonly maxRadius: number,
    },
    readonly turnRate: number,
    readonly catchArrestorWireDelay: number,
    readonly image: {
        readonly path: string,
        readonly scale: number,
    },
    readonly collision: {
        readonly minScaleDiff: number,
    },
}

interface Rearming {
    progress: number,
    nextUpdateTime: number,
    duration: number,
}

interface CollisionProtection {
    enabled: boolean,
    duration: number,
    disableTime: number,
}

interface Collision {
    collided: boolean,
    protection: CollisionProtection,
}

class Waypoint {
    public readonly position: Vector2D;

    public constructor(position: Vector2D) {
        this.position = position;
    }
}

class ParkingWaypoint extends Waypoint {
    public readonly direction: number;

    public constructor(position: Vector2D, direction: number) {
        super(position);
        this.direction = direction;
    }
}

export class Aircraft extends EventTarget implements IDrawable, IGameObject {
    private readonly image: Graphic;
    private readonly config: AircraftConfig = {
        scale: {
            flying: 1,
            taxiing: 0.5,
        },
        speed: {
            flying: 0.025,
            taxiing: 0.015
        },
        hitbox: {
            maxRadius: 20,
        },
        turnRate: 0.002,
        catchArrestorWireDelay: 3000, // ~3 sec
        image: {
            path: aircraftImage.default,
            scale: 0.2,
        },
        collision: {
            minScaleDiff: 0.42,
        }
    };
    private _state: AircraftState = AircraftState.FLYING;
    private _hasFinalApproch = false;
    private scale: number;
    private position: Vector2D;
    private velocity: Vector2D;
    private speed: number;
    private path: Waypoint[] = [];
    private flyZone: FlyZone;
    private catchArrestorWireTime: number = 0;
    private disableBorderBounce: boolean;
    private rearming: Rearming = {
        progress: -1,
        nextUpdateTime: 0,
        duration: -1,
    };
    private readonly collision: Collision = {
        collided: false,
        protection: {
            enabled: false,
            duration: -1,
            disableTime: 0,
        },
    };
    private readonly opacity: Opacity = {
        step: 0.001,
        min: 0.3,
        max: 1,
        value: 1,
        direction: -1,
    };

    public constructor(position: Vector2D, heading: number, flyZone: FlyZone) {
        super();

        this.scale = this.config.scale.flying;
        this.speed = this.config.speed.flying;

        this.image = new Graphic(this.config.image.path);

        this.position = position;
        this.flyZone = flyZone;

        this.disableBorderBounce = this.isOutsideFlyzone();

        this.velocity = Vector2D.fromPolar(heading, this.speed);
    }

    public get state(): AircraftState {
        return this._state;
    }

    public get hasFinalApproch(): boolean {
        return this._hasFinalApproch;
    }

    public update(gameTime: GameTime) {
        this.updateSpawnProtection(gameTime);

        if (this._state === AircraftState.PARKED || this._state === AircraftState.TAKEOFF_RDY) {
            // Do nothing
            return;
        }

        if (this._state === AircraftState.REARMING) {
            this.updateRearm(gameTime);
        }

        if (this._state === AircraftState.LANDING) {
            this.updateLandingSpeed(gameTime);
            this.updateLandingScale(gameTime);
        }

        if (this._state === AircraftState.TAKEOFF) {
            this.updateTakeoffSpeed();
            this.updateTakeoffScale(gameTime);

            if (this.path.length === 0) {
                this.moveStraight(gameTime);
                return;
            }
        }

        if (this._state === AircraftState.FLYING) {
            this.handleLeavingFlyZone();

            if (this.path.length === 0) {
                this.moveStraight(gameTime);
                return;
            }
        }

        if (this.path.length !== 0) {
            this.moveToWaypoint(gameTime);
        }
    }

    public addWaypoint(position: Vector2D) {
        if (this._state === AircraftState.PARKED) {
            this._state = AircraftState.TAXIING;
        }

        if (this._hasFinalApproch) {
            return;
        }

        let lastWP = this.path.length > 0 ? this.path[this.path.length - 1].position : this.position;
        if (position.subtract(lastWP).length() < this.hitboxRadius() / 2) {
            return;
        }

        this.path.push(new Waypoint(position));
    }

    public addParkingWaypoint(position: Vector2D, direction: number) {
        if (this._state === AircraftState.PARKED) {
            this._state = AircraftState.TAXIING;
        }

        this.path.push(new ParkingWaypoint(position, direction));
    }

    /**
     * Disables collision with other aircraft for given duration.
     * @param duration The duration in milliseconds to disable collision.
     */
    public disableCollision(duration: number) {
        if (duration <= 0) {
            return;
        }

        this.collision.protection.enabled = true;
        this.collision.protection.duration = duration;
    }

    /**
     * Starts the rearm process which takes the given duration for completing.
     * @param duration The time in milliseconds it takes to complete rearming.
     */
    public startRearm(duration: number) {
        if (duration <= 0) {
            throw new Error("Duration must be greater zero!");
        }

        this.clearPath();
        this._state = AircraftState.REARMING;
        this.rearming = {
            progress: 0,
            nextUpdateTime: 0,
            duration: duration,
        };
    }

    public hasFinishedRearming(): boolean {
        return this.rearming.progress === 100;
    }

    public prepareTakeoff() {
        this._state = AircraftState.TAKEOFF_RDY;
    }

    public takeoff() {
        this._state = AircraftState.TAKEOFF;
    }

    public addFinalApproch(runwayStart: Vector2D) {
        if (this._hasFinalApproch)
            return;

        this._hasFinalApproch = true;
        this.path.push(new Waypoint(runwayStart));
    }

    public clearPath() {
        this._hasFinalApproch = false;
        this.path = [];
    }

    public isOutsideFlyzone(): boolean {
        return this.flyZone.isHitboxOutside(this.position, this.hitboxRadius());
    }

    public isPositionInUnscaledHitbox(position: Vector2D): boolean {
        return this.position.distanceTo2(position) < (this.config.hitbox.maxRadius ** 2);
    }

    public collidesWith(other: Aircraft): boolean {
        if (this.collision.protection.enabled || other.collision.protection.enabled) {
            return false;
        }

        if (!this.statesAreCollidable(this._state, other._state) || !this.nearlySameScale(other.scale)) {
            return false;
        }

        let r = other.hitboxRadius() + this.hitboxRadius();
        return this.position.distanceTo2(other.position) < (r ** 2);
    }

    public setCollided() {
        this.collision.collided = true;
    }

    public draw(context: CanvasRenderingContext2D, isSelected: boolean = false) {
        if (this._state === AircraftState.REARMING) {
            this.drawRearmProgress(context);
        }

        if (this._state === AircraftState.TAKEOFF_RDY) {
            this.drawFinishedCheckmark(context, 'green');
        }

        if (this.collision.collided) {
            this.drawHitbox(context, 'red');
        }

        if (isSelected) {
            this.drawHitbox(context, 'darkgray', 0.5, 5);
        }

        if (DEBUG) {
            this.drawHitbox(context, 'blue', 0.5);
        }

        this.drawAircraftImage(context);
    }

    public drawPath(context: CanvasRenderingContext2D) {
        if ((this._state !== AircraftState.FLYING && !DEBUG) || this.path.length === 0) {
            return;
        }

        context.strokeStyle = this._hasFinalApproch ? 'yellow' : 'red';
        context.lineWidth = 2;

        drawLine(context, this.position, this.path[0].position);
        for (let i = 0; i < this.path.length - 1; i++) {
            drawLine(context, this.path[i].position, this.path[i + 1].position);
        }
    }

    private drawProgressBar(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, progress: number) {
        if (progress < 0) {
            progress = 0;
        }

        if (progress > 100) {
            progress = 100;
        }

        let progressW = (w / 100) * progress;
        let rectX = x - w / 2;
        let rectY = y - h / 2;
        context.fillStyle = color;
        context.fillRect(rectX, rectY, progressW, h);
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.strokeRect(rectX, rectY, w, h);
    }

    private drawAircraftImage(context: CanvasRenderingContext2D) {
        let opacity = this.opacity.value.clamp(this.opacity.min, this.opacity.max);
        this.image.draw(context, this.position, this.velocity.azimuth(), this.config.image.scale * this.scale, opacity);
    }

    private drawRearmProgress(context: CanvasRenderingContext2D) {
        if (this.rearming.progress < 0) {
            return;
        }

        if (this.hasFinishedRearming()) {
            this.drawFinishedCheckmark(context, 'green');
            return;
        }

        let hitboxDiameter = this.hitboxRadius() * 2;
        let x = this.position.x;
        let y = this.position.y - hitboxDiameter;

        this.drawProgressBar(context, x, y, hitboxDiameter, 5, 'yellow', this.rearming.progress);
    }

    private drawFinishedCheckmark(context: CanvasRenderingContext2D, color: string) {
        let x = this.position.x;
        let y = this.position.y - this.hitboxRadius() * 2;

        context.save();

        context.translate(x, y);
        context.rotate(Math.PI / 4);

        let leftEnd = -7;
        let topEnd = -14;
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.moveTo(leftEnd - 1, 0);
        context.lineTo(0, 0);
        context.lineTo(0, topEnd - 1);
        context.stroke();

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 3;
        context.moveTo(leftEnd, 0);
        context.lineTo(0, 0);
        context.lineTo(0, topEnd);
        context.stroke();

        context.restore();
    }

    private drawHitbox(context: CanvasRenderingContext2D, color: string, alpha: number = 1, padding: number = 0) {
        context.globalAlpha = alpha;
        context.fillStyle = color;
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.hitboxRadius() + padding, 0, TWO_PI);
        context.fill();
        context.globalAlpha = 1;
    }

    private hitboxRadius(): number {
        return this.scale * this.config.hitbox.maxRadius;
    }

    private moveStraight(gameTime: GameTime) {
        this.position.addSelf(this.velocity.scale(gameTime.elapsed));
    }

    private moveToWaypoint(gameTime: GameTime) {
        let waypoint = this.path[0];
        if (waypoint === undefined) {
            throw new Error("No Waypoint to move to defined.");
        }

        let isParkingWaypoint = waypoint instanceof ParkingWaypoint;

        if (isParkingWaypoint && this._state !== AircraftState.TAXIING) {
            this._state = AircraftState.TAXIING;
        }

        let waypointVector = waypoint.position.subtract(this.position);
        let hasReachedWaypoint = waypointVector.length() < this.hitboxRadius();

        if (hasReachedWaypoint) {
            if (isParkingWaypoint) {
                waypointVector.setPolar((<ParkingWaypoint>waypoint).direction, 1);
            } else {
                // Waypoint reached
                this.path.shift();
            }
        }

        if (this.path.length === 0) {
            if (this._hasFinalApproch) {
                this._state = AircraftState.LANDING;
                this._hasFinalApproch = false;
                this.dispatchEvent(new Event('landing'));
            } else if (this._state !== AircraftState.FLYING && this._state !== AircraftState.TAKEOFF) {
                this._state = AircraftState.PARKED;
            }
            return;
        }

        let angle = this.velocity.angleTo(waypointVector);
        let angleTolerance = isParkingWaypoint ? 0.05 : 0.1;

        if (angle > angleTolerance) {
            // Calculate cross product to get a direction indicator.
            // Angle to will not work, because it only returns in the interval [0, PI]
            let cross = this.velocity.cross(waypointVector);
            let direction = cross > 0 ? 1 : -1;
            this.velocity.rotateSelf(this.config.turnRate * direction * gameTime.elapsed);
        } else if (isParkingWaypoint && hasReachedWaypoint) {
            // We have reached the parking position and aligned accordingly
            console.log('reached the parking position and aligned accordingly');

            this.path.shift();

            if (this.path.length === 0) {
                this._state = AircraftState.PARKED;
                this.dispatchEvent(new Event('parked'));
            }
        }

        this.position.addSelf(this.velocity.scale(gameTime.elapsed));
    }

    private handleLeavingFlyZone() {
        let isOutside = this.isOutsideFlyzone();
        if (!this.disableBorderBounce && isOutside) {
            this.velocity.rotateSelf(Math.PI);
        } else if (this.disableBorderBounce && !isOutside) {
            this.disableBorderBounce = false;
        }
    }

    private updateLandingScale(gameTime: GameTime) {
        if (this.scale > this.config.scale.taxiing) {
            this.scale -= this.config.scale.flying / 100 * 0.02 * gameTime.elapsed;
        }
    }

    private updateLandingSpeed(gameTime: GameTime) {
        if (this.catchArrestorWireTime === 0) {
            this.catchArrestorWireTime = gameTime.lastUpdate + this.config.catchArrestorWireDelay;
        }

        if (this.speed > this.config.speed.taxiing && gameTime.lastUpdate > this.catchArrestorWireTime) {
            let speedReduction = this.speed > (this.config.speed.taxiing * 1.7) ? this.config.speed.flying / 100 * 5 : this.config.speed.flying / 100 * 0.25;

            this.speed -= speedReduction;
            this.velocity.scaleSelf(this.speed / (this.speed + speedReduction));
        }
    }

    private updateTakeoffScale(gameTime: GameTime) {
        if (this.scale < this.config.scale.flying) {
            this.scale += this.config.scale.flying / 100 * 0.003 * gameTime.elapsed;
        }
    }

    private updateTakeoffSpeed() {
        if (this.speed < this.config.speed.flying) {
            let speedAddition = this.speed < (this.config.speed.flying * 0.9) ? this.config.speed.flying / 100 * 5 : this.config.speed.flying / 100 * 0.25;

            this.speed += speedAddition;
            this.velocity.scaleSelf(this.speed / (this.speed - speedAddition));
        }
    }

    private updateRearm(gameTime: GameTime) {
        if (gameTime.lastUpdate <= this.rearming.nextUpdateTime) {
            return;
        }

        this.rearming.nextUpdateTime = gameTime.lastUpdate + (this.rearming.duration / 100);
        this.rearming.progress++;

        if (this.hasFinishedRearming()) {
            this.rearming.nextUpdateTime = Infinity;
        }
    }

    private updateSpawnProtection(gameTime: GameTime) {
        if (!this.collision.protection.enabled) {
            return;
        }

        if (this.collision.protection.disableTime === 0) {
            this.collision.protection.disableTime = gameTime.lastUpdate + this.collision.protection.duration;
        }

        this.opacity.value += this.opacity.step * this.opacity.direction * gameTime.elapsed;
        if (this.opacity.value < this.opacity.min) {
            this.opacity.direction = 1;
        }
        if (this.opacity.value > this.opacity.max) {
            this.opacity.direction = -1;
        }

        if (gameTime.lastUpdate > this.collision.protection.disableTime) {
            this.collision.protection.enabled = false;
            this.collision.protection.duration = -1;
            this.opacity.value = 1;
        }
    }

    private statesAreCollidable(thisState: AircraftState, otherState: AircraftState): boolean {
        let areFlying = thisState === AircraftState.FLYING && otherState === AircraftState.FLYING;
        let notBothTakingOff = this.xor(thisState === AircraftState.TAKEOFF, otherState === AircraftState.TAKEOFF);

        return areFlying || notBothTakingOff;
    }

    private nearlySameScale(otherScale: number): boolean {
        return Math.abs(this.scale - otherScale) < this.config.collision.minScaleDiff;
    }

    private xor(a: boolean, b: boolean): boolean {
        return (a && !b) || (!a && b);
    }
}
