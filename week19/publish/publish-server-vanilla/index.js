const http = require("http");
const fs = require("fs");
const unzip = require("unzipper");


const server = http.createServer((req, res) => {
    // console.log(req);
    // let matched = req.url.match(/filename=([^&]+)/);
    // let filename = matched && matched[1];
    // if (!filename)
    //     return;
    // console.log(filename);

    // let writeStream = fs.createWriteStream("../server/public/" + filename);

    let writeStream = unzip.Extract({ path: "../server/public/" });
    // let writeStream = fs.createWriteStream("../server/packages/package");
    req.pipe(writeStream);

    req.on('end', () => {
        res.writeHead(200, { 'Content-Typpe': "text/plain"});
        res.end("okay");
    })
})

server.listen(8081);