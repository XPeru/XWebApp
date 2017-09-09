// This module allows our server to connect and dialog with a mysql database
const mysql = require("mysql");
global.mysql = mysql;

const createPoolMysql = function () {
    var pool = mysql.createPool({
        connectionLimit: process.env.MYSQL_CONNECTIONLIMIT,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE_NAME,
        debug: false
    });
    global.mySqlPool = pool;
};

exports.createPoolMysql  = createPoolMysql;
