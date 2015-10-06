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
 * Database 
 */

SyncGateway.prototype.getDb = function (callback) {
    this.requestOptions.path = "/" + this.connection.bucket + "/";
    this.requestOptions.method = "GET";

    network.execute(this.http, this.requestOptions, function (result) {
        callback(result);
    });
};

SyncGateway.prototype.getAllDocs = function (callback, options) {
    options = options || {};
    var qs = require('querystring');
    this.requestOptions.path = "/" + this.connection.bucket + "/_all_docs?";
    this.requestOptions.path += qs.stringify(options);
    this.requestOptions.method = "GET";

    network.execute(this.http, this.requestOptions, function (result) {
        callback(result);
    });
};

/** 
 * Documents 
 */

SyncGateway.prototype.upsert = function (document, payload, callback, options) {
    // @todo: trying to update a document, sg returns a conflict. According to docs a /PUT should update existing documents 
    var qs = require("querystring");
    options = options || {};
    this.requestOptions.path = "/" + this.connection.bucket + "/" + document;
    this.requestOptions.path += qs.stringify(options);
    this.requestOptions.method = "PUT";

    network.execute(this.http, this.requestOptions, function (result) {
        callback(result);
    }, payload);

}


module.exports = SyncGateway;