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

    after(function () {
        fs.unlinkSync(path.resolve(__dirname, 'profiles.json'));
    });
});
