var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "ingresoDAO";
function ingresoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + " " + data);
}


ingresoDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "INGRESO";
	var tableUsuario = "USUARIO";
	var tablePersona = "PROVEEDOR_CLIENTE";
	var tableDocumento = "TIPO_DOCUMENTO";
	var urlBase = "/ingreso";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT ??, ??, ??, ??, CONCAT(??,' ', ??) AS CREATE_USUARIO, ??, ??, CONCAT(??,' ', ??) AS UPDATE_USUARIO, ??, ??, ?? AS NOMBRE_PROVEEDOR, ??, ?? FROM ?? ing INNER JOIN ?? us ON ?? = ?? LEFT JOIN ?? us2 ON ?? = ?? INNER JOIN ?? cp ON ?? = ?? INNER JOIN ?? tdoc ON ?? = ??";
		var table = ["ing.ID_INGRESO",
					"ing.CODE_INGRESO",
					"ing.COSTO_TOTAL",
					"ing.FK_CREATE_USUARIO",
					"us.NOMBRE",
					"us.APELLIDOS",
					"ing.CREATE_TIME",
					"ing.FK_UPDATE_USUARIO",
					"us2.NOMBRE",
					"us2.APELLIDOS",
					"ing.UPDATE_TIME",
					"ing.FK_PROVEEDOR",
					"cp.NOMBRE",
					"ing.FK_TIPO_DOCUMENTO",
					"tdoc.DESCRIPCION",
					tableName,
					tableUsuario,
					"ing.FK_CREATE_USUARIO",
					"us.ID_USUARIO",
					tableUsuario,
					"ing.FK_UPDATE_USUARIO",
					"us2.ID_USUARIO",
					tablePersona,
					"ing.FK_PROVEEDOR",
					"cp.ID_PROVEEDOR_CLIENTE",
					tableDocumento,
					"ing.FK_TIPO_DOCUMENTO",
					"tdoc.ID_TIPO_DOCUMENTO"];
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
				console.info('Success MySQL query:' + query);
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
		var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?)";
		var table = [tableName,
					"CODE_INGRESO",
					"COSTO_TOTAL",
					"FK_CREATE_USUARIO",
					"CREATE_TIME",
					"FK_PROVEEDOR",
					"FK_TIPO_DOCUMENTO",
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
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Categoria Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		printRequest(urlBase + " put");
		var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var table = [tableName, "COSTO_TOTAL", req.body.COSTO_TOTAL, "ID_INGRESO", req.body.ID_INGRESO];
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
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Categoria detalle updated !"
				});
			}
		});
	});

	router.delete(urlBase + "/:id_ingreso", function(req, res) {
		printRequest(urlBase + "/:id_ingreso", " delete");
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = [tableName, "ID_INGRESO", req.params.id_ingreso];
		query = mysql.format(query, table);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Categoria deleted: " + req.params.id_ingreso
				});
			}
		});
	});
};

module.exports = ingresoDAO;