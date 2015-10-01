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

var options = {
    channels: true
}
wrapper.getAllDocs(options, function (response) {
    console.log(response.rows);
});