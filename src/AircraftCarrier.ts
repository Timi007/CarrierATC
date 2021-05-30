import { Aircraft } from "./Aircraft.js";
import { AircraftState } from "./AircraftState.js";
import { DeckPosition } from "./DeckPosition.js";
import { GameTime } from "./GameTime.js";
import { DEBUG } from "./Global.js";
import { Graphic } from "./Graphic.js";
import { IDrawable } from "./IDrawable.js";
import { IGameObject } from "./IGameObject.js";
import { RearmPosition } from "./RearmPosition.js";
import { Runway } from "./Runway.js";
import { TakeoffArea } from "./TakeoffArea.js";
import { TakeoffPosition } from "./TakeoffPosition.js";
import { Box } from "./util/Box.js";
import { HALF_PI } from "./util/MathUtil.js";
import { Vector2D } from "./util/Vector2D.js";

interface AircraftEventhandler {
    readonly landing: EventListenerOrEventListenerObject,
    readonly parked: EventListenerOrEventListenerObject,
}

interface AircraftCarrierConfig {
    readonly scale: number,
    readonly direction: number,
    readonly rearmDuration: number,
}

export class AircraftCarrier implements IDrawable, IGameObject {
    public readonly takeoffSwipeArea: TakeoffArea;
    public readonly center: Vector2D;
    private readonly config: AircraftCarrierConfig = {
        scale: 1.5,
        direction: -HALF_PI + 0.18,
        rearmDuration: 4000,
    };
    private readonly image: Graphic;
    private readonly runway: Runway;
    private readonly rearmPosition: RearmPosition;
    private readonly takeoffPositions: TakeoffPosition[] = [];
    private readonly eventhandlers: AircraftEventhandler;

    public constructor(center: Vector2D) {
        this.center = center;
        this.image = new Graphic('img/aircraft_carrier.svg');

        let xOffset = center.x - 28;
        let yTop = center.y - 88;
        let yBottom = center.y + 209;
        let snapDistance = 50;
        this.runway = new Runway(new Vector2D(xOffset, yBottom), new Vector2D(xOffset, yTop), snapDistance);

        if (DEBUG) {
            console.debug('Runway Init Config:', 'SnapDist', this.runway.snapDistance, 'maxLA', this.runway.maxLeftAzimuth, ' maxRA', this.runway.maxRightAzimuth);
        }

        let queue = [
            new DeckPosition(this.absPos(28, -5), this.config.direction),
            new DeckPosition(this.absPos(22, 30), this.config.direction),
        ];
        this.rearmPosition = new RearmPosition(this.absPos(52, -35), this.config.direction, queue);

        this.takeoffPositions.push(new TakeoffPosition(this.absPos(-1, -84), this.config.direction, [this.absPos(29, -222), this.absPos(14, -375)]));
        this.takeoffPositions.push(new TakeoffPosition(this.absPos(18, -83), this.config.direction, [this.absPos(46, -219), this.absPos(57, -375)]));

        this.takeoffSwipeArea = new TakeoffArea(new Box(this.absPos(25, -145), 180, 80, this.config.direction), 60, 60);

        this.eventhandlers = {
            landing: this.handlerGenerator(this.onAircraftLanding),
            parked: this.handlerGenerator(this.onAircraftParked),
        };
    }

    public addAircraftEventHandler(aircraft: Aircraft) {
        aircraft.addEventListener('landing', this.eventhandlers.landing);
        aircraft.addEventListener('parked', this.eventhandlers.parked);
    }

    public removeAircraftEventHandler(aircraft: Aircraft) {
        aircraft.removeEventListener('landing', this.eventhandlers.landing);
        aircraft.removeEventListener('parked', this.eventhandlers.parked);
    }

    /**
     * Checks if waypoint is the final approach.
     * @param waypoint The waypoint to check.
     * @returns True if waypoint is the final approach; otherwise false.
     */
    public waypointIsFinalApproch(waypoint: Vector2D): boolean {
        let finalApprochVector = this.runway.start.subtract(waypoint);
        let finalApprochAzimuth = finalApprochVector.azimuth();
        let finalApprochLength = finalApprochVector.length();

        let isCorrectHeading = finalApprochAzimuth.between(this.runway.maxRightAzimuth, this.runway.maxLeftAzimuth, false);
        let isNearbyAndNotTooClose = finalApprochLength.between(this.runway.snapDistance / 2, this.runway.snapDistance, false);

        return isNearbyAndNotTooClose && isCorrectHeading;
    }

    public canLand(): boolean {
        return !this.runway.closed;
    }

