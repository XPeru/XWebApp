/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("ingresoDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", function (req, res) {
	dateGeneratorO.printSelect("list");
	var query ="SELECT " + "\n" +
				"	ing.ID_INGRESO, " + "\n" +
				"	ing.CODE_INGRESO, " + "\n" +
				"	ing.COSTO_TOTAL, " + "\n" +
				"	ing.FK_CREATE_USUARIO, " + "\n" +
				"	CONCAT(us.NOMBRE,' ', us.APELLIDOS) AS CREATE_USUARIO, " + "\n" +
				"	ing.CREATE_TIME, " + "\n" +
				"	ing.FK_UPDATE_USUARIO, " + "\n" +
				"	CONCAT(us2.NOMBRE,' ', us2.APELLIDOS) AS UPDATE_USUARIO, " + "\n" +
				"	ing.UPDATE_TIME, " + "\n" +
				"	ing.FK_PROVEEDOR, " + "\n" +
				"	cp.NOMBRE AS NOMBRE_PROVEEDOR, " + "\n" +
				"	ing.FK_TIPO_DOCUMENTO, " + "\n" +
				"	tdoc.DESCRIPCION," + "\n" +
				"	ing.FECHA_INGRESO" + "\n" +
				"FROM " + "\n" +
				"	INGRESO ing " + "\n" +
				"INNER JOIN USUARIO us ON " + "\n" +
				"	us.ID_USUARIO = ing.FK_CREATE_USUARIO " + "\n" +
				"LEFT JOIN USUARIO us2 ON " + "\n" +
				"	us2.ID_USUARIO = ing.FK_UPDATE_USUARIO " + "\n" +
				"INNER JOIN PROVEEDOR_CLIENTE cp ON " + "\n" +
				"	cp.ID_PROVEEDOR_CLIENTE = ing.FK_PROVEEDOR " + "\n" +
				"INNER JOIN TIPO_DOCUMENTO tdoc ON " + "\n" +
				"	tdoc.ID_TIPO_DOCUMENTO = ing.FK_TIPO_DOCUMENTO";
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
					"Ingreso": rows
				});
			}
			connection.release();
		});
	});
});

router.post("/", function (req, res) {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"	INGRESO (" + "\n" +
				"		CODE_INGRESO," + "\n" +
				// "		COSTO_TOTAL," + "\n" +
				"		FK_CREATE_USUARIO," + "\n" +
				"		CREATE_TIME," + "\n" +
				"		FK_PROVEEDOR," + "\n" +
				"		FK_TIPO_DOCUMENTO," + "\n" +
				"		FECHA_INGRESO" + "\n" +
				"	)" + "\n" +
				"VALUES (" + "\n" +
				"	?," + "\n" +
				// "	?," + "\n" +
				"	?," + "\n" +
				"	CURRENT_TIMESTAMP," + "\n" + // use CURDATE() for current date
				"	?," + "\n" +
				"	?," + "\n" +
				"	STR_TO_DATE(?, '%m/%d/%Y')" + "\n" +
				")";
	var table = [
				req.body.CODE_INGRESO,
				// req.body.COSTO_TOTAL,
				1, // here should be req.body.FK_CREATE_USUARIO
				req.body.FK_PROVEEDOR,
				req.body.FK_TIPO_DOCUMENTO,
				req.body.FECHA_INGRESO];
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
					"Message": "Categoria Added !"
				});
			}
			connection.release();
		});
	});
});

router.put("/", function (req, res) {
	dateGeneratorO.printUpdate("/");
	var query = "UPDATE " + "\n" +
				"	INGRESO " + "\n" +
				"SET " + "\n" +
				"	COSTO_TOTAL = ?," + "\n" +
				"	FECHA_INGRESO = STR_TO_DATE(?, '%m/%d/%Y')," + "\n" +
				"	UPDATE_TIME = CURRENT_TIMESTAMP" + "\n" +
				"WHERE" + "\n" +
				"	ID_INGRESO = ?";
	var table = [
				req.body.COSTO_TOTAL,
				req.body.FECHA_INGRESO,
				req.body.ID_INGRESO];
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
					"Message": "Categoria detalle updated !"
				});
			}
			connection.release();
		});
	});
});

router.delete("/:id_ingreso", function (req, res) {
	dateGeneratorO.printDelete("/:id_ingreso");
	var query = "DELETE FROM" + "\n" +
				"	INGRESO" + "\n" +
				"WHERE " + "\n" +
				"	ID_INGRESO = ?";
	var table = [req.params.id_ingreso];
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
					"Message": "Categoria deleted: " + req.params.id_ingreso
				});
			}
			connection.release();
		});
	});
});

exports.router = router;
