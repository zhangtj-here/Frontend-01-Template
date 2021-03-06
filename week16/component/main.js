import {createElement, Text, Wrapper} from "./createElement.js";
import {Carousel} from "./Carousel";
// import {Carousel} from "./carousel.view";

/*
class MyComponent {
    constructor(config) {
        console.log(config);
        this.children = [];
        // this.root = document.createElement("div");
    }

    set class(v) {
        console.log("Parent::class", v);
    }

    set id(v) {
        console.log("Parent::id", v);
    }

    setAttribute(name, value) {
        // console.log(name, value);
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        // this.root.appendChild(child);
        this.children.push(child);
        // child.mountTo(this.root);
    }

    render() {
        return <article>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    mountTo(parent) {
        this.slot = <div></div>
        // parent.appendChild(this.root);
        for (let child of this.children) {
            // child.mountTo(this.root);
            this.slot.appendChild(child);
        }
        this.render().mountTo(parent);
    }
}*/





// let component = <div id="a" class="b" style="width: 100px;height: 100px;background: red;">
//     <div>text123</div>
//     <Div></Div>
//     <div></div>
// </div>;

let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}>
</Carousel>
component.mountTo(document.body);
// console.log(component);


// component.setAttribute("id", "b");