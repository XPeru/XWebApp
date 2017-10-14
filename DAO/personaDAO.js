/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("personaDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list/:desc", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Persona: rows
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
			Message: "OK"
	};
	connection.release();
	return result;
}));

router.delete("/:id_proveedor_cliente", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_proveedor_cliente");
	var query = "DELETE FROM" + "\n" +
				"	PROVEEDOR_CLIENTE" + "\n" +
				"WHERE " + "\n" +
				"	ID_PROVEEDOR_CLIENTE = ?";
	var table = [req.params.id_proveedor_cliente];
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

exports.router = router;
