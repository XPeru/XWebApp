var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "personaDAO";
function personaDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + "\n" + data);
}

personaDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "PROVEEDOR_CLIENTE";
	var urlBase = "/persona";
	router.get(urlBase + "list" + "/:desc", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT " + "\n" +
					"	pc.ID_PROVEEDOR_CLIENTE, " + "\n" +
					"	pc.NOMBRE, " + "\n" +
					"	pc.EMAIL, " + "\n" +
					"	pc.RUC, " + "\n" +
					"	pc.NUMERO_CUENTA, " + "\n" +
					"	pc.DIRECCION_CALLE, " + "\n" +
					"	pc.DIRECCION_DISTRITO, " + "\n" +
					"	pc.DIRECCION_DEPARTAMENTO, " + "\n" +
					"	pc.DIRECCION_COMPLEMENTO, " + "\n" +
					"	pc.TELEFONO, " + "\n" +
					"	pc.FK_TIPO_PERSONA " + "\n" +
					"FROM" + "\n" +
					"	TIPO_PERSONA tipo " + "\n" +
					"INNER JOIN PROVEEDOR_CLIENTE pc ON " + "\n" +
					"	pc.FK_TIPO_PERSONA = tipo.ID_TIPO_PERSONA " + "\n" +
					"WHERE" + "\n" +
					"	tipo.DESCRIPCION = ?";
		var table = [req.params.desc];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.info("\n" + 'Error executing MySQL query:' + query);
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
					"Persona": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post");
		var query = "INSERT INTO " + "\n" +
					"	PROVEEDOR_CLIENTE (" + "\n" +
					"		NOMBRE," + "\n" +
					"		EMAIL," + "\n" +
					"		RUC," + "\n" +
					"		NUMERO_CUENTA," + "\n" +
					"		DIRECCION_CALLE," + "\n" +
					"		DIRECCION_DISTRITO," + "\n" +
					"		DIRECCION_DEPARTAMENTO," + "\n" +
					"		DIRECCION_COMPLEMENTO," + "\n" +
					"		TELEFONO," + "\n" +
					"		FK_TIPO_PERSONA" + "\n" +
					"	) VALUES (" + "\n" +
					"		?," + "\n" +
					"		?," + "\n" +
					"		?," + "\n" +
					"		?," + "\n" +
					"		?," + "\n" +
					"		?," + "\n" +
					"		?," + "\n" +
					"		?," + "\n" +
					"		?," + "\n" +
					"		?" + "\n" +
					"	)";
		var table = [req.body.NOMBRE,
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
				console.info('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Persona Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		printRequest(urlBase + " put");
		var query = "UPDATE " + "\n" +
					"	PROVEEDOR_CLIENTE" + "\n" +
					"SET" + "\n" +
					"	RUC = ?, " + "\n" +
					"	NUMERO_CUENTA = ?, " + "\n" +
					"	DIRECCION_CALLE = ?, " + "\n" +
					"	DIRECCION_DISTRITO = ?, " + "\n" +
					"	DIRECCION_DEPARTAMENTO = ?, " + "\n" +
					"	DIRECCION_COMPLEMENTO = ?, " + "\n" +
					"	TELEFONO = ? " + "\n" +
					"WHERE " + "\n" +
					"	ID_PROVEEDOR_CLIENTE = ?";
		var table = [req.body.RUC,
					req.body.NUMERO_CUENTA,
					req.body.DIRECCION_CALLE,
					req.body.DIRECCION_DISTRITO,
					req.body.DIRECCION_DEPARTAMENTO,
					req.body.DIRECCION_COMPLEMENTO,
					req.body.TELEFONO,
					req.body.ID_PROVEEDOR_CLIENTE];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:'  + query);
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

	router.delete(urlBase + "/:id_proveedor_cliente", function(req, res) {
		printRequest(urlBase + "/:id_proveedor_cliente", " delete");
		var query = "DELETE FROM" + "\n" +
					"	PROVEEDOR_CLIENTE" + "\n" +
					"WHERE " + "\n" +
					"	ID_PROVEEDOR_CLIENTE = ?";
		var table = [req.params.id_proveedor_cliente];
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
					"Message": "Categoria deleted: " + req.params.id_proveedor_cliente
				});
			}
		});
	});
};

module.exports = personaDAO;
