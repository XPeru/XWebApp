/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("tipousuarioDAO");
var fs = require('fs');

var PDFDocument = require('pdfkit');
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", cf( async(req) => {
	dateGeneratorO.printSelect("list");
	var query = "CALL SP_SEARCH_ALL('TIPO_USUARIO')";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		TiposUsuario: rows[0]
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Message: "OK"
	};
	connection.release();
	return result;
}));

router.put("/", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Message: "OK"
	};
	connection.release();
	return result;
}));

router.get("/:id_tipo_usuario", cf( async(req) => {
	dateGeneratorO.printSelect("/:id_tipo_usuario");
	var query = "CALL SP_SEARCH('TIPO_USUARIO','ID_TIPO_USUARIO',?)";
	var table = [req.params.id_tipo_usuario];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		TipoUsuario: rows[0]
	};
	connection.release();
	return result;
}));

router.delete("/:id_tipo_usuario", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_tipo_usuario");
	var query = "DELETE FROM " + "\n" +
	            "   TIPO_USUARIO " + "\n" +
	            "WHERE " + "\n" +
	            "   ID_TIPO_USUARIO=?";
	var table = [req.params.id_tipo_usuario];
	query = mysql.format(query, table);
	dateGeneratorO.printDelete(query);
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Message: "OK"
	};
	connection.release();
	return result;
}));

router.get("/topdf", cf( async(req) => {

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

}));

exports.router = router;
