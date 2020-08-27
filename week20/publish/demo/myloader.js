const parser = require("./parser(2)");

module.exports = function(source, map) {
    // console.log(source);
    let tree = parser.parserHTML(source);
    // console.log(tree);
    // console.log(tree.children[2].children[0].content);
    // console.log("my loader is running!!!\n", this.resourcePath);

    let template = null;
    let script = null;
    let css = null;

    for (let node of tree.children) {
        if (node.tagName === "template") {
            template = node.children.filter(e => e.type != "text")[0];
        }
        if (node.tagName === "script") {
            script = node.children[0].content;
        }
        if (node.tagName === "style") {
            css = node;
        }
    }

    console.log(template, script, css);

    let createCode = "";

    let visit =  (node) => {
        if (node.type === "text") {
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for (let attr of node.attributes) {
            attrs[attr.name] = attr.value;
        }
        let children = node.children.map(node => {
            return visit(node);
        })
        return `createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
    }

    // visit(template);

    let r = `
        import {createElement, Text, Wrapper} from "./createElement.js";
        export class Carousel {
            setAttribute(name, value) {
                this[name] = value;
            }
            render() {
                return ${visit(template)}
            }
            mountTo(parent) {
                this.render().mountTo(parent);
            }
        }
    `;
    console.log(r);
    return  r;
}