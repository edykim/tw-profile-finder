const chai = require('chai');
const expect = chai.expect;
chai.should();

const FinderFactory = require('./../src/Finder');
const { Finder } = require('./../src/Finder');

const Config = require('./../src/config');
const Client = require('./../src/client');
const credentials = require('./fixtures/credentials.fixture');
const MockStore = require('./fixtures/mock-store');

const {realLikeClient, worstClient} = require('./fixtures/client.fixture');

describe('Finder', function () {
    it('construct with Configuration, Client and Store', function () {
        const config = new Config();
        const client = new Client(credentials);
        const store = new MockStore();

        const finder = new FinderFactory(config, client, store);
        expect(finder).to.have.instanceof(Finder);
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

        var validate = (done) => {
            expect(store.data).to.have.lengthOf(5);
            expect(store.data).to.be.equal([
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

        finder.run(done);
    });
});
