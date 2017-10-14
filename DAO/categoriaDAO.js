/* global mySqlPool, mysql, cf */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("categoriaDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", cf( async(req) => {
	dateGeneratorO.printSelect("/list");
	var query = "CALL SP_SEARCH_ALL('CATEGORIA')";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Categorias: rows[0]
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
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
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
	Message: "OK"
	};
	connection.release();
	return result;
}));

router.delete("/:id_categoria", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_categoria");
	var query = "DELETE FROM" + "\n" +
				"	CATEGORIA" + "\n" +
				"WHERE " + "\n" +
				"	ID_CATEGORIA = ?";
	var table = [req.params.id_categoria];
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
