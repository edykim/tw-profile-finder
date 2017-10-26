const path = require('path');

class Configuration {
    constructor(path) {
        this.path = path;
    }

    currentConfigFilePath() {
        return path.format({
            dir: this.path,
            base: 'finder.config.js'
        });
    }

    getConfig(key, defaults) {
        if (!this.isLoaded) {
            this.loadConfig();
        }

        if (key) {
            return this.config[key] || defaults || null;
        }
        return this.config || null;
    }

    setConfig(key, value) {
        if (!this.isLoaded) {
            this.loadConfig();
        }
        if (key instanceof Object) {
            this.config = key;
        } else {
            this.config[key] = value;
        }
        return this;
    }

    loadConfig() {
        if (!this.path) {
            this.config = {};
        } else {
            this.config = require(this.currentConfigFilePath());
        }
        this.isLoaded = true;
    }
}

module.exports = function (path) {
    return new Configuration(path);
};
