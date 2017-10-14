/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("estadoDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", cf( async(req) => {
	dateGeneratorO.printSelect("list");
	var query = "CALL SP_SEARCH_ALL('ESTADO')";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Estado: rows[0],
		Error: false,
		Message: "Success"
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
	dateGeneratorO.printInsert();
	var query = "INSERT INTO " + "\n" +
				"	ESTADO (" + "\n" +
				"		DESCRIPCION" + "\n" +
				"	)" + "\n" +
				"VALUES (" + "\n" +
				"		?" + "\n" +
				"	)";
	var table = [req.body.DESCRIPCION];
	query = mysql.format(query, table);
	dateGeneratorO.printInsert(query);
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Error: false,
		Message: "Categoria Added !"
	};
	connection.release();
	return result;
}));

router.put("/", cf( async(req) => {
	dateGeneratorO.printUpdate();
	var query = "UPDATE" + "\n" +
				"	ESTADO " + "\n" +
				"SET " + "\n" +
				"	DESCRIPCION = ? " + "\n" +
				"WHERE" + "\n" +
				"	ID_ESTADO = ?";
	var table = [req.body.DESCRIPCION,
				req.body.ID_ESTADO];
	query = mysql.format(query, table);
	dateGeneratorO.printUpdate(query);
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Error: false,
		Message: "Categoria detalle updated !"
	};
	connection.release();
	return result;
}));

router.delete("/:id_estado", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_estado");
	var query = "DELETE FROM " + "\n" +
				"	ESTADO " + "\n" +
				"WHERE " + "\n" +
				"	ID_ESTADO = ?";
	var table = [req.params.id_estado];
	query = mysql.format(query, table);
	dateGeneratorO.printDelete(query);
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Error: false,
		Message: "Categoria deleted: " + req.params.id_estado
	};
	connection.release();
	return result;
}));

exports.router = router;
