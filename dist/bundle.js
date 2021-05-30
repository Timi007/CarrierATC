/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "images/63e90eb99bc6ad2ebd170eecc988eba8.svg");

/***/ }),

/***/ 559:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "images/38f579ea643d03a228481806c9b414d3.svg");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: ./src/modules/util/Vector2D.ts
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    addSelf(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    add(other) {
        return this.clone().addSelf(other);
    }
    subtractSelf(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    subtract(other) {
        return this.clone().subtractSelf(other);
    }
    scaleSelf(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    scale(scalar) {
        return this.clone().scaleSelf(scalar);
    }
    setPolar(angle, distance) {
        this.x = distance * Math.cos(angle);
        this.y = distance * Math.sin(angle);
        return this;
    }
    static fromPolar(angle, distance) {
        let x = distance * Math.cos(angle);
        let y = distance * Math.sin(angle);
        return new Vector2D(x, y);
    }
    rotateSelf(angle) {
        let currentAngle = this.azimuth();
        let currentLength = this.length();
        return this.setPolar(currentAngle + angle, currentLength);
    }
    rotate(angle) {
        return this.clone().rotateSelf(angle);
    }
    negateSelf() {
        return this.scaleSelf(-1);
    }
    negateXSelf() {
        this.x *= -1;
        return this;
    }
    negateYSelf() {
        this.y *= -1;
        return this;
    }
    negate() {
        return this.clone().negateSelf();
    }
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    azimuth() {
        return Math.atan2(this.y, this.x);
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    cross(other) {
        return this.x * other.y - this.y * other.x;
    }
    angleTo(other) {
        return Math.acos(this.dot(other) / (this.length() * other.length()));
    }
    distanceTo(other) {
        return Math.sqrt(this.distanceTo2(other));
    }
    distanceTo2(other) {
        let dx = this.x - other.x;
        let dy = this.y - other.y;
        return dx ** 2 + dy ** 2;
    }
    clone() {
        return new Vector2D(this.x, this.y);
    }
    static lerp(a, b, t) {
        let x = a.x + (b.x - a.x) * t;
        let y = a.y + (b.y - a.y) * t;
        return new Vector2D(x, y);
    }
}

;// CONCATENATED MODULE: ./src/modules/util/canvas.ts

function getCanvasCtx(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas)
        throw new Error(`Invalid canvas id ${canvasId}.`);
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error(`Could not get context of canvas with id ${canvasId}.`);
    ctx.canvas.width = document.documentElement.clientWidth;
    ctx.canvas.height = document.documentElement.clientHeight;
    return ctx;
}
function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function getCanvasCenter(ctx) {
    return new Vector2D(ctx.canvas.width / 2, ctx.canvas.height / 2);
}

;// CONCATENATED MODULE: ./src/modules/AircraftState.ts
var AircraftState;
(function (AircraftState) {
    AircraftState[AircraftState["FLYING"] = 0] = "FLYING";
    AircraftState[AircraftState["LANDING"] = 1] = "LANDING";
    AircraftState[AircraftState["TAXIING"] = 2] = "TAXIING";
    AircraftState[AircraftState["PARKED"] = 3] = "PARKED";
    AircraftState[AircraftState["REARMING"] = 4] = "REARMING";
    AircraftState[AircraftState["TAKEOFF_RDY"] = 5] = "TAKEOFF_RDY";
    AircraftState[AircraftState["TAKEOFF"] = 6] = "TAKEOFF";
})(AircraftState || (AircraftState = {}));

;// CONCATENATED MODULE: ./src/modules/Global.ts
const DEBUG = false;
const DEBUG_DISABLE_COLLISION = false;
const DEBUG_CONFIRM_TAKEOFF = false;
const FONT_SIZES = {
    phone: {
        XSmall: 10,
        Small: 12,
        Medium: 15,
        Large: 20,
        XLarge: 40
    },
    tablet: {
        XSmall: 10,
        Small: 15,
        Medium: 20,
        Large: 40,
        XLarge: 80
    }
};

;// CONCATENATED MODULE: ./src/modules/Graphic.ts
class Graphic {
    constructor(image) {
        this.isLoaded = false;
        this.width = 0;
        this.height = 0;
        this.image = new Image();
        this.image.src = image;
        let that = this;
        this.image.onload = function () {
            that.isLoaded = true;
            that.width = that.image.width;
            that.height = that.image.height;
        };
    }
    draw(context, position, rotation, scale, alpha = 1) {
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

;// CONCATENATED MODULE: ./src/modules/util/DrawUtil.ts
function drawLine(ctx, start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}

;// CONCATENATED MODULE: ./src/modules/util/MathUtil.ts
const TWO_PI = 2 * Math.PI;
const HALF_PI = Math.PI / 2;
function randomAngle() {
    return Math.random() * TWO_PI;
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomNumber(min, max) {
    return Math.random() * (max - min + 1) + min;
}
Number.prototype.between = function (a, b, inclusive) {
    let min = Math.min.apply(Math, [a, b]);
    let max = Math.max.apply(Math, [a, b]);
    return inclusive ? this >= min && this <= max : this > min && this < max;
};
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this.valueOf(), min), max);
};

;// CONCATENATED MODULE: ./src/modules/Aircraft.ts






const aircraftImage = __webpack_require__(961);
class Waypoint {
    constructor(position) {
        this.position = position;
    }
}
class ParkingWaypoint extends Waypoint {
    constructor(position, direction) {
        super(position);
        this.direction = direction;
    }
}
class Aircraft extends EventTarget {
    constructor(position, heading, flyZone) {
        super();
        this.config = {
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
            catchArrestorWireDelay: 3000,
            image: {
                path: aircraftImage.default,
                scale: 0.2,
            },
            collision: {
                minScaleDiff: 0.42,
            }
        };
        this._state = AircraftState.FLYING;
        this._hasFinalApproch = false;
        this.path = [];
        this.catchArrestorWireTime = 0;
        this.rearming = {
            progress: -1,
            nextUpdateTime: 0,
            duration: -1,
        };
        this.collision = {
            collided: false,
            protection: {
                enabled: false,
                duration: -1,
                disableTime: 0,
            },
        };
        this.opacity = {
            step: 0.001,
            min: 0.3,
            max: 1,
            value: 1,
            direction: -1,
        };
        this.scale = this.config.scale.flying;
        this.speed = this.config.speed.flying;
        this.image = new Graphic(this.config.image.path);
        this.position = position;
        this.flyZone = flyZone;
        this.disableBorderBounce = this.isOutsideFlyzone();
        this.velocity = Vector2D.fromPolar(heading, this.speed);
    }
    get state() {
        return this._state;
    }
    get hasFinalApproch() {
        return this._hasFinalApproch;
    }
    update(gameTime) {
        this.updateSpawnProtection(gameTime);
        if (this._state === AircraftState.PARKED || this._state === AircraftState.TAKEOFF_RDY) {
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
    addWaypoint(position) {
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
    addParkingWaypoint(position, direction) {
        if (this._state === AircraftState.PARKED) {
            this._state = AircraftState.TAXIING;
        }
        this.path.push(new ParkingWaypoint(position, direction));
    }
    disableCollision(duration) {
        if (duration <= 0) {
            return;
        }
        this.collision.protection.enabled = true;
        this.collision.protection.duration = duration;
    }
    startRearm(duration) {
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
    hasFinishedRearming() {
        return this.rearming.progress === 100;
    }
    prepareTakeoff() {
        this._state = AircraftState.TAKEOFF_RDY;
    }
    takeoff() {
        this._state = AircraftState.TAKEOFF;
    }
    addFinalApproch(runwayStart) {
        if (this._hasFinalApproch)
            return;
        this._hasFinalApproch = true;
        this.path.push(new Waypoint(runwayStart));
    }
    clearPath() {
        this._hasFinalApproch = false;
        this.path = [];
    }
    isOutsideFlyzone() {
        return this.flyZone.isHitboxOutside(this.position, this.hitboxRadius());
    }
    isPositionInUnscaledHitbox(position) {
        return this.position.distanceTo2(position) < (this.config.hitbox.maxRadius ** 2);
    }
    collidesWith(other) {
        if (this.collision.protection.enabled || other.collision.protection.enabled) {
            return false;
        }
        if (!this.statesAreCollidable(this._state, other._state) || !this.nearlySameScale(other.scale)) {
            return false;
        }
        let r = other.hitboxRadius() + this.hitboxRadius();
        return this.position.distanceTo2(other.position) < (r ** 2);
    }
    setCollided() {
        this.collision.collided = true;
    }
    draw(context, isSelected = false) {
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
    drawPath(context) {
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
    drawProgressBar(context, x, y, w, h, color, progress) {
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
    drawAircraftImage(context) {
        let opacity = this.opacity.value.clamp(this.opacity.min, this.opacity.max);
        this.image.draw(context, this.position, this.velocity.azimuth(), this.config.image.scale * this.scale, opacity);
    }
    drawRearmProgress(context) {
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
    drawFinishedCheckmark(context, color) {
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
    drawHitbox(context, color, alpha = 1, padding = 0) {
        context.globalAlpha = alpha;
        context.fillStyle = color;
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.hitboxRadius() + padding, 0, TWO_PI);
        context.fill();
        context.globalAlpha = 1;
    }
    hitboxRadius() {
        return this.scale * this.config.hitbox.maxRadius;
    }
    moveStraight(gameTime) {
        this.position.addSelf(this.velocity.scale(gameTime.elapsed));
    }
    moveToWaypoint(gameTime) {
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
                waypointVector.setPolar(waypoint.direction, 1);
            }
            else {
                this.path.shift();
            }
        }
        if (this.path.length === 0) {
            if (this._hasFinalApproch) {
                this._state = AircraftState.LANDING;
                this._hasFinalApproch = false;
                this.dispatchEvent(new Event('landing'));
            }
            else if (this._state !== AircraftState.FLYING && this._state !== AircraftState.TAKEOFF) {
                this._state = AircraftState.PARKED;
            }
            return;
        }
        let angle = this.velocity.angleTo(waypointVector);
        let angleTolerance = isParkingWaypoint ? 0.05 : 0.1;
        if (angle > angleTolerance) {
            let cross = this.velocity.cross(waypointVector);
            let direction = cross > 0 ? 1 : -1;
            this.velocity.rotateSelf(this.config.turnRate * direction * gameTime.elapsed);
        }
        else if (isParkingWaypoint && hasReachedWaypoint) {
            console.log('reached the parking position and aligned accordingly');
            this.path.shift();
            if (this.path.length === 0) {
                this._state = AircraftState.PARKED;
                this.dispatchEvent(new Event('parked'));
            }
        }
        this.position.addSelf(this.velocity.scale(gameTime.elapsed));
    }
    handleLeavingFlyZone() {
        let isOutside = this.isOutsideFlyzone();
        if (!this.disableBorderBounce && isOutside) {
            this.velocity.rotateSelf(Math.PI);
        }
        else if (this.disableBorderBounce && !isOutside) {
            this.disableBorderBounce = false;
        }
    }
    updateLandingScale(gameTime) {
        if (this.scale > this.config.scale.taxiing) {
            this.scale -= this.config.scale.flying / 100 * 0.02 * gameTime.elapsed;
        }
    }
    updateLandingSpeed(gameTime) {
        if (this.catchArrestorWireTime === 0) {
            this.catchArrestorWireTime = gameTime.lastUpdate + this.config.catchArrestorWireDelay;
        }
        if (this.speed > this.config.speed.taxiing && gameTime.lastUpdate > this.catchArrestorWireTime) {
            let speedReduction = this.speed > (this.config.speed.taxiing * 1.7) ? this.config.speed.flying / 100 * 5 : this.config.speed.flying / 100 * 0.25;
            this.speed -= speedReduction;
            this.velocity.scaleSelf(this.speed / (this.speed + speedReduction));
        }
    }
    updateTakeoffScale(gameTime) {
        if (this.scale < this.config.scale.flying) {
            this.scale += this.config.scale.flying / 100 * 0.003 * gameTime.elapsed;
        }
    }
    updateTakeoffSpeed() {
        if (this.speed < this.config.speed.flying) {
            let speedAddition = this.speed < (this.config.speed.flying * 0.9) ? this.config.speed.flying / 100 * 5 : this.config.speed.flying / 100 * 0.25;
            this.speed += speedAddition;
            this.velocity.scaleSelf(this.speed / (this.speed - speedAddition));
        }
    }
    updateRearm(gameTime) {
        if (gameTime.lastUpdate <= this.rearming.nextUpdateTime) {
            return;
        }
        this.rearming.nextUpdateTime = gameTime.lastUpdate + (this.rearming.duration / 100);
        this.rearming.progress++;
        if (this.hasFinishedRearming()) {
            this.rearming.nextUpdateTime = Infinity;
        }
    }
    updateSpawnProtection(gameTime) {
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
    statesAreCollidable(thisState, otherState) {
        let areFlying = thisState === AircraftState.FLYING && otherState === AircraftState.FLYING;
        let notBothTakingOff = this.xor(thisState === AircraftState.TAKEOFF, otherState === AircraftState.TAKEOFF);
        return areFlying || notBothTakingOff;
    }
    nearlySameScale(otherScale) {
        return Math.abs(this.scale - otherScale) < this.config.collision.minScaleDiff;
    }
    xor(a, b) {
        return (a && !b) || (!a && b);
    }
}

;// CONCATENATED MODULE: ./src/modules/DeckPosition.ts
class DeckPosition {
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
        this.aircraft = null;
    }
    isEmpty() {
        return this.aircraft === null;
    }
}

;// CONCATENATED MODULE: ./src/modules/RearmPosition.ts

class RearmPosition extends DeckPosition {
    constructor(position, direction, queue) {
        super(position, direction);
        this.queue = queue;
    }
    hasQueueSpace() {
        return this.isEmpty() || this.queue.some(pos => pos.isEmpty());
    }
    addToQueue(aircraft) {
        if (this.isEmpty()) {
            this.aircraft = aircraft;
            return this;
        }
        for (const position of this.queue) {
            if (position.isEmpty()) {
                position.aircraft = aircraft;
                return position;
            }
        }
        return null;
    }
    shiftQueue() {
        let newQueue = [this, ...this.queue];
        this.aircraft = null;
        for (let i = 0; i < newQueue.length - 1; i++) {
            let position = newQueue[i];
            let nextPosition = newQueue[i + 1];
            if (position.isEmpty()) {
                position.aircraft = nextPosition.aircraft;
                nextPosition.aircraft = null;
            }
        }
        return newQueue;
    }
}

;// CONCATENATED MODULE: ./src/modules/Runway.ts




class Runway {
    constructor(start, end, snapDistance) {
        this.closed = false;
        this.opacity = {
            step: 0.001,
            min: 0.1,
            max: 1,
            value: 1,
            direction: -1,
        };
        this.start = start;
        this.end = end;
        this.snapDistance = snapDistance;
        this.maxLeft = Vector2D.fromPolar(5 * Math.PI / 8, snapDistance).addSelf(start);
        this.maxRight = Vector2D.fromPolar(3 * Math.PI / 8, snapDistance).addSelf(start);
        this.maxLeftAzimuth = this.maxLeft.subtract(start).negateSelf().azimuth();
        this.maxRightAzimuth = this.maxRight.subtract(start).negateSelf().azimuth();
    }
    update(gameTime) {
        this.updateApproachOpacity(gameTime);
    }
    updateApproachOpacity(gameTime) {
        this.opacity.value += this.opacity.step * this.opacity.direction * gameTime.elapsed;
        if (this.opacity.value < this.opacity.min) {
            this.opacity.direction = 1;
        }
        if (this.opacity.value > this.opacity.max) {
            this.opacity.direction = -1;
        }
    }
    draw(context, drawRunwayApproch = false, hasWaypointConnection = false) {
        if (DEBUG) {
            context.globalAlpha = 0.1;
            context.strokeStyle = 'yellow';
            context.lineWidth = 30;
            drawLine(context, this.start, this.end);
        }
        if (drawRunwayApproch && !this.closed) {
            context.lineWidth = 5;
            if (hasWaypointConnection) {
                context.strokeStyle = 'green';
                context.globalAlpha = 1;
            }
            else {
                context.strokeStyle = 'darkgray';
                context.globalAlpha = this.opacity.value.clamp(this.opacity.min, this.opacity.max);
            }
            drawLine(context, this.maxLeft, this.start);
            drawLine(context, this.maxRight, this.start);
            let yOffset = 30;
            drawLine(context, this.maxLeft.add(new Vector2D(0, yOffset)), this.start.add(new Vector2D(0, yOffset)));
            drawLine(context, this.maxRight.add(new Vector2D(0, yOffset)), this.start.add(new Vector2D(0, yOffset)));
            drawLine(context, this.maxLeft.add(new Vector2D(0, yOffset * 2)), this.start.add(new Vector2D(0, yOffset * 2)));
            drawLine(context, this.maxRight.add(new Vector2D(0, yOffset * 2)), this.start.add(new Vector2D(0, yOffset * 2)));
        }
        context.globalAlpha = 1;
        context.fillStyle = this.closed ? 'red' : 'green';
        context.beginPath();
        context.arc(this.start.x - 25, this.start.y - 10, 2, 0, TWO_PI);
        context.fill();
    }
}

;// CONCATENATED MODULE: ./src/modules/util/Box.ts

class Box {
    constructor(center, w, h, angle = 0) {
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
    isInside(position) {
        let localPosition = this.transformPosition(position);
        return this.isXInside(localPosition.x) && this.isYInside(localPosition.y);
    }
    transformPosition(position) {
        let transformedPosistion = this.invTransformation.transformPoint(new DOMPoint(position.x, position.y));
        return new Vector2D(transformedPosistion.x, transformedPosistion.y);
    }
    isXInside(x) {
        return x.between(-this.width / 2, this.width / 2, true);
    }
    isYInside(y) {
        return y.between(-this.height / 2, this.height / 2, true);
    }
    draw(context) {
        context.save();
        context.setTransform(this.transformation);
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }
}

;// CONCATENATED MODULE: ./src/modules/TakeoffArea.ts

class TakeoffArea extends Box {
    constructor(completeArea, startWidth, endWidth) {
        super(completeArea.center, completeArea.width, completeArea.height, completeArea.angle);
        if (this.width < startWidth + endWidth) {
            throw new Error("Start and end width exceed the complete area width");
        }
        this.startWidth = startWidth;
        this.endWidth = endWidth;
    }
    isInsideStart(position) {
        let localPosition = this.transformPosition(position);
        let minW = -this.width / 2;
        let maxW = minW + this.startWidth;
        return localPosition.x.between(minW, maxW, true) && this.isYInside(localPosition.y);
    }
    isInsideEnd(position) {
        let localPosition = this.transformPosition(position);
        let maxW = this.width / 2;
        let minW = maxW - this.endWidth;
        return localPosition.x.between(minW, maxW, true) && this.isYInside(localPosition.y);
    }
    draw(context) {
        context.globalAlpha = 0.5;
        context.fillStyle = 'red';
        super.draw(context);
        context.save();
        context.setTransform(this.transformation);
        context.fillStyle = 'orange';
        context.fillRect(-this.width / 2, -this.height / 2, this.startWidth, this.height);
        context.fillRect(this.width / 2 - this.endWidth, -this.height / 2, this.endWidth, this.height);
        context.restore();
    }
}

;// CONCATENATED MODULE: ./src/modules/TakeoffPosition.ts

class TakeoffPosition extends DeckPosition {
    constructor(position, direction, takeoffPath) {
        super(position, direction);
        this.path = takeoffPath;
    }
}

;// CONCATENATED MODULE: ./src/modules/AircraftCarrier.ts











const aircraftCarrierImage = __webpack_require__(559);
class AircraftCarrier {
    constructor(center) {
        this.config = {
            scale: 1.5,
            direction: -HALF_PI + 0.18,
            rearmDuration: 4000,
        };
        this.takeoffPositions = [];
        this.center = center;
        this.image = new Graphic(aircraftCarrierImage.default);
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
    addAircraftEventHandler(aircraft) {
        aircraft.addEventListener('landing', this.eventhandlers.landing);
        aircraft.addEventListener('parked', this.eventhandlers.parked);
    }
    removeAircraftEventHandler(aircraft) {
        aircraft.removeEventListener('landing', this.eventhandlers.landing);
        aircraft.removeEventListener('parked', this.eventhandlers.parked);
    }
    waypointIsFinalApproch(waypoint) {
        let finalApprochVector = this.runway.start.subtract(waypoint);
        let finalApprochAzimuth = finalApprochVector.azimuth();
        let finalApprochLength = finalApprochVector.length();
        let isCorrectHeading = finalApprochAzimuth.between(this.runway.maxRightAzimuth, this.runway.maxLeftAzimuth, false);
        let isNearbyAndNotTooClose = finalApprochLength.between(this.runway.snapDistance / 2, this.runway.snapDistance, false);
        return isNearbyAndNotTooClose && isCorrectHeading;
    }
    canLand() {
        return !this.runway.closed;
    }
    orderPrepareTakeoff(aircraft) {
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
    orderTakeoff() {
        console.debug('TAKEOFF TRIGGERED');
        for (const takeoffPosition of this.takeoffPositions) {
            if (takeoffPosition.aircraft?.state === AircraftState.TAKEOFF_RDY) {
                takeoffPosition.aircraft.takeoff();
                console.debug('TAKEOFF', takeoffPosition.aircraft);
                takeoffPosition.aircraft = null;
            }
        }
    }
    update(gameTime) {
        this.runway.update(gameTime);
        this.runway.closed = !this.rearmPosition.hasQueueSpace();
    }
    draw(context, drawRunwayApproch = false, hasWaypointConnection = false) {
        this.image.draw(context, this.center, this.config.direction, this.config.scale);
        this.runway.draw(context, drawRunwayApproch, hasWaypointConnection);
        if (DEBUG) {
            this.takeoffSwipeArea.draw(context);
        }
    }
    runwayStart() {
        return this.runway.start;
    }
    shiftRearmQueue() {
        let newOrder = this.rearmPosition.shiftQueue();
        for (const position of newOrder) {
            position.aircraft?.addParkingWaypoint(position.position, position.direction);
        }
    }
    handlerGenerator(handler, ...args) {
        let that = this;
        return function (event) {
            return handler.call(that, event, ...args);
        };
    }
    onAircraftLanding(e) {
        let aircraft = e.target;
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
    onAircraftParked(e) {
        let aircraft = e.target;
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
    absPos(x, y) {
        return this.center.add(new Vector2D(x, y));
    }
}

;// CONCATENATED MODULE: ./src/modules/FlyZone.ts

class FlyZone {
    constructor(x, y, w, h) {
        this.topLeft = new Vector2D(x, y);
        this.bottomRight = new Vector2D(x + w, y + h);
        this.width = w;
        this.height = h;
    }
    isHitboxOutside(position, radius) {
        return (position.x + radius < this.topLeft.x ||
            position.x - radius > this.bottomRight.x ||
            position.y + radius < this.topLeft.y ||
            position.y - radius > this.bottomRight.y);
    }
    isPositionOutside(position) {
        return (position.x < this.topLeft.x ||
            position.x > this.bottomRight.x ||
            position.y < this.topLeft.y ||
            position.y > this.bottomRight.y);
    }
}

;// CONCATENATED MODULE: ./src/modules/GameState.ts
var GameState;
(function (GameState) {
    GameState[GameState["PLAYING"] = 0] = "PLAYING";
    GameState[GameState["GAME_OVER"] = 1] = "GAME_OVER";
})(GameState || (GameState = {}));

;// CONCATENATED MODULE: ./src/modules/GameTime.ts
class GameTime {
    constructor() {
        this._lastUpdate = 0;
        this._elapsed = 0;
    }
    update(now) {
        this._elapsed = now - this._lastUpdate;
        this._lastUpdate = now;
    }
    get elapsed() {
        return this._elapsed;
    }
    get lastUpdate() {
        return this._lastUpdate;
    }
}

;// CONCATENATED MODULE: ./src/modules/CarrierATCGame.ts











const MAX_AIRCRAFT = {
    phone: 8,
    tablet: 15
};
class CarrierATCGame {
    constructor(canvasContext) {
        this.settings = {
            aircraftSpawnRate: 4000,
            spawnProtectionDuration: 4000,
            maxAircraft: 1,
        };
        this.aircraft = [];
        this.nextAircraftSpawnTime = 0;
        this.selectedAircraft = null;
        this.selectedAircraftTouchId = -1;
        this.gameState = GameState.PLAYING;
        this.twoFingerSwipePath = null;
        this.score = 0;
        this.context = canvasContext;
        console.debug('CANVAS SIZE', 'W:', this.context.canvas.width, 'H:', this.context.canvas.height);
        this.settings.maxAircraft = this.context.canvas.width < 550 ? MAX_AIRCRAFT.phone : MAX_AIRCRAFT.tablet;
        this.flyZone = new FlyZone(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.gameTime = new GameTime();
        let center = getCanvasCenter(this.context);
        this.aircraftCarrier = new AircraftCarrier(new Vector2D(center.x, center.y - 50));
        this.addEventHandlers();
    }
    update(time) {
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
    spawnAircraft() {
        let randomHeading = randomAngle();
        let randomPosition = this.randomSpawnPosition(randomHeading);
        let newAircraft = new Aircraft(randomPosition, randomHeading, this.flyZone);
        newAircraft.disableCollision(this.settings.spawnProtectionDuration);
        this.aircraftCarrier.addAircraftEventHandler(newAircraft);
        return newAircraft;
    }
    randomSpawnPosition(heading) {
        const width = this.context.canvas.width;
        const height = this.context.canvas.height;
        const margin = 25;
        let x, y;
        let left = Math.PI / 4;
        let right = left + HALF_PI;
        if (heading.between(left, right, true)) {
            x = Math.random() > 0.5 ? randomInteger(width * 0.1, width * 0.4) : randomInteger(width * 0.6, width * 0.9);
            y = -margin;
        }
        else if (heading.between(right, left + Math.PI, true)) {
            x = width + margin;
            y = randomInteger(height * 0.1, height * 0.9);
        }
        else if (heading.between(left + Math.PI, right + Math.PI, true)) {
            x = Math.random() > 0.5 ? randomInteger(width * 0.1, width * 0.4) : randomInteger(width * 0.6, width * 0.9);
            y = height + margin;
        }
        else {
            x = -margin;
            y = randomInteger(height * 0.1, height * 0.9);
        }
        return new Vector2D(x, y);
    }
    removeAircraft(aircraft) {
        this.aircraftCarrier.removeAircraftEventHandler(aircraft);
        let index = this.aircraft.indexOf(aircraft);
        if (index < 0) {
            return;
        }
        this.aircraft.splice(index, 1);
    }
    draw() {
        this.drawScore();
        this.aircraftCarrier.draw(this.context, this.selectedAircraft !== null, this.selectedAircraft?.hasFinalApproch ?? false);
        this.drawAllAircraft();
        this.drawTwoFingerSwipePath();
        if (this.gameState === GameState.GAME_OVER) {
            this.drawGameOver();
        }
    }
    drawAllAircraft() {
        for (const aircraft of this.aircraft) {
            aircraft.drawPath(this.context);
        }
        for (const aircraft of this.aircraft) {
            if (aircraft.state === AircraftState.FLYING) {
                continue;
            }
            let isSelected = aircraft === this.selectedAircraft;
            aircraft.draw(this.context, isSelected);
        }
        for (const aircraft of this.aircraft) {
            if (aircraft.state !== AircraftState.FLYING) {
                continue;
            }
            let isSelected = aircraft === this.selectedAircraft;
            aircraft.draw(this.context, isSelected);
        }
    }
    drawGameOver() {
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
    addEventHandlers() {
        this.context.canvas.addEventListener('touchstart', (e) => {
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
        this.context.canvas.addEventListener('touchmove', (e) => {
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
    onOneTouchStart(e) {
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
    onOneTouchMove(e) {
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
    onTwoTouchStart(e) {
        let touchPos = this.getLerpTwoTouchPos(e);
        let swipeStartCorrect = this.aircraftCarrier.takeoffSwipeArea.isInsideStart(touchPos);
        if (swipeStartCorrect) {
            this.twoFingerSwipePath = [touchPos];
        }
    }
    onTwoTouchMove(e) {
        this.twoFingerSwipePath?.push(this.getLerpTwoTouchPos(e));
    }
    OnTouchEnd(e) {
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
    getLerpTwoTouchPos(e) {
        let touch1 = e.targetTouches[0];
        let touch2 = e.targetTouches[1];
        let touch1Pos = this.getPos(touch1);
        let touch2Pos = this.getPos(touch2);
        return Vector2D.lerp(touch1Pos, touch2Pos, 0.5);
    }
    getPos(touch) {
        return new Vector2D(touch.clientX, touch.clientY);
    }
    drawTwoFingerSwipePath() {
        if (!this.twoFingerSwipePath) {
            return;
        }
        this.context.strokeStyle = 'white';
        this.context.lineWidth = 4;
        for (let i = 0; i < this.twoFingerSwipePath.length - 1; i++) {
            drawLine(this.context, this.twoFingerSwipePath[i], this.twoFingerSwipePath[i + 1]);
        }
    }
    drawScore() {
        let fontSize = this.context.canvas.width < 550 ? FONT_SIZES.phone : FONT_SIZES.tablet;
        this.context.fillStyle = 'white';
        this.context.font = `${fontSize.Medium}px Arial`;
        this.context.textAlign = 'right';
        this.context.textBaseline = 'top';
        this.context.lineWidth = 4;
        this.context.fillText(`Score: ${this.score}`, this.context.canvas.width * 0.85, this.context.canvas.height * 0.015);
    }
}

;// CONCATENATED MODULE: ./src/index.ts



const ctx = getCanvasCtx('canvas01');
const game = new CarrierATCGame(ctx);
function draw(time) {
    clearCanvas(ctx);
    game.update(time);
    game.draw();
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

})();

/******/ })()
;