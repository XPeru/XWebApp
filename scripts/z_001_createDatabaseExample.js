var connection = require("../utils/standalone.js").connection();

connection.beginTransaction(function (err) {

    if (err) {
        throw err;
    }

    var db_name = 'new_schema';
    connection.query('CREATE DATABASE IF NOT EXISTS ' + db_name, function (error, results, fields) {
        if (error) {
            return connection.rollback(function() {
                throw error;
            });
        }

        connection.commit(function (err) {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
            console.log('Database ' + db_name + ' created');

            connection.end(function (err) {
                console.log('Connection ended');
            });
        });
    });
});
