const compiler = require("@vue/compiler-sfc");

// compiler.compileTemplate("<div>Hello world!</div>");

let source = "<div>Hello world!</div>";

let result = compiler.compileTemplate({ filename: 'example.vue', source });
console.log(result);
