import {createElement, Text, Wrapper} from "./createElement.js";
import {Animation, Timeline} from "./animation";
import {ease, linear} from "./cubicBezier";
import {enableGesture} from "./gesture";


export class ListView {
    constructor(config) {
        // this.root = document.createElement("div");
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.position = 0;
        this.state = Object.create(null);
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

    getAttribute(name) {
        // console.log(name, value);
        return this[name];
    }

    appendChild(child) {
        // this.root.appendChild(child);
        this.children.push(child);
        // child.mountTo(this.root);
    }



    render() {
        let data = this.getAttribute("data");
        return <div class="list-view" style="width: 300px;">
            {
                data.map(this.children[0])
            }
        </div>
    }

    mountTo(parent) {
        // for (let child of this.children) {
        //     // child.mountTo(this.root);
        //     this.slot.appendChild(child);
        // }
        let div = this.render();
        div.mountTo(parent);

    }
}