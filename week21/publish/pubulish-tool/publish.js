const http = require("http");
const https = require("https");
const querystring = require("querystring");
const { fstat } = require('fs');
const fs = require('fs');
var archiver = require("archiver");
const child_process = require("child_process");

// let filename = "./orangeCat.jpg";
let packname = "./package";

let redirect_uri = encodeURIComponent("http://localhost:8001/auth");
child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.d701c8e273b50c11&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`);

const server = http.createServer((request, res) => {
    console.log(request.url);
    let token = request.url.match(/token=([^&]+)/)[1];
    console.log("real publish!");

    const options = {
        host: "localhost",
        port: 8081,
        path: "/?filename=package.zip",
        method: "POST",
        headers: {
            "token": token,
            "Content-Type": "application/octet-stream"
        }
    };

    var archive =  archiver("zip", {
        zlib: { level: 9 }
    });
    archive.directory(packname, false);
 

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });


    req.on("error", (e) => {
        console.error(`problem with request: ${e.message}`)
    })

    archive.pipe(req);

    archive.on("end", () => {
        req.end();
        console.log("publish success");
        server.close();
    })
})

server.listen(8080);
// fs.stat(filename, (error, stat) => {
//     console.log(stat);
/*
    const options = {
        host: "localhost",
        port: 8081,
        path: "/?filename=package.zip",
        method: "POST",
        header: {
            "Content-Type": "application/octet-stream"
        }
    };

    var archive =  archiver("zip", {
        zlib: { level: 9 }
    });
    archive.directory(packname, false);
    // archive.pipe(fs.createWriteStream("./package.zip"));
    //
    // archive.on("end", () => {
    //     console.log("end");
    // })
    // archive.finalize();



    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });


    req.on("error", (e) => {
        console.error(`problem with request: ${e.message}`)
    })

    archive.pipe(req);

    archive.on("end", () => {
        req.end();
        let redirect_uri = encodeURIComponent("http://localhost:8001/auth");
        child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.d701c8e273b50c11&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`);
    })
    archive.finalize(); */
    // req.end();


    // Write data to request body

    // let readStream = fs.createReadStream("./orangeCat.jpg");
    // readStream.pipe(req);
    // readStream.on("end", () => {
    //     req.end();
    // })
    // req.write(postData);
    // req.end();
// })

// const postData = querystring.stringify({
//     "content": "hello world!"
// })



// ,
// "Content-Length": Buffer.byteLength(postData)




