const chai = require('chai');
const expect = chai.expect;
chai.should();

const fs = require('fs');
const path = require('path');
const Store = require('./../src/store');

describe('Store', function () {
    it('construct with the path', function () {
        const path = __dirname;
        const store = new Store(path);
        expect(store).to.have.instanceof(Store);
    });

    it('saves data as json', function () {
        const storePath = __dirname;
        const store = new Store(storePath);
        store.save([1, 2, 3]);
        const profiles = require(path.resolve(storePath, 'profiles.json'));
        expect(profiles).to.be.deep.equal([1, 2, 3]);
    });

    it('returns store path', function () {
        const store = new Store('hello');
        const storePath = store.storePath();

        expect(storePath).to.be.equal(path.resolve(__dirname, '..', 'hello/profiles.json'));
    });

    it('returns store html path', function () {
        const store = new Store('hello');
        const storeHtmlPath = store.storeHtmlPath();

        expect(storeHtmlPath).to.be.equal(path.resolve(__dirname, '..', 'hello/profiles.html'));
    });

    it('loads store data as a json object', function () {
        const storePath = path.resolve(__dirname, 'fixtures');
        const store = new Store(storePath);

        const profiles = require(path.resolve(__dirname, 'fixtures', 'profiles.json'));
        const loaded = store.load();

        expect(loaded).to.be.deep.equal(profiles);
    });

    after(function () {
        fs.unlinkSync(path.resolve(__dirname, 'profiles.json'));
    });
});
