const http = require('http')

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers)
    const url = req.url;
    if(url === '/home') {
        res.write('<html>');
        res.write('<head><title>Welcome to my NodeJs Project</head></title>');
        res.write('<body><h1>Welcome Home</h1></body>');
        res.write('</html>');
        return res.end();
    } else if(url === '/about') {
        res.write('<html>');
        res.write('<head><title>Welcome to my NodeJs Project</head></title>');
        res.write('<body><h1>Welcome to About Us</h1></body>');
        res.write('</html>');
        return res.end();
    } else if(url === '/node') {
        res.write('<html>');
        res.write('<head><title>Welcome to my NodeJs Project</head></title>');
        res.write('<body><h1>Welcome to my Node Js Project</h1></body>');
        res.write('</html>');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome to my NodeJs Project</head></title>');
    res.write('<body><h1>Welcome to Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(4000);