// Example of finder.config.js

module.exports = {
    // Duration of next retry
    //
    // You can increase the number if you don't have a multiple credential.
    //
    // duration: 60,

    // Limit of the profiles
    //
    // limit: 1000,

    // Report template name
    //
    // template: 'basic',

    // Filter rule for the profiles
    //
    // Add some filtering rule. The document of profile is in twitter API reference.
    // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-list
    //
    filter: (profile) => {
        return profile;
    },

    // Twitter credentials
    //
    // It allows multiple credentials so that the finder keep looking further profiles.
    //
    credentials: [
        {
            consumer_key: 'consumer_key',
            consumer_secret: 'consumer_secret',
            access_token_key: 'access_token_key',
            access_token_secret: 'access_token_secret',
        },
    ]
};
