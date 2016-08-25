var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "assocTipoAccesoDAO";

function assocTipoAccesoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + " " + data);
}

assocTipoAccesoDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "ASOC_TIPO_ACCESO";
	var urlBase = "/asoctipoacceso";

	router.get(urlBase + "/:id_tipo_usuario", function(req, res) {
		printRequest(urlBase + "/:id_tipo_usuario", " GET");
		var query = "SELECT ??, ?? FROM ?? asso INNER JOIN ?? acc ON ??=?? WHERE ??=?";
		var table = ["acc.ID_ACCESO_USUARIO", "acc.DESCRIPCION", tableName, "ACCESO_USUARIO", "acc.ID_ACCESO_USUARIO", "asso.FK_ACCESO_USUARIO", "asso.FK_TIPO_USUARIO", req.params.id_tipo_usuario];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "Success",
					"Assos": rows
				});
			}
		});
	});

	router.delete(urlBase +  "/:id_tipo_usuario", function(req, res) {
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = [tableName, "FK_TIPO_USUARIO", req.params.id_tipo_usuario];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "Success"
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase, " post");
		var query = "INSERT INTO ?? (??, ??, ??) VALUES";
		var table = [tableName,	"FK_TIPO_USUARIO",	"FK_ACCESO_USUARIO", "IS_ACTIVE"];
		var idTipoUsuario = req.body.ID_TIPO_USUARIO;
		var end_query = " (?, ?, ?)";
		var length = req.body.LIST.length;
		for(var i = 0; i < length; i++) {
			if(i === length - 1) {
				query = query + end_query;
			} else {
				query = query + end_query + ",";
			}
			table.push(idTipoUsuario, req.body.LIST[i].ID_ACCESO_USUARIO, 1);
		}
		printRequest(table);
		printRequest(query);
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "Article Added !"
				});
			}
		});
	});

};

module.exports = assocTipoAccesoDAO;