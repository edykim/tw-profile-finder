const chai = require('chai');
const expect = chai.expect;
chai.should();

const path = require('path');
const Template = require('./../src/template');

describe('Template', function () {
    const exampleTemplate = path.resolve(__dirname, 'fixtures', 'templates', 'example');
    const withoutParserTemplate = path.resolve(__dirname, 'fixtures', 'templates', 'withoutParser');

    const templateEmptyBase = path.resolve(__dirname, 'fixtures', 'templates', 'emptyBase');
    const templateEmptyContent = path.resolve(__dirname, 'fixtures', 'templates', 'emptyContent');

    it('raises the error if the path is invalid', function () {
        const createTemplateWithEmptyPath = () => {
            const template = new Template();
        };
        const createTemplateWithIncorrectPath = () => {
            const template = new Template(__dirname);
        };
        expect(createTemplateWithEmptyPath).to.throw();
        expect(createTemplateWithIncorrectPath).to.throw();
    });

    it('constructs with a path', function () {
        const template = new Template(exampleTemplate);
        expect(template).to.be.instanceof(Template);
    });

    it('returns rendered html', function () {
        const template = new Template(exampleTemplate);
        const noParserTemplate = new Template(withoutParserTemplate);
        
        var isTriggered = false;

        template.parser = v => {
            isTriggered = true;
            return v;
        };

        const result = template.render([{ id: 'test' }]);
        const noParserResult = noParserTemplate.render([{ id: 'test' }]);

        expect(result).to.be.equal("<base><body></body></base>");
        expect(noParserResult).to.be.equal("<base><body></body></base>");
        expect(isTriggered).to.be.true;
    });

    it('raises the error if the required property does not provide', function () {
        const createTemplateWithEmptyBase = () => {
            const template = new Template(templateEmptyBase);
        };
        const createTemplateWithEmptyContent = () => {
            const template = new Template(templateEmptyContent);
        };
        expect(createTemplateWithEmptyBase).to.throw();
        expect(createTemplateWithEmptyContent).to.throw();
    });
});
