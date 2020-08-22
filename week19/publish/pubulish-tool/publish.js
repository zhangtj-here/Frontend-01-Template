const http = require("http");
const querystring = require("querystring");
const { fstat } = require('fs');
const fs = require('fs');
var archiver = require("archiver");

// let filename = "./orangeCat.jpg";
let packname = "./package";

// fs.stat(filename, (error, stat) => {
//     console.log(stat);

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
    })
    archive.finalize();
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




