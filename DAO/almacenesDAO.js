var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "almacenesDAO";
function almacenesDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + "\n" + data);
}

almacenesDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/almacen";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT " + "\n" +
					"	* " + "\n" +
					"FROM " + "\n" +
					"	ALMACEN";
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
					"Almacenes": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post");
		var query = "INSERT INTO " + "\n" + "\n" +
					"	ALMACEN (" + "\n" +
					"		CODIGO," + "\n" +
					"		UBICACION" + "\n" +
					"	)" + "\n" +
					"VALUES (" + "\n" +
					"	?, " + "\n" +
					"	?" + "\n" +
					")";
		var table = [req.body.CODIGO,
					req.body.UBICACION];
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
					"Message": "Articulo Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		printRequest(urlBase + " put");
		var query = "UPDATE" + "\n" +
					"	ALMACEN " + "\n" +
					"SET" + "\n" +
					"	CODIGO = ?, " + "\n" +
					"	UBICACION = ? " + "\n" +
					"WHERE " + "\n" +
					"	ID_ALMACEN = ?";
		var table = [req.body.CODIGO, req.body.UBICACION, req.body.ID_ALMACEN];
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
					"Message": "Almacen detalle updated !"
				});
			}
		});
	});

	router.delete(urlBase + "/:id_almacen", function(req, res) {
		printRequest(urlBase + "/:id_almacen", " delete");
		var query = "DELETE FROM" + "\n" +
					"	ALMACEN" + "\n" +
					"WHERE " + "\n" +
					"	ID_ALMACEN = ?";
		var table = [req.params.id_almacen];
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
					"Message": "Almacen deleted: " + req.params.id_almacen
				});
			}
		});
	});
};


module.exports = almacenesDAO;