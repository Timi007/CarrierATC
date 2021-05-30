export const TWO_PI = 2 * Math.PI;
export const HALF_PI = Math.PI / 2;

/**
 * Returns a random angle between in radians.
 * @returns A random angle in radians.
 */
export function randomAngle(): number {
    return Math.random() * TWO_PI;
}

export function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNumber(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
}

declare global {
    interface Number {
        /**
         * Checks if the number is between a and b.
         * @param a Minimum range value.
         * @param b Maximum range value.
         * @param inclusive A value indicating if the defined range should include the end-points.
         * @returns True if number is between a and b; otherwise false.
         */
        between(a: number, b: number, inclusive: boolean): boolean;

        /**
         * Returns a number whose value is limited to the given range.
         * @param min The lower boundary of the output range.
         * @param max The upper boundary of the output range.
         * @returns A number in the range [min, max].
         */
        clamp(min: number, max: number): number;
    }
}

Number.prototype.between = function(a: number, b: number, inclusive: boolean): boolean {
    let min = Math.min.apply(Math, [a, b]);
    let max = Math.max.apply(Math, [a, b]);

    return inclusive ? this >= min && this <= max : this > min && this < max;
};


Number.prototype.clamp = function(min: number, max: number): number {
    return Math.min(Math.max(this.valueOf(), min), max);
};
