/**
 * Wrapper functions for the database API
 * http://developer.couchbase.com/documentation/mobile/current/develop/references/sync-gateway/rest-api/index.html
 *
 */
var connection;

var hostSegments;
var urlParser = require('url');

function SyncGateway(connection) {
    hostSegments = urlParser.parse(connection.host);
    this.connection = connection;
}

SyncGateway.prototype.getDb = function (callback) {
    var http = require(hostSegments.protocol.replace(':', ''));

    var options = {
        host: hostSegments.hostname,
        port: hostSegments.port,
        path: "/" + this.connection.bucket + "/"
    };

    cb = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            if (str !== "") {
                callback(JSON.parse(str));
            }
        });
    }
    http.request(options, cb).end();
};

SyncGateway.prototype.get

module.exports = SyncGateway;