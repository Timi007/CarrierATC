export interface Opacity {
    readonly step: number;
    readonly min: number;
    readonly max: number;
    value: number;
    direction: 1 | -1;
}
