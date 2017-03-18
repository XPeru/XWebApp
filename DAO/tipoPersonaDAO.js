var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("tipoPersonaDAO");
function tipoPersonaDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGeneratorO.printStart();
}

tipoPersonaDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/tipopersona";
	router.get(urlBase + "list", function(req, res) {
		dateGeneratorO.printInfo(urlBase + "list" + " get");
		var query = "CALL SP_SEARCH_ALL('TIPO_PERSONA')";
		var table = [];
		query = mysql.format(query, table);
		dateGeneratorO.printInfo(query);
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
					"TipoPersona": rows[0]
				});
			}
		});
	});

	router.get(urlBase + "/:desc", function(req, res) {
		dateGeneratorO.printInfo(urlBase + " get", "cyan");
		var query = "CALL SP_SEARCH_STRING('TIPO_PERSONA','DESCRIPCION',?)";
		var table = [req.params.desc];
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
					"TipoPersona": rows[0]
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		dateGeneratorO.printInfo(urlBase + " post", "magenta");
		var query = "INSERT INTO " + "\n" +
					"	TIPO_PERSONA (" + "\n" +
					"		DESCRIPCION" + "\n" +
					"	)" + "\n" +
					"VALUES (" + "\n" +
					"	?" + "\n" +
					")";
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
					"	TIPO_PERSONA " + "\n" +
					"SET" + "\n" +
					"	DESCRIPCION = ? " + "\n" +
					"WHERE " + "\n" +
					"	ID_TIPO_PERSONA = ?";
		var table = [req.body.DESCRIPCION,
					req.body.ID_TIPO_PERSONA];
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

	router.delete(urlBase + "/:id_tipopersona", function(req, res) {
		dateGeneratorO.printInfo(urlBase + "/:id_tipopersona" + " delete", "yellow");
		var query = "DELETE FROM" + "\n" +
					"	TIPO_PERSONA" + "\n" +
					"WHERE " + "\n" +
					"	ID_TIPO_PERSONA = ?";
		var table = [req.params.id_tipopersona];
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
					"Message": "Categoria deleted: " + req.params.id_tipopersona
				});
			}
		});
	});
};

module.exports = tipoPersonaDAO;