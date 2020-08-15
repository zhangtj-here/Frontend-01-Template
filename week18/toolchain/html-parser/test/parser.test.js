import {parseHTML} from "../src/parser";
let assert = require("assert");

it("parse a single element", () => {
    let document = parseHTML("<div></div>");
    let div = document.children[0];
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, "element");
    assert.equal(div.attributes.length, 2);
    // console.log(div);
})

it("parse a single element with text content", () => {
    let document = parseHTML("<div>hello</div>");
    let text = document.children[0].children[0];
    assert.equal(text.content, "hello");
    assert.equal(text.type, "text");
    // console.log(text);
})

it("tag mismatch", () => {
    try {
        let document = parseHTML("<div></vid>");
    } catch(e) {
        assert.equal(e.message, "Tag start end doesn't match!");
        // console.log(e);
    }

    // let text = document.children[0].children[0];
    // assert.equal(text.content, "hello");
    // assert.equal(text.type, "text");
    // console.log(text);
})

it("text with <", () => {
    let document = parseHTML("<div>a < b</div>"   );
    let text = document.children[0].children[0];
    assert.equal(text.content, "a < b");
    assert.equal(text.type, "text");
    // console.log(text);
})

it("with property", () => {
    let document = parseHTML("<div id=a class='cls' data=\"abc\" ></div>");
    let div = document.children[0];
    // console.log(document);

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);
    // assert.equal(text.content, "a < b");
    // assert.equal(text.type, "text");
    // console.log(text);
})

it("with property 2", () => {
    let document = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
    let div = document.children[0];
    // console.log(document);

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);
})


it("with property 3", () => {
    let document = parseHTML("<div id=a class='cls' data=\"abc\"/>");
    let div = document.children[0];
    // console.log(document);

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);
})

it("script", () => {
    let content = `
        <div>abc</div>
        <span>x</span>
        /script>
        <script
        <
        </
        </s
        </sc
        </scr
        </scri
        </scrip
        </script
    `;
    let document = parseHTML(`<script >${content}</script>`);

    let text = document.children[0].children[0];
    // console.log(text)；

    assert.equal(text.content, content);
    assert.equal(text.type, "text");
})

it("attribute with no value", () => {
    let document = parseHTML("<div class />");
    let div = document.children[0];
    // console.log(document);

    let count = 0;

    // for (let attr of div.attributes) {
    //     if (attr.name === "id") {
    //         count++;
    //         assert.equal(attr.value, "a");
    //     }
    //     if (attr.name === "class") {
    //         count++;
    //         assert.equal(attr.value, "cls");
    //     }
    //     if (attr.name === "data") {
    //         count++;
    //         assert.equal(attr.value, "abc");
    //     }
    // }
    // assert.ok(count === 3);
})

it("attribute with no value2", () => {
    let document = parseHTML("<div class id/>");
    let div = document.children[0];
    // console.log(document);

    let count = 0;

    // for (let attr of div.attributes) {
    //     if (attr.name === "id") {
    //         count++;
    //         assert.equal(attr.value, "a");
    //     }
    //     if (attr.name === "class") {
    //         count++;
    //         assert.equal(attr.value, "cls");
    //     }
    //     if (attr.name === "data") {
    //         count++;
    //         assert.equal(attr.value, "abc");
    //     }
    // }
    // assert.ok(count === 3);
})


it("big case and tag", () => {
    let document = parseHTML("<DIV/>");
})

it("with attribute", () => {
    let document = parseHTML("<div id= 123></div>");
})
