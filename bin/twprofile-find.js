#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const pkg = require('../package.json');

program.cwd = process.cwd();

program
    .version(pkg.version)
    .usage('<username>')
    .option('-l, --limit <n>', 'Fetch the profile based on this limit', 1000)
    .option('-n, --no-html-report', 'Create report without html report', false)
    .option('-v, --verbose', 'Show all request detail', false)
    .parse(process.argv);

main();

function main() {
    require('../src')(program);
}
