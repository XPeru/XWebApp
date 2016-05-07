//Express is a minimalist web framework for node.js
var express = require("express");
// This module allows our server to connect and dialog with a mysql database
var mysql = require("mysql");
// This allows our server to parse JSONs objects
var bodyParser = require("body-parser");
// npm install serve-favicon
var favicon = require("serve-favicon");
// I don't know :)
var md5 = require('MD5');
// The rest.js contains all the routes for the server, it should be composed by many others files
// One file per application service
var restUsuarios = require("./DAO/usuariosDAO.js");
var restArticulos = require("./DAO/articulosDAO.js");
var restAlmacenes = require("./DAO/almacenesDAO.js");
var restIngresos = require("./DAO/ingresosDAO.js");
// We execute the express
var app = express();

function REST() {
    var self = this;
    self.connectMysql();
}

// Using prototypes <=> POO 
REST.prototype.connectMysql = function() {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'testdb',
        debug: false
    });
    pool.getConnection(function(err, connection) {
        if (err) {
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });
};

REST.prototype.configureExpress = function(connection) {
    var self = this;
    app.use(favicon(__dirname + '/dev/media/favicon.ico'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var router = express.Router();
    app.use('/api', router);
    // express.static gaves access to a directory from the browser client
    // the __dirname directory becames "public"
    app.use(express.static(__dirname));
    // Adding all the routes to our server
    var rest_usuarios = new restUsuarios(router, connection, md5);
    var rest_articulos = new restArticulos(router, connection, md5);
    var rest_almacenes = new restAlmacenes(router, connection, md5);
    var rest_ingresos = new restIngresos(router, connection, md5);
    self.startServer();
};

REST.prototype.startServer = function() {
    app.listen(8071, function() {
        console.log("All right ! I am alive at Port 8071.");
    });
};

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
};

new REST();