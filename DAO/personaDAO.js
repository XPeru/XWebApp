var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "personaDAO";
function personaDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + " " + data);
}


personaDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "PROVEEDOR_CLIENTE";
	var tableTipo = "TIPO_PERSONA";
	var urlBase = "/persona";
	router.get(urlBase + "list" + "/:desc", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT pc.ID_PROVEEDOR_CLIENTE, pc.NOMBRE, pc.EMAIL, pc.RUC, pc.NUMERO_CUENTA, pc.DIRECCION_CALLE, pc.DIRECCION_DISTRITO, pc.DIRECCION_DEPARTAMENTO, pc.DIRECCION_COMPLEMENTO, pc.TELEFONO, pc.FK_TIPO_PERSONA FROM ?? tipo INNER JOIN ?? pc ON ?? = ?? WHERE ?? = ?";
		var table = [tableTipo, tableName, "pc.FK_TIPO_PERSONA", "tipo.ID_TIPO_PERSONA", "tipo.DESCRIPCION", req.params.desc];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Success",
					"Persona": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post");
		var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		var table = [tableName,
					"NOMBRE",
					"EMAIL",
					"RUC",
					"NUMERO_CUENTA",
					"DIRECCION_CALLE",
					"DIRECCION_DISTRITO",
					"DIRECCION_DEPARTAMENTO",
					"DIRECCION_COMPLEMENTO",
					"TELEFONO",
					"FK_TIPO_PERSONA",
					req.body.NOMBRE,
					req.body.EMAIL,
					req.body.RUC,
					req.body.NUMERO_CUENTA,
					req.body.DIRECCION_CALLE,
					req.body.DIRECCION_DISTRITO,
					req.body.DIRECCION_DEPARTAMENTO,
					req.body.DIRECCION_COMPLEMENTO,
					req.body.TELEFONO,
					req.body.FK_TIPO_PERSONA];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query: ' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Persona Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		printRequest(urlBase + " put");
		var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
		var table = [tableName,
					"RUC",
					req.body.RUC,
					"NUMERO_CUENTA",
					req.body.NUMERO_CUENTA,
					"DIRECCION_CALLE",
					req.body.DIRECCION_CALLE,
					"DIRECCION_DISTRITO",
					req.body.DIRECCION_DISTRITO,
					"DIRECCION_DEPARTAMENTO",
					req.body.DIRECCION_DEPARTAMENTO,
					"DIRECCION_COMPLEMENTO",
					req.body.DIRECCION_COMPLEMENTO,
					"TELEFONO",
					req.body.TELEFONO,
					"ID_PROVEEDOR_CLIENTE",
					req.body.ID_PROVEEDOR_CLIENTE];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
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

	router.delete(urlBase + "/:id_proveedor_cliente", function(req, res) {
		printRequest(urlBase + "/:id_proveedor_cliente", " delete");
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = [tableName, "ID_PROVEEDOR_CLIENTE", req.params.id_proveedor_cliente];
		query = mysql.format(query, table);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Categoria deleted: " + req.params.id_proveedor_cliente
				});
			}
		});
	});
};

module.exports = personaDAO;
