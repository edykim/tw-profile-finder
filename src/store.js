const fs = require('fs');
const path = require('path');

class Store {
    constructor (path) {
        this.path = path;
    }

    save(data) {
        return fs.writeFileSync(
            this.storePath(),
            JSON.stringify(data, null, 2),
            'utf-8');
    }

    load() {
        return require(this.storePath());
    }

    storePath() {
        return path.resolve(this.path, 'profiles.json');
    }

    storeHtmlPath() {
        return path.resolve(this.path, 'profiles.html');
    }
}

module.exports = Store;
