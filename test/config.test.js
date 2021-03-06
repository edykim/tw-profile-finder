const chai = require('chai');
const expect = chai.expect;
chai.should();

const Config = require('./../src/config');
const path = require('path');

describe('Configuration', function () {
    it('constructs with a current path if the init path is not passed', function () {
        var conf = Config();
        expect(conf.path).to.be.undefined;
    });

    it('constructs with a given path', function () {
        var conf = Config('/path/to/some/where');
        conf.path.should.be.equal('/path/to/some/where');
    });

    it('returns current config file path', function () {
        var config = Config('/path/to/some/where');
        var path = config.currentConfigFilePath();
        path.should.be.equal('/path/to/some/where/finder.config.js');
    });

    it('returns config', function () {
        var configPath = path.resolve(__dirname, 'fixtures');
        var config = Config(configPath);
        var conf = config.getConfig();

        conf.should.be.deep.equal({
            credential: {
                access_token: 'test_token',
            }
        });
    });

    it('sets config', function () {
        var configPath = path.resolve(__dirname, 'fixtures');
        var config = Config(configPath);
        config.setConfig('name', 'koala');

        var conf = config.getConfig();

        conf.should.be.deep.equal({
            name: 'koala',
            credential: {
                access_token: 'test_token',
            }
        }); 
    });

    it('sets config after config loaded', function () {
        var configPath = path.resolve(__dirname, 'fixtures');
        var config = Config(configPath);
        config.loadConfig();
        config.setConfig('name', 'koala');

        var conf = config.getConfig();

        conf.should.be.deep.equal({
            name: 'koala',
            credential: {
                access_token: 'test_token',
            }
        }); 
    });

    it('raise a error if config does not exists', function () {
        const throwNonExistsConfig = () => {
            var configPath = path.resolve(__dirname, 'random');
            var config = Config(configPath);
            var conf = config.getConfig();
        };

        expect(throwNonExistsConfig).to.be.throw();
    });

    it('returns null if config file return empty', function () {
        var configPath = path.resolve(__dirname, 'fixtures', 'empty');
        var config = Config(configPath);
        var conf = config.getConfig();

        expect(conf).to.be.null;
    });

    it('returns config with a key otherwise returns default', function () {
        var configPath = path.resolve(__dirname, 'fixtures');
        var config = Config(configPath);

        var credential = config.getConfig('credential');

        var shouldBeDefault = config.getConfig('not_exists_config', 'default_value');
        var shouldBeEmpty = config.getConfig('not_exists_config_2');

        credential.should.be.deep.equal({
            access_token: 'test_token',
        });
        shouldBeDefault.should.be.equal('default_value');
        expect(shouldBeEmpty).to.be.null;
    });
});
