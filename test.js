var SyncGateway = require('./index.js'),
    wrapper = new SyncGateway({
        host: "http://localhost:4985",
        bucket: "default"
    }),
    assert = require('assert');

//wrapper.getDb(function (response) {
//    assert.equal(response.db_name, 'default', 'assert db name failed');
//    console.log(response);
//});
for (var i = 0; i < 10; i++) {
    var docId = "test" + i;
    var document = {
        testDoc: i
    }

    wrapper.upsert(docId, document, function (response) {
        console.log(response);
    });
}
//
//var options = {
//    access: true,
//    channels: true,
//    include_docs: true,
//    revs: true,
//    update_seq: true
//}
//wrapper.getAllDocs(function (response) {
//    console.log(response.rows);
//}, options);