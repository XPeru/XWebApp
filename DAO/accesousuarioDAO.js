/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("accesousuarioDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", function (req, res) {
	dateGeneratorO.printSelect("list");
	var query = "CALL SP_SEARCH_ALL('ACCESO_USUARIO')";
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
					"AccesosUsuario": rows[0]
				});
			}
			connection.release();
		});
	});

});

router.post("/", function (req, res) {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"   ACCESO_USUARIO (" + "\n" +
				"       DESCRIPCION" + "\n" +
				"   ) VALUES (" + "\n" +
				"       ?" + "\n" +
				"   )";
	var table = [req.body.DESCRIPCION];
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
				"Message": "Acceso Usuario Agregado"
				});
			}
			connection.release();
	    });
	});
});

router.put("/", function (req, res) {
	dateGeneratorO.printUpdate("/");
	var query = "UPDATE " + "\n" +
				"   ACCESO_USUARIO " + "\n" +
				"SET " + "\n" +
				"   DESCRIPCION = ? " + "\n" +
				"WHERE " + "\n" +
				"   ID_ACCESO_USUARIO = ?";
	var table = [req.body.DESCRIPCION, req.body.ID_ACCESO_USUARIO];
	query = mysql.format(query, table);
	dateGeneratorO.printUpdate(query);

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
				"Message": "Tipo Usuario modificado"
				});
			}
			connection.release();
		});
	});
});

router.get("/:id_acceso_usuario", function (req, res) {
	dateGeneratorO.printSelect("/:id_acceso_usuario");
	var query = "CALL SP_SEARCH('ACCESO_USUARIO','ID_ACCESO_USUARIO',?)";
	var table = [req.params.id_acceso_usuario];
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
				"AccesoUsuario": rows[0]
				});
			}
			connection.release();
		});
	});
});

router.delete("/:id_acceso_usuario", function (req, res) {
	dateGeneratorO.printDelete("/:id_acceso_usuario");
	var query = "DELETE FROM " + "\n" +
				"   ACCESO_USUARIO " + "\n" +
				"WHERE " + "\n" +
				"   ID_ACCESO_USUARIO=?";
	var table = [req.params.id_acceso_usuario];
	query = mysql.format(query, table);
	dateGeneratorO.printDelete(query);

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
				"Message": "Deleted the user with id_acceso_usuario " + req.params.id_acceso_usuario
				});
			}
			connection.release();
		});
	});
});

exports.router = router;
