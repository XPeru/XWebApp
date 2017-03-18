var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("estadoDAO");
function estadoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGeneratorO.printStart();
}

estadoDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/estado";
	router.get(urlBase + "list", function(req, res) {
		dateGeneratorO.printInfo(urlBase + "list" + " get", "cyan");
		var query = "CALL SP_SEARCH_ALL('ESTADO')";
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
					"Estado": rows[0]
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		dateGeneratorO.printInfo(urlBase + " post", "magenta");
		var query = "INSERT INTO " + "\n" +
					"	ESTADO (" + "\n" +
					"		DESCRIPCION" + "\n" +
					"	)" + "\n" +
					"VALUES (" + "\n" +
					"		?" + "\n" +
					"	)";
		var table = [req.body.DESCRIPCION];
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
					"Message": "Categoria Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		dateGeneratorO.printInfo(urlBase + " put", "magenta");
		var query = "UPDATE" + "\n" +
					"	ESTADO " + "\n" +
					"SET " + "\n" +
					"	DESCRIPCION = ? " + "\n" +
					"WHERE" + "\n" +
					"	ID_ESTADO = ?";
		var table = [req.body.DESCRIPCION,
					req.body.ID_ESTADO];
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
					"Message": "Categoria detalle updated !"
				});
			}
		});
	});

	router.delete(urlBase + "/:id_estado", function(req, res) {
		dateGeneratorO.printInfo(urlBase + "/:id_estado" + " delete", "yellow");
		var query = "DELETE FROM " + "\n" +
					"	ESTADO " + "\n" +
					"WHERE " + "\n" +
					"	ID_ESTADO = ?";
		var table = [req.params.id_estado];
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
					"Message": "Categoria deleted: " + req.params.id_estado
				});
			}
		});
	});
};

module.exports = estadoDAO;