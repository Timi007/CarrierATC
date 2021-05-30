/**
 * A mathematical representation of a Euclidean vector in a two dimensional cartesian coordinate system.
 */
export class Vector2D {
    /**
     * The x coordinate of the vector.
     */
    public x: number;
    /**
     * The y coordinate of the vector.
     */
    public y: number;

    /**
     * Constructs a new vector using initial coordinates.
     * @param x The x coordinate of the vector.
     * @param y The y coordinate of the vector.
     */
    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds given vector to this vector.
     * @param other The vector to add to this vector.
     * @returns The current vector for cascading.
     */
    public addSelf(other: Vector2D): Vector2D {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    /**
     * Adds given vector to this vector.
     * @param other The vector to add to this vector.
     * @returns The new added vector.
     */
    public add(other: Vector2D): Vector2D {
        return this.clone().addSelf(other);
    }

    /**
     * Subtracts given vector from this vector.
     * @param other The vector to subtract from this vector.
     * @returns The current vector for cascading.
     */
    public subtractSelf(other: Vector2D): Vector2D {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    /**
     * Subtracts given vector from this vector.
     * @param other The vector to subtract from this vector.
     * @returns The new subtracted vector.
     */
    public subtract(other: Vector2D): Vector2D {
        return this.clone().subtractSelf(other);
    }

    /**
     * Multiplies given scalar to this vector.
     * @param scalar The number multiplied to the vector.
     * @returns The current vector for cascading.
     */
    public scaleSelf(scalar: number): Vector2D {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    /**
     * Multiplies given scalar to this vector.
     * @param scalar The number multiplied to the vector.
     * @returns The new scaled vector.
     */
    public scale(scalar: number): Vector2D {
        return this.clone().scaleSelf(scalar);
    }

    /**
     * Sets the vector with the polar coordinate system.
     * @param angle The polar angle.
     * @param distance The radial distance.
     * @returns The current vector for cascading.
     */
    public setPolar(angle: number, distance: number): Vector2D {
        this.x = distance * Math.cos(angle);
        this.y = distance * Math.sin(angle);

        return this;
    }

    /**
     * Constructs a new vector using polar coordinate system.
     * @param angle The polar angle.
     * @param distance The radial distance.
     * @returns A polar vector.
     */
    public static fromPolar(angle: number, distance: number): Vector2D {
        let x = distance * Math.cos(angle);
        let y = distance * Math.sin(angle);

        return new Vector2D(x, y);
    }

    /**
     * Rotates this vector by given angle.
     * @param angle The angle in radians.
     * @returns The current vector for cascading.
     */
    public rotateSelf(angle: number): Vector2D {
        let currentAngle = this.azimuth();
        let currentLength = this.length();

        return this.setPolar(currentAngle + angle, currentLength);
    }

    /**
     * Rotates this vector by given angle.
     * @param angle The angle in radians.
     * @returns The new rotated vector.
     */
    public rotate(angle: number): Vector2D {
        return this.clone().rotateSelf(angle);
    }

    /**
     * Reverses this vector.
     * @returns The current vector for cascading.
     */
    public negateSelf(): Vector2D {
        return this.scaleSelf(-1);
    }

    /**
     * Reverses the x coordinate of this vector.
     * @returns The current vector for cascading.
     */
    public negateXSelf(): Vector2D {
        this.x *= -1;

        return this;
    }

    /**
     * Reverses the y coordinate of this vector.
     * @returns The current vector for cascading.
     */
     public negateYSelf(): Vector2D {
        this.y *= -1;

        return this;
    }

    /**
     * Reverses this vector.
     * @returns The new reversed vector.
     */
    public negate(): Vector2D {
        return this.clone().negateSelf();
    }

    /**
     * Returns the length (magnitude) of the vector.
     * @returns The length (magnitude) of the vector.
     */
    public length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Returns the heading of the vector.
     * @returns The heading (azimuth) in the interval [-PI, PI] of the vector.
     */
    public azimuth(): number {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Returns the dot product of this vector with the given vector.
     * @param other The second vector.
     * @returns Returns the dot product of both vectors.
     */
    public dot(other: Vector2D): number {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Returns the length of the cross product vector.
     * @param other The second vector.
     * @returns The length of the cross product vector.
     */
    public cross(other: Vector2D): number {
        return this.x * other.y - this.y * other.x;
    }

    /**
     * Returns the angle between this and given vector.
     * @param other The second vector.
     * @returns Returns the angle in radians between both vectors.
     */
    public angleTo(other: Vector2D): number {
        return Math.acos(this.dot(other) / (this.length() * other.length()));
    }

    /**
     * Returns the distance from this to given vector.
     * @param other The vector to calculate the distance to.
     * @returns The distance to given vector.
     */
    public distanceTo(other: Vector2D): number {
        return Math.sqrt(this.distanceTo2(other));
    }

    /**
     * Returns the squared distance from this to given vector.
     * @param other The vector to calculate the distance to.
     * @returns The squared distance to given vector.
     */
    public distanceTo2(other: Vector2D): number {
        let dx = this.x - other.x;
        let dy = this.y - other.y;

        return dx ** 2 + dy ** 2;
    }

    /**
     * Returns a new copy of this vector.
     * @returns A new copy of this vector.
     */
    public clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    /**
     * Linearly interpolates between the points a and b by the interpolant t.
     * @param a Start value, returned when t = 0.
     * @param b End value, returned when t = 1.
     * @param t Value between 0 and 1 used to interpolate between a and b.
     * @returns The linearly interpolated point between a and b.
     * @example
     * When t = 0, Vector2D.lerp(a, b, t) returns a.
     * When t = 1, Vector2D.lerp(a, b, t) returns b.
     * When t = 0.5, Vector2D.lerp(a, b, t) returns the point midway between a and b.
     */
    public static lerp(a: Vector2D, b: Vector2D, t: number): Vector2D {
        let x = a.x + (b.x - a.x) * t;
        let y = a.y + (b.y - a.y) * t;

        return new Vector2D(x, y);
    }
}
