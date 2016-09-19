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
    dateGenerator.printInfo(daoName + "\n" + data);
}


usuariosTipoDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "TIPO_USUARIO";
    var urlBase = "/tipousuario";

	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
        var query = "SELECT " + "\n" +
                    "   * " + "\n" +
                    "FROM " + "\n" +
                    "   TIPO_USUARIO";
        var table = [];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err, rows) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
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
        var query = "INSERT INTO " + "\n" +
                    "   TIPO_USUARIO(" + "\n" +
                    "       TIPO" + "\n" +
                    "   ) VALUES (" + "\n" +
                    "       ?" + "\n" +
                    "   )";
        var table = [req.body.TIPO];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
                    "Message": "Tipo Usuario Agregado"
                });
            }
        });
    });

    router.put(urlBase, function(req, res) {
        printRequest(urlBase + " put");
        var query = "UPDATE " + "\n" +
                    "   TIPO_USUARIO " + "\n" +
                    "SET " + "\n" +
                    "   TIPO = ? " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_TIPO_USUARIO = ?";
        var table = [req.body.TIPO, req.body.ID_TIPO_USUARIO];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
                    "Message": "Tipo Usuario modificado"
                });
            }
        });
    });

    router.get(urlBase + "/:id_tipo_usuario", function(req, res) {
		printRequest(urlBase + "/:id_tipo_usuario" + " get");
        var query = "SELECT " + "\n" +
                    "   * " + "\n" +
                    "FROM " + "\n" +
                    "   TIPO_USUARIO " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_TIPO_USUARIO=?";
        var table = [req.params.id_tipo_usuario];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err, rows) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
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
        var query = "DELETE FROM " + "\n" +
                    "   TIPO_USUARIO " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_TIPO_USUARIO=?";
        var table = [req.params.id_tipo_usuario];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
                    "Message": "Deleted the user with id_tipo_usuario " + req.params.id_tipo_usuario
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
        var width_max = 612;
        var height_max = 792;
        var x = 30;
        var w = width_max - 2 * x;
        var h = height_max - 2 * x;
        doc.save().moveTo(x, x)
           .lineTo(x, x + h)
           .lineTo(x + w, x + h)
           .lineTo(x + w, x)
           .lineTo(x, x)
           .stroke();
           
        /*doc.circle(280, 200, 50)
           .fill("#6600FF");*/
           
        // an SVG path
        /*doc.scale(0.6)
           .translate(470, 130)
           .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
           .fill('red', 'even-odd')
           .restore();*/

        doc.end();

        res.json ({"dataR" : 'output.pdf'});

    });

};


module.exports = usuariosTipoDAO;