var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "articulosCategoriaDAO";
function articulosCategoriaDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
    dateGenerator.printInfo(daoName + " " + data);
}


articulosCategoriaDAO.prototype.handleRoutes = function(router, connection) {
    var tableName = "CATEGORIA";
    var urlBase = "/categoria";
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
                    "Categorias": rows
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
        var table = [tableName, "DESCRIPCION", req.body.DESCRIPCION, "ID_CATEGORIA", req.body.ID_CATEGORIA];
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

    router.delete(urlBase + "/:id_categoria", function(req, res) {
        printRequest(urlBase + "/:id_categoria", " delete");
        var query = "DELETE FROM ?? WHERE ?? = ?";
        var table = [tableName, "ID_CATEGORIA", req.params.id_categoria];
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
                    "Message": "Categoria deleted: " + req.params.id_categoria
                });
            }
        });
    });
};

module.exports = articulosCategoriaDAO;