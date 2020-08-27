import {createElement, Text, Wrapper} from "./createElement.js";
import {Animation, Timeline} from "./animation";
import {ease, linear} from "./cubicBezier";


import css from "./carousel.css";
// console.log(css);

import {enableGesture} from "./gesture";


export class Carousel {
    constructor(config) {
        // this.root = document.createElement("div");
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.position = 0;
    }

    set class(v) {
        console.log("Parent::class", v);
    }

    set id(v) {
        console.log("Parent::id", v);
    }

    setAttribute(name, value) {
        // console.log(name, value);
        this[name] = value;
    }

    appendChild(child) {
        // this.root.appendChild(child);
        this.children.push(child);
        // child.mountTo(this.root);
    }

    render() {
        let timeline = new Timeline;
        window.xtimeline = timeline;
        timeline.start();


        let nextPicStopHandle = null;


        let children = this.data.map((url, currentPosition) => {
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition+ 1) % this.data.length;
            console.log(nextPosition, currentPosition, lastPosition);

            // let lastElement = children[lastPosition];
            // let currentElement = children[currentPosition];
            // let nextElement = children[nextPosition];

            let offset = 0;

            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandle);

                // lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                // nextElement = children[nextPosition];

                // console.log(currentElement.style.transform);
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
                // console.log(offset);


                // console.log(lastTransformValue, currentTransformValue, nextTransformValue);
            }

            let onPan = event => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let dx = event.clientX - event.startX;

                let currentTransformValue = - 500 * currentPosition + offset + dx;
                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;




                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;

            }

            let onPanend = (event) => {
                let direction = 0;
                let dx = event.clientX - event.startX;

                console.log("flick", event.isFlick);


                if(dx + offset > 250 || dx > 0 && event.isFlick) {
                    direction = 1;
                } else if (dx + offset < -250 || dx < 0 && event.isFlick) {
                    direction  = -1;
                }
                timeline.reset();
                timeline.start();


                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];



                let lastAnimation = new Animation(lastElement.style, "transform", -500 - 500 * lastPosition + offset + dx,
                    -500 - 500 * lastPosition + offset + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);

                let currentAnimation = new Animation(currentElement.style, "transform", - 500 * currentPosition + offset + dx,
                    - 500 * currentPosition + offset + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);

                let nextAnimation = new Animation(nextElement.style, "transform", 500 - 500 * nextPosition + offset + dx,
                    500 - 500 * nextPosition + offset + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);

                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);


                this.position = (this.position - direction + this.data.length) % this.data.length;

                nextPicStopHandle = setTimeout(nextPic, 3000);
            }

            let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true}/>;
            element.style.transform = "translateX(0px)";
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        });





        let nextPic = () => {
            let nextPosition = (this.position + 1) % this.data.length;

            let current = children[this.position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, "transform", -100 * this.position,
                -100 -100 * this.position, 500, 0, ease, v => `translateX(${5 * v}px)`);

            let nextAnimation = new Animation(next.style, "transform", 100 -100 * nextPosition,
                -100 * nextPosition, 500, 0, ease, v => `translateX(${5 * v}px)`);
            timeline.add(currentAnimation);
            timeline.add(nextAnimation);

            this.position = nextPosition;



            // current.style.transition = "ease 0s";
            // next.style.transition  = "ease 0s";
            //
            // current.style.transform = `translateX(${ -100 * this.position}%)`;
            // next.style.transform = `translateX(${100 -100 * nextPosition}%)`;

            // requestAnimationFrame(() => {
            //     requestAnimationFrame(() => {
            //         current.style.transition = "ease 0.5s";
            //         next.style.transition  = "ease 0.5s";
            //
            //         current.style.transform = `translateX(${-100 -100 * this.position}%)`;
            //         next.style.transform = `translateX(${-100 * nextPosition}%)`;
            //
            //         this.position = nextPosition;
            //     })
            // });

            nextPicStopHandle = setTimeout(nextPic, 3000);
        }

        nextPicStopHandle = setTimeout(nextPic, 3000);

        return <div class="carousel">
            {children}
        </div>
    }

    mountTo(parent) {
        // for (let child of this.children) {
        //     // child.mountTo(this.root);
        //     this.slot.appendChild(child);
        // }
        let div = this.render();
        div.mountTo(parent);

        // div.addEventListener("mousedown", (event) => {
        //     let startX = event.clientX, startY = event.clientY;
        //     let nextPosition = (this.position + 1) % this.data.length;
        //     let lastPosition = (this.position - 1 + this.data.length) % this.data.length;
        //
        //     let current = div.children[this.position];
        //     let last = div.children[lastPosition];
        //     let next = div.children[nextPosition];
        //
        //     current.style.transform = `translateX(${ -500 * this.position}px)`;
        //     last.style.transform = `translateX(${-500 -500 * lastPosition}px)`;
        //     next.style.transform = `translateX(${500 -500 * nextPosition}px)`;
        //
        //     current.style.transition = "none";
        //     last.style.transition = "none";
        //     next.style.transition = "none";
        //
        //     let move = (event) => {
        //         current.style.transform = `translateX(${event.clientX - startX - 500 * this.position}px)`;
        //         last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
        //         next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
        //         // let range = nearest(event.clientX, event.clientY);
        //         // range.insertNode(dragable);
        //     };
        //     let up = (event) => {
        //         let offset = 0;
        //
        //         if(event.clientX - startX > 250) {
        //             offset = 1;
        //         } else if (event.clientX - startX < -250) {
        //             offset = -1;
        //         }
        //
        //         current.style.transition = "ease .5s";
        //         last.style.transition = "ease .5s";
        //         next.style.transition = "ease .5s";
        //
        //         this.position += offset;
        //
        //         current.style.transform = `translateX(${offset * 500 - 500 * this.position}px)`;
        //         last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
        //         next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;
        //
        //         this.position = (this.position - offset + this.data.length) % this.data.length;
        //         // baseX = baseX + event.clientX - startX, baseY = baseY + event.clientY - startY;
        //         document.removeEventListener("mousemove", move)
        //         document.removeEventListener("mouseup", up)
        //     };
        //     document.addEventListener("mousemove", move)
        //     document.addEventListener("mouseup", up)
        // })
    }
}