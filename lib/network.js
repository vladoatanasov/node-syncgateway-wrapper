module.exports = {
    execute: function (http, options, callback, payload) {
        payload = payload || {};

        var cb = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                if (str !== '') {
                    callback(JSON.parse(str));
                }
            });
        };

        var req = http.request(options, cb);
        req.write(JSON.stringify(payload));
        req.end();
    }
}
