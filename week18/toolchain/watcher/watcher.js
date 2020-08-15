// const fsevents = require("fsevents");
//
// const stop = fsevents.watch(__dirname, (path, flags, id) => {
//     const info = fsevents.getInfo(path, flags, id);
//     stop();
// });

const fsevents = require('fsevents');

const webpack = require("webpack");
const httpServer = require("http-server");



const stop = fsevents.watch(__dirname, (path, flags, id) => {
    const info = fsevents.getInfo(path, flags, id);
    console.log(info);
    stop(); // To end observation
}); // To start observation
