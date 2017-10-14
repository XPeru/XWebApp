/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("asoctipoaccesoDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/:id_tipo_usuario", cf( async(req) => {
	dateGeneratorO.printSelect("/:id_tipo_usuario");
	var query = "SELECT " + "\n" +
				"	acc.ID_ACCESO_USUARIO, " + "\n" +
				"	acc.DESCRIPCION" + "\n" +
				"FROM " + "\n" +
				"	ASOC_TIPO_ACCESO asso " + "\n" +
				"INNER JOIN ACCESO_USUARIO acc ON " + "\n" +
				"	acc.ID_ACCESO_USUARIO = asso.FK_ACCESO_USUARIO" + "\n" +
				"WHERE" + "\n" +
				"	asso.FK_TIPO_USUARIO = ?";
	var table = [req.params.id_tipo_usuario];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Assos: rows
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"	ASOC_TIPO_ACCESO (" + "\n" +
				"		FK_TIPO_USUARIO, " + "\n" +
				"		FK_ACCESO_USUARIO, " + "\n" +
				"		IS_ACTIVE" + "\n" +
				"	) VALUES";
	var idTipoUsuario = req.body.ID_TIPO_USUARIO;
	var end_query = "\n" + " (?, ?, ?)";
	var table = req.body.LIST.reduce(function (tabla, record) {
										query = query + end_query + ",";
										tabla.push(idTipoUsuario, record.ID_ACCESO_USUARIO, 1);
										return tabla;
									}, []);
	query = mysql.format(query.slice(0, -1), table);
	dateGeneratorO.printInsert(query);
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
			Message: "OK"
	};
	connection.release();
	return result;
}));

router.delete( "/:id_tipo_usuario", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_tipo_usuario");
	var query = "DELETE FROM" + "\n" +
				"	ASOC_TIPO_ACCESO" + "\n" +
				"WHERE " + "\n" +
				"	FK_TIPO_USUARIO = ?";
	var table = [req.params.id_tipo_usuario];
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
