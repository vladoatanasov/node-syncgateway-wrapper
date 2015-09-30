var SyncGateway = require('./index.js');

var wrapper = new SyncGateway({
    host: "http://localhost:4985",
    bucket: "eddie_chat"
});

wrapper.getDb(function (response) {
    console.log(response);
});