// var add = require("../src/add").add;
// var assert = require("assert");
// var test = require("ava");
import {add} from "../src/add.js";
// import test from "ava";

import assert from "assert";

// describe('Array', function() {
//     describe('#indexOf()', function() {
//         it('should return -1 when the value is not present', function() {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         })
//     })
// })

describe('add', function() {
    it('add(3, 4) should be 7', function() {
        assert.equal(add(3, 4), 7);
    })
})

// test("add", t => {
//     if (add(3, 4) === 7)
//         t.pass();
// })