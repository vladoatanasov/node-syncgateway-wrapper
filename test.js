var SyncGateway = require('./index.js'),
    wrapper = new SyncGateway({
        host: "http://localhost:4985",
        bucket: "default"
    }),
    assert = require('assert')

wrapper.getDb(function (response) {
    assert.equal(response.db_name, 'default', 'assert db name failed');
    console.log(response);
});

wrapper.getAllDocs(function (response) {
    console.log(response);
});