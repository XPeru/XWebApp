//Express is a minimalist web framework for node.js
const express = require("express");
// This module allows our server to connect and dialog with a mysql database
const mysql = require("mysql");
// This allows our server to parse JSONs objects
const bodyParser = require("body-parser");
// npm install serve-favicon
const favicon = require("serve-favicon");
const colors = require('colors');
const path = require("path");
const fileSystem = require("graceful-fs");

var app = express();
app.use(favicon(path.join(__dirname, '/dev/media/favicon.ico')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var router = express.Router();
app.use('/api', router);
// express.static gaves access to a directory from the browser client
// the __dirname directory becames "public"
// __dirname is the current directory
app.use(express.static(__dirname));
global.mysql = mysql;
const startServer = function () {
    app.listen(8071, function () {
        console.log(colors.green("All right ! I am alive at Port 8071."));
    });
};

const stop = function (err) {
    console.log(colors.red("ISSUE WITH MYSQL \n" + err));
    process.exit(1);
};

const loadModule = function () {
    return function (file) {
        // avoiding IDE's files
        if (file.charAt(0) === ".") {
            return;
        }
        const format = file.slice(-6, -3);
        const mod = require("./DAO/" + file);
        // only DAO files for routes
        if (format === "DAO") {
            const path = file.slice(0, -6);
            app.use("/api/" + path, mod.router);
        }
    };
};
fileSystem.readdirSync("./DAO").forEach(loadModule());

const connectMysql = function () {
    var pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'testdb',
        debug: false
    });
    pool.getConnection(function (err, connection) {
        if (err) {
            stop(err);
        } else {
            global.mysqlConnection = connection;
            startServer();
        }
    });
};

connectMysql();

// var PDFDocument = require("pdfkit");
// var blobStream  = require("blob-stream");
// // create a document and pipe to a blob
// var doc = new PDFDocument();
// var stream = doc.pipe(blobStream());
