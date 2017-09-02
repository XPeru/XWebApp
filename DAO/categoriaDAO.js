/* global mysqlConnection, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("categoriaDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", function (req, res) {
	dateGeneratorO.printSelect("/list");
	var query = "CALL SP_SEARCH_ALL('CATEGORIA')";
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
				"Categorias": rows[0]
			});
		}
	});
});

router.post("/", function (req, res) {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"	CATEGORIA (" + "\n" +
				"		DESCRIPCION" + "\n" +
				"	)" + "\n" +
				"VALUES (" + "\n" +
				"	?" + "\n" +
				")";
	var table = [req.body.DESCRIPCION];
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
				"Message": "Categoria Added !"
			});
		}
	});
});

router.put("/", function (req, res) {
	dateGeneratorO.printUpdate("/");
	var query = "UPDATE" + "\n" +
				"	CATEGORIA " + "\n" +
				"SET" + "\n" +
				"	DESCRIPCION = ? " + "\n" +
				"WHERE " + "\n" +
				"	ID_CATEGORIA = ?";
	var table = [req.body.DESCRIPCION,
				req.body.ID_CATEGORIA];
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
				"Message": "Categoria detalle updated !"
			});
		}
	});
});

router.delete("/:id_categoria", function (req, res) {
	dateGeneratorO.printDelete("/:id_categoria");
	var query = "DELETE FROM" + "\n" +
				"	CATEGORIA" + "\n" +
				"WHERE " + "\n" +
				"	ID_CATEGORIA = ?";
	var table = [req.params.id_categoria];
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
				"Message": "Categoria deleted: " + req.params.id_categoria
			});
		}
	});
});

exports.router = router;
