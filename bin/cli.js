#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const pkg = require('../package.json');

program.cwd = process.cwd();

program
    .version(pkg.version)
    .usage('<screen_name>')
    .parse(process.argv);

main();

function main() {
    require('../src')(program);
}
