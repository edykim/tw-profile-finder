const fs = require('fs');

class Exporter {
    constructor(config, template, store) {
        this.config = config;
        this.template = template;
        this.store = store;
    }

    run() {
        this.export(this.store.load(), this.store.storeHtmlPath());
    }

    export(data, exportPath) {
        const output = this.template.render(data);
        fs.writeFileSync(exportPath, output, 'utf-8');
    }
}

module.exports = Exporter;
