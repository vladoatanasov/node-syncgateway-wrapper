module.exports = {
    execute: function (http, options, callback) {
        var cb = function (response) {
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
    }
}