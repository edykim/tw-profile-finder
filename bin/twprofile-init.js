#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');

const cwd = process.cwd();

const examplePath = path.resolve(__dirname, '..', 'finder.config.example.js');
const targetPath = path.resolve(cwd, 'finder.config.js');

if (fs.existsSync(targetPath)) {
    console.log('finder.config.js already exists. Please check the file.');
    return;
}

fs.createReadStream(examplePath).pipe(fs.createWriteStream(targetPath));
console.log('find.config.js created. Please update the configuration.');
