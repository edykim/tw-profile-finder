const path = require('path');
const fs = require('fs');

const Finder = require('./finder');
const Client = require('./client');
const Store = require('./store');

const cwd = process.cwd();

const config = require('./config')(cwd);
const creds = config.getConfig('credentials', []);

const client = new Client(creds);
const basePath = path.resolve(cwd, 'reports');
const storePath = path.resolve(basePath, config.getConfig('start'));

try {
    fs.mkdirSync(basePath);
} catch (e) {}

try {
    fs.mkdirSync(storePath);
} catch (e) {}

const store = new Store(storePath);

(new Finder(config, client, store)).run();
