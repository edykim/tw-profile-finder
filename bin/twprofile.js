#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');

program.cwd = process.cwd();

program
    .version(pkg.version)
    .description('Find profile who you are interested from Twitter')
    .command('find <username>', 'Find profile from a username')
    .parse(process.argv);
