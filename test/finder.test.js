const chai = require('chai');
const expect = chai.expect;
chai.should();

const FinderFactory = require('./../src/Finder');
const { Finder } = require('./../src/Finder');

const Config = require('./../src/config');
const Client = require('./../src/client');
const credentials = require('./fixtures/credentials.fixture');
const MockStore = require('./fixtures/mock-store');

const {successClient, realLikeClient, changedClient, worstClient, emptyUserClient, pretendNextUserClient} = require('./fixtures/client.fixture');

describe('Finder', function () {
    it('construct with Configuration, Client and Store', function () {
        const config = new Config();
        const client = new Client(credentials);
        const store = new MockStore();

        const finder = new FinderFactory(config, client, store);
        expect(finder).to.have.instanceof(Finder);
    });

    it('raises errors if arguments are missing when constructing the instance', function () {
        const config = new Config();
        const client = new Client(credentials);
        const store = new MockStore();

        const failConfig = () => new FinderFactory();
        const failClient = () => new FinderFactory(config);
        const failStore = () => new FinderFactory(config, client);
        
        expect(failConfig).to.be.throw('config required');
        expect(failClient).to.be.throw('client required');
        expect(failStore).to.be.throw('store required');
    });

    it('saves fetched data via store', function () {
        const config = new Config();
        const client = new Client(credentials);
        const store = new MockStore();

        const finder = new FinderFactory(config, client, store);
        finder.data = ['mocked_data'];
        finder.save();

        expect(store.data).to.be.equal(finder.data);
    });

    it('executes and fetch all data', function(done) {
        const config = new Config();
        config.config = {
            limit: 5,
            duration: 1,
        };

        const client = new Client(credentials);
        client.clients = [worstClient, realLikeClient];

        const store = new MockStore();
        const finder = new FinderFactory(config, client, store);

        var validate = () => {
            expect(store.data).to.have.lengthOf(5);
            expect(store.data).to.be.deep.equal([
                {
                    name: 'hello0',
                    screen_name: 'hello0',
                    description: 'mock user',
                },
                {
                    name: 'hello1',
                    screen_name: 'hello1',
                    description: 'mock user',
                },
                {
                    name: 'hello2',
                    screen_name: 'hello2',
                    description: 'mock user',
                },
                {
                    name: 'hello3',
                    screen_name: 'hello3',
                    description: 'mock user',
                },
                {
                    name: 'hello4',
                    screen_name: 'hello4',
                    description: 'mock user',
                }
            ]);
            done();
        };

        finder.run(validate);
    });

    it('has empty function fallback for callback', function() {
        const config = new Config();
        config.config = {
            limit: 5,
            duration: 1,
        };

        const client = new Client(credentials);
        client.clients = [realLikeClient];

        const store = new MockStore();
        const finder = new FinderFactory(config, client, store);

        const undefinededCallback = finder.callback;
        finder.run();

        expect(undefinededCallback).to.be.undefined;
        expect(finder.callback).to.be.instanceof(Function);
    });

    it('executes and fetch all data even no users returned', function () {
        const config = new Config();
        config.config = {
            limit: 5,
            duration: 1,
        };

        const client = new Client(credentials);
        client.clients = [emptyUserClient];

        const store = new MockStore();
        const finder = new FinderFactory(config, client, store);

        var validate = () => {
            expect(store.data).to.have.lengthOf(0);
            expect(store.data).to.be.deep.equal([]);
            done();
        };

        finder.run(validate);
    });

    it('fetch all data over the limit via next user', function () {
        const config = new Config();
        config.config = {
            limit: 5,
            duration: 1,
        };

        const client = new Client(credentials);
        client.clients = [pretendNextUserClient];

        const store = new MockStore();
        const finder = new FinderFactory(config, client, store);

        var validate = () => {
            expect(store.data).to.have.lengthOf(6);
            done();
        };

        finder.run(validate);
    });

    it('raises error when client returns error', function () {
        const config = new Config();
        config.config = {
            limit: 5,
            duration: 1,
        };

        const client = new Client(credentials);
        client.clients = [changedClient];

        const store = new MockStore();
        const finder = new FinderFactory(config, client, store);

        const expectedError = () => {
            finder.fetch('username');
        };

        expect(expectedError).to.be.throw('The server returns unexpected response. Please check the latest version of the application.');
    });
});
