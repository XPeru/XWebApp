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

router.get("/list", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Articulos: rows
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
			Message: "OK"
	};
	connection.release();
	return result;
}));

router.get("/:id_articulo", cf( async(req) => {
	dateGeneratorO.printSelect(" :id_articulo");
	var query = "CALL SP_SEARCH('ARTICULO','ID_ARTICULO',?)";
	var table = [req.params.id_articulo];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Articulos: rows[0]
	};
	connection.release();
	return result;
}));

router.put("/", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
			Message: "OK"
	};
	connection.release();
	return result;
}));

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
