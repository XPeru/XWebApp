/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("accesousuarioDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list", cf( async(req) => {
	dateGeneratorO.printSelect("list");
	var query = "CALL SP_SEARCH_ALL('ACCESO_USUARIO')";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		AccesosUsuario: rows[0]
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
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
				"   ACCESO_USUARIO " + "\n" +
				"SET " + "\n" +
				"   DESCRIPCION = ? " + "\n" +
				"WHERE " + "\n" +
				"   ID_ACCESO_USUARIO = ?";
	var table = [req.body.DESCRIPCION, req.body.ID_ACCESO_USUARIO];
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

router.get("/:id_acceso_usuario", cf( async(req) => {
	dateGeneratorO.printSelect("/:id_acceso_usuario");
	var query = "CALL SP_SEARCH('ACCESO_USUARIO','ID_ACCESO_USUARIO',?)";
	var table = [req.params.id_acceso_usuario];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		AccesoUsuario: rows[0]
	};
	connection.release();
	return result;
}));

router.delete("/:id_acceso_usuario", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_acceso_usuario");
	var query = "DELETE FROM " + "\n" +
				"   ACCESO_USUARIO " + "\n" +
				"WHERE " + "\n" +
				"   ID_ACCESO_USUARIO=?";
	var table = [req.params.id_acceso_usuario];
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
