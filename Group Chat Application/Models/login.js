const fs = require('fs');
const path = require('path');

module.exports = class Login {
    constructor(t) {
        this.username = t;
    }

    save() {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'loginInfo.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let loginInfo = [];
            if(!err) {
                loginInfo = JSON.parse(fileContent);
            }
            loginInfo.push(this);
            fs.writeFile(p, JSON.stringify(loginInfo), (err) => {
                if(err) {
                    console.log(err);
                }
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'loginInfo.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                cb([]);
            };
            cb(JSON.parse(fileContent));
        });
    }
};
 