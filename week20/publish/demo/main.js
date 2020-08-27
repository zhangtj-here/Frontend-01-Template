import {createElement, Text, Wrapper} from "./createElement.js";
// import {Carousel} from "./Carousel";
// import {TabPanel} from "./TabPanel";
// import {ListView} from "./ListView";
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

// let component = <Carousel data={[
//     "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//     "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//     "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//     "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
// ]}>
// </Carousel>

// let panel = <TabPanel title="this is my panel">
//     <span title="title1">this is content1</span>
//     <span title="title2">this is content2</span>
//     <span title="title3">this is content3</span>
//     <span title="title4">this is content4</span>
// </TabPanel>


let data = [
    {title: "蓝猫", url: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
    {title: "橘白猫", url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
    {title: "梨花猫", url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
    {title: "橘猫", url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"}
]

// let list = <ListView data={data}>
//     {record => <figure>
//         <img src={record.url} alt=""/>
//         <figcaption>{record.title}</figcaption>
//     </figure>}
// </ListView>

let element = <div>
    <span>hello world</span>
</div>
element.mountTo(document.body);
// panel.mountTo(document.body);

// list.mountTo(document.body);
// window.panel = panel;
// console.log(component);


// component.setAttribute("id", "b");