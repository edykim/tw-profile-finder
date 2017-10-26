const chai = require('chai');
const expect = chai.expect;
chai.should();

const Client = require('./../src/client');
const Twitter = require('twitter');
const path = require('path');
const credentials = require('./fixtures/credentials.fixture');
const {successClient, worstClient, changedClient, nextCursorClient} = require('./fixtures/client.fixture');

describe('Client', function () {
    it('creates with credentials', function () {
        var client = Client(credentials);
        expect(client.clients).to.have.lengthOf(4);
        expect(client.clients[0]).to.be.an.instanceof(Twitter);
    });

    it('throws error when creating without crednetial', function () {
        var clientFnNoneArgs = function () { Client() };
        var clientFnEmptyArr = function () { Client([]) };

        expect(clientFnNoneArgs).to.throw('credentials must be an array.');
        expect(clientFnEmptyArr).to.throw('credentials are empty.');
    });

    it('is able to set the retry duration', function () {
        var client = Client(credentials);
        var defaults = client.getRetryAfter();
        client.retryAfter(10);
        var changed = client.getRetryAfter();

        expect(defaults).to.be.equal(1000);
        expect(changed).to.be.equal(10);
    })

    it('fetch friend list', function (done) {
        var client = Client(credentials);
        client.clients = [successClient];

        client.fetchFriendProfiles('username', function(error, profiles) {
            expect(profiles).to.have.lengthOf(1);
            done();
        });
    });

    it('fetch friend list with next cursor', function (done) {
        var client = Client(credentials);
        client.clients = [nextCursorClient];

        client.fetchFriendProfiles('username', function(error, profiles) {
            expect(profiles).to.have.lengthOf(2);
            done();
        });
    });

    it('raises the error if the API response changed', function (done) {
        var client = Client(credentials);
        client.clients = [changedClient];

        client.fetchFriendProfiles('username', function(error, profiles) {
            expect(error).to.be.not.null;
            expect(error.message).to.be.equal('The server returns unexpected response. Please check the latest version of the application.');
            done();
        });
    });

    it('fetch friend list with a failure client', function (done) {
        var client = Client(credentials);
        client.retryAfter(1);
        client.clients = [worstClient, worstClient, worstClient, successClient];

        client.fetchFriendProfiles('username', function(error, profiles) {
            expect(profiles).to.have.lengthOf(1);
            expect(client.current).to.be.equal(successClient);
            done();
        });
    });
});
