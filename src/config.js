const path = require('path');

class Configuration {
    constructor(path) {
        path = path || process.cwd();
        this.path = path;
    }

    currentConfigFilePath() {
        return path.format({
            dir: this.path,
            base: 'finder.config.js'
        });
    }

    getConfig(key, defaults) {
        this.config = this.config || require(this.currentConfigFilePath());
        if (key) {
            return this.config[key] || defaults || null;
        }
        return this.config || null;
    }
}

module.exports = function (path) {
    return new Configuration(path);
};
