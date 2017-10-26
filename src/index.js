const path = require('path');
const fs = require('fs');

const Finder = require('./finder');
const Client = require('./client');
const Store = require('./store');
const Exporter = require('./exporter');
const Template = require('./template');

function main(program) {
    if (!program.args[0]) {
        return program.help();
    }

    const username = program.args[0];

    const cwd = program.cwd;
    const config = require('./config')(cwd);

    config.setConfig('username', username);

    const basePath = path.resolve(cwd, 'reports');
    const storePath = path.resolve(basePath, config.getConfig('username'));
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
