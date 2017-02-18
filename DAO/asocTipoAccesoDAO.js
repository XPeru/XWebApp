var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "assocTipoAccesoDAO";

function assocTipoAccesoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data, color) {
	dateGenerator.printInfo(daoName + "\n" + data, color);
}

assocTipoAccesoDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/asoctipoacceso";

	router.get(urlBase + "/:id_tipo_usuario", function(req, res) {
		printRequest(urlBase + "/:id_tipo_usuario" + " GET", "cyan");
		var query = "SELECT " + "\n" +
					"	acc.ID_ACCESO_USUARIO, " + "\n" +
					"	acc.DESCRIPCION" + "\n" +
					"FROM " + "\n" +
					"	ASOC_TIPO_ACCESO asso " + "\n" +
					"INNER JOIN ACCESO_USUARIO acc ON " + "\n" +
					"	acc.ID_ACCESO_USUARIO = asso.FK_ACCESO_USUARIO" + "\n" +
					"WHERE" + "\n" +
					"	asso.FK_TIPO_USUARIO = ?";
		var table = [req.params.id_tipo_usuario];
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
					"Assos": rows
				});
			}
		});
	});

	router.delete(urlBase +  "/:id_tipo_usuario", function(req, res) {
		printRequest(urlBase + "/:id_tipo_usuario" + " delete", "yellow");
		var query = "DELETE FROM" + "\n" +
					"	ASOC_TIPO_ACCESO" + "\n" +
					"WHERE " + "\n" +
					"	FK_TIPO_USUARIO = ?";
		var table = [req.params.id_tipo_usuario];
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
					"Message": "Success"
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post", "magenta");
		var query = "INSERT INTO " + "\n" +
					"	ASOC_TIPO_ACCESO (" + "\n" +
					"		FK_TIPO_USUARIO, " + "\n" +
					"		FK_ACCESO_USUARIO, " + "\n" +
					"		IS_ACTIVE" + "\n" +
					"	) VALUES";
		var idTipoUsuario = req.body.ID_TIPO_USUARIO;
		var end_query = "\n" + " (?, ?, ?)";
		var table = req.body.LIST.reduce(function(tabla, record){
											query = query + end_query + ",";
											tabla.push(idTipoUsuario, record.ID_ACCESO_USUARIO, 1);
											return tabla;
										}, []);
		query = mysql.format(query.slice(0,-1), table);
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
					"Message": "Article Added !"
				});
			}
		});
	});

};

module.exports = assocTipoAccesoDAO;