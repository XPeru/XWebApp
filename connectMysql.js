// This module allows our server to connect and dialog with a mysql database
const mysql = require("mysql");

const createPoolMysql = function () {
    var pool = mysql.createPool({
        connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE_NAME,
        debug: false
    });

    // the pools listeners will be trigged only if debug is true
    pool.on('acquire', function (connection) {
        console.info('Connection %d acquired', connection.threadId);
    });

    pool.on('connection', function (connection) {
        connection.query('SET SESSION auto_increment_increment=1');
    });

    pool.on('enqueue', function () {
        console.log('Waiting for available connection slot');
    });

    pool.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });

    global.mySqlPool = pool;
    global.mysql = mysql;
};

exports.createPoolMysql  = createPoolMysql;