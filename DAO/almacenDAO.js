/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("almacenDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", cf( async(req) => {
	dateGeneratorO.printSelect("list");
	var query = "CALL SP_SEARCH_ALL('ALMACEN')";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Almacenes: rows[0]
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Message: "OK"
	};
	connection.release();
	return result;
}));

router.put("/", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Message: "OK"
	};
	connection.release();
	return result;
}));

router.delete("/:id_almacen", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_almacen");
	var query = "DELETE FROM" + "\n" +
				"	ALMACEN" + "\n" +
				"WHERE " + "\n" +
				"	ID_ALMACEN = ?";
	var table = [req.params.id_almacen];
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
