/* global mysqlConnection, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("personaDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list/:desc", function (req, res) {
	dateGeneratorO.printSelect("list");
	var query = "SELECT " + "\n" +
				"	pc.ID_PROVEEDOR_CLIENTE, " + "\n" +
				"	pc.NOMBRE, " + "\n" +
				"	pc.EMAIL, " + "\n" +
				"	pc.RUC, " + "\n" +
				"	pc.NUMERO_CUENTA, " + "\n" +
				"	pc.DIRECCION_CALLE, " + "\n" +
				"	pc.DIRECCION_DISTRITO, " + "\n" +
				"	pc.DIRECCION_DEPARTAMENTO, " + "\n" +
				"	pc.DIRECCION_COMPLEMENTO, " + "\n" +
				"	pc.TELEFONO, " + "\n" +
				"	pc.FK_TIPO_PERSONA " + "\n" +
				"FROM" + "\n" +
				"	TIPO_PERSONA tipo " + "\n" +
				"INNER JOIN PROVEEDOR_CLIENTE pc ON " + "\n" +
				"	pc.FK_TIPO_PERSONA = tipo.ID_TIPO_PERSONA " + "\n" +
				"WHERE" + "\n" +
				"	tipo.DESCRIPCION = ?";
	var table = [req.params.desc];
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
				"Persona": rows
			});
		}
	});
});

router.post("/", function(req, res) {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"	PROVEEDOR_CLIENTE (" + "\n" +
				"		NOMBRE," + "\n" +
				"		EMAIL," + "\n" +
				"		RUC," + "\n" +
				"		NUMERO_CUENTA," + "\n" +
				"		DIRECCION_CALLE," + "\n" +
				"		DIRECCION_DISTRITO," + "\n" +
				"		DIRECCION_DEPARTAMENTO," + "\n" +
				"		DIRECCION_COMPLEMENTO," + "\n" +
				"		TELEFONO," + "\n" +
				"		FK_TIPO_PERSONA" + "\n" +
				"	) VALUES (" + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?" + "\n" +
				"	)";
	var table = [req.body.NOMBRE,
				req.body.EMAIL,
				req.body.RUC,
				req.body.NUMERO_CUENTA,
				req.body.DIRECCION_CALLE,
				req.body.DIRECCION_DISTRITO,
				req.body.DIRECCION_DEPARTAMENTO,
				req.body.DIRECCION_COMPLEMENTO,
				req.body.TELEFONO,
				req.body.FK_TIPO_PERSONA];
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
				"Message": "Persona Added !"
			});
		}
	});
});

router.put("/", function(req, res) {
	dateGeneratorO.printUpdate("/");
	var query = "UPDATE " + "\n" +
				"	PROVEEDOR_CLIENTE" + "\n" +
				"SET" + "\n" +
				"	RUC = ?, " + "\n" +
				"	NUMERO_CUENTA = ?, " + "\n" +
				"	DIRECCION_CALLE = ?, " + "\n" +
				"	DIRECCION_DISTRITO = ?, " + "\n" +
				"	DIRECCION_DEPARTAMENTO = ?, " + "\n" +
				"	DIRECCION_COMPLEMENTO = ?, " + "\n" +
				"	TELEFONO = ? " + "\n" +
				"WHERE " + "\n" +
				"	ID_PROVEEDOR_CLIENTE = ?";
	var table = [req.body.RUC,
				req.body.NUMERO_CUENTA,
				req.body.DIRECCION_CALLE,
				req.body.DIRECCION_DISTRITO,
				req.body.DIRECCION_DEPARTAMENTO,
				req.body.DIRECCION_COMPLEMENTO,
				req.body.TELEFONO,
				req.body.ID_PROVEEDOR_CLIENTE];
	query = mysql.format(query, table);
	dateGeneratorO.printUpdate(query);
	mysqlConnection.query(query, function(err) {
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

router.delete("/:id_proveedor_cliente", function (req, res) {
	dateGeneratorO.printDelete("/:id_proveedor_cliente");
	var query = "DELETE FROM" + "\n" +
				"	PROVEEDOR_CLIENTE" + "\n" +
				"WHERE " + "\n" +
				"	ID_PROVEEDOR_CLIENTE = ?";
	var table = [req.params.id_proveedor_cliente];
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
				"Message": "Categoria deleted: " + req.params.id_proveedor_cliente
			});
		}
	});
});

exports.router = router;
