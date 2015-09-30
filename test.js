var SyncGateway = require('./index.js');

var wrapper = new SyncGateway({
    host: "http://localhost:4985",
    bucket: "default"
});

wrapper.getDb(function (response) {
    console.log(response);
});