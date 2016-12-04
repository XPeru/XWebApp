var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "tipoDocumentoDAO";
function tipoDocumentoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data, color) {
	dateGenerator.printInfo(daoName + "\n" + data, color);
}


tipoDocumentoDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/tipodocumento";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get", "cyan");
		var query = "SELECT " + "\n" +
					"	* " + "\n" +
					"FROM " + "\n" +
					"	TIPO_DOCUMENTO";
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
					"TipoDocumento": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post", "magenta");
		var query = "INSERT INTO " + "\n" +
					"	TIPO_DOCUMENTO (" + "\n" +
					"		DESCRIPCION" + "\n" +
					"	)" + "\n" +
					"VALUES (" + "\n" +
					"	?" + "\n" +
					")";
		var table = [req.body.DESCRIPCION];
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
		var query = "UPDATE" + "\n" +
					"	TIPO_DOCUMENTO " + "\n" +
					"SET" + "\n" +
					"	DESCRIPCION = ? " + "\n" +
					"WHERE " + "\n" +
					"	ID_TIPO_DOCUMENTO = ?";
		var table = [req.body.DESCRIPCION,
					req.body.ID_TIPO_DOCUMENTO];
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

	router.delete(urlBase + "/:id_tipodocumento", function(req, res) {
		printRequest(urlBase + "/:id_tipodocumento" + " delete", "yellow");
		var query = "DELETE FROM" + "\n" +
					"	TIPO_DOCUMENTO" + "\n" +
					"WHERE " + "\n" +
					"	ID_TIPO_DOCUMENTO = ?";
		var table = [req.params.id_tipodocumento];
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
					"Message": "Categoria deleted: " + req.params.id_tipodocumento
				});
			}
		});
	});
};

module.exports = tipoDocumentoDAO;