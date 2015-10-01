/**
 * Wrapper functions for the database API
 * http://developer.couchbase.com/documentation/mobile/current/develop/references/sync-gateway/rest-api/index.html
 *
 */
var connection, requestOptions,
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
    this.requestOptions = {
        host: this.hostSegments.hostname,
        port: this.hostSegments.port
    };
    this.http = require(this.hostSegments.protocol.replace(':', ''));
}

/** 
 * Returns DB information 
 */

SyncGateway.prototype.getDb = function (callback) {
    this.requestOptions.path = "/" + this.connection.bucket + "/";
    this.requestOptions.method = "GET";

    network.execute(this.http, this.requestOptions, function (result) {
        callback(result);
    });
};

/** 
 * Returns all documents 
 */

SyncGateway.prototype.getAllDocs = function (options, callback) {
    var qs = require('querystring');
    this.requestOptions.path = "/" + this.connection.bucket + "/_all_docs?";
    this.requestOptions.path += qs.stringify(options);
    this.requestOptions.method = "GET";

    network.execute(this.http, this.requestOptions, function (result) {
        callback(result);
    });
};


module.exports = SyncGateway;