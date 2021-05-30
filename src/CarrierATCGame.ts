import { Aircraft } from "./Aircraft.js";
import { AircraftCarrier } from "./AircraftCarrier.js";
import { AircraftState } from "./AircraftState.js";
import { FlyZone } from "./FlyZone.js";
import { GameState } from "./GameState.js";
import { GameTime } from "./GameTime.js";
import { DEBUG_CONFIRM_TAKEOFF, DEBUG_DISABLE_COLLISION, FONT_SIZES } from "./Global.js";
import { getCanvasCenter } from "./util/canvas.js";
import { drawLine } from "./util/DrawUtil.js";
import { randomAngle, HALF_PI, randomInteger } from "./util/MathUtil.js";
import { Vector2D } from "./util/Vector2D.js";

interface GameSettings {
    readonly aircraftSpawnRate: number,
    readonly spawnProtectionDuration: number,
    maxAircraft: number,
}

const MAX_AIRCRAFT = {
    phone: 8,
    tablet: 15
};

export class CarrierATCGame {
    private readonly settings: GameSettings = {
        aircraftSpawnRate: 4000,
        spawnProtectionDuration: 4000,
        maxAircraft: 1, // will be set depending on canvas resolution
    };
    public readonly context: CanvasRenderingContext2D;
    private readonly aircraft: Aircraft[] = [];
    private readonly flyZone: FlyZone;
    private readonly aircraftCarrier: AircraftCarrier;
    private nextAircraftSpawnTime: number = 0;
    private selectedAircraft: Aircraft | null = null;
    private selectedAircraftTouchId: number = -1;
    private gameState: GameState = GameState.PLAYING;
    private gameTime: GameTime;
    private twoFingerSwipePath: Vector2D[] | null = null;
    private score: number = 0;

