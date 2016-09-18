var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "tipoDocumentoDAO";
function tipoDocumentoDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + " " + data);
}


tipoDocumentoDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "TIPO_DOCUMENTO";
	var urlBase = "/tipodocumento";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT * FROM ??";
		var table = [tableName];
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
					"TipoDocumento": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post");
		var query = "INSERT INTO ?? (??) VALUES (?)";
		var table = [tableName, "DESCRIPCION", req.body.DESCRIPCION];
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
					"Message": "Categoria Added !"
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		printRequest(urlBase + " put");
		var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var table = [tableName, "DESCRIPCION", req.body.DESCRIPCION, "ID_TIPO_DOCUMENTO", req.body.ID_TIPO_DOCUMENTO];
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
					"Message": "Categoria detalle updated !"
				});
			}
		});
	});

	router.delete(urlBase + "/:id_tipodocumento", function(req, res) {
		printRequest(urlBase + "/:id_tipodocumento", " delete");
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = [tableName, "ID_TIPO_DOCUMENTO", req.params.id_tipodocumento];
		query = mysql.format(query, table);
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
					"Message": "Categoria deleted: " + req.params.id_tipodocumento
				});
			}
		});
	});
};

module.exports = tipoDocumentoDAO;