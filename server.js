const http = require('http');
const fs = require('fs');
const url = require('url');


const PORT = 3000;

const cotentTypes = {
    js: 'application/javascript',
    map: 'application/javascript',
    json: 'application/json',
    css: 'text/css',
    html: 'text/html',
    mp3: 'audio/mpeg'
};


const isImage = path => /\.(jpe?g|png|gif)$/i.test(path);

const isSound = path => /\.(ogg|wav|mp3)$/i.test(path);

const isIndex = path => path === "/" || /index\.html$/.test(path);

const extention = path => {
    let m = path.match(/[a-z]+$/i);
    return m ? m[0] : "";
};


const readf = fileName => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const header = async path => {
    let ext = extention(path),
    type = cotentTypes[ext],
    head = {};
    
    if (!type) {
        type = isImage(path) ? 'image/' :
        isSound(path) ? 'audio/' : '';

        type += ext;
    }

    head['Content-Type'] = type;

    return head;
};


const server = http.createServer((req, res) => {

    let path = url.parse(req.url);
    path = isIndex(path.pathname) ? "./index.html" : `.${path.pathname}`;

    Promise.all([
        header(path),
        readf(path)
    ]).then(([ head, fileData ]) => {

        res.writeHead(200, head);

        res.end(fileData, 'binary', () => {
            console.log(`\x1b[32m[GET]\x1b[0m ${path}`);
        });
    }).catch(() => {
        res.writeHead(404).end(() => {
            console.log(`\x1b[31m[ERR]\x1b[0m ${path}`);
        });
    });

});


server.listen(PORT, () => {
    console.log(
        "\n\x1b[33m" +
        "\tNOTICE: This server's intended " +
        "purpose is for offline development.\n" +
        "\tPlease use \x1b[36mlite-server" +
        "\x1b[33m instead.\x1b[0m\n" +
        `\n> listening on \x1b[4mhttp://localhost:${PORT}/\x1b[0m\n`
    );
});
