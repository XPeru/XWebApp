var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("almacenesDAO");

function almacenesDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGeneratorO.printStart();
}

almacenesDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/almacen";
	router.get(urlBase + "list", function(req, res) {
		dateGeneratorO.printInfo(urlBase + "list" + " get", "cyan");
		var query = "CALL SP_SEARCH_ALL('ALMACEN')";
		var table = [];
		query = mysql.format(query, table);
		dateGeneratorO.printInfo(query, "cyan");
		connection.query(query, function(err, rows) {
			if (err) {
				dateGeneratorO.printInfo('Error executing MySQL query:' + query, "red");
				dateGeneratorO.printInfo(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printInfo('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Success",
					"Almacenes": rows[0]
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		dateGeneratorO.printInfo(urlBase + " post", "magenta");
		var query = "INSERT INTO " + "\n" +
					"	ALMACEN (" + "\n" +
					"		CODIGO_ALMACEN," + "\n" +
					"		UBICACION" + "\n" +
					"	)" + "\n" +
					"VALUES (" + "\n" +
					"	?, " + "\n" +
					"	?" + "\n" +
					")";
		var table = [req.body.CODIGO_ALMACEN,
					req.body.UBICACION];
		query = mysql.format(query, table);
		dateGeneratorO.printInfo(query, "magenta");
		connection.query(query, function(err) {
			if (err) {
				dateGeneratorO.printInfo('Error executing MySQL query:' + query, "red");
				dateGeneratorO.printInfo(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printInfo('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Articulo Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		dateGeneratorO.printInfo(urlBase + " put", "magenta");
		var query = "UPDATE" + "\n" +
					"	ALMACEN " + "\n" +
					"SET" + "\n" +
					"	CODIGO_ALMACEN = ?, " + "\n" +
					"	UBICACION = ? " + "\n" +
					"WHERE " + "\n" +
					"	ID_ALMACEN = ?";
		var table = [req.body.CODIGO_ALMACEN, req.body.UBICACION, req.body.ID_ALMACEN];
		query = mysql.format(query, table);
		dateGeneratorO.printInfo(query, "magenta");
		connection.query(query, function(err) {
			if (err) {
				dateGeneratorO.printInfo('Error executing MySQL query:' + query, "red");
				dateGeneratorO.printInfo(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printInfo('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Almacen detalle updated !"
				});
			}
		});
	});

	router.delete(urlBase + "/:id_almacen", function(req, res) {
		dateGeneratorO.printInfo(urlBase + "/:id_almacen" + " delete", "yellow");
		var query = "DELETE FROM" + "\n" +
					"	ALMACEN" + "\n" +
					"WHERE " + "\n" +
					"	ID_ALMACEN = ?";
		var table = [req.params.id_almacen];
		query = mysql.format(query, table);
		dateGeneratorO.printInfo(query, "yellow");
		connection.query(query, function(err) {
			if (err) {
				dateGeneratorO.printInfo('Error executing MySQL query:' + query, "red");
				dateGeneratorO.printInfo(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printInfo('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Almacen deleted: " + req.params.id_almacen
				});
			}
		});
	});
};


module.exports = almacenesDAO;