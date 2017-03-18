var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("assocTipoAccesoDAO");

function assocTipoAccesoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGeneratorO.printStart();
}

assocTipoAccesoDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/asoctipoacceso";

	router.get(urlBase + "/:id_tipo_usuario", function(req, res) {
		dateGeneratorO.printSelect(urlBase + "/:id_tipo_usuario");
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
		dateGeneratorO.printSelect(query);
		connection.query(query, function(err, rows) {
			if (err) {
				dateGeneratorO.printError(query, err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
					"Message": "Success",
					"Assos": rows
				});
			}
		});
	});

	router.delete(urlBase +  "/:id_tipo_usuario", function(req, res) {
		dateGeneratorO.printDelete(urlBase + "/:id_tipo_usuario");
		var query = "DELETE FROM" + "\n" +
					"	ASOC_TIPO_ACCESO" + "\n" +
					"WHERE " + "\n" +
					"	FK_TIPO_USUARIO = ?";
		var table = [req.params.id_tipo_usuario];
		query = mysql.format(query, table);
		dateGeneratorO.printDelete(query);
		connection.query(query, function(err) {
			if (err) {
				dateGeneratorO.printError(query, err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
					"Message": "Success"
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		dateGeneratorO.printInsert(urlBase);
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
		dateGeneratorO.printInsert(query);
		connection.query(query, function(err) {
			if (err) {
				dateGeneratorO.printError(query, err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
					"Message": "Article Added !"
				});
			}
		});
	});

};

module.exports = assocTipoAccesoDAO;