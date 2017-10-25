const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const cwd = process.cwd();
const config = require('./src/config')(cwd);

const templateName = config.getConfig('template');
const username = config.getConfig('start');

const { parser, base, content } = require(path.resolve('./templates', templateName, 'template'));
const profiles = require(path.resolve('./reports', username, 'profiles.json'));

const users = parser(profiles);
const baseTemplate = _.template(base);
const bodyTemplate = _.template(content);

const body = bodyTemplate({ users: users });
const output = baseTemplate({ body: body });

fs.writeFileSync(
    path.resolve('./reports', username, 'profiles.html'),
    output,
    'utf-8');
