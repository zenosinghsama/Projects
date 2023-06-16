const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res, next) => {
    fs.readFile('message.txt', {encoding: 'utf-8'}, (err,data) => {
        if (err) {
            console.log(err);
        }
        console.log('data from file ' + data);


    res.send(`
    <body>${data}</body>
    <body>
        <form action = "/" method = "POST">
         <input type = "text" name = "chat" placeholder = "Enter Here">
          <button type = "submit">Send</button>
        </form></body> `)
    });
});

router.post('/', (req, res, next) => {
    const username = req.body.username;
    const chatMessage = req.body.chat;

    const message = `${username} : ${chatMessage}`;

    fs.appendFile('message.txt', message + '\n', (err) => {
        if(err) {
            console.log(err);
        }
        console.log('Message saved: ' + message);
        res.redirect('/');
    });
});

module.exports = router;