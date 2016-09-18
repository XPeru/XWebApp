var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "almacenesDAO";
function almacenesDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
    dateGenerator.printInfo(daoName + " " + data);
}


almacenesDAO.prototype.handleRoutes = function(router, connection) {
    var tableName = "ALMACEN";
    var urlBase = "/almacen";
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
                    "Almacenes": rows
                });
            }
		});
	});

    router.post(urlBase, function(req, res) {
        printRequest(urlBase + " post");
        var query = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
        var table = [tableName, "CODIGO", "UBICACION", req.body.CODIGO, req.body.UBICACION];
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
                    "Message": "Articulo Added !"
                });
            }
        });
    });

    router.put(urlBase, function(req, res) {
        printRequest(urlBase + " put");
        var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
        var table = [tableName, "CODIGO", req.body.CODIGO, "UBICACION", req.body.UBICACION, "ID_ALMACEN", req.body.ID_ALMACEN];
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
                    "Message": "Almacen detalle updated !"
                });
            }
        });
    });

    router.delete(urlBase + "/:id_almacen", function(req, res) {
        printRequest(urlBase + "/:id_almacen", " delete");
        var query = "DELETE FROM ?? WHERE ?? = ?";
        var table = [tableName, "ID_ALMACEN", req.params.id_almacen];
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
                    "Message": "Almacen deleted: " + req.params.id_almacen
                });
            }
        });
    });
};


module.exports = almacenesDAO;