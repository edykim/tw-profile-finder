const Finder = require('./finder');
const Client = require('./client');

const config = require('./config')(process.cwd());
const creds = config.getConfig('credentials', []);
const client = new Client(creds);

(new Finder(config, client)).run();