    public constructor(canvasContext: CanvasRenderingContext2D) {
        this.context = canvasContext;

        console.debug('CANVAS SIZE', 'W:', this.context.canvas.width, 'H:', this.context.canvas.height);

        this.settings.maxAircraft = this.context.canvas.width < 550 ? MAX_AIRCRAFT.phone : MAX_AIRCRAFT.tablet;

        this.flyZone = new FlyZone(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.gameTime = new GameTime();

        let center = getCanvasCenter(this.context);
        this.aircraftCarrier = new AircraftCarrier(new Vector2D(center.x, center.y - 50));

        this.addEventHandlers();
    }

    public update(time: DOMHighResTimeStamp) {
        this.gameTime.update(time);

        if (this.gameState === GameState.GAME_OVER) {
            return;
        }

        this.aircraftCarrier.update(this.gameTime);

        if (this.aircraft.length < this.settings.maxAircraft && this.nextAircraftSpawnTime < this.gameTime.lastUpdate) {
            this.nextAircraftSpawnTime = this.gameTime.lastUpdate + this.settings.aircraftSpawnRate;

            let newAircraft = this.spawnAircraft();
            console.debug('SPAWNING AIRCRAFT', newAircraft);
            this.aircraft.push(newAircraft);
        }

        for (let i = this.aircraft.length - 1; i >= 0; i--) {
            let aircraft = this.aircraft[i];

            if (aircraft.state === AircraftState.TAKEOFF && aircraft.isOutsideFlyzone()) {
                console.debug('REMOVING AIRCRAFT', aircraft);
                this.score++;
                this.removeAircraft(aircraft);
            }
        }

        for (let i = 0; i < this.aircraft.length; i++) {
            let aircraft = this.aircraft[i];

            for (let j = i + 1; j < this.aircraft.length - i; j++) {
                let otherAircraft = this.aircraft[j];

                if (aircraft.collidesWith(otherAircraft) && !DEBUG_DISABLE_COLLISION) {
                    aircraft.setCollided();
                    otherAircraft.setCollided();

                    this.gameState = GameState.GAME_OVER;
                }
            }

            if (aircraft.hasFinalApproch && !this.aircraftCarrier.canLand()) {
                aircraft.clearPath();
            }

            aircraft.update(this.gameTime);
        }
    }

    private spawnAircraft(): Aircraft {
        let randomHeading = randomAngle();
        let randomPosition = this.randomSpawnPosition(randomHeading);

        let newAircraft = new Aircraft(randomPosition, randomHeading, this.flyZone);
        newAircraft.disableCollision(this.settings.spawnProtectionDuration);
        this.aircraftCarrier.addAircraftEventHandler(newAircraft);

        return newAircraft;
    }

    private randomSpawnPosition(heading: number): Vector2D {
        const width = this.context.canvas.width;
        const height = this.context.canvas.height;
        const margin = 25;

        let x: number, y: number;
        let left = Math.PI / 4;
        let right = left + HALF_PI;
        if (heading.between(left, right, true)) {
            // Down
            x = Math.random() > 0.5 ? randomInteger(width * 0.1, width * 0.4) : randomInteger(width * 0.6, width * 0.9);
            y = -margin;
        } else if (heading.between(right, left + Math.PI, true)) {
            // Left
            x = width + margin;
            y = randomInteger(height * 0.1, height * 0.9);
        } else if (heading.between(left + Math.PI, right + Math.PI, true)) {
            // Up
            x = Math.random() > 0.5 ? randomInteger(width * 0.1, width * 0.4) : randomInteger(width * 0.6, width * 0.9);
            y = height + margin;
        } else {
            // Right
            x = -margin;
            y = randomInteger(height * 0.1, height * 0.9);
        }
        return new Vector2D(x, y);
    }

    private removeAircraft(aircraft: Aircraft) {
        this.aircraftCarrier.removeAircraftEventHandler(aircraft);

        let index = this.aircraft.indexOf(aircraft);
        if (index < 0) {
            return;
        }
        this.aircraft.splice(index, 1);
    }

    public draw() {
        // Canvas background is drawn in CSS

        this.drawScore();

        this.aircraftCarrier.draw(this.context, this.selectedAircraft !== null, this.selectedAircraft?.hasFinalApproch ?? false);

        this.drawAllAircraft();

        this.drawTwoFingerSwipePath();

        if (this.gameState === GameState.GAME_OVER) {
            this.drawGameOver();
        }
    }

    private drawAllAircraft() {
        // Draw navigation path first so it does not overlap with other aircraft
        for (const aircraft of this.aircraft) {
            aircraft.drawPath(this.context);
        }

        // Draw all aircraft on the deck first
        for (const aircraft of this.aircraft) {
            if (aircraft.state === AircraftState.FLYING) {
                continue;
            }
            let isSelected = aircraft === this.selectedAircraft;
            aircraft.draw(this.context, isSelected);
        }

        // Then flying aircraft
        for (const aircraft of this.aircraft) {
            if (aircraft.state !== AircraftState.FLYING) {
                continue;
            }
            let isSelected = aircraft === this.selectedAircraft;
            aircraft.draw(this.context, isSelected);
        }
    }

    private drawGameOver() {
        this.context.fillStyle = 'gray';
        this.context.globalAlpha = 0.6;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.globalAlpha = 1;

        let center = getCanvasCenter(this.context);

        let fontSize = this.context.canvas.width < 550 ? FONT_SIZES.phone : FONT_SIZES.tablet;

        this.context.fillStyle = 'white';
        this.context.font = `${fontSize.XLarge}px Arial`;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', center.x, center.y - 60);
        this.context.font = `${fontSize.Large}px Arial`;
        this.context.fillText(`Score: ${this.score}`, center.x, center.y);
        this.context.font = `${fontSize.Medium}px Arial`;
        this.context.fillText('Reload to restart game', center.x, center.y + 40);
    }

    private addEventHandlers() {
        this.context.canvas.addEventListener('touchstart', (e: TouchEvent) => {
            e.preventDefault();
            switch (e.targetTouches.length) {
                case 1:
                    this.onOneTouchStart(e);
                    break;
                case 2:
                    this.onTwoTouchStart(e);
                    break;

                default:
                    break;
            }
        });

        this.context.canvas.addEventListener('touchmove', (e: TouchEvent) => {
            e.preventDefault();
            switch (e.targetTouches.length) {
                case 1:
                    this.onOneTouchMove(e);
                    break;
                case 2:
                    this.onTwoTouchMove(e);
                    break;

                default:
                    break;
            }
        });

        this.context.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.OnTouchEnd(e);
        });
    }

    private onOneTouchStart(e: TouchEvent) {
        let touch = e.targetTouches[0];
        let touchPos = this.getPos(touch);
        let rel = touchPos.subtract(this.aircraftCarrier.center);
        console.debug('TOUCH', 'Abs', touchPos, 'Rel to Carrier', rel);

        for (const aircraft of this.aircraft) {
            if (aircraft.isPositionInUnscaledHitbox(touchPos)) {
                let state = aircraft.state;

                console.debug('STATE', state);

                if (state === AircraftState.FLYING) {
                    aircraft.clearPath();

                    this.selectedAircraft = aircraft;
                    this.selectedAircraftTouchId = touch.identifier;
                    return;
                }

                if (state === AircraftState.REARMING && aircraft.hasFinishedRearming()) {
                    this.aircraftCarrier.orderPrepareTakeoff(aircraft);
                }

                if (DEBUG_CONFIRM_TAKEOFF && state === AircraftState.TAKEOFF_RDY) {
                    this.aircraftCarrier.orderTakeoff();
                }
            }
        }
    }

    private onOneTouchMove(e: TouchEvent) {
        if (this.selectedAircraft === null) {
            return;
        }

        let touch = e.targetTouches[0];

        if (touch.identifier !== this.selectedAircraftTouchId) {
            return;
        }

        let touchPos = new Vector2D(touch.clientX, touch.clientY);
        if (this.flyZone.isPositionOutside(touchPos)) {
            this.selectedAircraft = null;
            return;
        }

        this.selectedAircraft.addWaypoint(touchPos);
        if (this.aircraftCarrier.canLand() && this.aircraftCarrier.waypointIsFinalApproch(touchPos) && !this.selectedAircraft.hasFinalApproch) {
            let runwayStart = this.aircraftCarrier.runwayStart();
            this.selectedAircraft.addFinalApproch(runwayStart);
        }
    }

    private onTwoTouchStart(e: TouchEvent) {
        let touchPos = this.getLerpTwoTouchPos(e);
        let swipeStartCorrect = this.aircraftCarrier.takeoffSwipeArea.isInsideStart(touchPos);
        if (swipeStartCorrect) {
            this.twoFingerSwipePath = [touchPos];
        }
    }

    private onTwoTouchMove(e: TouchEvent) {
        this.twoFingerSwipePath?.push(this.getLerpTwoTouchPos(e));
    }

    private OnTouchEnd(e: TouchEvent) {
        this.selectedAircraft = null;

        if (!this.twoFingerSwipePath || this.twoFingerSwipePath.length < 2) {
            this.twoFingerSwipePath = null;
            return;
        }

        let lastTouchPos = this.twoFingerSwipePath[this.twoFingerSwipePath.length - 1];
        let swipeEndCorrect = this.aircraftCarrier.takeoffSwipeArea.isInsideEnd(lastTouchPos);
        if (swipeEndCorrect) {
            let pathCorrect = true;
            for (const touchPos of this.twoFingerSwipePath) {
                if (!this.aircraftCarrier.takeoffSwipeArea.isInside(touchPos)) {
                    pathCorrect = false;
                    break;
                }
            }

            if (pathCorrect) {
                this.aircraftCarrier.orderTakeoff();
            }
        }

        this.twoFingerSwipePath = null;
    }

    private getLerpTwoTouchPos(e: TouchEvent): Vector2D {
        let touch1 = e.targetTouches[0];
        let touch2 = e.targetTouches[1];

        let touch1Pos = this.getPos(touch1);
        let touch2Pos = this.getPos(touch2);

        return Vector2D.lerp(touch1Pos, touch2Pos, 0.5);
    }

    private getPos(touch: Touch): Vector2D {
        return new Vector2D(touch.clientX, touch.clientY);
    }

    private drawTwoFingerSwipePath() {
        if (!this.twoFingerSwipePath) {
            return;
        }

        this.context.strokeStyle = 'white';
        this.context.lineWidth = 4;

        for (let i = 0; i < this.twoFingerSwipePath.length - 1; i++) {
            drawLine(this.context, this.twoFingerSwipePath[i], this.twoFingerSwipePath[i + 1]);
        }
    }

    private drawScore() {
        let fontSize = this.context.canvas.width < 550 ? FONT_SIZES.phone : FONT_SIZES.tablet;

        this.context.fillStyle = 'white';
        this.context.font = `${fontSize.Medium}px Arial`;
        this.context.textAlign = 'right';
        this.context.textBaseline = 'top';
        this.context.lineWidth = 4;
        this.context.fillText(`Score: ${this.score}`, this.context.canvas.width * 0.85, this.context.canvas.height * 0.015);
    }
}
