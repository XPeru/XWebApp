/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("almacenDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", function (req, res) {
	dateGeneratorO.printSelect("list");
	var query = "CALL SP_SEARCH_ALL('ALMACEN')";
	var table = [];
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
					"Almacenes": rows[0]
				});
			}
			connection.release();
		});
	});
});

router.post("/", function (req, res) {
	dateGeneratorO.printInsert();
	var query = "INSERT INTO " + "\n" +
				"	ALMACEN (" + "\n" +
				"		CODIGO_ALMACEN," + "\n" +
				"		UBICACION" + "\n" +
				"	)" + "\n" +
				"VALUES (" + "\n" +
				"	?, " + "\n" +
				"	?" + "\n" +
				")";
	var table = [req.body.CODIGO_ALMACEN,
				req.body.UBICACION];
	query = mysql.format(query, table);
	dateGeneratorO.printInsert(query);

	mySqlPool.getConnection(function (err, connection) {
		connection.query(query, function (error) {
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
					"Message": "Articulo Added !"
				});
			}
			connection.release();
		});
	});
});

router.put("/", function (req, res) {
	dateGeneratorO.printUpdate();
	var query = "UPDATE" + "\n" +
				"	ALMACEN " + "\n" +
				"SET" + "\n" +
				"	CODIGO_ALMACEN = ?, " + "\n" +
				"	UBICACION = ? " + "\n" +
				"WHERE " + "\n" +
				"	ID_ALMACEN = ?";
	var table = [req.body.CODIGO_ALMACEN, req.body.UBICACION, req.body.ID_ALMACEN];
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
					"Message": "Almacen detalle updated !"
				});
			}
		});
	});
});

router.delete("/:id_almacen", function(req, res) {
	dateGeneratorO.printDelete("/:id_almacen");
	var query = "DELETE FROM" + "\n" +
				"	ALMACEN" + "\n" +
				"WHERE " + "\n" +
				"	ID_ALMACEN = ?";
	var table = [req.params.id_almacen];
	query = mysql.format(query, table);
	dateGeneratorO.printDelete(query);

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
					"Message": "Almacen deleted: " + req.params.id_almacen
				});
			}
			connection.release();
		});
	});
});

exports.router = router;