    /**
     * Orders the aircraft to prepare for takeoff.
     * @param aircraft The aircraft which should prepare for takeoff.
     */
    public orderPrepareTakeoff(aircraft: Aircraft) {
        console.debug('FINISHED REARMING, PREPARE TAKEOFF', aircraft);

        for (const takeoffPosition of this.takeoffPositions) {
            if (!takeoffPosition.isEmpty()) {
                continue;
            }

            takeoffPosition.aircraft = aircraft;
            aircraft.addParkingWaypoint(takeoffPosition.position, takeoffPosition.direction);

            this.shiftRearmQueue();
            break;
        }
    }

    /**
     * Confirms the takeoff order. Lets all aircraft in takeoff position start.
     */
    public orderTakeoff() {
        console.debug('TAKEOFF TRIGGERED');
        for (const takeoffPosition of this.takeoffPositions) {
            if (takeoffPosition.aircraft?.state === AircraftState.TAKEOFF_RDY) {
                takeoffPosition.aircraft.takeoff();
                console.debug('TAKEOFF', takeoffPosition.aircraft);

                takeoffPosition.aircraft = null;
            }
        }
    }

    public update(gameTime: GameTime) {
        this.runway.update(gameTime);
        this.runway.closed = !this.rearmPosition.hasQueueSpace();
    }

    public draw(context: CanvasRenderingContext2D, drawRunwayApproch: boolean = false, hasWaypointConnection: boolean = false) {
        this.image.draw(context, this.center, this.config.direction, this.config.scale);
        this.runway.draw(context, drawRunwayApproch, hasWaypointConnection);

        if (DEBUG) {
            this.takeoffSwipeArea.draw(context);
        }
    }

    /**
     * Returns the start point of the runway.
     * @returns The start point of the runway.
     */
    public runwayStart(): Vector2D {
        return this.runway.start;
    }

    /**
     * Shifts the rearm queue and orders the aircraft to move to their new parking position.
     */
    private shiftRearmQueue() {
        let newOrder = this.rearmPosition.shiftQueue();
        for (const position of newOrder) {
            position.aircraft?.addParkingWaypoint(position.position, position.direction);
        }
    }

    /**
     * Generates eventhandler functions which preserve the current this object.
     * @param handler The eventhandler function to inject the this object into.
     * @param args Additional arguments.
     * @returns Event listener function with the given eventhandler function.
     */
    private handlerGenerator(handler: Function, ...args: any[]): EventListenerOrEventListenerObject {
        let that = this;
        return function (event: Event) {
            return handler.call(that, event, ...args);
        };
    }

    /**
     * Eventhandler for the landing event of an aircraft.
     * @param e The event.
     */
    private onAircraftLanding(e: Event) {
        let aircraft = <Aircraft>e.target;
        console.debug('LANDING', aircraft);

        let waitingOrRearmPosition = this.rearmPosition.addToQueue(aircraft);
        if (waitingOrRearmPosition === null) {
            throw new Error('No space for aircraft to wait.');
        }

        let runwayMidpoint = this.runway.start.add(this.runway.end).scaleSelf(0.5);
        let runwayOneForthPoint = this.runway.start.add(runwayMidpoint).scaleSelf(0.5);

        aircraft.addWaypoint(runwayOneForthPoint);
        aircraft.addWaypoint(runwayMidpoint);
        aircraft.addParkingWaypoint(waitingOrRearmPosition.position, waitingOrRearmPosition.direction);
    }

    /**
     * Eventhandler for the parked event of an aircraft.
     * @param e The event.
     */
    private onAircraftParked(e: Event) {
        let aircraft = <Aircraft>e.target;
        console.debug('PARKED', aircraft);

        if (this.rearmPosition.aircraft === aircraft) {
            aircraft.startRearm(this.config.rearmDuration);
            return;
        }

        for (const takeoffPosition of this.takeoffPositions) {
            if (takeoffPosition.aircraft !== aircraft) {
                continue;
            }

            aircraft.prepareTakeoff();
            for (const waypoint of takeoffPosition.path) {
                aircraft.addWaypoint(waypoint);
            }
            return;
        }
    }

    /**
     * Returns the absolute position from a position relative to the aircraft carrier center.
     * @param x The X coordinate relative to the aircraft carrier center.
     * @param y The Y coordinate relative to the aircraft carrier center.
     * @returns The absolute position from a position relative to the aircraft carrier center.
     */
    private absPos(x: number, y: number): Vector2D {
        return this.center.add(new Vector2D(x, y));
    }
}
