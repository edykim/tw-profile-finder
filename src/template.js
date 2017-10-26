const path = require('path');
const fs = require('fs');
const _ = require('lodash');

class Template {
    constructor (templatePath) {
        const templateFilePath = path.resolve(templatePath, 'template.js');
        const templateFile = path.resolve(templatePath, 'template');

        if (! fs.existsSync(templateFilePath)) {
            throw new Error('Template file does not exists. ' + templateFilePath);
        }

        const template = require(templateFile);

        if (! template.base) {
            throw new Error('Template required base html. Please check the basic template.');
        }

        if (! template.content) {
            throw new Error('Template required content html. Please check the basic template.');
        }

        this.base = template.base;
        this.content = template.content;
        this.parser = template.parser || function (v) { return v };
    }

    render(data) {
        if (this.parser) {
            data = this.parser(data);
        }

        const body = _.template(this.content)({ users: data });
        return _.template(this.base)({ body: body });
    }
}

module.exports = Template;
