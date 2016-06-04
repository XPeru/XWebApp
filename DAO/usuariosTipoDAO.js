var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var fs = require('fs');

var PDFDocument = require('pdfkit');
var daoName = "usuariosTipoDAO";
function usuariosTipoDAO(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
    dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + " " + data);
}


usuariosTipoDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "TIPO_USUARIO";
    var assoTableName = "ASOC_TIPO_ACCESO";
	var urlBase = "/tipousuario";

	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
        var query = "SELECT * FROM ??";
        var table = [tableName];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Success",
                    "TiposUsuario": rows
                });
            }
        });
    });

    router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post");
        var query = "INSERT INTO ??(??) VALUES (?)";
        var table = [tableName, "TIPO",
                    req.body.TIPO];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Tipo Usuario Agregado"
                });
            }
        });
    });

    router.put(urlBase, function(req, res) {
        printRequest(urlBase + " put");
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = [tableName, "TIPO",
                    req.body.TIPO, "ID_TIPO_USUARIO", req.body.ID_TIPO_USUARIO];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Tipo Usuario modificado"
                });
            }
        });
    });

    router.get(urlBase + "/:id_tipo_usuario", function(req, res) {
		printRequest(urlBase + "/:id_tipo_usuario" + " get");
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = [tableName, "ID_TIPO_USUARIO", req.params.id_tipo_usuario];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Success",
                    "TipoUsuario": rows
                });
            }
        });
    });

	router.delete(urlBase + "/:id_tipo_usuario", function(req, res) {
		printRequest(urlBase + "/:id_tipo_usuario", " delete");
        var query = "DELETE from ?? WHERE ??=?";
        var table = [tableName, "ID_TIPO_USUARIO", req.params.id_tipo_usuario];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Deleted the user with id_tipo_usuario " + req.params.id_tipo_usuario
                });
            }
        });
    });

    router.get(urlBase + "/assoaccesos/:id_tipo_usuario", function(req, res) {
        printRequest(urlBase + "/assoaccesos/:id_tipo_usuario", " GET");
        var query = "SELECT ?? FROM ?? WHERE ??=?";
        var table = ["FK_ACCESO_USUARIO", assoTableName, "FK_TIPO_USUARIO", req.params.id_tipo_usuario];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Success",
                    "Assos": rows
                });
            }
        });
    });

    router.get(urlBase + "topdf", function(req, res) {

        var doc = new PDFDocument();

        doc.pipe(fs.createWriteStream('output.pdf'));
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

        doc.end();

        res.json ({"dataR" : 'output.pdf'});

    });

};


module.exports = usuariosTipoDAO;