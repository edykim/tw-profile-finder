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

const changedClient = MockClient({
    'friends/list': {
        res: {
            changed_users: [
                {
                    name: 'hello',
                    screen_name: 'hello',
                    description: 'mock user',
                }
            ]
        }
    }
});

const notAuthorizedClient = MockClient({
    'friends/list': {
        res: { request: '/1.1/friends/list.json', error: 'Not authorized.' }
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


const emptyUserClient = MockClient({
    'friends/list': {
        res: {
            users: []
        }
    }
});

const pretendNextUserClient = MockClient({
    'friends/list': [
        {
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
                ]
            }
        },
        {
            res: {
                users: [
                    {
                        name: 'bye0',
                        screen_name: 'bye0',
                        description: 'mock user',
                    },
                    {
                        name: 'bye1',
                        screen_name: 'bye1',
                        description: 'mock user',
                    },
                    {
                        name: 'bye2',
                        screen_name: 'bye2',
                        description: 'mock user',
                    },
                    {
                        name: 'bye3',
                        screen_name: 'bye3',
                        description: 'mock user',
                    },
                    {
                        name: 'bye4',
                        screen_name: 'bye4',
                        description: 'mock user',
                    }
                ]
            }
        },
    ]
});

const nextCursorClient = MockClient({
    'friends/list': [
        {
            res: {
                users: [
                    {
                        name: 'hello0',
                        screen_name: 'hello0',
                        description: 'mock user',
                    },
                ],
                next_cursor: 123456789
            }
        },
        {
            res: {
                users: [
                    {
                        name: 'hello_next',
                        screen_name: 'hello_next',
                        description: 'mock user',
                    },
                ]
            }
        },
    ]
});

module.exports = {
    successClient,
    worstClient,
    changedClient,
    realLikeClient,
    nextCursorClient,
    emptyUserClient,
    pretendNextUserClient,
    notAuthorizedClient,
};
