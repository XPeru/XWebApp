var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "ingresoDAO";
function ingresoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + "\n" + data);
}


ingresoDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/ingreso";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
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
					"	tdoc.DESCRIPCION" + "\n" +
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
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Success",
					"Ingreso": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post");
		var query = "INSERT INTO " + "\n" +
					"	INGRESO (" + "\n" +
					"		CODE_INGRESO," + "\n" +
					"		COSTO_TOTAL," + "\n" +
					"		FK_CREATE_USUARIO," + "\n" +
					"		CREATE_TIME," + "\n" +
					"		FK_PROVEEDOR," + "\n" +
					"		FK_TIPO_DOCUMENTO" + "\n" +
					"	)" + "\n" + 
					"VALUES (" + "\n" +
					"	?," + "\n" +
					"	?," + "\n" +
					"	?," + "\n" +
					"	CURRENT_TIMESTAMP," + "\n" +
					"	?," + "\n" +
					"	?" + "\n" +
					")";
		var table = [
					req.body.CODE_INGRESO,
					0,
					1, // here should be req.body.FK_CREATE_USUARIO
					req.body.FK_PROVEEDOR,
					req.body.FK_TIPO_DOCUMENTO];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Categoria Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		printRequest(urlBase + " put");
		var query = "UPDATE " + "\n" +
					"	INGRESO " + "\n" +
					"SET " + "\n" +
					"	COSTO_TOTAL = ?" + "\n" +
					"WHERE" + "\n" +
					"	ID_INGRESO = ?";
		var table = [
					req.body.COSTO_TOTAL, 
					req.body.ID_INGRESO];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Categoria detalle updated !"
				});
			}
		});
	});

	router.delete(urlBase + "/:id_ingreso", function(req, res) {
		printRequest(urlBase + "/:id_ingreso", " delete");
		var query = "DELETE FROM" + "\n" +
					"	INGRESO" + "\n" +
					"WHERE " + "\n" +
					"	ID_INGRESO = ?";
		var table = [req.params.id_ingreso];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Categoria deleted: " + req.params.id_ingreso
				});
			}
		});
	});
};

module.exports = ingresoDAO;