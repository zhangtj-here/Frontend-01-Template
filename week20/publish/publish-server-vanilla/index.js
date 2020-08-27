const http = require("http");
const https = require("https");
const fs = require("fs");
const unzip = require("unzipper");


const server = http.createServer((req, res) => {

    if (req.url.match(/^\/auth/)) {
        return auth(req, res);
    }

    if (!req.url.match(/^\/?/)) {
        res.writeHead(404, {
            'Content-Type': "text/plain"
        });
        res.end("not found");
        return;
    }
    // console.log(req);
    // let matched = req.url.match(/filename=([^&]+)/);
    // let filename = matched && matched[1];
    // if (!filename)
    //     return;
    // console.log(filename);

    // let writeStream = fs.createWriteStream("../server/public/" + filename);

    console.log(req.headers.token);
    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/user`,
        method: 'GET',
        headers: {
            Authorization: "token  " + req.headers.token,
            "User-Agent": "toy-publish-server"
        }
    };

    const request = https.request(options, (response) => {
        let body = "";
        response.on('data', (d) => { 
            // let result = d.toString(); 
            // console.log(result);
            body += d.toString();
        })
        response.on("end", () => {
            console.log(body);
            let user = JSON.parse(body);
            console.log(user);
            // 权限检查

            

            let writeStream = unzip.Extract({ path: "../server/public/" });
            // let writeStream = fs.createWriteStream("../server/packages/package");
            req.pipe(writeStream);

            // console.log(req.url);
            

            // req.on('data', trunk => {
            //     writeStream.write(trunk);
            // })

            // req.on('end', trunk => {
            //     writeStream.end(trunk);
            // })

            req.on('end', () => {
                res.writeHead(200, { 'Content-Typpe': "text/plain"});
                res.end("okay");
            })
            

        })
    });


    request.on('error', (e) => {
        console.error(e);
    });
    request.end();  



    /*

    let writeStream = unzip.Extract({ path: "../server/public/" });
    // let writeStream = fs.createWriteStream("../server/packages/package");
    req.pipe(writeStream);

    // console.log(req.url);
    

    // req.on('data', trunk => {
    //     writeStream.write(trunk);
    // })

    // req.on('end', trunk => {
    //     writeStream.end(trunk);
    // })

    req.on('end', () => {
        res.writeHead(200, { 'Content-Typpe': "text/plain"});
        res.end("okay");
    })
    */
})

function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];
    // let code = "16a10e368013bd3cdc2f";
    // let code = "86f228fc068f11b20f5e";
    // console.log(code); 
    let state = "abc123";
    let client_secret = "1c18e58ebb59798ccfb7b65756f85cfe6e350437";
    let client_id = "Iv1.d701c8e273b50c11";
    let redirect_uri = encodeURIComponent("http://localhost:8081/auth");
    
    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    let url = `https://github.com/login/oauth/access_token?${params}`;

    const options = {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?${params}`,
        method: 'POST'
    };

    const request = https.request(options, (response) => {
        // console.log(response.statusCode);

        response.on('data', (d) => {    
            let result = d.toString().match(/access_token=([^&]+)/);
            if (result) {
                let token = result[1];
                // process.stdout.write(d.toString());
                res.writeHead(200, {
                    'access_token': token,
                    'Content-Type': "text/html"
                });
                res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
            } else {
                res.writeHead(200, {
                    'Content-Type': "text/plain"
                });
                res.end("okayhaha");
            }
        });
    })


    
    request.on('error', (e) => {
      console.error(e);
    });
    request.end();  

    // let xhr =  new XMLHttpRequest;
    
    // xhr.open("POST", url, true);
    // xhr.send(null);
    
    // xhr.addEventListener("readystatechange", function(event) {
    //     if (xhr.readyState === 4) {
    //       console.log(xhr.responseText);
    //     }
    // })
    // res.writeHead(200, { 'Content-Typpe': "text/plain"});
    // res.end("okay");
}

server.listen(8081);