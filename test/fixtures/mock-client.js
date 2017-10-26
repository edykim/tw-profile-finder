class MockClient {
    constructor(responses) {
        this.responses = responses;
    }
    get(endpoint, param, callback) {
        var response = this.responses[endpoint];

        if (response instanceof Array) {
            response = response.shift();
        }

        callback(response.err, response.res);
    }
}

module.exports = function (responses) {
    return new MockClient(responses);
}
