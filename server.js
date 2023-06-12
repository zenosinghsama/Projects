const http = require('http')

const server = http.createServer((req, res) => {
    console.log('My name is Arjun Singh')
});

server.listen(4000);