const http = require("http")
const fs = require("fs")
const home = fs.readFileSync('index.html')
const about = fs.readFileSync('about.html')
const contact = fs.readFileSync('contact.html')
const services = fs.readFileSync('services.html')

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html')
    console.log(req.url);
    url = req.url;
    if (url == '/') {
        res.end(home)
    }

    else if (url == '/about') {
        res.end(about)
    }

    else if (url == '/services') {
        res.end(services)
    }

    else if (url == '/contact') {
        res.end(contact)
    }

    else {
        res.statusCode = 404;
        res.end("404 not found")
    }

})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port} `)
})