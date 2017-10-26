const _ = require('lodash');

class Finder {
    static initWith(config, client, store) {
        const f = new Finder;
        f.config = config;
        f.client = client;
        f.store = store;
        return f;
    }

    run(callback) {
        this.data = [];
        this.callback = callback || function() {};

        const username = this.config.getConfig('username', 'heyedykim');
        const duration = this.config.getConfig('duration', 1000 * 30);
        this.client.retryAfter(duration);

        this.fetch(username);
    }

    fetch(username) {
        console.log('fetch', username);
        this.client.fetchFriendProfiles(username, (error, profiles) => {
            if (error) throw error;
            this.next(profiles);
        });
    }

    next(profiles) {
        const limit = this.config.getConfig('limit', 1000);
        const filter = this.config.getConfig('filter', v => v);

        var concatenated = this.data.concat(profiles).filter(filter);
        this.data = _.uniqBy(concatenated, 'screen_name');

        console.log('current: ' + this.data.length);

        if (this.data.length >= limit || this.data.length === 0) {
            setImmediate(() => {
                this.done();
            });
            return;
        }

        const next = this.data.shift();
        const username = next.screen_name;
        this.data.push(next);

        setImmediate(() => {
            this.fetch(username);
        });
    }

    done() {
        this.save();
        console.log('Done.');
        this.callback();
    }

    save() {
        this.store.save(this.data);
    }
}

module.exports = function (config, client, store) {
    if (!config) {
        throw new Error('config required');
    }
    if (!client) {
        throw new Error('client required');
    }
    if (!store) {
        throw new Error('store required');
    }

    return Finder.initWith(config, client, store);
};

module.exports.Finder = Finder;
