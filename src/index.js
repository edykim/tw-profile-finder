const Finder = require('./finder');
const Client = require('./client');
const Store = require('./store');

const cwd = process.cwd();

const config = require('./config')(cwd);
const creds = config.getConfig('credentials', []);

const client = new Client(creds);
const store = new Store(cwd);

(new Finder(config, client, store)).run();
