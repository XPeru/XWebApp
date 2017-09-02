/* global mysqlConnection, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("tipousuarioDAO");
var fs = require('fs');

var PDFDocument = require('pdfkit');
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", function (req, res) {
	dateGeneratorO.printSelect("list");
    var query = "CALL SP_SEARCH_ALL('TIPO_USUARIO')";
    var table = [];
    query = mysql.format(query, table);
    dateGeneratorO.printSelect(query);
    mysqlConnection.query(query, function (err, rows) {
        if (err) {
            dateGeneratorO.printError(query, err.message);
            res.json({
                "Error": true,
                "Message": "Error executing MySQL query"
            });
        } else {
			dateGeneratorO.printSuccess();
			res.json({
				"Error": false,
                "Message": "Success",
                "TiposUsuario": rows[0]
            });
        }
    });
});

router.post("/", function (req, res) {
	dateGeneratorO.printInsert("/");
    var query = "INSERT INTO " + "\n" +
                "   TIPO_USUARIO(" + "\n" +
                "       TIPO" + "\n" +
                "   ) VALUES (" + "\n" +
                "       ?" + "\n" +
                "   )";
    var table = [req.body.TIPO];
    query = mysql.format(query, table);
    dateGeneratorO.printInsert(query);
    mysqlConnection.query(query, function (err) {
        if (err) {
            dateGeneratorO.printError(query, err.message);
            res.json({
                "Error": true,
                "Message": "Error executing MySQL query"
            });
        } else {
			dateGeneratorO.printSuccess();
			res.json({
				"Error": false,
                "Message": "Tipo Usuario Agregado"
            });
        }
    });
});

router.put("/", function (req, res) {
    dateGeneratorO.printUpdate("/");
    var query = "UPDATE " + "\n" +
                "   TIPO_USUARIO " + "\n" +
                "SET " + "\n" +
                "   TIPO = ? " + "\n" +
                "WHERE " + "\n" +
                "   ID_TIPO_USUARIO = ?";
    var table = [req.body.TIPO, req.body.ID_TIPO_USUARIO];
    query = mysql.format(query, table);
    dateGeneratorO.printUpdate(query);
    mysqlConnection.query(query, function (err) {
        if (err) {
            dateGeneratorO.printError(query, err.message);
            res.json({
                "Error": true,
                "Message": "Error executing MySQL query"
            });
        } else {
			dateGeneratorO.printSuccess();
			res.json({
				"Error": false,
                "Message": "Tipo Usuario modificado"
            });
        }
    });
});

router.get("/:id_tipo_usuario", function (req, res) {
	dateGeneratorO.printSelect("/:id_tipo_usuario");
    var query = "CALL SP_SEARCH('TIPO_USUARIO','ID_TIPO_USUARIO',?)";
    var table = [req.params.id_tipo_usuario];
    query = mysql.format(query, table);
    dateGeneratorO.printSelect(query);
    mysqlConnection.query(query, function (err, rows) {
        if (err) {
            dateGeneratorO.printError(query, err.message);
            res.json({
                "Error": true,
                "Message": "Error executing MySQL query"
            });
        } else {
			dateGeneratorO.printSuccess();
			res.json({
				"Error": false,
                "Message": "Success",
                "TipoUsuario": rows[0]
            });
        }
    });
});

router.delete("/:id_tipo_usuario", function (req, res) {
	dateGeneratorO.printDelete("/:id_tipo_usuario");
    var query = "DELETE FROM " + "\n" +
                "   TIPO_USUARIO " + "\n" +
                "WHERE " + "\n" +
                "   ID_TIPO_USUARIO=?";
    var table = [req.params.id_tipo_usuario];
    query = mysql.format(query, table);
    dateGeneratorO.printDelete(query);
    mysqlConnection.query(query, function (err) {
        if (err) {
            dateGeneratorO.printError(query, err.message);
            res.json({
                "Error": true,
                "Message": "Error executing MySQL query"
            });
        } else {
			dateGeneratorO.printSuccess();
			res.json({
				"Error": false,
                "Message": "Deleted the user with id_tipo_usuario " + req.params.id_tipo_usuario
            });
        }
    });
});

router.get("/topdf", function (req, res) {

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

exports.router = router;
