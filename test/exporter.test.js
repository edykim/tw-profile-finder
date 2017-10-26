const chai = require('chai');
const expect = chai.expect;
chai.should();

const path = require('path');
const fs = require('fs');
const Exporter = require('./../src/exporter');
const Template = require('./../src/template');

describe('Exporter', function () {
    const exampleTemplate = path.resolve(__dirname, 'fixtures', 'templates', 'example');
    const testPath = path.resolve(__dirname, 'example.html');

    it('constructs wiht config, template, and store', function () {
        const exporter = new Exporter({}, {}, {});
        expect(exporter).to.be.instanceof(Exporter);
    });

    it('runs export task', function () {
        const exporter = new Exporter({}, {}, {
            load: () => [],
            storeHtmlPath: () => 'example',
        });

        var isExported = false;

        exporter.export = function(data, htmlPath) {
            isExported = true;
        };

        exporter.run();

        expect(isExported).to.be.true;
    });

    it('exports report to export path', function () {
        const template = new Template(exampleTemplate);
        const exporter = new Exporter({}, template);

        exporter.export([{id: 'name'}], testPath);
        const data = fs.readFileSync(testPath, 'utf-8');
        expect(data).to.be.equal('<base><body></body></base>');
    });

    after(function () {
        fs.unlinkSync(path.resolve(testPath));
    });
});
