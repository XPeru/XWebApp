/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("tipodocumentoDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", cf( async(req) => {
	dateGeneratorO.printSelect("list");
	var query = "CALL SP_SEARCH_ALL('TIPO_DOCUMENTO')";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		TipoDocumento: rows[0]
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"	TIPO_DOCUMENTO (" + "\n" +
				"		DESCRIPCION" + "\n" +
				"	)" + "\n" +
				"VALUES (" + "\n" +
				"	?" + "\n" +
				")";
	var table = [req.body.DESCRIPCION];
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
				"	TIPO_DOCUMENTO " + "\n" +
				"SET" + "\n" +
				"	DESCRIPCION = ? " + "\n" +
				"WHERE " + "\n" +
				"	ID_TIPO_DOCUMENTO = ?";
	var table = [req.body.DESCRIPCION,
				req.body.ID_TIPO_DOCUMENTO];
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

router.delete("/:id_tipodocumento", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_tipodocumento");
	var query = "DELETE FROM" + "\n" +
				"	TIPO_DOCUMENTO" + "\n" +
				"WHERE " + "\n" +
				"	ID_TIPO_DOCUMENTO = ?";
	var table = [req.params.id_tipodocumento];
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
