/**
 * Wrapper functions for the database API
 * http://developer.couchbase.com/documentation/mobile/current/develop/references/sync-gateway/rest-api/index.html
 *
 */
var connection, options,
    http, hostSegments,
    urlParser = require('url'),
    network = require('./network');

/**
 * Initialize the connection
 *
 * @param {Object} connection
 *      {
 *          host: "http://localhost:4985",
 *          bucket: "default"
 *      }
 */

function SyncGateway(connection) {
    this.hostSegments = urlParser.parse(connection.host);
    this.connection = connection;
    this.options = {
        host: this.hostSegments.hostname,
        port: this.hostSegments.port
    };
    this.http = require(this.hostSegments.protocol.replace(':', ''));
}

/** 
 * Returns DB information 
 */

SyncGateway.prototype.getDb = function (callback) {
    this.options.path = "/" + this.connection.bucket + "/";
    this.options.method = "GET";

    network.execute(this.http, this.options, function (result) {
        callback(result);
    });
};

/** 
 * Returns all documents 
 */

SyncGateway.prototype.getAllDocs = function (callback) {
    this.options.path = "/" + this.connection.bucket + "/_all_docs";
    this.options.method = "GET";

    network.execute(this.http, this.options, function (result) {
        callback(result);
    });
};


module.exports = SyncGateway;