/* global mySqlPool, mysql */
var multer  = require('multer');
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("articuloDAO");
//this path has to exist before running the server
var pathUpload = "./dev/media/articulos/";
var finalNameFile;
var completePathFile;
var baseFile = "articleImage";
var router = require("express").Router();

dateGeneratorO.printStart();

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, pathUpload);
	},
	filename: function (req, file, callback) {
		finalNameFile = file.fieldname + '-' + Date.now();
		completePathFile = pathUpload + finalNameFile;
		callback(null, finalNameFile);
	}
});
var upload = multer({ storage : storage}).single(baseFile);

router.get("/list", function (req, res) {
	dateGeneratorO.printSelect("list");
	var query = "SELECT " + "\n" +
				"	art.ID_ARTICULO," + "\n" +
				"	art.CODIGO_ARTICULO," + "\n" +
				"	art.DESCRIPCION, " + "\n" +
				"	art.UNIDAD, " + "\n" +
				"	art.PRECIO_UNITARIO, " + "\n" +
				"	art.IMAGEN, " + "\n" +
				"	art.VALOR_REPOSICION, " + "\n" +
				"	art.FK_CATEGORIA, " + "\n" +
				"	cat.DESCRIPCION as CATEGORIA " + "\n" +
				"FROM " + "\n" +
				"	ARTICULO art " + "\n" +
				"INNER JOIN CATEGORIA cat ON" + "\n" +
				"	cat.ID_CATEGORIA = art.FK_CATEGORIA";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	mySqlPool.getConnection(function (err, connection) {
		connection.query(query, function (error, rows) {
			if (error) {
				dateGeneratorO.printError(query, error.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
					"Message": "Success",
					"Articulos": rows
				});
			}
			connection.release();
		});
	});
});

router.post("/", function (req, res) {
	dateGeneratorO.printInsert();
	var query = "INSERT INTO" + "\n" +
				"	ARTICULO (" + "\n" +
				"		CODIGO_ARTICULO," + "\n" +
				"		DESCRIPCION," + "\n" +
				"		UNIDAD," + "\n" +
				"		PRECIO_UNITARIO," + "\n" +
				"		VALOR_REPOSICION," + "\n" +
				"		FK_CATEGORIA," + "\n" +
				"		IMAGEN" + "\n" +
				"	)" + "\n" +
				"VALUES (" + "\n" +
				"	?, " + "\n" +
				"	?, " + "\n" +
				"	?, " + "\n" +
				"	?, " + "\n" +
				"	?, " + "\n" +
				"	?, " + "\n" +
				"	?" + "\n" +
				")";
	var table = [req.body.CODIGO_ARTICULO,
				req.body.DESCRIPCION,
				req.body.UNIDAD,
				req.body.PRECIO_UNITARIO,
				req.body.VALOR_REPOSICION,
				req.body.FK_CATEGORIA,
				req.body.IMAGEN];
	query = mysql.format(query, table);
	dateGeneratorO.printInsert(query);
	mySqlPool.getConnection(function (err, connection) {
		connection.query(query, function(error) {
			if (error) {
				dateGeneratorO.printError(query, error.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
					"Message": "Article Added !"
				});
			}
			connection.release();
		});
	});
});

router.get("/:id_articulo", function (req, res) {
	dateGeneratorO.printSelect(" :id_articulo");
	var query = "CALL SP_SEARCH('ARTICULO','ID_ARTICULO',?)";
	var table = [req.params.id_articulo];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	mySqlPool.getConnection(function (err, connection) {
		connection.query(query, function(error, rows) {
			if (error) {
				dateGeneratorO.printError(query, error.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
					"Message": "Success",
					"Articulos": rows[0]
				});
			}
			connection.release();
		});
	});
});

router.put("/", function (req, res) {
	dateGeneratorO.printUpdate();
	var query = "UPDATE" + "\n" +
				"	ARTICULO" + "\n" +
				"SET " + "\n" +
				"	CODIGO_ARTICULO = ?, " + "\n" +
				"	DESCRIPCION = ?, " + "\n" +
				"	UNIDAD = ?, " + "\n" +
				"	PRECIO_UNITARIO = ?, " + "\n" +
				"	VALOR_REPOSICION = ?, " + "\n" +
				"	FK_CATEGORIA = ?, " + "\n" +
				"	IMAGEN = ? " + "\n" +
				"WHERE" + "\n" +
				"	ID_ARTICULO = ?";
	var table = [req.body.CODIGO_ARTICULO,
				req.body.DESCRIPCION,
				req.body.UNIDAD,
				req.body.PRECIO_UNITARIO,
				req.body.VALOR_REPOSICION,
				req.body.FK_CATEGORIA,
				req.body.IMAGEN,
				req.body.ID_ARTICULO];

	query = mysql.format(query, table);
	dateGeneratorO.printUpdate(query);
	mySqlPool.getConnection(function (err, connection) {
		connection.query(query, function(error) {
			if (error) {
				dateGeneratorO.printError(query, error.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
					"Message": "OK"
				});
			}
			connection.release();
		});
	});
});

router.post('/image', function (req, res) {
	dateGeneratorO.printInsert("image");
	dateGeneratorO.printInsert(req);
	upload(req, res, function (error) {
		if (error) {
			dateGeneratorO.printError(req, error.message);
			return res.end("Error uploading file.");
		}
		res.end(completePathFile);
	});
});

exports.router = router;
