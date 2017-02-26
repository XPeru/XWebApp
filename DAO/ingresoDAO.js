var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "ingresoDAO";
function ingresoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data, color) {
	dateGenerator.printInfo(daoName + "\n" + data, color);
}

ingresoDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/ingreso";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get", "cyan");
		var query ="SELECT " + "\n" +
					"	ing.ID_INGRESO, " + "\n" +
					"	ing.CODE_INGRESO, " + "\n" +
					"	ing.COSTO_TOTAL, " + "\n" +
					"	ing.FK_CREATE_USUARIO, " + "\n" +
					"	CONCAT(us.NOMBRE,' ', us.APELLIDOS) AS CREATE_USUARIO, " + "\n" +
					"	ing.CREATE_TIME, " + "\n" +
					"	ing.FK_UPDATE_USUARIO, " + "\n" +
					"	CONCAT(us2.NOMBRE,' ', us2.APELLIDOS) AS UPDATE_USUARIO, " + "\n" +
					"	ing.UPDATE_TIME, " + "\n" +
					"	ing.FK_PROVEEDOR, " + "\n" +
					"	cp.NOMBRE AS NOMBRE_PROVEEDOR, " + "\n" +
					"	ing.FK_TIPO_DOCUMENTO, " + "\n" +
					"	tdoc.DESCRIPCION," + "\n" +
					"	ing.FECHA_INGRESO" + "\n" +
					"FROM " + "\n" +
					"	INGRESO ing " + "\n" +
					"INNER JOIN USUARIO us ON " + "\n" +
					"	us.ID_USUARIO = ing.FK_CREATE_USUARIO " + "\n" +
					"LEFT JOIN USUARIO us2 ON " + "\n" +
					"	us2.ID_USUARIO = ing.FK_UPDATE_USUARIO " + "\n" +
					"INNER JOIN PROVEEDOR_CLIENTE cp ON " + "\n" +
					"	cp.ID_PROVEEDOR_CLIENTE = ing.FK_PROVEEDOR " + "\n" +
					"INNER JOIN TIPO_DOCUMENTO tdoc ON " + "\n" +
					"	tdoc.ID_TIPO_DOCUMENTO = ing.FK_TIPO_DOCUMENTO";
		var table = [];
		query = mysql.format(query, table);
		printRequest(query, "cyan");
		connection.query(query, function(err, rows) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Success",
					"Ingreso": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post", "magenta");
		var query = "INSERT INTO " + "\n" +
					"	INGRESO (" + "\n" +
					"		CODE_INGRESO," + "\n" +
					"		COSTO_TOTAL," + "\n" +
					"		FK_CREATE_USUARIO," + "\n" +
					"		CREATE_TIME," + "\n" +
					"		FK_PROVEEDOR," + "\n" +
					"		FK_TIPO_DOCUMENTO," + "\n" +
					"		FECHA_INGRESO" + "\n" +
					"	)" + "\n" + 
					"VALUES (" + "\n" +
					"	?," + "\n" +
					"	?," + "\n" +
					"	?," + "\n" +
					"	CURRENT_TIMESTAMP," + "\n" + // use CURDATE() for current date
					"	?," + "\n" +
					"	?," + "\n" +
					"	STR_TO_DATE(?, '%m/%d/%Y')" + "\n" +
					")";
		var table = [
					req.body.CODE_INGRESO,
					0,
					1, // here should be req.body.FK_CREATE_USUARIO
					req.body.FK_PROVEEDOR,
					req.body.FK_TIPO_DOCUMENTO,
					req.body.FECHA_INGRESO];
		query = mysql.format(query, table);
		printRequest(query, "magenta");
		connection.query(query, function(err) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Categoria Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		printRequest(urlBase + " put", "magenta");
		var query = "UPDATE " + "\n" +
					"	INGRESO " + "\n" +
					"SET " + "\n" +
					"	COSTO_TOTAL = ?," + "\n" +
					"	FECHA_INGRESO = STR_TO_DATE(?, '%m/%d/%Y')," + "\n" +
					"	UPDATE_TIME = CURRENT_TIMESTAMP" + "\n" +
					"WHERE" + "\n" +
					"	ID_INGRESO = ?";
		var table = [
					req.body.COSTO_TOTAL, 
					req.body.FECHA_INGRESO,
					req.body.ID_INGRESO];
		query = mysql.format(query, table);
		printRequest(query, "magenta");
		connection.query(query, function(err) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Categoria detalle updated !"
				});
			}
		});
	});

	router.delete(urlBase + "/:id_ingreso", function(req, res) {
		printRequest(urlBase + "/:id_ingreso" + " delete", "yellow");
		var query = "DELETE FROM" + "\n" +
					"	INGRESO" + "\n" +
					"WHERE " + "\n" +
					"	ID_INGRESO = ?";
		var table = [req.params.id_ingreso];
		query = mysql.format(query, table);
		printRequest(query, "yellow");
		connection.query(query, function(err) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Categoria deleted: " + req.params.id_ingreso
				});
			}
		});
	});

	var urlBaseDetalle = urlBase + "detalle";
	router.get(urlBaseDetalle + "list" + "/:id_ingreso", function(req, res) {
		printRequest(urlBase + "detallelist" + "/:id_ingreso", "cyan");
		var query ="SELECT " + "\n" +
					"	ding.ID_DETALLE_INGRESO, " + "\n" +
					"	ding.CANTIDAD, " + "\n" +
					"	ding.PRECIO, " + "\n" +
					"	ding.FK_ARTICULO AS ID_ARTICULO, " + "\n" +
					"	art.CODIGO AS CODIGO_ARTICULO, " + "\n" +
					"	art.PRECIO_UNITARIO, " + "\n" +
					"	art.IMAGEN, " + "\n" +
					"	ding.FK_ALMACEN AS ID_ALMACEN, " + "\n" +
					"	alm.CODIGO AS CODIGO_ALMACEN" + "\n" +
					"FROM " + "\n" +
					"	DETALLE_INGRESO ding " + "\n" +
					"INNER JOIN ARTICULO art ON " + "\n" +
					"	art.ID_ARTICULO = ding.FK_ARTICULO " + "\n" +
					"INNER JOIN ALMACEN alm ON " + "\n" +
					"	alm.ID_ALMACEN = ding.FK_ALMACEN " + "\n" +
					"WHERE" + "\n" +
					"	ding.FK_INGRESO = ? AND" + "\n" +
					"	ding.IS_ACTIVE = 1";
		var table = [req.params.id_ingreso];
		query = mysql.format(query, table);
		printRequest(query, "cyan");
		connection.query(query, function(err, rows) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Success",
					"DetalleIngreso": rows
				});
			}
		});
	});
};

module.exports = ingresoDAO;