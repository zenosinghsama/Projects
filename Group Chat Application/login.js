const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send(`
    <form action = "/login" method = "POST">
    <input type = "text" name = "username" placeholder = "Enter Username">
    <button type = "submit"> Login </button>
    </form>`);
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    
    fs.writeFile('username.txt', username, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.send(`
    <script>
        localStorage.setItem('username', '${username}');
        window.location.href = '/';
    </script>
    `);
        }
    });
});

module.exports = router;