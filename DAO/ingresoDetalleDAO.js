/* global mySqlPool, mysql */
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("ingresoDetalleDAO");
var router = require("express").Router();

dateGeneratorO.printStart();

router.get("/list/:id_ingreso", cf( async(req) => {
	dateGeneratorO.printSelect("list/:id_ingreso");
	var query = "SELECT " + "\n" +
				"	ding.ID_DETALLE_INGRESO, " + "\n" +
				"	ding.CANTIDAD, " + "\n" +
				"	ding.PRECIO, " + "\n" +
				"	ding.FK_ARTICULO AS ID_ARTICULO, " + "\n" +
				"	art.CODIGO_ARTICULO, " + "\n" +
				"	art.PRECIO_UNITARIO, " + "\n" +
				"	art.IMAGEN, " + "\n" +
				"	art.UNIDAD, " + "\n" +
				"	cat.DESCRIPCION as CATEGORIA, " + "\n" +
				"	ding.FK_ALMACEN AS ID_ALMACEN, " + "\n" +
				"	alm.CODIGO_ALMACEN" + "\n" +
				"FROM " + "\n" +
				"	DETALLE_INGRESO ding " + "\n" +
				"INNER JOIN ARTICULO art ON " + "\n" +
				"	art.ID_ARTICULO = ding.FK_ARTICULO " + "\n" +
				"INNER JOIN ALMACEN alm ON " + "\n" +
				"	alm.ID_ALMACEN = ding.FK_ALMACEN " + "\n" +
				"INNER JOIN CATEGORIA cat ON " + "\n" +
				"	cat.ID_CATEGORIA = art.FK_CATEGORIA" + "\n" +
				"WHERE" + "\n" +
				"	ding.FK_INGRESO = ? AND" + "\n" +
				"	ding.IS_ACTIVE = 1";
	var table = [req.params.id_ingreso];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		DetalleIngreso: rows
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"	DETALLE_INGRESO (" + "\n" +
				"		CANTIDAD, " + "\n" +
				"		PRECIO, " + "\n" +
				"		IS_ACTIVE, " + "\n" +
				"		FK_INGRESO, " + "\n" +
				"		FK_ARTICULO, " + "\n" +
				"		FK_ALMACEN" + "\n" +
				"	) VALUES";
	var idIngreso = req.body.ID_INGRESO;
	var end_query = "\n" + " (?, ?, ?, ?, ?, ?)";
	var table = req.body.LIST.reduce(function(tabla, record) {
										query = query + end_query + ",";
										tabla.push(record.CANTIDAD,
													record.PRECIO_UNITARIO,
													1,
													idIngreso,
													record.ID_ARTICULO,
													record.ID_ALMACEN);
										return tabla;
									}, []);
	query = mysql.format(query.slice(0, -1), table);
	dateGeneratorO.printInsert(query);

	var final_query = "CALL SP_INSERT_DETALLE('" + query + "', 'INGRESO', " + idIngreso + ")";
	dateGeneratorO.printInsert(final_query);
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
				"	INGRESO " + "\n" +
				"SET " + "\n" +
				"	COSTO_TOTAL = ?," + "\n" +
				"	UPDATE_TIME = CURRENT_TIMESTAMP" + "\n" +
				"WHERE" + "\n" +
				"	ID_INGRESO = ?";
	var table = [
					req.body.COSTO_TOTAL,
					req.body.ID_INGRESO];
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

router.delete("/:id_ingreso", cf( async(req) => {
	dateGeneratorO.printDelete("/:id_ingreso");
	var query = "CALL SP_DELETE_DETALLE('INGRESO'," + req.params.id_ingreso + ")";
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
