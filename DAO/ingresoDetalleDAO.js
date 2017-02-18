var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "ingresoDetalleDAO";
function ingresoDetalleDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data, color) {
	dateGenerator.printInfo(daoName + "\n" + data, color);
}

ingresoDetalleDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/ingresodetalle";
	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post", "magenta");
		var query = "INSERT INTO " + "\n" +
					"	DETALLE_INGRESO (" + "\n" +
					"		ID_DETALLE_INGRESO, " + "\n" +
					"		CANTIDAD, " + "\n" +
					"		PRECIO, " + "\n" +
					"		IS_ACTIVE, " + "\n" +
					"		FK_INGRESO, " + "\n" +
					"		FK_ARTICULO, " + "\n" +
					"		FK_ALMACEN " + "\n" +
					"	) VALUES";
		var idDetalleIngreso = req.body.ID_DETALLE_INGRESO;
		var end_query = "\n" + " (?, ?, ?, ?, ?, ?, ?)";
		var table = req.body.LIST.reduce(function(tabla, record){
											query = query + end_query + ",";
											tabla.push(idDetalleIngreso,
														record.CANTIDAD,
														record.PRECIO,
														record.IS_ACTIVE,
														record.ID_INGRESO,
														record.ID_ARTICULO,
														record.ID_ALMACEN);
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

module.exports = ingresoDetalleDAO;