const MockClient = require('./mock-client');

const successClient = MockClient({
    'friends/list': {
        res: {
            users: [
                {
                    name: 'hello',
                    screen_name: 'hello',
                    description: 'mock user',
                }
            ]
        }
    }
});

const worstClient = MockClient({
    'friends/list': {
        res: {
            errors: ['Hit the limit.']
        }
    }
});

const realLikeClient = MockClient({
    'friends/list': {
        res: {
            users: [
                {
                    name: 'hello0',
                    screen_name: 'hello0',
                    description: 'mock user',
                },
                {
                    name: 'hello1',
                    screen_name: 'hello1',
                    description: 'mock user',
                },
                {
                    name: 'hello2',
                    screen_name: 'hello2',
                    description: 'mock user',
                },
                {
                    name: 'hello3',
                    screen_name: 'hello3',
                    description: 'mock user',
                },
                {
                    name: 'hello4',
                    screen_name: 'hello4',
                    description: 'mock user',
                }
            ]
        }
    }
});

module.exports = {
    successClient,
    worstClient,
    realLikeClient,
};
