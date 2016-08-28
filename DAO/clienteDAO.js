var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "clienteDAO";
function clienteDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + " " + data);
}


clienteDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "";
	var urlBase = "/cliente";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT * FROM ??";
		var table = [tableName];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Success",
					"Cliente": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post");
		var query = "INSERT INTO ?? (??) VALUES (?)";
		var table = [tableName, "", req.body.];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query:' + query);
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
		var table = [tableName, "", req.body., "ID_", req.body.ID_];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Categoria detalle updated !"
				});
			}
		});
	});

	router.delete(urlBase + "/:id_", function(req, res) {
		printRequest(urlBase + "/:id_", " delete");
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = [tableName, "ID_", req.params.id_];
		query = mysql.format(query, table);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				console.info('Success MySQL query:' + query);
				res.json({
					"Error": false,
					"Message": "Categoria deleted: " + req.params.id_
				});
			}
		});
	});
};

module.exports = clienteDAO;
