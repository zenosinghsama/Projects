const fs = require('fs');
const path = require('path');

module.exports = class Login {
    constructor(t) {
        this.title = t;
    }

    save() {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'loginInfo.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let info = [];
            if(!err) {
                info = JSON.parse(fileContent);
            }
            info.push(this);
            fs.writeFile(p, JSON.stringify(info), (err) => {
                if(err) {
                    console.log(err);
                }
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(
            path.dirname(process.mainModule.filename),
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