function convertTouchListToArray(list: TouchList): Touch[] {
    let touches: Touch[] = [];
    for (const touch of list)
        touches.push(touch);

    return touches;
}

export function createTouchEvent(type: string, eventInit?: TouchEvent): TouchEvent {
    if (!eventInit)
        return new TouchEvent(type);

    return new TouchEvent(type, {
        touches: convertTouchListToArray(eventInit.touches),
        targetTouches: convertTouchListToArray(eventInit.targetTouches),
        changedTouches: convertTouchListToArray(eventInit.changedTouches),
        ctrlKey: eventInit.ctrlKey,
        shiftKey: eventInit.shiftKey,
        altKey: eventInit.altKey,
        metaKey: eventInit.metaKey,
    });
}
