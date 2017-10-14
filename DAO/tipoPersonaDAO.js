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
	connection.release();
	return result;
}));

router.get("/:desc", cf( async(req) => {
	dateGeneratorO.printSelect("");
	var query = "CALL SP_SEARCH_STRING('TIPO_PERSONA','DESCRIPCION',?)";
	var table = [req.params.desc];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		TipoPersona: rows[0]
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
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
				"	TIPO_PERSONA " + "\n" +
				"SET" + "\n" +
				"	DESCRIPCION = ? " + "\n" +
				"WHERE " + "\n" +
				"	ID_TIPO_PERSONA = ?";
	var table = [req.body.DESCRIPCION,
				req.body.ID_TIPO_PERSONA];
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

router.delete("/:id_tipopersona", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_tipopersona");
	var query = "DELETE FROM" + "\n" +
				"	TIPO_PERSONA" + "\n" +
				"WHERE " + "\n" +
				"	ID_TIPO_PERSONA = ?";
	var table = [req.params.id_tipopersona];
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
