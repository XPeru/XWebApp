var mysql = require("mysql");

function ingresoDAO(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
	console.info("ingresoDAO added successfuly");
}

ingresoDAO.prototype.handleRoutes = function(router, connection, md5) {
	router.post("/ingresoArt", function(req, res) {
		var query = "INSERT INTO ??(??) VALUES (?)";
		var table =["tbl_ing", "ID_ING", req.body.ID_ING];
		console.info("Ingreso articulo tbl_ing table");
		query = mysql.format(query, table);
		console.info(query);
		connection.query(query, function(err, rows) {
			if(err) {
				console.info('ERROR');
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
			} else {
				console.info('no hay error');
                res.json({
                    "Error": false,
                    "Message": "Ingreso Added !"
                });
			}
		});
	});

	router.post("/ingresoArtDet", function(req, res) {
		var query = "INSERT INTO ??(??, ?? , ?? , ??) VALUES (?, ? , ? , ? )";
		var table = ["tbl_ing_det", "ING_SEQ", "ID_ART", "ID_ALM", "CANT",
			req.body.ING_SEQ, req.body.ID_ART, req.body.ID_ALM, req.body.CANT];

		query = mysql.format(query, table);

		connection.query( query, function(err, rows) {
			if(err) {
				console.info('ERROR');
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
			} else {
				console.info('no hay error');
                res.json({
                    "Error": false,
                    "Message": "Ingreso Added !"
                });
			}

		});
	});
};


module.exports = ingresoDAO;