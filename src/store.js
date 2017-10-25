const fs = require('fs');
const path = require('path');

class Store {
    constructor (path) {
        this.path = path;
    }

    save(data) {
        return fs.writeFileSync(
            path.resolve(this.path, 'profiles.json'),
            JSON.stringify(data, null, 2),
            'utf-8');
    }
}

module.exports = Store;
