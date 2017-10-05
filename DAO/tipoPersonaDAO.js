/* global mySqlPool, mysql, cf */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("tipoPersonaDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", cf( async(req) => {
    dateGeneratorO.printSelect("list" + " get");
	var query = "CALL SP_SEARCH_ALL('TIPO_PERSONA')";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
    var rows = await connection.query(query);
    var result = {
        TipoPersona: rows[0]
    };
    return result;
}));

router.get("/:desc", function (req, res) {
	dateGeneratorO.printSelect("");
	var query = "CALL SP_SEARCH_STRING('TIPO_PERSONA','DESCRIPCION',?)";
	var table = [req.params.desc];
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
					"TipoPersona": rows[0]
				});
			}
			connection.release();
		});
	});
});

router.post("/", function(req, res) {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"	TIPO_PERSONA (" + "\n" +
				"		DESCRIPCION" + "\n" +
				"	)" + "\n" +
				"VALUES (" + "\n" +
				"	?" + "\n" +
				")";
	var table = [req.body.DESCRIPCION];
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
					"Message": "Categoria Added !"
				});
			}
			connection.release();
		});
	});
});

router.put("/", function(req, res) {
	dateGeneratorO.printUpdate("/");
	var query = "UPDATE" + "\n" +
				"	TIPO_PERSONA " + "\n" +
				"SET" + "\n" +
				"	DESCRIPCION = ? " + "\n" +
				"WHERE " + "\n" +
				"	ID_TIPO_PERSONA = ?";
	var table = [req.body.DESCRIPCION,
				req.body.ID_TIPO_PERSONA];
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

router.delete("/:id_tipopersona", function(req, res) {
	dateGeneratorO.printDelete("/:id_tipopersona");
	var query = "DELETE FROM" + "\n" +
				"	TIPO_PERSONA" + "\n" +
				"WHERE " + "\n" +
				"	ID_TIPO_PERSONA = ?";
	var table = [req.params.id_tipopersona];
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
					"Message": "Categoria deleted: " + req.params.id_tipopersona
				});
			}
			connection.release();
		});
	});
});

exports.router = router;
