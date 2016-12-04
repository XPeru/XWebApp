var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "tipoPersonaDAO";
function tipoPersonaDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data, color) {
	dateGenerator.printInfo(daoName + "\n" + data, color);
}


tipoPersonaDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/tipopersona";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT " + "\n" +
					"	* " + "\n" +
					"FROM " + "\n" +
					"	TIPO_PERSONA";
		var table = [];
		query = mysql.format(query, table);
		printRequest(query);
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
					"TipoPersona": rows
				});
			}
		});
	});

	router.get(urlBase + "/:desc", function(req, res) {
		printRequest(urlBase + " get", "cyan");
		var query = "SELECT " + "\n" +
					"	* " + "\n" +
					"FROM " + "\n" +
					"	TIPO_PERSONA" + "\n" +
					"WHERE" + "\n" +
					"	DESCRIPCION = ?";
		var table = [req.params.desc];
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
					"TipoPersona": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post", "magenta");
		var query = "INSERT INTO " + "\n" +
					"	TIPO_PERSONA (" + "\n" +
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
					"	TIPO_PERSONA " + "\n" +
					"SET" + "\n" +
					"	DESCRIPCION = ? " + "\n" +
					"WHERE " + "\n" +
					"	ID_TIPO_PERSONA = ?";
		var table = [req.body.DESCRIPCION,
					req.body.ID_TIPO_PERSONA];
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

	router.delete(urlBase + "/:id_tipopersona", function(req, res) {
		printRequest(urlBase + "/:id_tipopersona" + " delete", "yellow");
		var query = "DELETE FROM" + "\n" +
					"	TIPO_PERSONA" + "\n" +
					"WHERE " + "\n" +
					"	ID_TIPO_PERSONA = ?";
		var table = [req.params.id_tipopersona];
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
					"Message": "Categoria deleted: " + req.params.id_tipopersona
				});
			}
		});
	});
};

module.exports = tipoPersonaDAO;