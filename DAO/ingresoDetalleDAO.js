var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("ingresoDetalleDAO");
function ingresoDetalleDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGeneratorO.printStart();
}

ingresoDetalleDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/ingresodetalle";

	router.delete(urlBase +  "/:id_ingreso", function(req, res) {
		dateGeneratorO.printDelete(urlBase + "/:id_ingreso");
		var query = "DELETE FROM" + "\n" +
					"	DETALLE_INGRESO" + "\n" +
					"WHERE " + "\n" +
					"	FK_INGRESO = ?";
		var table = [req.params.id_ingreso];
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
					"	DETALLE_INGRESO (" + "\n" +
					"		CANTIDAD, " + "\n" +
					"		PRECIO, " + "\n" +
					"		IS_ACTIVE, " + "\n" +
					"		FK_INGRESO, " + "\n" +
					"		FK_ARTICULO, " + "\n" +
					"		FK_ALMACEN" + "\n" +
					"	) VALUES";
		var idIngreso = req.body.ID_INGRESO;
		var end_query = "\n" + " (?, ?, ?, ?, ?, ?)";
		var table = req.body.LIST.reduce(function(tabla, record) {
											query = query + end_query + ",";
											tabla.push(record.CANTIDAD,
														record.PRECIO_UNITARIO,
														1,
														idIngreso,
														record.ID_ARTICULO,
														record.ID_ALMACEN);
											return tabla;
										}, []);
		query = mysql.format(query.slice(0, -1), table);
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

	router.put(urlBase, function(req, res) {
		dateGeneratorO.printUpdate(urlBase);
		var query = "UPDATE " + "\n" +
					"	INGRESO " + "\n" +
					"SET " + "\n" +
					"	COSTO_TOTAL = ?," + "\n" +
					"	UPDATE_TIME = CURRENT_TIMESTAMP" + "\n" +
					"WHERE" + "\n" +
					"	ID_INGRESO = ?";
		var table = [
						req.body.COSTO_TOTAL, 
						req.body.ID_INGRESO];
		query = mysql.format(query, table);
		dateGeneratorO.printUpdate(query);
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
					"Message": "Categoria detalle updated !"
				});
			}
		});
	});
};

module.exports = ingresoDetalleDAO;