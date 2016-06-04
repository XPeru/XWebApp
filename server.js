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
var restUsuariosTipo = require("./DAO/usuariosTipoDAO.js"); 
var restUsuariosAcceso = require("./DAO/usuariosAccesoDAO.js");
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
    new restUsuarios(router, connection, md5);
    new restArticulos(router, connection);
    new restAlmacenes(router, connection);
    new restIngresos(router, connection);
    new restUsuariosTipo(router, connection);
    new restUsuariosAcceso(router, connection);
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


// var PDFDocument = require("pdfkit");
// var blobStream  = require("blob-stream");
// // create a document and pipe to a blob
// var doc = new PDFDocument();
// var stream = doc.pipe(blobStream());

var PDFDocument, doc;
var fs = require('fs');

PDFDocument = require('pdfkit');

doc = new PDFDocument;

doc.pipe(fs.createWriteStream('output.pdf'));

// PDF Creation logic goes here



// draw some text
doc.fontSize(25)
   .text('Here is some vector graphics...', 100, 80);
   
// some vector graphics
doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill("#FF3300");
   
doc.circle(280, 200, 50)
   .fill("#6600FF");
   
// an SVG path
doc.scale(0.6)
   .translate(470, 130)
   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
   .fill('red', 'even-odd')
   .restore();
   
// and some justified text wrapped into columns
// doc.text('And here is some wrapped texzzt...', 100, 300)
//    .font('Times-Roman', 13)
//    .moveDown()
//    .text(lorem, {
//      width: 412,
//      align: 'justify',
//      indent: 30,
//      columns: 2,
//      height: 300,
//      ellipsis: true
//    });
   
// end and display the document in the iframe to the right
doc.end();
// var iframe = document.querySelector('iframe');
// stream.on('finish', function() {
//   // blob.src = stream.toBlob('application/pdf');
//   iframe.src = stream.toBlobURL('application/pdf');
// });