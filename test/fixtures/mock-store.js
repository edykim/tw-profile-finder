class MockStore {
    constructor() {
        this.data = [];
    }
    save(data) {
        this.data = data;
    }
}

module.exports = MockStore;
