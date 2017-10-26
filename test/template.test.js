const chai = require('chai');
const expect = chai.expect;
chai.should();

const path = require('path');
const Template = require('./../src/template');

describe('Template', function () {
    const exampleTemplate = path.resolve(__dirname, 'fixtures', 'templates', 'example');

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

        var isTriggered = false;

        template.parser = v => {
            isTriggered = true;
            return v;
        };

        const result = template.render([{ id: 'test' }]);

        expect(result).to.be.equal("<base><body></body></base>");
        expect(isTriggered).to.be.true;
    });
});
