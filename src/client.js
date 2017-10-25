const Twitter = require('twitter');

class Client {
    constructor (credentials) {
        if (credentials instanceof Array === false) {
            throw new Error('credentials must be an array.');
        }

        if (credentials.length === 0) {
            throw new Error('credentials are empty.');
        }

        this.clients = credentials.map(c => new Twitter(c));
    }

    nextCredential() {
        var client = this.clients.shift();
        this.current = client;
        this.clients.push(client);
    }

    retryAfter(sec) {
        this.timeout = sec;
        return this;
    }

    getRetryAfter() {
        return this.timeout || 1000;
    }

    fetchFriendProfiles(username, callback, data, cursor) {
        this.current = this.current || this.clients[0];
        data = data || [];
        cursor = cursor || -1;

        this.current.get('friends/list', {
            screen_name: username,
            count: 200,
            cursor: cursor,
        },
        (err, res) => {
            if (res.errors) {
                setTimeout(() => {
                    this.nextCredential();
                    this.fetchFriendProfiles(username, callback, data, cursor);
                }, this.getRetryAfter());
                return;
            }
            else if (res.users) {
                data = data.concat(res.users);
            }

            if (res.next_cursor) {
                setImmediate(() => {
                    this.fetchFriendProfiles(username, callback, data, res.next_cursor);
                });
            } else {
                callback(data);
            }
        })
    }
}

module.exports = function (credentials) {
    return new Client(credentials);
};
