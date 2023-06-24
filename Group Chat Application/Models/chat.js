const fs = require('fs');
const path = require('path');

module.exports = class Message {
    constructor(t) {
        this.username = t;
    }

    save() {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'messageInfo.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let messageInfo = [];
            if(!err) {
                messageInfo = JSON.parse(fileContent);
            }
            messageInfo.push(this);
            fs.writeFile(p, JSON.stringify(messageInfo), (err) => {
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
            'messageInfo.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                cb([]);
            };
            cb(JSON.parse(fileContent));
        });
    }
};
 