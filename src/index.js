const path = require('path');
const fs = require('fs');

const Finder = require('./finder');
const Client = require('./client');
const Store = require('./store');
const Exporter = require('./exporter');
const Template = require('./template');

function main(program) {
    const cwd = program.cwd;

    const config = require('./config')(cwd);
    const basePath = path.resolve(cwd, 'reports');
    const storePath = path.resolve(basePath, config.getConfig('start'));
    const templatePath = path.resolve(__dirname, '..', 'templates', 'basic');

    createDirectory(basePath, storePath);

    const client = createClient(config);
    const store = createStore(storePath);
    const template = createTemplate(templatePath);

    (new Finder(config, client, store)).run(function () {
        (new Exporter(config, template, store)).run();
    });
}

function createDirectory(basePath, storePath) {
    try {
        fs.mkdirSync(basePath);
    } catch (e) {}

    try {
        fs.mkdirSync(storePath);
    } catch (e) {}
}

function createClient(config) {
    const creds = config.getConfig('credentials', []);
    return new Client(creds);
}

function createStore(storePath) {
    return new Store(storePath);
}

function createTemplate(templatePath) {
    return new Template(templatePath);
}

module.exports = function(program) {
    return main(program);
};
