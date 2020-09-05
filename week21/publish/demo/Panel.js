import {createElement, Text, Wrapper} from "./createElement.js";
import {Animation, Timeline} from "./animation";
import {ease, linear} from "./cubicBezier";
import {enableGesture} from "./gesture";


export class TabPanel {
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

    setAttribute(name) {
        // console.log(name, value);
        return this[name];
    }

    appendChild(child) {
        // this.root.appendChild(child);
        this.children.push(child);
        // child.mountTo(this.root);
    }

    select(i) {
        for (let view of this.childViews) {
            view.style.display = "none";
        }
        this.childViews[i].style.display = "";

        for (let view of this.titleViews) {
            view.style.display = "none";
        }
        this.titleViews[i].style.display = "";
        // this.titleView.innerText = this.childViews[i].children.title;
        // console.log(this.children[i].children[0]);
    }

    render() {
        this.childViews = this.children.map(child => <div style="width: 300px;min-height: 300px;">{child}</div>);
        this.titleViews = this.children.map(child => <span style="width: 300px;min-height: 300px;">{child.getAttribute("title") || ""}</    span>);

        setTimeout(() => this.select(0), 100)

        return <div class="tab- panel" style="border: 1px solid lightgreen;width: 300px;">
            <h1 style="background-color: lightgreen;margin: 0;">{this.titleViews}</h1>
            <div>
                {this.childViews}
            </div>
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