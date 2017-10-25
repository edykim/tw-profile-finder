/**
 * Basic template
 */

const fs = require('fs');
const path = require('path');

const base = fs.readFileSync(path.resolve(__dirname, 'base.html'), { encoding: 'utf-8' });
const content = fs.readFileSync(path.resolve(__dirname, 'content.html'), { encoding: 'utf-8' });

function Parser(data) {
    return data.map(v => {
        const url = v.entities.url && v.entities.url.urls.length > 0 ? v.entities.url.urls[0].expanded_url : null;

        if (url === null) return null;

        return {
            image: v.profile_image_url_https,
            name: v.name,
            screen_name: v.screen_name,
            url: url,
            description: v.description,
            bg_color: v.profile_background_color,
        }
    })
    .filter(v => v !== null);
}

module.exports = {
    parser: Parser,
    base: base,
    content: content,
};
