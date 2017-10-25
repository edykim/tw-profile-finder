// Example of finder.config.js

module.exports = {
    // Start username
    start: 'haruair',

    // filter rule for the profiles
    filter: (profile) => {
        return profile;
    },

    // Twitter credentials
    credentials: [
        {
            consumer_key: 'consumer_key',
            consumer_secret: 'consumer_secret',
            access_token_key: 'access_token_key',
            access_token_secret: 'access_token_secret',
        },
    ]
};
