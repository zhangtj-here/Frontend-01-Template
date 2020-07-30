
function enableGesture(element) {

    let contexts = Object.create(null);

    let MOUSE_SYMBOL = Symbol("mouse");


    if (document.ontouchstart !== null)
        element.addEventListener("mousedown", () => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL]);
            let mousemove = event => {
                console.log(event.clientX, event.clientY);
                move(event, contexts[MOUSE_SYMBOL]);
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL]);
                document.removeEventListener("mousemove", mousemove);
                document.removeEventListener("mouseup", mouseend);
            }

            document.addEventListener("mousemove", mousemove);
            document.addEventListener("mouseup", mouseend);
        })



    element.addEventListener("touchstart", event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    })

    element.addEventListener("touchmove", event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    })

    element.addEventListener("touchend", event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    })

    element.addEventListener("touchcancel", event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    })




    //tap

    //pan - panstart panmove panend

    //flick

    //press - pressstart pressend


    let start = (point, context) => {
        let e = new CustomEvent('start');
        Object.assign(e, {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY
        })
        element.dispatchEvent(e);
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.moves = [];
        context.timeoutHandle = setTimeout(() => {
            if (context.isPan) {
                return;
            }
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            console.log('pressStart');
            element.dispatchEvent(new CustomEvent('pressstart', {}));
        }, 500)
        // console.log(point.clientX, point.clientY);
        // console.log("start");
    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (context.isPress)
                element.dispatchEvent(new CustomEvent('presscancel', {}));
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            console.log("panstart");
            let e = new CustomEvent('panstart');
            Object.assign(e, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            })
            element.dispatchEvent(e);
        }



        if (context.isPan) {
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            });
            context.moves = context.moves.filter(record => Date.now() - record.t < 300);
            let e = new CustomEvent('pan');
            Object.assign(e, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            })
            element.dispatchEvent(e);
            console.log("pan");
        }
        // console.log(dx, dy);
        // console.log("move");
    }
    let end = (point, context) => {
        if (context.isPan) {
            let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
            console.log(context.moves);
            let record = context.moves[0];
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
            // console.log("speed", speed);
            let isFlick = speed > 2.5;
            if (isFlick) {
                console.log("flick");
                let e = new CustomEvent('flick');
                Object.assign(e,{
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed
                });
                element.dispatchEvent(e);
            }
            let e = new CustomEvent('panend');
            Object.assign(e,{
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed: speed,
                isFlick: isFlick
            });
            element.dispatchEvent(e);
            console.log("panend");
        }

        if (context.isTap) {
            element.dispatchEvent(new CustomEvent('tap', {}));
            console.log("tap");
        }

        if (context.isPress) {

            element.dispatchEvent(new CustomEvent('pressend', {}));
            console.log("pressend");
        }
        clearTimeout(context.timeoutHandle);
        // console.log(point.clientX, point.clientY);
        // console.log("end");
    }

    let cancel = (point, context) => {
        element.dispatchEvent(new CustomEvent('canceled', {}));
        console.log(canceled);
        clearTimeout(context.timeoutHandle);
        // console.log(point.clientX, point.clientY);
        // console.log("cacel");
    }
}



