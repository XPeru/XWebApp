var mysql = require('promise-mysql');
const dotenv = require("dotenv");
dotenv.config({ path: "../.env.dev" });

exports.connection = function () {
    var connection = mysql.createConnection({
        host     : process.env.MYSQL_HOST,
        user     : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD
    });
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        return;
        }
        console.log('connected as id ' + connection.threadId);
    });
    return connection;
};
