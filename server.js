//Express is a minimalist web framework for node.js
const express = require("express");
// This module allows our server to connect and dialog with a mysql database
const mysql = require("mysql");
// This allows our server to parse JSONs objects
const bodyParser = require("body-parser");
// npm install serve-favicon
const favicon = require("serve-favicon");
// For hash encryption, used for passwords
const md5 = require('MD5');
const colors = require('colors');
const path = require("path");

// The rest.js contains all the routes for the server, it should be composed by many others files
// One file per application service
var restUsuarios = require("./DAO/usuariosDAO.js");
var restArticulos = require("./DAO/articulosDAO.js");
var restArticulosCategoria = require("./DAO/articulosCategoriaDAO.js");
var restAlmacenes = require("./DAO/almacenesDAO.js");
var restUsuariosTipo = require("./DAO/usuariosTipoDAO.js");
var restUsuariosAcceso = require("./DAO/usuariosAccesoDAO.js");
var restAsocTipoAcceso = require("./DAO/asocTipoAccesoDAO.js");
var restTipoPersona = require("./DAO/tipoPersonaDAO.js");
var restPersona = require("./DAO/personaDAO.js");
var restTipoDocumento = require("./DAO/tipoDocumentoDAO.js");
var restEstado = require("./DAO/estadoDAO.js");
var restIngreso = require("./DAO/ingresoDAO.js");
var restIngresoDetalle = require("./DAO/ingresoDetalleDAO.js");
// We execute the express
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

const startServer = function () {
    app.listen(8071, function () {
        console.log(colors.green("All right ! I am alive at Port 8071."));
    });
};

const stop = function (err) {
    console.log(colors.red("ISSUE WITH MYSQL \n" + err));
    process.exit(1);
};

const configureExpress = function (router, connection, md5) {
    // Adding all the routes to our server
    new restUsuarios(router, connection, md5);
    new restArticulos(router, connection);
    new restArticulosCategoria(router, connection);
    new restAlmacenes(router, connection);
    new restUsuariosTipo(router, connection);
    new restUsuariosAcceso(router, connection);
    new restAsocTipoAcceso(router, connection);
    new restTipoPersona(router, connection);
    new restPersona(router, connection);
    new restTipoDocumento(router, connection);
    new restEstado(router, connection);
    new restIngreso(router, connection);
    new restIngresoDetalle(router, connection);
    startServer();
};

const connectMysql = function (mysql, router, md5) {
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
            stop(err);
        } else {
            configureExpress(router, connection, md5);
        }
    });
};

connectMysql(mysql, router, md5);

// var PDFDocument = require("pdfkit");
// var blobStream  = require("blob-stream");
// // create a document and pipe to a blob
// var doc = new PDFDocument();
// var stream = doc.pipe(blobStream());
